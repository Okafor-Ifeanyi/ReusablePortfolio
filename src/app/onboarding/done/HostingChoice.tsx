'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { assignSubdomain } from '@/lib/actions/domain'

const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN ?? 'ifeanyiokafor.com'

export default function HostingChoice({
  username,
  fullName,
}: {
  username: string
  fullName: string | null
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [assigned, setAssigned] = useState<string | null>(null)
  const firstName = (fullName ?? username).split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
  const previewSubdomain = `${firstName}.${BASE_DOMAIN}`

  function handleAssign() {
    startTransition(async () => {
      const result = await assignSubdomain()
      setAssigned(result.domain)
    })
  }

  if (assigned) {
    return (
      <div className="w-full max-w-lg text-center">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Your site is live at</p>
          <p className="text-white text-xl font-mono font-medium break-all">{assigned}</p>
        </div>
        <div className="flex flex-col gap-3">
          <a
            href={`https://${assigned}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-white text-gray-900 font-medium text-sm hover:bg-white/90 transition-colors"
          >
            Visit my portfolio ↗
          </a>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full py-3 rounded-xl border border-white/10 text-white/70 text-sm hover:border-white/30 hover:text-white transition-colors"
          >
            Go to dashboard
          </button>
        </div>
        <p className="text-white/30 text-xs mt-6">
          You can connect a custom domain anytime from Dashboard → Domain.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Free subdomain */}
      <button
        onClick={handleAssign}
        disabled={isPending}
        className="group text-left flex flex-col gap-4 p-6 rounded-2xl border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/8 transition-all disabled:opacity-60"
      >
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white text-sm">
          ★
        </div>
        <div>
          <p className="text-white font-medium text-sm mb-1">Free subdomain</p>
          <p className="text-white/40 text-xs leading-relaxed">
            Get published instantly at
          </p>
          <p className="text-white/60 text-xs font-mono mt-1 break-all">{previewSubdomain}</p>
        </div>
        <span className="text-white/30 group-hover:text-white/70 transition-colors text-sm mt-auto">
          {isPending ? 'Publishing…' : 'Use free subdomain →'}
        </span>
      </button>

      {/* Custom domain */}
      <button
        onClick={() => router.push('/dashboard/domain')}
        className="group text-left flex flex-col gap-4 p-6 rounded-2xl border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/8 transition-all"
      >
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white text-sm">
          ◈
        </div>
        <div>
          <p className="text-white font-medium text-sm mb-1">Custom domain</p>
          <p className="text-white/40 text-xs leading-relaxed">
            Use your own domain like{' '}
            <span className="font-mono">yourname.com</span>
          </p>
        </div>
        <span className="text-white/30 group-hover:text-white/70 transition-colors text-sm mt-auto">
          Connect domain →
        </span>
      </button>
    </div>
  )
}
