"use client";

import type { BioSkill } from "../index";

function SkillsPanel() {
  return (
    <>
      <div className="absolute inset-0 bg-[#05050D] border border-[#818186] rounded-lg dark:hidden" />
      <div className="absolute inset-0 bg-[#E1DFFF] border border-[#292933] rounded-lg hidden dark:block" />
      <span
        className="relative z-10 text-[#FCFCFF] dark:text-[#05050D] font-power text-center select-none"
        style={{
          fontSize: "clamp(36px, 5vw, 72px)",
          lineHeight: "130%",
          letterSpacing: "2px",
          transform: "rotate(-90deg)",
          whiteSpace: "nowrap",
          fontWeight: 400,
        }}
      >
        Lead Engineer
      </span>
      <div
        className="absolute inset-0 pointer-events-none opacity-15 rounded-lg"
        style={{
          background:
            "linear-gradient(242.36deg, rgba(217,217,217,0) 83.3%, rgba(115,115,115,0.5) 90.08%)",
        }}
      />
    </>
  );
}

export default function Skills({ skills }: { skills: BioSkill[] }) {
  if (skills.length === 0) return null;

  // Group by category; uncategorised skills go under "Other"
  const grouped = skills.reduce<Record<string, string[]>>((acc, s) => {
    const cat = s.category ?? "Other";
    (acc[cat] ??= []).push(s.name);
    return acc;
  }, {});

  return (
    <section
      id="skills"
      className="bg-light-bg dark:bg-dark-bg transition-colors duration-300 py-16"
    >
      <div className="max-w-360 mx-auto px-15">
        <h2
          className="text-light-text dark:text-dark-text mb-8"
          style={{ fontSize: "48px", lineHeight: "58px", fontWeight: 400 }}
        >
          &#123;Skills&#125;
        </h2>

        <div className="flex flex-col px-4 lg:flex-row items-stretch gap-12 w-full">
          {/* Decorative vertical panel */}
          <div
            className="relative flex items-center justify-center rounded-lg overflow-hidden shrink-0 w-1/4"
            style={{ minHeight: "600px" }}
          >
            <SkillsPanel />
          </div>

          {/* Skill categories */}
          <div className="flex flex-col gap-6 flex-1 py-2">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="flex flex-col gap-2">
                <h3
                  className="text-light-text dark:text-dark-text"
                  style={{ fontSize: "24px", lineHeight: "34px", letterSpacing: "0.48px", fontWeight: 400 }}
                >
                  {category}:
                </h3>
                <p
                  className="text-light-muted dark:text-dark-muted"
                  style={{ fontSize: "20px", lineHeight: "35px", letterSpacing: "0.432px", fontWeight: 400 }}
                >
                  {items.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
