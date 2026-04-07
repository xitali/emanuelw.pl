import { create } from 'zustand';
import { db } from '../lib/turso';
import type { Database } from '../lib/turso';

type Service = Database['public']['Tables']['services']['Row'];
type ServiceInsert = Database['public']['Tables']['services']['Insert'];
type ServiceUpdate = Database['public']['Tables']['services']['Update'];

interface ServicesState {
  services: Service[];
  loading: boolean;
  error: string | null;
}

interface ServicesStore extends ServicesState {
  fetchServices: () => Promise<void>;
  fetchActiveServices: () => Promise<void>;
  createService: (service: ServiceInsert) => Promise<Service | null>;
  updateService: (id: string, service: ServiceUpdate) => Promise<Service | null>;
  deleteService: (id: string) => Promise<boolean>;
  getServiceById: (id: string) => Service | undefined;
  clearError: () => void;
}

export const useServicesStore = create<ServicesStore>((set, get) => ({
  services: [],
  loading: false,
  error: null,

  fetchServices: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await db.services.getAll();
      if (error) throw error;
      set({ services: data || [], loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Błąd podczas pobierania usług',
        loading: false 
      });
    }
  },

  fetchActiveServices: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await db.services.getActive();
      if (error) throw error;
      set({ services: data || [], loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Błąd podczas pobierania aktywnych usług',
        loading: false 
      });
    }
  },

  createService: async (service: ServiceInsert) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await db.services.create(service);
      if (error) throw error;
      
      if (data) {
        set(state => ({ 
          services: [...state.services, data],
          loading: false 
        }));
        return data;
      }
      return null;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Błąd podczas tworzenia usługi',
        loading: false 
      });
      return null;
    }
  },

  updateService: async (id: string, service: ServiceUpdate) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await db.services.update(id, service);
      if (error) throw error;
      
      if (data) {
        set(state => ({ 
          services: state.services.map(s => s.id === id ? data : s),
          loading: false 
        }));
        return data;
      }
      return null;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Błąd podczas aktualizacji usługi',
        loading: false 
      });
      return null;
    }
  },

  deleteService: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const { error } = await db.services.delete(id);
      if (error) throw error;
      
      set(state => ({ 
        services: state.services.filter(s => s.id !== id),
        loading: false 
      }));
      return true;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Błąd podczas usuwania usługi',
        loading: false 
      });
      return false;
    }
  },

  getServiceById: (id: string) => {
    return get().services.find(service => service.id === id);
  },

  clearError: () => {
    set({ error: null });
  },
}));