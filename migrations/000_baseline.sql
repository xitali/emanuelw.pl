-- Existing application tables. Contains schema only, no user data.
CREATE TABLE IF NOT EXISTS admin_users (
  id            TEXT PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT NOT NULL,
  message    TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'unread',
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS projects (
  id                    TEXT PRIMARY KEY,
  title                 TEXT NOT NULL,
  short_description     TEXT,
  detailed_description  TEXT,
  technologies          TEXT NOT NULL DEFAULT '[]',
  frontend_technologies TEXT NOT NULL DEFAULT '[]',
  backend_technologies  TEXT NOT NULL DEFAULT '[]',
  tools_and_services    TEXT NOT NULL DEFAULT '[]',
  images                TEXT NOT NULL DEFAULT '[]',
  project_url           TEXT,
  repository_url        TEXT,
  category              TEXT NOT NULL,
  project_type          TEXT,
  featured              INTEGER NOT NULL DEFAULT 0,
  project_status        TEXT,
  completion_date       TEXT,
  hosting_platform      TEXT,
  key_features          TEXT NOT NULL DEFAULT '[]',
  design_style          TEXT,
  color_palette         TEXT NOT NULL DEFAULT '[]',
  target_audience       TEXT,
  is_responsive         INTEGER NOT NULL DEFAULT 0,
  accessibility_features TEXT,
  main_challenge        TEXT,
  innovation            TEXT,
  project_result        TEXT,
  performance_metrics   TEXT NOT NULL DEFAULT '[]',
  success_metrics       TEXT NOT NULL DEFAULT '[]',
  user_feedback         TEXT NOT NULL DEFAULT '[]',
  technical_metrics     TEXT NOT NULL DEFAULT '[]',
  created_at            TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at            TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS services (
  id                TEXT PRIMARY KEY,
  title             TEXT NOT NULL,
  description       TEXT NOT NULL,
  short_description TEXT NOT NULL,
  icon              TEXT NOT NULL,
  features          TEXT NOT NULL DEFAULT '[]',
  price_from        REAL,
  price_currency    TEXT NOT NULL DEFAULT 'PLN',
  active            INTEGER NOT NULL DEFAULT 1,
  order_index       INTEGER NOT NULL DEFAULT 0,
  created_at        TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at        TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS site_settings (
  id            TEXT PRIMARY KEY,
  setting_key   TEXT NOT NULL UNIQUE,
  setting_value TEXT,
  setting_type  TEXT NOT NULL DEFAULT 'text',
  description   TEXT,
  updated_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS testimonials (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    company TEXT,
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    is_published INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
CREATE TABLE IF NOT EXISTS page_visits (
  id TEXT PRIMARY KEY,
  page_path TEXT NOT NULL,
  created_at TEXT NOT NULL
);
