'use server'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'

export async function updateFullName(formData: FormData) {
  const { userId } = await auth()
  if (!userId) redirect('/login')

  const fullName = (formData.get('fullName') as string).trim()
  if (!fullName) return

  await prisma.user.update({
    where: { clerkId: userId },
    data: { fullName },
  })

  revalidatePath('/dashboard')
}
