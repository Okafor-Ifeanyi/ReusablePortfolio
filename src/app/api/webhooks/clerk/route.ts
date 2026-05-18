import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'
import { CLERK_WEBHOOK_SECRET } from '@/lib/constants'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('CLERK_WEBHOOK_SECRET is missing from .env.local')
  }

  const headerPayload = await headers()
  const svix_id        = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 })
  }

  const body = await req.text()

  const wh = new Webhook(WEBHOOK_SECRET)
  let event: WebhookEvent

  try {
    event = wh.verify(body, {
      'svix-id':        svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    // 🔍 DEBUG 4: Log everything at the point of failure
    console.error('>>>>>>> Verification failed')
    console.error('>>>>>>> Secret used:', WEBHOOK_SECRET.slice(0, 10) + "...")
    console.error('>>>>>>> Headers passed:', { 'svix-id': svix_id, 'svix-timestamp': svix_timestamp, 'svix-signature': svix_signature?.slice(0, 30) })
    console.error('>>>>>>> Raw body (first 200 chars):', body.slice(0, 200))
    console.error('>>>>>>> Error:', err)
    return new Response('Invalid signature', { status: 400 })
  }

  const { type, data } = event

  if (type === 'user.created') {
    await prisma.user.create({
      data: {
        clerkId:   data.id,
        email:     data.email_addresses[0].email_address,
        username:  data.username ?? data.id,
        fullName:  `${data.first_name ?? ''} ${data.last_name ?? ''}`.trim(),
        avatarUrl: data.image_url ?? null,
      },
    })
  }

  if (type === 'user.updated') {
    await prisma.user.update({
      where: { clerkId: data.id },
      data: {
        email:     data.email_addresses[0].email_address,
        // username:  data.username,
        fullName:  `${data.first_name ?? ''} ${data.last_name ?? ''}`.trim(),
        avatarUrl: data.image_url ?? null,
      },
    })
  }

  if (type === 'user.deleted') {
    await prisma.user.delete({
      where: { clerkId: data.id },
    })
  }

  return new Response('OK', { status: 200 })
}