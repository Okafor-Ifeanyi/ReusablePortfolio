'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/hero', label: 'Hero' },
  { href: '/dashboard/experience', label: 'Experience' },
  { href: '/dashboard/skills', label: 'Skills' },
  { href: '/dashboard/projects', label: 'Projects' },
  { href: '/dashboard/links', label: 'Links' },
]

export default function DashboardNav() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 bg-white flex flex-col p-6 gap-1">
      <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-4">
        Portfolio
      </p>
      {NAV.map(({ href, label }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`text-sm px-3 py-2 rounded-lg transition-colors ${
              active
                ? 'bg-gray-900 text-white font-medium'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            {label}
          </Link>
        )
      })}
    </aside>
  )
}
