"use client";

import { useRef, useEffect, useState } from "react";
import type { BioExperience } from "../index";

const E = "cubic-bezier(0.16,1,0.3,1)";

export default function Experience({ experiences }: { experiences: BioExperience[] }) {
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

  if (experiences.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="bg-light-bg dark:bg-dark-bg transition-colors duration-300 py-16"
    >
      <div className="max-w-360 mx-auto px-6 sm:px-10 lg:px-15">
        <h2
          className="text-light-text dark:text-dark-text mb-6 sm:mb-8"
          style={{
            fontSize: "clamp(28px, 7vw, 48px)", lineHeight: "130%", fontWeight: 400,
            opacity: visible ? undefined : 0,
            animation: visible ? `bio-fade-up 0.7s ${E} 0s both` : "none",
          }}
        >
          &#123;Experience&#125;
        </h2>

        <div className="flex flex-col px-0 sm:px-4">
          {experiences.map((exp, index) => {
            const dotDelay  = `${0.1 + index * 0.14}s`;
            const lineDelay = `${0.2 + index * 0.14}s`;
            const rowDelay  = `${0.1 + index * 0.14}s`;

            return (
              <div key={exp.id} className="flex flex-row gap-4 sm:gap-6">

                {/* Timeline spine */}
                <div className="flex flex-col items-center" style={{ width: "15px", flexShrink: 0 }}>
                  <div
                    className="rounded-full bg-light-muted dark:bg-dark-muted shrink-0"
                    style={{
                      width: "15px", height: "15px", marginTop: "7px",
                      opacity: visible ? 1 : 0,
                      transform: visible ? "scale(1)" : "scale(0)",
                      transition: `opacity 0.35s ${E} ${dotDelay}, transform 0.35s ${E} ${dotDelay}`,
                    }}
                  />
                  {index < experiences.length - 1 && (
                    <div
                      className="flex-1 bg-light-text/25 dark:bg-dark-text/25"
                      style={{
                        width: "1px",
                        transformOrigin: "top",
                        transform: visible ? "scaleY(1)" : "scaleY(0)",
                        transition: `transform 0.6s ${E} ${lineDelay}`,
                      }}
                    />
                  )}
                </div>

                {/* Row */}
                <div
                  className="flex flex-col sm:flex-row sm:justify-between items-start gap-1 sm:gap-4 w-full min-w-0"
                  style={{
                    paddingBottom: index < experiences.length - 1 ? "32px" : "0",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-12px)",
                    transition: `opacity 0.5s ${E} ${rowDelay}, transform 0.5s ${E} ${rowDelay}`,
                  }}
                >
                  <span
                    className="text-light-text dark:text-dark-text font-power min-w-0"
                    style={{ fontSize: "clamp(16px, 2vw, 24px)", lineHeight: "140%", fontWeight: 400 }}
                  >
                    {exp.company} — {exp.role}
                  </span>
                  <span
                    className="text-light-muted dark:text-dark-muted sm:text-light-text sm:dark:text-dark-text font-power whitespace-nowrap shrink-0"
                    style={{ fontSize: "clamp(14px, 1.8vw, 24px)", lineHeight: "140%", fontWeight: 400 }}
                  >
                    {exp.period}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
