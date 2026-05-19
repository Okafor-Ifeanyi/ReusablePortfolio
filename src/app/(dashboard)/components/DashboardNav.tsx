'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

const BIO_NAV = [
  { href: '/dashboard',            label: 'Overview' },
  { href: '/dashboard/hero',       label: 'Hero' },
  { href: '/dashboard/experience', label: 'Experience' },
  { href: '/dashboard/skills',     label: 'Skills' },
  { href: '/dashboard/projects',   label: 'Projects' },
  { href: '/dashboard/links',      label: 'Links' },
  { href: '/dashboard/domain',     label: 'Domain' },
]

const LOTA_NAV = [
  { href: '/dashboard',                             label: 'Overview' },
  { href: '/dashboard/hero',                        label: 'Profile' },
  { href: '/dashboard/projects?category=branding',  label: 'Branding' },
  { href: '/dashboard/projects?category=webapps',   label: 'Web Apps' },
  { href: '/dashboard/projects?category=pitchdeck', label: 'Pitchdecks' },
  { href: '/dashboard/projects?category=graphic',   label: 'Graphics' },
  { href: '/dashboard/skills',                      label: 'Skills' },
  { href: '/dashboard/testimonials',                label: 'Testimonials' },
  { href: '/dashboard/links',                       label: 'Links' },
  { href: '/dashboard/domain',                      label: 'Domain' },
]

export default function DashboardNav({ theme }: { theme: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const nav = theme === 'lota' ? LOTA_NAV : BIO_NAV

  function isActive(href: string) {
    const [hrefPath, hrefQuery] = href.split('?')
    if (hrefQuery) {
      const [key, val] = hrefQuery.split('=')
      return pathname === hrefPath && searchParams.get(key) === val
    }
    return pathname === hrefPath && !searchParams.has('category')
  }

  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────────── */}
      <aside className="hidden md:flex w-52 shrink-0 border-r border-gray-200 bg-white flex-col py-6 px-3 gap-0.5">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-3 px-3">
          {theme === 'lota' ? 'Lota' : 'BIO'} theme
        </p>
        {nav.map(({ href, label }) => {
          const active = isActive(href)
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

      {/* ── Mobile bottom nav ───────────────────────────────── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div
          className="flex overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {nav.map(({ href, label }) => {
            const active = isActive(href)
            return (
              <Link
                key={href}
                href={href}
                className={`relative flex-shrink-0 flex items-center justify-center px-4 py-3.5 text-[11px] font-medium whitespace-nowrap transition-colors ${
                  active ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {active && (
                  <span className="absolute top-0 left-2 right-2 h-0.5 bg-gray-900 rounded-b" />
                )}
                {label}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
