'use client'

import { useState, useTransition } from 'react'
import { createSkill, deleteSkill } from '@/lib/actions/skills'
import type { PortfolioData } from '@/lib/queries/portfolio'
import { SubmitButton, DeleteButton } from '@/app/(dashboard)/components/SubmitButton'
import { useFormDraft } from '@/lib/hooks/useFormDraft'
import { DraftBanner } from '@/app/(dashboard)/components/DraftBanner'

type Skill = PortfolioData['skills'][number]

const input = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
const label = 'block text-sm font-medium text-gray-700 mb-1'

const CATEGORIES = [
  'Frontend', 'Backend', 'Mobile', 'Database & Data Layer',
  'Messaging, Caching and Real-Time Systems', 'Security & Compliance',
  'Design', 'DevOps & Cloud', 'Tools', 'Other',
]

function SkillChip({ skill }: { skill: Skill }) {
  const [confirming, setConfirming] = useState(false)

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full text-sm">
        <span className="text-red-600 text-xs">Remove from all projects?</span>
        <form action={deleteSkill.bind(null, skill.id)} onSubmit={() => setConfirming(false)}>
          <DeleteButton>Yes</DeleteButton>
        </form>
        <button type="button" onClick={() => setConfirming(false)} className="text-xs text-gray-400 hover:text-gray-700 ml-1">
          Cancel
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm">
      <span>{skill.name}</span>
      <button type="button" onClick={() => setConfirming(true)} className="text-gray-300 hover:text-red-400 transition-colors leading-none text-base">
        ×
      </button>
    </div>
  )
}

function AddSkillForm() {
  const [isPending, startTransition] = useTransition()
  const { ready, hasDraft, revision, onFormChange, wipeDraft, clearDraft, field } = useFormDraft('draft:skill:new')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      await createSkill(fd)
      wipeDraft()
    })
  }

  if (!ready) return <div className="h-32 rounded-xl bg-gray-50 animate-pulse" />

  return (
    <div className="flex flex-col gap-3">
      {hasDraft && <DraftBanner onDiscard={clearDraft} />}
      <form key={revision} onSubmit={handleSubmit} onChange={onFormChange} className="flex flex-col gap-4 p-5 border border-dashed border-gray-300 rounded-xl">
      <p className="text-sm font-medium text-gray-700">Add a skill</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label}>Skill name <span className="text-red-400">*</span></label>
          <input name="name" required defaultValue={field('name', '')} placeholder="e.g. TypeScript, React, Node.js" className={input} />
        </div>
        <div>
          <label className={label}>Category</label>
          <select name="category" defaultValue={field('category', '')} className={input}>
            <option value="">None</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <SubmitButton pending={isPending}>Add skill</SubmitButton>
      </div>
    </form>
    </div>
  )
}

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const byCategory = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    const cat = s.category ?? 'Uncategorized'
    ;(acc[cat] ??= []).push(s)
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-6">
      {Object.keys(byCategory).length > 0 && (
        <div className="flex flex-col gap-4">
          {Object.entries(byCategory).map(([cat, items]) => (
            <div key={cat}>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-2">{cat}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => <SkillChip key={skill.id} skill={skill} />)}
              </div>
            </div>
          ))}
        </div>
      )}

      {skills.length === 0 && <p className="text-sm text-gray-400 py-2">No skills added yet.</p>}

      <AddSkillForm />
    </div>
  )
}
