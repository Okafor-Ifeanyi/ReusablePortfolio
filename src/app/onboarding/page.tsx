'use client'

import { useTransition } from 'react'
import { selectTheme } from '@/lib/actions/onboarding'

function ThemeCard({
  slug,
  name,
  desc,
  preview,
  onSelect,
  pending,
}: {
  slug: string
  name: string
  desc: string
  preview: React.ReactNode
  onSelect: () => void
  pending: boolean
}) {
  return (
    <button
      onClick={onSelect}
      disabled={pending}
      className="group text-left w-full flex flex-col rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-200 disabled:opacity-60"
    >
      {/* Preview */}
      <div className="w-full" style={{ height: '260px' }}>
        {preview}
      </div>
      {/* Label */}
      <div className="px-6 py-5 flex items-center justify-between bg-white/5 group-hover:bg-white/8 transition-colors">
        <div>
          <p className="text-white font-medium text-[16px]">{name}</p>
          <p className="text-white/40 text-sm mt-0.5">{desc}</p>
        </div>
        <span className="text-white/30 group-hover:text-white/70 transition-colors text-lg">→</span>
      </div>
    </button>
  )
}

const BioPreview = (
  <div className="w-full h-full bg-[#FCFCFF] p-8 flex flex-col justify-between">
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-[#636363] text-sm">&lt;</span>
        <span className="text-[#05050D] font-medium text-[18px]">Fullstack Developer</span>
        <span className="text-[#636363] text-sm">/&gt;</span>
      </div>
      <p className="text-[#636363] text-xs leading-relaxed max-w-xs">
        Building scalable products across fintech, e-commerce and web.
      </p>
      <div className="w-28 h-8 bg-[#05050D] rounded-sm mt-2 flex justify-center items-center">
        <span className="text-white text-center text-[9px]">Download CV</span>
      </div>
    </div>
    <div className="flex gap-2 flex-wrap">
      {['Projects', 'Skills', 'Experience', 'Links'].map(s => (
        <span key={s} className="text-[10px] px-2 py-1 bg-[#05050D]/8 text-[#05050D]/40 rounded">{s}</span>
      ))}
    </div>
  </div>
)

const LotaPreview = (
  <div className="w-full h-full bg-[#0F0F0F] p-8 flex flex-col justify-between">
    <div className="flex flex-col gap-2">
      <p className="text-white/25 text-xs italic">Hello</p>
      <p className="text-white text-[18px] font-medium">
        I&apos;m <span className="text-[#FFC041]">what you need.</span>
      </p>
      <p className="text-white text-[18px] font-medium">
        I&apos;m that{' '}
        <span className="text-[#FFC041] border border-[#F2A206] px-1">Designer.</span>
      </p>
    </div>
    <div className="flex gap-2 flex-wrap">
      {['Branding', 'Web Apps', 'Pitchdecks', 'Graphics'].map(s => (
        <span key={s} className="text-[10px] px-2 py-1 bg-white/5 text-white/25 rounded">{s}</span>
      ))}
    </div>
  </div>
)

export default function OnboardingPage() {
  const [isPending, startTransition] = useTransition()

  const pick = (slug: string) => {
    startTransition(() => selectTheme(slug))
  }

  return (
    <div className="min-h-screen bg-[#07070F] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 gap-10">
        <div className="text-center">
          <h1 className="text-white text-3xl font-semibold mb-2">Pick your theme</h1>
          <p className="text-white/40 text-sm">You can change this later from your dashboard.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-3xl">
          <ThemeCard
            slug="bio"
            name="Bio"
            desc="Clean developer portfolio"
            preview={BioPreview}
            onSelect={() => pick('bio')}
            pending={isPending}
          />
          <ThemeCard
            slug="lota"
            name="Lota"
            desc="Creative designer portfolio"
            preview={LotaPreview}
            onSelect={() => pick('lota')}
            pending={isPending}
          />
        </div>

        {isPending && (
          <p className="text-white/40 text-sm animate-pulse">Setting up your portfolio…</p>
        )}
      </div>
    </div>
  )
}
