// Project interfaces
export type ProjectCategory = 'web' | 'mobile' | 'desktop' | 'other';
export type ProjectStatus = 'active' | 'archived' | 'in-development';

export interface Project {
  id: string;
  title: string;
  short_description?: string;
  detailed_description?: string;
  technologies?: string[];
  frontend_technologies?: string[];
  backend_technologies?: string[];
  tools_and_services?: string[];
  images?: string[];
  project_url?: string;
  repository_url?: string;
  category: ProjectCategory;
  project_type?: string;
  featured: boolean;
  project_status?: ProjectStatus;
  completion_date?: string;
  hosting_platform?: string;
  key_features?: string[];
  design_style?: string;
  color_palette?: string[];
  target_audience?: string;
  is_responsive?: boolean;
  accessibility_features?: string;
  main_challenge?: string;
  innovation?: string;
  project_result?: string;
  performance_metrics?: string[];
  success_metrics?: string[];
  user_feedback?: string[];
  technical_metrics?: string[];
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Auth interfaces
export interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  short_description: string;
  icon: string;
  features: string[];
  price_from?: number;
  price_currency: string;
  active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value?: string;
  setting_type: string;
  description?: string;
  updated_at: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  bio: string;
  address: string;
  availability: string;
  fullName: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  instagram: string;
  facebook: string;
}

export interface SiteInfo {
  title: string;
  description: string;
}

export interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  token: string | null;
}

// Form interfaces
export interface ProjectFormData {
  title: string;
  short_description: string;
  detailed_description: string;
  frontend_technologies: string;
  backend_technologies: string;
  tools_and_services: string;
  project_url: string;
  repository_url: string;
  category: ProjectCategory;
  project_type: string;
  featured: boolean;
  project_status: ProjectStatus;
  completion_date: string;
  hosting_platform: string;
  key_features: string;
  design_style: string;
  color_palette: string;
  target_audience: string;
  is_responsive: boolean;
  accessibility_features: string;
  main_challenge: string;
  innovation: string;
  project_result: string;
  performance_metrics: string;
  success_metrics: string;
  user_feedback: string;
  technical_metrics: string;
  images: string;
}

// API interfaces
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Dashboard interfaces
export interface DashboardStats {
  totalProjects: number;
  totalMessages: number;
  unreadMessages: number;
  recentProjects: Project[];
  recentMessages: ContactMessage[];
}