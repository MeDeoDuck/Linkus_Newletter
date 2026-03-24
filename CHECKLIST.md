# ✅ Linkus Newsletter - 설정 체크리스트

## 📊 설정 진행 상황

### ✅ 완료된 항목

- [x] `package.json` - 모든 의존성 정의됨
- [x] `tsconfig.json` - TypeScript 설정 완료
- [x] `next.config.js` - Next.js 설정 완료
- [x] `.env.local` - 환경변수 설정 (SITE_PASSWORD=linkus_2026)
- [x] `tailwind.config.ts` - Tailwind CSS 설정
- [x] `postcss.config.js` - PostCSS 설정
- [x] `app/layout.tsx` - 루트 레이아웃
- [x] `app/page.tsx` - 메인 페이지 (목록)
- [x] `app/globals.css` - 전역 스타일
- [x] `app/db.ts` - 데이터베이스 유틸
- [x] `app/PasswordModal.tsx` - 비밀번호 모달
- [x] `app/NewsletterCard.tsx` - 뉴스레터 카드
- [x] API 라우트 코드 준비됨
- [x] 페이지 코드 준비됨

### ⏳ 수행할 단계

#### 1. 패키지 설치 (필수)
```bash
cd "c:\Users\seank\OneDrive\Desktop\linkus_newletter"
npm install
```
- [ ] npm install 완료
- [ ] better-sqlite3 설치 성공
- [ ] node_modules 폴더 생성됨

#### 2. 디렉토리 생성 (필수)
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
- [ ] `app\api` 생성됨
- [ ] `app\api\newsletters` 생성됨
- [ ] `app\api\newsletters\[id]` 생성됨
- [ ] `app\newsletter\[id]` 생성됨
- [ ] `app\write` 생성됨
- [ ] `components` 생성됨
- [ ] `lib` 생성됨

#### 3. 파일 이동 및 정렬 (필수)

**복사/이동할 파일 목록:**

```
프로젝트 루트           →  이동 대상
─────────────────          ──────────────────────────────
components.PasswordModal.tsx      components\PasswordModal.tsx
components.NewsletterCard.tsx     components\NewsletterCard.tsx
lib.db.ts                         lib\db.ts
api.newsletters.route.ts          app\api\newsletters\route.ts
api.newsletters.[id].route.ts     app\api\newsletters\[id]\route.ts
app.write.page.tsx                app\write\page.tsx
app.newsletter.[id].page.tsx       app\newsletter\[id]\page.tsx
```

**Components 폴더:**
- [ ] PasswordModal.tsx 이동됨
- [ ] NewsletterCard.tsx 이동됨

**Lib 폴더:**
- [ ] db.ts 이동됨

**API Routes:**
- [ ] app\api\newsletters\route.ts 생성됨
- [ ] app\api\newsletters\[id]\route.ts 생성됨

**Pages:**
- [ ] app\write\page.tsx 생성됨
- [ ] app\newsletter\[id]\page.tsx 생성됨

#### 4. 개발 서버 실행
```bash
npm run dev
```
- [ ] 개발 서버 시작됨
- [ ] 로그에 "http://localhost:3000" 표시됨

#### 5. 기능 테스트

**메인 페이지 (/)**
- [ ] 페이지 로드됨
- [ ] "새 글 쓰기" 버튼 보임
- [ ] "아직 발행된 뉴스레터가 없습니다." 메시지 표시됨

**글 작성 기능**
- [ ] "새 글 쓰기" 클릭 → 비밀번호 모달 표시
- [ ] 틀린 비밀번호 입력 → 에러 메시지 표시
- [ ] 올바른 비밀번호 (linkus_2026) 입력 → /write 페이지로 이동
- [ ] 글 작성 페이지에서 제목, 작성자, 본문 입력 가능
- [ ] "발행" 클릭 → 비밀번호 모달 표시
- [ ] 비밀번호 입력 → 메인 페이지로 리다이렉트
- [ ] 작성한 글이 메인 페이지에 나타남

**글 상세 보기**
- [ ] 글 카드 클릭 → 상세 페이지로 이동
- [ ] 제목, 작성자, 날짜 표시됨
- [ ] 본문이 마크다운으로 렌더링됨
- [ ] "삭제" 버튼 보임
- [ ] "목록으로 돌아가기" 버튼 작동함

**글 삭제 기능**
- [ ] "삭제" 클릭 → 비밀번호 모달 표시
- [ ] 비밀번호 입력 → 확인 모달 표시
- [ ] "삭제" 버튼 클릭 → 글이 삭제됨
- [ ] 메인 페이지로 리다이렉트됨
- [ ] 삭제된 글이 목록에서 사라짐

---

## 🔍 최종 검증 체크리스트

### 파일 구조 확인
```
┌─ app/
│  ├─ api/
│  │  └─ newsletters/
│  │     ├─ route.ts ✓
│  │     └─ [id]/
│  │        └─ route.ts ✓
│  ├─ newsletter/
│  │  └─ [id]/
│  │     └─ page.tsx ✓
│  ├─ write/
│  │  └─ page.tsx ✓
│  ├─ layout.tsx ✓
│  ├─ page.tsx ✓
│  ├─ globals.css ✓
│  └─ db.ts ✓
├─ components/
│  ├─ PasswordModal.tsx ✓
│  └─ NewsletterCard.tsx ✓
├─ lib/
│  └─ db.ts ✓
├─ package.json ✓
├─ .env.local ✓
└─ ...
```

### 환경변수 확인
- [ ] .env.local 파일 존재
- [ ] `SITE_PASSWORD=linkus_2026` 설정됨

### 의존성 확인
- [ ] npm install 성공
- [ ] next 설치됨
- [ ] react, react-dom 설치됨
- [ ] better-sqlite3 설치됨
- [ ] react-markdown 설치됨
- [ ] tailwindcss 설치됨

---

## 🚀 완료 후 다음 단계

### 배포 준비 (선택사항)
- [ ] `npm run build` 성공
- [ ] `.next` 폴더 생성됨

### 배포 옵션
- **Vercel** - Next.js 최고의 배포 플랫폼
  - 무료 호스팅
  - 자동 배포
  - 환경변수 관리 가능
  
- **Railway** - 간단한 배포
  - SQLite 지원
  - 자동 배포
  
- **Render** - 안정적인 호스팅
  - SQLite 지원
  - 무료 인스턴스 제공

### 추가 기능 (향후)
- [ ] 마크다운 에디터 UI 개선
- [ ] 검색 기능 추가
- [ ] 카테고리/태그 추가
- [ ] 이미지 업로드 지원
- [ ] 다크모드 지원
- [ ] 댓글 시스템
- [ ] 조회수 카운팅

---

## ❌ 일반적인 문제 해결

### 문제: "better-sqlite3 빌드 실패"
```
error: Microsoft Visual C++ 14.0 or greater is required
```
**해결:**
1. https://visualstudio.microsoft.com/downloads/ 방문
2. Visual Studio Build Tools 다운로드
3. "Desktop development with C++" 선택
4. 설치 후 `npm install` 재실행

### 문제: "포트 3000이 이미 사용 중"
```bash
# 다른 포트로 실행
npm run dev -- -p 3001
```

### 문제: "API routes 404 에러"
- [ ] 파일이 올바른 디렉토리에 있는지 확인
- [ ] `[id]` 디렉토리명이 정확한지 확인 (대괄호 포함)
- [ ] 개발 서버 재시작

### 문제: "데이터베이스 에러"
- [ ] `data.db` 파일 권한 확인
- [ ] `.gitignore`에 `*.db` 포함되어 있는지 확인

---

## 📞 지원

문제가 발생하면:
1. 콘솔 에러 메시지 확인
2. 로그 파일 확인
3. 파일 경로와 이름 재확인
4. 개발 서버 재시작 시도

---

## 🎉 완료 신호

다음이 모두 작동하면 프로젝트가 완성된 것입니다:

✅ 메인 페이지 로드
✅ 글 작성 기능 작동 (비밀번호 보호)
✅ 글 상세 보기 작동
✅ 글 삭제 기능 작동 (비밀번호 보호)
✅ 마크다운 렌더링 작동
✅ 반응형 디자인 적용됨

---

**축하합니다! 🎊 Linkus Newsletter가 준비되었습니다!**
