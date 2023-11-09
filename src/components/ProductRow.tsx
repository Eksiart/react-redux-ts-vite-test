import { IProduct } from '@/models/IProduct.ts';

interface ProductRowProps {
	product: IProduct,
	dark: boolean,
}

const ProductRow = ({product, dark} : ProductRowProps) => {
	return (
		<tr
			className={dark ? 'bg-white' : 'bg-[#e4f0ff]'}
			key={product.id}
		>
			<td className="p-2 text-sm text-gray-700">{product.title}</td>
			<td className="p-2 text-sm text-gray-700">${product.price}</td>
			<td className="p-2 text-sm text-gray-700">{product.category}</td>
		</tr>
	);
};

export default ProductRow;
