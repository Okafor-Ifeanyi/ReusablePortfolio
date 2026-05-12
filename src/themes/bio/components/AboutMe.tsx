"use client";

import type { BioHero } from "../index";

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
  const name = fullName ?? "Portfolio";
  const bio = hero?.bio ?? "null";
  const avatarUrl = hero?.avatarUrl ?? "null";
  const quote = hero?.subheadline ?? "null";

  return (
    <section
      id="about"
      className="bg-light-bg dark:bg-dark-bg transition-colors duration-300 py-16"
    >
      <div className="max-w-360 mx-auto px-15">
        <h2
          className="text-light-text dark:text-dark-text tracking-design mb-8"
          style={{ fontSize: "48px", lineHeight: "150%", fontWeight: 400 }}
        >
          &#123;About Me&#125;
        </h2>

        <div className="relative w-full px-4" style={{ minHeight: "633px" }}>
          <div className="flex flex-col lg:flex-row gap-8 w-full">
            {/* Left column */}
            <div className="flex flex-col gap-6" style={{ width: "316px", flexShrink: 0 }}>
              {/* Profile photo */}
              <div
                className="relative rounded-lg overflow-hidden bg-light-muted/20 dark:bg-dark-muted/20"
                style={{ width: "316px", height: "321px" }}
              >
                {avatarUrl && (
                  <img
                    src={avatarUrl}
                    alt={name}
                    className="w-full h-full object-cover grayscale"
                  />
                )}
                {!avatarUrl && (
                  <div className="absolute inset-0 flex items-center justify-center text-light-muted dark:text-dark-muted text-sm">
                    <span>Profile Photo</span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex flex-row justify-center items-center gap-4 h-1/2">
                {yearsExperience > 0 && (
                  <div className="flex flex-col">
                    <span
                      className="text-light-text dark:text-dark-text font-power tracking-design"
                      style={{ fontSize: "65px", lineHeight: "150%", marginBottom: "-18px" }}
                    >
                      {yearsExperience}+
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
                      {projectsCount}+
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
              {/* Pull quote */}
              {quote && (
                <div className="flex items-center justify-center " style={{ minHeight: "321px" }}>
                  <blockquote
                    className="w-3/4 text-light-text dark:text-dark-text font-power"
                    style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: "150%", fontWeight: 400 }}
                  >
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                </div>
              )}

              {/* Bio card */}
              {bio && (
                <div
                  className="rounded-lg border border-light-text dark:border-dark-border/30 bg-light-bg dark:bg-dark-bg p-8 flex flex-col gap-4"
                  style={{ minHeight: "260px" }}
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
