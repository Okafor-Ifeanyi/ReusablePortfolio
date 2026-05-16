"use client";
import SectionHeader from "./SectionHeader";
import { BORDER } from "./ServicesGrid";
import type { LotaProject } from "../index";

const FALLBACK_BG = ["#43388D", "#073E1E", "#1A1A2E", "#0E021D", "#0A1628", "#1A0A0A"];

export default function BrandingProjects({ projects, username }: { projects: LotaProject[]; username: string }) {
  const items = projects.length > 0 ? projects : [];

  return (
    <section id="branding" className="w-full">
      <SectionHeader title="Branding Projects" viewAllHref={`/${username}/projects?type=branding`} />

      {items.length === 0 ? (
        <p className="text-lota-muted text-sm py-4">No branding projects added yet.</p>
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
                  <img src="/images/Logo-2.svg" alt="" aria-hidden className="absolute top-3 right-3 w-8 h-8 object-contain opacity-80" />
                  <div className="absolute bottom-0 left-0 p-4 flex flex-col gap-1">
                    <span className="text-white font-medium text-[24px] leading-none">{project.title}</span>
                    {project.subtitle && <span className="text-white font-light text-[12px] leading-[150%]">{project.subtitle}</span>}
                  </div>
                </div>
                {/* CTA */}
                <div className="flex justify-start px-3">
                  <span className="rounded-full p-px" style={{ background: BORDER }}>
                    <a href={project.url ?? "#"} className="block px-6 py-[5px] rounded-full text-cream text-[18px] bg-black hover:bg-white/10 transition-colors">
                      View Casestudy
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
