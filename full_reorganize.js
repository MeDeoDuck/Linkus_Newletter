const fs = require('fs');
const path = require('path');

const baseDir = process.cwd();

console.log('=== PROJECT REORGANIZATION AND VERIFICATION ===\n');
console.log(`Working directory: ${baseDir}\n`);

// Files to remove from root and app root (duplicates and old files)
const filesToRemove = [
  // From project root
  'api.newsletters.route.ts',
  'api.newsletters.[id].route.ts',
  'WritePage.tsx',
  'NewsletterDetailPage.tsx',
  'components.NewsletterCard.tsx',
  'components.PasswordModal.tsx',
  'lib.db.ts',
  'app.newsletter.[id].page.tsx',
  'app.write.page.tsx',
  // From app root directory
  path.join('app', 'api.newsletters.route.ts'),
  path.join('app', 'api.newsletters.[id].route.ts'),
  path.join('app', 'write.page.tsx'),
  path.join('app', 'newsletter.[id].page.tsx'),
  path.join('app', 'components.NewsletterCard.tsx'),
  path.join('app', 'components.PasswordModal.tsx'),
  path.join('app', 'lib.db.ts'),
  path.join('app', 'db.ts'),
  path.join('app', 'NewsletterCard.tsx'),
  path.join('app', 'PasswordModal.tsx'),
  path.join('app', 'DeleteRoute.ts'),
  path.join('app', 'db_code.txt'),
  path.join('app', 'page_home.tsx'),
  path.join('app', 'lib'),
  path.join('app', 'api'),
  path.join('app', 'components'),
  path.join('app', 'write'),
  path.join('app', 'newsletters'),
];

console.log('Step 1: Cleaning up duplicate files...\n');

const removedFiles = [];
filesToRemove.forEach(file => {
  const fullPath = path.join(baseDir, file);
  try {
    if (fs.existsSync(fullPath)) {
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        // Remove directory recursively
        removeDirectoryRecursive(fullPath);
        console.log(`✓ Removed directory: ${file}`);
      } else {
        fs.unlinkSync(fullPath);
        console.log(`✓ Removed: ${file}`);
      }
      removedFiles.push(file);
    }
  } catch (error) {
    console.log(`⊘ Skipped ${file}: ${error.message}`);
  }
});

function removeDirectoryRecursive(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(file => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        removeDirectoryRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

console.log(`\nRemoved ${removedFiles.length} items\n`);

// Now recreate the proper structure
console.log('Step 2: Creating proper directory structure...\n');

const directories = [
  'app/api/newsletters/[id]',
  'app/components',
  'app/lib',
  'app/write',
  'app/newsletters/[id]'
];

directories.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Created: ${dir}`);
  } else {
    console.log(`✓ Already exists: ${dir}`);
  }
});

console.log('\nStep 3: Creating required files...\n');

// Create the necessary files
const filesToCreate = {
  'app/lib/db.ts': `import { sql } from "@vercel/postgres";

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
    await sql\`
      CREATE TABLE IF NOT EXISTS newsletters (
        id        SERIAL PRIMARY KEY,
        title     TEXT NOT NULL,
        author    TEXT NOT NULL,
        content   TEXT NOT NULL,
        summary   TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    \`;
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}

export async function getAllNewsletters(): Promise<Newsletter[]> {
  try {
    const result = await sql<Newsletter>\`
      SELECT * FROM newsletters ORDER BY created_at DESC
    \`;
    return result.rows;
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    throw error;
  }
}

export async function getNewsletterById(id: number): Promise<Newsletter | undefined> {
  try {
    const result = await sql<Newsletter>\`
      SELECT * FROM newsletters WHERE id = \${id}
    \`;
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
    const summary = content.substring(0, 100).replace(/\\n/g, " ");
    const result = await sql<Newsletter>\`
      INSERT INTO newsletters (title, author, content, summary)
      VALUES (\${title}, \${author}, \${content}, \${summary})
      RETURNING *
    \`;
    return result.rows[0];
  } catch (error) {
    console.error("Error creating newsletter:", error);
    throw error;
  }
}

export async function deleteNewsletter(id: number): Promise<boolean> {
  try {
    const result = await sql\`
      DELETE FROM newsletters WHERE id = \${id}
    \`;
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    throw error;
  }
}
`,
  'app/api/newsletters/route.ts': `import { NextRequest, NextResponse } from "next/server";
import { getAllNewsletters, createNewsletter, initializeDatabase } from "@/lib/db";

const SITE_PASSWORD = process.env.SITE_PASSWORD || "linkus_2026";

export async function GET(request: NextRequest) {
  try {
    const newsletters = await getAllNewsletters();
    return NextResponse.json(newsletters);
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    return NextResponse.json(
      { error: "뉴스레터 목록을 불러올 수 없습니다." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, author, content, password } = body;

    if (!password || password !== SITE_PASSWORD) {
      return NextResponse.json(
        { error: "비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    if (!title || !author || !content) {
      return NextResponse.json(
        { error: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    const newsletter = await createNewsletter(title, author, content);
    return NextResponse.json(newsletter, { status: 201 });
  } catch (error) {
    console.error("Error creating newsletter:", error);
    return NextResponse.json(
      { error: "뉴스레터 작성에 실패했습니다." },
      { status: 500 }
    );
  }
}
`,
  'app/api/newsletters/[id]/route.ts': `import { NextRequest, NextResponse } from "next/server";
import { getNewsletterById, deleteNewsletter } from "@/lib/db";

const SITE_PASSWORD = process.env.SITE_PASSWORD || "linkus_2026";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "잘못된 ID입니다." },
        { status: 400 }
      );
    }

    const newsletter = await getNewsletterById(id);
    if (!newsletter) {
      return NextResponse.json(
        { error: "뉴스레터를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(newsletter);
  } catch (error) {
    console.error("Error fetching newsletter:", error);
    return NextResponse.json(
      { error: "뉴스레터를 불러올 수 없습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || password !== SITE_PASSWORD) {
      return NextResponse.json(
        { error: "비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    const id = parseInt(params.id);
    const success = await deleteNewsletter(id);
    if (!success) {
      return NextResponse.json(
        { error: "뉴스레터를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    return NextResponse.json(
      { error: "뉴스레터 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
`,
};

Object.entries(filesToCreate).forEach(([file, content]) => {
  const fullPath = path.join(baseDir, file);
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✓ Created: ${file}`);
  } else {
    console.log(`✓ Already exists: ${file}`);
  }
});

console.log('\n=== VERIFICATION ===\n');

const requiredFiles = [
  'app/lib/db.ts',
  'app/api/newsletters/route.ts',
  'app/api/newsletters/[id]/route.ts',
  'app/write/page.tsx',
  'app/newsletters/[id]/page.tsx',
  'app/components/NewsletterCard.tsx',
  'app/components/PasswordModal.tsx',
  'app/layout.tsx',
  'app/page.tsx',
  'app/globals.css'
];

let allPresent = true;
requiredFiles.forEach(file => {
  const fullPath = path.join(baseDir, file);
  if (fs.existsSync(fullPath)) {
    console.log(`✓ ${file}`);
  } else {
    console.log(`✗ MISSING: ${file}`);
    allPresent = false;
  }
});

console.log('\n=== REORGANIZATION COMPLETE ===');
if (allPresent) {
  console.log('✓ All required files are in place!');
} else {
  console.log('✗ Some files are still missing');
}
