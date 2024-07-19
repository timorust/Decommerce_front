import { getCollections } from '@/lib/actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Collections = async () => {
	const collections = await getCollections()

	return (
		<div className='flex flex-col '>
			<p className='text-heading1-bold'>Collections</p>
			{!collections || collections.length === 0 ? (
				<p className='text-body-bold'>No collection found</p>
			) : (
				<div>
					{collections.map((collection: CollectionType) => (
						<Link href={`/collections/${collection._id}`} key={collection._id}>
							<Image
								key={collection._id}
								src={collection.image}
								alt={collection.title}
								width={350}
								height={200}
								className='rounded-ld cursor-pointer'
							/>
						</Link>
					))}
				</div>
			)}
		</div>
	)
}

export default Collections
