'use client'

import { useState, useRef, useTransition } from 'react'
import { uploadDocument } from '@/lib/actions/upload'

/** Pulls a readable filename out of a Cloudinary raw URL for previously saved files. */
function nameFromUrl(url: string): string {
  const last = url.split('/').pop() ?? ''
  return decodeURIComponent(last) || 'Current file'
}

export function FileUpload({
  name,
  defaultValue,
  label = 'File',
}: {
  name: string
  defaultValue?: string | null
  label?: string
}) {
  const [url, setUrl] = useState(defaultValue ?? '')
  const [fileName, setFileName] = useState(defaultValue ? nameFromUrl(defaultValue) : '')
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const fileRef = useRef<HTMLInputElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    startTransition(async () => {
      const result = await uploadDocument(formData)
      if (result.error) {
        setError(result.error)
      } else if (result.url) {
        setUrl(result.url)
        setFileName(result.name ?? nameFromUrl(result.url))
      }
      // reset so the same file can be re-selected if needed
      if (fileRef.current) fileRef.current.value = ''
    })
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Hidden form field carries the URL into the parent form submission */}
      <input type="hidden" name={name} value={url} />

      <div className="flex items-center gap-3 border border-gray-200 bg-gray-50 rounded-lg px-3 py-2.5 min-h-12">
        {isPending ? (
          <>
            <svg className="animate-spin h-4 w-4 text-gray-600 shrink-0" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-sm text-gray-500">Uploading…</span>
          </>
        ) : url ? (
          <>
            <svg className="h-4 w-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-700 hover:text-gray-900 underline truncate"
            >
              {fileName}
            </a>
          </>
        ) : (
          <span className="text-sm text-gray-400">No {label.toLowerCase()} uploaded</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={isPending}
          onClick={() => fileRef.current?.click()}
          className="text-sm px-3 py-1.5 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Uploading…' : url ? 'Replace' : 'Upload'}
        </button>
        {url && !isPending && (
          <button
            type="button"
            onClick={() => { setUrl(''); setFileName('') }}
            className="text-sm text-red-400 hover:text-red-600"
          >
            Remove
          </button>
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}
