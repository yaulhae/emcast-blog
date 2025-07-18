# 이엠캐스트 프론트엔드 과제

## 📌 프로젝트 개요

이 프로젝트는 React와 MUI를 기반으로 한 SPA 게시판 웹 애플리케이션입니다.  
과제 1(게시판)과 과제 2(회원 인증 + 게시판) 요구사항을 모두 반영하여 구현하였으며, 전역 상태 관리, 반응형 UI, 타입스크립트, 디자인 시스템, API 연동 등 다양한 프론트엔드 개발 역량을 통합적으로 보여줍니다.

---

## ✅ 과제 1: 게시판 기능

### 주요 구현 사항

- 게시글 목록 UI 구현
- 페이지네이션 처리
- 제목/본문 기반 검색 기능
- 게시글 상세 보기 기능
- 반응형 UI (MUI + CSS media query)
- 전역 상태 관리 (Zustand)
- React Query를 통한 API 연동

---

## ✅ 과제 2: 회원 인증 + 게시판

### 추가 구현 사항

- 로그인 / 회원가입 / 로그아웃
- 계정 타입: 관리자 / 일반 / 게스트로 구분
- 게시글 작성: 관리자, 일반 계정만 가능
- 게시글 삭제: 관리자만 가능
- 댓글 작성/삭제 기능 (선택 구현)
  - 작성: 관리자, 일반
  - 삭제: 관리자만
- 인증/게시판 권한 분기 처리
- 상태 복원 및 에러 처리
- i18n 다국어 처리 (선택 구현)
- 타입스크립트 전면 사용

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
├── i18n/              # 다국어 설정 (선택 구현)
├── App.tsx            # 라우터 및 글로벌 설정
├── main.tsx           # 앱 진입점
```

---

## 🧱 주요 기술 스택

| 분류          | 기술                               |
| ------------- | ---------------------------------- |
| UI 라이브러리 | React, MUI                         |
| 스타일링      | MUI + Emotion + CSS Modules        |
| 상태 관리     | Zustand (전역), React Query (서버) |
| 라우팅        | React Router v6                    |
| API 연동      | Axios + dummyjson.com              |
| 인증          | json-server                        |
| 언어          | TypeScript                         |
| 다국어        | react-i18next (선택 구현)          |

---

## 🔧 실행 방법

1. 의존성 설치

```bash
npm install
```

2. json-server 실행

```bash
npx json-server --watch db.json --port 3001
```

3. 개발 서버 실행

```bash
npm run dev
```

4. 접속

- 게시판: [http://localhost:5173/posts](http://localhost:5173/posts)
- 로그인: [http://localhost:5173/signin](http://localhost:5173/signin)

---

## 📌 참고 및 기타

- 관리자 계정 로그인 시 삭제 버튼 노출
- 상태 복원(스크롤 등)은 상세 페이지 → 목록 페이지 이동 시 자동 처리됨
- 서버 상태와 클라이언트 상태의 분리를 통해 일관된 UX 제공
- 다국어는 선택 구현되었으며, 상단 언어 선택 버튼을 통해 변경 가능

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

### 📂 hooks/

- `usePostsQuery`: 게시글 목록, 검색, 상세를 다루는 React Query 기반 훅
- `useAuth`: 로그인 여부, 유저 정보, 계정 타입 확인을 위한 커스텀 훅

---
