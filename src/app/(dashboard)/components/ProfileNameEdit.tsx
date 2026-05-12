'use client'

import { useState, useTransition, useRef, useEffect } from 'react'
import { updateFullName } from '@/lib/actions/user'

export function ProfileNameEdit({ fullName }: { fullName: string | null }) {
  const [editing, setEditing] = useState(false)
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await updateFullName(formData)
      setEditing(false)
    })
  }

  if (editing) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          ref={inputRef}
          name="fullName"
          defaultValue={fullName ?? ''}
          required
          className="text-2xl font-bold bg-transparent border-b border-gray-900 focus:outline-none w-56"
        />
        <button
          type="submit"
          disabled={isPending}
          className="text-xs px-2.5 py-1 bg-gray-900 text-white rounded-lg disabled:opacity-50"
        >
          {isPending ? '…' : 'Save'}
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="text-xs text-gray-400 hover:text-gray-700"
        >
          Cancel
        </button>
      </form>
    )
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="group flex items-center gap-2 text-left"
    >
      <h1 className="text-2xl font-bold">{fullName ?? 'Your Name'}</h1>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-gray-300 group-hover:text-gray-600 transition-colors shrink-0"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    </button>
  )
}
