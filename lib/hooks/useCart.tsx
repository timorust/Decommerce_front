import { toast } from 'react-hot-toast'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CartItem {
	item: ProductType
	quantity: number
	color?: string
	size?: string
}

interface CartStore {
	cartItems: CartItem[]
	addItem: (item: CartItem) => void
}

const useCart = create(
	persist<CartStore>(
		(set, get) => ({
			cartItems: [],
			addItem: (data: CartItem) => {
				const { item, quantity, color, size } = data
				const currentItems = get().cartItems
				const existingItem = currentItems.find(
					cartItem => cartItem.item._id === item._id
				)

				if (existingItem) return toast('Item already in cart', { icon: '🛒' })

				set({ cartItems: [...currentItems, { item, quantity, color, size }] })
				toast.success('Item added to cart', { icon: '' })
			},
		}),
		{
			name: 'cart-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
)
