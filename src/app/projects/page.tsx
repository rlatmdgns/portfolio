import Link from "next/link";
import { projects } from "@/data/projects";

export const metadata = {
  title: "프로젝트 | 김승훈",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">프로젝트</h1>
        <p className="text-neutral-500 dark:text-neutral-300 text-sm">
          각 프로젝트에서 마주한 문제와 기술적 선택, 그리고 성과를 기록합니다.
        </p>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="block group"
          >
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-5 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {project.name}
                    </h2>
                    <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-400 px-2 py-0.5 rounded-full">
                      {project.company}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-300">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded border border-neutral-200 dark:border-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-neutral-400 group-hover:translate-x-0.5 transition-transform shrink-0">
                  →
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {project.period} · {project.role}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
