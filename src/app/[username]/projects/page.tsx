import { notFound } from "next/navigation";
import { getPortfolioByUsername } from "@/lib/queries/portfolio";
import AllProjectsView from "@/themes/lota/components/AllProjectsView";
import { brandingProjects, webAppsProjects } from "@/themes/lota/data";

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { username } = await params;
  const { type } = await searchParams;

  // const portfolio = await getPortfolioByUsername(username);
  // if (!portfolio) notFound();

  const projectType = type === "webapps" ? "webapps" : "branding";
  const projects = projectType === "webapps" ? webAppsProjects : brandingProjects;

  return (
    <AllProjectsView
      type={projectType}
      projects={projects}
      backHref={`/${username}`}
    />
  );
}
