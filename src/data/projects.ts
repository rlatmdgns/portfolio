export type Project = {
  slug: string;
  company: string;
  period: string;
  role: string;
  name: string;
  description: string;
  image: string;
  techStack: string[];
  keyRole: string;
  caseStudies: {
    title: string;
    problem: string;
    approach: string;
    implementation: string;
    evidence: string;
  }[];
  architecture: {
    description: string;
    diagram: string; // Mermaid
  };
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "helloboard",
    company: "리프웍스",
    period: "2024.12 ~ 2026.05 (1년 5개월)",
    role: "본인 포함 공동창업 3인 / 프론트엔드 전담",
    name: "헬로보드",
    description: "온보딩 프로세스를 자동화하는 B2B SaaS 플랫폼",
    image: "/images/helloboard.png",
    techStack: [
      "Next.js",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
      "NextAuth",
      "react-hook-form",
      "next-intl",
    ],
    keyRole: "제품 기획·프론트엔드 설계 및 구현",
    caseStudies: [
      {
        title: "3-depth 중첩 폼의 상태 경계와 렌더링 범위 재설계",
        problem:
          "섹션·시퀀스·태스크가 중첩된 빌더에서 Drag & Drop이 발생할 때 전체 폼 트리가 다시 렌더링되어 입력 반응성과 상태 안정성이 떨어졌습니다.",
        approach:
          "React DevTools Profiler로 폼 데이터 구독 범위와 선택·포커스·Drag UI 상태의 결합을 분리해 확인했습니다. 모든 상태를 하나의 store로 옮기기보다 서버에 제출되는 폼 상태와 일시적 UI 상태의 수명주기를 다르게 봤습니다.",
        implementation:
          "react-hook-form의 uncontrolled 방식과 중첩 useFieldArray로 계층 데이터를 관리하고, useWatch를 필드 단위로 제한했습니다. UI 상태는 Zustand selector로 분리하고 stable key 재정렬과 React.memo를 적용했습니다.",
        evidence:
          "상태 변경 영향 범위를 전체 트리에서 변경 필드와 재정렬 대상 단위로 축소했습니다.",
      },
      {
        title: "LLM 응답을 신뢰할 수 있는 폼 데이터로 변환",
        problem:
          "인사담당자가 섹션·시퀀스·태스크를 처음부터 직접 구성해야 해 초기 설정 시간과 제품 진입 장벽이 컸습니다. LLM으로 초안을 생성하더라도 필드 누락과 타입 불일치가 검증 없이 중첩 폼에 주입되면 UI 오류로 이어질 수 있었습니다.",
        approach:
          "프롬프트만으로 출력을 보장할 수 없다고 판단해 생성 품질 개선과 런타임 경계 검증을 독립된 두 단계로 설계했습니다.",
        implementation:
          "Few-shot 프롬프팅으로 응답 패턴을 유도하고 Zod 스키마를 통과한 데이터만 UI에 반영했습니다. 검증 실패를 정상 흐름과 분리하고 Sentry로 미처리 에러를 모니터링했습니다.",
        evidence:
          "AI로 온보딩 초안을 빠르게 생성하는 경험을 제공하고 비정형 응답이 폼에 반영되는 경로를 차단했습니다. Sentry 모니터링 기준 AI 빌더 관련 미처리 런타임 에러 0건을 유지했습니다.",
      },
      {
        title: "단일 빌드로 고객사별 테마를 제공하는 SSR 설계",
        problem:
          "클라이언트에서 고객사 색상을 주입하면 hydration 전 기본 테마가 노출되는 FOUC가 발생했습니다.",
        approach:
          "고객사별 빌드 분리는 운영 비용이 크고, 클라이언트 런타임 주입은 초기 화면을 보장하지 못해 SSR 시점에 테마 토큰을 결정하는 방식을 선택했습니다.",
        implementation:
          "Server Component ThemeProvider에서 CSS Custom Properties를 인라인 주입하고 color-mix()로 팔레트를 생성했습니다. 테마 변경 후에는 router.refresh()로 서버 결과를 다시 반영했습니다.",
        evidence:
          "새로고침 시 FOUC를 제거하고 단일 빌드에서 고객사별 브랜드 테마를 적용했습니다.",
      },
      {
        title: "AI 기반 개발·코드 리뷰 프로세스 표준화",
        problem:
          "AI 도구 활용으로 개발 생산성은 크게 향상되었지만, PR 생성량이 증가하면서 코드 리뷰 병목이 발생했습니다. 또한 AI마다 코드 생성 방식과 답변이 달라 프로젝트 컨벤션이 일관되게 유지되지 않는 문제가 있었습니다.",
        approach:
          "AI를 개발과 코드 리뷰 전 과정에 활용하되, 동일한 프로젝트 컨텍스트와 규칙을 공유해 일관된 결과를 생성하도록 개발 프로세스를 개선했습니다.",
        implementation:
          "프로젝트 아키텍처, 컨벤션, 폴더 구조 등을 정리한 CLAUDE.md를 작성해 개발과 리뷰 단계에서 동일한 컨텍스트를 활용하도록 구성했습니다. 개발 시에는 반복적인 코드 작성과 리팩터링에 활용하고, PR 생성 전에는 AI 기반 사전 코드 리뷰를 수행해 컨벤션 위반과 잠재적인 이슈를 먼저 검토하도록 했습니다.",
        evidence:
          "AI를 개발과 리뷰 프로세스에 함께 적용해 반복 작업을 줄이고 개발 생산성을 향상시켰습니다. 또한 PR 리뷰 병목을 완화하고, 프로젝트 전반의 코드 컨벤션과 리뷰 품질의 일관성을 높였습니다.",
      },
    ],
    architecture: {
      description:
        "App Router / features / Shared 3개 영역으로 분리한 Feature-driven 구조. 각 feature는 api/components/hooks/store/types를 독립적으로 소유하고, 참조 방향은 App Router → features → Shared 단방향만 허용 + features 간 직접 import 금지(eslint-plugin-boundaries로 빌드 타임 강제). App Router + [locale] 동적 라우팅으로 다국어(next-intl)를 지원하고, Zustand store는 feature 스코프로 격리해 전역 상태 오염을 방지합니다.",
      diagram: `graph TD
  subgraph "App Router"
    A["[locale] layout"] --> B[workspaces]
    A --> C[manager]
    A --> D[participant / guest]
  end

  subgraph "features (각 feature: api/components/hooks/store/types 자체 소유)"
    E[build-processes]
    F[processes]
    G[members]
    H[templates]
  end

  subgraph "Shared"
    I[components/ui]
    J[lib / utils]
  end

  B --> E
  B --> F
  C --> G
  C --> H
  E --> I
  F --> I
  G --> I
  H --> I
  E --> J
  F --> J
  G --> J
  H --> J`,
    },
    tags: ["창업", "SaaS", "성능 최적화", "LLM 통합"],
  },
  {
    slug: "stead",
    company: "풀랩",
    period: "2023.04 ~ 2024.12 (1년 9개월)",
    role: "프론트엔드 챕터 리드 (본인 포함 4명)",
    name: "스테드",
    description:
      "채용 공고 생성부터 이력서 필터링, 면접 일정 조율, 합격 통보까지 전 단계를 자동화하는 B2B SaaS ATS(채용 관리 시스템)",
    image: "/images/stead.png",
    techStack: [
      "Next.js",
      "TanStack Query",
      "vanilla-extract",
      "Zustand",
      "Turborepo",
      "Storybook",
      "Cypress",
    ],
    keyRole: "프론트엔드 챕터 리드 (본인 포함 4명), 아키텍처 개선 및 기술 의사결정",
    caseStudies: [
      {
        title: "3개 레포의 중복과 순환 참조를 팀 규칙으로 해결",
        problem: "유사한 3개 레포가 공통 코드를 반복 관리했고, 특정 레포에 순환 참조 131건이 누적돼 변경 영향도 파악이 어려웠습니다.",
        approach: "npm 패키지 분리의 버전 동기화 비용과 단순 폴더 재배치의 재발 가능성을 비교했습니다. 공통 코드는 모노레포로 통합하고 참조 방향은 자동 검증하는 방식을 선택했습니다.",
        implementation: "Turborepo로 apps/packages 경계를 구성하고 dependency-cruiser로 순환 참조를 시각화했습니다. FSD 단방향 레이어와 eslint-plugin-boundaries로 레이어 위반을 빌드 단계에서 검증했습니다.",
        evidence: "순환 참조 131건 중 60건(46%)을 제거하고 규칙 위반의 신규 유입을 차단했습니다.",
      },
      {
        title: "공개 채용 페이지를 Next.js로 전환",
        problem: "SPA로 제공된 채용 공고와 고객사 채용 페이지는 크롤링·OG 메타데이터 대응에 한계가 있었고 런타임 CSS 비용이 초기 렌더링에 영향을 줬습니다.",
        approach: "모든 화면을 같은 방식으로 전환하지 않고, 검색·공유·초기 응답이 중요한 공개 페이지에 SSR/ISR을 적용하고 운영 화면은 성격에 맞게 분리했습니다.",
        implementation: "Next.js App Router로 마이그레이션하고 vanilla-extract와 semantic Design Token으로 스타일 체계를 재설계했습니다. 무거운 기능은 Dynamic Import로 초기 로딩 범위에서 분리했습니다.",
        evidence: "Lighthouse 기준 LCP를 약 30% 단축하고 공통 컴포넌트의 일관성과 재사용성을 높였습니다.",
      },
      {
        title: "화면 마스킹을 다운로드 결과물까지 보장한 PDF 뷰어 구현",
        problem: "ATS에서 이력서·평가 PDF의 민감정보를 마스킹해야 했지만, 타사 솔루션은 비용과 기능 면에서 현재 요구사항 대비 오버스펙이었습니다. 또한 단순 화면 블러 처리만으로는 다운로드 후 원본 텍스트 추출을 통한 우회 가능성이 있었습니다.",
        approach: "PDF 렌더링, 마스킹 편집, 다운로드 결과물까지 직접 제어할 수 있는 구조가 필요하다고 판단했습니다. 성능 저하를 줄이기 위해 PDF 렌더링 로직은 메인 번들과 실행 흐름에서 분리하는 방향으로 설계했습니다.",
        implementation: "PDF.js와 Canvas 기반으로 PDF 뷰어와 마스킹 영역 편집 기능을 직접 구현했습니다. Dynamic Import로 큰 번들을 분리하고 Web Worker를 활용해 메인 스레드 블로킹을 줄였습니다. 다운로드 시에는 마스킹된 Canvas 합성본을 이미지 기반 PDF로 재조립해 원본 텍스트 추출을 통한 우회를 차단했습니다.",
        evidence: "고객사별 마스킹 규칙 커스터마이징을 지원하고, 메인 스레드 부하를 줄인 PDF 렌더링 구조를 구축했습니다. 또한 다운로드 이후에도 마스킹 영역이 유지되도록 처리해 개인정보 보호 안정성을 높였습니다.",
      },
    ],
    architecture: {
      description:
        "Turborepo 기반 모노레포로 채용팀(apps/web)과 지원자(apps/recruit), 공통 UI(packages/ui) 세 개의 패키지를 하나의 레포에서 관리. apps/web은 화면 수가 많고 도메인이 복잡해 FSD(Feature-Sliced Design) 레이어 구조(pages → widgets → features → entities → shared 단방향 참조 — 상위 레이어가 하위 레이어를 참조)를 적용했고, apps/recruit는 apps → features → shared 3개 레이어로 구성했습니다. eslint-plugin-boundaries로 레이어 간 잘못된 참조를 빌드 타임에 자동 감지합니다.",
      diagram: `graph TD
  subgraph "Turborepo"
    subgraph "apps/web 채용팀"
      W1[pages] --> W2[widgets]
      W2 --> W3[features]
      W3 --> W4[entities]
      W4 --> W5[shared]
    end
    subgraph "apps/recruit 지원자"
      R1[apps] --> R2[features]
      R2 --> R3[shared]
    end
    subgraph "packages/ui"
      U1["컴포넌트 + Storybook 문서 + vanilla-extract 테마"]
    end
  end

  W5 --> U1
  R3 --> U1`,
    },
    tags: ["챕터 리드", "모노레포", "FSD", "아키텍처"],
  },
  {
    slug: "hobbyful",
    company: "하비풀",
    period: "2022.05 ~ 2023.02 (10개월)",
    role: "커머스팀 / 팀원",
    name: "하비풀 커머스",
    description:
      "아티스트의 노하우가 담긴 온라인 클래스 영상과 필요한 재료를 담은 DIY 키트를 결합해 판매하는 취미 특화 이커머스",
    image: "/images/hobbyful.png",
    techStack: [
      "Next.js",
      "styled-components",
      "TanStack Query",
      "NextAuth",
      "Jest",
      "Cypress",
    ],
    keyRole: "커머스 서비스 고도화 및 신규 기능 개발",
    caseStudies: [
      {
        title: "모바일 구매 흐름 재설계",
        problem: "모바일 유입 비중이 높았지만 데스크톱 기준 UI의 작은 터치 영역과 스크롤 구조가 구매 흐름 이탈을 만들었습니다.",
        approach: "전체 화면의 축소보다 구매 플로우의 주요 CTA와 스크롤 맥락을 우선순위로 잡고 모바일 퍼스트로 재구성했습니다.",
        implementation: "반응형 레이아웃, CTA 터치 영역, 상품 탐색과 결제 스크롤 구조를 재설계했습니다.",
        evidence: "GA 기준 모바일 구매 전환율이 25% 증가했습니다.",
      },
      {
        title: "결제 핵심 로직의 테스트 경계 구축",
        problem: "쿠폰·수량·가격 합산의 edge case가 배포 후 운영 버그로 발견됐습니다.",
        approach: "모든 경로를 E2E로만 커버하지 않고 빠른 피드백이 필요한 계산 로직과 사용자 플로우를 다른 테스트 레이어로 분리했습니다.",
        implementation: "Jest로 비즈니스 로직을 단위 검증하고 Cypress로 장바구니에서 결제 완료까지의 주요 흐름을 검증했습니다.",
        evidence: "도입 후 Sentry에서 핵심 비즈니스 로직 관련 운영 에러의 감소 추세를 확인했습니다.",
      },
    ],
    architecture: {
      description:
        "Next.js Pages Router 기반의 Atomic Design 패턴 아키텍처. atoms → molecules → organisms → templates → pages 5계층 구조로 UI를 조합. pages는 라우팅과 데이터 페칭을 담당하고, templates는 전체 레이아웃을 조립해 데이터 흐름을 하위 컴포넌트로 연결. organisms은 molecules와 atoms를 조합한 독립 UI 블록으로 구성. 서버 상태는 TanStack Query, API 통신은 커스텀 ApiService 레이어로 추상화.",
      diagram: `graph TD
  subgraph "Pages Router"
    P1[pages/index]
    P2[pages/products]
    P3[pages/cart]
    P4["pages/products/[id]"]
  end

  subgraph "Templates"
    T1[HomeTemplate]
    T2[ProductListTemplate]
    T3[CartTemplate]
    T4[ProductDetailTemplate]
  end

  subgraph "Organisms"
    O1[ProductCard]
    O2[CartItem]
    O3[CheckoutSummary]
    O4[ProductDetail]
  end

  subgraph "Molecules"
    M1[PriceTag]
    M2[QuantitySelector]
    M3[ImageGallery]
  end

  subgraph "Atoms"
    A1[Button]
    A2[Input]
    A3[Badge]
    A4[Image]
  end

  subgraph "Shared"
    API[ApiService]
    QUERY[TanStack Query]
    AUTH[NextAuth]
  end

  P1 --> T1
  P2 --> T2
  P3 --> T3
  P4 --> T4

  T1 & T2 --> O1
  T3 --> O2 & O3
  T4 --> O4

  O1 & O2 --> M1 & M2
  O4 --> M3

  M1 & M2 & M3 --> A1 & A2 & A3 & A4

  T1 & T2 & T3 & T4 --> API
  T1 & T2 & T3 & T4 --> QUERY`,
    },
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
    image: "/images/iofarm.png",
    techStack: ["React", "TypeScript", "MobX", "Highcharts", "MUI", "PostCSS"],
    keyRole: "스마트팜 데이터 관제 플랫폼 및 관리자 시스템 개발",
    caseStudies: [
      {
        title: "대량 온실맵의 렌더링 범위 가상화",
        problem: "수백 개 온실 데이터를 모두 DOM에 렌더링해 저사양 기기에서 지연과 메모리 사용량 증가가 발생했습니다.",
        approach: "페이지 분할은 지도 탐색 흐름을 끊어 뷰포트 기준 가상화 PoC로 렌더링 범위를 고정할 수 있는지 먼저 검증했습니다.",
        implementation: "Virtual Scroll을 적용해 보이는 항목만 DOM에 유지하고 데이터 수와 무관하게 렌더링 범위를 제한했습니다.",
        evidence: "Lighthouse에서 Performance Score 개선을 확인했습니다.",
      },
      {
        title: "운영을 중단하지 않는 TypeScript 점진적 전환",
        problem: "API 응답 구조 변경과 잘못된 프로퍼티 접근이 배포 후 런타임 오류로 드러났습니다.",
        approach: "전면 전환의 긴 기능 동결 기간을 피하고, 신규 코드와 변경 빈도가 높은 기존 코드부터 타입 경계를 확장하는 전략을 선택했습니다.",
        implementation: "신규 파일은 TypeScript로 작성하고 기존 파일은 변경 시점에 전환했습니다. API 응답과 도메인 모델의 타입을 먼저 정의하고 any 사용을 최소화했습니다.",
        evidence: "Sentry에서 런타임 타입 관련 에러의 감소 추세를 확인했습니다.",
      },
    ],
    architecture: {
      description:
        "React SPA 기반의 MobX 상태관리 구조. IoT 센서 데이터를 Highcharts로 실시간 시각화하고, 대량 온실 데이터는 Virtual Scroll로 뷰포트 기반 렌더링. JS → TypeScript 점진적 마이그레이션을 주도해 런타임 타입 오류를 컴파일 타임에 차단하는 구조로 전환.",
      diagram: `graph TD
  subgraph "React SPA"
    A[온실맵 관제] --> B[Virtual Scroll]
    C[센서 데이터 차트] --> D[Highcharts]
    E[환경제어기 설정] --> F[MobX Store]
    G[어드민] --> F
  end

  subgraph "데이터 레이어"
    H[IoT API]
    I[센서 데이터]
  end

  B --> H
  D --> I
  F --> H`,
    },
    tags: ["IoT", "데이터 시각화", "성능 최적화", "TypeScript"],
  },
];
