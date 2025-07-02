import type { ScrollPosition, ViewportSize, ElementWithAnimation, EventHandler, Nullable } from '@/types';
/**
 * Throttle function to limit the rate of function execution
 */
export declare function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void;
/**
 * Debounce function to delay function execution
 */
export declare function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void;
/**
 * Get current scroll position
 */
export declare function getScrollPosition(): ScrollPosition;
/**
 * Get viewport size
 */
export declare function getViewportSize(): ViewportSize;
/**
 * Check if element is in viewport
 */
export declare function isElementInViewport(element: Element, threshold?: number): boolean;
/**
 * Smooth scroll to element
 */
export declare function smoothScrollTo(element: Element | string, offset?: number): void;
/**
 * Add CSS class with animation support
 */
export declare function addAnimationClass(element: ElementWithAnimation, className: string, delay?: number): void;
/**
 * Validate email format
 */
export declare function isValidEmail(email: string): boolean;
/**
 * Sanitize string input
 */
export declare function sanitizeString(input: string): string;
/**
 * Format phone number
 */
export declare function formatPhoneNumber(phone: string): string;
/**
 * Get element by ID with type safety
 */
export declare function getElementById<T extends HTMLElement = HTMLElement>(id: string): Nullable<T>;
/**
 * Query selector with type safety
 */
export declare function querySelector<T extends Element = Element>(selector: string, parent?: Document | Element): Nullable<T>;
/**
 * Query selector all with type safety
 */
export declare function querySelectorAll<T extends Element = Element>(selector: string, parent?: Document | Element): NodeListOf<T>;
/**
 * Add event listener with automatic cleanup
 */
export declare function addEventListenerWithCleanup<K extends keyof HTMLElementEventMap>(element: HTMLElement, type: K, listener: EventHandler<HTMLElementEventMap[K]>, options?: boolean | AddEventListenerOptions): () => void;
export declare function addEventListenerWithCleanup<K extends keyof WindowEventMap>(element: Window, type: K, listener: EventHandler<WindowEventMap[K]>, options?: boolean | AddEventListenerOptions): () => void;
export declare function addEventListenerWithCleanup<K extends keyof DocumentEventMap>(element: Document, type: K, listener: EventHandler<DocumentEventMap[K]>, options?: boolean | AddEventListenerOptions): () => void;
/**
 * Create intersection observer for animations
 */
export declare function createAnimationObserver(callback: (entries: IntersectionObserverEntry[]) => void, options?: IntersectionObserverInit): IntersectionObserver;
/**
 * Preload image
 */
export declare function preloadImage(src: string): Promise<void>;
/**
 * Copy text to clipboard
 */
export declare function copyToClipboard(text: string): Promise<boolean>;
/**
 * Generate unique ID
 */
export declare function generateId(prefix?: string): string;
/**
 * Check if user prefers reduced motion
 */
export declare function prefersReducedMotion(): boolean;
/**
 * Get CSS custom property value
 */
export declare function getCSSCustomProperty(property: string, element?: Element): string;
/**
 * Set CSS custom property value
 */
export declare function setCSSCustomProperty(property: string, value: string, element?: Element): void;
//# sourceMappingURL=helpers.d.ts.map