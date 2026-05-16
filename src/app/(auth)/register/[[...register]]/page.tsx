import { SignUp } from '@clerk/nextjs'

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h1 className="text-white text-2xl font-semibold mb-1">Create your portfolio</h1>
        <p className="text-white/40 text-sm">It only takes a minute to get started</p>
      </div>
      <SignUp />
    </div>
  )
}
