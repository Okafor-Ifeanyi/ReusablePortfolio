'use client'

import { useFormStatus } from 'react-dom'

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

const base = 'inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed'

// pending prop lets useTransition callers override the native useFormStatus
export function SubmitButton({
  children,
  className,
  pending: externalPending,
}: {
  children: React.ReactNode
  className?: string
  pending?: boolean
}) {
  const { pending: formPending } = useFormStatus()
  const pending = externalPending ?? formPending
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${base} px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 ${className ?? ''}`}
    >
      {pending && <Spinner />}
      {children}
    </button>
  )
}

export function DeleteButton({ children = 'Delete' }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${base} text-sm text-red-400 hover:text-red-600`}
    >
      {pending ? <Spinner /> : children}
    </button>
  )
}
