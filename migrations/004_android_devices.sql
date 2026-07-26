CREATE TABLE IF NOT EXISTS android_devices (
  device_id TEXT PRIMARY KEY,
  fcm_token TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
