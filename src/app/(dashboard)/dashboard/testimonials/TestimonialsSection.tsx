'use client'

import { useState, useTransition } from 'react'
import { createTestimonial, updateTestimonial, deleteTestimonial } from '@/lib/actions/testimonials'
import type { PortfolioData } from '@/lib/queries/portfolio'
import { SubmitButton, DeleteButton } from '@/app/(dashboard)/components/SubmitButton'

type Testimonial = PortfolioData['testimonials'][number]

const input = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
const label = 'block text-sm font-medium text-gray-700 mb-1'

function TestimonialForm({ t, onCancel }: { t?: Testimonial; onCancel?: () => void }) {
  const [isPending, startTransition] = useTransition()
  const action = t ? updateTestimonial.bind(null, t.id) : createTestimonial

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => { await action(fd); onCancel?.() })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 border border-gray-200 rounded-xl bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Name <span className="text-red-400">*</span></label>
          <input name="name" required defaultValue={t?.name ?? ''} placeholder="Sarah O." className={input} />
        </div>
        <div>
          <label className={label}>Role <span className="text-red-400">*</span></label>
          <input name="role" required defaultValue={t?.role ?? ''} placeholder="Startup Founder" className={input} />
        </div>
      </div>
      <div>
        <label className={label}>Quote <span className="text-red-400">*</span></label>
        <textarea name="text" required rows={3} defaultValue={t?.text ?? ''} placeholder="What did they say about your work?" className={`${input} resize-none`} />
      </div>
      <div className="flex gap-2 justify-end">
        {onCancel && <button type="button" onClick={onCancel} className="text-sm text-gray-400 hover:text-gray-700 px-3 py-1.5">Cancel</button>}
        <SubmitButton pending={isPending}>{t ? 'Save' : 'Add'}</SubmitButton>
      </div>
    </form>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const [editing, setEditing] = useState(false)

  if (editing) return <TestimonialForm t={t} onCancel={() => setEditing(false)} />

  return (
    <div className="flex items-start justify-between gap-4 p-5 border border-gray-200 rounded-xl bg-white">
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <p className="text-sm text-gray-700 italic">&ldquo;{t.text}&rdquo;</p>
        <p className="text-sm font-medium text-gray-900 mt-1">{t.name}</p>
        <p className="text-xs text-gray-400">{t.role}</p>
      </div>
      <div className="flex gap-2 shrink-0">
        <button onClick={() => setEditing(true)} className="text-xs text-gray-400 hover:text-gray-700 border border-gray-200 px-2.5 py-1 rounded-lg hover:border-gray-400 transition-colors">Edit</button>
        <form action={deleteTestimonial.bind(null, t.id)}>
          <DeleteButton />
        </form>
      </div>
    </div>
  )
}

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [adding, setAdding] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      {testimonials.map(t => <TestimonialCard key={t.id} t={t} />)}
      {adding ? (
        <TestimonialForm onCancel={() => setAdding(false)} />
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="w-full border border-dashed border-gray-300 rounded-xl py-3 text-sm text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors"
        >
          + Add testimonial
        </button>
      )}
    </div>
  )
}
