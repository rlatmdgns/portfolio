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
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Frontend Developer
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            김승훈
          </h1>
        </div>
        <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300 max-w-xl">
          문제의 핵심을 정의하고, 기술로 비즈니스의 병목을 해결하는
          프론트엔드 개발자입니다. B2B SaaS 창업 경험을 통해 사용자 인터뷰,
          가설 검증, 문제 정의까지 제품의 시작부터 성장 과정 전체를 경험하며
          &apos;무엇을 왜 만드는지&apos;에 대한 관점을 체득했습니다.
        </p>
        <div className="flex gap-4 pt-1">
          <a
            href="https://github.com/rlatmdgns"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            GitHub →
          </a>
          <a
            href="https://www.linkedin.com/in/승훈-김-161407216/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            LinkedIn →
          </a>
          <a
            href="mailto:rlatmdgns3076@gmail.com"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            Email →
          </a>
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          Skills
        </h2>
        <div className="space-y-3">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex gap-4 items-start">
              <span className="text-sm text-neutral-400 dark:text-neutral-500 w-36 shrink-0 pt-0.5">
                {category}
              </span>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="text-sm px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
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
          <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
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
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                      {project.name}
                    </span>
                    <span className="text-xs text-neutral-400 dark:text-neutral-500">
                      {project.company}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                    {project.description}
                  </p>
                </div>
                <span className="text-sm text-neutral-400 dark:text-neutral-500 shrink-0 pt-0.5 group-hover:translate-x-0.5 transition-transform">
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
