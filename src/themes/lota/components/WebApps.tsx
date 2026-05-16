"use client";
import SectionHeader from "./SectionHeader";
import { BORDER } from "./ServicesGrid";
import type { LotaProject } from "../index";

const FALLBACK_BG = ["#073E1E", "#0A1628", "#1A0A0A", "#0E021D", "#0A0A0A", "#1A1A2E"];

export default function WebApps({ projects, username }: { projects: LotaProject[]; username: string }) {
  const items = projects.length > 0 ? projects : [];

  return (
    <section id="webapps" className="w-full">
      <SectionHeader title="Web Apps" viewAllHref={`/${username}/projects?type=webapps`} />

      {items.length === 0 ? (
        <p className="text-lota-muted text-sm py-4">No web apps added yet.</p>
      ) : (
        <div className="flex gap-7 w-full">
          {items.map((project, i) => (
            <div key={project.id} className="flex flex-col flex-1 rounded-xl p-px shrink-0" style={{ minWidth: 0 }}>
              <div className="flex flex-col gap-4 p-[15px] rounded-xl bg-[#FFFAEF1A] h-full">
                {/* Image area */}
                <div
                  className="w-full rounded-lg overflow-hidden relative shrink-0"
                  style={{ height: "197px", background: FALLBACK_BG[i % FALLBACK_BG.length] }}
                >
                  {project.coverImageUrl && (
                    <img src={project.coverImageUrl} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(179.85deg, rgba(15,15,15,0) 20.08%, #000 99.87%)" }} />
                  <div className="absolute bottom-0 left-0 p-4 flex flex-col gap-1">
                    <span className="text-white font-medium text-[24px] leading-none">{project.title}</span>
                    {project.subtitle && <span className="text-white font-light text-[12px] leading-[150%]">{project.subtitle}</span>}
                  </div>
                </div>
                {/* CTAs */}
                <div className="flex justify-start items-center gap-3 px-3">
                  {project.repoUrl && (
                    <a href={project.repoUrl} className="text-cream text-[18px] hover:opacity-70 transition-opacity">Design</a>
                  )}
                  <span className="rounded-full p-px" style={{ background: BORDER }}>
                    <a href={project.url ?? "#"} className="block px-15 py-[5px] rounded-full text-cream text-[18px] bg-black hover:bg-white/10 transition-colors">
                      Live
                    </a>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
