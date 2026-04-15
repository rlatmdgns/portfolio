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
            문제의 핵심을 정의하고, 기술로 비즈니스의 병목을 해결하는
            프론트엔드 개발자 김승훈입니다.
          </p>
          {/* 가치관 + 문제 인식 */}
          <p>
            단순히 주어진 기능을 구현하는 것에서 멈추지 않고,
            &apos;왜 이걸 만드는가&apos;를 먼저 묻습니다. 창업을 통해 기획자·세일즈·개발자
            역할을 동시에 경험하면서, 비즈니스 맥락 없는 개발은 방향을 잃기
            쉽다는 걸 직접 체감했습니다.
          </p>
          {/* 실적 요약 */}
          <p>
            리드 개발자로서 순환 참조 46% 제거, LCP 30% 개선을 주도했고,
            창업한 B2B SaaS에서는 고객사 조기 퇴사율 15% 감소라는 실제
            비즈니스 성과를 만들었습니다.
          </p>
          {/* 미래 방향 */}
          <p>
            기술적 깊이와 제품 감각을 함께 가진 개발자로서, 성장하는 팀에서
            아키텍처와 개발 문화를 함께 만들어가고 싶습니다.
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
