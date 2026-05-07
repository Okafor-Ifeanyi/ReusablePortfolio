import { notFound } from 'next/navigation'
import { getPortfolioByUsername } from '@/lib/queries/portfolio'
import { THEME_REGISTRY } from '@/lib/themes'

export default async function UsernamePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const portfolio = await getPortfolioByUsername(username)

  if (!portfolio) notFound()

  const ThemeComponent = THEME_REGISTRY[portfolio.theme.slug]

  if (!ThemeComponent) notFound()

  return <ThemeComponent portfolio={portfolio} />
}
