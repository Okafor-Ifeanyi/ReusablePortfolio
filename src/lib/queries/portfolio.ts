import { prisma } from '@/lib/db'

export async function getPortfolioByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      username: true,
      fullName: true,
      avatarUrl: true,
      portfolio: {
        include: {
          theme: true,
          hero: true,
          experiences: { orderBy: { sortOrder: 'asc' } },
          projects: { orderBy: { sortOrder: 'asc' } },
          skills: { orderBy: { sortOrder: 'asc' } },
          links: { orderBy: { sortOrder: 'asc' } },
        },
      },
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
