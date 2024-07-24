import User from '@/lib/models/User'
import { connectedToDB } from '@/lib/mongoDB'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
	try {
		const { userId } = auth()

		if (!userId) return new NextResponse('Unauthorized', { status: 401 })

		await connectedToDB()

		const user = await User.findOne({ clerkId: userId })

		if (!user) return new NextResponse(' Username not found', { status: 404 })

		const { productId } = await req.json()

		if (!productId)
			return new NextResponse('Product Id required', { status: 400 })

		const isLiked = user.wishlist.includes(productId)
		// Dislike and like
		if (isLiked) user.wishlist.filter((id: string) => id !== productId)
		else user.wishlist.push(productId)

		await user.save()
		return NextResponse.json(user, { status: 200 })
	} catch (error) {
		console.log('[wishlist_POST', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
