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

export async function createLink(formData: FormData) {
  const portfolioId = await requirePortfolioId()

  await prisma.link.create({
    data: {
      portfolioId,
      platform: formData.get('platform') as string,
      label: (formData.get('label') as string) || null,
      url: formData.get('url') as string,
    },
  })

  revalidatePath('/dashboard/links')
}

export async function deleteLink(id: string) {
  const portfolioId = await requirePortfolioId()
  const link = await prisma.link.findUnique({ where: { id }, select: { portfolioId: true } })
  if (!link || link.portfolioId !== portfolioId) return

  await prisma.link.delete({ where: { id } })
  revalidatePath('/dashboard/links')
}
