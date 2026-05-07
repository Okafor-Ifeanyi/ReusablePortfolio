"use client";
import SectionHeader from "./SectionHeader";

const graphics = [
  { label: "Design 1", href: "#" },
  { label: "Design 2", href: "#" },
  { label: "Design 3", href: "#" },
  { label: "Design 4", href: "#" },
];

const bgColors = ["#3B2A10", "#2A1A00", "#1A0A20", "#0A1A2A"];

export default function Graphics() {
  return (
    <section id="graphics" className="w-full">
      <SectionHeader title="Graphics" viewAllHref="#" />

      <div className="flex flex-wrap gap-5 w-full">
        {graphics.map((item, i) => (
          <div
            key={i}
            className="flex flex-col flex-1 gap-4 p-[15px] rounded-xl min-w-[200px]"
            style={{ background: "rgba(255,250,239,0.1)" }}
          >
            {/* Graphic thumbnail */}
            <div
              className="w-full rounded-lg flex items-center justify-center"
              style={{ height: "237.9px", background: bgColors[i] }}
            >
              <span className="text-white/30 text-sm">{item.label}</span>
            </div>

            {/* CTA */}
            <div className="flex justify-start px-4">
              <a
                href={item.href}
                className="px-6 py-[5px] rounded-full text-cream text-[18px] hover:bg-white/10 transition-colors"
                style={{ filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))" }}
              >
                View Design
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
