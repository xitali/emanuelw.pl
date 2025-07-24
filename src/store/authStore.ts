import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '../lib/supabase';
import bcrypt from 'bcryptjs';

interface AdminUser {
  id: string;
  email: string;
  createdAt: string;
}

interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  token: string | null;
}

interface AuthStore extends AuthState {
  login: (user: AdminUser, token: string) => void;
  logout: () => void;
  setUser: (user: AdminUser | null) => void;
  initializeAuth: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(persist(
  (set) => ({
    user: null,
    isAuthenticated: false,
    token: null,
    
    login: (user: AdminUser, token: string) => {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
      set({ user, token, isAuthenticated: true });
    },
    
    logout: () => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      set({ user: null, token: null, isAuthenticated: false });
    },
    
    setUser: (user: AdminUser | null) => {
      set({ user, isAuthenticated: !!user });
    },
    
    initializeAuth: () => {
      const token = localStorage.getItem('auth_token');
      const userStr = localStorage.getItem('auth_user');
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          set({ user, token, isAuthenticated: true });
        } catch {
          // Clear invalid data
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
        }
      }
    },
    
    changePassword: async (currentPassword: string, newPassword: string) => {
      const { user } = useAuthStore.getState();
      if (!user) {
        throw new Error('Użytkownik nie jest zalogowany');
      }
      
      try {
        // Pobierz aktualnego użytkownika z bazy danych
        const { data: userData, error: fetchError } = await db.adminUsers.getById(user.id);
        if (fetchError || !userData) {
          throw new Error('Nie można pobrać danych użytkownika');
        }
        
        // Sprawdź aktualne hasło
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, userData.password_hash);
        if (!isCurrentPasswordValid) {
          throw new Error('Aktualne hasło jest nieprawidłowe');
        }
        
        // Zahashuj nowe hasło
        const saltRounds = 10;
        const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
        
        // Zaktualizuj hasło w bazie danych
        const { error: updateError } = await db.adminUsers.update(user.id, {
          password_hash: newPasswordHash
        });
        
        if (updateError) {
          throw new Error('Nie udało się zaktualizować hasła');
        }
      } catch (error) {
        throw error;
      }
    },
  }),
  {
    name: 'auth-storage',
    partialize: (state) => ({ 
      user: state.user, 
      token: state.token, 
      isAuthenticated: state.isAuthenticated 
    }),
  }
));