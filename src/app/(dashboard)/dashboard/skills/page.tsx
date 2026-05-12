import { redirect } from 'next/navigation'
import { getCurrentPortfolio } from '@/lib/queries/portfolio'
import SkillsSection from './SkillsSection'

export default async function SkillsPage() {
  const portfolio = await getCurrentPortfolio()
  if (!portfolio) redirect('/dashboard')

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">Skills</h1>
      <p className="text-sm text-gray-500 mb-6">Technologies and tools you work with.</p>
      <SkillsSection skills={portfolio.skills} />
    </div>
  )
}
