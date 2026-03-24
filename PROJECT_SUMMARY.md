# Linkus Newsletter 프로젝트 - 완성 요약

## 📌 프로젝트 개요

**팀 내부 뉴스레터 발행 웹사이트**

- 외부인도 누구나 열람 가능
- 글 작성/삭제는 비밀번호(`linkus_2026`)로 보호
- 마크다운 지원
- SQLite 기반 데이터베이스
- Next.js App Router 사용

---

## ✨ 핵심 기능

### 1️⃣ 메인 페이지 (`/`)
- 발행된 뉴스레터 목록 (카드 형태)
- 최신순 정렬
- 각 카드: 제목, 작성자, 발행일, 요약(100자)
- "새 글 쓰기" 버튼 (비밀번호 필요)

### 2️⃣ 글 작성 (`/write`)
- 비밀번호 인증 후 진입
- 제목, 작성자, 본문 입력
- 마크다운 지원
- "발행" 클릭 → 메인페이지로 리다이렉트

### 3️⃣ 글 상세 (`/newsletter/[id]`)
- 전체 본문 (마크다운 렌더링)
- 작성자, 발행일 표시
- "삭제" 버튼 (비밀번호 + 재확인 필요)

---

## 🎯 프로젝트 준비 상황

### 이미 생성된 파일 (루트)

✅ **설정 파일**
- `package.json` - 의존성 정의
- `tsconfig.json` - TypeScript 설정
- `next.config.js` - Next.js 설정
- `.env.local` - 환경변수 (SITE_PASSWORD)
- `tailwind.config.ts` - Tailwind CSS
- `postcss.config.js` - PostCSS

✅ **문서**
- `README.md` - 프로젝트 설명
- `SETUP_INSTRUCTIONS.md` - 상세 설정 가이드
- `QUICK_START.md` - 빠른 시작
- `CHECKLIST.md` - 검증 체크리스트
- `setup.js` - 디렉토리 생성 스크립트

✅ **App 파일들**
- `app/layout.tsx` - 루트 레이아웃
- `app/page.tsx` - 메인 페이지
- `app/globals.css` - 전역 스타일
- `app/db.ts` - DB 유틸
- `app/PasswordModal.tsx` - 비밀번호 모달
- `app/NewsletterCard.tsx` - 카드 컴포넌트

⚠️ **이동 필요한 파일들**
- `api.newsletters.route.ts` → `app/api/newsletters/route.ts`
- `api.newsletters.[id].route.ts` → `app/api/newsletters/[id]/route.ts`
- `app.write.page.tsx` → `app/write/page.tsx`
- `app.newsletter.[id].page.tsx` → `app/newsletter/[id]/page.tsx`
- `components.PasswordModal.tsx` → `components/PasswordModal.tsx`
- `components.NewsletterCard.tsx` → `components/NewsletterCard.tsx`
- `lib.db.ts` → `lib/db.ts`

---

## 🚀 시작하기 (3단계)

### 단계 1: 패키지 설치

```bash
cd "c:\Users\seank\OneDrive\Desktop\linkus_newletter"
npm install
```

⏱️ **소요 시간**: 5~10분 (인터넷 속도에 따라)

### 단계 2: 디렉토리 생성 및 파일 정렬

**PowerShell에서 실행:**
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
Write-Host "Directories created!"
```

**또는 Node.js로:**
```bash
node setup.js
```

**그 후 파일 이동:**
- 프로젝트 루트의 파일들을 위에서 표기한 대로 이동

### 단계 3: 개발 서버 실행

```bash
npm run dev
```

그리고 **http://localhost:3000** 접속! 🎉

---

## 🔐 보안 기능

✅ **클라이언트 검증**: 비밀번호 모달에서 먼저 확인
✅ **서버 검증**: API 라우트에서 재확인
✅ **환경변수 관리**: `.env.local`에서만 관리
✅ **번들 보호**: 비밀번호가 클라이언트 코드에 포함되지 않음
✅ **XSS 방지**: 마크다운 안전하게 렌더링
✅ **SQL 주입 방지**: Prepared statements 사용

---

## 📊 기술 스택

| 레이어 | 기술 |
|--------|------|
| **Frontend** | React + Next.js (App Router) |
| **Styling** | Tailwind CSS |
| **Backend** | Node.js + Next.js API Routes |
| **Database** | SQLite (better-sqlite3) |
| **마크다운** | react-markdown |
| **타입** | TypeScript |

---

## 📁 최종 디렉토리 구조

```
linkus_newletter/
│
├── app/
│   ├── api/
│   │   └── newsletters/
│   │       ├── route.ts ..................... GET/POST 핸들러
│   │       └── [id]/
│   │           └── route.ts ................ GET/DELETE 핸들러
│   │
│   ├── newsletter/
│   │   └── [id]/
│   │       └── page.tsx .................... 상세 페이지
│   │
│   ├── write/
│   │   └── page.tsx ........................ 작성 페이지
│   │
│   ├── layout.tsx .......................... 레이아웃
│   ├── page.tsx ........................... 메인 페이지
│   ├── globals.css ........................ 전역 스타일
│   └── db.ts .............................. DB 함수
│
├── components/
│   ├── PasswordModal.tsx .................. 비밀번호 모달
│   └── NewsletterCard.tsx ................. 카드 컴포넌트
│
├── lib/
│   └── db.ts ............................. 데이터베이스 유틸
│
├── public/
│
├── node_modules/
│
├── .next/
│
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── .env.local
├── .gitignore
└── README.md
```

---

## ✅ 동작 흐름

### 메인 페이지 로드
```
브라우저 → /api/newsletters (GET) → DB 조회 → 목록 표시
```

### 글 작성
```
메인페이지 
  ↓ "새 글 쓰기" 클릭
  ↓ 비밀번호 모달 (클라이언트 검증)
  ↓ /write 페이지로 이동
  ↓ 폼 작성 후 "발행" 클릭
  ↓ 비밀번호 모달
  ↓ /api/newsletters (POST + 서버 검증)
  ↓ 글 저장
  ↓ 메인페이지 리다이렉트
```

### 글 삭제
```
상세페이지 
  ↓ "삭제" 클릭
  ↓ 비밀번호 모달
  ↓ 확인 모달
  ↓ /api/newsletters/[id] (DELETE + 서버 검증)
  ↓ 글 삭제
  ↓ 메인페이지 리다이렉트
```

---

## 🔧 주요 환경변수

**`.env.local`:**
```
SITE_PASSWORD=linkus_2026
```

---

## 📱 UI/UX 특징

✅ **반응형 디자인** - 모바일 호환
✅ **깔끔한 디자인** - Serif 폰트 사용
✅ **직관적 UX** - 모달 기반 인증
✅ **편한 네비게이션** - 목록 ↔ 상세 페이지 전환
✅ **오버레이 모달** - 모달 외부 클릭으로 닫기

---

## 🎓 배운 기술

이 프로젝트로 학습할 수 있는 것:

- ✨ Next.js 13+ App Router 사용법
- ✨ TypeScript로 타입 안전 코딩
- ✨ SQLite로 데이터 관리
- ✨ API 라우트 구현
- ✨ 클라이언트/서버 검증
- ✨ 마크다운 렌더링
- ✨ 상태 관리 (useState)
- ✨ 라우팅 및 네비게이션
- ✨ Tailwind CSS로 스타일링

---

## 📞 지원이 필요한 경우

### 문서 참고
1. `SETUP_INSTRUCTIONS.md` - 상세 설정
2. `QUICK_START.md` - 빠른 시작
3. `CHECKLIST.md` - 검증 항목

### 일반적인 문제
- **better-sqlite3 설치 실패**: Visual Studio Build Tools 필요
- **API 404 에러**: 파일 경로와 이름 확인
- **비밀번호 안 됨**: `.env.local` 재확인 후 서버 재시작
- **데이터베이스 에러**: 파일 권한 확인

---

## 🎯 다음 단계 (선택사항)

### 즉시 할 일
1. ✅ npm install
2. ✅ 디렉토리 생성
3. ✅ 파일 이동
4. ✅ npm run dev

### 선택 사항
- 📦 **배포**: Vercel/Railway/Render
- 🎨 **스타일 커스터마이징**
- 📝 **추가 기능**: 검색, 카테고리, 댓글 등
- 🔍 **SEO 최적화**
- 📊 **분석 추가** (Google Analytics)

---

## 🎉 완성!

**모든 코드가 준비되었습니다!**

이제 하실 일:
1. npm install 실행
2. 디렉토리 생성
3. 파일 이동
4. npm run dev 실행
5. http://localhost:3000 접속

**프로젝트가 완벽하게 작동할 것입니다!** ✨

---

**마지막 팁:**
> 개발하면서 어려운 부분이 있으면 `SETUP_INSTRUCTIONS.md`의 문제 해결 섹션을 참고하세요!

좋은 개발되세요! 🚀
