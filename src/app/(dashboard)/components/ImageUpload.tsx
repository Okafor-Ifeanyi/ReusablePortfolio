'use client'

import { useState, useRef, useTransition } from 'react'
import { uploadImage } from '@/lib/actions/upload'

type Folder = 'avatars' | 'projects' | 'covers'

export function ImageUpload({
  name,
  defaultValue,
  folder = 'projects',
  label = 'Image',
  aspectRatio = 'video',
}: {
  name: string
  defaultValue?: string | null
  folder?: Folder
  label?: string
  aspectRatio?: 'video' | 'square'
}) {
  const [url, setUrl] = useState(defaultValue ?? '')
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
      const result = await uploadImage(formData, folder)
      if (result.error) {
        setError(result.error)
      } else if (result.url) {
        setUrl(result.url)
      }
      // reset so the same file can be re-selected if needed
      if (fileRef.current) fileRef.current.value = ''
    })
  }

  const isSquare = aspectRatio === 'square'

  return (
    <div className="flex flex-col gap-2">
      {/* Hidden form field carries the URL into the parent form submission */}
      <input type="hidden" name={name} value={url} />

      <div
        className={`relative ${isSquare ? 'w-50 h-50 rounded-full' : 'w-full aspect-video rounded-lg'} border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center`}
      >
        {url ? (
          <img src={url} alt={label} className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs text-gray-400">No image</span>
        )}

        {isPending && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <svg className="animate-spin h-6 w-6 text-gray-600" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
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
            onClick={() => setUrl('')}
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
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}
