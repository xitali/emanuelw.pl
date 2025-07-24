import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = '***REMOVED_JWT_TOKEN***';

// Create Supabase client for public operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create Supabase client for authenticated operations (admin)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Function to get authenticated Supabase client
export const getAuthenticatedSupabase = () => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    // For authenticated admin operations, use service role client
    return supabaseAdmin;
  }
  return supabase;
};

// Database types
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          short_description?: string;
          detailed_description?: string;
          technologies: string[];
          frontend_technologies?: string[];
          backend_technologies?: string[];
          tools_and_services?: string[];
          images: string[];
          project_url?: string;
          repository_url?: string;
          category: string;
          project_type?: string;
          featured: boolean;
          project_status?: string;
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
        };
        Insert: {
          id?: string;
          title: string;
          short_description?: string;
          detailed_description?: string;
          technologies: string[];
          frontend_technologies?: string[];
          backend_technologies?: string[];
          tools_and_services?: string[];
          images: string[];
          project_url?: string;
          repository_url?: string;
          category: string;
          project_type?: string;
          featured?: boolean;
          project_status?: string;
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
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          short_description?: string;
          detailed_description?: string;
          technologies?: string[];
          frontend_technologies?: string[];
          backend_technologies?: string[];
          tools_and_services?: string[];
          images?: string[];
          project_url?: string;
          repository_url?: string;
          category?: string;
          project_type?: string;
          featured?: boolean;
          project_status?: string;
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
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          status: 'unread' | 'read' | 'replied';
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          status?: 'unread' | 'read' | 'replied';
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string;
          message?: string;
          status?: 'unread' | 'read' | 'replied';
          created_at?: string;
        };
      };
      admin_users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          created_at?: string;
        };
      };
      services: {
        Row: {
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
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          short_description: string;
          icon: string;
          features: string[];
          price_from?: number;
          price_currency?: string;
          active?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          short_description?: string;
          icon?: string;
          features?: string[];
          price_from?: number;
          price_currency?: string;
          active?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      site_settings: {
        Row: {
          id: string;
          setting_key: string;
          setting_value?: string;
          setting_type: string;
          description?: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          setting_key: string;
          setting_value?: string;
          setting_type?: string;
          description?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          setting_key?: string;
          setting_value?: string;
          setting_type?: string;
          description?: string;
          updated_at?: string;
        };
      };
    };
  };
}

// Helper functions for database operations
export const db = {
  // Projects
  projects: {
    getAll: () => supabase.from('projects').select('*').order('created_at', { ascending: false }),
    getFeatured: () => supabase.from('projects').select('*').eq('featured', true).order('created_at', { ascending: false }),
    getByCategory: (category: string) => supabase.from('projects').select('*').eq('category', category),
    getById: (id: string) => supabase.from('projects').select('*').eq('id', id).single(),
    create: (project: Database['public']['Tables']['projects']['Insert']) => 
      getAuthenticatedSupabase().from('projects').insert(project).select().single(),
    update: (id: string, project: Database['public']['Tables']['projects']['Update']) => {
      return getAuthenticatedSupabase().from('projects').update(project).eq('id', id).select();
    },
    delete: (id: string) => getAuthenticatedSupabase().from('projects').delete().eq('id', id),
  },
  
  // Contact Messages
  contactMessages: {
    getAll: () => getAuthenticatedSupabase().from('contact_messages').select('*').order('created_at', { ascending: false }),
    getUnread: () => getAuthenticatedSupabase().from('contact_messages').select('*').eq('status', 'unread'),
    create: (message: Database['public']['Tables']['contact_messages']['Insert']) => 
      getAuthenticatedSupabase().from('contact_messages').insert(message).select().single(),
    updateStatus: (id: string, status: 'unread' | 'read' | 'replied') => 
      getAuthenticatedSupabase().from('contact_messages').update({ status }).eq('id', id),
    delete: (id: string) => getAuthenticatedSupabase().from('contact_messages').delete().eq('id', id),
  },
  
  // Admin Users
  adminUsers: {
    getAll: () => supabase.from('admin_users').select('*').order('created_at', { ascending: false }),
    getByEmail: (email: string) => supabase.from('admin_users').select('*').eq('email', email).single(),
    getById: (id: string) => supabase.from('admin_users').select('*').eq('id', id).single(),
    create: (user: { email: string; password_hash: string }) => 
      getAuthenticatedSupabase().from('admin_users').insert(user).select().single(),
    update: (id: string, user: Database['public']['Tables']['admin_users']['Update']) => 
      getAuthenticatedSupabase().from('admin_users').update(user).eq('id', id).select().single(),
    delete: (id: string) => getAuthenticatedSupabase().from('admin_users').delete().eq('id', id),
  },

  // Services
  services: {
    getAll: () => supabase.from('services').select('*').order('order_index', { ascending: true }),
    getActive: () => supabase.from('services').select('*').eq('active', true).order('order_index', { ascending: true }),
    getById: (id: string) => supabase.from('services').select('*').eq('id', id).single(),
    create: (service: Database['public']['Tables']['services']['Insert']) => 
      getAuthenticatedSupabase().from('services').insert(service).select().single(),
    update: (id: string, service: Database['public']['Tables']['services']['Update']) => 
      getAuthenticatedSupabase().from('services').update(service).eq('id', id).select().single(),
    delete: (id: string) => getAuthenticatedSupabase().from('services').delete().eq('id', id),
  },

  // Site Settings
  siteSettings: {
    getAll: () => supabase.from('site_settings').select('*').order('setting_key', { ascending: true }),
    getByKey: (key: string) => supabase.from('site_settings').select('*').eq('setting_key', key).single(),
    getByKeys: (keys: string[]) => supabase.from('site_settings').select('*').in('setting_key', keys),
    create: (setting: Database['public']['Tables']['site_settings']['Insert']) => 
      getAuthenticatedSupabase().from('site_settings').insert(setting).select().single(),
    update: (id: string, setting: Database['public']['Tables']['site_settings']['Update']) => 
      getAuthenticatedSupabase().from('site_settings').update(setting).eq('id', id).select().single(),
    updateByKey: (key: string, value: string) => 
      getAuthenticatedSupabase().from('site_settings').update({ setting_value: value, updated_at: new Date().toISOString() }).eq('setting_key', key).select().single(),
    delete: (id: string) => getAuthenticatedSupabase().from('site_settings').delete().eq('id', id),
  },

};

// Authentication helper functions
export const auth = {
  // Login with email and password
  login: async (email: string, password: string) => {
    try {
      // Get user from admin_users table
      const { data: user, error } = await db.adminUsers.getByEmail(email);
      
      if (error || !user) {
        throw new Error('Nieprawidłowe dane logowania');
      }

      // For demo purposes, we'll check if password matches a simple hash
      // In production, you should use proper bcrypt comparison
      const isValidPassword = await verifyPassword(password, user.password_hash);
      
      if (!isValidPassword) {
        throw new Error('Nieprawidłowe dane logowania');
      }

      return {
        user: {
          id: user.id,
          email: user.email,
          createdAt: user.created_at,
        },
        token: generateToken(user.id),
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
};

// Password verification using bcrypt
const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  try {
    // Use bcrypt to compare password with hash
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
};

// Simple token generation (in production, use JWT)
const generateToken = (userId: string): string => {
  return `token_${userId}_${Date.now()}`;
};