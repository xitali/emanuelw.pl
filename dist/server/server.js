"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const path_1 = __importDefault(require("path"));
class PortfolioServer {
    app;
    port;
    isDevelopment;
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT || '3000', 10);
        this.isDevelopment = process.env.NODE_ENV !== 'production';
        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandling();
    }
    setupMiddleware() {
        // Security middleware
        this.app.use((0, helmet_1.default)({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
                    fontSrc: ["'self'", 'https://fonts.gstatic.com'],
                    scriptSrc: ["'self'"],
                    imgSrc: ["'self'", 'data:', 'https:'],
                    connectSrc: ["'self'"],
                },
            },
            crossOriginEmbedderPolicy: false
        }));
        // CORS configuration
        this.app.use((0, cors_1.default)({
            origin: this.isDevelopment
                ? ['http://localhost:3000', 'http://127.0.0.1:3000']
                : ['https://emanuelw.pl', 'https://www.emanuelw.pl'],
            credentials: true,
            optionsSuccessStatus: 200
        }));
        // Body parsing middleware
        this.app.use(express_1.default.json({ limit: '10mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
        // Rate limiting
        this.setupRateLimiting();
        // Static files
        this.app.use(express_1.default.static('dist/public', {
            maxAge: this.isDevelopment ? 0 : '1y',
            etag: true,
            lastModified: true
        }));
        // Fallback for legacy paths
        this.app.use('/dist/public', express_1.default.static('dist/public', {
            maxAge: this.isDevelopment ? 0 : '1y',
            etag: true,
            lastModified: true
        }));
        // Logging middleware
        if (this.isDevelopment) {
            this.app.use((req, res, next) => {
                console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
                next();
            });
        }
    }
    setupRateLimiting() {
        // General rate limiting
        const generalLimiter = (0, express_rate_limit_1.default)({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
            message: {
                error: 'Too many requests from this IP, please try again later.'
            },
            standardHeaders: true,
            legacyHeaders: false,
        });
        // Contact form rate limiting
        const contactLimiter = (0, express_rate_limit_1.default)({
            windowMs: 60 * 60 * 1000, // 1 hour
            max: 5, // limit each IP to 5 contact form submissions per hour
            message: {
                success: false,
                message: 'Zbyt wiele wiadomości z tego adresu IP. Spróbuj ponownie za godzinę.'
            },
            standardHeaders: true,
            legacyHeaders: false,
        });
        this.app.use(generalLimiter);
        this.app.use('/api/contact', contactLimiter);
    }
    setupRoutes() {
        // API routes
        this.app.post('/api/contact', this.handleContactForm.bind(this));
        // Health check
        this.app.get('/api/health', this.handleHealthCheck.bind(this));
        // Serve main page
        this.app.get('/', this.serveMainPage.bind(this));
        // Catch all route for SPA
        this.app.get('*', this.handleNotFound.bind(this));
    }
    async handleContactForm(req, res) {
        try {
            const { firstName, lastName, email, subject, message } = req.body;
            // Validation
            const validationErrors = this.validateContactForm({
                firstName,
                lastName,
                email,
                subject,
                message
            });
            if (validationErrors.length > 0) {
                res.status(400).json({
                    success: false,
                    message: 'Dane formularza są nieprawidłowe.',
                    errors: validationErrors
                });
                return;
            }
            // Sanitize input
            const sanitizedData = {
                firstName: this.sanitizeInput(firstName),
                lastName: this.sanitizeInput(lastName),
                email: this.sanitizeInput(email),
                subject: this.sanitizeInput(subject),
                message: this.sanitizeInput(message)
            };
            // Log the contact form submission (in production, you'd send email or save to database)
            console.log('Contact form submission:', {
                ...sanitizedData,
                timestamp: new Date().toISOString(),
                ip: req.ip,
                userAgent: req.get('User-Agent')
            });
            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            res.json({
                success: true,
                message: 'Dziękuję za wiadomość! Odpowiem najszybciej jak to możliwe.'
            });
        }
        catch (error) {
            console.error('Contact form error:', error);
            res.status(500).json({
                success: false,
                message: 'Wystąpił błąd serwera. Spróbuj ponownie później.'
            });
        }
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
        return errors;
    }
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    sanitizeInput(input) {
        return input
            .trim()
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
    handleHealthCheck(req, res) {
        res.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            version: process.version
        });
    }
    serveMainPage(req, res) {
        res.sendFile(path_1.default.join(process.cwd(), 'index.html'));
    }
    handleNotFound(req, res) {
        // For SPA, serve the main page for all routes
        if (req.path.startsWith('/api/')) {
            res.status(404).json({
                error: 'API endpoint not found',
                path: req.path
            });
        }
        else {
            res.sendFile(path_1.default.join(process.cwd(), 'index.html'));
        }
    }
    setupErrorHandling() {
        // 404 handler
        this.app.use((req, res) => {
            res.status(404).json({
                error: 'Not Found',
                message: 'The requested resource was not found.',
                path: req.path
            });
        });
        // Global error handler
        this.app.use((err, req, res, next) => {
            console.error('Unhandled error:', err);
            res.status(500).json({
                error: 'Internal Server Error',
                message: this.isDevelopment ? err.message : 'Something went wrong!',
                ...(this.isDevelopment && { stack: err.stack })
            });
        });
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Server running on port ${this.port}`);
            console.log(`📝 Environment: ${this.isDevelopment ? 'development' : 'production'}`);
            console.log(`🌐 Local: http://localhost:${this.port}`);
            if (this.isDevelopment) {
                console.log(`🔧 Development mode - Hot reload enabled`);
            }
        });
    }
    getApp() {
        return this.app;
    }
}
// Start the server if this file is run directly
if (require.main === module) {
    const server = new PortfolioServer();
    server.start();
    // Graceful shutdown
    process.on('SIGTERM', () => {
        console.log('SIGTERM received, shutting down gracefully');
        process.exit(0);
    });
    process.on('SIGINT', () => {
        console.log('SIGINT received, shutting down gracefully');
        process.exit(0);
    });
}
exports.default = PortfolioServer;
//# sourceMappingURL=server.js.map