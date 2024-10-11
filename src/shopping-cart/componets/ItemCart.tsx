'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { IoAddCircleOutline, IoRemove } from 'react-icons/io5'

import type { Product } from '@/data/products'
import { addProductToCart, removeSingleItemFromCart } from '../actions/actions'

interface Props {
	product: Product
	quantity: number
}

export const ItemCart = ({ product, quantity }: Props) => {
	const router = useRouter()

	function onAddToCart() {
		addProductToCart(product.id)
		router.refresh()
	}

	function onRemoveItem() {
		removeSingleItemFromCart(product.id);
		router.refresh()
	}

	return (
		<div className="flex w-full items-center rounded-lg border-gray-100 bg-gray-800 shadow">
			{/* Product Image */}
			<div className="p-2">
				<Image
					width={200}
					height={200}
					className="rounded"
					src={product.image}
					alt={product.name}
				/>
			</div>

			{/* Title */}
			<div className="mt-2 flex w-full flex-col px-5 pb-5">
				<a href="#">
					<h3 className="text-xl font-semibold tracking-tight text-white">
						{product.name} -{' '}
						<small className="text-sm">${product.price.toFixed(2)}</small>
					</h3>
				</a>

				{/* Price and Add to Cart */}
				<div className="flex flex-col items-start justify-between">
					<span className="text-gray-900 dark:text-white">
						Cantidad: {quantity}
					</span>
					<span className="font-bold text-white">
						Total: ${(product.price * quantity).toFixed(2)}
					</span>
				</div>
			</div>

			<div className="flex items-center justify-center p-5">
				<button
					onClick={onAddToCart}
					className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					<IoAddCircleOutline size={25} />
				</button>
				<span className="mx-10 text-2xl text-white">{quantity}</span>
				<button
					onClick={onRemoveItem}
					className="rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
				>
					<IoRemove size={25} />
				</button>
			</div>
		</div>
	)
}
