import { create } from 'zustand';
import { db } from '../lib/turso';
import type { Database } from '../lib/turso';

type SiteSetting = Database['public']['Tables']['site_settings']['Row'];
type SiteSettingInsert = Database['public']['Tables']['site_settings']['Insert'];

interface SiteSettingsState {
  settings: SiteSetting[];
  loading: boolean;
  error: string | null;
}

interface SiteSettingsStore extends SiteSettingsState {
  fetchSettings: () => Promise<void>;
  getSetting: (key: string) => string | null;
  updateSetting: (key: string, value: string) => Promise<boolean>;
  createSetting: (setting: SiteSettingInsert) => Promise<SiteSetting | null>;
  deleteSetting: (id: string) => Promise<boolean>;
  clearError: () => void;
}

export const useSiteSettingsStore = create<SiteSettingsStore>((set, get) => ({
  settings: [],
  loading: false,
  error: null,

  fetchSettings: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await db.siteSettings.getAll();
      if (error) throw error;
      set({ settings: data || [], loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Błąd podczas pobierania ustawień',
        loading: false 
      });
    }
  },

  getSetting: (key: string) => {
    const setting = get().settings.find(s => s.setting_key === key);
    return setting?.setting_value || null;
  },



  updateSetting: async (key: string, value: string) => {
    set({ loading: true, error: null });
    try {
      // Check if setting exists
      const existingSetting = get().settings.find(s => s.setting_key === key);
      
      if (existingSetting) {
        // Update existing setting
        const { error } = await db.siteSettings.updateByKey(key, value);
        if (error) {
          // If update fails, try to create the setting
          const createResult = await db.siteSettings.create({
            setting_key: key,
            setting_value: value,
            setting_type: 'text'
          });
          if (createResult.error) throw createResult.error;
          
          if (createResult.data) {
            set(state => ({ 
              settings: [...state.settings, createResult.data],
              loading: false 
            }));
          }
        } else {
          // Update local state
          set(state => ({ 
            settings: state.settings.map(s => 
              s.setting_key === key 
                ? { ...s, setting_value: value, updated_at: new Date().toISOString() }
                : s
            ),
            loading: false 
          }));
        }
      } else {
        // Create new setting
        const { data, error } = await db.siteSettings.create({
          setting_key: key,
          setting_value: value,
          setting_type: 'text'
        });
        if (error) throw error;
        
        if (data) {
          set(state => ({ 
            settings: [...state.settings, data],
            loading: false 
          }));
        }
      }
      
      return true;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Błąd podczas aktualizacji ustawienia',
        loading: false 
      });
      return false;
    }
  },

  createSetting: async (setting: SiteSettingInsert) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await db.siteSettings.create(setting);
      if (error) throw error;
      
      if (data) {
        set(state => ({ 
          settings: [...state.settings, data],
          loading: false 
        }));
        return data;
      }
      return null;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Błąd podczas tworzenia ustawienia',
        loading: false 
      });
      return null;
    }
  },

  deleteSetting: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const { error } = await db.siteSettings.delete(id);
      if (error) throw error;
      
      set(state => ({ 
        settings: state.settings.filter(s => s.id !== id),
        loading: false 
      }));
      return true;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Błąd podczas usuwania ustawienia',
        loading: false 
      });
      return false;
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

// Helper hooks for common settings
export const usePersonalInfo = () => {
  const { getSetting } = useSiteSettingsStore();
  
  return {
    firstName: getSetting('personal_first_name') || '',
    lastName: getSetting('personal_last_name') || '',
    email: getSetting('personal_email') || '',
    phone: getSetting('personal_phone') || '',
    title: getSetting('personal_title') || '',
    bio: getSetting('personal_bio') || '',
    address: getSetting('contact_address') || '',
    availability: getSetting('contact_availability') || '',
    fullName: `${getSetting('personal_first_name') || ''} ${getSetting('personal_last_name') || ''}`.trim(),
  };
};

export const useSocialLinks = () => {
  const { getSetting } = useSiteSettingsStore();
  
  return {
    github: getSetting('social_github') || '',
    linkedin: getSetting('social_linkedin') || '',
    instagram: getSetting('social_instagram') || '',
    facebook: getSetting('social_facebook') || '',
  };
};

export const useSiteInfo = () => {
  const { getSetting } = useSiteSettingsStore();
  
  return {
    title: getSetting('site_title') || '',
    description: getSetting('site_description') || '',
  };
};