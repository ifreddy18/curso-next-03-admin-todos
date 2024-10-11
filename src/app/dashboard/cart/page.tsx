import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Product, products } from '@/data'
import { ItemCart } from '@/shopping-cart'
import { WidgetItem } from '@/components'

export const metadata: Metadata = {
	title: 'Shopping cart',
	description: 'SEO title in shopping cart',
}

interface ProductInCart {
	product: Product
	quantity: number
}

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
	const productsInCart: ProductInCart[] = []

	for (const id of Object.keys(cart)) {
		const product = products.find((prod) => prod.id === id)
		if (product) {
			productsInCart.push({ product, quantity: cart[id] })
		}
	}

	return productsInCart
}

export default function CartPage() {
	const cookiesStore = cookies()
	const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}') as {
		[id: string]: number
	}

	const productsInCart = getProductsInCart(cart)

	const initTotal = 0
	const totalToPay = productsInCart.reduce(
		(total, current) => current.product.price * current.quantity + total,
		initTotal,
	)

	return (
		<div>
			<h1 className="text-5xl">Products in cart</h1>
			<hr className="mb-2" />
			<div className="flex w-full flex-col gap-2 sm:flex-row">
				<div className="flex w-full flex-col gap-2 sm:w-8/12">
					{productsInCart.map(({ product, quantity }) => (
						<ItemCart key={product.id} product={product} quantity={quantity} />
					))}
				</div>

				<div className="flex w-full flex-col sm:w-4/12">
					<WidgetItem title={'Total amount'}>
						<div className="mt-2 flex justify-center gap-4">
							<h3 className="text-3xl font-bold text-gray-700">
								${(totalToPay * 1.15).toFixed(2)}
							</h3>
						</div>
						<span className="text-center font-bold text-gray-500">
							Tax 15%: ${(totalToPay * 0.15).toFixed(2)}
						</span>
					</WidgetItem>
				</div>
			</div>
		</div>
	)
}
