"use client";

import { useState } from "react";
import { truncate } from "@/lib/utils";
import type { BioProject } from "../index";

function TechTag({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-2 py-1 border border-light-text dark:border-dark-text rounded-xs text-light-text dark:text-dark-text whitespace-nowrap"
      style={{ fontSize: "14px", letterSpacing: "0.05em", lineHeight: "150%" }}
    >
      {label}
    </span>
  );
}

function ProjectCard({ project }: { project: BioProject }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="group border-b border-light-border/40 dark:border-dark-border/40 cursor-pointer transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Collapsed row */}
      <div className="flex flex-row items-center justify-between py-8 px-4 gap-4">
        <div>
          <h3
            className="text-light-text dark:text-dark-text group-hover:opacity-70 transition-opacity duration-200"
            style={{ fontSize: "36px", lineHeight: "43px", fontWeight: 400 }}
          >
            {project.title}
          </h3>
          {project.subtitle && (
            <p
              className="text-light-muted dark:text-dark-muted mt-1"
              style={{ fontSize: "16px" }}
            >
              {truncate(project.subtitle, 50)}
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-end items-center gap-2.5">
          {(expanded ? project.skills : project.skills.slice(0, 7)).map(
            (skill) => (
              <TechTag key={skill} label={skill} />
            ),
          )}
          {!expanded && project.skills.length > 7 && (
            <span
              className="inline-flex items-center px-2 py-1 text-light-muted dark:text-dark-muted whitespace-nowrap"
              style={{
                fontSize: "14px",
                letterSpacing: "0.05em",
                lineHeight: "150%",
              }}
            >
              +{project.skills.length - 7} more
            </span>
          )}
        </div>
      </div>

      {/* Expanded panel — grid-rows animates to actual content height, no floating gaps */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 px-4 pt-2 pb-12">
          {/* Cover image or placeholder */}
          <div className="relative w-full md:w-105 aspect-video rounded-lg shrink-0 overflow-hidden border border-light-border/20 dark:border-dark-border/20">
            {project.coverImageUrl ? (
              <>
                {/* Blurred fill — CSS background covers every pixel including corners */}
                <div
                  aria-hidden
                  className="absolute inset-0 scale-110"
                  style={{
                    backgroundImage: `url(${project.coverImageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(20px)",
                    opacity: 0.6,
                  }}
                />
                {/* Foreground — fully visible, never exceeds the box */}
                <img
                  src={project.coverImageUrl}
                  alt={project.title}
                  className="relative z-10 w-full h-full object-contain"
                />
              </>
            ) : (
              <div className="w-full h-full bg-light-text/5 dark:bg-dark-text/5 flex items-center justify-center">
                <span className="text-light-muted dark:text-dark-muted text-sm">
                  {project.title} preview
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4 justify-center flex-1">
            {project.description && (
              <p
                className="text-light-muted dark:text-dark-muted"
                style={{
                  fontSize: "20px",
                  lineHeight: "150%",
                  fontWeight: 300,
                }}
              >
                {project.description}
              </p>
            )}

            {project.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <TechTag key={skill} label={skill} />
                ))}
              </div>
            )}

            {/* Meta */}
            <div className="flex flex-col gap-2">
              {project.duration && (
                <div
                  className="flex items-center gap-2 text-light-muted dark:text-dark-muted"
                  style={{ fontSize: "16px" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {project.duration}
                </div>
              )}
              {project.projectType && (
                <div
                  className="flex items-center gap-2 text-light-muted dark:text-dark-muted"
                  style={{ fontSize: "16px" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  {project.projectType}
                </div>
              )}
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 mt-2">
              {project.url && (
                <a
                  href={project.url}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-light-text dark:bg-dark-text text-light-bg dark:text-dark-bg rounded-sm font-power transition-opacity hover:opacity-80"
                  style={{ fontSize: "18px" }}
                >
                  Live Product
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-light-text dark:border-dark-text text-light-text dark:text-dark-text rounded-sm font-power transition-opacity hover:opacity-70"
                  style={{ fontSize: "18px" }}
                >
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects }: { projects: BioProject[] }) {
  if (projects.length === 0) return null;

  return (
    <section
      id="projects"
      className="bg-light-bg dark:bg-dark-bg transition-colors duration-300 py-16"
    >
      <div className="max-w-360 mx-auto px-15">
        <div className="mb-8">
          <h2
            className="text-light-text dark:text-dark-text tracking-design"
            style={{ fontSize: "48px", lineHeight: "150%", fontWeight: 400 }}
          >
            &#123;Projects&#125;
          </h2>
        </div>

        <div className="flex flex-col px-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
