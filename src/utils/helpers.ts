import type { 
  ScrollPosition, 
  ViewportSize, 
  ElementWithAnimation,
  EventHandler,
  Nullable
} from '@/types';

/**
 * Throttle function to limit the rate of function execution
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function(this: any, ...args: Parameters<T>) {
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
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Get current scroll position
 */
export function getScrollPosition(): ScrollPosition {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
  };
}

/**
 * Get viewport size
 */
export function getViewportSize(): ViewportSize {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight
  };
}

/**
 * Check if element is in viewport
 */
export function isElementInViewport(element: Element, threshold = 0.1): boolean {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  const verticalThreshold = windowHeight * threshold;
  const horizontalThreshold = windowWidth * threshold;
  
  return (
    rect.top >= -verticalThreshold &&
    rect.left >= -horizontalThreshold &&
    rect.bottom <= windowHeight + verticalThreshold &&
    rect.right <= windowWidth + horizontalThreshold
  );
}

/**
 * Smooth scroll to element
 */
export function smoothScrollTo(element: Element | string, offset = 0): void {
  const target = typeof element === 'string' 
    ? document.querySelector(element) 
    : element;
    
  if (!target) return;
  
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

/**
 * Add CSS class with animation support
 */
export function addAnimationClass(
  element: ElementWithAnimation, 
  className: string, 
  delay = 0
): void {
  if (element._animationApplied) return;
  
  setTimeout(() => {
    element.classList.add(className);
    element._animationApplied = true;
  }, delay);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string): string {
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

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string): string {
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
export function getElementById<T extends HTMLElement = HTMLElement>(
  id: string
): Nullable<T> {
  return document.getElementById(id) as T | null;
}

/**
 * Query selector with type safety
 */
export function querySelector<T extends Element = Element>(
  selector: string,
  parent: Document | Element = document
): Nullable<T> {
  return parent.querySelector(selector) as T | null;
}

/**
 * Query selector all with type safety
 */
export function querySelectorAll<T extends Element = Element>(
  selector: string,
  parent: Document | Element = document
): NodeListOf<T> {
  return parent.querySelectorAll(selector) as NodeListOf<T>;
}

/**
 * Add event listener with automatic cleanup
 */
export function addEventListenerWithCleanup<K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  type: K,
  listener: EventHandler<HTMLElementEventMap[K]>,
  options?: boolean | AddEventListenerOptions
): () => void;
export function addEventListenerWithCleanup<K extends keyof WindowEventMap>(
  element: Window,
  type: K,
  listener: EventHandler<WindowEventMap[K]>,
  options?: boolean | AddEventListenerOptions
): () => void;
export function addEventListenerWithCleanup<K extends keyof DocumentEventMap>(
  element: Document,
  type: K,
  listener: EventHandler<DocumentEventMap[K]>,
  options?: boolean | AddEventListenerOptions
): () => void;
export function addEventListenerWithCleanup(
  element: any,
  type: string,
  listener: EventListener,
  options?: boolean | AddEventListenerOptions
): () => void {
  element.addEventListener(type, listener, options);
  return () => element.removeEventListener(type, listener, options);
}

/**
 * Create intersection observer for animations
 */
export function createAnimationObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
}

/**
 * Preload image
 */
export function preloadImage(src: string): Promise<void> {
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
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Generate unique ID
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get CSS custom property value
 */
export function getCSSCustomProperty(property: string, element?: Element): string {
  const target = element || document.documentElement;
  return getComputedStyle(target).getPropertyValue(property).trim();
}

/**
 * Set CSS custom property value
 */
export function setCSSCustomProperty(
  property: string, 
  value: string, 
  element?: Element
): void {
  const target = element || document.documentElement;
  (target as HTMLElement).style.setProperty(property, value);
}