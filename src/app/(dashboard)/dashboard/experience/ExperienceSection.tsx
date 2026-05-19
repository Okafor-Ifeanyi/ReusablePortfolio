'use client'

import { useState, useEffect, useTransition } from 'react'
import { createExperience, updateExperience, deleteExperience } from '@/lib/actions/experience'
import type { PortfolioData } from '@/lib/queries/portfolio'
import { SubmitButton, DeleteButton } from '@/app/(dashboard)/components/SubmitButton'
import { useFormDraft } from '@/lib/hooks/useFormDraft'
import { DraftBanner } from '@/app/(dashboard)/components/DraftBanner'

type Experience = PortfolioData['experiences'][number]

const input = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
const label = 'block text-sm font-medium text-gray-700 mb-1'

function toDateInput(date: Date | null) {
  if (!date) return ''
  return new Date(date).toISOString().split('T')[0]
}

function AddExperienceForm({ onCancel }: { onCancel: () => void }) {
  const [isPending, startTransition] = useTransition()
  const { ready, hasDraft, revision, onFormChange, wipeDraft, clearDraft, field, checked } = useFormDraft('draft:experience:new')
  const [isCurrent, setIsCurrent] = useState(false)
  // Sync checkbox state from draft once it loads
  useEffect(() => { if (ready) setIsCurrent(checked('isCurrent', false)) }, [ready]) // eslint-disable-line

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      await createExperience(fd)
      wipeDraft()
      onCancel()
    })
  }

  function handleCancel() {
    clearDraft()
    onCancel()
  }

  if (!ready) return <div className="h-48 rounded-xl bg-gray-50 animate-pulse" />

  return (
    <div className="flex flex-col gap-3">
      {hasDraft && <DraftBanner onDiscard={clearDraft} />}
      <form key={revision} onSubmit={handleSubmit} onChange={onFormChange} className="flex flex-col gap-4 p-5 border border-gray-200 rounded-xl bg-white">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Company <span className="text-red-400">*</span></label>
          <input name="company" required defaultValue={field('company', '')} placeholder="Acme Inc." className={input} />
        </div>
        <div>
          <label className={label}>Role <span className="text-red-400">*</span></label>
          <input name="role" required defaultValue={field('role', '')} placeholder="Senior Engineer" className={input} />
        </div>
      </div>

      <div>
        <label className={label}>Description</label>
        <textarea name="description" rows={3} defaultValue={field('description', '')} placeholder="What did you work on?" className={`${input} resize-none`} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Start date <span className="text-red-400">*</span></label>
          <input type="date" name="startDate" required defaultValue={field('startDate', '')} className={input} />
        </div>
        <div>
          <label className={label}>End date</label>
          {isCurrent ? (
            <div className={`${input} bg-gray-50 text-gray-400 cursor-not-allowed select-none`}>Present</div>
          ) : (
            <input type="date" name="endDate" defaultValue={field('endDate', '')} className={input} />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="current-new"
          name="isCurrent"
          checked={isCurrent}
          onChange={e => setIsCurrent(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 accent-gray-900"
        />
        <label htmlFor="current-new" className="text-sm text-gray-700">Current role</label>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <SubmitButton pending={isPending}>Add experience</SubmitButton>
        <button type="button" onClick={handleCancel} className="text-sm text-gray-500 hover:text-gray-900">
          Cancel
        </button>
      </div>
    </form>
    </div>
  )
}

function EditExperienceForm({ exp, onCancel }: { exp: Experience; onCancel: () => void }) {
  const [isPending, startTransition] = useTransition()
  const [isCurrent, setIsCurrent] = useState(exp.isCurrent)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      await updateExperience(exp.id, fd)
      onCancel()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 border border-gray-200 rounded-xl bg-white">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Company <span className="text-red-400">*</span></label>
          <input name="company" required defaultValue={exp.company} placeholder="Acme Inc." className={input} />
        </div>
        <div>
          <label className={label}>Role <span className="text-red-400">*</span></label>
          <input name="role" required defaultValue={exp.role} placeholder="Senior Engineer" className={input} />
        </div>
      </div>

      <div>
        <label className={label}>Description</label>
        <textarea name="description" rows={3} defaultValue={exp.description ?? ''} placeholder="What did you work on?" className={`${input} resize-none`} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Start date <span className="text-red-400">*</span></label>
          <input type="date" name="startDate" required defaultValue={toDateInput(exp.startDate)} className={input} />
        </div>
        <div>
          <label className={label}>End date</label>
          {isCurrent ? (
            <div className={`${input} bg-gray-50 text-gray-400 cursor-not-allowed select-none`}>Present</div>
          ) : (
            <input type="date" name="endDate" defaultValue={toDateInput(exp.endDate ?? null)} className={input} />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={`current-${exp.id}`}
          name="isCurrent"
          checked={isCurrent}
          onChange={e => setIsCurrent(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 accent-gray-900"
        />
        <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-700">Current role</label>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <SubmitButton pending={isPending}>Save changes</SubmitButton>
        <button type="button" onClick={onCancel} className="text-sm text-gray-500 hover:text-gray-900">Cancel</button>
      </div>
    </form>
  )
}

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      {experiences.length === 0 && !adding && (
        <p className="text-sm text-gray-400 py-4">No experience added yet.</p>
      )}

      {experiences.map((exp) =>
        editingId === exp.id ? (
          <EditExperienceForm key={exp.id} exp={exp} onCancel={() => setEditingId(null)} />
        ) : (
          <div key={exp.id} className="flex items-start justify-between p-5 border border-gray-200 rounded-xl bg-white">
            <div>
              <p className="font-medium text-sm">{exp.role}</p>
              <p className="text-sm text-gray-500">{exp.company}</p>
              <p className="text-xs text-gray-400 mt-1">
                {toDateInput(exp.startDate)} — {exp.isCurrent ? 'Present' : (toDateInput(exp.endDate ?? null) || '—')}
              </p>
              {exp.description && <p className="text-sm text-gray-600 mt-2">{exp.description}</p>}
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-4">
              <button onClick={() => setEditingId(exp.id)} className="text-sm text-gray-500 hover:text-gray-900">Edit</button>
              <form action={deleteExperience.bind(null, exp.id)}>
                <DeleteButton />
              </form>
            </div>
          </div>
        )
      )}

      {adding ? (
        <AddExperienceForm onCancel={() => setAdding(false)} />
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="text-sm text-gray-500 hover:text-gray-900 border border-dashed border-gray-300 rounded-xl py-3 hover:border-gray-400 transition-colors"
        >
          + Add experience
        </button>
      )}
    </div>
  )
}
