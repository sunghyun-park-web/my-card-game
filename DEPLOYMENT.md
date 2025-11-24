# 🚀 Vercel 배포 가이드

## 📋 배포 전 준비사항

### 1. Vercel 계정 생성
[Vercel.com](https://vercel.com)에서 GitHub 계정으로 가입하세요.

### 2. GitHub 저장소 연동

## 🔐 환경변수 설정 (중요!)

Vercel 대시보드에서 다음 환경변수를 설정해야 합니다:

### 설정 방법:
1. Vercel 대시보드에서 프로젝트 선택
2. **Settings** → **Environment Variables** 이동
3. 다음 환경변수 추가:

```
SUPABASE_URL=https://pjofrykikqcvnlknqxta.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqb2ZyeWtpa3Fjdm5sa25xeHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NDU3MTcsImV4cCI6MjA3OTUyMTcxN30.FXfSySlSr6Yhx0KJYTD5Io778Rcn-8egFCB_qKWgHCg
```

4. **Production**, **Preview**, **Development** 모두 체크
5. **Save** 클릭

## 🌐 Vercel CLI로 배포

### 방법 1: Vercel CLI 사용

```bash
# 1. Vercel 로그인
vercel login

# 2. 배포
vercel

# 3. 프로덕션 배포
vercel --prod
```

### 방법 2: GitHub 연동 (권장)

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. **Add New** → **Project** 클릭
3. GitHub 저장소 **my-card-game** 선택
4. **Environment Variables** 설정 (위 참조)
5. **Deploy** 클릭

## ✅ 배포 완료 후

배포가 완료되면 다음과 같은 URL이 생성됩니다:
- **Production**: `https://my-card-game.vercel.app`
- **Preview**: 각 PR마다 자동 생성

## 🔄 자동 배포

GitHub 저장소에 푸시할 때마다 자동으로 배포됩니다:
- `main` 브랜치 → Production 배포
- 다른 브랜치 → Preview 배포

## 🛠️ 로컬 개발 환경 설정

로컬에서 개발할 때는 `config.js` 파일이 필요합니다:

```bash
# config.example.js를 복사
cp config.example.js config.js

# config.js 파일을 열어서 실제 Supabase 값 입력
```

**주의**: `config.js`는 `.gitignore`에 포함되어 Git에 추적되지 않습니다!

## 🔒 보안 주의사항

- ❌ `config.js`를 Git에 커밋하지 마세요
- ✅ 환경변수만 Vercel에 설정하세요
- ✅ `config.example.js`는 템플릿으로만 사용하세요

## 💡 문제 해결

### 배포 후 게임이 작동하지 않는 경우
1. Vercel 대시보드에서 환경변수가 올바르게 설정되었는지 확인
2. 배포 로그에서 에러 확인
3. 브라우저 콘솔에서 JavaScript 에러 확인

### Supabase 연결 오류
- 환경변수의 URL과 키가 정확한지 확인
- Supabase 프로젝트가 활성 상태인지 확인

---

문제가 발생하면 이슈를 생성해주세요! 🙋‍♂️

