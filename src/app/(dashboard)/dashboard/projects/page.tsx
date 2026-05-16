import { redirect } from 'next/navigation'
import { getCurrentPortfolio } from '@/lib/queries/portfolio'
import ProjectsSection from './ProjectsSection'

const CATEGORY_META: Record<string, { title: string; desc: string }> = {
  branding:  { title: 'Branding Projects', desc: 'Brand identity and visual design work' },
  webapps:   { title: 'Web Apps',          desc: 'Web products and applications' },
  pitchdeck: { title: 'Pitchdecks',        desc: 'Presentation decks' },
  graphic:   { title: 'Graphics',          desc: 'Graphic design work' },
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const portfolio = await getCurrentPortfolio()
  if (!portfolio) redirect('/dashboard')

  const { category } = await searchParams
  const meta = category ? CATEGORY_META[category] : null

  const projects = category
    ? portfolio.projects.filter((p) => (p as any).category === category)
    : portfolio.projects

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">{meta?.title ?? 'Projects'}</h1>
      <p className="text-sm text-gray-500 mb-6">{meta?.desc ?? 'Showcase the work you\'re most proud of.'}</p>
      <ProjectsSection
        projects={projects}
        availableSkills={portfolio.skills}
        defaultCategory={category}
      />
    </div>
  )
}
