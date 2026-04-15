import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} | 김승훈`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="space-y-12">
      {/* Back */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      >
        ← 프로젝트 목록
      </Link>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
          <span className="text-sm text-neutral-400 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-500 px-2.5 py-1 rounded-full">
            {project.company}
          </span>
        </div>
        <p className="text-neutral-500 dark:text-neutral-400">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 pt-1">
          {project.period} · {project.role}
        </p>
      </div>

      {/* Tech Stack */}
      <Section title="기술 스택">
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-sm px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </Section>

      {/* Key Role */}
      <Section title="핵심 역할">
        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {project.keyRole}
        </p>
      </Section>

      {/* Issues */}
      <Section title="문제 상황">
        <ul className="space-y-2">
          {project.issues.map((issue, i) => (
            <li key={i} className="flex gap-3 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              <span className="text-neutral-300 dark:text-neutral-600 shrink-0 mt-0.5">—</span>
              <span>{issue}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Reasons */}
      <Section title="기술 선택 이유">
        <ul className="space-y-2">
          {project.reasons.map((reason, i) => (
            <li key={i} className="flex gap-3 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              <span className="text-neutral-300 dark:text-neutral-600 shrink-0 mt-0.5">—</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Solutions */}
      <Section title="해결 방법">
        <ul className="space-y-2">
          {project.solutions.map((solution, i) => (
            <li key={i} className="flex gap-3 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              <span className="text-neutral-300 dark:text-neutral-600 shrink-0 mt-0.5">—</span>
              <span>{solution}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Results */}
      <Section title="성과">
        <ul className="space-y-2">
          {project.results.map((result, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span className="text-emerald-500 shrink-0 mt-0.5 font-bold">↑</span>
              <span className="text-neutral-700 dark:text-neutral-200 font-medium">{result}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        {title}
      </h2>
      {children}
    </section>
  );
}
