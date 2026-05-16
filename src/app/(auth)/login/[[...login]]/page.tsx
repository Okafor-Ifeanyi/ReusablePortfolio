import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h1 className="text-white text-2xl font-semibold mb-1">Welcome back</h1>
        <p className="text-white/40 text-sm">Sign in to your Folio account</p>
      </div>
      <SignIn />
    </div>
  )
}
