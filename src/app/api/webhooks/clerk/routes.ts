// app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import prisma from '@/lib/db'
import { CLERK_WEBHOOK_SECRET } from '@/lib/constants'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('CLERK_WEBHOOK_SECRET is missing from .env.local')
  }

  // --- 1. Pull the Svix headers Clerk sends with every request ---
  const headerPayload = await headers()
  const svix_id        = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If any are missing, this is not a legitimate Clerk webhook
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 })
  }

  // --- 2. Get the raw request body ---
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // --- 3. Verify the signature ---
  // This throws if the signature is invalid — proving the request
  // genuinely came from Clerk and hasn't been tampered with
  const wh = new Webhook(WEBHOOK_SECRET)
  let event: WebhookEvent

  try {
    event = wh.verify(body, {
      'svix-id':        svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return new Response('Invalid signature', { status: 400 })
  }

  // --- 4. Branch on event type and run the right DB operation ---
  const eventType = event.type

  if (eventType === 'user.created') {
    const { id, email_addresses, username, first_name, last_name, image_url } = event.data

    await prisma.user.create({
      data: {
        clerkId:  id,
        email:    email_addresses[0].email_address,
        username: username ?? id, // fallback to clerk id if no username yet
        fullName: `${first_name ?? ''} ${last_name ?? ''}`.trim(),
        avatarUrl: image_url,
      }
    })

    console.log(`Created user: ${id}`)
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, username, first_name, last_name, image_url } = event.data

    await prisma.user.update({
      where: { clerkId: id },
      data: {
        email:    email_addresses[0].email_address,
        username: username ?? undefined,
        fullName: `${first_name ?? ''} ${last_name ?? ''}`.trim(),
        avatarUrl: image_url,
      }
    })

    console.log(`Updated user: ${id}`)
  }

  if (eventType === 'user.deleted') {
    const { id } = event.data

    // soft delete — keeps their portfolio data intact
    // hard delete would be db.user.delete({ where: { clerkId: id } })
    await prisma.user.update({
      where:  { clerkId: id! },
      data:   { deletedAt: new Date() }
    })

    console.log(`Deleted user: ${id}`)
  }

  // --- 5. Tell Clerk the delivery succeeded ---
  return new Response('OK', { status: 200 })
}