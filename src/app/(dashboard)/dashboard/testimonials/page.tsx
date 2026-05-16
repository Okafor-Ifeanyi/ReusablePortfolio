import { redirect } from 'next/navigation'
import { getCurrentPortfolio } from '@/lib/queries/portfolio'
import TestimonialsSection from './TestimonialsSection'

export default async function TestimonialsPage() {
  const portfolio = await getCurrentPortfolio()
  if (!portfolio) redirect('/login')

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Testimonials</h1>
        <p className="text-sm text-gray-500 mt-1">What people say about your work</p>
      </div>
      <TestimonialsSection testimonials={portfolio.testimonials} />
    </div>
  )
}
