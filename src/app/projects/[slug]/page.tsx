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
      <Section title="아키텍처">
        <div className="space-y-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-200 leading-relaxed">
            {project.architecture.description}
          </p>
          <MermaidDiagram chart={project.architecture.diagram} />
        </div>
      </Section>

      {/* Key Features */}
      <Section title="핵심 기능">
        <div className="space-y-5">
          {project.keyFeatures.map((feature, i) => (
            <div key={i} className="space-y-1.5">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-200 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Technical Decisions */}
      <Section title="기술적 의사결정">
        <div className="space-y-6">
          {project.decisions.map((decision, i) => (
            <div
              key={i}
              className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 space-y-3"
            >
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {decision.title}
              </h3>
              <div className="space-y-2">
                <div className="flex gap-3 text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400 shrink-0 w-10">문제</span>
                  <p className="text-neutral-600 dark:text-neutral-200 leading-relaxed">{decision.problem}</p>
                </div>
                <div className="flex gap-3 text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400 shrink-0 w-10">선택</span>
                  <p className="text-neutral-600 dark:text-neutral-200 leading-relaxed">{decision.choice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Troubleshooting */}
      <Section title="트러블슈팅">
        <div className="space-y-6">
          {project.troubleshooting.map((item, i) => (
            <div key={i} className="space-y-3">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {item.issue}
              </h3>
              <div className="space-y-2 pl-4 border-l-2 border-neutral-200 dark:border-neutral-600">
                <div className="flex gap-3 text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400 shrink-0 w-10">원인</span>
                  <p className="text-neutral-600 dark:text-neutral-200 leading-relaxed">{item.cause}</p>
                </div>
                <div className="flex gap-3 text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400 shrink-0 w-10">해결</span>
                  <p className="text-neutral-600 dark:text-neutral-200 leading-relaxed">{item.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
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
    <section className="space-y-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
        {title}
      </h2>
      {children}
    </section>
  );
}
