"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./theme.provider";

const E = "cubic-bezier(0.16,1,0.3,1)";

export default function Navbar({ name }: { name: string | null }) {
  const { theme, toggleTheme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setLoaded(true); }, []);

  return (
    <header
      className="sticky top-0 z-50 bg-light-bg dark:bg-dark-bg backdrop-blur-sm transition-colors duration-300"
      style={{
        opacity: loaded ? undefined : 0,
        animation: loaded ? `bio-fade-in 0.5s ${E} both` : "none",
      }}
    >
      <nav className="max-w-360 mx-auto px-15 py-5.5 flex items-center justify-between">
        <span
          className="text-[24px] tracking-design text-light-text dark:text-dark-text font-power leading-[150%]"
          style={{
            opacity: loaded ? undefined : 0,
            animation: loaded ? `bio-slide-left 0.8s ${E} 0.1s both` : "none",
          }}
        >
          {name ?? "Portfolio"}
        </span>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-7.5 h-7.5 flex items-center justify-center text-light-text dark:text-dark-text hover:opacity-70 transition-opacity"
          style={{
            opacity: loaded ? undefined : 0,
            animation: loaded ? `bio-slide-right 0.8s ${E} 0.15s both` : "none",
          }}
        >
          {theme === "light" ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
              <line x1="12" y1="1"  x2="12" y2="3"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="1"  y1="12" x2="3"  y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
}
