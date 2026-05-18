"use client";

import { useState } from "react";
import { BORDER } from "./ServicesGrid";
import type { LotaHero } from "../index";

export default function Hero({ fullName, hero }: { fullName: string | null; hero: LotaHero }) {
  const name = fullName ?? "Portfolio";
  const role = hero?.role ?? "Designer";
  const [cursor, setCursor] = useState({ x: -200, y: -200 });
  const [active, setActive] = useState(false);

  return (
    <section
      className="flex flex-col items-center justify-center gap-10 min-h-150 relative overflow-hidden"
      style={{ cursor: "none" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => {
        setActive(false);
        setCursor({ x: -200, y: -200 });
      }}
    >
      {/* Custom icon cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-50"
        style={{
          left: cursor.x,
          top: cursor.y,
          transform: "translate(-50%, -50%)",
          opacity: active ? 1 : 0,
          transition: "opacity 0.15s",
        }}
      >
        {/* Outer ring */}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.75)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Inner dot */}
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.9)",
            }}
          />
        </div>
      </div>

      {/* Text block */}
      <div className="relative w-125">
        {/* "Hello" italic thin */}
        <p
          className="absolute text-white/52 italic font-light"
          style={{
            fontSize: "43px",
            fontWeight: 250,
            top: "-6px",
            left: "5.61px",
            lineHeight: "150%",
          }}
        >
          Hello
        </p>

        {/* Main headline */}
        <div style={{ paddingTop: "46.71px" }}>
          <p
            className="text-white"
            style={{ fontSize: "61.43px", lineHeight: "150%", fontWeight: 400 }}
          >
            I&apos;m <span className="text-gold">what you need.</span>
          </p>
          <div className="flex items-center gap-0">
            <p
              className="text-white"
              style={{
                fontSize: "61.43px",
                lineHeight: "150%",
                fontWeight: 400,
              }}
            >
              I&apos;m <span className="text-gold">that</span>&nbsp;
            </p>
            {/* "Designer." with gold border box and corner squares */}
            <div className="relative inline-flex items-center">
              <div
                className="absolute w-[8.53px] h-[8.53px] bg-white border border-gold-border"
                style={{ top: 0, left: 0, transform: "translate(-50%,-50%)" }}
              />
              <div
                className="absolute w-[8.53px] h-[8.53px] bg-white border border-gold-border"
                style={{ top: 0, right: 0, transform: "translate(50%,-50%)" }}
              />
              <div
                className="absolute w-[8.53px] h-[8.53px] bg-white border border-gold-border"
                style={{ bottom: 0, left: 0, transform: "translate(-50%,50%)" }}
              />
              <div
                className="absolute w-[8.53px] h-[8.53px] bg-white border border-gold-border"
                style={{ bottom: 0, right: 0, transform: "translate(50%,50%)" }}
              />
              <span
                className="text-gold"
                style={{
                  fontSize: "61.43px",
                  lineHeight: "150%",
                  fontWeight: 400,
                  border: "1px solid #F2A206",
                  padding: "0 8.53px",
                }}
              >
                {role}.
              </span>
            </div>
          </div>
        </div>

        {/* Name card — floating bottom right */}
        <div className="absolute" style={{ right: "-128px", bottom: "-70px" }}>
          <div
            className="relative p-px rounded-[4.27px] shadow-md"
            style={{ 
              minWidth: "262px",
              background: BORDER
              // background: "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06) 60%, rgba(255,255,255,0.55) 100%)",
            }}
          >
            
            <div className="absolute top-[-22] left-[-10]">
              <img src="/images/lota-arrow.svg" alt="Lota Logo" />
            </div>
            <p
              className="text-white/90 font-bold text-[25.6px] leading-[150%] px-4 py-2 border border-[#FFFAEF1A] rounded-[4.27px]"
              style={{ fontFamily: "Istok Web, sans-serif",   }}
            >
              {name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
