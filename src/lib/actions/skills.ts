'use server'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'

async function requirePortfolioId() {
  const { userId } = await auth()
  if (!userId) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { portfolio: { select: { id: true } } },
  })

  if (!user?.portfolio) redirect('/dashboard')
  return user.portfolio.id
}

export async function createSkill(formData: FormData) {
  const portfolioId = await requirePortfolioId()
  const category = (formData.get('category') as string) || null

  const names = (formData.get('name') as string)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  await prisma.skill.createMany({
    data: names.map((name) => ({ portfolioId, name, category })),
    skipDuplicates: true,
  })

  revalidatePath('/dashboard/skills')
}

export async function deleteSkill(id: string) {
  const portfolioId = await requirePortfolioId()
  const skill = await prisma.skill.findUnique({ where: { id }, select: { portfolioId: true } })
  if (!skill || skill.portfolioId !== portfolioId) return

  await prisma.skill.delete({ where: { id } })
  revalidatePath('/dashboard/skills')
}
