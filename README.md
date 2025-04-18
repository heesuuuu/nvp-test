## 📁 프로젝트 구조

```bash
NVP-TEST/
├── .next/                       # Next.js 빌드 결과물
├── node_modules/                # 설치된 의존성
├── public/                      # 정적 파일
├── src/
│   ├── app/
│   │   ├── admin/               # 관리자 페이지
│   │   │   ├── guestbook/       # 방명록 관리
│   │   │   ├── login/           # 관리자 로그인
│   │   │   ├── question/        # 질문 수정
│   │   │   └── stats/           # 포지션 통계 페이지
│   │   ├── guestbook/           # 사용자 방명록 작성/조회
│   │   ├── test/                # 포지션 테스트 및 결과
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── index.jsx            # 메인 페이지
│   │   ├── layout.js            # 전역 레이아웃
│   │   └── page.js              # (예비용 페이지)
│
├── components/                 # 공통 UI 컴포넌트
│   ├── admin/                   # 관리자용 UI
│   ├── common/                  # 버튼, 인풋, 아이콘 등
│   └── guestbook/               # 방명록 전용 컴포넌트
│
├── layout/
│   └── PageLayout.jsx          # 기본 레이아웃 컴포넌트
│
├── constans/                   # 질문, 포지션 등 상수 데이터
│   ├── position.js
│   └── questions.js
│
├── hooks/
│   └── useGuestbook.js         # 커스텀 훅 (방명록 관련)
│
├── lib/
│   ├── api.js                  # API 통신 함수
│   └── auth.js                 # 인증 유틸 함수
│
├── store/                      # Redux 상태 관리
│   ├── adminSlice.js
│   ├── testSlice.js
│   ├── userSlice.js
│   └── index.js                # store 설정
│
├── styles/                     # SCSS 스타일
│   ├── globals.scss            # 전역 스타일
│   ├── reset.scss              # reset.css
│   └── variables.scss          # 컬러/폰트 변수
│
├── utils/
│   └── formatDate.js           # 날짜 포맷 유틸
├── .gitignore
├── eslint.config.mjs           # ESLint 설정
├── jsconfig.json               # 절대 경로 설정
├── next.config.mjs             # Next.js 설정
├── package.json
├── yarn.lock
├── postcss.config.mjs
├── README.md