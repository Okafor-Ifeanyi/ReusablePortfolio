import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])
const isWebhookRoute = createRouteMatcher(['/api/webhooks(.*)'])

const handler = clerkMiddleware(async (auth, req) => {
  if (isWebhookRoute(req)) return

  const { isAuthenticated, redirectToSignIn } = await auth()

  if (!isAuthenticated && isProtectedRoute(req)) {
    return redirectToSignIn()
  }
})

// Named export required by Next.js 16 proxy convention
export const proxy = handler
// Default export for Clerk's detection fallback
export default handler

// export const config = {
//   matcher: [
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     '/(api|trpc)(.*)',
//   ],
// }

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};