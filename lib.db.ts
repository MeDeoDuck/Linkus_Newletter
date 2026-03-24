import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS newsletters (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    title     TEXT NOT NULL,
    author    TEXT NOT NULL,
    content   TEXT NOT NULL,
    summary   TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export interface Newsletter {
  id: number;
  title: string;
  author: string;
  content: string;
  summary: string;
  created_at: string;
}

export function getAllNewsletters(): Newsletter[] {
  const stmt = db.prepare(
    "SELECT * FROM newsletters ORDER BY created_at DESC"
  );
  return stmt.all() as Newsletter[];
}

export function getNewsletterById(id: number): Newsletter | undefined {
  const stmt = db.prepare("SELECT * FROM newsletters WHERE id = ?");
  return stmt.get(id) as Newsletter | undefined;
}

export function createNewsletter(
  title: string,
  author: string,
  content: string
): Newsletter {
  const summary = content.substring(0, 100).replace(/\n/g, " ");
  const stmt = db.prepare(
    "INSERT INTO newsletters (title, author, content, summary) VALUES (?, ?, ?, ?)"
  );
  const result = stmt.run(title, author, content, summary);

  return {
    id: result.lastInsertRowid as number,
    title,
    author,
    content,
    summary,
    created_at: new Date().toISOString(),
  };
}

export function deleteNewsletter(id: number): boolean {
  const stmt = db.prepare("DELETE FROM newsletters WHERE id = ?");
  const result = stmt.run(id);
  return (result.changes as number) > 0;
}
