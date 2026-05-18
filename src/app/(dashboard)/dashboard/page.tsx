import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentPortfolio } from '@/lib/queries/portfolio'
import { ProfileNameEdit } from '@/app/(dashboard)/components/ProfileNameEdit'
import type { PortfolioData } from '@/lib/queries/portfolio'

type Section = {
  href: string
  label: string
  desc: string
  count?: (p: PortfolioData) => number | null
  filled?: (p: PortfolioData) => boolean
}

const BIO_SECTIONS: Section[] = [
  { href: '/dashboard/hero',       label: 'Hero',       desc: 'Headline, bio, and CTA button',       filled: p => p.hero !== null },
  { href: '/dashboard/experience', label: 'Experience', desc: 'Work history',                         count: p => p.experiences.length },
  { href: '/dashboard/skills',     label: 'Skills',     desc: 'Technical skills and categories',      count: p => p.skills.length },
  { href: '/dashboard/projects',   label: 'Projects',   desc: 'Showcase your work',                   count: p => p.projects.length },
  { href: '/dashboard/links',      label: 'Links',      desc: 'Social and contact links',             count: p => p.links.length },
]

const LOTA_SECTIONS: Section[] = [
  { href: '/dashboard/hero',         label: 'Profile',      desc: 'Name, role, bio and photo',                filled: p => p.hero !== null },
  { href: '/dashboard/projects?category=branding',  label: 'Branding Projects', desc: 'Brand identity work',  count: p => p.projects.filter(x => x.category === 'branding').length },
  { href: '/dashboard/projects?category=webapps',   label: 'Web Apps',          desc: 'Web products & apps',  count: p => p.projects.filter(x => x.category === 'webapps').length },
  { href: '/dashboard/projects?category=pitchdeck', label: 'Pitchdecks',        desc: 'Presentation decks',   count: p => p.projects.filter(x => x.category === 'pitchdeck').length },
  { href: '/dashboard/projects?category=graphic',   label: 'Graphics',          desc: 'Graphic design work',  count: p => p.projects.filter(x => x.category === 'graphic').length },
  { href: '/dashboard/skills',       label: 'Skills',       desc: 'What you do',                              count: p => p.skills.length },
  { href: '/dashboard/testimonials', label: 'Testimonials', desc: 'Client feedback',                         count: p => p.testimonials.length },
  { href: '/dashboard/links',        label: 'Links',        desc: 'Social and contact links',                 count: p => p.links.length },
]

export default async function DashboardPage() {
  const portfolio = await getCurrentPortfolio()
  if (!portfolio) redirect('/login')

  const isLota = portfolio.theme.slug === 'lota'
  const sections = isLota ? LOTA_SECTIONS : BIO_SECTIONS

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
        {sections.map(({ href, label, desc, count, filled }) => {
          const n = count?.(portfolio)
          const isFilled = filled ? filled(portfolio) : (n ?? 0) > 0
          return (
            <Link
              key={href}
              href={href}
              className="block border border-gray-200 bg-white rounded-xl p-5 hover:border-gray-400 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isFilled ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {isFilled ? (n != null ? `${n} added` : 'Set') : 'Empty'}
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
