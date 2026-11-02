CREATE TABLE IF NOT EXISTS email_outbox (
  message_id TEXT PRIMARY KEY REFERENCES contact_messages(id) ON DELETE CASCADE,
  owner_sent INTEGER NOT NULL DEFAULT 0,
  sender_sent INTEGER NOT NULL DEFAULT 0,
  attempts INTEGER NOT NULL DEFAULT 0,
  next_attempt_at INTEGER NOT NULL DEFAULT 0,
  lease_until INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  created_at TEXT NOT NULL
);
