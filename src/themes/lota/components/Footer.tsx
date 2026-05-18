"use client";

import React from "react";
import type { LotaLink } from "../index";

const ICONS: Record<string, React.ReactElement> = {
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFCF2" strokeWidth="1.67">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="#FFFCF2" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFCF2" strokeWidth="1.67">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  twitter: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFCF2">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFCF2">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFCF2">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  youtube: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFCF2" strokeWidth="1.67">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#FFFCF2" stroke="none" />
    </svg>
  ),
  other: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFCF2" strokeWidth="1.67">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

export default function Footer({ links, fullName }: { links: LotaLink[]; fullName: string | null }) {
  const year = new Date().getFullYear();
  const name = fullName ?? "Portfolio";

  return (
    <footer className="w-full border-t border-[#FFFCF2]" style={{ background: "#000000" }}>
      <div className="max-w-300 mx-auto px-12 py-12 flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4">
          <p className="text-[#FFFCF2] text-[16px]" style={{ fontFamily: "Poppins, sans-serif" }}>
            Follow Us
          </p>
          {links.length > 0 ? (
            <div className="flex gap-4">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  aria-label={link.label ?? link.platform}
                  target={link.platform === "email" ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="w-9.5 h-9.5 flex items-center justify-center rounded-full border border-[rgba(255,252,242,0.2)] hover:border-[rgba(255,252,242,0.6)] transition-colors"
                >
                  {ICONS[link.platform] ?? ICONS.other}
                </a>
              ))}
            </div>
          ) : (
            <p className="text-[rgba(255,252,242,0.4)] text-sm">No links added yet</p>
          )}
        </div>
      </div>

      <div className="w-full border-t border-[rgba(255,252,242,0.1)] py-8 flex justify-center">
        <p className="text-[rgba(255,252,242,0.6)] text-[16px] text-center" style={{ fontFamily: "Poppins, sans-serif", letterSpacing: "-0.3125px" }}>
          © {year} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
