import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

const portfolioInclude = {
  theme: true,
  hero: true,
  experiences: { orderBy: { sortOrder: 'asc' } },
  projects: {
    orderBy: { sortOrder: 'asc' },
    include: { projectSkills: { include: { skill: true } } },
  },
  skills: { orderBy: { sortOrder: 'asc' } },
  links: { orderBy: { sortOrder: 'asc' } },
  testimonials: { orderBy: { sortOrder: 'asc' } },
  domainMapping: true,
} as const

export async function getPortfolioByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      username: true,
      fullName: true,
      avatarUrl: true,
      portfolio: { include: portfolioInclude },
    },
  })

  if (!user?.portfolio) return null

  return {
    ...user.portfolio,
    user: {
      username: user.username,
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
    },
  }
}

export type PortfolioData = NonNullable<Awaited<ReturnType<typeof getPortfolioByUsername>>>

export async function getCurrentPortfolio() {
  const { userId } = await auth()
  if (!userId) return null

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: {
      id: true,
      username: true,
      fullName: true,
      avatarUrl: true,
      portfolio: { include: portfolioInclude },
    },
  })

  if (!user) return null

  if (user.portfolio) {
    return {
      ...user.portfolio,
      user: { username: user.username, fullName: user.fullName, avatarUrl: user.avatarUrl },
    }
  }

  // First visit — auto-create portfolio so new users aren't blocked
  const theme = await prisma.theme.upsert({
    where: { slug: 'bio' },
    create: { slug: 'bio', name: 'Bio', tier: 'free', isPublished: true },
    update: {},
  })

  const portfolio = await prisma.portfolio.create({
    data: { userId: user.id, themeId: theme.id, slug: user.username },
    include: portfolioInclude,
  })

  return {
    ...portfolio,
    user: { username: user.username, fullName: user.fullName, avatarUrl: user.avatarUrl },
  }
}
