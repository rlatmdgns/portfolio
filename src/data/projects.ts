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
  architecture: {
    description: string;
    diagram: string; // Mermaid
  };
  keyFeatures: {
    title: string;
    description: string;
  }[];
  decisions: {
    title: string;
    problem: string;
    choice: string;
  }[];
  troubleshooting: {
    issue: string;
    cause: string;
    solution: string;
  }[];
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
    keyRole: "제품 기획부터 프론트엔드 설계/구현, 세일즈까지 전 과정 주도",
    architecture: {
      description:
        "feature 단위 자체 완결 구조. 각 feature는 api/components/hooks/store/types를 독립적으로 소유하며 cross-feature 의존성을 구조적으로 차단합니다. App Router + [locale] 동적 라우팅으로 다국어(next-intl)를 지원하고, Zustand store를 feature 스코프로 격리해 전역 상태 오염을 방지합니다.",
      diagram: `graph TD
  subgraph "App Router"
    A["[locale] layout"] --> B[workspaces]
    A --> C[manager]
    A --> D[participant / guest]
  end

  subgraph "features"
    E[build-processes] --> E1[api]
    E --> E2[components]
    E --> E3[hooks]
    E --> E4[store]
    E --> E5[types]
    F[processes]
    G[members]
    H[templates]
  end

  subgraph "공통 레이어"
    I[components/ui]
    J[lib / utils]
  end

  B --> E
  B --> F
  C --> G
  C --> H`,
    },
    keyFeatures: [
      {
        title: "온보딩 프로세스 빌더",
        description:
          "섹션-태스크-질문의 3단계 계층 구조를 가진 다단계 폼 빌더. react-hook-form의 uncontrolled 구조를 기반으로 useFieldArray를 커스터마이징해 flatten + key 기반 diff 전략으로 계층형 데이터를 관리. Zustand로 폼 상태와 UI 상태(선택/포커스/drag)를 도메인 분리.",
      },
      {
        title: "AI 온보딩 태스크 자동 생성",
        description:
          "AI 기반 온보딩 태스크 동적 빌더. Few-shot 프롬프팅으로 응답 일관성을 확보하고, Zod 스키마로 런타임 타입 검증을 수행해 비결정적 AI 응답으로 인한 에러를 사전 차단.",
      },
      {
        title: "멀티테넌트 동적 테마 시스템",
        description:
          "고객사별 브랜드 컬러를 SSR 환경에서 FOUC 없이 적용. CSS Custom Properties + color-mix() 함수로 50~950 10단계 컬러 팔레트를 자동 생성하고, YIQ 공식으로 텍스트 대비 색상을 자동 계산해 접근성을 보장. <head> 인라인 스크립트 주입으로 렌더링 전 CSS 변수를 선적용.",
      },
      {
        title: "12종 질문 입력 타입",
        description:
          "단답형·장문형·단일선택·다중선택·날짜·숫자·점수·슬라이더·NPS·별점·True/False·등급 등 12가지 입력 타입을 플러그인 방식으로 설계. 각 타입을 독립 컴포넌트로 관리해 신규 타입 추가 시 기존 코드 변경 없이 확장 가능.",
      },
    ],
    decisions: [
      {
        title: "CSS Custom Properties 기반 동적 테마",
        problem:
          "CSS-in-JS는 런타임에 스타일을 생성해 SSR 환경에서 FOUC가 발생하고, 고객사별 브랜드 컬러를 동적으로 바꾸는 멀티테넌트 요구사항을 처리하기 어려웠습니다.",
        choice:
          "CSS Custom Properties를 선택. 런타임 JS 비용 없이 CSS 변수만 교체해 전체 팔레트를 즉시 반영 가능하고, <head> 인라인 스크립트로 렌더링 전 변수를 선적용해 FOUC를 원천 차단했습니다.",
      },
      {
        title: "Feature 단위 아키텍처",
        problem:
          "기능이 늘면서 어떤 컴포넌트가 어디에 쓰이는지 추적이 어려워지고, 변경 시 사이드 이펙트 범위를 예측하기 힘들어졌습니다.",
        choice:
          "각 feature가 api/components/hooks/store/types를 독립적으로 소유하는 자체 완결 구조를 설계. cross-feature 의존성을 구조적으로 차단해 변경 범위를 feature 단위로 명확히 격리했습니다.",
      },
      {
        title: "Zustand store feature 스코프 격리",
        problem:
          "전역 Zustand store에 편집기 UI 상태(선택, 포커스, drag)와 폼 상태가 섞이면서 무관한 컴포넌트까지 리렌더링되는 문제가 발생했습니다.",
        choice:
          "각 feature의 store/ 폴더에 Zustand store를 격리. 폼 상태는 react-hook-form의 uncontrolled 구조에 위임하고, UI 상태만 Zustand로 관리해 도메인을 명확히 분리했습니다.",
      },
    ],
    troubleshooting: [
      {
        issue: "3단계 계층 폼에서 drag & drop 시 전체 리렌더링",
        cause:
          "index 기반 key를 사용하면 항목을 재정렬할 때 모든 컴포넌트의 key가 바뀌어 React가 기존 DOM을 버리고 전체를 재생성했습니다.",
        solution:
          "stable key(항목 고유 id) 기반 재정렬 알고리즘으로 전환하고, React.memo + selector 기반 상태 구독 최소화를 적용해 drag & drop 중에도 변경된 항목만 리렌더링되도록 최적화했습니다.",
      },
      {
        issue: "SSR 환경에서 고객사 테마 색상 적용 시 FOUC 발생",
        cause:
          "컴포넌트 마운트 후 JS로 CSS 변수를 설정하면 서버에서 렌더링된 기본 색상이 먼저 노출된 뒤 고객사 색상으로 교체되는 깜빡임이 발생했습니다.",
        solution:
          "generateThemeScript() 함수로 고객사 색상을 담은 인라인 스크립트를 <head>에 주입해 HTML 파싱 시점에 CSS 변수를 선적용. 첫 번째 픽셀을 그리기 전에 팔레트 전체가 설정되어 FOUC를 완전히 제거했습니다.",
      },
    ],
    results: [
      "고객사별 브랜드 컬러 커스터마이징 지원, FOUC 없는 SSR 환경 동적 테마 적용 달성",
      "고객사 온보딩 반복 업무 자동화, 신규 입사자 조기 퇴사율 15% 감소",
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
    keyRole: "프론트엔드 챕터 리드 (4명), 아키텍처 개선 및 기술 의사결정",
    architecture: {
      description:
        "Turborepo 기반 모노레포로 채용팀(apps/web)과 지원자(apps/recruit), 공통 UI(packages/ui) 세 개의 패키지를 하나의 레포에서 관리. apps/web은 FSD(Feature-Sliced Design) 레이어 구조를 적용해 shared → entities → features → widgets → pages 단방향 참조를 강제합니다. eslint-plugin-boundaries로 레이어 간 잘못된 참조를 빌드 타임에 자동 감지합니다.",
      diagram: `graph TD
  subgraph "Turborepo"
    subgraph "apps/web 채용팀"
      W1[pages] --> W2[widgets]
      W2 --> W3[features]
      W3 --> W4[entities]
      W4 --> W5[shared]
    end
    subgraph "apps/recruit 지원자"
      R1[pages] --> R2[modules]
      R2 --> R3[shared]
    end
    subgraph "packages/ui"
      U1[컴포넌트]
      U2[Storybook]
      U3[vanilla-extract 테마]
    end
  end

  W5 --> U1
  R3 --> U1`,
    },
    keyFeatures: [
      {
        title: "FSD 아키텍처 + 자동 순환 참조 감지",
        description:
          "dependency-cruiser로 순환 참조 131건을 시각화 후 FSD 단방향 레이어 구조 도입. eslint-plugin-boundaries로 레이어 간 참조 위반을 빌드 타임에 자동 감지해 신규 순환 참조 발생을 원천 차단.",
      },
      {
        title: "design token 기반 스타일 시스템",
        description:
          "컴포넌트 파편화와 디자인-개발 간 언어 불일치 문제를 해결하기 위해 디자이너와 함께 design token 체계를 공동 설계. primary-400 같은 스케일 기반 대신 size-xs 같은 시맨틱 네이밍으로 학습 곡선을 낮춰 디자이너·기획자도 바로 이해할 수 있는 공통 언어를 만들었고, vanilla-extract recipe API로 variant 기반 컴포넌트 스타일 시스템을 구성. Storybook으로 컴포넌트 카탈로그와 동작 흐름을 문서화해 개발자·디자이너·기획자가 배포 전 동일한 기준으로 컴포넌트를 조합하고 소통하는 환경을 구축.",
      },
      {
        title: "페이지 성격별 렌더링 전략 매트릭스",
        description:
          "채용 공고(SSG/ISR), 지원자 현황(SSR), 대시보드(CSR) 등 페이지 성격에 따라 렌더링 전략을 분리 적용. App Router 기반 서버/클라이언트 컴포넌트 분리 및 data fetching 서버 이동으로 hydration 비용 감소.",
      },
      {
        title: "PoC 기반 기술 도입 및 개발 문화 구축",
        description:
          "FSD·vanilla-extract 등 굵직한 기술 전환을 모두 PoC → 팀 공유 → 합의 순서로 진행. 독단적 결정 없이 팀 전체가 맥락을 이해한 상태에서 도입해 실제 적용 시 마찰을 최소화했습니다. 정기 스터디와 코드 리뷰 문화도 직접 만들어 팀 기술 수준과 코드 품질을 함께 끌어올렸습니다.",
      },
      {
        title: "PDF 이력서 마스킹 처리",
        description:
          "기존 라이브러리의 동적 마스킹 제어 한계를 확인 후 Canvas API 직접 구현. PDF.js Worker를 별도 번들로 분리해 메인 스레드 블로킹을 방지하고, Canvas 레이어로 민감정보 마스킹 처리.",
      },
    ],
    decisions: [
      {
        title: "Turborepo 모노레포",
        problem:
          "3개 레포에서 공통 코드 중복이 심해 동기화 비용이 증가하고, 패키지 버전 불일치로 사이드 이펙트 추적이 어려웠습니다.",
        choice:
          "npm 패키지 분리는 버전 동기화 오버헤드와 로컬 개발 복잡도가 있어 Turborepo를 선택. turbo.json 빌드 캐시 전략으로 빌드 타임을 단축하고 공통 코드를 단일 패키지로 통합했습니다.",
      },
      {
        title: "vanilla-extract",
        problem:
          "CSS-in-JS(styled-components)의 런타임 스타일 생성 비용이 TTI와 초기 렌더링 성능에 영향을 주고 있었습니다.",
        choice:
          "단순 교체 대신 vanilla-extract 전환 시점을 design token 기반 스타일 시스템 전면 재설계 기회로 활용. 빌드 타임 CSS 생성으로 런타임 비용을 완전히 제거했습니다.",
      },
      {
        title: "FSD + eslint-plugin-boundaries",
        problem:
          "폴더 재구조화만으로는 순환 참조 재발을 막을 수 없었습니다. 팀원이 늘면서 참조 방향 규칙이 문서로만 존재해 실수로 어기는 경우가 발생했습니다.",
        choice:
          "참조 방향을 코드 레벨에서 강제하는 FSD + eslint-plugin-boundaries 조합 선택. 규칙 위반 시 빌드가 실패해 팀 합의 없이는 레이어 규칙을 어길 수 없는 구조를 만들었습니다.",
      },
      {
        title: "release 태그 기반 프로덕션 배포",
        problem:
          "main 병합 즉시 프로덕션에 자동 배포되면 고객사 데이터를 다루는 채용 시스템 특성상 검증되지 않은 변경이 운영에 반영될 위험이 있었습니다.",
        choice:
          "PR → GitHub Actions CI(타입 체크·린트) → main 병합 시 개발 서버 자동 배포 → release 태그 업데이트로 프로덕션 배포를 트리거하는 단계별 파이프라인을 구성. 개발 서버에서 QA를 거친 후 릴리즈를 결정할 수 있어 의도치 않은 프로덕션 배포를 방지하고 롤백도 태그 단위로 명확하게 관리했습니다.",
      },
    ],
    troubleshooting: [
      {
        issue: "3개 레포 간 순환 참조 131건으로 사이드 이펙트 예측 불가",
        cause:
          "레포 간 공통 코드를 각자 복사해 사용하면서 변경 시 영향 범위 추적이 불가능해졌습니다.",
        solution:
          "dependency-cruiser로 순환 참조 131건을 시각화하고, Turborepo 모노레포 + FSD 단방향 레이어 구조로 전환. eslint-plugin-boundaries로 순환 참조 46% 제거 후 신규 발생을 원천 차단했습니다.",
      },
      {
        issue: "컴포넌트 파편화로 배포 후 디자이너 의도와 다른 결과물 반복",
        cause:
          "공통 기준 없이 각자 개발하다 보니 어떤 컴포넌트가 존재하는지 파악이 안 됐고, 배포 후에야 디자이너가 의도한 것과 다른 결과물이 나오는 일이 반복됐습니다.",
        solution:
          "디자이너와 함께 시맨틱 네이밍 기반 design token 체계를 공동 설계하고, Storybook으로 컴포넌트 카탈로그와 동작 흐름을 문서화. 개발자·디자이너·기획자가 배포 전 동일한 컴포넌트 기준으로 소통할 수 있게 되어 배포 후 디자인 불일치 이슈를 제거했습니다.",
      },
      {
        issue: "SPA 구조로 SEO 불가 + CSS-in-JS 런타임 비용으로 성능 저하",
        cause:
          "SPA 구조에서 검색 엔진이 JS를 실행하지 않아 채용 공고가 인덱싱되지 않았고, styled-components 런타임 스타일 생성이 TTI를 늦추고 있었습니다.",
        solution:
          "페이지 성격별 SSR/SSG/ISR 전략 매트릭스를 정의하고 App Router로 마이그레이션. vanilla-extract 도입으로 빌드 타임 CSS 생성, dynamic import + route level code splitting 적용해 LCP 30% 개선.",
      },
    ],
    results: [
      "순환 참조 131건 중 60건 제거(46%↓), eslint-plugin-boundaries로 신규 순환 참조 발생 원천 차단",
      "LCP 약 30% 개선 (Lighthouse 기준), Core Web Vitals 전반 개선",
      "디자인 시스템 구축으로 컴포넌트 재사용성 향상",
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
      "아티스트의 온라인 클래스 영상과 DIY 키트를 결합해 판매하는 취미 특화 이커머스",
    image: "/images/hobbyful.png",
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
    architecture: {
      description:
        "Next.js Pages Router 기반의 Atomic Design 패턴 아키텍처. atoms → molecules → organisms → templates → pages 5계층 구조로 UI를 조합. pages는 라우팅만 담당하고, templates가 전체 레이아웃과 로직을 조율. organisms은 molecules와 atoms를 조합한 독립 UI 블록으로 구성. 서버 상태는 TanStack Query, API 통신은 커스텀 ApiService 레이어로 추상화.",
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

  subgraph "공통 레이어"
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
    keyFeatures: [
      {
        title: "상품 상세 ISR 전환",
        description:
          "상품 데이터의 주기적 갱신 특성을 파악해 매 요청 SSR에서 ISR(revalidate 1시간)로 전환. 캐시 히트율을 최대화해 TTFB를 개선하면서도 데이터 신선도를 유지.",
      },
      {
        title: "모바일 퍼스트 반응형 리디자인",
        description:
          "모바일 유입 비율이 높음에도 데스크톱 중심 UI로 이탈이 발생함을 확인. 모바일 퍼스트 기준으로 반응형 레이아웃을 전면 재구성하고 주요 구매 플로우의 터치 영역과 스크롤 구조를 개선.",
      },
      {
        title: "핵심 비즈니스 로직 테스트 체계",
        description:
          "@testing-library/react + Jest로 장바구니 수량 계산, 가격 합산, 쿠폰 적용 등 핵심 비즈니스 로직 단위 테스트 작성. Cypress로 장바구니 추가 → 결제 완료 전체 플로우 E2E 테스트 구성.",
      },
    ],
    decisions: [
      {
        title: "ISR (SSR 대비)",
        problem:
          "상품 상세 페이지를 SSR로 운영하면 매 요청마다 서버에서 데이터를 fetch해 TTFB가 높아지고 서버 부하가 증가했습니다.",
        choice:
          "상품 데이터는 실시간 갱신이 불필요하다는 특성에 착안해 ISR 선택. revalidate 1시간으로 설정해 캐시 히트율을 최대화하면서 데이터 신선도를 유지했습니다.",
      },
      {
        title: "단위 테스트 + E2E 테스트 조합",
        problem:
          "테스트 코드 부족으로 장바구니/결제 엣지 케이스에서 운영 장애가 반복 발생했습니다.",
        choice:
          "비즈니스 로직은 Jest 단위 테스트로 빠르게 검증하고, 사용자 플로우 전체는 Cypress E2E 테스트로 커버하는 두 레이어 전략을 선택했습니다.",
      },
    ],
    troubleshooting: [
      {
        issue: "모바일 사용자 구매 흐름 이탈",
        cause:
          "전체 유입의 상당 비율이 모바일임에도 UI가 데스크톱 기준으로 설계되어 터치 영역이 작고 스크롤 구조가 맞지 않았습니다.",
        solution:
          "모바일 퍼스트 기준으로 반응형 레이아웃을 전면 재구성. 주요 CTA 버튼 영역 확대, 스크롤 구조 개선 후 모바일 구매 전환율 약 25% 증가.",
      },
      {
        issue: "핵심 비즈니스 로직 런타임 버그 반복 발생",
        cause:
          "쿠폰 적용, 가격 합산 등 복잡한 계산 로직에 테스트가 없어 엣지 케이스를 배포 후 운영 중에 발견했습니다.",
        solution:
          "Jest로 핵심 비즈니스 로직 단위 테스트를 작성하고 Cypress로 구매 플로우 전체를 E2E 커버. 핵심 비즈니스 로직 관련 운영 버그 20% 감소.",
      },
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
    image: "/images/iofarm.png",
    techStack: ["React", "PostCSS", "Highcharts", "MUI", "MobX", "TypeScript"],
    keyRole: "스마트팜 데이터 관제 플랫폼 프론트엔드 개발 및 고도화, 어드민 개발",
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
    keyFeatures: [
      {
        title: "온실맵 Virtual Scroll",
        description:
          "저사양 기기에서 수백 개의 온실 데이터를 전체 렌더링하면 병목이 발생. Virtual Scroll을 적용해 뷰포트에 보이는 항목만 렌더링하도록 최적화. 스크롤 시에도 렌더링 범위를 최소화해 메모리 사용량을 제어.",
      },
      {
        title: "TypeScript 마이그레이션 주도",
        description:
          "런타임 타입 오류가 반복 발생하는 근본 원인이 JS의 동적 타입임을 파악. TypeScript 도입을 제안하고 마이그레이션을 주도. 기존 JS 파일을 점진적으로 TS로 전환하며 any 타입 최소화로 타입 안전성 확보.",
      },
      {
        title: "IoT 센서 데이터 실시간 시각화",
        description:
          "온도, 습도, CO2 등 다수 센서 데이터를 Highcharts로 실시간 차트 시각화. 대용량 시계열 데이터의 렌더링 성능을 유지하면서 사용자가 재배 전략을 직관적으로 판단할 수 있도록 구성.",
      },
    ],
    decisions: [
      {
        title: "Virtual Scroll",
        problem:
          "온실 수백 개의 데이터를 전체 렌더링하면 저사양 기기에서 DOM 노드 수가 폭발적으로 증가해 렌더링 병목과 메모리 부족이 발생했습니다.",
        choice:
          "PoC로 가상화 방식의 성능 개선을 먼저 확인 후 적용. 뷰포트에 보이는 항목만 DOM에 유지해 렌더링 범위를 최소화했습니다.",
      },
      {
        title: "TypeScript 점진적 마이그레이션",
        problem:
          "JS 기반 코드에서 API 응답 타입 불일치, 잘못된 프로퍼티 접근 등 런타임 오류가 반복 발생해 운영 중 버그로 이어졌습니다.",
        choice:
          "전면 TS 전환 대신 점진적 마이그레이션 전략 선택. 신규 파일은 TS로, 기존 파일은 변경 시점에 순차 전환해 서비스 운영을 유지하면서 타입 안전성을 확보했습니다.",
      },
    ],
    troubleshooting: [
      {
        issue: "저사양 기기에서 온실맵 렌더링 지연",
        cause:
          "전체 온실 데이터를 한 번에 DOM에 렌더링하는 구조로, 데이터가 많을수록 DOM 노드 수가 선형 증가해 저사양 기기에서 렌더링 지연이 심각했습니다.",
        solution:
          "Virtual Scroll 적용으로 뷰포트 기준 렌더링 범위를 고정. Lighthouse 성능 점수 70→90 개선, 렌더링 지연 시간 30% 감소.",
      },
      {
        issue: "런타임 타입 오류로 운영 중 버그 반복",
        cause:
          "JS 동적 타입 특성상 API 응답 구조 변경이나 잘못된 프로퍼티 접근이 컴파일 시점에 잡히지 않아 배포 후에야 발견됐습니다.",
        solution:
          "TypeScript 마이그레이션으로 컴파일 타임 타입 검증 체계 구축. any 타입 최소화로 타입 안전성을 확보해 런타임 타입 관련 버그 30% 감소.",
      },
    ],
    results: [
      "Lighthouse 성능 점수 70 → 90 개선",
      "저사양 기기에서 온실맵 렌더링 지연 시간 30% 감소",
      "런타임 타입 관련 버그 30% 감소",
    ],
    tags: ["IoT", "데이터 시각화", "성능 최적화", "TypeScript 마이그레이션"],
  },
];
