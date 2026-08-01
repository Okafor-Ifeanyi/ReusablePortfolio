"use client";

import React, { useRef, useEffect, useState } from "react";
import type { BioLink } from "../index";

const E  = "cubic-bezier(0.16,1,0.3,1)";
const SP = "cubic-bezier(0.34,1.56,0.64,1)";

const ICONS: Record<string, React.ReactElement> = {
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  twitter: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.67">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  dribbble: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.67">
      <circle cx="12" cy="12" r="10" />
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
    </svg>
  ),
  email: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.67">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  website: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.67">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  other: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.67">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
};

export default function Footer({
  links,
  fullName,
}: {
  links: BioLink[];
  fullName: string | null;
}) {
  const footerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const year = new Date().getFullYear();
  const name = fullName ?? "Portfolio";

  return (
    <footer
      ref={footerRef}
      className="bg-[#08080E] border-t border-[#FFFCF2] w-full"
    >
      <div className="flex flex-col items-center justify-center py-10 sm:py-12 px-6 gap-6 w-full">
        {/* Contact heading */}
        <div
          className="flex flex-col items-center gap-2"
          style={{
            filter: "drop-shadow(0px 0px 30px rgba(255,255,255,0.3))",
            opacity: visible ? undefined : 0,
            animation: visible ? `bio-fade-up 0.7s ${E} 0.1s both` : "none",
          }}
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

        {/* Social icons — each pops in with a spring, staggered */}
        {links.length > 0 && (
          <div className="flex flex-row items-center gap-4 flex-wrap justify-center">
            {links.map((link, i) => (
              <a
                key={link.id}
                href={link.url}
                target={link.platform === "email" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                aria-label={link.label ?? link.platform}
                className="flex items-center justify-center w-9.5 h-9.5 rounded-full border border-[#636363] text-[#FCFCFF] hover:border-[#FCFCFF] hover:scale-110 transition-all duration-200"
                style={{
                  opacity: visible ? undefined : 0,
                  animation: visible
                    ? `bio-icon-pop 0.6s ${SP} ${0.3 + i * 0.06}s both`
                    : "none",
                }}
              >
                {ICONS[link.platform] ?? ICONS.other}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Copyright — last to arrive */}
      <div
        className="flex items-center justify-center py-6 sm:py-8 px-6"
        style={{
          borderTop: "1px solid rgba(255,252,242,0.1)",
          opacity: visible ? undefined : 0,
          animation: visible ? `bio-fade-in 0.8s ${E} 0.55s both` : "none",
        }}
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
          © {year} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
