"use client";
import SectionHeader from "./SectionHeader";

interface BrandingCard {
  name: string;
  description: string;
  bg: string;
  href?: string;
}

const brandingProjects: BrandingCard[] = [
  { name: "Flip", description: "Gamified Saving App", bg: "#43388D", href: "#" },
  { name: "Ventree", description: "Inventory and Sales Management", bg: "#073E1E", href: "#" },
  { name: "Femflex", description: "Women only Gym", bg: "#1A1A2E", href: "#" },
  { name: "Learnify", description: "Ai Learning Tool", bg: "#0E021D", href: "#" },
];

export default function BrandingProjects() {
  return (
    <section id="branding" className="w-full">
      <SectionHeader title="Branding Projects" viewAllHref="#" />

      <div className="flex gap-7 w-full">
        {brandingProjects.map((project) => (
          <div
            key={project.name}
            className="flex flex-col flex-1 gap-4 p-[15px] rounded-xl"
            style={{ background: "rgba(255,250,239,0.1)", minWidth: 0 }}
          >
            {/* Image area */}
            <div
              className="w-full rounded-lg overflow-hidden relative flex-shrink-0"
              style={{ height: "197px", background: project.bg }}
            >
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(179.85deg, rgba(15,15,15,0) 20.08%, #000 99.87%)" }}
              />
              {/* Project info overlaid on image */}
              <div className="absolute bottom-0 left-0 p-4 flex flex-col gap-1">
                <span className="text-white font-medium text-[24px] leading-none">{project.name}</span>
                <span className="text-white font-light text-[12px] leading-[150%]">{project.description}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-start px-3">
              <a
                href={project.href}
                className="px-6 py-[5px] rounded-full text-cream text-[18px] hover:bg-white/10 transition-colors"
                style={{ filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))" }}
              >
                View Casestudy
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
