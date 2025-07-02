import express from 'express';
declare class PortfolioServer {
    private app;
    private port;
    private isDevelopment;
    constructor();
    private setupMiddleware;
    private setupRateLimiting;
    private setupRoutes;
    private handleContactForm;
    private validateContactForm;
    private isValidEmail;
    private sanitizeInput;
    private handleHealthCheck;
    private serveMainPage;
    private handleNotFound;
    private setupErrorHandling;
    start(): void;
    getApp(): express.Application;
}
export default PortfolioServer;
//# sourceMappingURL=server.d.ts.map