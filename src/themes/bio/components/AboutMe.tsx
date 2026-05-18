"use client";

import { useRef, useEffect, useState } from "react";
import type { BioHero } from "../index";

const E = "cubic-bezier(0.16,1,0.3,1)";

function useInView(threshold = 0.12) {
  const ref  = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active || target === 0) return;
    const steps   = Math.round(duration / 16);
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

export default function AboutMe({
  hero,
  fullName,
  yearsExperience,
  projectsCount,
}: {
  hero: BioHero;
  fullName: string | null;
  yearsExperience: number;
  projectsCount: number;
}) {
  const { ref, visible } = useInView();

  const yearsCount    = useCountUp(yearsExperience,    visible);
  const projectsCount2 = useCountUp(projectsCount, visible);

  const name      = fullName        ?? "Portfolio";
  const bio       = hero?.bio       ?? null;
  const avatarUrl = hero?.avatarUrl ?? null;
  const quote     = hero?.subheadline ?? null;
  const words     = quote ? quote.split(" ") : [];

  const a = (name: string, dur: string, delay: string) =>
    visible ? `${name} ${dur} ${E} ${delay} both` : "none";

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="about"
      className="bg-light-bg dark:bg-dark-bg transition-colors duration-300 py-16"
    >
      <div className="max-w-360 mx-auto px-15">
        <h2
          className="text-light-text dark:text-dark-text tracking-design mb-8"
          style={{
            fontSize: "48px", lineHeight: "150%", fontWeight: 400,
            opacity: visible ? undefined : 0,
            animation: a("bio-fade-up", "0.7s", "0s"),
          }}
        >
          &#123;About Me&#125;
        </h2>

        <div className="relative w-full px-4" style={{ minHeight: "633px" }}>
          <div className="flex flex-col lg:flex-row gap-8 w-full">

            {/* Left column */}
            <div className="flex flex-col gap-6" style={{ width: "316px", flexShrink: 0 }}>
              {/* Photo — wipes in from left like a curtain pull */}
              <div
                className="relative rounded-lg overflow-hidden bg-light-muted/20 dark:bg-dark-muted/20"
                style={{
                  width: "316px", height: "321px",
                  opacity: visible ? undefined : 0,
                  animation: a("bio-clip-wipe", "1.1s", "0.1s"),
                }}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={name}
                    className="w-full h-full object-cover grayscale"
                    style={{ objectPosition: "center top" }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-light-muted dark:text-dark-muted text-sm">
                    <span>Profile Photo</span>
                  </div>
                )}
              </div>

              {/* Stats — count up after photo reveals */}
              <div
                className="flex flex-row justify-center items-center gap-4 h-1/2"
                style={{
                  opacity: visible ? undefined : 0,
                  animation: a("bio-fade-up", "0.7s", "0.45s"),
                }}
              >
                {yearsExperience > 0 && (
                  <div className="flex flex-col">
                    <span
                      className="text-light-text dark:text-dark-text font-power tracking-design"
                      style={{ fontSize: "65px", lineHeight: "150%", marginBottom: "-18px" }}
                    >
                      {yearsCount}+
                    </span>
                    <span
                      className="text-light-muted dark:text-dark-muted tracking-design"
                      style={{ fontSize: "27px", lineHeight: "150%" }}
                    >
                      Years
                    </span>
                  </div>
                )}
                {projectsCount > 0 && (
                  <div className="flex flex-col ml-4">
                    <span
                      className="text-light-text dark:text-dark-text font-power tracking-design"
                      style={{ fontSize: "65px", lineHeight: "150%", marginBottom: "-18px" }}
                    >
                      {projectsCount2}+
                    </span>
                    <span
                      className="text-light-muted dark:text-dark-muted tracking-design"
                      style={{ fontSize: "27px", lineHeight: "150%" }}
                    >
                      Projects
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col justify-center flex-1 gap-6">
              {/* Pull quote — words cascade in one by one */}
              {words.length > 0 && (
                <div className="flex items-center justify-center" style={{ minHeight: "321px" }}>
                  <blockquote
                    className="w-3/4 text-light-text dark:text-dark-text font-power"
                    style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: "150%", fontWeight: 400 }}
                  >
                    &ldquo;
                    {words.map((word, i) => (
                      <span
                        key={i}
                        className="inline-block"
                        style={{
                          opacity: visible ? undefined : 0,
                          animation: visible
                            ? `bio-fade-up 0.5s ${E} ${0.2 + i * 0.045}s both`
                            : "none",
                        }}
                      >
                        {word}&nbsp;
                      </span>
                    ))}
                    &rdquo;
                  </blockquote>
                </div>
              )}

              {/* Bio card — scales up after the quote lands */}
              {bio && (
                <div
                  className="rounded-lg border border-light-text dark:border-dark-border/30 bg-light-bg dark:bg-dark-bg p-8 flex flex-col gap-4"
                  style={{
                    minHeight: "260px",
                    opacity: visible ? undefined : 0,
                    animation: a("bio-scale-up", "0.9s", `${0.25 + words.length * 0.045}s`),
                  }}
                >
                  <p
                    className="text-light-muted dark:text-dark-muted font-power flex-1"
                    style={{ fontSize: "20px", lineHeight: "150%", fontWeight: 400 }}
                  >
                    {bio}
                  </p>
                  <div className="flex justify-end">
                    <cite
                      className="text-light-text dark:text-dark-text not-italic font-power tracking-design"
                      style={{ fontSize: "22px", lineHeight: "150%" }}
                    >
                      -{name}
                    </cite>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
