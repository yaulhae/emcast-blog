# 이엠캐스트 프론트엔드 과제

## 🔧 실행 방법

1. 의존성 설치

```bash
npm install
```

2. json-server 실행

```bash
npm run server
```

3. 개발 서버 실행

```bash
npm run dev
```

4. 접속

- 홈페이지: [http://localhost:5173](http://localhost:5173)

---

## 🗂️ 폴더 구조

```bash
src/
├── api/               # posts, comments, auth 관련 API 모듈
├── components/        # 공통 및 기능별 컴포넌트
│   └── auth/          # 인증 관련 UI 컴포넌트
├── hooks/             # 커스텀 훅 (usePostsQuery 등)
├── pages/             # 라우트 페이지 단위 컴포넌트
├── store/             # Zustand 상태 관리
├── types/             # 전역 타입 정의
├── App.tsx            # 라우터 및 글로벌 설정
├── main.tsx           # 앱 진입점
```

---

## 🛠 구현 방식 요약

### 📌 전반적인 설계 전략

- **SPA 구조**로 React Router를 사용한 페이지 전환
- **기능 단위의 폴더 구성** (예: auth, post, comment)
- **역할 기반 컴포넌트 분리** (Container vs Presentational)
- **상태 분리**: 클라이언트 상태는 Zustand, 서버 상태는 React Query
- **재사용성 고려**: 텍스트 필드, 버튼, 카드 등 MUI 기반 컴포넌트를 재사용

---

## 🧩 컴포넌트 설계 구조

### 📂 components/auth/

- `SignInForm`, `SignUpForm`: 실제 form logic과 input 제어
- `AuthCard`, `AuthHeader`, `AuthTextField`: 재사용 가능한 인증 레이아웃 및 필드
- `AccountTypeSelector`: 회원가입 시 계정 유형 선택

### 📂 components/post/

- `PostList`: 게시글 목록 전체를 그리는 컴포넌트
- `PostCard`: 게시글 미리보기 카드
- `PostHeader`, `PostMain`: 상세 페이지의 구조 분리
- `Author`: 작성자 정보를 담당하는 세부 컴포넌트
- `SitemarkIcon`: 북마크 모양의 MUI 아이콘 래핑

### 📂 components/common/

- `Search`: 검색 입력 UI
- `Header`: 사이트 공통 헤더 (로고, 로그인, 다크모드 포함)

### 📂 pages/

- `PostListPage`: 게시글 목록 + 검색 + 페이지네이션 담당
- `PostDetailPage`: 게시글 상세 UI 및 댓글 목록 표시
- `SignInPage`, `SignUpPage`: 각각 인증 UI 페이지
