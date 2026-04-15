export const metadata = {
  title: "소개 | 김승훈",
};

const experiences = [
  {
    company: "리프웍스",
    period: "2024.12 ~ 2026.03",
    role: "공동창업 / 프론트엔드 전담",
    note: "B2B SaaS 창업",
  },
  {
    company: "풀랩",
    period: "2023.04 ~ 2024.12",
    role: "프론트엔드 챕터 리드",
    note: "경영악화로 인한 폐업",
  },
  {
    company: "하비풀",
    period: "2022.05 ~ 2023.02",
    role: "커머스팀 팀원",
    note: "경영악화로 인한 폐업",
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
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">소개</h1>
      </div>

      {/* Bio */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          About
        </h2>
        <div className="space-y-4 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {/* 브랜딩 도입 */}
          <p>
            사용자와 비즈니스를 함께 생각하는 프론트엔드 개발자 김승훈입니다.
          </p>
          {/* 가치관 + 문제 인식 */}
          <p>
            기능을 구현할 때 사용자 경험과 지속 가능성을 함께 고민하려 노력합니다.
            창업을 통해 기획·세일즈·개발을 동시에 경험하면서,
            &apos;왜 만드는가&apos;를 먼저 이해하는 것이 더 좋은 제품으로 이어진다는 걸
            배웠습니다.
          </p>
          {/* 실적 요약 */}
          <p>
            팀과 함께 순환 참조 46% 제거, LCP 30% 개선에 기여했고,
            창업한 B2B SaaS에서는 고객사 조기 퇴사율 15% 감소라는
            비즈니스 성과로 이어질 수 있었습니다.
          </p>
          {/* 미래 방향 */}
          <p>
            앞으로도 기술과 협업을 통해 팀의 방향을 함께 고민하고,
            더 나은 제품을 만드는 데 기여하고 싶습니다.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          Experience
        </h2>
        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="flex gap-8 py-4 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
            >
              <div className="w-36 shrink-0">
                <p className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed">
                  {exp.period}
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {exp.company}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {exp.role}
                </p>
                {exp.note && (
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">
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
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
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
