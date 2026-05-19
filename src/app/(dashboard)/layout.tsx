import { redirect } from 'next/navigation'
import { getCurrentPortfolio } from '@/lib/queries/portfolio'
import DashboardNav from './components/DashboardNav'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const portfolio = await getCurrentPortfolio()
  if (!portfolio) redirect('/login')

  const theme = portfolio.theme.slug

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top bar */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 shrink-0">
        <Link href="/" className="font-semibold text-gray-900 text-[15px] tracking-tight">
          Folio
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href={`/${portfolio.user.username}`}
            target="_blank"
            className="text-xs text-gray-500 hover:text-gray-900 border border-gray-200 px-3 py-1.5 rounded-lg hover:border-gray-400 transition-colors"
          >
            Preview ↗
          </Link>
          <UserButton />
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        <DashboardNav theme={theme} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-20 md:pb-8">
          <div className="max-w-2xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
