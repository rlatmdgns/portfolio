import Link from "next/link";
import { projects } from "@/data/projects";

const skills = {
  Frontend: ["React", "Next.js", "TypeScript"],
  "State Management": ["TanStack Query", "Zustand"],
  Styling: ["vanilla-extract", "Tailwind CSS", "styled-components"],
  "Infra & DX": [
    "Turborepo",
    "Storybook",
    "Cypress",
    "Jest",
    "Sentry",
    "GitHub Actions",
  ],
  etc: ["NextAuth", "next-intl", "PDF.js", "Tiptap", "Highcharts"],
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
        </div>
        <div className="space-y-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-200 max-w-xl">
          <p>
            마주한 문제를 그냥 넘기지 않는 프론트엔드 개발자입니다.
            단순 기능 구현에 그치지 않고, 코드가 만들어내는 사용자 경험과
            시스템의 지속 가능성까지 고민합니다.
          </p>
          <p>
            모노레포 전환으로 순환 참조 46% 제거, LCP 30% 개선을 이뤄냈고,
            창업한 서비스에서 온보딩 플로우를 직접 개발해
            고객사 조기 퇴사율 15% 감소라는 비즈니스 성과로 연결했습니다.
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
