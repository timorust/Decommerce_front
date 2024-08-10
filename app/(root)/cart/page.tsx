import useCart from '@/lib/hooks/useCart'
import Image from 'next/image'

const Cart = () => {
	const cart = useCart()
	return (
		<div className='flex gap-20 py-16 px-10'>
			<div className='w-2/3'>
				<p className='text-heading3-bold'>Shopping Cart</p>
				<hr />

				{cart.cartItems.length === 0 ? (
					<p className='text-body-bold'>No item in cart</p>
				) : (
					<div>
						{cart.cartItems.map(cartItem => (
							<div className='flex hover:bg-grey-1 px-6 py-5 justify-center items-center'>
								<div className='flex items-center'>
									<Image
										src={cartItem.item.media[0]}
										alt='product'
										width={100}
										height={100}
										className='rounded-lg w-32 h-32 object-cover'
									/>

									<div className='flex flex-col gap-3 ml-4'>
										<p className='text-body-bold'>{cartItem.item.title}</p>

										{cartItem.color && (
											<p className='text-small-medium'>{cartItem.color}</p>
										)}

										{cartItem.size && (
											<p className='text-small-medium'>{cartItem.size}</p>
										)}
									</div>
								</div>

								<div className='flex gap-4 items-center'></div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Cart
