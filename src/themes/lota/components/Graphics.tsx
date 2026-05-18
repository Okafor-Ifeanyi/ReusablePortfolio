"use client";
import SectionHeader from "./SectionHeader";
import { BORDER } from "./ServicesGrid";
import type { LotaProject } from "../index";

const FALLBACK_BG = ["#3B2A10", "#2A1A00", "#1A0A20", "#0A1A2A"];

export default function Graphics({ projects }: { projects: LotaProject[] }) {
  const items = projects.length > 0 ? projects : [];

  return (
    <section id="graphics" className="w-full">
      <SectionHeader title="Graphics" viewAllHref="#" />

      {items.length === 0 ? (
        <p className="text-lota-muted text-sm py-4">No graphics added yet.</p>
      ) : (
        <div className="flex flex-wrap gap-5 w-full">
          {items.map((item, i) => (
            <div key={item.id} className="flex flex-col flex-1 gap-4 p-[15px] rounded-xl min-w-[200px]" style={{ background: "rgba(255,250,239,0.1)" }}>
              <div
                className="w-full rounded-lg overflow-hidden flex items-center justify-center"
                style={{ height: "237.9px", background: FALLBACK_BG[i % FALLBACK_BG.length] }}
              >
                {item.coverImageUrl ? (
                  <img src={item.coverImageUrl} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white/30 text-sm">{item.title}</span>
                )}
              </div>
              <div className="flex justify-center px-4">
                <span className="rounded-full p-px" style={{ background: BORDER }}>
                  <a href={item.url ?? "#"} className="block px-6 py-2.5 rounded-full text-cream text-[18px] bg-black hover:bg-white/10 transition-colors">
                    View Design
                  </a>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
