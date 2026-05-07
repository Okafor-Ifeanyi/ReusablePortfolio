import { notFound } from 'next/navigation'
import { THEME_REGISTRY } from '@/lib/themes'

export default async function ThemePreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const ThemeComponent = THEME_REGISTRY[slug]

  if (!ThemeComponent) notFound()

  return <ThemeComponent />
}
