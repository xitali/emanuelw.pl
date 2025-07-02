"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = throttle;
exports.debounce = debounce;
exports.getScrollPosition = getScrollPosition;
exports.getViewportSize = getViewportSize;
exports.isElementInViewport = isElementInViewport;
exports.smoothScrollTo = smoothScrollTo;
exports.addAnimationClass = addAnimationClass;
exports.isValidEmail = isValidEmail;
exports.sanitizeString = sanitizeString;
exports.formatPhoneNumber = formatPhoneNumber;
exports.getElementById = getElementById;
exports.querySelector = querySelector;
exports.querySelectorAll = querySelectorAll;
exports.addEventListenerWithCleanup = addEventListenerWithCleanup;
exports.createAnimationObserver = createAnimationObserver;
exports.preloadImage = preloadImage;
exports.copyToClipboard = copyToClipboard;
exports.generateId = generateId;
exports.prefersReducedMotion = prefersReducedMotion;
exports.getCSSCustomProperty = getCSSCustomProperty;
exports.setCSSCustomProperty = setCSSCustomProperty;
/**
 * Throttle function to limit the rate of function execution
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
/**
 * Debounce function to delay function execution
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}
/**
 * Get current scroll position
 */
function getScrollPosition() {
    return {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop
    };
}
/**
 * Get viewport size
 */
function getViewportSize() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight
    };
}
/**
 * Check if element is in viewport
 */
function isElementInViewport(element, threshold = 0.1) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const verticalThreshold = windowHeight * threshold;
    const horizontalThreshold = windowWidth * threshold;
    return (rect.top >= -verticalThreshold &&
        rect.left >= -horizontalThreshold &&
        rect.bottom <= windowHeight + verticalThreshold &&
        rect.right <= windowWidth + horizontalThreshold);
}
/**
 * Smooth scroll to element
 */
function smoothScrollTo(element, offset = 0) {
    const target = typeof element === 'string'
        ? document.querySelector(element)
        : element;
    if (!target)
        return;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}
/**
 * Add CSS class with animation support
 */
function addAnimationClass(element, className, delay = 0) {
    if (element._animationApplied)
        return;
    setTimeout(() => {
        element.classList.add(className);
        element._animationApplied = true;
    }, delay);
}
/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
/**
 * Sanitize string input
 */
function sanitizeString(input) {
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
/**
 * Format phone number
 */
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);
    if (match) {
        return `${match[1]} ${match[2]} ${match[3]}`;
    }
    return phone;
}
/**
 * Get element by ID with type safety
 */
function getElementById(id) {
    return document.getElementById(id);
}
/**
 * Query selector with type safety
 */
function querySelector(selector, parent = document) {
    return parent.querySelector(selector);
}
/**
 * Query selector all with type safety
 */
function querySelectorAll(selector, parent = document) {
    return parent.querySelectorAll(selector);
}
function addEventListenerWithCleanup(element, type, listener, options) {
    element.addEventListener(type, listener, options);
    return () => element.removeEventListener(type, listener, options);
}
/**
 * Create intersection observer for animations
 */
function createAnimationObserver(callback, options = {}) {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options
    };
    return new IntersectionObserver(callback, defaultOptions);
}
/**
 * Preload image
 */
function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
    });
}
/**
 * Copy text to clipboard
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    }
    catch (error) {
        console.error('Failed to copy to clipboard:', error);
        return false;
    }
}
/**
 * Generate unique ID
 */
function generateId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
/**
 * Get CSS custom property value
 */
function getCSSCustomProperty(property, element) {
    const target = element || document.documentElement;
    return getComputedStyle(target).getPropertyValue(property).trim();
}
/**
 * Set CSS custom property value
 */
function setCSSCustomProperty(property, value, element) {
    const target = element || document.documentElement;
    target.style.setProperty(property, value);
}
//# sourceMappingURL=helpers.js.map