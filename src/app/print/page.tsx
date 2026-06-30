import { projects } from "@/data/projects";
import PrintButton from "@/components/PrintButton";

export const metadata = {
  title: "포트폴리오 인쇄 | 김승훈",
  robots: { index: false, follow: false },
};

const experiences = [
  {
    company: "리프웍스",
    period: "2024.12 ~ 2026.05",
    role: "본인 포함 공동창업 3인 / 프론트엔드 전담",
    note: "공동창업",
  },
  {
    company: "풀랩",
    period: "2023.04 ~ 2024.12",
    role: "프론트엔드 챕터 리드",
    note: "회사 폐업",
  },
  {
    company: "하비풀",
    period: "2022.05 ~ 2023.02",
    role: "커머스팀 팀원",
    note: "회사 폐업",
  },
  {
    company: "아이오크롭스",
    period: "2021.07 ~ 2022.04",
    role: "프로덕트팀 팀원",
    note: "",
  },
];

export default function PrintPage() {
  return (
    <div className="print-root space-y-12">
      {/* 인쇄 버튼 — 화면 전용 */}
      <div className="no-print flex items-center justify-between">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          브라우저 인쇄 대화상자에서 &quot;PDF로 저장&quot;을 선택하면 한 장의 PDF로 출력됩니다.
        </p>
        <PrintButton />
      </div>

      {/* 표지 */}
      <header className="space-y-3">
        <p className="text-sm text-neutral-500">Frontend Developer · Portfolio</p>
        <h1 className="text-3xl font-bold tracking-tight">김승훈</h1>
        <p className="text-sm text-neutral-600">
          문제를 구조와 사용자 경험으로 해결해 온 프론트엔드 개발자
        </p>
        <dl className="pt-4 grid grid-cols-[80px_1fr] gap-y-1 text-sm">
          <dt className="text-neutral-500">Email</dt>
          <dd>rlatmdgns3076@gmail.com</dd>
          <dt className="text-neutral-500">GitHub</dt>
          <dd>github.com/rlatmdgns</dd>
          <dt className="text-neutral-500">LinkedIn</dt>
          <dd>linkedin.com/in/승훈-김</dd>
        </dl>
      </header>

      {/* About */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
          About
        </h2>
        <div className="space-y-3 text-sm text-neutral-700 leading-relaxed">
          <p>
            제품을 만들고 운영한 경험으로 기술 의사결정이 비즈니스 성과로
            이어지도록 합니다.
          </p>
          <p>
            ATS SaaS에서는 챕터 리드로 Turborepo 모노레포 전환·FSD 도입을 주도해 한
            레포의 순환 참조 46%(131건 중 60건)를 제거했고, SPA → Next.js 마이그레이션과
            초기 로딩 최적화로 Lighthouse 기준 LCP를 약 30% 단축했습니다. 검증·팀 내 공유를 거쳐 기술 도입을
            합의 기반으로 이끌었습니다.
          </p>
          <p>
            이후 공동창업한 온보딩 서비스에서는 프론트엔드 전담으로 자동화 플로우를
            설계·구현해, 인사담당자가 노코드로 온보딩 프로세스를 운영할 수 있는 환경을
            만들었습니다. 개발 외에 제품 기획·세일즈에도 함께 참여해 유료 고객사 확보와
            첫 매출을 만든 경험이 있습니다.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Experience
        </h2>
        <div>
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="flex gap-6 py-3 border-b border-neutral-200 last:border-0 break-inside-avoid"
            >
              <div className="w-36 shrink-0 text-xs text-neutral-500">
                {exp.period}
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-neutral-900">
                  {exp.company}
                </p>
                <p className="text-sm text-neutral-700">{exp.role}</p>
                {exp.note && (
                  <p className="text-xs text-neutral-500">{exp.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      {projects.map((project) => (
        <article
          key={project.slug}
          className="space-y-6"
        >
          <header className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold tracking-tight">{project.name}</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                {project.company}
              </span>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {project.description}
            </p>
            <p className="text-xs text-neutral-500">
              {project.period} · {project.role}
            </p>
            <p className="text-sm text-neutral-700">
              <span className="text-neutral-500">담당 </span>
              {project.keyRole}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 bg-neutral-50 text-neutral-700 border border-neutral-200 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <PrintSection title="기술 스택">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-700 border border-neutral-200 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </PrintSection>

          <PrintSection title="대표 문제 해결 사례">
            <div className="space-y-3">
              {project.caseStudies.map((item) => (
                <div key={item.title} className="space-y-1 break-inside-avoid">
                  <h4 className="text-sm font-semibold text-neutral-900">
                    {item.title}
                  </h4>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {item.problem}
                  </p>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    <span className="text-neutral-500">접근 </span>
                    {item.approach}
                  </p>
                  <p className="text-sm font-medium text-neutral-900 leading-relaxed">
                    <span className="text-neutral-500 font-normal">성과 </span>
                    {item.evidence}
                  </p>
                </div>
              ))}
            </div>
          </PrintSection>
        </article>
      ))}
    </div>
  );
}

function PrintSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2 break-inside-avoid">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
        {title}
      </h3>
      {children}
    </section>
  );
}
