import { createClient } from '@libsql/client';
import { hash, compare } from 'bcryptjs';
import { pathToFileURL } from 'node:url';

export function validatePassword(password) {
  if (password.length < 12 || Buffer.byteLength(password, 'utf8') > 72) {
    throw new Error('Hasło musi mieć co najmniej 12 znaków i najwyżej 72 bajty UTF-8.');
  }
}

export async function resetPassword(client, account, password) {
  validatePassword(password);
  const passwordHash = await hash(password, 12);
  if (!await compare(password, passwordHash)) throw new Error('Nie udało się zweryfikować nowego hasła.');
  const result = await client.execute({
    sql: 'UPDATE admin_users SET password_hash = ?, credential_version = credential_version + 1 WHERE id = ? AND credential_version = ? AND password_hash = ?',
    args: [passwordHash, account.id, account.credential_version, account.password_hash],
  });
  if (result.rowsAffected !== 1) throw new Error('Konto zmieniło się podczas resetu. Uruchom narzędzie ponownie.');
}

function prompt(label, hidden = false) {
  if (!process.stdin.isTTY || !process.stdout.isTTY) throw new Error('Uruchom narzędzie w lokalnym, interaktywnym terminalu.');
  return new Promise((resolve, reject) => {
    let value = '';
    process.stdout.write(label);
    process.stdin.setRawMode(true);
    process.stdin.setEncoding('utf8');
    process.stdin.resume();
    const finish = (error) => {
      process.stdin.off('data', onData);
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdout.write('\n');
      if (error) reject(error); else resolve(value);
      value = '';
    };
    const onData = (data) => {
      for (const char of data) {
        if (char === '\u0003' || char === '\u0004') return finish(new Error('Anulowano. Hasło nie zostało zmienione.'));
        if (char === '\r' || char === '\n') return finish();
        if (char === '\u007f' || char === '\b') { value = [...value].slice(0, -1).join(''); if (!hidden) process.stdout.write('\b \b'); }
        else if (char >= ' ') { value += char; if (!hidden) process.stdout.write(char); }
      }
    };
    process.stdin.on('data', onData);
  });
}

async function main() {
  if (!process.stdin.isTTY || !process.stdout.isTTY) throw new Error('Uruchom narzędzie w lokalnym, interaktywnym terminalu.');
  const { TURSO_DATABASE_URL: url, TURSO_AUTH_TOKEN: authToken } = process.env;
  if (!url || !authToken) throw new Error('Brak konfiguracji bazy. Uruchom npm run admin:reset z folderu projektu.');
  const client = createClient({ url, authToken });
  try {
    const { rows } = await client.execute('SELECT id, email, password_hash, credential_version FROM admin_users ORDER BY created_at, id');
    if (!rows.length) throw new Error('Brak konta administratora. Reset nie tworzy nowych kont.');
    let account = rows[0];
    if (rows.length > 1) {
      rows.forEach((row, index) => console.log(`${index + 1}. ${row.email}`));
      const number = Number(await prompt('Numer konta: '));
      if (!Number.isInteger(number) || number < 1 || number > rows.length) throw new Error('Nie wybrano poprawnego konta.');
      account = rows[number - 1];
    }
    console.log('Reset hasła administratora. Ctrl+C anuluje bez zapisu. Dotychczasowe sesje zostaną wylogowane.');
    const password = await prompt('Nowe hasło (niewidoczne): ', true);
    validatePassword(password);
    const repeated = await prompt('Powtórz hasło (niewidoczne): ', true);
    if (password !== repeated) throw new Error('Hasła są różne. Nie zapisano zmian.');
    if ((await prompt('Wpisz RESET, aby zapisać: ')) !== 'RESET') throw new Error('Anulowano. Nie zapisano zmian.');
    await resetPassword(client, account, password);
    console.log('Hasło zmienione. Możesz zalogować się na https://emanuelwloch.pl/admin/login.');
  } finally { client.close(); }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => { console.error(error.message?.includes('SQL') ? 'Błąd połączenia z bazą. Nie zapisano hasła.' : error.message); process.exitCode = 1; });
}
