import { create } from 'zustand';
import { db } from '../lib/turso';

export interface PageVisit {
  id: string;
  page_path: string;
  visitor_ip?: string;
  user_agent?: string;
  referrer?: string;
  session_id?: string;
  created_at: string;
}

export interface VisitStats {
  totalVisits: number;
  todayVisits: number;
  weeklyVisits: number;
  monthlyVisits: number;
  popularPages: { page_path: string; count: number }[];
  recentVisits: PageVisit[];
}

interface VisitsStore {
  visits: PageVisit[];
  stats: VisitStats | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchVisits: () => Promise<void>;
  fetchStats: () => Promise<void>;
  trackVisit: (pagePath: string) => Promise<void>;
  clearError: () => void;
}

// Generate a simple session ID
const generateSessionId = (): string => {
  const stored = sessionStorage.getItem('visit_session_id');
  if (stored) return stored;
  
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  sessionStorage.setItem('visit_session_id', sessionId);
  return sessionId;
};

// Get visitor info
const getVisitorInfo = () => {
  return {
    user_agent: navigator.userAgent,
    referrer: document.referrer || undefined,
    session_id: generateSessionId(),
  };
};

export const useVisitsStore = create<VisitsStore>((set, get) => ({
  visits: [],
  stats: null,
  loading: false,
  error: null,

  fetchVisits: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await db.pageVisits.getAll();
      if (error) throw error;
      set({ visits: data || [], loading: false });
    } catch (error) {
      console.error('Error fetching visits:', error);
      set({ error: 'Błąd podczas pobierania odwiedzin', loading: false });
    }
  },

  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      // Get total count
      const { count: totalVisits, error: countError } = await db.pageVisits.getTotalCount();
      if (countError) throw countError;

      // Get visits for date calculations
      const { data: allVisits, error: visitsError } = await db.pageVisits.getStats();
      if (visitsError) throw visitsError;

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Calculate stats
      const todayVisits = allVisits?.filter(visit => 
        new Date(visit.created_at) >= today
      ).length || 0;

      const weeklyVisits = allVisits?.filter(visit => 
        new Date(visit.created_at) >= weekAgo
      ).length || 0;

      const monthlyVisits = allVisits?.filter(visit => 
        new Date(visit.created_at) >= monthAgo
      ).length || 0;

      // Calculate popular pages
      const pageCount: { [key: string]: number } = {};
      allVisits?.forEach(visit => {
        pageCount[visit.page_path] = (pageCount[visit.page_path] || 0) + 1;
      });

      const popularPages = Object.entries(pageCount)
        .map(([page_path, count]) => ({ page_path, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      const stats: VisitStats = {
        totalVisits: totalVisits || 0,
        todayVisits,
        weeklyVisits,
        monthlyVisits,
        popularPages,
        recentVisits: (allVisits ?? []).slice(0, 20).map(v => ({
          id: v.id,
          page_path: v.page_path,
          created_at: v.created_at,
        })),
      };

      set({ stats, loading: false });
    } catch (error) {
      console.error('Error fetching visit stats:', error);
      set({ error: 'Błąd podczas pobierania statystyk', loading: false });
    }
  },

  trackVisit: async (pagePath: string) => {
    try {
      // Don't track admin pages
      if (pagePath.startsWith('/admin')) return;
      
      // Check if this page was already visited in this session recently (within 5 minutes)
      const lastVisit = sessionStorage.getItem(`last_visit_${pagePath}`);
      const now = Date.now();
      if (lastVisit && (now - parseInt(lastVisit)) < 5 * 60 * 1000) {
        return; // Skip tracking if visited recently
      }

      const visitorInfo = getVisitorInfo();
      const visitData = {
        page_path: pagePath,
        ...visitorInfo,
      };

      const { error } = await db.pageVisits.create(visitData);
      if (error) {
        // Silently handle RLS errors - don't log to console to avoid spam
        if (error.message?.includes('row-level security policy')) {
          // RLS policy error - skip tracking silently
          return;
        }
        console.error('Error tracking visit:', error);
        return;
      }

      // Update last visit timestamp
      sessionStorage.setItem(`last_visit_${pagePath}`, now.toString());
      
      // Refresh stats if they exist
      const { stats } = get();
      if (stats) {
        get().fetchStats();
      }
    } catch (error: any) {
      // Silently handle RLS errors
      if (error?.message?.includes('row-level security policy')) {
        return;
      }
      console.error('Error tracking visit:', error);
      // Don't show error to user for tracking failures
    }
  },

  clearError: () => set({ error: null }),
}));

// Hook for easy stats access
export const useVisitStats = () => {
  const { stats, loading, error, fetchStats } = useVisitsStore();
  return { stats, loading, error, fetchStats };
};