> 🏆 **2026 명지대학교 제 5회 창의적 SW 프로그램 경진대회 장려상 수상작**

# ☕️ DdingConnect

명지대학교 재학생과 졸업생(선배)을 연결하는 진로/취업 멘토링 웹 서비스의 프론트엔드입니다.

진로를 고민하는 융합소프트웨어학부 재학생이 같은 학과 출신 선배와 1:1로 연결되어 조언을 얻을 수 있도록, 조건 기반 커피챗 매칭과 취업 로드맵, 익명 QnA, 채용 정보를 한곳에 모았습니다. 모바일 화면 크기를 기준으로 설계된 단일 페이지 애플리케이션(SPA)입니다.

사용자는 가입 시 **재학생(STUDENT)** 또는 **졸업생(GRADUATE)** 역할을 선택하며, 역할에 따라 이용할 수 있는 화면과 홈 화면 구성이 달라집니다.

## ✨ 주요 기능

| 기능 | 설명 |
| --- | --- |
| 인증/회원가입 | 이메일 인증코드 발송 및 검증을 거치는 회원가입, 로그인, 재학생/졸업생 역할 선택 |
| 홈 | 사용자 정보와 보유 포인트, 활동 요약(커피챗/로드맵/QnA 횟수)을 역할에 맞게 표시 |
| 커피챗 매칭 | 학년, 학점, 전공, 관심 직무, 역량, 목표 기업 등 조건을 입력해 선배 후보를 매칭하고 결과를 확인 |
| 커피챗 신청/관리 | 선배에게 커피챗 신청, 보낸 신청과 받은 신청 조회, 수락/거절/취소 처리 |
| 취업 로드맵 | 로드맵 생성, 목록 및 상세 조회, 삭제, 다운로드 (홈에서 "AI 기반 맞춤형 취업 준비"로 안내) |
| QnA 게시판 | 익명 질문 작성, 목록 및 상세 조회, 수정, 삭제 |
| 구직 정보 | 채용 공고 목록 조회 |
| 포인트 | 보유 포인트 조회 및 충전 화면 |
| 알림 | 알림 목록 조회 |
| 마이페이지 | 재학생/졸업생 프로필 조회, 내 활동 내역 조회 |

역할에 따른 차이로, 홈의 활동 요약은 졸업생은 커피챗/QnA, 재학생은 커피챗/로드맵/QnA로 구성되며 마이페이지도 재학생용과 졸업생용 화면이 분리되어 있습니다.

## 🛠️ 기술 스택

### 🌐 Frontend

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_v7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

### 💻 Data & Styling

![TanStack Query](https://img.shields.io/badge/TanStack_Query_v5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

### 🌍 Development & Deployment

![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

| 구분 | 사용 기술 및 도구 |
| --- | --- |
| UI 변형 및 클래스 관리 | class-variance-authority, clsx, tailwind-merge |
| SVG 컴포넌트 | vite-plugin-svgr |
| API 타입 생성 | swagger-typescript-api |
| Git hooks 및 커밋 규칙 | Lefthook, commitlint |

서버 상태는 TanStack Query로 관리하며, 액세스 토큰과 사용자 역할은 `localStorage`에 저장합니다.

## 📂 프로젝트 구조

Feature-Sliced Design을 기반으로 화면, 도메인 기능, 공통 자원을 구분합니다. `@`는 `src`를 가리키는 경로 별칭입니다.

```text
📦 src/
├── 🏠 app/              # 앱 진입점과 전역 설정
│   ├── layouts/         # 공통 레이아웃과 로그인 보호 라우트
│   ├── providers/       # 전역 Provider
│   └── router.tsx       # 전체 라우트 정의
│
├── 📄 pages/            # 라우트 단위 화면
│                        # 홈, 인증, 커피챗, 로드맵, QnA, 마이페이지 등
│
├── ⚙️ features/         # 도메인별 기능
│                        # API 요청, 도메인 로직, 훅, 컴포넌트, 타입
│
└── 🧩 shared/           # 여러 기능에서 재사용하는 공통 자원
    ├── api/             # axios 클라이언트와 OpenAPI 생성 타입
    ├── ui/              # 버튼, 모달, 셀렉트, 입력 등 공통 UI
    ├── query/           # QueryClient 설정
    ├── hooks/           # 공통 훅
    ├── utils/           # 유틸리티 함수
    ├── constants/       # 공통 상수
    ├── types/           # 공통 타입
    └── assets/          # 이미지와 아이콘
```

`pages`는 화면 구성을 담당하고, `features`는 도메인별 API 요청과 로직을 담당합니다. 여러 화면과 기능에서 사용하는 자원은 `shared`에 모아 재사용합니다.

## 🚀 로컬 실행 방법

이 프로젝트는 **pnpm**을 패키지 매니저로 사용합니다(`packageManager: pnpm@10.33.3`). CI 기준 Node.js는 **24.x**입니다.

```bash
# 1. 의존성 설치
pnpm install

# 2. 환경 변수 설정 (.env.example 참고)
cp .env.example .env.local

# 3. 개발 서버 실행
pnpm dev
```

### 📜 주요 스크립트

| 스크립트 | 설명 |
| --- | --- |
| `pnpm dev` | 개발 서버 실행 (Vite) |
| `pnpm build` | 타입 체크 후 프로덕션 빌드 (`tsc -b && vite build`) |
| `pnpm preview` | 빌드 결과물 미리보기 |
| `pnpm lint` / `pnpm lint:fix` | ESLint 검사 / 자동 수정 |
| `pnpm format` / `pnpm format:check` | Prettier 포맷 적용 / 검사 |
| `pnpm typecheck` | 타입 체크 (`tsc -b`) |
| `pnpm api:generate` | `swagger/openapi.json`으로부터 API 타입 생성 |

### 🔑 환경 변수

| 이름 | 용도 |
| --- | --- |
| `VITE_API_BASE_URL` | 백엔드 API 서버의 기본 URL. axios 클라이언트의 baseURL로 사용 |

`.env.example`에 예시 값이 포함되어 있으며, 실제 값은 각자 환경에 맞게 설정합니다.

## ⚙️ 주요 구현 특징

- **역할 기반 라우팅 보호**: 모든 주요 화면은 `ProtectedRoute`로 감싸져 토큰이 없으면 로그인 페이지로 리다이렉트됩니다. `/my` 진입 시 저장된 역할(STUDENT/GRADUATE)에 따라 알맞은 마이페이지로 분기합니다.
- **axios 인터셉터 기반 인증 처리**: 요청 인터셉터가 `localStorage`의 액세스 토큰을 `Authorization` 헤더에 자동으로 주입하되, 로그인/회원가입 등 공개 경로는 제외합니다. 응답 인터셉터는 토큰이 있는 상태의 401 응답을 감지해 토큰을 제거하고 로그인 화면으로 이동시킵니다.
- **OpenAPI 기반 타입 동기화**: `swagger/openapi.json`을 입력으로 `api:generate` 스크립트가 `src/shared/api/generated`에 타입을 생성하여, 백엔드 API 스펙과 프론트엔드 타입을 맞춥니다. API 응답은 `ApiResponse<T>` 공통 래퍼로 다룹니다.
- **서버 상태와 클라이언트 상태 분리**: 데이터 조회/갱신은 TanStack Query 훅으로 캐싱하며, 개발 환경에서는 React Query Devtools를 활성화합니다. 인증 정보 같은 단순 클라이언트 상태만 `localStorage`로 관리합니다.
- **공통 UI와 스타일 규칙**: `shared/ui`에 버튼, 모달, 셀렉트, 멀티셀렉트, 입력 등 공통 컴포넌트를 두고 CVA로 변형(variant)을 관리합니다. 화면별 Tailwind 클래스는 `*.styles.ts` 파일로 분리해 마크업과 스타일을 구분합니다.
- **배포 설정**: `vercel.json`에서 SPA 라우팅을 위한 리라이트와 함께 `X-Frame-Options`, `Strict-Transport-Security` 등 보안 관련 응답 헤더를 지정합니다. GitHub Actions로 PR마다 lint/format/typecheck/build 검증(CI)과 배포(CD)를 수행합니다.
