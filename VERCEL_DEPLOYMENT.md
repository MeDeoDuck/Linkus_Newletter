# Linkus Newsletter - Vercel 배포 가이드

> **Vercel**은 Next.js를 만든 회사의 호스팅 서비스입니다.
> 가장 쉽고 빠른 배포 방법입니다!

---

## ✨ Vercel 배포의 장점

✅ **Next.js 최적화** - 당신의 프로젝트에 완벽!
✅ **자동 배포** - GitHub Push 시 자동 배포
✅ **무료** - 개인/팀 프로젝트 무료
✅ **CDN** - 빠른 속도
✅ **SSL** - HTTPS 자동 적용
✅ **환경변수** - 비밀번호 안전하게 관리
✅ **커스텀 도메인** - 나중에 도메인 연결 가능

---

## 🚀 배포 5단계

### 1단계: GitHub 저장소 생성 (5분)

#### 1-1. GitHub 가입 및 로그인
- 웹사이트: https://github.com
- 계정이 없으면 가입

#### 1-2. 새 저장소 생성
```
GitHub 홈 → 왼쪽 "New" 버튼
또는: https://github.com/new
```

**저장소 설정:**
```
Repository name: linkus-newsletter
Description: Internal newsletter site
Public/Private: Public (GitHub Pages 사용 시) 또는 Private
Add a README file: ✓ 체크
Add .gitignore: ✓ 체크 (Node.js 선택)
```

#### 1-3. 저장소 생성
"Create repository" 클릭

---

### 2단계: 로컬 프로젝트를 GitHub에 올리기 (10분)

#### 2-1. Git 초기화 (첫 번째 한 번만)

Windows PowerShell에서:

```bash
cd "c:\Users\seank\OneDrive\Desktop\linkus_newletter"

# 기존 .git 폴더가 있으면 제거 (있을 경우만)
# Remove-Item .git -Recurse -Force

# Git 초기화
git init

# 원격 저장소 추가 (YOUR_USERNAME을 당신의 GitHub 아이디로 변경)
git remote add origin https://github.com/YOUR_USERNAME/linkus-newsletter.git

# 기본 브랜치를 main으로 변경
git branch -M main
```

#### 2-2. 처음 커밋 및 푸시

```bash
# 모든 파일 스테이징
git add .

# 커밋
git commit -m "Initial commit: Linkus Newsletter project setup"

# 원격 저장소에 푸시
git push -u origin main
```

✅ GitHub에 코드가 올라갔습니다!

---

### 3단계: Vercel 계정 생성 (5분)

#### 3-1. Vercel 웹사이트 방문
```
https://vercel.com
```

#### 3-2. GitHub로 로그인
```
Sign Up → Continue with GitHub
```

#### 3-3. 권한 요청 승인
- "Authorize Vercel" 클릭
- GitHub 계정 선택

#### 3-4. 팀 설정
- 팀 이름: 기본값 (당신의 이름)
- "Create team" 클릭

---

### 4단계: Vercel에서 프로젝트 배포 (5분)

#### 4-1. 프로젝트 임포트

Vercel 대시보드에서:
```
"Add New..." → "Project"
```

또는 직접: https://vercel.com/new

#### 4-2. GitHub 저장소 선택
```
"Import Git Repository"에서
"linkus-newsletter" 검색 및 선택
```

#### 4-3. 프로젝트 설정

**Framework Preset**: "Next.js" (자동 선택됨)

**Environment Variables 추가:**
```
Variable Name:  SITE_PASSWORD
Value:          linkus_2026
```

**그 후 "Add" 클릭**

#### 4-4. 배포!
```
"Deploy" 버튼 클릭
```

⏳ 배포 진행 중... (2-3분)

---

### 5단계: 배포 완료! 🎉

#### 5-1. 배포 완료 확인
```
✅ "Congratulations! Your project has been successfully deployed"
```

#### 5-2. 당신의 Vercel 도메인
```
예: https://linkus-newsletter-abc123.vercel.app
```

**이 URL을 브라우저에서 열어보세요!**

---

## 🔄 업데이트 푸시 (매번 같은 방식)

코드를 수정하고 업데이트하고 싶으면:

```bash
# 변경사항 커밋
git add .
git commit -m "수정 사항 설명"

# GitHub에 푸시
git push origin main
```

✅ Vercel이 **자동으로 감지하고 재배포**합니다!

---

## 🎁 추가 기능 (선택사항)

### 커스텀 도메인 연결

Vercel 대시보드 → Settings → Domains

```
예: newsletter.yourname.com
```

### 환경변수 안전한 관리

Vercel 대시보드 → Settings → Environment Variables

실제 비밀번호를 Vercel에만 저장하고 GitHub에는 공개하지 않음!

### 배포 미리보기

PR을 만들면 Vercel이 자동으로 미리보기 URL 생성!

---

## ⚠️ 주의사항

### SQLite 데이터베이스

**문제**: Vercel의 `/tmp` 폴더는 재배포 시 초기화됨

**해결책 3가지**:

#### 옵션 1: Vercel Postgres (권장)
- Vercel 대시보드 → Storage → Create Database
- SQLite 대신 PostgreSQL 사용
- 프로젝트 코드 약간 수정 필요

#### 옵션 2: 로컬 개발만 SQLite
- 배포: 메모리 DB 또는 외부 DB 사용
- 로컬: SQLite 그대로 사용

#### 옵션 3: 그대로 사용
- 재배포 시마다 데이터 초기화됨
- 데모용으로는 괜찮음

**현재 상태**: 옵션 3으로 배포되므로 재배포 시 데이터 초기화됩니다.

---

## 📝 GitHub 저장소에서 .env 보호

`.env.local` 파일은 **자동으로 무시됨** (`.gitignore`에 포함)

하지만 Vercel에서는 환경변수를 안전하게 저장:

```
Vercel 대시보드 
  ↓ Settings 
  ↓ Environment Variables
  ↓ SITE_PASSWORD = linkus_2026 추가
```

---

## 🔗 유용한 링크

| 작업 | 링크 |
|------|------|
| Vercel 대시보드 | https://vercel.com/dashboard |
| GitHub 저장소 | https://github.com/YOUR_USERNAME/linkus-newsletter |
| 배포된 사이트 | https://linkus-newsletter-[ID].vercel.app |

---

## 🧪 배포 후 테스트

### 메인 페이지
```
https://your-site.vercel.app/
```
✓ 뉴스레터 목록 보임

### 글 작성 테스트
```
"새 글 쓰기" 클릭
↓
비밀번호: linkus_2026
↓
글 작성
↓
발행
```

### 예상 결과
```
✅ 글이 데이터베이스에 저장됨
✅ 메인 페이지에 나타남
✅ 삭제 기능 작동
```

---

## 💡 팁

### 배포 상태 확인
```
Vercel 대시보드 → Recent Deployments
```

### 배포 로그 확인
```
Deployments → 배포 선택 → Logs
```

### 문제 발생 시
```
1. Logs 확인
2. Environment Variables 확인
3. GitHub 저장소 확인
4. Vercel 상태 페이지 확인
```

---

## 🎯 최종 체크리스트

- [ ] GitHub 계정 생성
- [ ] 로컬에서 `npm install` 완료
- [ ] 로컬에서 `npm run dev` 테스트 완료
- [ ] 로컬 `.env.local` 파일 생성 (SITE_PASSWORD)
- [ ] GitHub 저장소 생성
- [ ] `git init` 및 `git push` 완료
- [ ] Vercel 계정 생성
- [ ] Vercel에 프로젝트 임포트
- [ ] 환경변수 설정
- [ ] 배포 실행
- [ ] 배포된 URL에서 테스트

---

## 🚀 축하합니다!

당신의 Linkus Newsletter가 인터넷에 공개되었습니다! 🎉

**공유 가능한 URL**: https://your-site.vercel.app

**친구들에게 공유하기**: 
> "내가 만든 뉴스레터 사이트 봐! https://linkus-newsletter-[ID].vercel.app"

---

## 📞 문제 해결

### Git 명령어 오류
```
Git이 설치되지 않았을 수 있습니다.
설치: https://git-scm.com/download/win
```

### `git push` 실패
```
1. GitHub 토큰 생성: https://github.com/settings/tokens
2. Personal Access Token 생성
3. `git push` 시 토큰 사용
```

### Vercel 배포 실패
```
1. 로그 확인: Vercel 대시보드 → Logs
2. Environment Variables 확인
3. 로컬에서 `npm run build` 테스트
```

---

## 🎓 다음 단계

### 데이터 지속성 추가
```
Vercel Postgres 연결 (유료)
또는
MongoDB Atlas 연결 (무료)
```

### 커스텀 도메인 연결
```
Vercel에서 도메인 설정
yourname.com/newsletter
```

### 추가 기능 구현
```
- 사용자 인증
- 댓글 기능
- 이미지 업로드
- 검색 기능
```

---

**이제 당신의 Linkus Newsletter는 전 세계에 공개되었습니다! 🌍✨**
