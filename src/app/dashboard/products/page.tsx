import { products } from '@/data'
import { ProductCart } from '@/products'

export default function NamePage() {
	return (
		<div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
			{products.map((product) => (
				<ProductCart key={product.id} {...product} />
			))}
		</div>
	)
}
