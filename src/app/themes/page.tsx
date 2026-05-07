import Link from 'next/link'
import { THEME_REGISTRY } from '@/lib/themes'

export default function ThemesPage() {
  const slugs = Object.keys(THEME_REGISTRY)

  return (
    <main className="min-h-screen p-12">
      <h1 className="text-3xl font-bold mb-2">Available Themes</h1>
      <p className="text-sm text-gray-500 mb-10">
        {slugs.length} theme{slugs.length !== 1 ? 's' : ''} registered
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {slugs.map((slug) => (
          <Link
            key={slug}
            href={`/themes/${slug}`}
            className="group block border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition-colors"
          >
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">theme</p>
            <p className="text-xl font-semibold capitalize group-hover:underline">{slug}</p>
            <p className="text-sm text-gray-400 mt-2">Preview →</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
