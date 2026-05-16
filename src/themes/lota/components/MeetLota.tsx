"use client";

import type { LotaHero, LotaSkill } from "../index";

const manifesto = ["Create", "Design", "Innovate"];

export default function MeetLota({
  hero,
  fullName,
  skills,
}: {
  hero: LotaHero;
  fullName: string | null;
  skills: LotaSkill[];
}) {
  const name = fullName ?? "Portfolio";
  const bio = hero?.bio ?? "A passionate designer who solves problems with clean, beautiful design.";
  const avatarUrl = hero?.avatarUrl ?? null;
  const skillNames = skills.length > 0 ? skills.map(s => s.name) : ["Visual Identity", "UI/UX", "User Research", "Graphic Design", "Package Design", "Branding", "Pitchdecks", "Presentations"];

  return (
    <section id="about" className="w-full">
      <h2 className="text-white font-medium text-[40px] leading-[150%] mb-4">Meet {name}</h2>

      <div className="flex gap-5 w-full" style={{ height: "380px" }}>
        {/* Photo card */}
        <div
          className="shrink-0 rounded-2xl overflow-hidden relative"
          style={{ width: "378px", background: "#3B3B3B" }}
        >
          <img
            src={avatarUrl ?? "/images/meet-lota.png"}
            alt={name}
            className="absolute inset-0 w-2/3 h-full mx-auto object-cover"
            style={{ objectPosition: "center top" }}
          />
          {/* Subtle bottom gradient so content above doesn't clash */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        </div>

        {/* Bio + skills + manifesto */}
        <div className="flex-1 flex flex-col gap-6 py-2.5">
          <p className="text-white font-light text-[20px] leading-[150%]">{bio}</p>

          {/* Skill tags */}
          <div className="flex flex-wrap gap-[10px]">
            {skillNames.map((skill) => (
              <span
                key={skill}
                className="px-5 py-2 rounded bg-[#2E2E2E] text-white font-light text-[20px] leading-[150%]"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Manifesto list — dot+line spine from bio Experience */}
          <div className="flex flex-row gap-4 ">
            {/* Spine */}
            <div className="flex flex-col items-center" style={{ flexShrink: 0 }}>
              {manifesto.map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="rounded-full bg-lota-muted shrink-0"
                    style={{ width: "10px", height: "10px", marginTop: "2px" }}
                  />
                  {i < manifesto.length - 1 && (
                    <div className="w-px bg-white/20" style={{ height: "20px" }} />
                  )}
                </div>
              ))}
            </div>
            {/* Labels */}
            <div className="flex flex-col" style={{ gap: "16px" }}>
              {manifesto.map((word) => (
                <span key={word} className="text-white font-light leading-none">{word}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
