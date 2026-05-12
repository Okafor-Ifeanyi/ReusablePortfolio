'use server'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'

export async function createPortfolio() {
  const { userId } = await auth()
  if (!userId) redirect('/login')

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) redirect('/login')

  const existing = await prisma.portfolio.findUnique({ where: { userId: user.id } })
  if (existing) redirect('/dashboard')

  const theme = await prisma.theme.upsert({
    where: { slug: 'bio' },
    create: { slug: 'bio', name: 'Bio', tier: 'free', isPublished: true },
    update: {},
  })

  await prisma.portfolio.create({
    data: {
      userId: user.id,
      themeId: theme.id,
      slug: user.username,
    },
  })

  redirect('/dashboard')
}
