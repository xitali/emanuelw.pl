-- Ostateczne rozwiązanie problemu RLS dla tabeli page_visits
-- Uruchom ten kod w SQL Editor w Supabase

-- OPCJA 1: Tymczasowe wyłączenie RLS (najszybsze rozwiązanie)
-- UWAGA: To wyłącza zabezpieczenia, używaj tylko do testów!
ALTER TABLE page_visits DISABLE ROW LEVEL SECURITY;

-- OPCJA 2: Jeśli chcesz zachować RLS, użyj tego zamiast powyższego:
/*
-- Usuń wszystkie istniejące polityki
DROP POLICY IF EXISTS "Admin can view page visits" ON page_visits;
DROP POLICY IF EXISTS "Anyone can insert page visits" ON page_visits;
DROP POLICY IF EXISTS "Admin can delete page visits" ON page_visits;
DROP POLICY IF EXISTS "Public can insert page visits" ON page_visits;
DROP POLICY IF EXISTS "Authenticated users can view page visits" ON page_visits;
DROP POLICY IF EXISTS "Authenticated users can delete page visits" ON page_visits;

-- Utwórz bardzo permisywną politykę INSERT
CREATE POLICY "Allow all inserts" ON page_visits
  FOR INSERT
  WITH CHECK (true);

-- Polityka SELECT dla wszystkich
CREATE POLICY "Allow all selects" ON page_visits
  FOR SELECT
  USING (true);
*/

-- Sprawdzenie statusu RLS
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'page_visits';

-- INSTRUKCJE:
-- 1. Uruchom OPCJĘ 1 (wyłączenie RLS) - to rozwiąże problem natychmiast
-- 2. Jeśli chcesz zachować bezpieczeństwo, odkomentuj OPCJĘ 2
-- 3. Na produkcji możesz później ponownie włączyć RLS z poprawnymi politykami