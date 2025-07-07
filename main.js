document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing JavaScript');
    
    // Mobile menu toggle
    const hamburger = document.querySelector('#hamburger');
    const navMenu = document.querySelector('#nav-menu');
    
    console.log('Hamburger elements:', { hamburger, navMenu });

    if (hamburger && navMenu) {
        console.log('Hamburger menu elements found, adding event listeners');
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Hamburger clicked');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log('Hamburger active:', hamburger.classList.contains('active'));
            console.log('Nav menu active:', navMenu.classList.contains('active'));
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.navbar-link');
        console.log('Found navbar links:', navLinks.length);
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Nav link clicked, closing menu');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    } else {
        console.error('Hamburger menu elements not found:', { hamburger, navMenu });
    }

    // Smooth scrolling for navigation links (exclude modal triggers)
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([id="openPrivacyModal"]):not([id="openTermsModal"])');
    console.log('Found scroll links:', scrollLinks.length);
    scrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            console.log('Scrolling to:', targetId, target);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navigation
    const navbar = document.querySelector('#navbar');
    console.log('Navbar element:', navbar);
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Modal functionality
    const privacyModal = document.getElementById('privacyModal');
    const termsModal = document.getElementById('termsModal');
    const openPrivacyBtn = document.getElementById('openPrivacyModal');
    const openTermsBtn = document.getElementById('openTermsModal');
    const closePrivacyBtn = document.getElementById('closePrivacyModal');
    const closeTermsBtn = document.getElementById('closeTermsModal');
    
    console.log('Modal elements:', { 
        privacyModal, termsModal, openPrivacyBtn, openTermsBtn, closePrivacyBtn, closeTermsBtn 
    });

    // Check each modal element individually
    if (openPrivacyBtn && privacyModal && closePrivacyBtn) {
        console.log('Privacy modal elements found, adding event listeners');
        openPrivacyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Opening privacy modal');
            privacyModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
        
        closePrivacyBtn.addEventListener('click', () => {
            console.log('Closing privacy modal');
            privacyModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside
        privacyModal.addEventListener('click', (e) => {
            if (e.target === privacyModal) {
                console.log('Closing privacy modal (outside click)');
                privacyModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    } else {
        console.error('Privacy modal elements missing:', { openPrivacyBtn, privacyModal, closePrivacyBtn });
    }
    
    if (openTermsBtn && termsModal && closeTermsBtn) {
        console.log('Terms modal elements found, adding event listeners');
        openTermsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Opening terms modal');
            termsModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
        
        closeTermsBtn.addEventListener('click', () => {
            console.log('Closing terms modal');
            termsModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside
        termsModal.addEventListener('click', (e) => {
            if (e.target === termsModal) {
                console.log('Closing terms modal (outside click)');
                termsModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    } else {
        console.error('Terms modal elements missing:', { openTermsBtn, termsModal, closeTermsBtn });
    }
    
    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (privacyModal && !privacyModal.classList.contains('hidden')) {
                console.log('Closing privacy modal (Escape key)');
                privacyModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
            if (termsModal && !termsModal.classList.contains('hidden')) {
                console.log('Closing terms modal (Escape key)');
                termsModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            const src = img.dataset.src;
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
            }
        });
    }
});