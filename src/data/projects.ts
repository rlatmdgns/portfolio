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
          "LLM이 생성한 온보딩 초안의 필드 누락과 타입 불일치가 검증 없이 중첩 폼에 주입되면 UI 오류로 이어질 수 있었습니다.",
        approach:
          "프롬프트만으로 출력을 보장할 수 없다고 판단해 생성 품질 개선과 런타임 경계 검증을 독립된 두 단계로 설계했습니다.",
        implementation:
          "Few-shot 프롬프팅으로 응답 패턴을 유도하고 Zod 스키마를 통과한 데이터만 UI에 반영했습니다. 검증 실패를 정상 흐름과 분리하고 Sentry로 미처리 에러를 모니터링했습니다.",
        evidence:
          "비정형 응답이 폼에 반영되는 경로를 차단하고 AI 빌더 에러 모니터링 체계를 구축했습니다.",
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
    keyFeatures: [
      {
        title: "복잡한 중첩 폼 빌더의 상태 구조 분리 및 렌더링 최적화",
        description:
          "섹션 → 시퀀스 → 태스크의 3-depth 데이터를 react-hook-form의 uncontrolled 방식과 중첩 useFieldArray로 관리. useWatch는 필요한 필드 단위로 구독하고 선택·포커스·Drag 상태는 Zustand로 분리했으며, selector 기반 구독·stable key 재정렬·React.memo를 적용해 상태 변경의 영향 범위를 변경 필드와 재정렬 대상 단위로 축소.",
      },
      {
        title: "LLM 기반 온보딩 초기 설계",
        description:
          "인사담당자가 섹션·시퀀스·태스크를 처음부터 직접 구성해야 하는 부담을 줄이기 위해, LLM이 온보딩 초안을 생성하고 사용자가 수정하는 초기 설계 기능을 구현. Few-shot 프롬프팅으로 온보딩 구조에 맞는 응답을 유도하고, Zod 런타임 스키마 검증에 실패한 응답은 UI에 반영하지 않도록 차단.",
      },
      {
        title: "멀티테넌트 SaaS를 위한 SSR 기반 테마 시스템",
        description:
          "고객사별 브랜드 컬러를 단일 빌드에서 안정적으로 지원하기 위해 Server Component 기반 ThemeProvider에서 CSS Custom Properties를 SSR 시점에 인라인 주입. color-mix()로 브랜드 컬러 기반 팔레트를 자동 생성하고, 테마 변경 시 router.refresh()로 변경 사항을 반영해 새로고침 시 FOUC를 제거.",
      },
      {
        title: "12종 질문 입력 타입",
        description:
          "단답형·장문형·단일선택·다중선택·날짜·숫자·점수·슬라이더·NPS·별점·True/False·등급 등 12가지 입력 타입을 지원. 각 타입을 독립 컴포넌트로 분리하고 '타입 키 → 컴포넌트' 매핑 테이블로 관리해, 새 입력 타입을 추가할 때 기존 코드 변경 없이 컴포넌트 등록만으로 확장 가능.",
      },
    ],
    decisions: [
      {
        title: "멀티테넌트 SaaS를 위한 SSR 기반 테마 적용",
        problem:
          "B2B 멀티테넌트 환경에서 고객사별 브랜드 컬러를 단일 빌드로 지원해야 했습니다. 클라이언트 런타임에 테마를 주입하는 방식은 hydration 이전에 기본 스타일이 먼저 렌더링되어 새로고침 시 FOUC가 발생했습니다.",
        choice:
          "초기 렌더링부터 테마가 적용되도록 Server Component 기반 ThemeProvider에서 CSS Custom Properties를 SSR 시점에 인라인 주입했습니다. color-mix()로 브랜드 컬러 기반 팔레트를 자동 생성하고, 테마 변경 시 router.refresh()로 변경 사항을 반영하는 구조를 채택했습니다.",
      },
      {
        title: "FSD 핵심만 취한 3단계 Feature-driven 구조",
        problem:
          "스테드에서 순환 참조 문제를 해결할 도구를 찾다 FSD를 알게 되어 도입했고, 단방향 참조·cross-import 금지의 효과는 분명했습니다. 다만 운영하면서 다층 슬라이스 구조 특성상 작은 기능 하나 추가에도 entities/features/widgets 여러 레이어를 거쳐야 하는 보일러플레이트가 불편하다고 느꼈습니다. 헬로보드는 공동창업 3인·초기 단계 제품이라 그 불편함을 그대로 들고 갈 이유가 없었습니다.",
        choice:
          "FSD의 본질(단방향 참조 + 도메인 간 cross-import 금지)과 형식(다층 슬라이스)을 분리해서 보고, 본질만 취해 App Router / features / Shared 3개 영역으로 단순화. 각 feature가 자체 완결 구조로 변경 범위를 격리하고, eslint-plugin-boundaries로 규칙을 빌드 타임에 강제했습니다.",
      },
      {
        title: "AI 기반 개발·코드 리뷰 프로세스 표준화",
        problem:
          "AI 도구로 개발 생산성은 높아졌지만 PR 생성량이 늘면서 코드 리뷰가 병목이 되었고, 도구마다 코드 생성 방식과 답변이 달라 프로젝트 컨벤션이 일관되게 유지되지 않는 문제가 있었습니다.",
        choice:
          "프로젝트 아키텍처·컨벤션·폴더 구조를 CLAUDE.md에 문서화해 개발과 리뷰 단계가 동일한 컨텍스트를 공유하도록 표준화했습니다. 반복적인 코드 작성과 리팩터링에는 AI를 활용하고, PR 생성 전 AI 사전 코드 리뷰로 컨벤션 위반과 잠재 이슈를 먼저 점검하는 프로세스를 도입했습니다.",
      },
    ],
    troubleshooting: [
      {
        issue: "복잡한 3-depth 중첩 폼에서 Drag & Drop 시 전체 트리 리렌더링",
        cause:
          "React DevTools Profiler로 렌더링 흐름을 확인한 결과, 폼 상태와 선택·포커스·Drag 같은 UI 상태가 하나의 컴포넌트 트리에서 함께 관리되며 구독 범위가 넓어진 점과, index 기반 재정렬로 key가 변경되는 점이 전체 폼 트리 리렌더링의 주요 원인이었습니다.",
        solution:
          "react-hook-form의 uncontrolled 방식과 중첩 useFieldArray로 계층 데이터를 관리하고, useWatch 구독 범위를 필요한 필드 단위로 좁혔습니다. UI 상태는 Zustand로 분리한 뒤 selector 기반 구독 최소화, stable key 기반 재정렬, React.memo를 함께 적용해 불필요한 하위 트리 리렌더링을 차단했습니다.",
      },
      {
        issue: "LLM 기반 온보딩 초기 설계 시 응답 비일관성으로 인한 런타임 에러",
        cause:
          "인사담당자가 섹션·시퀀스·태스크를 직접 구성하는 데 드는 시간과 러닝커브를 줄이기 위해 LLM이 온보딩 초안을 생성하는 기능을 도입했습니다. 하지만 LLM 응답 구조가 일관되지 않아 검증 없이 폼에 주입하면 필드 누락이나 타입 불일치가 UI 오류로 이어질 수 있었습니다.",
        solution:
          "Few-shot 프롬프팅으로 온보딩 구조에 맞는 응답을 유도하고, Zod 기반 런타임 스키마 검증을 적용했습니다. 검증에 실패한 응답은 UI에 반영하지 않도록 처리하고, Sentry로 AI 빌더의 미처리 런타임 에러를 모니터링했습니다.",
      },
      {
        issue: "멀티테넌트 테마를 런타임에 주입할 때 새로고침 시 FOUC 발생",
        cause:
          "클라이언트 런타임 방식은 hydration 이전의 스타일 적용을 보장할 수 없어, 서버에서 렌더링된 기본 스타일이 먼저 노출된 뒤 고객사 테마로 교체되는 깜빡임이 발생했습니다.",
        solution:
          "Server Component 기반 ThemeProvider에서 고객사 색상을 CSS Custom Properties로 SSR 인라인 주입했습니다. color-mix()로 브랜드 컬러 기반 팔레트를 자동 생성하고, 테마 변경 시 router.refresh()를 호출해 변경 사항이 반영되도록 구성했습니다.",
      },
    ],
    results: [
      "중첩 폼 상태 변경의 영향 범위를 전체 트리에서 변경 필드 및 재정렬 대상 단위로 축소",
      "Drag & Drop 시 불필요한 전체 리렌더링을 줄여 복잡한 중첩 빌더의 반응성과 상태 관리 안정성 향상",
      "새로고침 시 FOUC를 제거하고, 단일 빌드에서 고객사별 브랜드 컬러를 안정적으로 적용",
      "LLM으로 온보딩 초안을 생성하는 초기 설계 경험을 제공하고, Sentry 기반의 AI 빌더 에러 모니터링 체계 구축",
      "AI 사전 코드 리뷰로 PR 리뷰 병목을 완화하고, 프로젝트 전반의 코드 컨벤션과 리뷰 품질 일관성 향상",
      "도입 고객사 인사담당자 자체 보고 기준, 신규 입사자 조기 퇴사율 도입 전 대비 약 15% 감소",
    ],
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
        title: "화면 마스킹을 다운로드 결과물까지 보장",
        problem: "PDF 화면을 블러나 Canvas로 가려도 원본 텍스트 레이어가 남으면 다운로드 후 민감정보를 추출할 수 있었습니다.",
        approach: "타사 솔루션의 비용·기능 범위와 직접 구현의 보안·성능 제어 범위를 비교했습니다. 화면 표시만이 아니라 최종 PDF에서 원본 텍스트를 제거하는 것을 보안 경계로 정했습니다.",
        implementation: "PDF.js와 Canvas로 마스킹 영역 편집을 구현하고 합성본을 이미지 기반 PDF로 재조립했습니다. PDF 뷰어는 Dynamic Import, 렌더링은 Web Worker로 분리했습니다.",
        evidence: "원본 텍스트 추출 우회를 차단했고, 변경 전후 CI 로그에서 빌드 시간이 약 10분에서 5분으로 단축된 것을 확인했습니다.",
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
    keyFeatures: [
      {
        title: "모노레포 및 FSD 아키텍처 도입",
        description:
          "3개 레포의 공통 코드를 Turborepo 기반 모노레포로 통합하고, dependency-cruiser로 누적된 순환 참조 131건을 시각화. FSD 단방향 레이어와 eslint-plugin-boundaries를 적용해 레이어 규칙을 빌드 단계에서 검증하도록 구성했으며, 순환 참조 60건(46%)을 제거하고 신규 발생을 차단.",
      },
      {
        title: "시맨틱 네이밍 기반 design token 공동 설계",
        description:
          "컴포넌트 파편화와 디자인-개발 간 언어 불일치 문제를 해결하기 위해 디자이너와 함께 design token 체계를 공동 설계. font-16/color-gray-700 같은 스케일/값 기반 네이밍 대신 text-md/text-default 같은 시맨틱 네이밍을 채택해 디자이너·기획자도 바로 이해할 수 있는 공통 언어를 만들었습니다.",
      },
      {
        title: "vanilla-extract variant 시스템 + Storybook 카탈로그",
        description:
          "vanilla-extract recipe API로 variant 기반 컴포넌트 스타일 시스템을 구성하고, Storybook으로 컴포넌트 카탈로그와 동작 흐름을 문서화. 개발자·디자이너·기획자가 배포 전 동일한 기준으로 컴포넌트를 조합·검증할 수 있는 환경을 구축했습니다.",
      },
      {
        title: "SEO 및 사용자 경험 개선을 위한 Next.js 마이그레이션",
        description:
          "검색 엔진 크롤링과 OG 메타데이터 대응이 중요한 채용 공고·고객사 채용 페이지를 Next.js App Router 기반 SSR/ISR 구조로 전환. vanilla-extract와 Design Token 기반 스타일 시스템을 구축하고, Dynamic Import로 초기 로딩 범위를 줄여 Lighthouse 기준 LCP를 약 30% 단축.",
      },
      {
        title: "PDF 뷰어 민감정보 마스킹 기능 직접 구현",
        description:
          "PDF.js와 Canvas 기반으로 이력서·평가 PDF 뷰어와 마스킹 영역 편집 기능을 직접 구현. Dynamic Import로 PDF 뷰어를 초기 번들에서 분리하고 Web Worker로 메인 스레드 부하를 줄였습니다. 변경 전후 CI 로그에서 빌드 시간이 약 10분에서 5분으로 단축된 것도 확인했습니다. 다운로드 시에는 마스킹된 Canvas 합성본을 이미지 기반 PDF로 재조립해 원본 텍스트 추출을 통한 우회를 차단.",
      },
    ],
    decisions: [
      {
        title: "Turborepo 모노레포",
        problem:
          "3개 레포가 유사한 구조와 공통 컴포넌트를 각각 관리하면서 코드 중복이 발생했고, 변경 사항을 여러 저장소에 반복 반영해야 하는 유지보수 비용이 커졌습니다.",
        choice:
          "공통 코드를 단일 저장소에서 관리하기 위해 Turborepo 기반 모노레포를 구축했습니다. npm 패키지 분리에서 발생하는 버전 동기화 오버헤드와 로컬 개발 복잡도를 피하면서 공통 코드를 단일 패키지로 통합했습니다.",
      },
      {
        title: "Next.js App Router 및 빌드 타임 스타일 시스템 전환",
        problem:
          "주요 유입 채널인 채용 공고와 고객사 채용 페이지가 SPA로 제공되어 검색 엔진 크롤링과 OG 메타데이터 대응에 한계가 있었고, styled-components의 런타임 스타일 생성 비용도 초기 렌더링 성능을 저하시키고 있었습니다.",
        choice:
          "Next.js App Router로 마이그레이션하고 공개 페이지에는 SSR/ISR을 적용했습니다. 스타일 시스템도 vanilla-extract와 Design Token 기반으로 재설계해 런타임 CSS 생성 비용을 제거하고, Dynamic Import와 Route-level Code Splitting으로 초기 로딩 범위를 줄였습니다.",
      },
      {
        title: "FSD + eslint-plugin-boundaries",
        problem:
          "특정 레포에 순환 참조가 131건까지 누적되어 변경 영향도와 사이드 이펙트 추적이 어려웠고, 폴더 구조 변경만으로는 같은 문제가 반복될 가능성이 있었습니다.",
        choice:
          "dependency-cruiser로 순환 참조를 시각화한 뒤 FSD 단방향 레이어를 적용하고, eslint-plugin-boundaries로 참조 방향을 빌드 단계에서 검증했습니다. 규칙 위반 시 빌드가 실패하도록 구성해 신규 순환 참조가 발생하지 않게 했습니다.",
      },
      {
        title: "PDF 뷰어 및 민감정보 마스킹 직접 구현",
        problem:
          "ATS에서 이력서·평가 PDF의 민감정보를 마스킹해야 했지만, 타사 솔루션은 비용과 기능 면에서 요구사항 대비 오버스펙이었습니다. 단순 화면 블러 처리만으로는 다운로드 후 원본 텍스트 추출을 통해 마스킹을 우회할 수 있는 문제도 있었습니다.",
        choice:
          "PDF 렌더링부터 마스킹 편집, 다운로드 결과물까지 직접 제어하기 위해 PDF.js와 Canvas 기반으로 구현했습니다. dynamic import와 Web Worker로 렌더링 로직을 메인 번들 및 실행 흐름에서 분리하고, 다운로드 결과물은 마스킹된 Canvas 합성본을 이미지 기반 PDF로 재조립해 원본 텍스트 레이어를 제거했습니다.",
      },
    ],
    troubleshooting: [
      {
        issue: "중복된 3개 레포 구조와 순환 참조 131건으로 변경 영향도 추적 곤란",
        cause:
          "3개 레포가 유사한 구조와 공통 컴포넌트를 각각 관리해 코드 중복이 발생했고, 특정 레포에는 순환 참조가 131건까지 누적되어 변경 영향도와 사이드 이펙트 추적이 어려웠습니다.",
        solution:
          "Turborepo 기반 모노레포로 공통 코드를 통합하고, dependency-cruiser로 순환 참조를 시각화했습니다. 이후 FSD 단방향 레이어와 eslint-plugin-boundaries를 적용해 참조 규칙을 빌드 단계에서 강제한 결과, 순환 참조 131건 중 60건(46%)을 제거하고 신규 발생을 차단했습니다.",
      },
      {
        issue: "컴포넌트 파편화로 배포 후 디자이너 의도와 다른 결과물 반복",
        cause:
          "공통 기준 없이 각자 개발하다 보니 어떤 컴포넌트가 존재하는지 파악이 안 됐고, 배포 후에야 디자이너가 의도한 것과 다른 결과물이 나오는 일이 반복됐습니다.",
        solution:
          "디자이너와 함께 시맨틱 네이밍 기반 design token 체계를 공동 설계하고, Storybook으로 컴포넌트 카탈로그와 동작 흐름을 문서화. 개발자·디자이너·기획자가 배포 전 동일한 컴포넌트 기준으로 소통할 수 있게 되어 배포 후 디자인 불일치 이슈를 제거했습니다.",
      },
      {
        issue: "SPA의 SEO 한계와 CSS-in-JS 런타임 비용으로 초기 사용자 경험 저하",
        cause:
          "ATS의 주요 유입 채널인 채용 공고와 고객사 채용 페이지는 검색과 소셜 공유 대응이 중요했지만, 기존 SPA 구조는 검색 엔진 크롤링과 OG 메타데이터 제공에 한계가 있었습니다. styled-components의 런타임 스타일 생성 비용까지 더해져 초기 렌더링 성능도 저하되고 있었습니다.",
        solution:
          "Next.js App Router 기반으로 마이그레이션하고 공개 페이지에는 SSR/ISR을 적용해 크롤링과 OG 메타데이터 대응을 개선했습니다. 동시에 vanilla-extract와 Design Token 기반 스타일 시스템을 구축하고, Dynamic Import로 초기 로딩 범위를 줄여 Lighthouse 기준 LCP를 약 30% 단축했습니다.",
      },
      {
        issue: "PDF 화면 마스킹을 다운로드 후 원본 텍스트 추출로 우회 가능",
        cause:
          "화면에서 민감정보를 블러 처리하거나 Canvas 레이어로 가리더라도 원본 PDF의 텍스트 레이어가 남아 있으면, 다운로드 후 텍스트를 복사하거나 추출해 마스킹을 우회할 수 있었습니다.",
        solution:
          "PDF.js와 Canvas로 마스킹 영역을 편집할 수 있는 뷰어를 구현하고, 다운로드 시 마스킹된 Canvas 합성본을 이미지 기반 PDF로 재조립해 원본 텍스트 레이어를 제거했습니다. dynamic import와 Web Worker도 적용해 큰 번들을 분리하고 메인 스레드 블로킹을 줄였습니다.",
      },
    ],
    results: [
      "순환 참조 131건 중 60건(46%) 제거, eslint-plugin-boundaries로 신규 순환 참조 발생 차단",
      "Next.js 마이그레이션과 초기 로딩 최적화로 Lighthouse 기준 LCP 약 30% 단축",
      "Design Token 기반 디자인 시스템으로 공통 컴포넌트의 일관성과 재사용성 향상",
      "PDF 뷰어 번들 분리 전후 CI 로그에서 빌드 시간 약 10분 → 5분 단축 확인",
      "고객사별 PDF 마스킹 규칙 커스터마이징과 Web Worker 분리로 메인 스레드 부하 감소",
      "이미지 기반 PDF 재조립으로 다운로드 후 원본 텍스트 추출 우회를 차단해 개인정보 보호 안정성 향상",
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
    keyFeatures: [
      {
        title: "상품 상세 페이지 ISR 적용",
        description:
          "상품 데이터의 갱신 특성에 맞춰 매 요청 SSR에서 ISR로 전환하고 revalidate 전략을 적용. 데이터 신선도를 유지하면서 캐시 활용도를 높여 Lighthouse에서 TTFB 개선을 확인.",
      },
      {
        title: "모바일 반응형 전환",
        description:
          "데스크톱 중심 UI를 모바일 친화적인 반응형 구조로 전환하고, 주요 CTA의 터치 영역과 스크롤 구조 등 구매 플로우를 최적화해 GA 기준 모바일 구매 전환율을 25% 향상.",
      },
      {
        title: "핵심 비즈니스 테스트 도입",
        description:
          "Jest로 장바구니 수량 계산·가격 합산·쿠폰 적용 등 핵심 비즈니스 로직의 단위 테스트를 작성하고, Cypress로 장바구니 추가부터 결제 완료까지 구매 플로우의 E2E 테스트를 구성. 도입 후 Sentry에서 관련 운영 에러의 감소 추세를 확인.",
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
          "테스트 코드 부족으로 장바구니/결제 edge case에서 운영 장애가 반복 발생했습니다.",
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
          "모바일 퍼스트 기준으로 반응형 레이아웃을 전면 재구성. 주요 CTA 버튼 영역 확대, 스크롤 구조 개선 후 모바일 구매 전환율 25% 증가.",
      },
      {
        issue: "핵심 비즈니스 로직 런타임 버그 반복 발생",
        cause:
          "쿠폰 적용, 가격 합산 등 복잡한 계산 로직에 테스트가 없어 edge case를 배포 후 운영 중에 발견했습니다.",
        solution:
          "Jest로 핵심 비즈니스 로직 단위 테스트를 작성하고 Cypress로 구매 플로우 전체를 E2E로 커버했습니다. 도입 후 Sentry에서 관련 운영 에러의 감소 추세를 확인했습니다.",
      },
    ],
    results: [
      "SSR에서 ISR로 전환한 후 Lighthouse에서 TTFB 개선 확인",
      "모바일 구매 전환율 25% 증가 (GA 기준)",
      "테스트 도입 후 Sentry에서 핵심 비즈니스 로직 관련 운영 에러 감소 추세 확인",
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
    keyFeatures: [
      {
        title: "온실맵 렌더링 성능 최적화",
        description:
          "전체 데이터를 한 번에 DOM에 그리는 구조를 렌더링 병목의 원인으로 분석하고 Virtual Scroll을 도입. 뷰포트에 보이는 항목만 렌더링해 DOM 노드 수를 일정하게 유지하고 Lighthouse Performance Score 개선을 확인.",
      },
      {
        title: "TypeScript 점진적 마이그레이션",
        description:
          "기존 JavaScript 프로젝트에 TypeScript 도입을 제안하고 점진적 마이그레이션을 주도. 신규 파일은 TypeScript로 작성하고 기존 파일은 변경 시점에 순차 전환해 서비스 운영을 유지하면서 Sentry에서 런타임 타입 관련 에러의 감소 추세를 확인.",
      },
      {
        title: "IoT 센서 데이터 실시간 시각화",
        description:
          "온도·습도·CO2 등 다수 센서 데이터를 Highcharts로 실시간 차트 시각화. 사용자가 재배 전략을 직관적으로 판단할 수 있도록 차트 구성과 인터랙션을 설계.",
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
          "Virtual Scroll 적용으로 뷰포트 기준 렌더링 범위를 고정하고, Lighthouse에서 Performance Score 개선을 확인했습니다.",
      },
      {
        issue: "런타임 타입 오류로 운영 중 버그 반복",
        cause:
          "JS 동적 타입 특성상 API 응답 구조 변경이나 잘못된 프로퍼티 접근이 컴파일 시점에 잡히지 않아 배포 후에야 발견됐습니다.",
        solution:
          "TypeScript 마이그레이션으로 컴파일 타임 타입 검증 체계를 구축하고 any 타입을 최소화했습니다. 도입 후 Sentry에서 런타임 타입 관련 에러의 감소 추세를 확인했습니다.",
      },
    ],
    results: [
      "Virtual Scroll 적용 후 Lighthouse에서 Performance Score 개선 확인",
      "TypeScript 점진적 마이그레이션 후 Sentry에서 런타임 타입 관련 에러 감소 추세 확인",
    ],
    tags: ["IoT", "데이터 시각화", "성능 최적화", "TypeScript"],
  },
];
