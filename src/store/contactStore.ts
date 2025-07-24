import { create } from 'zustand';
import { ContactMessage, ContactFormData } from '../types';
import { db } from '../lib/supabase';
import { toast } from 'react-hot-toast';

interface ContactState {
  messages: ContactMessage[];
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchMessages: () => Promise<void>;
  sendMessage: (data: ContactFormData) => Promise<boolean>;
  markAsRead: (id: string) => Promise<void>;
  markAsUnread: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useContactStore = create<ContactState>((set) => ({
  messages: [],
  loading: false,
  error: null,

  fetchMessages: async () => {
    set({ loading: true, error: null });
    
    try {
      const { data, error } = await db.contactMessages.getAll();

      if (error) throw error;

      set({ messages: data || [], loading: false });
    } catch (error) {
      console.error('Error fetching messages:', error);
      set({ 
        error: 'Błąd podczas pobierania wiadomości', 
        loading: false 
      });
    }
  },

  sendMessage: async (data: ContactFormData) => {
    set({ loading: true, error: null });
    
    try {
      const messageData = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        status: 'unread' as const,
      };

      const { data: result, error } = await db.contactMessages.create(messageData);

      if (error) throw error;

      // Dodaj wiadomość do lokalnego stanu
      if (result) {
        const newMessage: ContactMessage = {
          id: result.id,
          name: result.name,
          email: result.email,
          subject: result.subject,
          message: result.message,
          status: result.status,
          created_at: result.created_at,
        };

        set(state => ({
          messages: [newMessage, ...state.messages],
          loading: false
        }));
      }

      toast.success('Wiadomość została wysłana!');
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      set({ 
        error: 'Błąd podczas wysyłania wiadomości', 
        loading: false 
      });
      toast.error('Błąd podczas wysyłania wiadomości');
      return false;
    }
  },

  markAsRead: async (id: string) => {
    try {
      const { error } = await db.contactMessages.updateStatus(id, 'read');

      if (error) throw error;

      set(state => ({
        messages: state.messages.map(msg => 
          msg.id === id ? { ...msg, status: 'read' as const } : msg
        )
      }));

      toast.success('Wiadomość oznaczona jako przeczytana');
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast.error('Błąd podczas oznaczania wiadomości');
    }
  },

  markAsUnread: async (id: string) => {
    try {
      const { error } = await db.contactMessages.updateStatus(id, 'unread');

      if (error) throw error;

      set(state => ({
        messages: state.messages.map(msg => 
          msg.id === id ? { ...msg, status: 'unread' as const } : msg
        )
      }));

      toast.success('Wiadomość oznaczona jako nieprzeczytana');
    } catch (error) {
      console.error('Error marking message as unread:', error);
      toast.error('Błąd podczas oznaczania wiadomości');
    }
  },

  deleteMessage: async (id: string) => {
    try {
      const { error } = await db.contactMessages.delete(id);

      if (error) throw error;

      set(state => ({
        messages: state.messages.filter(msg => msg.id !== id)
      }));

      toast.success('Wiadomość została usunięta');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Błąd podczas usuwania wiadomości');
    }
  },

  clearError: () => set({ error: null }),
}));

// Hook do pobierania statystyk wiadomości
export const useContactStats = () => {
  const messages = useContactStore(state => state.messages);
  
  return {
    total: messages.length,
    unread: messages.filter(m => m.status === 'unread').length,
    read: messages.filter(m => m.status === 'read').length,
  };
};

// Hook do filtrowania wiadomości
export const useFilteredMessages = (filter: 'all' | 'unread' | 'read' = 'all') => {
  const messages = useContactStore(state => state.messages);
  
  if (filter === 'all') return messages;
  return messages.filter(m => m.status === filter);
};