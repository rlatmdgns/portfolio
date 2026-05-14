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
        title: "3단계 계층(섹션 → 시퀀스 → 태스크) 온보딩 빌더",
        description:
          "섹션-시퀀스-태스크의 3단계 계층 구조를 가진 다단계 폼 빌더. react-hook-form 비제어 폼 구조(ref 기반 register) + 중첩 useFieldArray로 3단계 계층 데이터를 관리하고, useWatch가 필요한 부분만 최소 필드 단위로 구독 격리. UI 상태(선택·포커스·drag)는 Zustand로 분리해 selector 구독을 최소화하고, stable key 재정렬 + React.memo로 리렌더를 차단.",
      },
      {
        title: "AI 온보딩 태스크 자동 생성",
        description:
          "인사담당자의 '온보딩 설계 진입장벽' 완화를 위해 AI 태스크 콘텐츠 초안 자동 생성 도입. LLM 응답 비일관성 리스크는 Few-shot 프롬프팅으로 응답 패턴을 안정화하고, Zod 런타임 스키마 검증으로 UI 도달 전에 비정형 응답을 차단.",
      },
      {
        title: "멀티테넌트 동적 테마 시스템",
        description:
          "고객사별 브랜드 컬러를 SSR 환경에서 FOUC 없이 적용. CSS Custom Properties + color-mix() 함수로 50~950 팔레트를 자동 생성해 디자이너의 팔레트 수동 관리 부담을 제거. ThemeProvider를 server component로 구성해 `<style>` 태그에 CSS 변수를 SSR 인라인 주입하고, 테마 변경 시 router.refresh()로 페이지 새로고침 없이 즉시 반영.",
      },
      {
        title: "12종 질문 입력 타입",
        description:
          "단답형·장문형·단일선택·다중선택·날짜·숫자·점수·슬라이더·NPS·별점·True/False·등급 등 12가지 입력 타입을 지원. 각 타입을 독립 컴포넌트로 분리하고 '타입 키 → 컴포넌트' 매핑 테이블로 관리해, 새 입력 타입을 추가할 때 기존 코드 변경 없이 컴포넌트 등록만으로 확장 가능.",
      },
    ],
    decisions: [
      {
        title: "CSS Custom Properties 기반 동적 테마",
        problem:
          "고객사별로 브랜드 컬러를 다르게 적용해야 하는 멀티테넌트 환경에서, 고객사 수만큼 빌드를 분리하면 운영 부담이 커지고, 클라이언트 런타임에 색상을 주입하면 서버 렌더링 결과와 충돌해 FOUC가 발생합니다.",
        choice:
          "단일 빌드로 다수 고객사 테마를 지원하면서 FOUC까지 차단하기 위해, ThemeProvider를 server component로 구성해 CSS Custom Properties를 `<style>` 태그에 SSR 인라인 주입하는 방식을 채택. hydration 이전 시점에 변수가 적용되어 FOUC를 원천 차단했고, 테마 변경 시에는 router.refresh()로 server component만 재렌더해 페이지 새로고침 없이 즉시 반영되도록 했습니다.",
      },
      {
        title: "FSD 핵심만 취한 3단계 Feature-driven 구조",
        problem:
          "스테드에서 순환 참조 문제를 해결할 도구를 찾다 FSD를 알게 되어 도입했고, 단방향 참조·cross-import 금지의 효과는 분명했습니다. 다만 운영하면서 다층 슬라이스 구조 특성상 작은 기능 하나 추가에도 entities/features/widgets 여러 레이어를 거쳐야 하는 보일러플레이트가 불편하다고 느꼈습니다. 헬로보드는 공동창업 3인·초기 단계 제품이라 그 불편함을 그대로 들고 갈 이유가 없었습니다.",
        choice:
          "FSD의 본질(단방향 참조 + 도메인 간 cross-import 금지)과 형식(다층 슬라이스)을 분리해서 보고, 본질만 취해 App Router / features / Shared 3개 영역으로 단순화. 각 feature가 자체 완결 구조로 변경 범위를 격리하고, eslint-plugin-boundaries로 규칙을 빌드 타임에 강제했습니다.",
      },
    ],
    troubleshooting: [
      {
        issue: "3단계 계층 폼에서 drag & drop 시 전체 리렌더링",
        cause:
          "두 가지 차원의 원인이 결합되어 있었습니다. (1) 폼 상태와 UI 상태(선택·포커스·drag)가 같은 컴포넌트 트리에서 관리되어 UI 상태 변경마다 form 구독 트리 전체가 리렌더되는 '도메인 결합' 문제. (2) drag로 항목 순서가 바뀔 때 index 기반 key 때문에 모든 컴포넌트의 key가 흔들려 unmount/mount가 발생하는 'reconciliation' 문제. React DevTools Profiler로 두 원인을 분리해 측정했습니다.",
        solution:
          "(1)에는 폼 상태와 UI 상태를 분리 — react-hook-form의 비제어 폼 구조(ref 기반 register) + 중첩 useFieldArray로 3단계 계층 데이터를 관리하고, useWatch가 필요한 부분만 최소 필드 단위로 구독을 격리. UI 상태는 Zustand로 분리해 selector 구독을 최소화. (2)에는 stable key(항목 고유 id) 기반 재정렬 + React.memo로 변경된 항목만 리렌더되도록 차단.",
      },
      {
        issue: "AI 동적 태스크 생성 시 LLM 응답 포맷 비일관성으로 인한 런타임 에러",
        cause:
          "인사담당자의 '온보딩 설계 진입장벽'을 완화하기 위해 AI 태스크 콘텐츠 초안 자동 생성을 도입했으나, 동일한 프롬프트에도 LLM 응답 구조가 매번 다르게 반환되어 검증 없이 폼에 주입하면 필드 누락·타입 불일치로 런타임 에러가 발생할 수 있었습니다.",
        solution:
          "Few-shot 프롬프팅으로 응답 패턴을 안정화하고, Zod 런타임 스키마 검증을 single source of truth로 두어 UI 도달 전에 비정형 응답을 차단. 검증 실패 시 자동 재요청, 재시도 후에도 실패하면 사용자에게 에러를 안내. AI 빌더 구간 Sentry 모니터링 기준 미처리 런타임 에러 0건 달성.",
      },
      {
        issue: "SSR 환경에서 고객사 테마 색상 적용 시 FOUC 발생",
        cause:
          "컴포넌트 마운트 후 JS로 CSS 변수를 설정하면 서버에서 렌더링된 기본 색상이 먼저 노출된 뒤 고객사 색상으로 교체되는 깜빡임이 발생했습니다.",
        solution:
          "ThemeProvider를 server component로 구성해 고객사 색상을 담은 CSS 변수를 `<style>` 태그로 SSR 렌더링. hydration 이전 시점에 팔레트가 적용되어 FOUC를 원천 차단했고, 테마 mutation 성공 시 router.refresh()로 server component 재렌더를 트리거해 페이지 새로고침 없이 즉시 반영되는 UX를 확보했습니다.",
      },
    ],
    results: [
      "상태 변경 영향 범위: 폼 트리 전체 → 변경 필드 단위로 축소",
      "drag & drop 리렌더: 전체 트리 → 재정렬 항목 단위로 축소",
      "FOUC 해소, 고객사별 브랜드 컬러 커스터마이징 안정화",
      "AI 초안 기반 빠른 구성으로 진입장벽 완화, AI 빌더 Sentry 모니터링 기준 미처리 런타임 에러 0건",
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
    architecture: {
      description:
        "Turborepo 기반 모노레포로 채용팀(apps/web)과 지원자(apps/recruit), 공통 UI(packages/ui) 세 개의 패키지를 하나의 레포에서 관리. apps/web은 화면 수가 많고 도메인이 복잡해 FSD(Feature-Sliced Design) 레이어 구조(pages → widgets → features → entities → shared 단방향 참조 — 상위 레이어가 하위 레이어를 참조)를 적용했고, apps/recruit는 화면 수가 적어 FSD 풀버전 대신 modules 단일 레이어로 가볍게 유지했습니다. eslint-plugin-boundaries로 레이어 간 잘못된 참조를 빌드 타임에 자동 감지합니다.",
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
      U1["컴포넌트 + Storybook 문서 + vanilla-extract 테마"]
    end
  end

  W5 --> U1
  R3 --> U1`,
    },
    keyFeatures: [
      {
        title: "FSD 단방향 레이어 + 빌드 타임 경계 강제",
        description:
          "dependency-cruiser로 누적된 순환 참조 131건을 시각화한 뒤 FSD 단방향 레이어 구조를 도입. eslint-plugin-boundaries로 레이어 경계 위반을 빌드 타임에 차단해 단방향 규칙을 강제했고, 그 결과 신규 순환 참조 발생을 구조적으로 막았습니다.",
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
        title: "페이지 성격별 렌더링 전략 매트릭스",
        description:
          "외부 공개 페이지(채용 공고·고객사 채용 페이지)는 SSR/ISR로 안정적 크롤링·빠른 TTFB를 확보하고, 지원자 현황·대시보드는 성격에 따라 SSR/CSR로 분리 적용. 서버/클라이언트 컴포넌트 분리 + data fetching 서버 이동으로 hydration 비용을 줄이고, dynamic import + route-level code splitting, next/image priority + font-display swap으로 LCP 자원 우선 로딩 구성.",
      },
      {
        title: "이력서 PDF 뷰어 + 민감정보 마스킹",
        description:
          "타사 솔루션이 비용·기능 모두 오버스펙이라 직접 구현 결정. PDF.js + Canvas로 구현하되 dynamic import로 큰 번들을 격리하고 Worker 분리로 메인 스레드 블로킹을 방지. Canvas 레이어 위에 좌표 기반 마스킹 영역을 그리고 사용자가 직접 추가·삭제·이동할 수 있게 구성해, 고정 템플릿이 아닌 케이스별 마스킹을 지원. 다운로드 시에는 Canvas 합성본을 이미지화한 PDF로 재조립해 원본 텍스트 레이어를 제거함으로써, 다운로드 후 텍스트 추출을 통한 마스킹 우회까지 차단.",
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
        title: "PDF 마스킹 직접 구현",
        problem:
          "이력서 PDF의 민감정보 마스킹 기능이 필요했으나, 검토한 타사 PDF 솔루션은 필요한 마스킹 외에도 다양한 기능이 묶여 있는 오버스펙이었고 라이선스 비용도 부담이었습니다. PDF 자체가 무거운 리소스라 렌더링 시 메인 스레드 블로킹 우려도 있었습니다.",
        choice:
          "필요 기능 대비 타사 솔루션이 비용·기능 모두 과하다고 판단해 직접 구현 결정. PDF.js + Canvas 조합으로 동적 마스킹 제어를 확보하되, 큰 번들 사이즈는 dynamic import로 격리하고 메인 스레드 블로킹은 Worker 분리로 방지. 추가로 Canvas 가림만으로는 원본 텍스트 레이어가 남아 다운로드 후 텍스트 추출로 마스킹이 우회될 수 있다는 보안 허점을 인지, 다운로드 시점에는 Canvas 합성본을 이미지화한 PDF로 재조립해 텍스트 레이어 자체를 제거하는 방식으로 설계했습니다.",
      },
    ],
    troubleshooting: [
      {
        issue: "3개 레포 간 순환 참조 131건으로 사이드 이펙트 예측 불가",
        cause:
          "3개 레포의 dependencies·컴포넌트 구조가 거의 동일한데도 분리 운영되어 코드 중복이 발생했고, 한 레포는 순환 참조 131건이 누적되어 사이드 이펙트 추적이 어려웠습니다.",
        solution:
          "공통 코드는 Turborepo apps/packages + turbo.json 빌드 캐시로 단일 패키지에 통합(npm 패키지 분리는 버전 동기화 오버헤드 부담). dependency-cruiser로 순환 참조를 시각화하고 FSD 단방향 레이어(shared → entities → features → widgets → pages)를 도입, eslint-plugin-boundaries로 빌드 타임 차단. 챕터 리드로서 검증 브랜치에 먼저 적용 → 팀 공유·논의 → 합의 기반 본격 도입. 131건 중 60건(46%) 제거, 잔여 71건은 점진적 마이그레이션 계획으로 관리.",
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
          "ATS의 외부 공개 채널(채용 공고·고객사 채용 페이지)이 핵심 비즈니스 유입 경로인데, 구직자가 검색·소셜 공유로 진입하므로 안정적 크롤링·OG 메타 태그 대응이 필수였습니다. 그러나 기존 SPA(React)는 JS 기반 크롤링 지연과 OG 미리보기 한계로 이를 지원하지 못했고, styled-components 런타임 비용까지 더해져 초기 렌더링 성능이 저하되고 있었습니다.",
        solution:
          "SPA prerender(react-snap 등)는 동적 콘텐츠 한계로 제외하고, 서버 운영·전환 비용 트레이드오프는 있지만 SEO/OG 대응과 렌더링 성능 확보가 우세하다고 판단해 Next.js App Router 마이그레이션 결정. 외부 공개 페이지는 SSR/ISR로 안정적 크롤링·빠른 TTFB를 확보하고, 서버/클라이언트 컴포넌트 분리 + data fetching 서버 이동으로 hydration 비용 감소. 같은 시점에 styled-components 런타임 비용 정리를 위해 vanilla-extract + design token recipe API로 variant 스타일 시스템을 재설계하고, dynamic import + route-level code splitting, next/image priority + font-display swap으로 LCP 자원을 우선 로딩하도록 구성해 LCP 30% 개선.",
      },
      {
        issue: "PDF 마스킹 다운로드 시 원본 텍스트 추출로 마스킹 우회 가능",
        cause:
          "Canvas 레이어로 마스킹 영역을 시각적으로 가리는 방식은 화면상으로는 마스킹되어 보이지만, 원본 PDF의 텍스트 레이어가 그대로 남아있어 다운로드 후 PDF 뷰어에서 텍스트 복사·추출 시 민감정보가 노출되는 보안 허점이 있었습니다.",
        solution:
          "다운로드 시점에 Canvas 합성본을 이미지화한 PDF로 재조립해 원본 텍스트 레이어 자체를 제거. 화면 미리보기 단계에서는 인터랙티브한 Canvas 마스킹을 유지하되, 다운로드 결과물에서는 텍스트 추출 자체가 불가능하도록 두 단계로 분리해 시각적 마스킹과 데이터 마스킹을 모두 확보했습니다.",
      },
    ],
    results: [
      "해당 레포 순환 참조 131건 중 60건(46%) 제거, 잔여 71건은 점진적 마이그레이션 계획. 신규 발생은 eslint-plugin-boundaries로 차단",
      "LCP 30% 개선 (Lighthouse 기준), FCP 등 Lighthouse 보조 지표 전반 개선",
      "디자인 시스템 구축으로 컴포넌트 재사용성 향상",
      "PDF 마스킹 자체 구현으로 다운로드 후 텍스트 추출 우회까지 차단",
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
      "@testing-library/react",
      "Jest",
      "Cypress",
    ],
    keyRole: "커머스 서비스 고도화 및 신규 기능 개발, 어드민 개발",
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
          "모바일 퍼스트 기준으로 반응형 레이아웃을 전면 재구성. 주요 CTA 버튼 영역 확대, 스크롤 구조 개선 후 모바일 구매 전환율 약 25% 증가.",
      },
      {
        issue: "핵심 비즈니스 로직 런타임 버그 반복 발생",
        cause:
          "쿠폰 적용, 가격 합산 등 복잡한 계산 로직에 테스트가 없어 edge case를 배포 후 운영 중에 발견했습니다.",
        solution:
          "Jest로 핵심 비즈니스 로직 단위 테스트를 작성하고 Cypress로 구매 플로우 전체를 E2E 커버. 핵심 비즈니스 로직 관련 운영 버그 20% 감소.",
      },
    ],
    results: [
      "TTFB 약 30% 개선 (Lighthouse Diagnostics 기준)",
      "모바일 구매 전환율 약 25% 증가 (GA 기준)",
      "핵심 비즈니스 로직 관련 운영 버그 20% 감소 (Sentry 에러 발생 건수 기준)",
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
          "저사양 기기의 렌더링 병목 원인을 전체 데이터 일괄 렌더링 구조로 진단. PoC로 가상화 효과를 검증한 뒤 Virtual Scroll을 도입해 뷰포트에 보이는 항목만 DOM에 유지하도록 최적화하고, 스크롤 시에도 DOM 노드 수를 일정 범위 내로 제한해 렌더링 비용을 통제. → Lighthouse Performance Score 70 → 90 개선.",
      },
      {
        title: "TypeScript 도입과 점진적 마이그레이션",
        description:
          "런타임 타입 오류가 반복 발생하는 근본 원인이 JS의 동적 타입임을 파악, 컴파일 타임 검증으로 앞당기기 위해 TypeScript 도입을 팀에 제안. 기존 JS와 공존하는 점진적 마이그레이션을 주도해 신규 파일은 TS로, 기존 파일은 변경 시점에 순차 전환하며 any 타입을 최소화했습니다.",
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
          "Virtual Scroll 적용으로 뷰포트 기준 렌더링 범위를 고정. Lighthouse Performance Score 70 → 90 개선.",
      },
      {
        issue: "런타임 타입 오류로 운영 중 버그 반복",
        cause:
          "JS 동적 타입 특성상 API 응답 구조 변경이나 잘못된 프로퍼티 접근이 컴파일 시점에 잡히지 않아 배포 후에야 발견됐습니다.",
        solution:
          "TypeScript 마이그레이션으로 컴파일 타임 타입 검증 체계 구축. any 타입 최소화로 타입 안전성을 확보해 런타임 타입 관련 버그 30% 감소(GitHub Issues · Monday 이슈 트래킹 기준).",
      },
    ],
    results: [
      "Lighthouse Performance Score 70 → 90 개선",
      "런타임 타입 관련 버그 30% 감소 (GitHub Issues · Monday 이슈 트래킹 기준)",
    ],
    tags: ["IoT", "데이터 시각화", "성능 최적화", "TypeScript"],
  },
];
