"use client";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
}

const experiences: ExperienceItem[] = [
  {
    role: "Fullstack Engineer (Contract)",
    company: "IDEY",
    period: "Aug 2025 – Present",
  },
  {
    role: "Senior Backend Engineer (Lead)",
    company: "Cartle Tech",
    period: "Mar 2024 – Present",
  },
  {
    role: "Frontend Engineer (Intern)",
    company: "Genesys Learnable",
    period: "Dec 2024 – Dec 2025",
  },
  {
    role: "Frontend Engineer (Intern)",
    company: "Genesys Learnable",
    period: "Dec 2023 – Jul 2024",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="bg-light-bg dark:bg-dark-bg transition-colors duration-300 py-16"
    >
      <div className="max-w-360 mx-auto px-15">
        {/* Section header */}
        <h2
          className="text-light-text dark:text-dark-text mb-8"
          style={{ fontSize: "48px", lineHeight: "58px", fontWeight: 400 }}
        >
          &#123;Experience&#125;
        </h2>

        {/* Timeline */}
        <div className="flex flex-row items-start gap-4 px-4">
          {/* Vertical timeline track */}
          <div className="flex flex-col items-center pt-0.5" style={{ width: "24px", flexShrink: 0 }}>
            {experiences.map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Dot */}
                <div
                  className="rounded-full bg-light-muted dark:bg-dark-muted shrink-0"
                  style={{ width: "15px", height: "15px" }}
                />
                {/* Line between dots (skip after last) */}
                {index < experiences.length - 1 && (
                  <div
                    className="bg-light-text dark:bg-dark-text/50"
                    style={{ width: "1px", height: "48px" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Experience items */}
          <div className="flex flex-col flex-1 gap-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="flex flex-row justify-between items-center gap-4 w-full"
                style={{ minHeight: "29px" }}
              >
                {/* Role & Company */}
                <span
                  className="text-light-text dark:text-dark-text font-power"
                  style={{ fontSize: "clamp(16px, 2vw, 24px)", lineHeight: "29px", fontWeight: 400 }}
                >
                  {exp.company} — {exp.role}
                </span>

                {/* Period */}
                <span
                  className="text-light-text dark:text-dark-text font-power whitespace-nowrap"
                  style={{ fontSize: "clamp(14px, 1.8vw, 24px)", lineHeight: "29px", fontWeight: 400 }}
                >
                  {exp.period}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}