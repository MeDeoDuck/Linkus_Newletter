# Linkus Newsletter - 빠른 시작 가이드

## 📋 현재 상태

현재 프로젝트 폴더에 다음 파일들이 준비되어 있습니다:

```
linkus_newletter/
├── ✅ package.json
├── ✅ tsconfig.json
├── ✅ next.config.js
├── ✅ .env.local (SITE_PASSWORD=linkus_2026)
├── ✅ tailwind.config.ts
├── ✅ postcss.config.js
├── ✅ README.md
├── ✅ app/
│   ├── ✅ layout.tsx
│   ├── ✅ page.tsx
│   ├── ✅ globals.css
│   ├── ✅ db.ts
│   ├── ✅ PasswordModal.tsx
│   └── ✅ NewsletterCard.tsx
├── ✅ app.write.page.tsx
├── ✅ app.newsletter.[id].page.tsx
├── ⚠️ api.newsletters.route.ts (needs to be moved)
├── ⚠️ api.newsletters.[id].route.ts (needs to be moved)
├── ⚠️ lib.db.ts (needs to be moved)
├── ⚠️ components.PasswordModal.tsx (needs to be moved)
├── ⚠️ components.NewsletterCard.tsx (needs to be moved)
└── setup.js (helper script)
```

## 🚀 설정 단계

### 1단계: 필수 패키지 설치

```bash
cd c:\Users\seank\OneDrive\Desktop\linkus_newletter
npm install
```

이 명령은 다음 패키지들을 설치합니다:
- `next`
- `react`, `react-dom`
- `better-sqlite3` (데이터베이스)
- `react-markdown` (마크다운 렌더링)
- Tailwind CSS (스타일링)

### 2단계: 디렉토리 구조 생성

PowerShell에서 다음 명령을 실행하세요:

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
Write-Host "All directories created!"
```

또는 Node.js 스크립트로:

```bash
node setup.js
```

### 3단계: 파일 이동

프로젝트 루트 폴더에 있는 파일들을 올바른 위치로 이동하세요:

#### 📁 components 폴더로:
- `components.PasswordModal.tsx` → `components\PasswordModal.tsx`
- `components.NewsletterCard.tsx` → `components\NewsletterCard.tsx`

#### 📁 lib 폴더로:
- `lib.db.ts` → `lib\db.ts`

#### 📁 app/api/newsletters 폴더로:
- `api.newsletters.route.ts` → `app\api\newsletters\route.ts`

#### 📁 app/api/newsletters/[id] 폴더로:
- `api.newsletters.[id].route.ts` → `app\api\newsletters\[id]\route.ts`

#### 📁 app/write 폴더로:
- `app.write.page.tsx` → `app\write\page.tsx`

#### 📁 app/newsletter/[id] 폴더로:
- `app.newsletter.[id].page.tsx` → `app\newsletter\[id]\page.tsx`

### 4단계: 개발 서버 실행

```bash
npm run dev
```

이제 http://localhost:3000 으로 접속할 수 있습니다!

---

## 🧪 테스트

### 메인 페이지 테스트
1. http://localhost:3000 로 이동
2. "아직 발행된 뉴스레터가 없습니다." 메시지 확인

### 새 글 작성 테스트
1. "새 글 쓰기" 버튼 클릭
2. 비밀번호 모달에서 `linkus_2026` 입력
3. 글 작성 페이지로 이동
4. 제목, 작성자, 본문 입력 후 "발행" 클릭
5. 비밀번호 입력 (linkus_2026)
6. 메인 페이지로 리다이렉트 되고 글이 나타나는지 확인

### 글 삭제 테스트
1. 글 클릭하여 상세 페이지로 이동
2. "삭제" 버튼 클릭
3. 비밀번호 입력
4. 확인 후 삭제 완료

---

## ⚠️ 문제 해결

### 에러: "better-sqlite3 빌드 실패"
**해결:**
- Visual Studio Build Tools 설치 필요
- https://visualstudio.microsoft.com/downloads/ 방문
- "Desktop development with C++" 설치
- 완료 후 `npm install` 다시 실행

### 에러: "API endpoints not found"
**확인 사항:**
1. 파일들이 올바른 디렉토리에 있는지 확인
2. 파일명이 정확한지 확인 (특히 `[id]`)
3. 개발 서버 재시작: Ctrl+C 후 `npm run dev`

### 비밀번호가 작동하지 않음
**확인 사항:**
- `.env.local` 파일에 `SITE_PASSWORD=linkus_2026` 있는지 확인
- 개발 서버 재시작

### 마크다운이 렌더링되지 않음
**확인 사항:**
- `react-markdown` 패키지 설치 확인: `npm list react-markdown`
- 설치 안 되어 있으면: `npm install react-markdown remark-gfm`

---

## 📚 프로젝트 구조

최종 완성된 구조:

```
linkus_newletter/
├── app/
│   ├── api/
│   │   └── newsletters/
│   │       ├── route.ts (GET/POST)
│   │       └── [id]/
│   │           └── route.ts (GET/DELETE)
│   ├── newsletter/
│   │   └── [id]/
│   │       └── page.tsx (상세 페이지)
│   ├── write/
│   │   └── page.tsx (글 작성 페이지)
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── PasswordModal.tsx
│   └── NewsletterCard.tsx
├── lib/
│   └── db.ts
├── public/
├── node_modules/
├── .env.local
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

---

## 🔐 보안 노트

- 비밀번호는 `.env.local`에만 저장됨 (클라이언트 번들에 포함되지 않음)
- 서버와 클라이언트 모두에서 비밀번호 검증
- 마크다운은 안전하게 렌더링됨

---

## 📝 다음 단계

1. 개발 서버 실행 후 모든 기능 테스트
2. 필요시 스타일 커스터마이징
3. 배포 준비 (Vercel, Railway, Render 등)

---

### 지원되는 마크다운 문법

```markdown
# 제목
## 소제목
### 소소제목

**굵은 텍스트**
*이탤릭*
~~취소선~~

- 리스트 항목
- 항목 2

1. 순번 리스트
2. 항목 2

> 인용문

`코드`
\`\`\`
코드 블록
\`\`\`

[링크](https://example.com)
![이미지](url)
```
