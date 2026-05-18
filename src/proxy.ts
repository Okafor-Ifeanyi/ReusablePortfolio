import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN ?? 'ifeanyiokafor.com'

const isProtectedRoute  = createRouteMatcher(['/dashboard(.*)'])
const isPublicOnlyRoute = createRouteMatcher(['/', '/onboarding(.*)', '/login(.*)', '/register(.*)'])
const isWebhookRoute    = createRouteMatcher(['/api/webhooks(.*)'])

const handler = clerkMiddleware(async (auth, req) => {
  if (isWebhookRoute(req)) return

  const host = req.headers.get('host') ?? ''
  const url = req.nextUrl.clone()

  // Strip port for local dev comparisons
  const hostWithoutPort = host.split(':')[0]

  // ── Subdomain routing: john.ifeanyiokafor.com → /{username} ──
  const subdomainMatch = hostWithoutPort.match(new RegExp(`^([a-z0-9-]+)\\.${BASE_DOMAIN.replace('.', '\\.')}$`))
  if (subdomainMatch) {
    const subdomain = subdomainMatch[1]
    const portfolio = await prisma.portfolio.findUnique({
      where: { subdomain },
      select: { slug: true, isHosted: true },
    })

    if (portfolio?.isHosted) {
      url.pathname = `/${portfolio.slug}${url.pathname === '/' ? '' : url.pathname}`
      return NextResponse.rewrite(url)
    }

    return new NextResponse(null, { status: 404 })
  }

  // ── Custom domain routing: johndoe.com → /{username} ──
  if (hostWithoutPort !== BASE_DOMAIN && hostWithoutPort !== `www.${BASE_DOMAIN}`) {
    const mapping = await prisma.domainMapping.findUnique({
      where: { customDomain: hostWithoutPort },
      select: { verified: true, portfolio: { select: { slug: true } } },
    })

    if (mapping?.verified && mapping.portfolio) {
      url.pathname = `/${mapping.portfolio.slug}${url.pathname === '/' ? '' : url.pathname}`
      return NextResponse.rewrite(url)
    }

    if (mapping && !mapping.verified) {
      return new NextResponse('Domain not verified yet.', { status: 403 })
    }
  }

  // ── Normal app routing with Clerk protection ──
  const { isAuthenticated, redirectToSignIn } = await auth()

  if (!isAuthenticated && isProtectedRoute(req)) {
    return redirectToSignIn()
  }

  if (isAuthenticated && isPublicOnlyRoute(req)) {
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }
})

// Named export required by Next.js 16 proxy convention
export const proxy = handler
// Default export for Clerk's detection fallback
export default handler

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
