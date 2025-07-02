// Global types for the portfolio website

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  errors?: string[];
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: Date;
}

export interface AnimationConfig {
  duration: number;
  delay: number;
  easing: string;
}

export interface ScrollPosition {
  x: number;
  y: number;
}

export interface ViewportSize {
  width: number;
  height: number;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  active: boolean;
}

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  featured?: boolean;
}

export interface ProjectCard {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
}

export interface ContactMethod {
  id: string;
  type: 'email' | 'phone' | 'location';
  title: string;
  value: string;
  href: string;
  icon: string;
}

// DOM Element types
export interface ElementWithAnimation extends HTMLElement {
  _animationApplied?: boolean;
}

// Event handler types
export type EventHandler<T = Event> = (event: T) => void;
export type AsyncEventHandler<T = Event> = (event: T) => Promise<void>;

// Utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Animation observer types
export interface IntersectionObserverEntry {
  target: Element;
  isIntersecting: boolean;
  intersectionRatio: number;
  boundingClientRect: DOMRectReadOnly;
  intersectionRect: DOMRectReadOnly;
  rootBounds: DOMRectReadOnly | null;
  time: number;
}

// Performance types
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
}

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: Record<string, string>;
  typography: Record<string, string>;
  breakpoints: Record<string, string>;
}