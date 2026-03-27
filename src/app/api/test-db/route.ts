// app/api/test-db/route.ts
// DELETE THIS FILE BEFORE GOING TO PRODUCTION

import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name } = body

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'name is required' },
        { status: 400 }
      )
    }

     
    // Writes a test user row directly to your DB
    // using a fake clerk_id so it never collides with real users
    const user = await prisma.user.create({
      data: {
        clerkId:  `test_${Date.now()}`,
        email:    `test_${Date.now()}@test.com`,
        username: `testuser_${Date.now()}`,
        fullName: name,  
      },
    })

    return NextResponse.json({
      ok:      true,
      message: 'DB write succeeded',
      user,
    })

  } catch (err: any) {
    // Return the full error so you can see exactly what went wrong
    console.error('[test-db] error:', err)
    return NextResponse.json(
      {
        ok:      false,
        message: 'DB write failed',
        error:   err.message,
        code:    err.code,       // Prisma error code e.g. P2002 = unique constraint
      },
      { status: 500 }
    )
  }
}