"use client";
import SectionHeader from "./SectionHeader";

const pitchdecks = [
  { name: "Otigba Media House", image: "otigba", href: "#" },
  { name: "Simbi AI Study Companion", image: "simbi", href: "#" },
  { name: "Autoparkz", image: "autoparkz", href: "#" },
];

export default function Pitchdecks() {
  return (
    <section id="pitchdecks" className="w-full">
      <SectionHeader title="Pitchdecks" viewAllHref="#" />

      <div className="flex gap-5 w-full">
        {pitchdecks.map((deck) => (
          <div
            key={deck.name}
            className="flex flex-col flex-1 gap-4 p-[15px] rounded-xl"
            style={{ background: "rgba(255,250,239,0.1)" }}
          >
            {/* Deck thumbnail */}
            <div
              className="w-full rounded-lg bg-white/10 flex items-center justify-center"
              style={{ height: "170.88px" }}
            >
              <span className="text-muted text-sm text-center px-2">{deck.name}</span>
            </div>

            {/* CTA */}
            <div className="flex justify-start px-4">
              <a
                href={deck.href}
                className="px-6 py-[5px] rounded-full text-cream text-[18px] hover:bg-white/10 transition-colors"
                style={{ filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))" }}
              >
                View Pitch
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
