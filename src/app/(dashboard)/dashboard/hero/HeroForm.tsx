'use client'

import { useTransition } from 'react'
import { upsertHero } from '@/lib/actions/hero'
import type { PortfolioData } from '@/lib/queries/portfolio'
import { SubmitButton } from '@/app/(dashboard)/components/SubmitButton'
import { ImageUpload } from '@/app/(dashboard)/components/ImageUpload'
import { useFormDraft } from '@/lib/hooks/useFormDraft'
import { DraftBanner } from '@/app/(dashboard)/components/DraftBanner'

type Hero = PortfolioData['hero']

const input = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
const label = 'block text-sm font-medium text-gray-700 mb-1'

export default function HeroForm({ hero }: { hero: Hero }) {
  const [, startTransition] = useTransition()
  const { ready, hasDraft, revision, onFormChange, wipeDraft, clearDraft, field, checked } = useFormDraft('draft:hero', hero?.updatedAt)

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      await upsertHero(fd)
      wipeDraft()
    })
  }

  if (!ready) {
    return <div className="h-96 rounded-xl bg-gray-50 animate-pulse" />
  }

  return (
    <div className="flex flex-col gap-5">
      {hasDraft && <DraftBanner onDiscard={clearDraft} />}
      <form key={revision} onSubmit={handleSubmit} onChange={onFormChange} className="flex flex-col gap-5">
      <div>
        <label className={label}>Headline <span className="text-red-400">*</span></label>
        <input name="headline" required defaultValue={field('headline', hero?.headline ?? '')} placeholder="e.g. Fullstack Developer" className={input} />
      </div>

      <div>
        <label className={label}>Subheadline</label>
        <input name="subheadline" defaultValue={field('subheadline', hero?.subheadline ?? '')} placeholder="e.g. Building practical, scalable products" className={input} />
      </div>

      <div>
        <label className={label}>Bio</label>
        <textarea name="bio" rows={4} defaultValue={field('bio', hero?.bio ?? '')} placeholder="Tell visitors about yourself..." className={`${input} resize-none`} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Location</label>
          <input name="location" defaultValue={field('location', hero?.location ?? '')} placeholder="e.g. Lagos, Nigeria" className={input} />
        </div>
      </div>

      <div>
        <label className={label}>Avatar</label>
        <ImageUpload
          name="avatarUrl"
          defaultValue={hero?.avatarUrl}
          folder="avatars"
          label="Avatar"
          aspectRatio="square"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>CTA Label</label>
          <input name="ctaLabel" defaultValue={field('ctaLabel', hero?.ctaLabel ?? '')} placeholder="e.g. Download CV" className={input} />
        </div>
        <div>
          <label className={label}>CTA URL</label>
          <input name="ctaUrl" defaultValue={field('ctaUrl', hero?.ctaUrl ?? '')} placeholder="https://..." className={input} />
        </div>
      </div>

      <div>
        <label className={label}>Years of experience</label>
        <input
          type="number"
          name="yearsExperience"
          min={0}
          defaultValue={field('yearsExperience', String(hero?.yearsExperience ?? ''))}
          placeholder="e.g. 5"
          className={input}
        />
        <p className="text-xs text-gray-400 mt-1">Displayed as &ldquo;N+ years&rdquo;. Leave blank to compute from your experience entries.</p>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="openToWork"
          name="openToWork"
          defaultChecked={checked('openToWork', hero?.openToWork ?? false)}
          className="w-4 h-4 rounded border-gray-300 accent-gray-900"
        />
        <label htmlFor="openToWork" className="text-sm text-gray-700">Open to work</label>
      </div>

      <div className="pt-2">
        <SubmitButton>Save hero</SubmitButton>
      </div>
    </form>
    </div>
  )
}
