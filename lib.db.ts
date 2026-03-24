import { sql } from "@vercel/postgres";

export interface Newsletter {
  id: number;
  title: string;
  author: string;
  content: string;
  summary: string;
  created_at: string;
}

// Initialize database table if it doesn't exist
export async function initializeDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS newsletters (
        id        SERIAL PRIMARY KEY,
        title     TEXT NOT NULL,
        author    TEXT NOT NULL,
        content   TEXT NOT NULL,
        summary   TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}

export async function getAllNewsletters(): Promise<Newsletter[]> {
  try {
    const result = await sql<Newsletter>`
      SELECT * FROM newsletters ORDER BY created_at DESC
    `;
    return result.rows;
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    throw error;
  }
}

export async function getNewsletterById(id: number): Promise<Newsletter | undefined> {
  try {
    const result = await sql<Newsletter>`
      SELECT * FROM newsletters WHERE id = ${id}
    `;
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching newsletter:", error);
    throw error;
  }
}

export async function createNewsletter(
  title: string,
  author: string,
  content: string
): Promise<Newsletter> {
  try {
    const summary = content.substring(0, 100).replace(/\n/g, " ");
    const result = await sql<Newsletter>`
      INSERT INTO newsletters (title, author, content, summary)
      VALUES (${title}, ${author}, ${content}, ${summary})
      RETURNING *
    `;
    return result.rows[0];
  } catch (error) {
    console.error("Error creating newsletter:", error);
    throw error;
  }
}

export async function deleteNewsletter(id: number): Promise<boolean> {
  try {
    const result = await sql`
      DELETE FROM newsletters WHERE id = ${id}
    `;
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    throw error;
  }
}
