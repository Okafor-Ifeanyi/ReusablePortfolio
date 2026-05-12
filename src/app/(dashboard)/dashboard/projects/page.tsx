import { redirect } from 'next/navigation'
import { getCurrentPortfolio } from '@/lib/queries/portfolio'
import ProjectsSection from './ProjectsSection'

export default async function ProjectsPage() {
  const portfolio = await getCurrentPortfolio()
  if (!portfolio) redirect('/dashboard')

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">Projects</h1>
      <p className="text-sm text-gray-500 mb-6">Showcase the work you&apos;re most proud of.</p>
      <ProjectsSection projects={portfolio.projects} availableSkills={portfolio.skills} />
    </div>
  )
}
