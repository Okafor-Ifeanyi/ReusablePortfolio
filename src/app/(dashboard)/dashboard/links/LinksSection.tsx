'use client'

import { useTransition } from 'react'
import { createLink, deleteLink } from '@/lib/actions/links'
import type { PortfolioData } from '@/lib/queries/portfolio'
import { SubmitButton, DeleteButton } from '@/app/(dashboard)/components/SubmitButton'
import { useFormDraft } from '@/lib/hooks/useFormDraft'
import { DraftBanner } from '@/app/(dashboard)/components/DraftBanner'

type Link = PortfolioData['links'][number]

const input = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
const label = 'block text-sm font-medium text-gray-700 mb-1'

const PLATFORMS = ['github', 'linkedin', 'twitter', 'dribbble', 'email', 'website', 'other']
const PLATFORM_ICONS: Record<string, string> = {
  github: 'GH', linkedin: 'LI', twitter: 'TW',
  dribbble: 'DR', email: '@', website: '🌐', other: '↗',
}

function AddLinkForm() {
  const [isPending, startTransition] = useTransition()
  const { ready, hasDraft, revision, onFormChange, wipeDraft, clearDraft, field } = useFormDraft('draft:link:new')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      await createLink(fd)
      wipeDraft()
    })
  }

  if (!ready) return <div className="h-40 rounded-xl bg-gray-50 animate-pulse" />

  return (
    <div className="flex flex-col gap-3">
      {hasDraft && <DraftBanner onDiscard={clearDraft} />}
      <form key={revision} onSubmit={handleSubmit} onChange={onFormChange} className="flex flex-col gap-4 p-5 border border-dashed border-gray-300 rounded-xl">
      <p className="text-sm font-medium text-gray-700">Add a link</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Platform <span className="text-red-400">*</span></label>
          <select name="platform" required defaultValue={field('platform', 'github')} className={input}>
            {PLATFORMS.map((p) => <option key={p} value={p} className="capitalize">{p}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Label</label>
          <input name="label" defaultValue={field('label', '')} placeholder="Optional display name" className={input} />
        </div>
      </div>
      <div>
        <label className={label}>URL <span className="text-red-400">*</span></label>
        <input name="url" required defaultValue={field('url', '')} placeholder="https://..." className={input} />
      </div>
      <div>
        <SubmitButton pending={isPending}>Add link</SubmitButton>
      </div>
    </form>
    </div>
  )
}

export default function LinksSection({ links }: { links: Link[] }) {
  return (
    <div className="flex flex-col gap-6">
      {links.length > 0 && (
        <div className="flex flex-col gap-2">
          {links.map((link) => (
            <div key={link.id} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-white">
              <span className="w-8 h-8 shrink-0 flex items-center justify-center bg-gray-100 rounded-lg text-xs font-bold text-gray-600">
                {PLATFORM_ICONS[link.platform] ?? '↗'}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium capitalize truncate">{link.label ?? link.platform}</p>
                <p className="text-xs text-gray-400 truncate">{link.url}</p>
              </div>
              <form action={deleteLink.bind(null, link.id)} className="shrink-0">
                <DeleteButton />
              </form>
            </div>
          ))}
        </div>
      )}

      {links.length === 0 && <p className="text-sm text-gray-400 py-2">No links added yet.</p>}

      <AddLinkForm />
    </div>
  )
}
