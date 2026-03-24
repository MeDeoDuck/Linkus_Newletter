# Linkus Newsletter

내부 뉴스레터 발행 사이트

## 기술 스택

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Node.js, Express (Next.js API Routes)
- **Database**: SQLite (better-sqlite3)

## 설치 및 실행

```bash
npm install
npm run dev
```

## 환경변수

`.env.local` 파일에 다음을 설정하세요:

```
SITE_PASSWORD=linkus_2026
```

## 기능

- 뉴스레터 목록 조회
- 뉴스레터 작성 (비밀번호 보호)
- 뉴스레터 삭제 (비밀번호 보호)
- 마크다운 지원
