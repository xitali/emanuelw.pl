import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '../lib/turso';
import bcrypt from 'bcryptjs';

interface AdminUser {
  id: string;
  email: string;
  createdAt: string;
}

interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
}

interface AuthStore extends AuthState {
  login: (user: AdminUser) => void;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(persist(
  (set) => ({
    user: null,
    isAuthenticated: false,

    login: (user: AdminUser) => {
      set({ user, isAuthenticated: true });
    },

    logout: () => {
      set({ user: null, isAuthenticated: false });
    },

    changePassword: async (currentPassword: string, newPassword: string) => {
      const { user } = useAuthStore.getState();
      if (!user) {
        throw new Error('Użytkownik nie jest zalogowany');
      }

      const { data: userData, error: fetchError } = await db.adminUsers.getById(user.id);
      if (fetchError || !userData) {
        throw new Error('Nie można pobrać danych użytkownika');
      }

      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, userData.password_hash);
      if (!isCurrentPasswordValid) {
        throw new Error('Aktualne hasło jest nieprawidłowe');
      }

      const newPasswordHash = await bcrypt.hash(newPassword, 10);
      const { error: updateError } = await db.adminUsers.update(user.id, {
        password_hash: newPasswordHash,
      });
      if (updateError) {
        throw new Error('Nie udało się zaktualizować hasła');
      }
    },
  }),
  {
    name: 'auth-storage',
    partialize: (state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
    }),
  }
));