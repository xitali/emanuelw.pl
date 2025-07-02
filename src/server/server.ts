import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import type { ContactFormData, ContactResponse } from '@/types';

interface RateLimitRequest extends Request {
  ip: string;
}

class PortfolioServer {
  private app: express.Application;
  private port: number;
  private isDevelopment: boolean;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000', 10);
    this.isDevelopment = process.env.NODE_ENV !== 'production';
    
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    // Security middleware
    this.app.use(helmet({
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
    this.app.use(cors({
      origin: this.isDevelopment 
        ? ['http://localhost:3000', 'http://127.0.0.1:3000']
        : ['https://emanuelw.pl', 'https://www.emanuelw.pl'],
      credentials: true,
      optionsSuccessStatus: 200
    }));

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Rate limiting
    this.setupRateLimiting();

    // Static files
    this.app.use(express.static('public', {
      maxAge: this.isDevelopment ? 0 : '1y',
      etag: true,
      lastModified: true
    }));

    // Logging middleware
    if (this.isDevelopment) {
      this.app.use((req: Request, res: Response, next: NextFunction) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
      });
    }
  }

  private setupRateLimiting(): void {
    // General rate limiting
    const generalLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: {
        error: 'Too many requests from this IP, please try again later.'
      },
      standardHeaders: true,
      legacyHeaders: false,
    });

    // Contact form rate limiting
    const contactLimiter = rateLimit({
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

  private setupRoutes(): void {
    // API routes
    this.app.post('/api/contact', this.handleContactForm.bind(this));
    
    // Health check
    this.app.get('/api/health', this.handleHealthCheck.bind(this));
    
    // Serve main page
    this.app.get('/', this.serveMainPage.bind(this));
    
    // Catch all route for SPA
    this.app.get('*', this.handleNotFound.bind(this));
  }

  private async handleContactForm(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, subject, message }: ContactFormData = req.body;

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
        } as ContactResponse);
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
      } as ContactResponse);

    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({
        success: false,
        message: 'Wystąpił błąd serwera. Spróbuj ponownie później.'
      } as ContactResponse);
    }
  }

  private validateContactForm(data: ContactFormData): string[] {
    const errors: string[] = [];

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

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/[<>"'&]/g, (char) => {
        const entities: Record<string, string> = {
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          '&': '&amp;'
        };
        return entities[char] || char;
      });
  }

  private handleHealthCheck(req: Request, res: Response): void {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.version
    });
  }

  private serveMainPage(req: Request, res: Response): void {
    res.sendFile(path.join(process.cwd(), 'index.html'));
  }

  private handleNotFound(req: Request, res: Response): void {
    // For SPA, serve the main page for all routes
    if (req.path.startsWith('/api/')) {
      res.status(404).json({
        error: 'API endpoint not found',
        path: req.path
      });
    } else {
      res.sendFile(path.join(process.cwd(), 'index.html'));
    }
  }

  private setupErrorHandling(): void {
    // 404 handler
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource was not found.',
        path: req.path
      });
    });

    // Global error handler
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error('Unhandled error:', err);
      
      res.status(500).json({
        error: 'Internal Server Error',
        message: this.isDevelopment ? err.message : 'Something went wrong!',
        ...(this.isDevelopment && { stack: err.stack })
      });
    });
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`);
      console.log(`📝 Environment: ${this.isDevelopment ? 'development' : 'production'}`);
      console.log(`🌐 Local: http://localhost:${this.port}`);
      
      if (this.isDevelopment) {
        console.log(`🔧 Development mode - Hot reload enabled`);
      }
    });
  }

  public getApp(): express.Application {
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

export default PortfolioServer;