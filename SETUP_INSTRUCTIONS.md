# Linkus Newsletter - Final Setup Instructions

## Step 1: Create Required Directories

Open PowerShell and run:

```powershell
cd "c:\Users\seank\OneDrive\Desktop\linkus_newletter"
node setup.js
```

Or manually create these directories:
- `app\api\newsletters\[id]`
- `app\newsletter\[id]`
- `app\write`
- `components`
- `lib`

## Step 2: File Mapping

Copy each file from the SOURCE location to the DESTINATION location:

### Configuration & Root Files (Already Created ✓)
| File | Location |
|------|----------|
| package.json | Root |
| tsconfig.json | Root |
| next.config.js | Root |
| .env.local | Root |
| tailwind.config.ts | Root |
| postcss.config.js | Root |
| README.md | Root |

### App Files

#### Layout & Global Styles
| File | Goes To | Purpose |
|------|---------|---------|
| app/layout.tsx | `app/layout.tsx` | Root layout wrapper |
| app/globals.css | `app/globals.css` | Global CSS & Tailwind |

#### Pages
| File | Goes To |  Purpose |
|------|---------|----------|
| app/page.tsx | `app/page.tsx` | Main page - Newsletter list |
| app/WritePage.tsx | `app/write/page.tsx` | Write page - Create newsletter |
| app/NewsletterDetailPage.tsx | `app/newsletter/[id]/page.tsx` | Detail page - View newsletter |

#### Components
| File | Goes To |
|------|---------|
| app/PasswordModal.tsx | `components/PasswordModal.tsx` |
| app/NewsletterCard.tsx | `components/NewsletterCard.tsx` |

#### Database & Utilities
| File | Goes To |
|------|---------|
| app/db.ts | `lib/db.ts` |

#### API Routes
| File | Goes To |
|------|---------|
| app/api/route.ts | `app/api/newsletters/route.ts` |
| app/DeleteRoute.ts | `app/api/newsletters/[id]/route.ts` |

## Step 3: Create Missing Files

You need to create these files (below is the content for each):

### lib/db.ts
```typescript
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
```

### app/api/newsletters/route.ts
```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAllNewsletters, createNewsletter } from "@/lib/db";

const SITE_PASSWORD = process.env.SITE_PASSWORD || "linkus_2026";

export async function GET(request: NextRequest) {
  try {
    const newsletters = getAllNewsletters();
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

    const newsletter = createNewsletter(title, author, content);
    return NextResponse.json(newsletter, { status: 201 });
  } catch (error) {
    console.error("Error creating newsletter:", error);
    return NextResponse.json(
      { error: "뉴스레터 작성에 실패했습니다." },
      { status: 500 }
    );
  }
}
```

### app/api/newsletters/[id]/route.ts
```typescript
import { NextRequest, NextResponse } from "next/server";
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

    const newsletter = getNewsletterById(id);
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
    const success = deleteNewsletter(id);
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
```

### app/write/page.tsx
```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PasswordModal from '@/components/PasswordModal';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !content.trim()) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    setShowPasswordModal(true);
  };

  const handlePasswordConfirm = async (password: string) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/newsletters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          author,
          content,
          password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || '글 작성에 실패했습니다.');
        setLoading(false);
        return;
      }

      router.push('/');
    } catch (err) {
      setError('글 작성 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-serif font-bold mb-8">새 글 작성</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="뉴스레터 제목을 입력하세요"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            작성자
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="작성자 이름을 입력하세요"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            본문
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="뉴스레터 내용을 입력하세요 (마크다운 지원)"
            rows={12}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="flex-1 px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '발행 중...' : '발행'}
          </button>
        </div>
      </form>

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onConfirm={handlePasswordConfirm}
        title="비밀번호 입력"
      />
    </div>
  );
}
```

### app/newsletter/[id]/page.tsx
```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PasswordModal from '@/components/PasswordModal';
import ReactMarkdown from 'react-markdown';

interface Newsletter {
  id: number;
  title: string;
  author: string;
  content: string;
  created_at: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export default function NewsletterDetailPage() {
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    if (!id) return;
    fetchNewsletter();
  }, [id]);

  const fetchNewsletter = async () => {
    try {
      const res = await fetch(`/api/newsletters/${id}`);
      if (res.ok) {
        const data = await res.json();
        setNewsletter(data);
      } else {
        setError('뉴스레터를 찾을 수 없습니다.');
      }
    } catch (err) {
      setError('뉴스레터를 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordConfirm = async (password: string) => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    setDeleting(true);

    try {
      const res = await fetch(`/api/newsletters/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || '삭제에 실패했습니다.');
        setDeleting(false);
        return;
      }

      router.push('/');
    } catch (err) {
      setError('삭제 중 오류가 발생했습니다.');
      setDeleting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-600">로딩 중...</div>;
  }

  if (error || !newsletter) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <button
        onClick={() => router.push('/')}
        className="mb-6 text-blue-600 hover:text-blue-800"
      >
        ← 목록으로 돌아가기
      </button>

      <article>
        <h1 className="text-4xl font-serif font-bold mb-4">
          {newsletter.title}
        </h1>
        <div className="flex justify-between items-center pb-6 border-b border-gray-200 mb-8">
          <p className="text-gray-600">
            {newsletter.author} • {formatDate(newsletter.created_at)}
          </p>
          <button
            onClick={handleDeleteClick}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            삭제
          </button>
        </div>

        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{newsletter.content}</ReactMarkdown>
        </div>
      </article>

      <PasswordModal
        isOpen={showPasswordModal && !showDeleteConfirm}
        onClose={() => {
          setShowPasswordModal(false);
          setShowDeleteConfirm(false);
        }}
        onConfirm={handlePasswordConfirm}
        title={showDeleteConfirm ? "정말 삭제하시겠습니까?" : "비밀번호 입력"}
      />

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => { setShowDeleteConfirm(false); setShowPasswordModal(false); }}>
          <div className="bg-white rounded-lg shadow-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-serif font-bold mb-4">정말 삭제하시겠습니까?</h2>
            <p className="text-gray-600 mb-6">이 작업은 되돌릴 수 없습니다.</p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setShowPasswordModal(false);
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                취소
              </button>
              <button
                onClick={() => handlePasswordConfirm('')}
                disabled={deleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### components/PasswordModal.tsx
```typescript
'use client';

import { useState } from 'react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  title?: string;
}

export default function PasswordModal({
  isOpen,
  onClose,
  onConfirm,
  title = '비밀번호 입력',
}: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'linkus_2026') {
      setPassword('');
      setError('');
      onConfirm(password);
      onClose();
    } else {
      setError('비밀번호가 올바르지 않습니다.');
      setPassword('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-serif font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### components/NewsletterCard.tsx
```typescript
'use client';

import Link from 'next/link';

interface NewsletterCardProps {
  newsletter: {
    id: number;
    title: string;
    author: string;
    summary: string;
    created_at: string;
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export default function NewsletterCard({ newsletter }: NewsletterCardProps) {
  return (
    <Link href={`/newsletter/${newsletter.id}`}>
      <div className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className="text-xl font-serif font-bold mb-2 text-gray-900">
          {newsletter.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {newsletter.author} • {formatDate(newsletter.created_at)}
        </p>
        <p className="text-gray-700 line-clamp-3">
          {newsletter.summary}
        </p>
      </div>
    </Link>
  );
}
```

## Step 4: Install Dependencies

```bash
cd "c:\Users\seank\OneDrive\Desktop\linkus_newletter"
npm install
```

## Step 5: Run Development Server

```bash
npm run dev
```

Then open http://localhost:3000

---

## Troubleshooting

**Q: Directory creation errors?**
A: Run `node setup.js` to create all directories at once

**Q: Better-sqlite3 installation fails?**
A: This requires Python and build tools. Install from https://visualstudio.microsoft.com/downloads/ (Desktop Development with C++)

**Q: API routes not found?**
A: Make sure files are in the correct locations (check the mapping table above)

**Q: Password not working?**
A: Verify `.env.local` has `SITE_PASSWORD=linkus_2026`
