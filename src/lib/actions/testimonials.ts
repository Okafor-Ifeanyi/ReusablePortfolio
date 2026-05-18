'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

async function getPortfolioId() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { portfolio: { select: { id: true } } },
  })
  const id = user?.portfolio?.id
  if (!id) throw new Error('No portfolio')
  return id
}

export async function createTestimonial(formData: FormData) {
  const portfolioId = await getPortfolioId()
  await prisma.testimonial.create({
    data: {
      portfolioId,
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      text: formData.get('text') as string,
    },
  })
  revalidatePath('/dashboard/testimonials')
}

export async function updateTestimonial(id: string, formData: FormData) {
  const portfolioId = await getPortfolioId()
  await prisma.testimonial.updateMany({
    where: { id, portfolioId },
    data: {
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      text: formData.get('text') as string,
    },
  })
  revalidatePath('/dashboard/testimonials')
}

export async function deleteTestimonial(id: string) {
  const portfolioId = await getPortfolioId()
  await prisma.testimonial.deleteMany({ where: { id, portfolioId } })
  revalidatePath('/dashboard/testimonials')
}
