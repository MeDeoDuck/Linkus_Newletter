# Vercel Postgres로 마이그레이션 가이드

> `better-sqlite3` 빌드 오류를 해결하기 위해 Vercel Postgres로 변경합니다.

---

## 🚀 5단계 마이그레이션 (30분)

### 1단계: package.json 수정 (로컬)

**제거할 패키지:**
```bash
npm uninstall better-sqlite3
```

**추가할 패키지:**
```bash
npm install @vercel/postgres
```

### 2단계: lib/db.ts 수정

**기존 코드 (로컬):**
```typescript
// lib/db.ts - SQLite 사용
import Database from "better-sqlite3";
```

**새 코드 (Vercel Postgres):**

파일: `c:\Users\seank\OneDrive\Desktop\linkus_newletter\lib\db.ts`

```typescript
import { sql } from '@vercel/postgres';

export interface Newsletter {
  id: number;
  title: string;
  author: string;
  content: string;
  summary: string;
  created_at: string;
}

// DB 초기화 (배포 시 한 번만 실행)
export async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS newsletters (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        summary TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Database initialized');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

export async function getAllNewsletters(): Promise<Newsletter[]> {
  try {
    const result = await sql`
      SELECT id, title, author, content, summary, created_at
      FROM newsletters
      ORDER BY created_at DESC
    `;
    return result.rows as Newsletter[];
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    return [];
  }
}

export async function getNewsletterById(id: number): Promise<Newsletter | undefined> {
  try {
    const result = await sql`
      SELECT id, title, author, content, summary, created_at
      FROM newsletters
      WHERE id = ${id}
    `;
    return result.rows[0] as Newsletter | undefined;
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
    const summary = content.substring(0, 100).replace(/\n/g, ' ');
    const result = await sql`
      INSERT INTO newsletters (title, author, content, summary)
      VALUES (${title}, ${author}, ${content}, ${summary})
      RETURNING id, title, author, content, summary, created_at
    `;
    return result.rows[0] as Newsletter;
  } catch (error) {
    console.error('Error creating newsletter:', error);
    return null;
  }
}

export async function deleteNewsletter(id: number): Promise<boolean> {
  try {
    const result = await sql`
      DELETE FROM newsletters WHERE id = ${id}
    `;
    return result.rowCount > 0;
  } catch (error) {
    console.error('Error deleting newsletter:', error);
    return false;
  }
}
```

### 3단계: API 라우트 수정 (async 추가)

**파일: `app/api/newsletters/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAllNewsletters, createNewsletter } from "@/lib/db";

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
    if (!newsletter) {
      return NextResponse.json(
        { error: "뉴스레터 작성에 실패했습니다." },
        { status: 500 }
      );
    }

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

**파일: `app/api/newsletters/[id]/route.ts`**

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
```

---

### 4단계: Vercel에서 Postgres 연결 설정

**Vercel 대시보드에서:**

1. 프로젝트로 이동
2. **Storage** 탭 클릭
3. **Create New** → **Postgres** 선택
4. 데이터베이스 생성
5. **Environment Variables** 자동 추가됨 ✅

---

### 5단계: 로컬에서 테스트 (선택사항)

로컬에서 Vercel Postgres와 연결하려면:

```bash
# .env.local에 추가
POSTGRES_URLCONNECT_STRING=<Vercel에서 제공한 값>
```

또는 로컬에서는 SQLite, 배포에서만 Postgres 사용:

```typescript
// lib/db.ts
if (process.env.NODE_ENV === 'production') {
  // Vercel Postgres 사용
} else {
  // 로컬 SQLite 사용
}
```

---

### 6단계: GitHub에 푸시 및 재배포

```bash
# 변경사항 커밋
git add .
git commit -m "Switch to Vercel Postgres"

# 푸시 (자동 재배포)
git push origin main
```

✅ Vercel이 자동으로 감지하고 재배포합니다!

---

## 🎯 확인 사항

배포 후 확인할 것:

- [ ] Vercel 배포 완료 (배포 로그에서 "Build successful" 확인)
- [ ] Environment Variables에 POSTGRES_URLCONNECT_STRING 있는지 확인
- [ ] https://your-site.vercel.app 접속 테스트
- [ ] "새 글 쓰기" 기능 테스트
- [ ] 글 저장/삭제 기능 테스트

---

## 📊 비교표

| 항목 | SQLite | Vercel Postgres |
|------|--------|-----------------|
| 로컬 개발 | ✅ | ⚠️ (선택) |
| Vercel 배포 | ❌ (오류) | ✅ |
| 데이터 지속성 | ⚠️ (재배포 시 삭제) | ✅ (영구 저장) |
| 확장성 | 낮음 | 높음 |
| 설정 복잡도 | 낮음 | 중간 |

---

## 🆘 문제 해결

### "POSTGRES_URLCONNECT_STRING not found"
```
Vercel 대시보드 → Settings → Environment Variables 확인
```

### 데이터베이스 테이블 없음
```
첫 배포 후 /api/newsletters 호출 시 테이블 자동 생성
또는 Vercel Postgres 콘솔에서 직접 생성
```

### 로컬에서 작동 안 함
```
로컬에서는 SQLite 유지하거나
POSTGRES_URLCONNECT_STRING 환경변수 설정
```

---

## ✅ 다음 단계

1. `npm uninstall better-sqlite3`
2. `npm install @vercel/postgres`
3. 위의 db.ts, API 라우트 코드 업데이트
4. Vercel에서 Postgres 생성
5. `git push`
6. 배포 완료 후 테스트

---

**모든 단계가 완료되면 배포가 성공합니다!** 🎉
