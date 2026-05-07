import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import ServicesGrid from "./components/ServicesGrid";
import BrandingProjects from "./components/BrandingProjects";
import WebApps from "./components/WebApps";
import MeetLota from "./components/MeetLota";
import Pitchdecks from "./components/Pitchdecks";
import Graphics from "./components/Graphics";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import type { ThemeProps } from "@/lib/themes";

export default function Home({ portfolio: _portfolio }: ThemeProps) {
  return (
    <main className="flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-360 px-20">
        <Navbar />
        <Hero />
      </div>
      <Marquee />
      <div className="w-full max-w-300 px-20 flex flex-col gap-24 pb-24">
        <ServicesGrid />
        <BrandingProjects />
        {/* <WebApps /> Meant to be a new page */}
        <MeetLota />
        <Pitchdecks />
        <Graphics />
        <Testimonials />
      </div>
      <Footer />
    </main>
  );
}
