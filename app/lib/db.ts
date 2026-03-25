import fs from 'fs';
import path from 'path';

export interface Newsletter {
  id: number;
  title: string;
  author: string;
  content: string;
  summary: string;
  created_at: string;
}

const DATA_FILE = path.join(process.cwd(), 'public', 'newsletters.json');

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify({ newsletters: [] }, null, 2));
    }
  } catch (error) {
    console.error('Error ensuring data file:', error);
  }
}

function readNewsletters(): Newsletter[] {
  try {
    ensureDataFile();
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return parsed.newsletters || [];
  } catch (error) {
    console.error('Error reading newsletters:', error);
    return [];
  }
}

function writeNewsletters(newsletters: Newsletter[]) {
  try {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify({ newsletters }, null, 2));
  } catch (error) {
    console.error('Error writing newsletters:', error);
    throw error;
  }
}

export async function initializeDatabase() {
  ensureDataFile();
}

export async function getAllNewsletters(): Promise<Newsletter[]> {
  try {
    const newsletters = readNewsletters();
    return newsletters.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    throw error;
  }
}

export async function getNewsletterById(id: number): Promise<Newsletter | undefined> {
  try {
    const newsletters = readNewsletters();
    return newsletters.find(n => n.id === id);
  } catch (error) {
    console.error('Error fetching newsletter:', error);
    throw error;
  }
}

export async function createNewsletter(
  title: string,
  author: string,
  content: string
): Promise<Newsletter> {
  try {
    const newsletters = readNewsletters();
    const id = Math.max(...newsletters.map(n => n.id), 0) + 1;
    const summary = content.substring(0, 100).replace(/\n/g, ' ');
    const created_at = new Date().toISOString();
    
    const newNewsletter: Newsletter = {
      id,
      title,
      author,
      content,
      summary,
      created_at
    };
    
    newsletters.push(newNewsletter);
    writeNewsletters(newsletters);
    
    return newNewsletter;
  } catch (error) {
    console.error('Error creating newsletter:', error);
    throw error;
  }
}

export async function deleteNewsletter(id: number): Promise<boolean> {
  try {
    const newsletters = readNewsletters();
    const index = newsletters.findIndex(n => n.id === id);
    
    if (index === -1) {
      return false;
    }
    
    newsletters.splice(index, 1);
    writeNewsletters(newsletters);
    
    return true;
  } catch (error) {
    console.error('Error deleting newsletter:', error);
    throw error;
  }
}