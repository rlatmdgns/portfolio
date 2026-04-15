export type Project = {
  slug: string;
  company: string;
  period: string;
  role: string;
  name: string;
  description: string;
  techStack: string[];
  keyRole: string;
  issues: string[];
  reasons: string[];
  solutions: string[];
  results: string[];
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "helloboard",
    company: "리프웍스",
    period: "2024.12 ~ 2026.03 (1년 3개월)",
    role: "공동창업 3인 / 프론트엔드 전담",
    name: "헬로보드",
    description: "온보딩 프로세스를 자동화하는 B2B SaaS 플랫폼",
    techStack: [
      "Next.js",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
      "NextAuth",
      "react-hook-form",
      "next-intl",
    ],
    keyRole: "제품 기획부터 프론트엔드 설계/구현, 세일즈까지 전 과정 주도",
    issues: [
      "다단계 온보딩 구조의 복잡한 폼에서 상태 변경 시 불필요한 리렌더링과 상태 의존성 꼬임 발생",
      "B2B 고객사별 브랜드 컬러 적용 요구에 따른 멀티테넌트 테마 시스템 필요, SSR 환경에서 스타일 미적용 상태가 순간적으로 노출되는 FOUC 발생",
    ],
    reasons: [
      "폼 상태와 UI 상태(선택, 포커스, drag)가 같은 레이어에 섞이면 무관한 컴포넌트까지 리렌더링되므로, 상태 도메인 완전 분리를 근본 해결 조건으로 판단",
      "index 기반 재정렬이 drag & drop 시 전체 리렌더링을 유발함을 확인, stable key 기반 알고리즘 + selector 구독 최소화 조합 선택",
      "CSS-in-JS 런타임 비용 없이 고객사별 동적 테마를 SSR에서도 안전하게 적용하려면, 런타임에 주입 가능한 CSS Custom Properties 기반 설계가 유일한 선택지로 판단",
    ],
    solutions: [
      "react-hook-form의 uncontrolled 기반 구조를 활용하면서도, useFieldArray를 커스터마이징하여 3단계 계층형 데이터 구조를 flatten + key 기반 diff 전략으로 관리",
      "Zustand를 활용해 UI 상태(선택, 포커스, hover, drag 상태)를 form state와 완전히 분리하여 state domain을 명확히 나눔",
      "React.memo + selector 기반 상태 구독 최적화, stable key 기반 재정렬 알고리즘으로 drag & drop 시에도 re-render 없이 대규모 폼 렌더링 병목 해결",
      "AI 기반 온보딩 태스크 동적 빌더 개발 시 Few-shot 프롬프팅으로 응답 일관성 확보, Zod 스키마로 런타임 타입 검증하여 비결정적 응답으로 인한 에러 사전 차단",
      "CSS Custom Properties + color-mix() 함수로 50~950 10단계 컬러 팔레트 자동 생성 알고리즘 구현, YIQ 공식 기반 텍스트 대비 색상 자동 계산으로 접근성(A11y) 보장",
      "SSR 환경 FOUC 방지를 위해 <head>에 인라인 스크립트를 주입하여 CSS 변수를 렌더링 전 선적용",
    ],
    results: [
      "고객사별 브랜드 컬러 커스터마이징 지원, FOUC 없는 SSR 환경 동적 테마 적용 달성",
      "고객사 온보딩 반복 업무 자동화, 고객사 인사담당자 직접 피드백 기준 신규 입사자 조기 퇴사율 15% 감소",
    ],
    tags: ["창업", "B2B SaaS", "성능 최적화", "AI"],
  },
  {
    slug: "stead",
    company: "풀랩",
    period: "2023.04 ~ 2024.12 (1년 9개월)",
    role: "프론트엔드 챕터 리드 (4명)",
    name: "스테드",
    description:
      "채용 공고 생성부터 이력서 필터링, 면접 일정 조율, 합격 통보까지 전 과정을 자동화하는 B2B SaaS ATS(채용 관리 시스템)",
    techStack: [
      "Next.js",
      "TanStack Query",
      "vanilla-extract",
      "Zustand",
      "Turborepo",
      "Storybook",
      "Cypress",
    ],
    keyRole: "프론트엔드 챕터 리드 (4명), 아키텍처 개선 및 기술 의사결정",
    issues: [
      "3개 레포에서 코드 중복과 순환 참조 131건으로 사이드 이펙트 추적 어려움",
      "SPA 구조로 SEO 불가, CSS-in-JS 런타임 비용으로 TTI 및 초기 렌더링 성능 저하",
      "PDF를 HTML로 불러와 민감정보를 마스킹하고 이미지로 저장하는 기존 방식의 라이브러리 한계로 유연성 부족",
    ],
    reasons: [
      "npm 패키지 분리 방안 대비 버전 동기화 오버헤드와 로컬 개발 복잡도가 없어 모노레포 선택",
      "단순 라이브러리 교체 시 스타일 산발 재발 우려, 전환 시점을 design token 기반 스타일 시스템 전면 재설계 기회로 활용",
      "폴더 재구조화만으로는 순환 참조 재발 방지 불가, 참조 방향을 코드 레벨에서 강제하는 FSD 구조 도입",
      "전체 SSR 전환 시 서버 비용·복잡도 증가 우려, 페이지 성격(SEO 필요 여부, 갱신 주기)별 SSR/SSG/ISR 전략 분리 적용",
      "기존 라이브러리의 마스킹 동적 제어 불가 확인, Canvas API 직접 구현으로 유연성 확보",
    ],
    solutions: [
      "Turborepo 기반 apps/packages 구조로 공통 코드를 단일 패키지로 통합, turbo.json으로 빌드 캐시 전략 적용해 빌드 시간 단축",
      "dependency-cruiser로 순환 참조 131건을 시각화, FSD 단방향 레이어 구조 도입으로 shared → entities → features → widgets → pages 순서로 참조 방향 제한",
      "eslint-plugin-boundaries로 레이어 간 참조 위반을 빌드 타임에 자동 감지, 컴포넌트 레이어 기준 재배치로 아키텍처 규칙 강제화",
      "페이지 성격별 SSR/SSG/ISR 전략을 분리 적용하는 Rendering 전략 매트릭스 정의, Next.js App Router 기반 서버/클라이언트 컴포넌트 분리 및 data fetching 서버 이동으로 hydration 비용 감소",
      "styled-components 제거 후 vanilla-extract 도입 시 단순 교체 대신 design token 기반 스타일 시스템 전면 재설계, recipe API로 variant 기반 컴포넌트 스타일 시스템 설계",
      "bundle analyzer를 활용해 dynamic import + route level code splitting 적용, next/image priority 및 font-display swap으로 이미지·폰트 로딩 전략 최적화",
      "PDF.js Worker를 별도 번들로 분리하여 메인 스레드 블로킹 방지, Canvas API로 마스킹 레이어 직접 구현하여 민감정보 처리 유연성 확보",
    ],
    results: [
      "순환 참조 131건 중 60건 제거(46%↓), 잔여 71건은 점진적 마이그레이션 계획 수립",
      "eslint-plugin-boundaries 기반 FSD 레이어 강제로 신규 순환 참조 발생 원천 차단",
      "LCP 약 30% 개선 (Lighthouse 기준), TTI·FCP 전반적인 Core Web Vitals 개선",
      "디자인 시스템 구축으로 컴포넌트 재사용성 향상, 반복 구현 감소",
    ],
    tags: ["챕터 리드", "모노레포", "FSD", "아키텍처"],
  },
  {
    slug: "hobbyful",
    company: "하비풀",
    period: "2022.05 ~ 2023.02 (10개월)",
    role: "커머스팀 / 팀원",
    name: "하비풀 커머스",
    description:
      "아티스트의 노하우가 담긴 온라인 클래스 영상과 필요한 모든 재료를 담은 DIY 키트를 결합해 판매하는 취미 특화 이커머스",
    techStack: [
      "Next.js",
      "styled-components",
      "TanStack Query",
      "NextAuth",
      "@testing-library/react",
      "Jest",
      "Cypress",
    ],
    keyRole: "커머스 서비스 고도화 및 신규 기능 개발, 어드민 개발",
    issues: [
      "데스크톱 중심 UI로 인해 모바일 사용자의 구매 흐름 이탈 발생",
      "상품 상세 페이지 SSR 구조의 비효율적인 데이터 fetching으로 TTFB 지연 발생",
      "테스트 코드 부족으로 핵심 비즈니스 로직 관련 런타임 버그 리스크, 운영 장애 발생",
    ],
    reasons: [
      "상품 데이터의 주기적 갱신 특성을 파악, 매 요청 SSR 대신 ISR 전환으로 캐시 히트율을 높여 TTFB 개선 판단",
      "모바일 유입 비율이 높음에도 데스크톱 중심 UI로 이탈 발생 확인, 모바일 퍼스트 기준 레이아웃 전면 재구성",
      "운영 장애 대부분이 장바구니/결제 엣지 케이스에서 발생, 사전 차단을 위해 단위 테스트 + E2E 테스트 전략 수립",
    ],
    solutions: [
      "상품 상세 페이지를 SSR에서 ISR로 전환, revalidate 주기를 1시간으로 설정하여 캐시 히트율 최대화",
      "모바일 퍼스트 기준으로 반응형 레이아웃 전면 재구성, 주요 구매 플로우의 터치 영역과 스크롤 구조 개선 및 모바일 전용 UI 적용",
      "@testing-library/react + Jest로 장바구니 수량 계산, 가격 합산, 쿠폰 적용 등 핵심 비즈니스 로직 단위 테스트 작성, Cypress로 장바구니 추가 → 결제 완료 플로우 E2E 테스트 구성",
    ],
    results: [
      "TTFB 약 30% 개선 (Lighthouse 기준)",
      "모바일 구매 전환율 약 25% 증가",
      "핵심 비즈니스 로직 관련 운영 버그 20% 감소",
    ],
    tags: ["이커머스", "성능 최적화", "테스트"],
  },
  {
    slug: "iofarm",
    company: "아이오크롭스",
    period: "2021.07 ~ 2022.04 (10개월)",
    role: "프로덕트팀 / 팀원",
    name: "아이오팜",
    description:
      "온실 내 IoT 센서와 환경제어기 데이터를 통합 분석하여 최적의 재배 전략을 제시하는 스마트팜 관리 플랫폼",
    techStack: ["React", "PostCSS", "Highcharts", "MUI", "MobX", "TypeScript"],
    keyRole: "스마트팜 데이터 관제 플랫폼 프론트엔드 개발 및 고도화, 어드민(관제 시스템) 개발",
    issues: [
      "저사양 기기에서 온실맵 렌더링 병목으로 UX 저하",
      "런타임 타입 오류로 운영 중 버그 반복 발생",
    ],
    reasons: [
      "전체 데이터 일괄 렌더링 구조가 병목 원인으로 파악, PoC로 가상화 방식의 성능 개선 확인 후 적용",
      "런타임 오류 발견 구조 자체가 문제, 컴파일 타임 타입 검증으로 사전 차단하는 TypeScript 도입 제안",
    ],
    solutions: [
      "Virtual Scroll 적용으로 전체 온실맵 데이터를 뷰포트에 보이는 항목만 렌더링하도록 최적화, 스크롤 시에도 렌더링 범위를 최소화하여 메모리 사용량 제어",
      "TypeScript 도입 제안 및 마이그레이션 주도, 기존 JS 파일을 점진적으로 TS로 전환하며 any 타입 최소화로 타입 안전성 확보",
    ],
    results: [
      "Lighthouse 성능 점수 70 → 90 개선",
      "저사양 기기에서 온실맵 렌더링 지연 시간 30% 감소",
      "런타임 타입 관련 버그 70% 감소",
    ],
    tags: ["IoT", "데이터 시각화", "성능 최적화", "TypeScript 마이그레이션"],
  },
];
