import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentPortfolio } from '@/lib/queries/portfolio'
import { ProfileNameEdit } from '@/app/(dashboard)/components/ProfileNameEdit'

const SECTIONS = [
  { href: '/dashboard/hero', label: 'Hero', key: 'hero', desc: 'Headline, bio, and CTA button' },
  { href: '/dashboard/experience', label: 'Experience', key: 'experiences', desc: 'Work history' },
  { href: '/dashboard/skills', label: 'Skills', key: 'skills', desc: 'Technical skills and categories' },
  { href: '/dashboard/projects', label: 'Projects', key: 'projects', desc: 'Showcase your work' },
  { href: '/dashboard/links', label: 'Links', key: 'links', desc: 'Social and contact links' },
] as const

export default async function DashboardPage() {
  const portfolio = await getCurrentPortfolio()
  if (!portfolio) redirect('/login')

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <ProfileNameEdit fullName={portfolio.user.fullName} />
          <p className="text-sm text-gray-500 mt-1">/{portfolio.user.username}</p>
        </div>
        <Link
          href={`/${portfolio.user.username}`}
          target="_blank"
          className="text-sm text-gray-600 hover:text-gray-900 border border-gray-200 px-3 py-1.5 rounded-lg hover:border-gray-400 transition-colors"
        >
          Preview ↗
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SECTIONS.map(({ href, label, key, desc }) => {
          const value = portfolio[key]
          const filled = Array.isArray(value) ? value.length > 0 : value !== null
          return (
            <Link
              key={href}
              href={href}
              className="block border border-gray-200 bg-white rounded-xl p-5 hover:border-gray-400 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    filled ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {filled
                    ? Array.isArray(value) ? `${value.length} added` : 'Set'
                    : 'Empty'}
                </span>
              </div>
              <p className="text-xs text-gray-400">{desc}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
