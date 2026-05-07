"use client";

const skills = [
  "Visual Identity", "UI/UX", "User Research", "Graphic Design",
  "Package Design", "Branding", "Pitchdecks", "Presentations",
];

export default function MeetLota() {
  return (
    <section id="about" className="w-full">
      <h2 className="text-white font-medium text-[40px] leading-[150%] mb-4">Meet Lota</h2>

      <div className="flex gap-5 w-full" style={{ height: "380px" }}>
        {/* Photo card */}
        <div
          className="flex-shrink-0 rounded-2xl overflow-hidden bg-[#3B3B3B] relative"
          style={{ width: "378px" }}
        >
          {/* Gradient glow orb */}
          <div
            className="absolute opacity-30 rounded-full"
            style={{
              width: "309px",
              height: "418px",
              left: "50%",
              top: "-10px",
              transform: "translateX(-50%)",
              background: "linear-gradient(179.98deg, #D9D9D9 83.82%, rgba(115,115,115,0) 99.93%)",
            }}
          />
          {/* Photo placeholder — replace with <img src="/lota.jpg" /> */}
          <div className="absolute inset-0 flex items-end justify-center pb-4">
            <span className="text-white/30 text-sm">Photo of Lota</span>
          </div>
        </div>

        {/* Bio + skills + timeline */}
        <div className="flex-1 flex flex-col gap-6 py-[10px]">
          <p className="text-white font-light text-[20px] leading-[150%]">
            I&apos;m Lota, a passionate Product and Visual Designer who solves problems with clean, beautiful design. I design functional and visually strong solutions that help your brand stand out by blending creativity with strategy.
          </p>

          {/* Skill tags */}
          <div className="flex flex-wrap gap-[10px]">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-5 py-2 rounded bg-[#2E2E2E] text-white font-light text-[20px] leading-[150%]"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Timeline / manifesto */}
          <div className="flex gap-2 items-start mt-auto">
            {/* Vertical dots */}
            <div className="flex flex-col items-center gap-5 pt-1">
              {["Create", "Design", "Innovate"].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-[#D9D9D9]" />
                  {i < 2 && <div className="w-px h-5 bg-white/20 mt-1" />}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-7 ml-1">
              {["Create", "Design", "Innovate"].map((word) => (
                <span key={word} className="text-white font-light text-[20px] leading-none">{word}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
