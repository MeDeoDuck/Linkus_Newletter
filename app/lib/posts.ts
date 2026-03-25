import fs from 'fs';
import path from 'path';

export interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  summary: string;
}

const POSTS_DIR = path.join(process.cwd(), 'public', 'posts');

function parseFrontmatter(content: string): { frontmatter: Record<string, string>; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const [, frontmatterStr, body] = match;
  const frontmatter: Record<string, string> = {};

  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
    }
  });

  return { frontmatter, body: body.trim() };
}

function getPostIdFromFilename(filename: string): string {
  return filename.replace(/\.md$/, '');
}

export function getAllPosts(): Post[] {
  try {
    if (!fs.existsSync(POSTS_DIR)) {
      fs.mkdirSync(POSTS_DIR, { recursive: true });
      return [];
    }

    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
    
    const posts = files.map(file => {
      const filePath = path.join(POSTS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { frontmatter, body } = parseFrontmatter(content);
      
      const summary = body
        .replace(/[#*`]/g, '')
        .split('\n')[0]
        .substring(0, 100);

      return {
        id: getPostIdFromFilename(file),
        title: frontmatter.title || file,
        author: frontmatter.author || 'Anonymous',
        date: frontmatter.date || new Date().toISOString(),
        content: body,
        summary,
      };
    });

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export function getPostById(id: string): Post | undefined {
  try {
    const filePath = path.join(POSTS_DIR, `${id}.md`);
    
    if (!fs.existsSync(filePath)) {
      return undefined;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const { frontmatter, body } = parseFrontmatter(content);
    const summary = body
      .replace(/[#*`]/g, '')
      .split('\n')[0]
      .substring(0, 100);

    return {
      id,
      title: frontmatter.title || id,
      author: frontmatter.author || 'Anonymous',
      date: frontmatter.date || new Date().toISOString(),
      content: body,
      summary,
    };
  } catch (error) {
    console.error('Error reading post:', error);
    return undefined;
  }
}