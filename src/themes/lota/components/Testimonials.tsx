"use client";

import { BORDER } from "./ServicesGrid";
import type { LotaTestimonial } from "../index";

const QUOTE = (
  <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
    <path d="M0 24V14.4C0 10.4 1.06667 7.06667 3.2 4.4C5.38667 1.73333 8.48 0.266667 12.48 0L13.44 2.24C11.04 2.77333 9.09333 3.92 7.6 5.68C6.10667 7.38667 5.36 9.33333 5.36 11.52H10.56V24H0ZM18.56 24V14.4C18.56 10.4 19.6267 7.06667 21.76 4.4C23.9467 1.73333 27.04 0.266667 31.04 0L32 2.24C29.6 2.77333 27.6533 3.92 26.16 5.68C24.6667 7.38667 23.92 9.33333 23.92 11.52H29.12V24H18.56Z"
      fill="rgba(255,250,239,0.15)" />
  </svg>
);

export default function Testimonials({ testimonials }: { testimonials: LotaTestimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="w-full">
      <h2 className="text-white font-medium text-[40px] leading-[150%] mb-8">Testimonials</h2>

      <div className="flex gap-5 w-full">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="flex-1 rounded-xl p-px"
            style={{ background: BORDER }}
          >
            <div
              className="flex flex-col gap-5 p-6 rounded-xl h-full"
              style={{ background: "rgba(255,250,239,0.04)" }}
            >
              {/* Quote mark */}
              <div>{QUOTE}</div>

              {/* Text */}
              <p className="text-off-white font-light text-[15px] leading-[170%] flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Divider */}
              <div style={{ height: "1px", background: "rgba(255,250,239,0.08)" }} />

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar initial */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,250,239,0.1)", border: "1px solid rgba(255,250,239,0.15)" }}
                >
                  <span className="text-cream text-[14px] font-medium">{t.name[0]}</span>
                </div>
                <div>
                  <p className="text-cream font-medium text-[14px] leading-none mb-1">{t.name}</p>
                  <p className="text-lota-muted text-[12px]">{t.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
