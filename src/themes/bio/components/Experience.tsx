"use client";

import { useRef, useEffect, useState } from "react";
import type { BioExperience } from "../index";

export default function Experience({ experiences }: { experiences: BioExperience[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
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
      <div className="max-w-360 mx-auto px-15">
        <h2
          className="text-light-text dark:text-dark-text mb-8"
          style={{ fontSize: "48px", lineHeight: "58px", fontWeight: 400 }}
        >
          &#123;Experience&#125;
        </h2>

        <div className="flex flex-col px-4">
          {experiences.map((exp, index) => {
            const delay = `${index * 0.15}s`;
            const lineDelay = `${index * 0.15 + 0.2}s`;

            return (
              <div key={exp.id} className="flex flex-row gap-6">

                {/* Dot + connector */}
                <div className="flex flex-col items-center" style={{ width: "15px", flexShrink: 0 }}>
                  {/* Dot */}
                  <div
                    className="rounded-full bg-light-muted dark:bg-dark-muted shrink-0"
                    style={{
                      width: "15px",
                      height: "15px",
                      marginTop: "7px",
                      opacity: visible ? 1 : 0,
                      transform: visible ? "scale(1)" : "scale(0)",
                      transition: `opacity 0.3s ease ${delay}, transform 0.3s ease ${delay}`,
                    }}
                  />
                  {/* Connector line */}
                  {index < experiences.length - 1 && (
                    <div
                      className="flex-1 bg-light-text/25 dark:bg-dark-text/25"
                      style={{
                        width: "1px",
                        transformOrigin: "top",
                        transform: visible ? "scaleY(1)" : "scaleY(0)",
                        transition: `transform 0.5s ease ${lineDelay}`,
                      }}
                    />
                  )}
                </div>

                {/* Row content */}
                <div
                  className="flex flex-row justify-between items-start gap-4 w-full"
                  style={{
                    paddingBottom: index < experiences.length - 1 ? "40px" : "0",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-8px)",
                    transition: `opacity 0.4s ease ${delay}, transform 0.4s ease ${delay}`,
                  }}
                >
                  <span
                    className="text-light-text dark:text-dark-text font-power"
                    style={{ fontSize: "clamp(16px, 2vw, 24px)", lineHeight: "29px", fontWeight: 400 }}
                  >
                    {exp.company} — {exp.role}
                  </span>
                  <span
                    className="text-light-text dark:text-dark-text font-power whitespace-nowrap"
                    style={{ fontSize: "clamp(14px, 1.8vw, 24px)", lineHeight: "29px", fontWeight: 400 }}
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
