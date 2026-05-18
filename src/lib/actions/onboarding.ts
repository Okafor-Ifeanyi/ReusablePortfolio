'use server'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'

export async function selectTheme(themeSlug: string) {
  const { userId } = await auth()
  if (!userId) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true, username: true },
  })
  if (!user) redirect('/login')

  const theme = await prisma.theme.upsert({
    where: { slug: themeSlug },
    create: {
      slug: themeSlug,
      name: themeSlug === 'bio' ? 'Bio' : 'Lota',
      tier: 'free',
      isPublished: true,
    },
    update: {},
  })

  await prisma.portfolio.upsert({
    where: { userId: user.id },
    create: { userId: user.id, themeId: theme.id, slug: user.username },
    update: { themeId: theme.id },
  })

  redirect('/onboarding/done')
}
