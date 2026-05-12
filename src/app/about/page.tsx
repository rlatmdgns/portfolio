export const metadata = {
  title: "소개 | 김승훈",
};

const experiences = [
  {
    company: "리프웍스",
    period: "2024.12 ~ 2026.03",
    role: "본인 포함 공동창업 3인 / 프론트엔드 전담",
    note: "공동창업",
  },
  {
    company: "풀랩",
    period: "2023.04 ~ 2024.12",
    role: "프론트엔드 챕터 리드",
    note: "서비스 종료",
  },
  {
    company: "하비풀",
    period: "2022.05 ~ 2023.02",
    role: "커머스팀 팀원",
    note: "서비스 종료",
  },
  {
    company: "아이오크롭스",
    period: "2021.07 ~ 2022.04",
    role: "프로덕트팀 팀원",
    note: "",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="space-y-2">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Frontend Developer
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          김승훈
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-300">
          마주한 문제를 그냥 넘기지 않는 프론트엔드 개발자
        </p>
      </div>

      {/* Bio */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          About
        </h2>
        <div className="space-y-4 text-sm text-neutral-600 dark:text-neutral-200 leading-relaxed">
          {/* 한 줄 요약 */}
          <p className="font-semibold text-neutral-800 dark:text-neutral-100">
            5년차 프론트엔드 개발자. 공동창업 · 프론트엔드 챕터 리드 경험.
          </p>
          {/* 가치관 */}
          <p>
            제품을 만들고 운영한 경험으로 요구사항 뒤의 맥락을 읽고
            비즈니스 성과로 연결합니다.
          </p>
          {/* 실적 요약 - ATS */}
          <p>
            ATS SaaS에서는 챕터 리드로 Turborepo 모노레포 전환·FSD 도입을
            주도해 한 레포의 순환 참조 46%를 제거했고, SPA → Next.js
            마이그레이션으로 LCP를 30% 개선했습니다(Lighthouse 기준).
            검증·팀 내 공유로 기술 도입을 합의 기반으로 이끌었습니다.
          </p>
          {/* 실적 요약 - 헬로보드 */}
          <p>
            이후 공동창업한 온보딩 서비스에서는 프론트엔드 전담으로 자동화
            플로우를 설계·구현해, 인사담당자가 코드 없이 온보딩 프로세스를
            운영할 수 있는 환경을 만들었습니다. 개발 외에 제품 기획·세일즈에도
            함께 참여해 유료 고객사 확보와 첫 매출을 만든 경험이 있습니다.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          Experience
        </h2>
        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="flex gap-8 py-4 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
            >
              <div className="w-36 shrink-0">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {exp.period}
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {exp.company}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  {exp.role}
                </p>
                {exp.note && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {exp.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          Contact
        </h2>
        <div className="space-y-2">
          <div className="flex gap-4 items-center">
            <span className="text-sm text-neutral-400 dark:text-neutral-500 w-20">
              Email
            </span>
            <a
              href="mailto:rlatmdgns3076@gmail.com"
              className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              rlatmdgns3076@gmail.com
            </a>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-neutral-400 dark:text-neutral-500 w-20">
              GitHub
            </span>
            <a
              href="https://github.com/rlatmdgns"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              github.com/rlatmdgns
            </a>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-neutral-400 dark:text-neutral-500 w-20">
              LinkedIn
            </span>
            <a
              href="https://www.linkedin.com/in/승훈-김-161407216/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              linkedin.com/in/승훈-김
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
