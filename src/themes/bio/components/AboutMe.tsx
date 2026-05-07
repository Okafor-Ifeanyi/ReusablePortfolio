"use client";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="bg-light-bg dark:bg-dark-bg transition-colors duration-300 py-16"
    >
      <div className="max-w-360 mx-auto px-15">
        {/* Section header */}
        <h2
          className="text-light-text dark:text-dark-text tracking-design mb-8"
          style={{ fontSize: "48px", lineHeight: "150%", fontWeight: 400 }}
        >
          &#123;About Me&#125;
        </h2>

        {/* Content grid */}
        <div className="relative w-full" style={{ minHeight: "633px" }}>
          {/* Layout: photo top-left, quote top-right, stats bottom-left, bio card bottom-right */}
          <div className="flex flex-col lg:flex-row gap-8 w-full">

            {/* Left column */}
            <div className="flex flex-col gap-6" style={{ width: "316px", flexShrink: 0 }}>
              {/* Profile photo */}
              <div
                className="relative rounded-lg overflow-hidden bg-light-muted/20 dark:bg-dark-muted/20"
                style={{ width: "316px", height: "321px" }}
              >
                {/* Replace src with your actual photo */}
                <img
                  src="/profile.jpg"
                  alt="Ifeanyi Okafor"
                  className="w-full h-full object-cover grayscale"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Fallback placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-light-muted dark:text-dark-muted text-sm">
                  <span>Profile Photo</span>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex flex-row items-center gap-4">
                <div className="flex flex-col">
                  <span
                    className="text-light-text dark:text-dark-text font-power tracking-design"
                    style={{ fontSize: "65px", lineHeight: "150%", marginBottom: "-18px" }}
                  >
                    5+
                  </span>
                  <span
                    className="text-light-muted dark:text-dark-muted tracking-design"
                    style={{ fontSize: "27px", lineHeight: "150%" }}
                  >
                    Years
                  </span>
                </div>
                <div className="flex flex-col ml-4">
                  <span
                    className="text-light-text dark:text-dark-text font-power tracking-design"
                    style={{ fontSize: "65px", lineHeight: "150%", marginBottom: "-18px" }}
                  >
                    30+
                  </span>
                  <span
                    className="text-light-muted dark:text-dark-muted tracking-design"
                    style={{ fontSize: "27px", lineHeight: "150%" }}
                  >
                    Projects
                  </span>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col flex-1 gap-6">
              {/* Pull quote */}
              <div className="flex items-center" style={{ minHeight: "321px" }}>
                <blockquote
                  className="text-light-text dark:text-dark-text font-power"
                  style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: "150%", fontWeight: 400 }}
                >
                  "I enjoy spotting inefficiencies early and turning them into clean, scalable solutions."
                </blockquote>
              </div>

              {/* Bio card */}
              <div
                className="rounded-lg border border-light-text dark:border-dark-border/30 bg-light-bg dark:bg-dark-bg p-8 flex flex-col gap-4"
                style={{ minHeight: "260px" }}
              >
                <p
                  className="text-light-muted dark:text-dark-muted font-power flex-1"
                  style={{ fontSize: "20px", lineHeight: "150%", fontWeight: 400 }}
                >
                  I am a Full-Stack Software Engineer with a background in Computer Science, focused on building practical, cost-effective software that solves real business problems. Over the years, I&apos;ve worked across e-commerce, fintech, and e-learning, helping teams bring ideas from concept to production and grow products that real users depend on. I thrive in fast-moving, collaborative environments where sharp thinking, clear communication, and execution matter more than noise.
                </p>
                <div className="flex justify-end">
                  <cite
                    className="text-light-text dark:text-dark-text not-italic font-power tracking-design"
                    style={{ fontSize: "22px", lineHeight: "150%" }}
                  >
                    -Ifeanyi Okafor
                  </cite>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}