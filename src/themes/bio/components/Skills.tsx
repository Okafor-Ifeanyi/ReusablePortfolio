"use client";

import { useRef, useEffect, useState } from "react";
import type { BioSkill } from "../index";

const E = "cubic-bezier(0.16,1,0.3,1)";

function SkillsPanel({ visible }: { visible: boolean }) {
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
          opacity: visible ? undefined : 0,
          animation: visible ? `bio-fade-in 0.9s ${E} 0.3s both` : "none",
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
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  if (skills.length === 0) return null;

  const grouped = skills.reduce<Record<string, string[]>>((acc, s) => {
    const cat = s.category ?? "Other";
    (acc[cat] ??= []).push(s.name);
    return acc;
  }, {});

  const categories = Object.entries(grouped);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="bg-light-bg dark:bg-dark-bg transition-colors duration-300 py-16"
    >
      <div className="max-w-360 mx-auto px-15">
        <h2
          className="text-light-text dark:text-dark-text mb-8"
          style={{
            fontSize: "48px", lineHeight: "58px", fontWeight: 400,
            opacity: visible ? undefined : 0,
            animation: visible ? `bio-fade-up 0.7s ${E} 0s both` : "none",
          }}
        >
          &#123;Skills&#125;
        </h2>

        <div className="flex flex-col lg:flex-row items-stretch gap-12 w-full">
          {/* Decorative panel */}
          <div
            className="relative flex items-center justify-center rounded-lg overflow-hidden shrink-0 w-1/4"
            style={{
              minHeight: "600px",
              opacity: visible ? undefined : 0,
              animation: visible ? `bio-scale-up 1.0s ${E} 0.08s both` : "none",
            }}
          >
            <SkillsPanel visible={visible} />
          </div>

          {/* Categories — stagger down */}
          <div className="flex flex-col gap-6 flex-1 py-2">
            {categories.map(([category, items], i) => (
              <div
                key={category}
                className="flex flex-col gap-2"
                style={{
                  opacity: visible ? undefined : 0,
                  animation: visible
                    ? `bio-fade-up 0.6s ${E} ${0.15 + i * 0.09}s both`
                    : "none",
                }}
              >
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
