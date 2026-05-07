"use client";

const services = [
  {
    id: "branding",
    label: "Branding Projects",
    emoji: "🎨",
    href: "#branding",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: "webapps",
    label: "Web Apps",
    emoji: "💻",
    href: "#webapps",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: "meet",
    label: "Meet Lota",
    emoji: "👋",
    href: "#about",
    colSpan: 2,
    rowSpan: 1,
    wide: true,
  },
  {
    id: "pitchdecks",
    label: "Pitchdecks",
    emoji: "📊",
    href: "#pitchdecks",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: "graphics",
    label: "Graphics",
    emoji: "🖼️",
    href: "#graphics",
    colSpan: 1,
    rowSpan: 1,
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="w-full">
      <div className="grid grid-cols-2 gap-0 w-full" style={{ height: "450px" }}>
        {/* Row 1: Branding + Web Apps */}
        <a
          href="#branding"
          className="flex items-center justify-center gap-3 bg-card-bg hover:bg-white/15 transition-colors border border-white/5 cursor-pointer"
          style={{ height: "115.5px" }}
        >
          <span className="text-3xl rotate-[15deg]">🎨</span>
          <span className="text-white font-medium text-[30px]">Branding Projects</span>
        </a>
        <a
          href="#webapps"
          className="flex items-center justify-center gap-3 bg-card-bg hover:bg-white/15 transition-colors border border-white/5 cursor-pointer"
          style={{ height: "115.5px" }}
        >
          <span className="text-3xl rotate-[-15deg]">💻</span>
          <span className="text-white font-medium text-[30px]">Web Apps</span>
        </a>

        {/* Row 2: Meet Lota (full width) — has photo bg */}
        <a
          href="#about"
          className="col-span-2 relative flex items-center justify-center bg-[#3B3B3B] hover:bg-[#444] transition-colors overflow-hidden cursor-pointer"
          style={{ height: "179px" }}
        >
          {/* Subtle photo placeholder — replace with actual Lota photo */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-64 h-full bg-gradient-to-b from-[#D9D9D9] to-transparent" />
          </div>
          <span className="relative z-10 text-white font-medium text-[30px]">Meet Lota</span>
        </a>

        {/* Row 3: Pitchdecks + Graphics */}
        <a
          href="#pitchdecks"
          className="flex items-center justify-center gap-3 bg-card-bg hover:bg-white/15 transition-colors border border-white/5 cursor-pointer"
          style={{ height: "115.5px" }}
        >
          <span className="text-3xl rotate-[-15deg]">📊</span>
          <span className="text-white font-medium text-[30px]">Pitchdecks</span>
        </a>
        <a
          href="#graphics"
          className="flex items-center justify-center gap-3 bg-card-bg hover:bg-white/15 transition-colors border border-white/5 cursor-pointer"
          style={{ height: "115.5px" }}
        >
          <span className="text-3xl rotate-[15deg]">🖼️</span>
          <span className="text-white font-medium text-[30px]">Graphics</span>
        </a>
      </div>
    </section>
  );
}
