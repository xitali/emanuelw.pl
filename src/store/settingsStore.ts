import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserSettings {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  supabaseUrl: string;
  supabaseKey: string;
  emailjsServiceId: string;
  emailjsTemplateId: string;
  emailjsPublicKey: string;
  githubUrl: string;
  linkedinUrl: string;
  updatedAt: string;
}

interface SettingsStore {
  settings: UserSettings | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchSettings: () => Promise<void>;
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
  setSettings: (settings: UserSettings) => void;
  clearSettings: () => void;
}

const defaultSettings: UserSettings = {
  id: '1',
  firstName: 'Emanuel',
  lastName: 'Wójcik',
  email: 'emanuel@emanuelw.pl',
  phone: '+48 123 456 789',
  bio: 'Jestem doświadczonym programistą full-stack z pasją do tworzenia nowoczesnych aplikacji webowych.',
  supabaseUrl: '',
  supabaseKey: '',
  emailjsServiceId: 'service_example',
  emailjsTemplateId: 'template_example',
  emailjsPublicKey: 'public_key_example',
  githubUrl: 'https://github.com/emanuelw',
  linkedinUrl: 'https://linkedin.com/in/emanuelw',
  updatedAt: new Date().toISOString()
};

export const useSettingsStore = create<SettingsStore>()((
  persist(
    (set, get) => ({
      settings: null,
      loading: false,
      error: null,

      fetchSettings: async () => {
        set({ loading: true, error: null });
        
        try {
          // W rzeczywistej aplikacji tutaj byłoby zapytanie do Supabase
          // const { data, error } = await db.settings.getById('1');
          // if (error) throw error;
          
          // Symulacja ładowania z bazy danych
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Sprawdź czy są zapisane ustawienia w localStorage
          const savedSettings = localStorage.getItem('user-settings');
          let settings = defaultSettings;
          
          if (savedSettings) {
            try {
              const parsed = JSON.parse(savedSettings);
              settings = { ...defaultSettings, ...parsed };
            } catch (error) {
              console.error('Error parsing saved settings:', error);
            }
          }
          
          set({ settings, loading: false });
        } catch (error) {
          console.error('Error fetching settings:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Błąd podczas ładowania ustawień',
            loading: false,
            settings: defaultSettings // Fallback to default settings
          });
        }
      },

      updateSettings: async (updatedSettings: Partial<UserSettings>) => {
        const { settings } = get();
        if (!settings) return;
        
        set({ loading: true, error: null });
        
        try {
          const newSettings = {
            ...settings,
            ...updatedSettings,
            updatedAt: new Date().toISOString()
          };
          
          // W rzeczywistej aplikacji tutaj byłoby zapytanie do Supabase
          // const { data, error } = await db.settings.update(settings.id, newSettings);
          // if (error) throw error;
          
          // Symulacja zapisu do bazy danych
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Zapisz do localStorage jako backup
          localStorage.setItem('user-settings', JSON.stringify(newSettings));
          
          set({ settings: newSettings, loading: false });
        } catch (error) {
          console.error('Error updating settings:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Błąd podczas zapisywania ustawień',
            loading: false 
          });
          throw error;
        }
      },

      setSettings: (settings: UserSettings) => {
        set({ settings });
      },

      clearSettings: () => {
        set({ settings: null, error: null });
        localStorage.removeItem('user-settings');
      }
    }),
    {
      name: 'settings-storage',
      partialize: (state) => ({ settings: state.settings })
    }
  )
));

// Hook do pobierania danych kontaktowych
export const useContactInfo = () => {
  const settings = useSettingsStore(state => state.settings);
  
  return {
    name: settings ? `${settings.firstName} ${settings.lastName}` : 'Emanuel Wójcik',
    email: settings?.email || 'emanuel@emanuelw.pl',
    phone: settings?.phone || '+48 123 456 789',
    bio: settings?.bio || 'Jestem doświadczonym programistą full-stack z pasją do tworzenia nowoczesnych aplikacji webowych.',
    githubUrl: settings?.githubUrl || 'https://github.com/emanuelw',
    linkedinUrl: settings?.linkedinUrl || 'https://linkedin.com/in/emanuelw'
  };
};