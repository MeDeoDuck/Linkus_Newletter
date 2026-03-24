# Linkus Newsletter - Complete Implementation Guide

이 문서는 프로젝트를 완전히 설정하기 위한 단계별 가이드입니다.

## 1. 디렉토리 구조 생성

Windows PowerShell에서 다음 명령어를 실행하세요:

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

Write-Host "모든 디렉토리가 생성되었습니다!"
```

## 2. 파일 배치

각 파일을 해당 경로에 배치하세요.

### 핵심 설정 파일
- `package.json` - 패키지 의존성
- `tsconfig.json` - TypeScript 설정
- `next.config.js` - Next.js 설정
- `.env.local` - 환경변수
- `tailwind.config.ts` - Tailwind 설정
- `postcss.config.js` - PostCSS 설정
- `app/globals.css` - 전역 스타일

### App Router 파일
- `app/layout.tsx` - 메인 레이아웃
- `app/page.tsx` - 메인 페이지 (목록)
- `app/write/page.tsx` - 글 작성 페이지
- `app/newsletter/[id]/page.tsx` - 상세 페이지
- `app/api/newsletters/route.ts` - GET/POST 핸들러
- `app/api/newsletters/[id]/route.ts` - GET/DELETE 핸들러

### 컴포넌트
- `components/PasswordModal.tsx` - 비밀번호 입력 모달
- `components/NewsletterCard.tsx` - 뉴스레터 카드
- `components/MarkdownRenderer.tsx` - 마크다운 렌더러

### 유틸리티
- `lib/db.ts` - 데이터베이스 함수

## 3. 패키지 설치

```bash
npm install
```

## 4. 개발 서버 실행

```bash
npm run dev
```

그리고 http://localhost:3000 으로 접속하세요.

## 5. 빌드 및 배포

```bash
npm run build
npm start
```

---

각 파일의 정확한 내용은 다음 섹션들을 참고하세요.
