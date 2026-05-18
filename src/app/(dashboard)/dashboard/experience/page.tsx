import { redirect } from 'next/navigation'
import { getCurrentPortfolio } from '@/lib/queries/portfolio'
import ExperienceSection from './ExperienceSection'

export default async function ExperiencePage() {
  const portfolio = await getCurrentPortfolio()
  if (!portfolio) redirect('/dashboard')

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">Experience</h1>
      <p className="text-sm text-gray-500 mb-6">Your work history, most recent first.</p>
      <ExperienceSection experiences={portfolio.experiences} />
    </div>
  )
}
