"use client";
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-8">
      {/* Logo — two stacked circles + filled pill body (bee/smiley mark from Figma) */}
      <div className="flex flex-col items-center gap-[0.78px] w-[31px]">
        <div className="flex gap-[5.61px]">
          <div className="w-[10.51px] h-[10.51px] rounded-full border-[2.5px] border-gold" />
          <div className="w-[10.51px] h-[10.51px] rounded-full border-[2.5px] border-gold" />
        </div>
        <div className="w-[31px] h-[23px] bg-gold rounded-b-full relative">
          <div className="absolute bottom-0 left-0 right-0 h-[2.76px] bg-black" />
        </div>
      </div>

      {/* Nav links */}
      <div className="flex items-center gap-8">
        <a href="#services" className="text-cream text-[18px] hover:opacity-70 transition-opacity">Services</a>
        <a href="#projects" className="text-cream text-[18px] hover:opacity-70 transition-opacity">Projects</a>
        <a href="#about" className="text-cream text-[18px] hover:opacity-70 transition-opacity">About Me</a>
        <a
          href="#contact"
          className="px-6 py-[5px] bg-white/10 rounded-full text-cream text-[18px] hover:bg-white/20 transition-colors"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
