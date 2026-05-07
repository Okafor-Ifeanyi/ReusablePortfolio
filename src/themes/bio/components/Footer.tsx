"use client";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.67">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ifeanyi-okafor",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/ifeanyidike",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#08080E] border-t border-[#FFFCF2] w-full">
      {/* Contact section */}
      <div className="flex flex-col items-center justify-center py-12 gap-6 w-full">
        {/* CONTACT label */}
        <div
          className="flex flex-col items-center gap-2"
          style={{ filter: "drop-shadow(0px 0px 30px rgba(255,255,255,0.3))" }}
        >
          <span
            className="text-[#FCFCFF] tracking-[2px] text-center"
            style={{ fontFamily: "Public Sans, sans-serif", fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}
          >
            CONTACT
          </span>
          <p
            className="text-center"
            style={{
              fontFamily: "Public Sans, sans-serif",
              fontSize: "16px",
              lineHeight: "24px",
              color: "#C9C9CA",
              maxWidth: "280px",
            }}
          >
            Connect with me on social media or send a direct message
          </p>
        </div>

        {/* Social icon links */}
        <div className="flex flex-row items-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex items-center justify-center w-9.5 h-9.5 rounded-full border border-[#636363] text-[#FCFCFF] hover:border-[#FCFCFF] hover:scale-110 transition-all duration-200"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Copyright bar */}
      <div
        className="flex items-center justify-center py-8"
        style={{ borderTop: "1px solid rgba(255,252,242,0.1)" }}
      >
        <p
          className="text-center"
          style={{
            fontFamily: "Public Sans, sans-serif",
            fontSize: "16px",
            lineHeight: "24px",
            color: "rgba(255,252,242,0.6)",
            letterSpacing: "-0.3125px",
          }}
        >
          © 2026 IfeanyiOkafor. All rights reserved.
        </p>
      </div>
    </footer>
  );
}