"use client";

interface SkillCategory {
  title: string;
  items: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Backend & Systems Engineering:",
    items:
      "Node.js, TypeScript, NestJS, Express, Distributed Systems, Microservice-Oriented Design, Event-Driven Architectures, Asynchronous Processing",
  },
  {
    title: "Payments & Reliability Patterns:",
    items:
      "Payments-Adjacent Systems, Financial Workflows, Idempotency, Retries, Delayed Jobs, Transactional Consistency, Failure Handling",
  },
  {
    title: "Databases & Data Layer:",
    items:
      "PostgreSQL, MongoDB, Prisma ORM, Query Optimization, Data Modeling",
  },
  {
    title: "Messaging, Caching & Real-Time Systems:",
    items:
      "Redis, BullMQ, RabbitMQ-style Messaging, Kafka-style Event Streaming, Socket.IO, Real-Time Communication Systems",
  },
  {
    title: "Security & Compliance:",
    items:
      "API Security, JWT, Role-Based Access Control (RBAC), Rate Limiting, Request Throttling, Secure Webhook Handling, Identity Verification Integrations",
  },
  {
    title: "Cloud, DevOps & Observability:",
    items:
      "AWS (EC2, S3, CloudFront, Route 53), CI/CD Pipelines, Docker, GitHub Actions, Monitoring, Debugging, Backend Availability & Scaling",
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="bg-light-bg dark:bg-dark-bg transition-colors duration-300 py-16"
    >
      <div className="max-w-360 mx-auto px-15">
        {/* Section header */}
        <h2
          className="text-light-text dark:text-dark-text mb-8"
          style={{ fontSize: "48px", lineHeight: "58px", fontWeight: 400 }}
        >
          &#123;Skills&#125;
        </h2>

        {/* Main skills layout */}
        <div className="flex flex-col lg:flex-row items-stretch gap-12 w-full">

          {/* LEFT: Vertical "Lead Engineer" panel */}
          <div
            className="relative flex items-center justify-center rounded-lg overflow-hidden shrink-0"
            style={{
              width: "220px",
              minHeight: "600px",
              background: "var(--panel-bg, #05050D)",
              border: "0.5px solid",
            }}
            /* Light mode: dark panel. Dark mode: light lavender panel */
          >
            <style jsx>{`
              :global(.dark) div[data-skills-panel] {
                background: #E1DFFF !important;
                border-color: #292933 !important;
              }
              :global(:not(.dark)) div[data-skills-panel] {
                background: #05050D !important;
                border-color: #818186 !important;
              }
            `}</style>

            <SkillsPanel />
          </div>

          {/* RIGHT: Skill categories list */}
          <div className="flex flex-col gap-6 flex-1 py-2">
            {skillCategories.map((cat) => (
              <div key={cat.title} className="flex flex-col gap-2">
                <h3
                  className="text-light-text dark:text-dark-text"
                  style={{ fontSize: "24px", lineHeight: "34px", letterSpacing: "0.48px", fontWeight: 400 }}
                >
                  {cat.title}
                </h3>
                <p
                  className="text-light-muted dark:text-dark-muted"
                  style={{ fontSize: "20px", lineHeight: "35px", letterSpacing: "0.432px", fontWeight: 400 }}
                >
                  {cat.items}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Separate component for the vertical panel to manage its own dark/light styles cleanly */
function SkillsPanel() {
  return (
    <>
      {/* Light mode panel */}
      <div className="absolute inset-0 bg-[#05050D] border border-[#818186] rounded-lg dark:hidden" />
      {/* Dark mode panel */}
      <div className="absolute inset-0 bg-[#E1DFFF] border border-[#292933] rounded-lg hidden dark:block" />

      {/* Rotated text */}
      <span
        className="relative z-10 text-[#FCFCFF] dark:text-[#05050D] font-power text-center select-none"
        style={{
          fontSize: "clamp(36px, 5vw, 72px)",
          lineHeight: "130%",
          letterSpacing: "2px",
          transform: "rotate(-90deg)",
          whiteSpace: "nowrap",
          fontWeight: 400,
        }}
      >
        Lead Engineer
      </span>

      {/* Subtle decorative gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15 rounded-lg"
        style={{
          background:
            "linear-gradient(242.36deg, rgba(217,217,217,0) 83.3%, rgba(115,115,115,0.5) 90.08%)",
        }}
      />
    </>
  );
}