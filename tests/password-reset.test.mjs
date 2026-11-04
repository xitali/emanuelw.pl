import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createClient } from '@libsql/client';
import { hash, compare } from 'bcryptjs';
import { resetPassword, validatePassword } from '../scripts/reset-admin-password.mjs';
let db, account;
beforeEach(async () => {
 db = createClient({ url: ':memory:' });
 await db.execute('CREATE TABLE admin_users(id TEXT PRIMARY KEY,password_hash TEXT,credential_version INTEGER DEFAULT 0)');
 await db.execute({ sql: 'INSERT INTO admin_users VALUES(?,?,0)', args: ['owner', await hash('old-password-for-test', 4)] });
 account = (await db.execute('SELECT * FROM admin_users')).rows[0];
});
afterEach(() => db.close());
describe('local password reset', () => {
 it('changes only the selected account and increments its credential version', async () => {
  await db.execute({ sql: 'INSERT INTO admin_users VALUES(?,?,0)', args: ['other', account.password_hash] });
  await resetPassword(db, account, 'new-password-for-test');
  const rows = (await db.execute('SELECT * FROM admin_users ORDER BY id')).rows;
  expect(rows[0].credential_version).toBe(0);
  expect(rows[0].password_hash).toBe(account.password_hash);
  expect(rows[1].credential_version).toBe(1);
  expect(await compare('new-password-for-test', rows[1].password_hash)).toBe(true);
  expect(await compare('old-password-for-test', rows[1].password_hash)).toBe(false);
 });
 it('rejects short and silently-truncated passwords without writing', async () => {
  expect(() => validatePassword('short')).toThrow();
  expect(() => validatePassword('ą'.repeat(37))).toThrow();
  await expect(resetPassword(db, account, 'short')).rejects.toThrow();
  expect((await db.execute('SELECT * FROM admin_users')).rows[0]).toEqual(account);
 });
 it('does not overwrite a concurrent reset', async () => {
  await db.execute('UPDATE admin_users SET credential_version=1');
  await expect(resetPassword(db, account, 'new-password-for-test')).rejects.toThrow('Konto zmieniło');
  expect((await db.execute('SELECT password_hash FROM admin_users')).rows[0].password_hash).toBe(account.password_hash);
 });
});
