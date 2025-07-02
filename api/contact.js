// api/contact.js

// Simple rate limiting using in-memory store (for demo purposes)
const rateLimitStore = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5;
  
  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  const record = rateLimitStore.get(ip);
  
  if (now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check rate limit
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      error: 'Zbyt wiele prób wysłania formularza. Spróbuj ponownie za 15 minut.'
    });
  }

  try {
    const { name, email, subject, message } = req.body;
    
    // Validation
    const errors = [];
    
    if (!name || name.trim().length === 0) {
      errors.push('Imię i nazwisko jest wymagane');
    }
    
    if (!email || email.trim().length === 0) {
      errors.push('Email jest wymagany');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Nieprawidłowy format email');
    }
    
    if (!subject || subject.trim().length === 0) {
      errors.push('Temat jest wymagany');
    }
    
    if (!message || message.trim().length === 0) {
      errors.push('Wiadomość jest wymagana');
    }
    
    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Błędy walidacji',
        details: errors
      });
    }
    
    // Sanitize data
    const sanitizedData = {
      name: name.trim().replace(/[<>"'&]/g, ''),
      email: email.trim(),
      subject: subject.trim().replace(/[<>"'&]/g, ''),
      message: message.trim().replace(/[<>"'&]/g, '')
    };
    
    // Log the contact form submission (in production, you'd send an email here)
    console.log('Contact form submission:', {
      ...sanitizedData,
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    });
    
    // In production, integrate with email service like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Nodemailer with SMTP
    
    res.json({
      success: true,
      message: 'Wiadomość została wysłana pomyślnie!'
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      error: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.'
    });
  }
}