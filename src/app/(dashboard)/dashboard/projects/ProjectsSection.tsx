'use client'

import { useState, useTransition } from 'react'
import { createProject, updateProject, deleteProject } from '@/lib/actions/projects'
import type { PortfolioData } from '@/lib/queries/portfolio'
import { SubmitButton, DeleteButton } from '@/app/(dashboard)/components/SubmitButton'
import { ImageUpload } from '@/app/(dashboard)/components/ImageUpload'
import { useFormDraft } from '@/lib/hooks/useFormDraft'
import { DraftBanner } from '@/app/(dashboard)/components/DraftBanner'

type Project = PortfolioData['projects'][number]
type Skill = PortfolioData['skills'][number]

const input = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
const label = 'block text-sm font-medium text-gray-700 mb-1'
const PROJECT_TYPES = ['Solo', 'Lead Engineer', 'Collaboration', 'Open Source']

function AddProjectForm({
  availableSkills,
  onCancel,
  defaultCategory,
}: {
  availableSkills: Skill[]
  onCancel: () => void
  defaultCategory?: string
}) {
  const [isPending, startTransition] = useTransition()
  const { ready, hasDraft, revision, onFormChange, wipeDraft, clearDraft, field } = useFormDraft('draft:project:new')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      await createProject(fd)
      wipeDraft()
      onCancel()
    })
  }

  function handleCancel() {
    clearDraft()
    onCancel()
  }

  if (!ready) return <div className="h-64 rounded-xl bg-gray-50 animate-pulse" />

  return (
    <div className="flex flex-col gap-3">
      {hasDraft && <DraftBanner onDiscard={clearDraft} />}
      <form key={revision} onSubmit={handleSubmit} onChange={onFormChange} className="flex flex-col gap-4 p-5 border border-gray-200 rounded-xl bg-white">
      {defaultCategory && <input type="hidden" name="category" value={defaultCategory} />}

      <div>
        <label className={label}>Title <span className="text-red-400">*</span></label>
        <input name="title" required defaultValue={field('title', '')} placeholder="My Project" className={input} />
      </div>

      <div>
        <label className={label}>Subtitle</label>
        <input name="subtitle" defaultValue={field('subtitle', '')} placeholder="e.g. Construction Marketplace Platform" maxLength={50} className={input} />
        <p className="text-xs text-gray-400 mt-1">Shown on the collapsed row — 50 chars max.</p>
      </div>

      <div>
        <label className={label}>Description</label>
        <textarea name="description" rows={3} defaultValue={field('description', '')} placeholder="What does it do?" className={`${input} resize-none`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Live URL</label>
          <input name="url" defaultValue={field('url', '')} placeholder="https://..." className={input} />
        </div>
        <div>
          <label className={label}>Repo URL</label>
          <input name="repoUrl" defaultValue={field('repoUrl', '')} placeholder="https://github.com/..." className={input} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Duration</label>
          <input name="duration" defaultValue={field('duration', '')} placeholder="e.g. Mar 2024 – Present" className={input} />
        </div>
        <div>
          <label className={label}>Project type</label>
          <select name="projectType" defaultValue={field('projectType', '')} className={input}>
            <option value="">— select —</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={label}>Cover image</label>
        <ImageUpload name="coverImageUrl" folder="covers" label="Cover image" aspectRatio="video" />
      </div>

      {availableSkills.length > 0 && (
        <div>
          <p className={label}>Skills used</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {availableSkills.map((skill) => (
              <label key={skill.id} className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" name="skillIds" value={skill.id} className="w-3.5 h-3.5 accent-gray-900" />
                <span className="text-sm text-gray-700">{skill.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <input type="checkbox" id="featured-new" name="featured" className="w-4 h-4 rounded border-gray-300 accent-gray-900" />
        <label htmlFor="featured-new" className="text-sm text-gray-700">Feature this project</label>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <SubmitButton pending={isPending}>Add project</SubmitButton>
        <button type="button" onClick={handleCancel} className="text-sm text-gray-500 hover:text-gray-900">Cancel</button>
      </div>
    </form>
    </div>
  )
}

function EditProjectForm({
  project,
  availableSkills,
  onCancel,
  defaultCategory,
}: {
  project: Project
  availableSkills: Skill[]
  onCancel: () => void
  defaultCategory?: string
}) {
  const [isPending, startTransition] = useTransition()
  const linkedSkillIds = new Set(project.projectSkills.map((ps) => ps.skillId))

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      await updateProject(project.id, fd)
      onCancel()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 border border-gray-200 rounded-xl bg-white">
      {defaultCategory && <input type="hidden" name="category" value={defaultCategory} />}

      <div>
        <label className={label}>Title <span className="text-red-400">*</span></label>
        <input name="title" required defaultValue={project.title} placeholder="My Project" className={input} />
      </div>

      <div>
        <label className={label}>Subtitle</label>
        <input name="subtitle" defaultValue={project.subtitle ?? ''} placeholder="e.g. Construction Marketplace Platform" maxLength={50} className={input} />
        <p className="text-xs text-gray-400 mt-1">Shown on the collapsed row — 50 chars max.</p>
      </div>

      <div>
        <label className={label}>Description</label>
        <textarea name="description" rows={3} defaultValue={project.description ?? ''} placeholder="What does it do?" className={`${input} resize-none`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Live URL</label>
          <input name="url" defaultValue={project.url ?? ''} placeholder="https://..." className={input} />
        </div>
        <div>
          <label className={label}>Repo URL</label>
          <input name="repoUrl" defaultValue={project.repoUrl ?? ''} placeholder="https://github.com/..." className={input} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label}>Duration</label>
          <input name="duration" defaultValue={project.duration ?? ''} placeholder="e.g. Mar 2024 – Present" className={input} />
        </div>
        <div>
          <label className={label}>Project type</label>
          <select name="projectType" defaultValue={project.projectType ?? ''} className={input}>
            <option value="">— select —</option>
            {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={label}>Cover image</label>
        <ImageUpload name="coverImageUrl" defaultValue={project.coverImageUrl} folder="covers" label="Cover image" aspectRatio="video" />
      </div>

      {availableSkills.length > 0 && (
        <div>
          <p className={label}>Skills used</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {availableSkills.map((skill) => (
              <label key={skill.id} className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" name="skillIds" value={skill.id} defaultChecked={linkedSkillIds.has(skill.id)} className="w-3.5 h-3.5 accent-gray-900" />
                <span className="text-sm text-gray-700">{skill.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <input type="checkbox" id={`featured-${project.id}`} name="featured" defaultChecked={project.featured} className="w-4 h-4 rounded border-gray-300 accent-gray-900" />
        <label htmlFor={`featured-${project.id}`} className="text-sm text-gray-700">Feature this project</label>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <SubmitButton pending={isPending}>Save changes</SubmitButton>
        <button type="button" onClick={onCancel} className="text-sm text-gray-500 hover:text-gray-900">Cancel</button>
      </div>
    </form>
  )
}

export default function ProjectsSection({
  projects,
  availableSkills,
  defaultCategory,
}: {
  projects: Project[]
  availableSkills: Skill[]
  defaultCategory?: string
}) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      {projects.length === 0 && !adding && (
        <p className="text-sm text-gray-400 py-4">No projects added yet.</p>
      )}

      {projects.map((project) =>
        editingId === project.id ? (
          <EditProjectForm key={project.id} project={project} availableSkills={availableSkills} onCancel={() => setEditingId(null)} defaultCategory={defaultCategory} />
        ) : (
          <div key={project.id} className="flex items-start justify-between p-5 border border-gray-200 rounded-xl bg-white">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-medium text-sm">{project.title}</p>
                {project.projectType && <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-full">{project.projectType}</span>}
                {project.featured && <span className="text-xs px-1.5 py-0.5 bg-amber-50 text-amber-600 rounded-full font-medium">Featured</span>}
              </div>
              {project.duration && <p className="text-xs text-gray-400 mt-0.5">{project.duration}</p>}
              {project.description && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>}
              {project.projectSkills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.projectSkills.map((ps) => (
                    <span key={ps.skillId} className="text-xs px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-full text-gray-600">{ps.skill.name}</span>
                  ))}
                </div>
              )}
              <div className="flex gap-3 mt-2">
                {project.url && <a href={project.url} target="_blank" className="text-xs text-blue-500 hover:underline">Live ↗</a>}
                {project.repoUrl && <a href={project.repoUrl} target="_blank" className="text-xs text-blue-500 hover:underline">Repo ↗</a>}
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-4">
              <button onClick={() => setEditingId(project.id)} className="text-sm text-gray-500 hover:text-gray-900">Edit</button>
              <form action={deleteProject.bind(null, project.id)}>
                <DeleteButton />
              </form>
            </div>
          </div>
        )
      )}

      {adding ? (
        <AddProjectForm availableSkills={availableSkills} onCancel={() => setAdding(false)} defaultCategory={defaultCategory} />
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="text-sm text-gray-500 hover:text-gray-900 border border-dashed border-gray-300 rounded-xl py-3 hover:border-gray-400 transition-colors"
        >
          + Add project
        </button>
      )}
    </div>
  )
}
