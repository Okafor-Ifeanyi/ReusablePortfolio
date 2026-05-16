"use client";

const images = [
  "/images/marquee/Vector-5.svg",
  "/images/marquee/Vector-6.svg",
  "/images/marquee/Vector-7.svg",
  "/images/marquee/Vector-8.svg",
  "/images/marquee/Vector-9.svg",
  "/images/marquee/Vector-10.svg",
];

// 4× duplication: animation scrolls -50% (= 2 sets), loops back seamlessly
const items = [...images, ...images, ...images, ...images];

export default function Marquee() {
  return (
    <div
      style={{
        width: "90%",
        margin: "2rem auto",
        overflow: "hidden",
        maskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "64px",
          width: "max-content",
          padding: "1.5rem 0",
          animation: "lota-marquee 22s linear infinite",
          willChange: "transform",
        }}
      >
        {items.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            aria-hidden
            draggable={false}
            style={{ height: "40px", width: "auto", opacity: 0.7, flexShrink: 0, userSelect: "none" }}
          />
        ))}
      </div>
    </div>
  );
}
