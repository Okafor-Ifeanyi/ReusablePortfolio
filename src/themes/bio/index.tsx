import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/theme.provider";
import type { ThemeProps } from "@/lib/themes";
import "./bio.css"

export default function Home({ portfolio: _portfolio }: ThemeProps) {
  return (
    <main className="relative bg-red-500 overflow-x-hidden">
      <ThemeProvider>
        <Navbar />
        <Hero />
        <Projects />
        <AboutMe />
        <Skills />
        <Experience />
        <Footer />
      </ThemeProvider>
    </main>
  );
}
