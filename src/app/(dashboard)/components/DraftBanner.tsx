export function DraftBanner({ onDiscard }: { onDiscard: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
        <p className="text-sm text-amber-800">Unsaved changes from your last session were restored.</p>
      </div>
      <button
        type="button"
        onClick={onDiscard}
        className="text-xs font-medium text-amber-600 hover:text-amber-900 ml-6 shrink-0 transition-colors"
      >
        Discard
      </button>
    </div>
  )
}
