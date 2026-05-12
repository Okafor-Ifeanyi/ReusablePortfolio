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

function parseProject(formData: FormData) {
  return {
    title: formData.get('title') as string,
    subtitle: (formData.get('subtitle') as string) || null,
    description: (formData.get('description') as string) || null,
    coverImageUrl: (formData.get('coverImageUrl') as string) || null,
    url: (formData.get('url') as string) || null,
    repoUrl: (formData.get('repoUrl') as string) || null,
    duration: (formData.get('duration') as string) || null,
    projectType: (formData.get('projectType') as string) || null,
    featured: formData.get('featured') === 'on',
  }
}

async function syncSkills(projectId: string, skillIds: string[]) {
  await prisma.projectSkill.deleteMany({ where: { projectId } })
  if (skillIds.length > 0) {
    await prisma.projectSkill.createMany({
      data: skillIds.map((skillId) => ({ projectId, skillId })),
    })
  }
}

export async function createProject(formData: FormData) {
  const portfolioId = await requirePortfolioId()
  const project = await prisma.project.create({
    data: { portfolioId, ...parseProject(formData) },
  })
  const skillIds = formData.getAll('skillIds') as string[]
  await syncSkills(project.id, skillIds)
  revalidatePath('/dashboard/projects')
}

export async function updateProject(id: string, formData: FormData) {
  const portfolioId = await requirePortfolioId()
  const project = await prisma.project.findUnique({ where: { id }, select: { portfolioId: true } })
  if (!project || project.portfolioId !== portfolioId) return

  await prisma.project.update({ where: { id }, data: parseProject(formData) })
  const skillIds = formData.getAll('skillIds') as string[]
  await syncSkills(id, skillIds)
  revalidatePath('/dashboard/projects')
}

export async function deleteProject(id: string) {
  const portfolioId = await requirePortfolioId()
  const project = await prisma.project.findUnique({ where: { id }, select: { portfolioId: true } })
  if (!project || project.portfolioId !== portfolioId) return

  await prisma.project.delete({ where: { id } })
  revalidatePath('/dashboard/projects')
}
