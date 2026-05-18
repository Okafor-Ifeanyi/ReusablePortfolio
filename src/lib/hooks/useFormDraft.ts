'use client'

import { useState, useEffect, useCallback } from 'react'

export function useFormDraft(draftKey: string, dbUpdatedAt?: Date | null) {
  const [draft, setDraft] = useState<Record<string, string> | null>(null)
  const [hasDraft, setHasDraft] = useState(false)
  // Incrementing this forces the form to remount with fresh defaultValues on discard
  const [revision, setRevision] = useState(0)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey)
      if (!raw) { setDraft({}); return }

      const parsed: Record<string, string> = JSON.parse(raw)
      const draftAge = Number(parsed._savedAt ?? 0)
      const dbAge = dbUpdatedAt ? new Date(dbUpdatedAt).getTime() : 0

      if (draftAge > 0 && draftAge < dbAge) {
        // DB was saved more recently than this draft — silently discard stale draft
        localStorage.removeItem(draftKey)
        setDraft({})
        setHasDraft(false)
      } else {
        setDraft(parsed)
        // Only show the banner if the draft has at least one meaningful value
        const hasValues = Object.keys(parsed).some(k => k !== '_savedAt' && parsed[k] !== '')
        setHasDraft(draftAge > 0 && hasValues)
      }
    } catch {
      setDraft({})
    }
  }, [draftKey]) // eslint-disable-line react-hooks/exhaustive-deps

  const onFormChange = useCallback((e: React.ChangeEvent<HTMLFormElement>) => {
    const fd = new FormData(e.currentTarget)
    // _savedAt timestamps this draft so we can compare against dbUpdatedAt later
    const next: Record<string, string> = { _savedAt: Date.now().toString() }
    fd.forEach((v, k) => { if (typeof v === 'string') next[k] = v })
    localStorage.setItem(draftKey, JSON.stringify(next))
  }, [draftKey])

  const clearDraft = useCallback(() => {
    localStorage.removeItem(draftKey)
    setDraft({})
    setHasDraft(false)
    // Bump revision so the caller can use it as a form key, forcing remount
    setRevision(r => r + 1)
  }, [draftKey])

  const field = useCallback((name: string, serverValue: string) => {
    if (!draft) return serverValue
    return name in draft && name !== '_savedAt' ? draft[name] : serverValue
  }, [draft])

  const checked = useCallback((name: string, serverValue: boolean) => {
    if (!draft) return serverValue
    return name in draft ? draft[name] === 'on' : serverValue
  }, [draft])

  return {
    ready: draft !== null,
    hasDraft,
    revision,
    onFormChange,
    clearDraft,
    field,
    checked,
  }
}
