import { redirect } from 'next/navigation'
import { getCurrentPortfolio } from '@/lib/queries/portfolio'
import HeroForm from './HeroForm'

export default async function HeroPage() {
  const portfolio = await getCurrentPortfolio()
  if (!portfolio) redirect('/onboarding')

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">Hero</h1>
      <p className="text-sm text-gray-500 mb-6">The first thing visitors see on your portfolio.</p>
      <HeroForm hero={portfolio.hero} />
    </div>
  )
}
