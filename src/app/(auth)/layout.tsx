import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#07070F] flex flex-col">
      <nav className="flex items-center justify-between px-10 py-6">
        <Link href="/" className="text-white font-semibold text-[20px] tracking-tight">
          Folio
        </Link>
      </nav>
      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        {children}
      </div>
    </div>
  )
}
