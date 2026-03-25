export interface Newsletter {
  id: number;
  title: string;
  author: string;
  content: string;
  summary: string;
  created_at: string;
}

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const GITHUB_OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER;
const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO;
const DATA_FILE_PATH = 'public/newsletters.json';

const API_BASE = 'https://api.github.com';

async function getFileContent(path: string): Promise<{ content: string; sha: string } | null> {
  try {
    const response = await fetch(
      `${API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3.raw',
        },
      }
    );

    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    const content = await response.text();
    
    const jsonResponse = await fetch(
      `${API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );
    const jsonData = await jsonResponse.json();

    return { content, sha: jsonData.sha };
  } catch (error) {
    console.error('Error fetching file:', error);
    return null;
  }
}

async function updateFileContent(path: string, content: string, sha: string, message: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          content: Buffer.from(content).toString('base64'),
          sha,
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Error updating file:', error);
    return false;
  }
}

async function createFile(path: string, content: string, message: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          content: Buffer.from(content).toString('base64'),
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Error creating file:', error);
    return false;
  }
}

export async function getAllNewsletters(): Promise<Newsletter[]> {
  try {
    const fileData = await getFileContent(DATA_FILE_PATH);
    
    if (!fileData) {
      console.warn('newsletters.json not found, returning empty array');
      return [];
    }

    const data = JSON.parse(fileData.content);
    const newsletters = data.newsletters || [];
    
    return newsletters.sort((a: Newsletter, b: Newsletter) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    return [];
  }
}

export async function getNewsletterById(id: number): Promise<Newsletter | undefined> {
  try {
    const newsletters = await getAllNewsletters();
    return newsletters.find(n => n.id === id);
  } catch (error) {
    console.error('Error fetching newsletter:', error);
    return undefined;
  }
}

export async function createNewsletter(
  title: string,
  author: string,
  content: string
): Promise<Newsletter | null> {
  try {
    const fileData = await getFileContent(DATA_FILE_PATH);
    let newsletters: Newsletter[] = [];
    let sha = '';

    if (fileData) {
      const data = JSON.parse(fileData.content);
      newsletters = data.newsletters || [];
      sha = fileData.sha;
    }

    const id = Math.max(...newsletters.map(n => n.id), 0) + 1;
    const summary = content.substring(0, 100).replace(/\n/g, ' ');
    const created_at = new Date().toISOString();

    const newNewsletter: Newsletter = {
      id,
      title,
      author,
      content,
      summary,
      created_at,
    };

    newsletters.push(newNewsletter);
    const newContent = JSON.stringify({ newsletters }, null, 2);

    const success = sha
      ? await updateFileContent(DATA_FILE_PATH, newContent, sha, `feat: Add newsletter "${title}" by ${author}`)
      : await createFile(DATA_FILE_PATH, newContent, `feat: Initialize newsletters with "${title}" by ${author}`);

    if (success) {
      return newNewsletter;
    }
    
    return null;
  } catch (error) {
    console.error('Error creating newsletter:', error);
    return null;
  }
}

export async function deleteNewsletter(id: number): Promise<boolean> {
  try {
    const fileData = await getFileContent(DATA_FILE_PATH);
    
    if (!fileData) return false;

    const data = JSON.parse(fileData.content);
    const newsletters: Newsletter[] = data.newsletters || [];
    const index = newsletters.findIndex(n => n.id === id);

    if (index === -1) return false;

    const deletedTitle = newsletters[index].title;
    newsletters.splice(index, 1);

    const newContent = JSON.stringify({ newsletters }, null, 2);
    const success = await updateFileContent(
      DATA_FILE_PATH,
      newContent,
      fileData.sha,
      `feat: Delete newsletter "${deletedTitle}"`
    );

    return success;
  } catch (error) {
    console.error('Error deleting newsletter:', error);
    return false;
  }
}