import type {
  NavigationItem,
  ElementWithAnimation,
  ContactFormData,
  ContactResponse
} from '@/types';

import {
  throttle,
  debounce,
  getScrollPosition,
  getViewportSize,
  isElementInViewport,
  smoothScrollTo,
  addAnimationClass,
  isValidEmail,
  sanitizeString,
  getElementById,
  querySelector,
  querySelectorAll,
  addEventListenerWithCleanup,
  createAnimationObserver,
  preloadImage,
  prefersReducedMotion
} from '@/utils/helpers';

class PortfolioApp {
  private navbar: HTMLElement | null = null;
  private hamburger: HTMLElement | null = null;
  private navMenu: HTMLElement | null = null;
  private navLinks: NodeListOf<HTMLAnchorElement> | null = null;
  private animationObserver: IntersectionObserver | null = null;
  private cleanupFunctions: Array<() => void> = [];
  private isMenuOpen = false;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    try {
      await this.waitForDOM();
      this.initializeElements();
      this.setupEventListeners();
      this.initializeAnimations();
      this.preloadCriticalResources();
      this.setupPerformanceOptimizations();
      console.log('Portfolio app initialized successfully');
    } catch (error) {
      console.error('Failed to initialize portfolio app:', error);
    }
  }

  private waitForDOM(): Promise<void> {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => resolve());
      } else {
        resolve();
      }
    });
  }

  private initializeElements(): void {
    this.navbar = getElementById('navbar');
    this.hamburger = getElementById('hamburger');
    this.navMenu = getElementById('nav-menu');
    this.navLinks = querySelectorAll<HTMLAnchorElement>('.nav-link');

    if (!this.navbar || !this.hamburger || !this.navMenu) {
      throw new Error('Required navigation elements not found');
    }
  }

  private setupEventListeners(): void {
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

  private setupNavigationEvents(): void {
    if (!this.hamburger || !this.navMenu || !this.navLinks) return;

    // Hamburger menu toggle
    const hamburgerCleanup = addEventListenerWithCleanup(
      this.hamburger,
      'click',
      () => this.toggleMobileMenu()
    );
    this.cleanupFunctions.push(hamburgerCleanup);

    // Navigation link clicks
    this.navLinks.forEach((link) => {
      const linkCleanup = addEventListenerWithCleanup(
        link,
        'click',
        (e) => this.handleNavLinkClick(e, link)
      );
      this.cleanupFunctions.push(linkCleanup);
    });
  }

  private setupScrollEvents(): void {
    const throttledScrollHandler = throttle(() => {
      this.handleScroll();
      this.updateActiveNavLink();
    }, 16); // ~60fps

    const scrollCleanup = addEventListenerWithCleanup(
      window,
      'scroll',
      throttledScrollHandler,
      { passive: true }
    );
    this.cleanupFunctions.push(scrollCleanup);
  }

  private setupResizeEvents(): void {
    const debouncedResizeHandler = debounce(() => {
      this.handleResize();
    }, 250);

    const resizeCleanup = addEventListenerWithCleanup(
      window,
      'resize',
      debouncedResizeHandler,
      { passive: true }
    );
    this.cleanupFunctions.push(resizeCleanup);
  }

  private setupContactFormEvents(): void {
    const contactForm = getElementById<HTMLFormElement>('contact-form');
    if (!contactForm) return;

    const formCleanup = addEventListenerWithCleanup(
      contactForm,
      'submit',
      (e) => this.handleContactFormSubmit(e)
    );
    this.cleanupFunctions.push(formCleanup);
  }

  private setupKeyboardEvents(): void {
    const keydownCleanup = addEventListenerWithCleanup(
      document.documentElement,
      'keydown',
      (e) => this.handleKeydown(e)
    );
    this.cleanupFunctions.push(keydownCleanup);
  }

  private setupContactLinkTracking(): void {
    const emailLinks = querySelectorAll<HTMLAnchorElement>('a[href^="mailto:"]');
    const phoneLinks = querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]');

    [...emailLinks, ...phoneLinks].forEach((link) => {
      const linkCleanup = addEventListenerWithCleanup(
        link,
        'click',
        () => this.trackContactLinkClick(link)
      );
      this.cleanupFunctions.push(linkCleanup);
    });
  }

  private toggleMobileMenu(): void {
    if (!this.hamburger || !this.navMenu) return;

    this.isMenuOpen = !this.isMenuOpen;
    this.hamburger.classList.toggle('active', this.isMenuOpen);
    this.navMenu.classList.toggle('active', this.isMenuOpen);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  private closeMobileMenu(): void {
    if (!this.isMenuOpen) return;
    
    this.isMenuOpen = false;
    this.hamburger?.classList.remove('active');
    this.navMenu?.classList.remove('active');
    document.body.style.overflow = '';
  }

  private handleNavLinkClick(e: Event, link: HTMLAnchorElement): void {
    e.preventDefault();
    
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const targetId = href.substring(1);
    const targetElement = getElementById(targetId);
    
    if (targetElement) {
      this.closeMobileMenu();
      smoothScrollTo(targetElement, 80); // Account for fixed navbar
    }
  }

  private handleScroll(): void {
    if (!this.navbar) return;

    const scrollY = getScrollPosition().y;
    
    // Add/remove scrolled class for navbar styling
    this.navbar.classList.toggle('scrolled', scrollY > 50);
  }

  private updateActiveNavLink(): void {
    if (!this.navLinks) return;

    const sections = querySelectorAll<HTMLElement>('section[id]');
    const scrollY = getScrollPosition().y;
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

  private handleResize(): void {
    const viewport = getViewportSize();
    
    // Close mobile menu on desktop
    if (viewport.width > 768 && this.isMenuOpen) {
      this.closeMobileMenu();
    }
  }

  private handleKeydown(e: KeyboardEvent): void {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && this.isMenuOpen) {
      this.closeMobileMenu();
    }
  }

  private async handleContactFormSubmit(e: Event): Promise<void> {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const contactData: ContactFormData = {
      firstName: sanitizeString(formData.get('firstName') as string || ''),
      lastName: sanitizeString(formData.get('lastName') as string || ''),
      email: sanitizeString(formData.get('email') as string || ''),
      subject: sanitizeString(formData.get('subject') as string || ''),
      message: sanitizeString(formData.get('message') as string || '')
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
      } else {
        this.showFormMessage(response.message || 'Wystąpił błąd podczas wysyłania wiadomości.', 'error');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      this.showFormMessage('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.', 'error');
    } finally {
      this.setFormLoading(false);
    }
  }

  private validateContactForm(data: ContactFormData): boolean {
    return (
      data.firstName.length > 0 &&
      data.lastName.length > 0 &&
      isValidEmail(data.email) &&
      data.subject.length > 0 &&
      data.message.length > 10
    );
  }

  private async submitContactForm(data: ContactFormData): Promise<ContactResponse> {
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

  private setFormLoading(loading: boolean): void {
    const submitButton = querySelector<HTMLButtonElement>('#contact-form button[type="submit"]');
    if (!submitButton) return;

    submitButton.disabled = loading;
    submitButton.textContent = loading ? 'Wysyłanie...' : 'Wyślij wiadomość';
  }

  private showFormMessage(message: string, type: 'success' | 'error'): void {
    const existingMessage = querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}-message`;
    messageElement.innerHTML = `<p>${message}</p>`;

    const form = getElementById('contact-form');
    if (form) {
      form.insertBefore(messageElement, form.firstChild);
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        messageElement.remove();
      }, 5000);
    }
  }

  private trackContactLinkClick(link: HTMLAnchorElement): void {
    const href = link.getAttribute('href') || '';
    const type = href.startsWith('mailto:') ? 'email' : 'phone';
    
    console.log(`Contact link clicked: ${type}`, href);
    
    // Here you could add analytics tracking
    // gtag('event', 'contact_click', { contact_type: type });
  }

  private initializeAnimations(): void {
    if (prefersReducedMotion()) {
      console.log('Reduced motion preferred, skipping animations');
      return;
    }

    this.setupIntersectionObserver();
    this.addAnimationStyles();
  }

  private setupIntersectionObserver(): void {
    this.animationObserver = createAnimationObserver(
      (entries) => this.handleIntersectionObserver(entries),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe elements for animation
    const animatedElements = querySelectorAll<ElementWithAnimation>(
      '.service-card, .project-card, .pricing-card, .contact-method, .hero-content, .about-content'
    );

    animatedElements.forEach((element) => {
      this.animationObserver?.observe(element);
    });
  }

  private handleIntersectionObserver(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target as ElementWithAnimation;
        const delay = this.getAnimationDelay(element);
        
        addAnimationClass(element, 'animate-in', delay);
        this.animationObserver?.unobserve(element);
      }
    });
  }

  private getAnimationDelay(element: ElementWithAnimation): number {
    const cards = element.parentElement?.children;
    if (!cards) return 0;
    
    const index = Array.from(cards).indexOf(element);
    return index * 100; // 100ms delay between each card
  }

  private addAnimationStyles(): void {
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

  private async preloadCriticalResources(): Promise<void> {
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
      const heroImages = querySelectorAll<HTMLImageElement>('.hero img, .hero-visual img');
      const imagePromises = Array.from(heroImages).map(img => 
        preloadImage(img.src || img.dataset.src || '')
      );

      await Promise.allSettled([...fontPromises, ...imagePromises]);
      console.log('Critical resources preloaded');
    } catch (error) {
      console.warn('Some resources failed to preload:', error);
    }
  }

  private setupPerformanceOptimizations(): void {
    // Lazy load images
    this.setupLazyLoading();
    
    // Setup service worker if available
    this.registerServiceWorker();
  }

  private setupLazyLoading(): void {
    const lazyImages = querySelectorAll<HTMLImageElement>('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
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
    } else {
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

  private async registerServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        // Placeholder for service worker registration
        console.log('Service worker support detected');
        // await navigator.serviceWorker.register('/sw.js');
      } catch (error) {
        console.warn('Service worker registration failed:', error);
      }
    }
  }

  public destroy(): void {
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
(window as any).PortfolioApp = app;