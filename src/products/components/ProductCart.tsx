'use client'

// https://tailwindcomponents.com/component/e-commerce-product-card

import Image from 'next/image'
import { IoAddCircleOutline, IoTrashOutline } from 'react-icons/io5'
import { Star } from './Star'
import { useRouter } from 'next/navigation'
import { addProductToCart, removeProductFromCart } from '@/shopping-cart'

interface Props {
	id: string
	name: string
	price: number
	rating: number
	image: string
}

export const ProductCart = ({ id, name, price, rating, image }: Props) => {

  const router = useRouter()

  const onAddToCart = () => {
    addProductToCart(id)
    router.refresh()
  }

  const onRemoveFromCart = () => {
    removeProductFromCart(id)
    router.refresh()
  }

	return (
		<div className="max-w-sm rounded-lg border-gray-100 bg-gray-800 shadow">
			{/* Product Image */}
			<div className="p-2">
				<Image
					width={500}
					height={500}
					className="rounded"
					src={image}
					alt="product image"
				/>
			</div>

			{/* Title */}
			<div className="px-5 pb-5">
				<a href="#">
					<h3 className="text-xl font-semibold tracking-tight text-white">
						{name}
					</h3>
				</a>
				<div className="mb-5 mt-2.5 flex items-center">
					{/* Stars */}
					{Array(rating)
						.fill(0)
						.map((x, i) => (
							<Star key={i} />
						))}

					{/* Rating Number */}
					<span className="ml-3 mr-2 rounded bg-blue-200 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
						{rating.toFixed(2)}
					</span>
				</div>

				{/* Price and Add to Cart */}
				<div className="flex items-center justify-between">
					<span className="text-2xl font-bold text-white">
						${price.toFixed(2)}
					</span>

					<div className="flex">
						<button
							onClick={onAddToCart}
							className="mr-2 rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-800"
						>
							<IoAddCircleOutline size={25} />
						</button>
						<button
							onClick={onRemoveFromCart}
							className="rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-800"
						>
							<IoTrashOutline size={20} />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
