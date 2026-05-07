"use client";

import { useState } from "react";

interface Project {
  name: string;
  description: string;
  tags: string[];
  link?: string;
  duration?: string;
  type?: string;
}

const projects: Project[] = [
  {
    name: "Ventree",
    description:
      "A simple online tool that helps shop owners and attendants record sales, track goods, and know their profit or loss — all in one place.",
    tags: ["Tailwind", "Typescript", "Redux", "Tanstack", "React", "EsLit"],
    duration: "Nov '25 – Dec '25 (1 Month)",
    type: "Collaboration",
    link: "#",
  },
  {
    name: "Cartle",
    description:
      "An e-commerce SaaS platform with real-time chat, background job processing, Redis caching, and Paystack subscription integration.",
    tags: ["NestJs", "BullMQ", "Prisma", "Typescript", "Redis", "Socket.IO", "React", "PostgreSQL"],
    duration: "Mar '24 – Present",
    type: "Lead Engineer",
    link: "#",
  },
  {
    name: "Pivot",
    description:
      "A platform for rebuilding Africa through digital transformation initiatives and community engagement.",
    tags: ["NestJs", "BullMQ", "Prisma", "Typescript", "Socket.IO", "PostgreSQL"],
    duration: "2024",
    type: "Collaboration",
    link: "#",
  },
  {
    name: "IDey",
    description:
      "A two-sided construction services marketplace featuring real-time chat, background job processing, and biometric identity verification.",
    tags: ["NestJs", "BullMQ", "Prisma", "Typescript", "Socket.IO", "PostgreSQL"],
    duration: "Aug '25 – Present",
    type: "Solo",
    link: "#",
  },
  {
    name: "Furniture App",
    description:
      "A furniture e-commerce platform with real-time inventory management and order processing.",
    tags: ["NestJs", "Typescript", "Socket.IO", "PostgreSQL"],
    duration: "2024",
    type: "Solo",
    link: "#",
  },
];

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

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="group border-b border-light-border/40 dark:border-dark-border/40 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Collapsed row */}
      <div className="flex flex-row items-center justify-between py-8 px-4 gap-4">
        {/* Project name */}
        <h3
          className="text-light-text dark:text-dark-text group-hover:opacity-70 transition-opacity duration-200"
          style={{ fontSize: "36px", lineHeight: "43px", fontWeight: 400 }}
        >
          {project.name}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap justify-end items-center gap-2.5">
          {project.tags.map((tag) => (
            <TechTag key={tag} label={tag} />
          ))}
        </div>
      </div>

      {/* Expanded panel */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          expanded ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-8 px-4 pb-10">
          {/* Preview placeholder (replace with actual screenshot) */}
          <div className="w-full md:w-105 aspect-video bg-light-text/5 dark:bg-dark-text/5 rounded-lg flex items-center justify-center shrink-0 border border-light-border/20 dark:border-dark-border/20">
            <span className="text-light-muted dark:text-dark-muted text-sm">
              {project.name} preview
            </span>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4 justify-center flex-1">
            <p
              className="text-light-muted dark:text-dark-muted"
              style={{ fontSize: "20px", lineHeight: "150%", fontWeight: 300 }}
            >
              {project.description}
            </p>

            {/* Tags repeated */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <TechTag key={tag} label={tag} />
              ))}
            </div>

            {/* Meta info */}
            <div className="flex flex-col gap-2">
              {project.duration && (
                <div className="flex items-center gap-2 text-light-muted dark:text-dark-muted" style={{ fontSize: "16px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {project.duration}
                </div>
              )}
              {project.type && (
                <div className="flex items-center gap-2 text-light-muted dark:text-dark-muted" style={{ fontSize: "16px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  {project.type}
                </div>
              )}
            </div>

            {/* CTA */}
            {project.link && (
              <div className="flex justify-end mt-2">
                <a
                  href={project.link}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center justify-center px-6 py-3 bg-light-text dark:bg-dark-text text-light-bg dark:text-dark-bg rounded-sm font-power transition-opacity hover:opacity-80"
                  style={{ fontSize: "18px" }}
                >
                  Live Product
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-light-bg dark:bg-dark-bg transition-colors duration-300 py-16"
    >
      <div className="max-w-360 mx-auto px-15">
        {/* Section header */}
        <div className="mb-8">
          <h2
            className="text-light-text dark:text-dark-text tracking-design"
            style={{ fontSize: "48px", lineHeight: "150%", fontWeight: 400 }}
          >
            &#123;Projects&#125;
          </h2>
        </div>

        {/* Project list */}
        <div className="flex flex-col px-4">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}