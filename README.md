# 배구 포지션 성향 테스트

> **기간:** 2025.04.01 ― 2025.05.12  
> **팀 구성:**  
> - Full-Stack 개발자 1명  
> - **Frontend 개발자 1명 (본인)**  

---

## 🚀 프로젝트 개요
교내 배구 동아리 부원들을 위한 **이벤트성 콘텐츠** 제공용 Next.js 웹 애플리케이션입니다.  
UI/UX 디자인·기획과 프론트엔드 개발을 담당했으며, App Router 기반 **Client Components** 중심 구조를 채택했습니다.  
SCSS + styled-components 혼용으로 유지보수성을 높였고, Swagger API로 서버와 연동했습니다.

---

## 🎯 주요 기능
- **Swagger API** 연동 (영화·카테고리·결과 CRUD)  
- **Infinite Scroll** (IntersectionObserver 이용한 방명록 데이터 페칭)  
- **관리자 페이지**: 질문/결과 조회·수정·삭제  
- **통계 시각화**: ApexCharts 활용 포지션 비율 표시  
- **SessionStorage**: 테스트 답안·결과 실시간 저장 및 분석  
- **UI/UX 디자인 & 기획**: 반응형 레이아웃, 직관적 인터랙션  

---

## 🛠 Tech Stack
- **Framework**: Next.js (App Router / Client Components)  
- **Styling**: SCSS, styled-components  
- **State & Fetch**: React Query (혹은 Redux Toolkit Query)  
- **Charts**: ApexCharts  
- **Persistence**: SessionStorage  
- **API Spec**: Swagger (OpenAPI)  
- **Build & Deploy**: Vercel  

---

## 📂 폴더 구조
```bash
volley-position-test/
├─ public/                 # 정적 자산 (favicon, 이미지)
│ └─ images/       
├─ src/    
│ ├─ app/                  # Next.js App Router
│ │ ├─ layout.js           # 전역 레이아웃
│ │ └─ page.js             # 메인 페이지
│ ├─ components/           # 컴포넌트 모음
│ │ ├─ common/             # Button, Input 등 공용 UI
│ │ ├─ test/               # 질문 · 답안 UI
│ │ ├─ result/             # 결과 페이지 · 차트
│ │ └─ admin/              # 관리자용 리스트 · 폼
│ ├─ hooks/                # useInfiniteScroll, useSessionStorage 등
│ ├─ services/             # Swagger 기반 API 함수 모듈
│ ├─ styles/               # 전역 SCSS 변수·믹스인
│ └─ utils/                # 헬퍼 함수, 상수 정의
├─ .env.local              # 환경 변수 (API 엔드포인트 등)
├─ next.config.js          # Next.js 설정
├─ package.json
└─ README.md
```

</br>
</br>

# 배구 포지션 성향 테스트 기획서

## 1. 프로젝트 개요
- **프로젝트명:** 배구 포지션 성향 테스트 (가제)  
- **목적:**  
  - 동아리 부원 이벤트 콘텐츠 제공  
  - 결과 기반 미니게임·체험전 연계  
  - 비전공자 대상 포지션 이해 및 흥미 유도  
  - SNS 공유로 동아리 홍보  
- **대상:** 배구에 관심 있는 일반 학생 및 배구부원  
- **진행 방식:** 웹 기반 온라인 테스트  

## 2. 기획 의도 & 기대 효과
- **홍보 확대:** SNS 공유 유도로 자연스러운 동아리 알림  
- **참여 활성화:** 부원 간 결과 비교·소통  
- **추가 이벤트 연계:** 포지션별 미니게임, 체험전 등  
- **홈페이지 연계:** 향후 공식 사이트 정보 제공 및 가입 유도  

## 3. 테스트 구성
- **문항 수:** 10문항  
- **질문 유형:**  
  - 성격 기반 (예: “차분한 성격이신가요?”)  
  - 플레이 스타일 기반 (예: “가장 멋진 플레이는?”)  
- **결과 포지션 (5종):**  
  1. 세터 (리더형)  
  2. 리베로 (민첩·희생정신)  
  3. 아포짓 스파이커 (공격적)  
  4. 레프트 (만능·팀워크)  
  5. 센터 (높이 활용·블로킹)  
- **결과 페이지:**  
  - 각 포지션 설명  
  - 동아리 홍보 문구 + 홈페이지 링크  
  - SNS 공유 버튼  

## 4. 실행 계획
- **개발 스택:** React (Frontend) + Spring Boot (Backend)  
- **디자인:** 배구 테마 UI/UX, 반응형 레이아웃  
- **일정 (4주):**  
  1. 기획 확정 & 문항 설계  
  2. DB 구축 & 디자인  
  3. 프론트엔드·백엔드 개발  
  4. 통합 테스트 & 배포  

## 5. 추가 고려 사항
- 공식 SNS 이벤트 (공유·댓글 이벤트)  
- 오프라인 체험 이벤트 연계  
- 부원 피드백 반영한 문항·결과 최종 보완  
- 향후 동아리 홈페이지 통합  

## 6. 요청 사항
- 동아리 임원진 피드백 요청  
- 프로젝트 진행 승인  
- 개선 아이디어 및 홍보 전략 제안  
