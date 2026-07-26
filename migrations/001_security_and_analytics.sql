CREATE TABLE IF NOT EXISTS rate_limits (
  bucket_key TEXT NOT NULL,
  window_start TEXT NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (bucket_key, window_start)
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_window_start
ON rate_limits(window_start);

CREATE TABLE IF NOT EXISTS daily_page_views (
  view_date TEXT NOT NULL,
  page_path TEXT NOT NULL,
  view_count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (view_date, page_path)
);

INSERT INTO daily_page_views (view_date, page_path, view_count)
SELECT DATE(created_at), page_path, COUNT(*)
FROM page_visits
GROUP BY DATE(created_at), page_path
ON CONFLICT(view_date, page_path) DO NOTHING;
