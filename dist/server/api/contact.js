"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
class ContactHandler {
    rateLimitStore = {};
    RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
    RATE_LIMIT_MAX = 5; // 5 requests per hour
    async handler(req, res) {
        // Set CORS headers
        this.setCorsHeaders(res);
        // Handle preflight requests
        if (req.method === 'OPTIONS') {
            res.status(200).end();
            return;
        }
        // Only allow POST requests
        if (req.method !== 'POST') {
            res.status(405).json({
                success: false,
                message: 'Method not allowed. Only POST requests are accepted.'
            });
            return;
        }
        try {
            // Rate limiting
            const clientIP = this.getClientIP(req);
            if (!this.checkRateLimit(clientIP)) {
                res.status(429).json({
                    success: false,
                    message: 'Zbyt wiele wiadomości z tego adresu IP. Spróbuj ponownie za godzinę.'
                });
                return;
            }
            // Validate and process the contact form
            const result = await this.processContactForm(req.body);
            if (result.success) {
                // Update rate limit counter
                this.updateRateLimit(clientIP);
                res.status(200).json(result);
            }
            else {
                res.status(400).json(result);
            }
        }
        catch (error) {
            console.error('Contact form processing error:', error);
            res.status(500).json({
                success: false,
                message: 'Wystąpił błąd serwera. Spróbuj ponownie później.'
            });
        }
    }
    setCorsHeaders(res) {
        const allowedOrigins = [
            'https://emanuelw.pl',
            'https://www.emanuelw.pl',
            'http://localhost:3000',
            'http://127.0.0.1:3000'
        ];
        res.setHeader('Access-Control-Allow-Origin', '*'); // In production, use specific origins
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
    }
    getClientIP(req) {
        const forwarded = req.headers['x-forwarded-for'];
        const ip = forwarded
            ? (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0])
            : req.socket?.remoteAddress || req.ip || 'unknown';
        return (ip || 'unknown').trim();
    }
    checkRateLimit(ip) {
        const now = Date.now();
        const userLimit = this.rateLimitStore[ip];
        if (!userLimit) {
            return true; // First request from this IP
        }
        // Reset if window has passed
        if (now > userLimit.resetTime) {
            delete this.rateLimitStore[ip];
            return true;
        }
        // Check if under limit
        return userLimit.count < this.RATE_LIMIT_MAX;
    }
    updateRateLimit(ip) {
        const now = Date.now();
        const resetTime = now + this.RATE_LIMIT_WINDOW;
        const existingLimit = this.rateLimitStore[ip];
        if (existingLimit) {
            existingLimit.count++;
        }
        else {
            this.rateLimitStore[ip] = {
                count: 1,
                resetTime
            };
        }
    }
    async processContactForm(body) {
        // Extract and validate form data
        const { firstName, lastName, email, subject, message } = body;
        // Validation
        const validationErrors = this.validateContactForm({
            firstName,
            lastName,
            email,
            subject,
            message
        });
        if (validationErrors.length > 0) {
            return {
                success: false,
                message: 'Dane formularza są nieprawidłowe.',
                errors: validationErrors
            };
        }
        // Sanitize input
        const sanitizedData = {
            firstName: this.sanitizeInput(firstName),
            lastName: this.sanitizeInput(lastName),
            email: this.sanitizeInput(email),
            subject: this.sanitizeInput(subject),
            message: this.sanitizeInput(message)
        };
        // Log the submission (in production, you'd send email or save to database)
        console.log('Contact form submission:', {
            ...sanitizedData,
            timestamp: new Date().toISOString()
        });
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            success: true,
            message: 'Dziękuję za wiadomość! Odpowiem najszybciej jak to możliwe.'
        };
    }
    validateContactForm(data) {
        const errors = [];
        if (!data.firstName || data.firstName.trim().length < 2) {
            errors.push('Imię musi mieć co najmniej 2 znaki.');
        }
        if (!data.lastName || data.lastName.trim().length < 2) {
            errors.push('Nazwisko musi mieć co najmniej 2 znaki.');
        }
        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push('Podaj prawidłowy adres email.');
        }
        if (!data.subject || data.subject.trim().length < 3) {
            errors.push('Temat musi mieć co najmniej 3 znaki.');
        }
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Wiadomość musi mieć co najmniej 10 znaków.');
        }
        // Additional security checks
        if (this.containsSuspiciousContent(data.message)) {
            errors.push('Wiadomość zawiera niedozwolone treści.');
        }
        return errors;
    }
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && email.length <= 254;
    }
    sanitizeInput(input) {
        if (typeof input !== 'string') {
            return '';
        }
        return input
            .trim()
            .slice(0, 1000) // Limit length
            .replace(/[<>"'&]/g, (char) => {
            const entities = {
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
                '&': '&amp;'
            };
            return entities[char] || char;
        });
    }
    containsSuspiciousContent(text) {
        const suspiciousPatterns = [
            /<script[^>]*>.*?<\/script>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi,
            /<iframe[^>]*>.*?<\/iframe>/gi,
            /data:text\/html/gi
        ];
        return suspiciousPatterns.some(pattern => pattern.test(text));
    }
    // Clean up old rate limit entries periodically
    cleanupRateLimit() {
        const now = Date.now();
        Object.keys(this.rateLimitStore).forEach(ip => {
            const entry = this.rateLimitStore[ip];
            if (entry && now > entry.resetTime) {
                delete this.rateLimitStore[ip];
            }
        });
    }
}
// Create a singleton instance
const contactHandler = new ContactHandler();
// Clean up rate limit store every hour
setInterval(() => {
    contactHandler['cleanupRateLimit']();
}, 60 * 60 * 1000);
// Export the handler function for Express
function handler(req, res) {
    return contactHandler.handler(req, res);
}
//# sourceMappingURL=contact.js.map