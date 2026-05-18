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

function parseExperience(formData: FormData) {
  const endDateRaw = formData.get('endDate') as string
  return {
    company: formData.get('company') as string,
    role: formData.get('role') as string,
    description: (formData.get('description') as string) || null,
    startDate: new Date(formData.get('startDate') as string),
    endDate: endDateRaw ? new Date(endDateRaw) : null,
    isCurrent: formData.get('isCurrent') === 'on',
  }
}

export async function createExperience(formData: FormData) {
  const portfolioId = await requirePortfolioId()
  await prisma.experience.create({ data: { portfolioId, ...parseExperience(formData) } })
  revalidatePath('/dashboard/experience')
}

export async function updateExperience(id: string, formData: FormData) {
  const portfolioId = await requirePortfolioId()
  const exp = await prisma.experience.findUnique({ where: { id }, select: { portfolioId: true } })
  if (!exp || exp.portfolioId !== portfolioId) return

  await prisma.experience.update({ where: { id }, data: parseExperience(formData) })
  revalidatePath('/dashboard/experience')
}

export async function deleteExperience(id: string) {
  const portfolioId = await requirePortfolioId()
  const exp = await prisma.experience.findUnique({ where: { id }, select: { portfolioId: true } })
  if (!exp || exp.portfolioId !== portfolioId) return

  await prisma.experience.delete({ where: { id } })
  revalidatePath('/dashboard/experience')
}
