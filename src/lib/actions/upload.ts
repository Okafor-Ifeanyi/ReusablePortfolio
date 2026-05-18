'use server'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { cloudinary } from '@/lib/cloudinary'

export async function uploadImage(
  formData: FormData,
  folder: 'avatars' | 'projects' | 'covers' = 'projects'
): Promise<{ url: string | null; error?: string }> {
  const { userId } = await auth()
  if (!userId) redirect('/login')

  const file = formData.get('file') as File | null
  if (!file || file.size === 0) return { url: null, error: 'No file provided' }

  console.log(`Uploading file: ${file.name}, size: ${file.size} bytes, type: ${file.type}`)
  const maxMb = 10
  if (file.size > maxMb * 1024 * 1024) {
    return { url: null, error: `File must be under ${maxMb}MB` }
  }

  const bytes = await file.arrayBuffer()
  const base64 = Buffer.from(bytes).toString('base64')
  const dataUri = `data:${file.type};base64,${base64}`

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: `portfolio/${folder}`,
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  })

  return { url: result.secure_url }
}
