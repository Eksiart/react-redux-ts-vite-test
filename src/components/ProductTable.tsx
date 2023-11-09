import { useFetchProductsByCategoryQuery } from '@/store/services/ProductService.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts';
import ProductRow from '@/components/ProductRow.tsx';
import { useEffect } from 'react';
import { filtersActions } from '@/store/slices/FiltersSlice.ts';
import Loader from '@/components/Loader/Loader.tsx';

const ProductTable = () => {
	const dispatch = useAppDispatch();
	const { limit, sortOrder, sortBy, category, title, offset } = useAppSelector(state => state.filters)
	const { data, error, isFetching } = useFetchProductsByCategoryQuery({
		limit, offset, sortOrder, sortBy, category, title
	});

	const totalCount = data?.totalCount || 0;
	const products = data?.products

	useEffect(() => {
		dispatch(filtersActions.setTotalCount(totalCount));
	}, [dispatch, totalCount])

	const renderTableRows = () => {
		return products?.map((product, index) =>
			<ProductRow
				key={product.id}
				product={product}
				dark={index % 2 == 0}
			/>
		)
	}

	const tableContent = () => {
		if (isFetching) return (
			<tr>
				<td colSpan={3}>
					<div className="h-96 flex justify-center items-center">
						<Loader/>
					</div>
				</td>
			</tr>
		)

		if (error) return (
			<tr>
				<td>
					<p>Ошибка при загрузке товаров.</p>
				</td>
			</tr>
		)

		if (products && products.length == 0) return (
			<tr>
                <td colSpan={3}>
					<div className="h-96 flex justify-center items-center">
						<p>Похоже, товаров с таким названием нет.</p>
					</div>
                </td>
            </tr>
		)

		return renderTableRows()
	}

	return (
		<table className="w-full table-auto border rounded border-separate">
			<thead className="bg-[#cef] border-b-2 border-">
			<tr>
				<th className="p-2 text-sm font-bold tracking-wide text-left">Название</th>
				<th className="p-2 text-sm font-bold tracking-wide text-left">Цена</th>
				<th className="p-2 text-sm font-bold tracking-wide text-left">Категория</th>
			</tr>
			</thead>
			<tbody>
			{tableContent()}
			</tbody>
		</table>
	);
};

export default ProductTable;
