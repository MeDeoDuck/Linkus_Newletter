# Complete Linkus Newsletter Project Setup

이 파일은 프로젝트를 완전히 설정하기 위한 모든 코드를 포함합니다.

## 섹션 1: 패키지 설정 및 설치

### 명령어:
```bash
cd c:\Users\seank\OneDrive\Desktop\linkus_newletter
npm install
```

### package.json (이미 생성됨)
기본 패키지 설정 완료

### 명령어: 디렉토리 생성
```powershell
$dirs = @(
  "app\api\newsletters\[id]",
  "app\newsletter\[id]",
  "app\write",
  "components",
  "lib"
)
foreach ($dir in $dirs) {
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
}
```

---

## 섹션 2: 핵심 라이브러리 파일

### lib/db.ts
경로: `app\lib\db.ts`

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

---

## 섹션 3: 컴포넌트

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

### components/MarkdownRenderer.tsx
```typescript
'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
```

---

## 섹션 4: API 라우트

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

---

## 섹션 5: 페이지들

### app/page.tsx (메인 페이지)
```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PasswordModal from '@/components/PasswordModal';
import NewsletterCard from '@/components/NewsletterCard';

interface Newsletter {
  id: number;
  title: string;
  author: string;
  summary: string;
  created_at: string;
}

export default function Home() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      const res = await fetch('/api/newsletters');
      if (res.ok) {
        const data = await res.json();
        setNewsletters(data);
      }
    } catch (error) {
      console.error('Failed to fetch newsletters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewArticle = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordConfirm = (password: string) => {
    router.push('/write');
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold">최신 뉴스레터</h2>
        <button
          onClick={handleNewArticle}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          새 글 쓰기
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">로딩 중...</p>
      ) : newsletters.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">아직 발행된 뉴스레터가 없습니다.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {newsletters.map((newsletter) => (
            <NewsletterCard key={newsletter.id} newsletter={newsletter} />
          ))}
        </div>
      )}

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onConfirm={handlePasswordConfirm}
        title="새 글을 쓰기 위해 비밀번호를 입력하세요"
      />
    </div>
  );
}
```

[REST OF FILE - TOO LONG, CONTINUES BELOW]
