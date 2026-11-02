import "server-only";
import nodemailer from "nodemailer";
import { turso } from "@/lib/turso";

export function emailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD && process.env.SMTP_FROM && process.env.LEAD_NOTIFY_TO);
}

export async function deliverLeadEmails() {
  if (!emailConfigured()) return { configured: false, delivered: 0 };
  const port = Number(process.env.SMTP_PORT || 465);
  if (![465, 587].includes(port)) throw new Error("SMTP_PORT musi mieć wartość 465 lub 587.");
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST, port, secure: port === 465, requireTLS: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
    disableFileAccess: true, disableUrlAccess: true,
  });
  const rows = await turso.execute({
    sql: `UPDATE email_outbox SET lease_until = ? WHERE message_id IN (
      SELECT message_id FROM email_outbox WHERE (owner_sent = 0 OR sender_sent = 0)
      AND attempts < 8 AND next_attempt_at <= ? AND lease_until <= ? LIMIT 5
    ) RETURNING *`, args: [Date.now() + 300000, Date.now(), Date.now()],
  });
  let delivered = 0;
  for (const row of rows.rows) {
    const result = await turso.execute({ sql: "SELECT name,email,subject,message FROM contact_messages WHERE id = ?", args: [row.message_id] });
    const lead = result.rows[0];
    if (!lead) { await turso.execute({ sql: "DELETE FROM email_outbox WHERE message_id = ?", args: [row.message_id] }); continue; }
    try {
      if (!row.owner_sent) {
        await transport.sendMail({ from: process.env.SMTP_FROM, to: process.env.LEAD_NOTIFY_TO, replyTo: String(lead.email), messageId: `<${row.message_id}.owner@emanuelwloch.pl>`, subject: `Nowe zapytanie: ${String(lead.subject).replace(/[\r\n]/g, " ")}`, text: `${lead.name} <${lead.email}>\n\n${lead.message}` });
        await turso.execute({ sql: "UPDATE email_outbox SET owner_sent = 1 WHERE message_id = ?", args: [row.message_id] });
      }
      if (!row.sender_sent) {
        await transport.sendMail({ from: process.env.SMTP_FROM, to: String(lead.email), messageId: `<${row.message_id}.sender@emanuelwloch.pl>`, subject: "Dziękuję za wiadomość — Emanuel Włoch", text: "Dziękuję za kontakt. Wiadomość została zapisana. Zapoznam się z opisem i odpowiem na podany adres.\n\nEmanuel Włoch\nhttps://emanuelwloch.pl" });
        await turso.execute({ sql: "UPDATE email_outbox SET sender_sent = 1 WHERE message_id = ?", args: [row.message_id] });
      }
      await turso.execute({ sql: "UPDATE email_outbox SET lease_until = 0, last_error = NULL WHERE message_id = ?", args: [row.message_id] });
      delivered++;
    } catch {
      const attempts = Number(row.attempts) + 1;
      await turso.execute({ sql: "UPDATE email_outbox SET attempts = ?, next_attempt_at = ?, lease_until = 0, last_error = 'SMTP_DELIVERY_FAILED' WHERE message_id = ?", args: [attempts, Date.now() + Math.min(86400000, 60000 * 2 ** attempts), row.message_id] });
      console.error("Nie udało się dostarczyć powiadomienia SMTP. Wiadomość pozostaje w kolejce.");
    }
  }
  transport.close();
  return { configured: true, delivered };
}
