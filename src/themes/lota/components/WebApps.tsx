"use client";
import SectionHeader from "./SectionHeader";

interface WebAppCard {
  name: string;
  description: string;
  tags: string[];
  duration: string;
  type: string;
  href?: string;
}

const webApps: WebAppCard[] = [
  {
    name: "Ventree",
    description: "Ventree is a simple online tool that helps shop owners and attendants record sales, track goods, and know their profit or loss — all in one place.",
    tags: ["Responsive", "Branding", "Prototyping", "Ideation", "Strategy", "User Research", "Business Modelling"],
    duration: "Nov '25 - Dec '25 (1 Month)",
    type: "Collaboration",
    href: "#",
  },
  {
    name: "Trove",
    description: "A modern savings and investment platform helping users track, grow and manage their financial goals effortlessly.",
    tags: ["Responsive", "Branding", "Prototyping", "Ideation", "Strategy", "User Research", "Business Modelling"],
    duration: "Nov '25 - Dec '25 (1 Month)",
    type: "Collaboration",
    href: "#",
  },
  {
    name: "Pivot",
    description: "Rebuilding Africa from within — a platform for community-driven transformation and social impact initiatives.",
    tags: ["Responsive", "Branding", "Prototyping", "Ideation", "Strategy", "User Research", "Business Modelling"],
    duration: "Nov '25 - Dec '25 (1 Month)",
    type: "Collaboration",
    href: "#",
  },
  {
    name: "BlvckVerze",
    description: "A premium creative agency portfolio showcasing bold design thinking and visual storytelling across industries.",
    tags: ["Responsive", "Branding", "Prototyping", "Ideation", "Strategy", "User Research", "Business Modelling"],
    duration: "Nov '25 - Dec '25 (1 Month)",
    type: "Collaboration",
    href: "#",
  },
  {
    name: "Simbi",
    description: "An AI-powered study companion that helps students learn smarter, track progress, and stay motivated.",
    tags: ["Responsive", "Branding", "Prototyping", "Ideation", "Strategy", "User Research", "Business Modelling"],
    duration: "Nov '25 - Dec '25 (1 Month)",
    type: "Collaboration",
    href: "#",
  },
  {
    name: "Learnify",
    description: "An intelligent learning tool that personalises educational content for every student's unique journey.",
    tags: ["Responsive", "Branding", "Prototyping", "Ideation", "Strategy", "User Research", "Business Modelling"],
    duration: "Nov '25 - Dec '25 (1 Month)",
    type: "Collaboration",
    href: "#",
  },
];

function Tag({ label }: { label: string }) {
  return (
    <span className="px-2 py-1 border border-muted rounded-[2px] text-muted text-[14px] font-light tracking-wider">
      {label}
    </span>
  );
}

export default function WebApps() {
  return (
    <section id="webapps" className="w-full">
      <SectionHeader title="WebApps" viewAllHref="#" />

      <div className="flex flex-col gap-0 w-full">
        {webApps.map((app, i) => (
          <div
            key={i}
            className="flex gap-6 py-4 border-b border-[#646464]"
            style={{ minHeight: "366px" }}
          >
            {/* Screenshot preview */}
            <div
              className="flex-shrink-0 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center"
              style={{ width: "468px", height: "334px" }}
            >
              {/* Replace with actual screenshot: <img src="..." /> */}
              <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
                <span className="text-muted text-sm">{app.name} screenshot</span>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col flex-1 gap-4 py-2">
              <h3 className="text-cream font-medium text-[24px] leading-[29px]">{app.name}</h3>
              <p className="text-[#DFDFDF] text-[16px] leading-[150%]">{app.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-[10px]">
                {app.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>

              {/* Meta */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#646464" strokeWidth="1.5" />
                    <path d="M12 7v5l3 2" stroke="#646464" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="text-cream text-[16px]">{app.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#646464" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="9" cy="7" r="4" stroke="#646464" strokeWidth="1.5" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#646464" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="text-cream text-[16px]">{app.type}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex justify-end mt-auto">
                <a
                  href={app.href}
                  className="px-6 py-[5px] rounded-full text-cream text-[18px] border border-white/20 hover:bg-white/10 transition-colors"
                  style={{ filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))" }}
                >
                  View Casestudy
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
