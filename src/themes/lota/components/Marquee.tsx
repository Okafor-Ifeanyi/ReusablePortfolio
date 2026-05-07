"use client";

const logos = [
  "Learnify", "flip", "Ventree", "Femflex", "Buddy", "Plana",
  "SIMBI", "NEXGEN", "LipManiac",
];

export default function Marquee() {
  // Duplicate for seamless loop
  const items = [...logos, ...logos];

  return (
    <div className="w-full overflow-hidden py-4 my-8" style={{ background: "linear-gradient(90deg, rgba(217,217,217,0) 0%, #737373 10%, #737373 90%, rgba(115,115,115,0) 100%)" }}>
      <div className="flex items-center gap-[51.84px] animate-marquee whitespace-nowrap w-max">
        {items.map((logo, i) => (
          <span
            key={i}
            className="text-[#99968F] font-medium text-[18px] select-none"
          >
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}
