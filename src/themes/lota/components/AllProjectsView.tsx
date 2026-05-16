"use client";

import Link from "next/link";
import Navbar from "./Navbar";
import { BORDER } from "./ServicesGrid";
import type { LotaProject } from "../data";

function Tag({ label }: { label: string }) {
  return (
    <span className="px-2 py-1 border border-lota-muted/50 rounded-[2px] text-lota-muted text-[13px] font-light tracking-wider whitespace-nowrap">
      {label}
    </span>
  );
}

interface AllProjectsViewProps {
  type: "branding" | "webapps";
  projects: LotaProject[];
  backHref: string;
}

export default function AllProjectsView({ type, projects, backHref }: AllProjectsViewProps) {
  const title = type === "branding" ? "Branding Projects" : "WebApps";

  return (
    <main data-theme="lota" className="min-h-screen " style={{ background: "#0F0F0F", color: "var(--color-cream)" }}>
      {/* Sticky navbar */}
      <div className="sticky top-0 z-50 w-full px-20" style={{ background: "#0F0F0F" }}>
        <Navbar />
      </div>

      <div className="w-full mx-auto px-20 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-white font-medium text-[40px] leading-[150%]">{title}</h1>
          <Link
            href={backHref}
            className="flex items-center gap-2 text-lota-muted text-[16px] hover:text-cream transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </Link>
        </div>

        {/* Project rows */}
        <div className="flex flex-col">
          {projects.map((project, i) => (
            <div
              key={i}
              className="flex gap-8 py-8"
              style={{ borderBottom: "1px solid rgba(100,100,100,0.4)" }}
            >
              {/* Preview */}
              <div
                className="shrink-0 rounded-lg overflow-hidden relative"
                style={{ width: "468px", height: "334px", background: project.bg }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(179.85deg, rgba(15,15,15,0) 20%, #000 100%)" }}
                />
                <div className="absolute bottom-0 left-0 p-5">
                  <span className="text-white font-medium text-[20px]">{project.name}</span>
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col flex-1 gap-4 py-1">
                <h3 className="text-cream font-medium text-[24px] leading-[29px]">{project.name}</h3>
                <p className="text-off-white text-[15px] leading-[160%]">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => <Tag key={tag} label={tag} />)}
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-cream text-[15px]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#646464" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" strokeLinecap="round" />
                    </svg>
                    {project.duration}
                  </div>
                  <div className="flex items-center gap-2 text-cream text-[15px]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#646464" strokeWidth="1.5">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
                    </svg>
                    {project.projectType}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-4 mt-auto justify-end">
                  {type === "webapps" && project.designHref && (
                    <a href={project.designHref} className="text-cream text-[17px] hover:opacity-70 transition-opacity">
                      Design
                    </a>
                  )}
                  <span className="rounded-full p-px" style={{ background: BORDER }}>
                    <a
                      href={type === "webapps" ? project.liveHref : project.caseStudyHref}
                      className="block px-6 py-[5px] rounded-full text-cream text-[17px] bg-black hover:bg-white/10 transition-colors"
                    >
                      {type === "webapps" ? "Live" : "View Casestudy"}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
