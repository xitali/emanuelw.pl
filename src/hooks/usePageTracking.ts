import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useVisitsStore } from '../store/visitsStore';

/**
 * Hook do automatycznego śledzenia odwiedzin stron
 * Używa React Router location do śledzenia zmian ścieżek
 */
export const usePageTracking = () => {
  const location = useLocation();
  const { trackVisit } = useVisitsStore();

  useEffect(() => {
    // Track the current page visit
    trackVisit(location.pathname);
  }, [location.pathname, trackVisit]);
};

/**
 * Hook do ręcznego śledzenia konkretnej strony
 * Przydatny gdy chcemy śledzić konkretne akcje lub strony
 */
export const useTrackPage = () => {
  const { trackVisit } = useVisitsStore();
  
  return {
    trackPage: (pagePath: string) => trackVisit(pagePath),
  };
};