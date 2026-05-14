import Link from "next/link";
import { projects } from "@/data/projects";

const skills = {
  Frontend: ["React", "Next.js", "TypeScript"],
  "State Management": ["TanStack Query", "Zustand"],
  Styling: ["vanilla-extract", "Tailwind CSS"],
  "Infra & DX": [
    "Turborepo",
    "Storybook",
    "Cypress",
    "Jest",
    "Sentry",
    "GitHub Actions",
  ],
  Libraries: ["NextAuth", "next-intl", "PDF.js", "Highcharts"],
};

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm text-neutral-500 dark:text-neutral-300">
            Frontend Developer
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            김승훈
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-300">
            마주한 문제를 그냥 넘기지 않는 프론트엔드 개발자
          </p>
        </div>
        <div className="space-y-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-200 max-w-xl">
          <p>
            제품을 만들고 운영한 경험으로 기술 의사결정이 비즈니스 성과로
            이어지도록 합니다.
          </p>
          <p>
            ATS SaaS에서는 챕터 리드로 Turborepo 모노레포 전환·FSD 도입을
            주도해 한 레포의 순환 참조 46%(131건 중 60건)를 제거했고,
            SPA → Next.js 마이그레이션으로 LCP를 30% 개선했습니다(Lighthouse 기준).
            검증·팀 내 공유를 거쳐 기술 도입을 합의 기반으로 이끌었습니다.
          </p>
          <p>
            이후 공동창업한 온보딩 서비스에서는 프론트엔드 전담으로 자동화
            플로우를 설계·구현해, 인사담당자가 노코드로 온보딩 프로세스를
            운영할 수 있는 환경을 만들었습니다. 개발 외에 제품 기획·세일즈에도
            함께 참여해 유료 고객사 확보와 첫 매출을 만든 경험이 있습니다.
          </p>
        </div>
        <div className="flex gap-4 pt-1">
          <a
            href="https://github.com/rlatmdgns"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            GitHub →
          </a>
          <a
            href="https://www.linkedin.com/in/승훈-김-161407216/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            LinkedIn →
          </a>
          <a
            href="mailto:rlatmdgns3076@gmail.com"
            className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            Email →
          </a>
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          Skills
        </h2>
        <div className="space-y-3">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex gap-4 items-start">
              <span className="text-sm text-neutral-600 dark:text-neutral-300 w-36 shrink-0 pt-0.5">
                {category}
              </span>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="text-sm px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Projects
          </h2>
          <Link
            href="/projects"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="space-y-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block group"
            >
              <div className="flex items-start justify-between gap-4 py-3 border-b border-neutral-100 dark:border-neutral-800 group-hover:border-neutral-300 dark:group-hover:border-neutral-600 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                      {project.name}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {project.company}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-300 line-clamp-1">
                    {project.description}
                  </p>
                </div>
                <span className="text-sm text-neutral-400 dark:text-neutral-400 shrink-0 pt-0.5 group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
