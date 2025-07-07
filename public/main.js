document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing JavaScript');
    
    // Initialize animations on scroll
    initScrollAnimations();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize particle background
    initParticleBackground();
    
    // Mobile menu toggle
    const hamburger = document.querySelector('#hamburger');
    const navMenu = document.querySelector('#nav-menu');
    
    // Create mobile menu overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);
    
    console.log('Hamburger elements:', { hamburger, navMenu });

    if (hamburger && navMenu) {
        console.log('Hamburger menu elements found, adding event listeners');
        
        function toggleMobileMenu() {
            const isActive = hamburger.classList.contains('active');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = isActive ? 'auto' : 'hidden';
        }
        
        function closeMobileMenu() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Hamburger clicked');
            toggleMobileMenu();
        });
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', () => {
            console.log('Overlay clicked, closing menu');
            closeMobileMenu();
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.navbar-link');
        console.log('Found navbar links:', navLinks.length);
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Nav link clicked, closing menu');
                closeMobileMenu();
            });
        });
        
        // Close menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                console.log('Escape pressed, closing menu');
                closeMobileMenu();
            }
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

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('section, .card, .project-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Typing effect for hero section


// Particle background effect
function initParticleBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const heroSection = document.querySelector('#home');
    
    if (!heroSection) return;
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    heroSection.style.position = 'relative';
    heroSection.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}



// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('section, .card, .project-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Typing effect for hero section
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const texts = [
        'Full-Stack Developer',
        'UI/UX Designer', 
        'Problem Solver',
        'Creative Thinker'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    typeText();
}



// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Form enhancements
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Button click effects
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .focused {
        transform: scale(1.02);
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);