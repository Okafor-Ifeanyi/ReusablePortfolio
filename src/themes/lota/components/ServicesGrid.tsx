"use client";

export const BORDER = "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0.45) 100%)";

export default function ServicesGrid() {
  return (
    <section id="services" className="w-full">
      <div className="grid grid-cols-2 gap-5 w-full" style={{ height: "450px" }}>

        {/* Branding Projects */}
        <div className="rounded-sm p-px" style={{ background: BORDER, height: "115.5px" }}>
          <a href="#branding" className="rounded-sm flex items-center justify-center gap-1 bg-black hover:bg-[#FFFAEF26] transition-colors cursor-pointer h-full w-full">
            <span className="text-3xl"><img src="/images/services/branding.svg" alt="Branding" /></span>
            <span className="text-white font-medium text-[30px]">Branding Projects</span>
          </a>
        </div>

        {/* Web Apps */}
        <div className="rounded-sm p-px" style={{ background: BORDER, height: "115.5px" }}>
          <a href="#webapps" className="rounded-sm flex items-center justify-center gap-1 bg-black hover:bg-[#FFFAEF26] transition-colors cursor-pointer h-full w-full">
            <span className="text-3xl"><img src="/images/services/web-design.svg" alt="Web Apps" /></span>
            <span className="text-white font-medium text-[30px]">Web Apps</span>
          </a>
        </div>

        {/* Meet Lota — full width, photo bg */}
        <div className="col-span-2 rounded-sm p-px" style={{ background: BORDER, height: "179px" }}>
          <a href="#about" className="rounded-sm relative flex items-center justify-center overflow-hidden hover:bg-white/5 transition-colors cursor-pointer h-full w-full">
            <img src="/images/meet-lota.png" alt="" aria-hidden className="absolute inset-0 w-2/3 h-full object-cover mx-auto opacity-70" style={{ objectPosition: "50% 20%" }} />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-y-0 left-0 w-32 pointer-events-none" style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", maskImage: "linear-gradient(to right, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 100%)" }} />
            <div className="absolute inset-y-0 right-0 w-32 pointer-events-none" style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", maskImage: "linear-gradient(to left, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to left, black 0%, transparent 100%)" }} />
            <span className="relative z-10 text-white font-medium text-[30px]">Meet Lota</span>
          </a>
        </div>

        {/* Pitchdecks */}
        <div className="rounded-sm p-px" style={{ background: BORDER, height: "115.5px" }}>
          <a href="#pitchdecks" className="rounded-sm flex items-center justify-center gap-1 bg-[#FFFAEF1A] hover:bg-[#FFFAEF26] transition-colors cursor-pointer h-full w-full">
            <span className="text-3xl"><img src="/images/services/presentation.svg" alt="Pitchdecks" /></span>
            <span className="text-white font-medium text-[30px]">Pitchdecks</span>
          </a>
        </div>

        {/* Graphics */}
        <div className="rounded-sm p-px" style={{ height: "115.5px" }}>
          <a href="#graphics" className="rounded-sm flex items-center justify-center gap-1 bg-[#FFFAEF1A] hover:bg-[#FFFAEF26] transition-colors cursor-pointer h-full w-full">
            <span className="text-3xl"><img src="/images/services/windows.svg" alt="Graphics" /></span>
            <span className="text-white font-medium text-[30px]">Graphics</span>
          </a>
        </div>

      </div>
    </section>
  );
}
