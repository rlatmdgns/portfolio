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
    note: "서비스 종료",
  },
  {
    company: "하비풀",
    period: "2022.05 ~ 2023.02",
    role: "커머스팀 팀원",
    note: "서비스 종료",
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
      {/* Hero */}
      <div className="space-y-2">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Frontend Developer
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          김승훈
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-300">
          마주한 문제를 그냥 넘기지 않는 프론트엔드 개발자
        </p>
      </div>

      {/* Bio */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          About
        </h2>
        <div className="space-y-4 text-sm text-neutral-600 dark:text-neutral-200 leading-relaxed">
          {/* 브랜딩 도입 */}
          <p>
            마주한 문제를 그냥 넘기지 않는 프론트엔드 개발자 김승훈입니다.
          </p>
          {/* 가치관 + 문제인식 */}
          <p>
            단순 기능 구현에 그치지 않고, 코드가 만들어내는 사용자 경험과
            시스템의 지속 가능성까지 고민합니다.
            제품을 직접 만들고 운영한 경험 덕분에 요구사항 뒤의 맥락을 읽고
            개발에 반영하는 관점을 갖게 됐습니다.
          </p>
          {/* 실적 요약 */}
          <p>
            Next.js 기반 모노레포 전환을 주도하며 순환 참조 46% 제거,
            Lighthouse 기준 LCP 30% 개선을 이뤄냈습니다.
            창업한 서비스에서 온보딩 플로우를 직접 개발해
            고객사 조기 퇴사율 15% 감소라는 비즈니스 성과로 연결했고,
            챕터 리드로서 PoC 검증과 팀 내 공유를 통해
            기술 도입을 합의 기반으로 이끌었습니다.
          </p>
          {/* 미래 방향 */}
          <p>
            기술과 협업을 통해 사용자와 비즈니스 모두에 임팩트를 주는
            제품을 만드는 데 집중하겠습니다.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          Experience
        </h2>
        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="flex gap-8 py-4 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
            >
              <div className="w-36 shrink-0">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {exp.period}
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {exp.company}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  {exp.role}
                </p>
                {exp.note && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
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
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
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
