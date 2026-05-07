"use client";

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      {/* Decorative diagonal border overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(242.36deg, rgba(217,217,217,0) 83.3%, rgba(115,115,115,0.5) 90.08%)",
          opacity: 0.15,
          border: "0.55px solid #636363",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-[60px]">
        {/* Main hero content */}
        <div className="flex flex-col items-center pt-[150px] pb-[75px] gap-[75px]">
          {/* Title row with code brackets */}
          <div className="flex flex-col items-center gap-[10px]">
            <div className="flex flex-row items-center gap-3">
              {/* Opening bracket  < */}
              <div className="flex flex-col items-end gap-0">
                <span
                  className="text-light-muted dark:text-dark-muted leading-none"
                  style={{ fontSize: "61px", lineHeight: 1, fontWeight: 400 }}
                >
                  &lt;
                </span>
              </div>

              {/* Title text */}
              <h1
                className="text-light-text dark:text-dark-text tracking-design whitespace-nowrap"
                style={{ fontSize: "61px", lineHeight: "150%", fontWeight: 400 }}
              >
                Fullstack Developer
              </h1>

              {/* Closing bracket /> */}
              <div className="flex flex-row items-center gap-1">
                <span
                  className="text-light-muted dark:text-dark-muted leading-none"
                  style={{ fontSize: "61px", lineHeight: 1, fontWeight: 400 }}
                >
                  /&gt;
                </span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); scrollToProjects(); }}
            className="inline-flex items-center justify-center px-4 py-3 rounded-[4px] text-[28px] tracking-design transition-all duration-200
              bg-light-text text-light-bg hover:bg-light-text/90
              dark:bg-accent-light dark:text-dark-bg dark:hover:bg-accent-light/90
              font-power"
            style={{ minWidth: "234px", height: "75px" }}
          >
            View Projects
          </a>
        </div>

        {/* Bottom stats row */}
        <div className="flex flex-wrap items-end justify-between pb-[60px] gap-6">
          {/* Left: description text */}
          <p
            className="text-light-text dark:text-dark-text tracking-design max-w-[314px]"
            style={{ fontSize: "14px", lineHeight: "150%" }}
          >
            Full-Stack Software Engineer building practical, scalable products across e-commerce, fintech, and e-learning.
          </p>

          {/* Right: stats */}
          <div className="flex flex-row items-center gap-0">
            <div className="flex flex-col items-center px-4 py-3 min-w-[120px]">
              <span
                className="text-light-text dark:text-dark-text tracking-design font-power"
                style={{ fontSize: "36px", lineHeight: "150%" }}
              >
                5+
              </span>
              <span
                className="text-light-text dark:text-dark-text tracking-design"
                style={{ fontSize: "16px", lineHeight: "150%" }}
              >
                Experience
              </span>
            </div>
            <div className="flex flex-col items-center px-4 py-3 min-w-[120px]">
              <span
                className="text-light-text dark:text-dark-text tracking-design font-power"
                style={{ fontSize: "36px", lineHeight: "150%" }}
              >
                30+
              </span>
              <span
                className="text-light-text dark:text-dark-text tracking-design"
                style={{ fontSize: "16px", lineHeight: "150%" }}
              >
                Projects
              </span>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="flex justify-center pb-8">
          <button
            onClick={scrollToProjects}
            aria-label="Scroll to projects"
            className="text-light-text dark:text-dark-text hover:opacity-60 transition-opacity animate-bounce"
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M16 21L24 29L32 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}