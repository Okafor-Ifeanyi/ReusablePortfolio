"use client";

const testimonials = [
  {
    name: "Sarah O.",
    role: "Startup Founder",
    text: "Lota delivered an exceptional brand identity that perfectly captured our vision. Her attention to detail and strategic thinking set her apart.",
  },
  {
    name: "James M.",
    role: "Product Manager",
    text: "Working with Lota was effortless. She understood our user needs quickly and translated them into clean, beautiful designs.",
  },
  {
    name: "Aisha B.",
    role: "CEO, TechCo",
    text: "The pitchdeck she created helped us close our seed round. Investors were impressed by the clarity and visual storytelling.",
  },
];

export default function Testimonials() {
  return (
    <section id="contact" className="w-full">
      <h2 className="text-white font-medium text-[40px] leading-[150%] mb-4">Testimonials</h2>

      <div className="flex gap-6 w-full">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="flex-1 rounded-2xl px-[10px] py-4 flex flex-col gap-3"
            style={{ background: "rgba(255,255,255,0.3)", minHeight: "98px" }}
          >
            <p className="text-white font-light text-[14px] leading-[150%]">&ldquo;{t.text}&rdquo;</p>
            <div>
              <p className="text-white font-medium text-[14px]">{t.name}</p>
              <p className="text-white/60 text-[12px]">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
