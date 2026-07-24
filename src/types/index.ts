export interface Project {
  id: string;
  title: string;
  short_description: string;
  detailed_description?: string;
  technologies: string[]; // parsed from JSON string array
  frontend_technologies?: string[];
  backend_technologies?: string[];
  tools_and_services?: string[];
  images: string[]; // parsed from JSON string array
  project_url?: string;
  repository_url?: string;
  category?: string;
  project_type?: string;
  featured?: boolean | number;
  project_status?: string;
  completion_date?: string;
  hosting_platform?: string;
  key_features?: string[];
  design_style?: string;
  color_palette?: string[];
  target_audience?: string;
  is_responsive?: boolean | number;
  accessibility_features?: string;
  main_challenge?: string;
  innovation?: string;
  project_result?: string;
  performance_metrics?: string[];
  success_metrics?: string[];
  user_feedback?: string[];
  technical_metrics?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  id: string;
  name: string;
  full_description: string;
  short_description: string;
  icon_name: string;
  included_features: string[]; // parsed from JSON string array
  starting_price: number;
  currency: string;
  is_active?: boolean | number;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  setting_type?: string;
  setting_description?: string;
  updated_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: string;
  created_at?: string;
}

export interface PageVisit {
  id: string;
  page_path: string;
  visitor_ip?: string;
  user_agent?: string;
  referrer?: string;
  session_id?: string;
  created_at?: string;
}
