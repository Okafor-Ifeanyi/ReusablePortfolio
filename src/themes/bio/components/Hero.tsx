"use client";

import { useRef, useState, useEffect } from "react";
import { truncate } from "../../../lib/utils";
import { useTheme } from "./theme.provider";
import type { BioHero } from "../index";

const E  = "cubic-bezier(0.16,1,0.3,1)";
const SP = "cubic-bezier(0.34,1.4,0.64,1)";

export default function Hero({
  hero,
  yearsExperience,
  projectsCount,
}: {
  hero: BioHero;
  yearsExperience: number;
  projectsCount: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [loaded,  setLoaded]  = useState(false);
  const isDark = theme === "dark";

  useEffect(() => { setLoaded(true); }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  function handleMouseMove(e: React.MouseEvent) {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  const lineColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const spotColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";

  const headline  = hero?.headline  ?? "Fullstack Developer";
  const bio       = hero?.bio       ?? null;
  const ctaLabel  = hero?.ctaLabel  ?? "View Projects";
  const ctaHref   = hero?.ctaUrl    ?? "#projects";

  const fullBio = bio ? truncate(bio, 100) : null;
  const [typedBio, setTypedBio] = useState("");

  useEffect(() => {
    if (!fullBio) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedBio(fullBio.slice(0, i));
      if (i >= fullBio.length) clearInterval(interval);
    }, 55);
    return () => clearInterval(interval);
  }, [fullBio]);

  const anim = (name: string, dur: string, delay: string, easing = E) =>
    loaded ? `${name} ${dur} ${easing} ${delay} both` : "none";

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-300"
      style={{ "--mx": "-500px", "--my": "-500px" } as React.CSSProperties}
    >
      <div className="relative max-w-360 mx-6 sm:mx-10 lg:mx-15">
        {/* Interactive grid */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: [
              hovered
                ? `radial-gradient(circle 220px at var(--mx) var(--my), ${spotColor} 0%, transparent 100%)`
                : null,
              `linear-gradient(${lineColor} 1px, transparent 1px)`,
              `linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`,
            ]
              .filter(Boolean)
              .join(", "),
            backgroundSize: hovered
              ? "auto, 76px 76px, 76px 76px"
              : "76px 76px, 76px 76px",
            backgroundPosition: "0 0",
            maskImage:       "linear-gradient(to bottom left, black 0%, rgba(0,0,0,0.2) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom left, black 0%, rgba(0,0,0,0.2) 100%)",
          }}
        />

        {/* Main hero content */}
        <div className="flex flex-col items-center pt-20 sm:pt-28 lg:pt-37.5 pb-16 sm:pb-24 lg:pb-30 gap-8 sm:gap-12 lg:gap-15">
          <div className="flex flex-col items-center gap-2.5 w-full">
            {/* Brackets open like a curtain; headline rises between them */}
            <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-3 w-full">
              <span
                className="text-light-muted dark:text-dark-muted leading-none shrink-0"
                style={{
                  fontSize: "clamp(30px, 8vw, 61px)", lineHeight: 1, fontWeight: 400,
                  opacity: loaded ? undefined : 0,
                  animation: anim("bio-slide-left", "0.9s", "0.05s"),
                }}
              >
                &lt;
              </span>
              <h1
                className="text-light-text dark:text-dark-text tracking-design text-center whitespace-normal sm:whitespace-nowrap min-w-0"
                style={{
                  fontSize: "clamp(30px, 8vw, 61px)", lineHeight: "130%", fontWeight: 400,
                  opacity: loaded ? undefined : 0,
                  animation: anim("bio-fade-up", "0.9s", "0.18s"),
                }}
              >
                {headline}
              </h1>
              <span
                className="text-light-muted dark:text-dark-muted leading-none shrink-0"
                style={{
                  fontSize: "clamp(30px, 8vw, 61px)", lineHeight: 1, fontWeight: 400,
                  opacity: loaded ? undefined : 0,
                  animation: anim("bio-slide-right", "0.9s", "0.05s"),
                }}
              >
                /&gt;
              </span>
            </div>
          </div>

          {/* CTA — springs into place after the headline settles */}
          <a
            href={ctaHref}
            onClick={(e) => {
              if (ctaHref === "#projects") {
                e.preventDefault();
                scrollToProjects();
              }
            }}
            className="inline-flex items-center justify-center rounded-sm tracking-design transition-all duration-200
              bg-light-text text-light-bg hover:bg-light-text/90
              dark:bg-accent-light dark:text-dark-bg dark:hover:bg-accent-light/90
              font-power"
            style={{
              width: "clamp(180px, 55vw, 228px)",
              height: "clamp(56px, 15vw, 76px)",
              fontSize: "clamp(20px, 5vw, 28px)",
              opacity: loaded ? undefined : 0,
              animation: anim("bio-scale-up", "0.8s", "0.38s", SP),
            }}
          >
            {ctaLabel}
          </a>
        </div>

        {/* Stats row — rises as a unit after everything above is settled */}
        <div
          className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between px-0 sm:px-8 lg:px-18 gap-8 sm:gap-6 items-center sm:min-h-32"
          style={{
            opacity: loaded ? undefined : 0,
            animation: anim("bio-fade-up", "0.8s", "0.55s"),
          }}
        >
          {fullBio && (
            <p
              className="text-light-text dark:text-dark-text tracking-design max-w-78.5 text-center sm:text-left"
              style={{ fontSize: "14px", lineHeight: "150%" }}
            >
              {typedBio}
              <span className="animate-pulse">|</span>
            </p>
          )}

          {(yearsExperience > 0 || projectsCount > 0) && (
            <div className="flex flex-row items-center">
              {yearsExperience > 0 && (
                <div className="flex flex-col items-center px-3 sm:px-4 py-3 min-w-24 sm:min-w-30">
                  <span
                    className="text-light-text dark:text-dark-text tracking-design font-power"
                    style={{ fontSize: "36px", lineHeight: "100%" }}
                  >
                    {yearsExperience}+
                  </span>
                  <span
                    className="text-light-text dark:text-dark-text tracking-design"
                    style={{ fontSize: "16px", lineHeight: "100%" }}
                  >
                    Experience
                  </span>
                </div>
              )}
              {projectsCount > 0 && (
                <div className="flex flex-col items-center px-3 sm:px-4 py-3 min-w-24 sm:min-w-30">
                  <span
                    className="text-light-text dark:text-dark-text tracking-design font-power"
                    style={{ fontSize: "36px", lineHeight: "100%" }}
                  >
                    {projectsCount}+
                  </span>
                  <span
                    className="text-light-text dark:text-dark-text tracking-design"
                    style={{ fontSize: "16px", lineHeight: "100%" }}
                  >
                    Projects
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Scroll indicator — last to appear, draws the eye downward */}
        <div
          className="hidden sm:flex justify-center pb-8"
          style={{
            opacity: loaded ? undefined : 0,
            animation: anim("bio-fade-in", "0.7s", "0.75s"),
          }}
        >
          <button
            onClick={scrollToProjects}
            aria-label="Scroll to projects"
            className="text-light-text dark:text-dark-text hover:opacity-60 transition-opacity animate-bounce"
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.5" />
              <path d="M16 21L24 29L32 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
