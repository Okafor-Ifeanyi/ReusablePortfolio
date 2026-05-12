import DashboardNav from './components/DashboardNav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardNav />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="max-w-2xl">{children}</div>
      </main>
    </div>
  )
}
