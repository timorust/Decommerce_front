import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware({
	publicRoutes: ['/:path*'],
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
