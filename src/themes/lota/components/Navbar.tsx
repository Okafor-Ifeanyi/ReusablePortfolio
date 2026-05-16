"use client";
import { BORDER } from "./ServicesGrid";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-8">
      {/* Logo — two stacked circles + filled pill body (bee/smiley mark from Figma) */}
      <div className="flex flex-col items-center gap-[0.78px] w-[31px]">
        <img src="/images/lota-logo.svg" alt="Lota Logo" />
      </div>

      {/* Nav links */}
      <div className="flex items-center gap-8">
        <a href="#services" className="text-cream text-[18px] hover:opacity-70 transition-opacity">Services</a>
        <a href="#projects" className="text-cream text-[18px] hover:opacity-70 transition-opacity">Projects</a>
        <a href="#about" className="text-cream text-[18px] hover:opacity-70 transition-opacity">About Me</a>
        <span
          className="rounded-full p-px"
          style={{ background: BORDER }}
        >
          <a
            href="#contact"
            className="block px-6 py-[5px] rounded-full text-cream text-[18px] transition-opacity hover:opacity-80"
            style={{ background: "#0F0F0F" }}
          >
            Contact
          </a>
        </span>
      </div>
    </nav>
  );
}
