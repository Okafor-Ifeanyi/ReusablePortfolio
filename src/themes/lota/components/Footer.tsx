"use client";

const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFCF2" strokeWidth="1.67">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="#FFFCF2" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFCF2" strokeWidth="1.67">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFCF2">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFCF2" strokeWidth="1.67">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#FFFCF2" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      className="w-full border-t border-[#FFFCF2]"
      style={{ background: "#000000" }}
    >
      <div className="max-w-[1200px] mx-auto px-12 py-12 flex flex-col items-center gap-12">
        {/* Follow Us */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-[#FFFCF2] text-[16px]" style={{ fontFamily: "Poppins, sans-serif" }}>
            Follow Us
          </p>
          <div className="flex gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-[38px] h-[38px] flex items-center justify-center rounded-full border border-[rgba(255,252,242,0.2)] hover:border-[rgba(255,252,242,0.6)] transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div
        className="w-full border-t border-[rgba(255,252,242,0.1)] py-8 flex justify-center"
      >
        <p
          className="text-[rgba(255,252,242,0.6)] text-[16px] text-center"
          style={{ fontFamily: "Poppins, sans-serif", letterSpacing: "-0.3125px" }}
        >
          © 2025 LOTA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
