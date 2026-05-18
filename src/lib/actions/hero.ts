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

export async function upsertHero(formData: FormData) {
  const portfolioId = await requirePortfolioId()

  const yearsRaw = formData.get('yearsExperience') as string
  const data = {
    headline: formData.get('headline') as string,
    subheadline: (formData.get('subheadline') as string) || null,
    bio: (formData.get('bio') as string) || null,
    avatarUrl: (formData.get('avatarUrl') as string) || null,
    location: (formData.get('location') as string) || null,
    openToWork: formData.get('openToWork') === 'on',
    ctaLabel: (formData.get('ctaLabel') as string) || null,
    ctaUrl: (formData.get('ctaUrl') as string) || null,
    yearsExperience: yearsRaw ? parseInt(yearsRaw, 10) : null,
  }

  await prisma.hero.upsert({
    where: { portfolioId },
    create: { portfolioId, ...data },
    update: data,
  })

  revalidatePath('/dashboard/hero')
}
