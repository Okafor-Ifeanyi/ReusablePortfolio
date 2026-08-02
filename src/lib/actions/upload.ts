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

  const maxMb = 10
  if (file.size > maxMb * 1024 * 1024) {
    return { url: null, error: `File must be under ${maxMb}MB` }
  }

  const bytes = await file.arrayBuffer()
  const base64 = Buffer.from(bytes).toString('base64')
  const dataUri = `data:${file.type};base64,${base64}`

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: `portfolio/${folder}`,
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    })
    return { url: result.secure_url }
  } catch (err) {
    console.error('Cloudinary image upload failed:', err)
    return { url: null, error: 'Upload failed. Please try again.' }
  }
}

const CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

/**
 * Uploads a CV/résumé. Documents go up as `raw` rather than through the image
 * pipeline, so the file is served back byte-for-byte instead of being
 * transcoded — a PDF uploaded as an image comes back as a flattened picture.
 */
export async function uploadDocument(
  formData: FormData
): Promise<{ url: string | null; name?: string; error?: string }> {
  const { userId } = await auth()
  if (!userId) redirect('/login')

  const file = formData.get('file') as File | null
  if (!file || file.size === 0) return { url: null, error: 'No file provided' }

  if (!CV_TYPES.includes(file.type)) {
    return { url: null, error: 'Must be a PDF or Word document' }
  }

  const maxMb = 10
  if (file.size > maxMb * 1024 * 1024) {
    return { url: null, error: `File must be under ${maxMb}MB` }
  }

  const bytes = await file.arrayBuffer()
  const base64 = Buffer.from(bytes).toString('base64')
  const dataUri = `data:${file.type};base64,${base64}`

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'portfolio/documents',
      resource_type: 'raw',
      // Keeps the original filename in the URL, so the browser's download
      // dialog shows "Jane-Doe-CV.pdf" rather than a random public id.
      use_filename: true,
      unique_filename: true,
    })
    return { url: result.secure_url, name: file.name }
  } catch (err) {
    console.error('Cloudinary document upload failed:', err)
    return { url: null, error: 'Upload failed. Please try again.' }
  }
}
