"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@/utils/helpers");
class PortfolioApp {
    navbar = null;
    hamburger = null;
    navMenu = null;
    navLinks = null;
    animationObserver = null;
    cleanupFunctions = [];
    isMenuOpen = false;
    constructor() {
        this.init();
    }
    async init() {
        try {
            await this.waitForDOM();
            this.initializeElements();
            this.setupEventListeners();
            this.initializeAnimations();
            this.preloadCriticalResources();
            this.setupPerformanceOptimizations();
            console.log('Portfolio app initialized successfully');
        }
        catch (error) {
            console.error('Failed to initialize portfolio app:', error);
        }
    }
    waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => resolve());
            }
            else {
                resolve();
            }
        });
    }
    initializeElements() {
        this.navbar = (0, helpers_1.getElementById)('navbar');
        this.hamburger = (0, helpers_1.getElementById)('hamburger');
        this.navMenu = (0, helpers_1.getElementById)('nav-menu');
        this.navLinks = (0, helpers_1.querySelectorAll)('.nav-link');
        if (!this.navbar || !this.hamburger || !this.navMenu) {
            throw new Error('Required navigation elements not found');
        }
    }
    setupEventListeners() {
        // Navigation events
        this.setupNavigationEvents();
        // Scroll events
        this.setupScrollEvents();
        // Resize events
        this.setupResizeEvents();
        // Contact form events
        this.setupContactFormEvents();
        // Keyboard events
        this.setupKeyboardEvents();
        // Contact link tracking
        this.setupContactLinkTracking();
    }
    setupNavigationEvents() {
        if (!this.hamburger || !this.navMenu || !this.navLinks)
            return;
        // Hamburger menu toggle
        const hamburgerCleanup = (0, helpers_1.addEventListenerWithCleanup)(this.hamburger, 'click', () => this.toggleMobileMenu());
        this.cleanupFunctions.push(hamburgerCleanup);
        // Navigation link clicks
        this.navLinks.forEach((link) => {
            const linkCleanup = (0, helpers_1.addEventListenerWithCleanup)(link, 'click', (e) => this.handleNavLinkClick(e, link));
            this.cleanupFunctions.push(linkCleanup);
        });
    }
    setupScrollEvents() {
        const throttledScrollHandler = (0, helpers_1.throttle)(() => {
            this.handleScroll();
            this.updateActiveNavLink();
        }, 16); // ~60fps
        const scrollCleanup = (0, helpers_1.addEventListenerWithCleanup)(window, 'scroll', throttledScrollHandler, { passive: true });
        this.cleanupFunctions.push(scrollCleanup);
    }
    setupResizeEvents() {
        const debouncedResizeHandler = (0, helpers_1.debounce)(() => {
            this.handleResize();
        }, 250);
        const resizeCleanup = (0, helpers_1.addEventListenerWithCleanup)(window, 'resize', debouncedResizeHandler, { passive: true });
        this.cleanupFunctions.push(resizeCleanup);
    }
    setupContactFormEvents() {
        const contactForm = (0, helpers_1.getElementById)('contact-form');
        if (!contactForm)
            return;
        const formCleanup = (0, helpers_1.addEventListenerWithCleanup)(contactForm, 'submit', (e) => this.handleContactFormSubmit(e));
        this.cleanupFunctions.push(formCleanup);
    }
    setupKeyboardEvents() {
        const keydownCleanup = (0, helpers_1.addEventListenerWithCleanup)(document.documentElement, 'keydown', (e) => this.handleKeydown(e));
        this.cleanupFunctions.push(keydownCleanup);
    }
    setupContactLinkTracking() {
        const emailLinks = (0, helpers_1.querySelectorAll)('a[href^="mailto:"]');
        const phoneLinks = (0, helpers_1.querySelectorAll)('a[href^="tel:"]');
        [...emailLinks, ...phoneLinks].forEach((link) => {
            const linkCleanup = (0, helpers_1.addEventListenerWithCleanup)(link, 'click', () => this.trackContactLinkClick(link));
            this.cleanupFunctions.push(linkCleanup);
        });
    }
    toggleMobileMenu() {
        if (!this.hamburger || !this.navMenu)
            return;
        this.isMenuOpen = !this.isMenuOpen;
        this.hamburger.classList.toggle('active', this.isMenuOpen);
        this.navMenu.classList.toggle('active', this.isMenuOpen);
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    }
    closeMobileMenu() {
        if (!this.isMenuOpen)
            return;
        this.isMenuOpen = false;
        this.hamburger?.classList.remove('active');
        this.navMenu?.classList.remove('active');
        document.body.style.overflow = '';
    }
    handleNavLinkClick(e, link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#'))
            return;
        const targetId = href.substring(1);
        const targetElement = (0, helpers_1.getElementById)(targetId);
        if (targetElement) {
            this.closeMobileMenu();
            (0, helpers_1.smoothScrollTo)(targetElement, 80); // Account for fixed navbar
        }
    }
    handleScroll() {
        if (!this.navbar)
            return;
        const scrollY = (0, helpers_1.getScrollPosition)().y;
        // Add/remove scrolled class for navbar styling
        this.navbar.classList.toggle('scrolled', scrollY > 50);
    }
    updateActiveNavLink() {
        if (!this.navLinks)
            return;
        const sections = (0, helpers_1.querySelectorAll)('section[id]');
        const scrollY = (0, helpers_1.getScrollPosition)().y;
        const offset = 100;
        let activeSection = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - offset;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                activeSection = section.id;
            }
        });
        this.navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            const isActive = href === `#${activeSection}`;
            link.classList.toggle('active', isActive);
        });
    }
    handleResize() {
        const viewport = (0, helpers_1.getViewportSize)();
        // Close mobile menu on desktop
        if (viewport.width > 768 && this.isMenuOpen) {
            this.closeMobileMenu();
        }
    }
    handleKeydown(e) {
        // Close mobile menu on Escape key
        if (e.key === 'Escape' && this.isMenuOpen) {
            this.closeMobileMenu();
        }
    }
    async handleContactFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const contactData = {
            firstName: (0, helpers_1.sanitizeString)(formData.get('firstName') || ''),
            lastName: (0, helpers_1.sanitizeString)(formData.get('lastName') || ''),
            email: (0, helpers_1.sanitizeString)(formData.get('email') || ''),
            subject: (0, helpers_1.sanitizeString)(formData.get('subject') || ''),
            message: (0, helpers_1.sanitizeString)(formData.get('message') || '')
        };
        if (!this.validateContactForm(contactData)) {
            this.showFormMessage('Proszę wypełnić wszystkie wymagane pola poprawnie.', 'error');
            return;
        }
        try {
            this.setFormLoading(true);
            const response = await this.submitContactForm(contactData);
            if (response.success) {
                this.showFormMessage('Dziękuję za wiadomość! Odpowiem najszybciej jak to możliwe.', 'success');
                form.reset();
            }
            else {
                this.showFormMessage(response.message || 'Wystąpił błąd podczas wysyłania wiadomości.', 'error');
            }
        }
        catch (error) {
            console.error('Contact form submission error:', error);
            this.showFormMessage('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.', 'error');
        }
        finally {
            this.setFormLoading(false);
        }
    }
    validateContactForm(data) {
        return (data.firstName.length > 0 &&
            data.lastName.length > 0 &&
            (0, helpers_1.isValidEmail)(data.email) &&
            data.subject.length > 0 &&
            data.message.length > 10);
    }
    async submitContactForm(data) {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    setFormLoading(loading) {
        const submitButton = (0, helpers_1.querySelector)('#contact-form button[type="submit"]');
        if (!submitButton)
            return;
        submitButton.disabled = loading;
        submitButton.textContent = loading ? 'Wysyłanie...' : 'Wyślij wiadomość';
    }
    showFormMessage(message, type) {
        const existingMessage = (0, helpers_1.querySelector)('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}-message`;
        messageElement.innerHTML = `<p>${message}</p>`;
        const form = (0, helpers_1.getElementById)('contact-form');
        if (form) {
            form.insertBefore(messageElement, form.firstChild);
            // Auto-remove after 5 seconds
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }
    }
    trackContactLinkClick(link) {
        const href = link.getAttribute('href') || '';
        const type = href.startsWith('mailto:') ? 'email' : 'phone';
        console.log(`Contact link clicked: ${type}`, href);
        // Here you could add analytics tracking
        // gtag('event', 'contact_click', { contact_type: type });
    }
    initializeAnimations() {
        if ((0, helpers_1.prefersReducedMotion)()) {
            console.log('Reduced motion preferred, skipping animations');
            return;
        }
        this.setupIntersectionObserver();
        this.addAnimationStyles();
    }
    setupIntersectionObserver() {
        this.animationObserver = (0, helpers_1.createAnimationObserver)((entries) => this.handleIntersectionObserver(entries), {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        // Observe elements for animation
        const animatedElements = (0, helpers_1.querySelectorAll)('.service-card, .project-card, .pricing-card, .contact-method, .hero-content, .about-content');
        animatedElements.forEach((element) => {
            this.animationObserver?.observe(element);
        });
    }
    handleIntersectionObserver(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = this.getAnimationDelay(element);
                (0, helpers_1.addAnimationClass)(element, 'animate-in', delay);
                this.animationObserver?.unobserve(element);
            }
        });
    }
    getAnimationDelay(element) {
        const cards = element.parentElement?.children;
        if (!cards)
            return 0;
        const index = Array.from(cards).indexOf(element);
        return index * 100; // 100ms delay between each card
    }
    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
      .service-card,
      .project-card,
      .pricing-card,
      .contact-method,
      .hero-content,
      .about-content {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      
      .service-card.animate-in {
        transform: translateY(0) scale(1) !important;
      }
      
      .pricing-card.animate-in {
        transform: translateY(0) rotateX(0) !important;
      }
      
      @media (prefers-reduced-motion: reduce) {
        .service-card,
        .project-card,
        .pricing-card,
        .contact-method,
        .hero-content,
        .about-content {
          opacity: 1;
          transform: none;
          transition: none;
        }
      }
    `;
        document.head.appendChild(style);
    }
    async preloadCriticalResources() {
        try {
            // Preload critical fonts
            const fontPromises = [
                'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
            ].map(url => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'style';
                link.href = url;
                document.head.appendChild(link);
                return Promise.resolve();
            });
            // Preload hero images if any
            const heroImages = (0, helpers_1.querySelectorAll)('.hero img, .hero-visual img');
            const imagePromises = Array.from(heroImages).map(img => (0, helpers_1.preloadImage)(img.src || img.dataset.src || ''));
            await Promise.allSettled([...fontPromises, ...imagePromises]);
            console.log('Critical resources preloaded');
        }
        catch (error) {
            console.warn('Some resources failed to preload:', error);
        }
    }
    setupPerformanceOptimizations() {
        // Lazy load images
        this.setupLazyLoading();
        // Setup service worker if available
        this.registerServiceWorker();
    }
    setupLazyLoading() {
        const lazyImages = (0, helpers_1.querySelectorAll)('img[data-src]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.dataset.src;
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            lazyImages.forEach((img) => imageObserver.observe(img));
        }
        else {
            // Fallback for older browsers
            lazyImages.forEach((img) => {
                const src = img.dataset.src;
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
            });
        }
    }
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                // Placeholder for service worker registration
                console.log('Service worker support detected');
                // await navigator.serviceWorker.register('/sw.js');
            }
            catch (error) {
                console.warn('Service worker registration failed:', error);
            }
        }
    }
    destroy() {
        // Clean up event listeners
        this.cleanupFunctions.forEach(cleanup => cleanup());
        this.cleanupFunctions = [];
        // Disconnect observers
        this.animationObserver?.disconnect();
        console.log('Portfolio app destroyed');
    }
}
// Initialize the application
const app = new PortfolioApp();
// Handle page unload
window.addEventListener('beforeunload', () => {
    app.destroy();
});
// Export for potential external use
window.PortfolioApp = app;
//# sourceMappingURL=main.js.map