import { redirect } from 'next/navigation'
import { getCurrentPortfolio } from '@/lib/queries/portfolio'
import LinksSection from './LinksSection'

export default async function LinksPage() {
  const portfolio = await getCurrentPortfolio()
  if (!portfolio) redirect('/dashboard')

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">Links</h1>
      <p className="text-sm text-gray-500 mb-6">How people can find and contact you.</p>
      <LinksSection links={portfolio.links} />
    </div>
  )
}
