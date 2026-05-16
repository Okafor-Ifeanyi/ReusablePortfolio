"use client";
import SectionHeader from "./SectionHeader";
import { BORDER } from "./ServicesGrid";
import type { LotaProject } from "../index";

export default function Pitchdecks({ projects }: { projects: LotaProject[] }) {
  const items = projects.length > 0 ? projects : [];

  return (
    <section id="pitchdecks" className="w-full">
      <SectionHeader title="Pitchdecks" viewAllHref="#" />

      {items.length === 0 ? (
        <p className="text-lota-muted text-sm py-4">No pitchdecks added yet.</p>
      ) : (
        <div className="flex gap-5 w-full">
          {items.map((deck) => (
            <div key={deck.id} className="flex flex-col flex-1 gap-4 p-[15px] rounded-xl" style={{ background: "rgba(255,250,239,0.1)" }}>
              <div className="w-full rounded-lg bg-white/10 overflow-hidden flex items-center justify-center relative" style={{ height: "170.88px" }}>
                {deck.coverImageUrl ? (
                  <img src={deck.coverImageUrl} alt={deck.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-lota-muted text-sm text-center px-2">{deck.title}</span>
                )}
              </div>
              <div className="flex justify-end px-4">
                <span className="rounded-full p-px" style={{ background: BORDER }}>
                  <a href={deck.url ?? "#"} className="block px-6 py-[5px] rounded-full text-cream text-[18px] bg-black hover:bg-white/10 transition-colors">
                    View Pitch
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
