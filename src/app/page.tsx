import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#07070F] text-white overflow-x-hidden">

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07070F]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          <span className="font-semibold text-[18px] tracking-tight">Folio</span>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-white/50 hover:text-white transition-colors px-3 py-2">
              Sign in
            </Link>
            <Link
              href="/register"
              className="text-sm bg-white text-[#07070F] px-4 py-2 rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center text-center pt-28 pb-20 px-6 gap-8">
        {/* Subtle radial glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,255,255,0.05) 0%, transparent 70%)',
          }}
        />

        <div className="flex flex-col items-center gap-5 max-w-3xl relative">
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-white/35 border border-white/10 px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Free to start · No code required
          </span>

          <h1
            className="font-semibold leading-[1.08] tracking-tight"
            style={{ fontSize: 'clamp(44px, 7.5vw, 88px)' }}
          >
            One link.
            <br />
            <span className="text-white/25">Your entire story.</span>
          </h1>

          <p className="text-[18px] text-white/45 leading-[1.7] max-w-lg">
            Pick a theme, fill in your work, and share a single link that shows
            the world exactly who you are.
          </p>
        </div>

        <div className="flex items-center gap-3 relative">
          <Link
            href="/register"
            className="px-7 py-3.5 bg-white text-[#07070F] rounded-full font-semibold text-sm hover:bg-white/90 transition-colors"
          >
            Build mine for free →
          </Link>
          <Link
            href="/login"
            className="px-7 py-3.5 border border-white/12 text-white/55 rounded-full text-sm hover:border-white/25 hover:text-white transition-colors"
          >
            Sign in
          </Link>
        </div>

        {/* Theme preview cards */}
        <div className="relative w-full max-w-4xl mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Bio card */}
          <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#FCFCFF]" style={{ minHeight: 340 }}>
            <div className="h-full p-7 flex flex-col gap-5">
              {/* Fake browser bar */}
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                <div className="flex-1 ml-2 h-5 rounded bg-black/5 flex items-center px-2">
                  <span className="text-[#636363] text-[9px]">folio.app/yourname</span>
                </div>
              </div>
              {/* Content */}
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#636363] text-xs">&lt;</span>
                  <span className="text-[#05050D] font-semibold text-[17px]">Fullstack Developer</span>
                  <span className="text-[#636363] text-xs">/&gt;</span>
                </div>
                <p className="text-[#636363] text-[11px] leading-relaxed max-w-[260px]">
                  Building scalable products across fintech, e-commerce and web.
                </p>
                <div className="w-24 h-7 bg-[#05050D] rounded-sm mt-1" />
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="grid grid-cols-3 gap-1.5">
                  {['Projects', 'Skills', 'Experience'].map(s => (
                    <div key={s} className="h-7 rounded bg-[#05050D]/6 flex items-center justify-center">
                      <span className="text-[#05050D]/35 text-[9px]">{s}</span>
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-medium text-[#05050D]/30 uppercase tracking-widest">Bio theme</span>
              </div>
            </div>
          </div>

          {/* Lota card */}
          <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#0F0F0F]" style={{ minHeight: 340 }}>
            <div className="h-full p-7 flex flex-col gap-5">
              {/* Fake browser bar */}
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/40" />
                <div className="flex-1 ml-2 h-5 rounded bg-white/5 flex items-center px-2">
                  <span className="text-white/25 text-[9px]">folio.app/yourname</span>
                </div>
              </div>
              {/* Content */}
              <div className="flex flex-col gap-1.5 flex-1">
                <p className="text-white/25 text-[10px] italic">Hello</p>
                <p className="text-white font-medium text-[17px] leading-snug">
                  I&apos;m <span className="text-[#FFC041]">what you need.</span>
                </p>
                <p className="text-white font-medium text-[17px]">
                  I&apos;m that{' '}
                  <span className="text-[#FFC041] border border-[#F2A206] px-1 text-[15px]">Designer.</span>
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="grid grid-cols-3 gap-1.5">
                  {['Branding', 'Web Apps', 'Pitchdecks'].map(s => (
                    <div key={s} className="h-7 rounded bg-white/5 flex items-center justify-center">
                      <span className="text-white/25 text-[9px]">{s}</span>
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-medium text-white/20 uppercase tracking-widest">Lota theme</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-16">
          <div className="text-center">
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold tracking-tight mb-3">
              Up in three steps
            </h2>
            <p className="text-white/40 text-[16px]">No designers. No developers. Just you.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
            {[
              {
                n: '01',
                title: 'Pick a theme',
                desc: 'Choose between a minimal developer layout or a bold creative portfolio.',
              },
              {
                n: '02',
                title: 'Fill in your work',
                desc: 'Add your projects, skills, experience and links from a simple dashboard.',
              },
              {
                n: '03',
                title: 'Share your link',
                desc: 'Your portfolio is live at folio.app/yourname. Share it everywhere.',
              },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex flex-col gap-4 p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
                <span className="text-[13px] font-semibold text-white/20 tracking-widest">{n}</span>
                <h3 className="text-[18px] font-semibold">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Themes ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-16">
          <div className="text-center">
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold tracking-tight mb-3">
              Two themes. Endless possibilities.
            </h2>
            <p className="text-white/40 text-[16px] max-w-md mx-auto">
              Built for developers and designers. Each theme is purpose-built and fully customisable.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {/* Bio */}
            <div className="rounded-2xl border border-white/8 overflow-hidden">
              <div className="bg-[#FCFCFF] px-8 pt-8 pb-0" style={{ minHeight: 200 }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#636363]">&lt;</span>
                  <span className="text-[#05050D] font-semibold text-[22px]">Fullstack Developer</span>
                  <span className="text-[#636363]">/&gt;</span>
                </div>
                <p className="text-[#636363] text-sm max-w-xs">Building scalable products across fintech, e-commerce and web.</p>
                <div className="w-32 h-9 bg-[#05050D] rounded-sm mt-4" />
              </div>
              <div className="p-6 flex flex-col gap-3">
                <h3 className="text-[17px] font-semibold">Bio</h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  A clean, minimal layout for developers and engineers. Showcase projects, skills and experience in a structured, elegant format.
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {['Projects', 'Skills', 'Experience', 'Links', 'About'].map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 border border-white/10 text-white/40 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Lota */}
            <div className="rounded-2xl border border-white/8 overflow-hidden">
              <div className="bg-[#0F0F0F] px-8 pt-8 pb-0" style={{ minHeight: 200 }}>
                <p className="text-white/25 text-sm italic mb-1">Hello</p>
                <p className="text-white font-medium text-[22px]">I&apos;m <span className="text-[#FFC041]">what you need.</span></p>
                <p className="text-white font-medium text-[22px] mb-4">
                  I&apos;m that <span className="text-[#FFC041] border border-[#F2A206] px-2 text-[20px]">Designer.</span>
                </p>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <h3 className="text-[17px] font-semibold">Lota</h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  A bold, expressive layout for designers and creatives. Feature branding work, pitchdecks, and case studies in a high-impact format.
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {['Branding', 'Web Apps', 'Pitchdecks', 'Graphics', 'Testimonials'].map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 border border-white/10 text-white/40 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section className="py-28 px-6 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
          <h2 className="text-[clamp(32px,5vw,56px)] font-semibold tracking-tight leading-[1.1]">
            Ready to stand out?
          </h2>
          <p className="text-white/40 text-[16px] leading-relaxed max-w-sm">
            Your next client, employer, or collaborator is searching right now.
          </p>
          <Link
            href="/register"
            className="mt-2 px-8 py-4 bg-white text-[#07070F] rounded-full font-semibold text-[15px] hover:bg-white/90 transition-colors"
          >
            Create your portfolio →
          </Link>
          <p className="text-white/20 text-xs">Free forever. No credit card needed.</p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-8 px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-semibold text-[15px] tracking-tight">Folio</span>
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} Folio. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/login" className="text-white/30 text-xs hover:text-white/60 transition-colors">Sign in</Link>
            <Link href="/register" className="text-white/30 text-xs hover:text-white/60 transition-colors">Register</Link>
          </div>
        </div>
      </footer>

    </main>
  )
}
