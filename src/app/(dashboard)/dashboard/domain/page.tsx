import { redirect } from 'next/navigation'
import { getCurrentPortfolio } from '@/lib/queries/portfolio'
import DomainSection from './DomainSection'

export default async function DomainPage() {
  const portfolio = await getCurrentPortfolio()
  if (!portfolio) redirect('/login')

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-1">Domain</h1>
      <p className="text-sm text-gray-500 mb-8">Manage where your portfolio lives.</p>
      <DomainSection portfolio={portfolio} />
    </div>
  )
}
