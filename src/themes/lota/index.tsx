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
import type { PortfolioData } from "@/lib/queries/portfolio";
import "./lota.css";

// ── Serialisable types ──────────────────────────────────────────────────────

export type LotaHero = {
  role: string | null;       // hero.headline — shown in bordered box
  bio: string | null;
  avatarUrl: string | null;
} | null;

export type LotaProject = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  coverImageUrl: string | null;
  url: string | null;
  repoUrl: string | null;
  duration: string | null;
  projectType: string | null;
  category: string | null;
  tags: string[];
};

export type LotaTestimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
};

export type LotaLink = {
  id: string;
  platform: string;
  url: string;
  label: string | null;
};

export type LotaSkill = { id: string; name: string; category: string | null };

// ── Serialiser ──────────────────────────────────────────────────────────────

function serialize(portfolio: PortfolioData) {
  const hero: LotaHero = portfolio.hero
    ? {
        role: portfolio.hero.headline || null,
        bio: portfolio.hero.bio,
        avatarUrl: portfolio.hero.avatarUrl ?? portfolio.user.avatarUrl,
      }
    : null;

  const projects: LotaProject[] = portfolio.projects.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    coverImageUrl: p.coverImageUrl,
    url: p.url,
    repoUrl: p.repoUrl,
    duration: p.duration,
    projectType: p.projectType,

    category: (p as any).category ?? null,

    tags: p.projectSkills.map((ps) => ps.skill.name),
  }));

  const testimonials: LotaTestimonial[] = portfolio.testimonials.map((t) => ({
    id: t.id,
    name: t.name,
    role: t.role,
    text: t.text,
  }));

  const links: LotaLink[] = portfolio.links.map((l) => ({
    id: l.id,
    platform: l.platform,
    url: l.url,
    label: l.label,
  }));

  const skills: LotaSkill[] = portfolio.skills.map((s) => ({
    id: s.id,
    name: s.name,
    category: s.category,
  }));

  return {
    fullName: portfolio.user.fullName ?? portfolio.user.username,
    username: portfolio.user.username,
    hero,
    projects,
    testimonials,
    links,
    skills,
  };
}

// ── Theme component ─────────────────────────────────────────────────────────

export default function Home({ portfolio }: ThemeProps) {
  const data = portfolio ? serialize(portfolio) : null;

  const byCategory = (cat: string) =>
    data?.projects.filter((p) => p.category === cat) ?? [];

  return (
    <main data-theme="lota" className="flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-360 px-20">
        <Navbar />
        <Hero fullName={data?.fullName ?? null} hero={data?.hero ?? null} />
      </div>
      <Marquee />
      <div className="w-full px-20 flex flex-col gap-24 pb-24">
        <ServicesGrid />
        <BrandingProjects
          projects={byCategory("branding")}
          username={data?.username ?? ""}
        />
        <WebApps
          projects={byCategory("webapps")}
          username={data?.username ?? ""}
        />
        <MeetLota
          hero={data?.hero ?? null}
          fullName={data?.fullName ?? null}
          skills={data?.skills ?? []}
        />
        <Pitchdecks projects={byCategory("pitchdeck")} />
        <Graphics projects={byCategory("graphic")} />
        <Testimonials testimonials={data?.testimonials ?? []} />
      </div>
      <Footer links={data?.links ?? []} fullName={data?.fullName ?? null} />
    </main>
  );
}
