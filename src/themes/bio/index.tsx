import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/theme.provider";
import type { ThemeProps } from "@/lib/themes";
import type { PortfolioData } from "@/lib/queries/portfolio";
import "./bio.css";

// Serialisable shapes passed to client components (no Date objects)
export type BioHero = {
  headline: string;
  subheadline: string | null;
  bio: string | null;
  avatarUrl: string | null;
  openToWork: boolean;
  ctaLabel: string | null;
  ctaUrl: string | null;
} | null;

export type BioExperience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string | null;
};

export type BioProject = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  url: string | null;
  repoUrl: string | null;
  coverImageUrl: string | null;
  duration: string | null;
  projectType: string | null;
  featured: boolean;
  skills: string[];
};

export type BioSkill = {
  id: string;
  name: string;
  category: string | null;
};

export type BioLink = {
  id: string;
  platform: string;
  url: string;
  label: string | null;
};

function fmt(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function serialize(portfolio: PortfolioData) {
  const experiences: BioExperience[] = portfolio.experiences.map((e) => ({
    id: e.id,
    role: e.role,
    company: e.company,
    period: `${fmt(e.startDate)} – ${e.isCurrent || !e.endDate ? "Present" : fmt(e.endDate)}`,
    description: e.description,
  }));

  const projects: BioProject[] = portfolio.projects.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    url: p.url,
    repoUrl: p.repoUrl,
    coverImageUrl: p.coverImageUrl,
    duration: p.duration,
    projectType: p.projectType,
    featured: p.featured,
    skills: p.projectSkills.map((ps) => ps.skill.name),
  }));

  const skills: BioSkill[] = portfolio.skills.map((s) => ({
    id: s.id,
    name: s.name,
    category: s.category,
  }));

  const links: BioLink[] = portfolio.links.map((l) => ({
    id: l.id,
    platform: l.platform,
    url: l.url,
    label: l.label,
  }));

  const hero: BioHero = portfolio.hero
    ? {
        headline: portfolio.hero.headline,
        subheadline: portfolio.hero.subheadline,
        bio: portfolio.hero.bio,
        avatarUrl: portfolio.hero.avatarUrl ?? portfolio.user.avatarUrl,
        openToWork: portfolio.hero.openToWork,
        ctaLabel: portfolio.hero.ctaLabel,
        ctaUrl: portfolio.hero.ctaUrl,
      }
    : null;

  const computed = (() => {
    const earliest = portfolio.experiences.length > 0
      ? Math.min(...portfolio.experiences.map((e) => e.startDate.getTime()))
      : null;
    return earliest
      ? Math.max(1, Math.round((Date.now() - earliest) / (1000 * 60 * 60 * 24 * 365)))
      : 0;
  })();
  const yearsExperience = portfolio.hero?.yearsExperience ?? computed;

  return {
    fullName: portfolio.user.fullName ?? portfolio.user.username,
    hero,
    experiences,
    projects,
    skills,
    links,
    yearsExperience,
  };
}

export default function Home({ portfolio }: ThemeProps) {
  const data = portfolio ? serialize(portfolio) : null;

  return (
    <main data-theme="bio" className="relative overflow-x-hidden">
      <ThemeProvider>
        <Navbar name={data?.fullName ?? null} />
        <Hero
          hero={data?.hero ?? null}
          yearsExperience={data?.yearsExperience ?? 0}
          projectsCount={data?.projects.length ?? 0}
        />
        <Projects projects={data?.projects ?? []} />
        <AboutMe
          hero={data?.hero ?? null}
          fullName={data?.fullName ?? null}
          yearsExperience={data?.yearsExperience ?? 0}
          projectsCount={data?.projects.length ?? 0}
        />
        <Skills skills={data?.skills ?? []} />
        <Experience experiences={data?.experiences ?? []} />
        <Footer links={data?.links ?? []} fullName={data?.fullName ?? null} />
      </ThemeProvider>
    </main>
  );
}
