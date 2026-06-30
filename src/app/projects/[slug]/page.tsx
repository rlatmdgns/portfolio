import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import MermaidDiagram from "@/components/MermaidDiagram";

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
  const showArchitecture = slug === "helloboard" || slug === "stead";

  return (
    <div className="space-y-16">
      {/* Back */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      >
        ← 프로젝트 목록
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
          <span className="text-sm text-neutral-500 bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-400 px-2.5 py-1 rounded-full">
            {project.company}
          </span>
        </div>
        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded border border-neutral-200 dark:border-neutral-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {project.period} · {project.role}
        </p>
        <div className="flex gap-3 text-sm pt-1">
          <span className="text-neutral-500 dark:text-neutral-400 shrink-0">
            담당
          </span>
          <p className="text-neutral-700 dark:text-neutral-200">
            {project.keyRole}
          </p>
        </div>
      </div>

      {/* Preview Image */}
      <div className="rounded-xl overflow-hidden border border-neutral-100 dark:border-neutral-800">
        <Image
          src={project.image}
          alt={`${project.name} 스크린샷`}
          width={1200}
          height={800}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Tech Stack */}
      <Section title="기술 스택">
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-sm px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </Section>

      {/* Architecture */}
      {showArchitecture && (
        <Section title="아키텍처">
          <div className="space-y-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-200 leading-relaxed">
              {project.architecture.description}
            </p>
            <MermaidDiagram chart={project.architecture.diagram} />
          </div>
        </Section>
      )}

      <Section title="대표 문제 해결 사례">
        <div className="space-y-8">
          {project.caseStudies.map((item, i) => (
            <article
              key={item.title}
              className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-5 space-y-4"
            >
              <div className="flex items-start gap-3">
                <span className="text-xs text-neutral-400 dark:text-neutral-500 pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {item.title}
                </h3>
              </div>
              <div className="space-y-3 pl-7">
                <CaseRow label="문제·고민" value={item.problem} />
                <CaseRow label="접근·판단" value={item.approach} />
                <CaseRow label="해결" value={item.implementation} />
                <CaseRow label="성과·검증" value={item.evidence} highlight />
              </div>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}

function CaseRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="grid gap-1.5 text-sm sm:grid-cols-[88px_1fr] sm:gap-4">
      <span className="text-neutral-500 dark:text-neutral-400">{label}</span>
      <p
        className={`leading-relaxed ${
          highlight
            ? "font-medium text-neutral-900 dark:text-neutral-100"
            : "text-neutral-600 dark:text-neutral-200"
        }`}
      >
        {value}
      </p>
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
    <section className="space-y-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
        {title}
      </h2>
      {children}
    </section>
  );
}
