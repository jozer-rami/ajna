import Database from "better-sqlite3";

const db = new Database(process.env.DB_PATH || "payments.sqlite");

db.exec(`
  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT,
    reference TEXT UNIQUE
  );
`);

export function insertPayment(userId: string | null, reference: string) {
  const stmt = db.prepare(
    "INSERT INTO payments (userId, reference) VALUES (?, ?)"
  );
  stmt.run(userId, reference);
}

export function getLatestPaymentReference(userId: string | null): string | null {
  const stmt = db.prepare(
    "SELECT reference FROM payments WHERE userId = ? ORDER BY id DESC LIMIT 1"
  );
  const row = stmt.get(userId);
  return row ? (row.reference as string) : null;
}
