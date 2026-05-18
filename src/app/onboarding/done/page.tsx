import { redirect } from 'next/navigation'
import { getCurrentPortfolio } from '@/lib/queries/portfolio'
import HostingChoice from './HostingChoice'

export default async function DonePage() {
  const portfolio = await getCurrentPortfolio()
  if (!portfolio) redirect('/login')

  if (portfolio.isHosted) redirect('/dashboard')

  return (
    <div className="min-h-screen bg-[#07070F] flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg text-center mb-10">
        <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
          <span className="text-green-400 text-xl">✓</span>
        </div>
        <h1 className="text-white text-3xl font-semibold mb-2">Your portfolio is ready</h1>
        <p className="text-white/40 text-sm">Choose how you want to publish it.</p>
      </div>

      <HostingChoice username={portfolio.user.username} fullName={portfolio.user.fullName} />
    </div>
  )
}
