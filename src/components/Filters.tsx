import { useCallback } from 'react';
import { useAppDispatch } from '@/hooks/redux.ts';
import { debounce } from "lodash"
import { useFetchAllCategoriesQuery } from '@/store/services/ProductService.ts';
import { filtersActions } from '@/store/slices/FiltersSlice.ts';

const Filters = () => {
	const dispatch = useAppDispatch();
	const { data: categories } = useFetchAllCategoriesQuery();

	const onChangeCategory = useCallback((value?: string) => {
		dispatch(filtersActions.setCategory(value === 'none' ? undefined : value));
	}, [dispatch])

	const onChangeSort = useCallback((value?: string) => {
		dispatch(filtersActions.setSort(value || 'none'));
	}, [dispatch])

	const onChangeSearchString = useCallback(
		debounce((value?: string) => {
			dispatch(filtersActions.setTitle(value || undefined));
		}, 500)
		,[dispatch]
	)


	return (
		<header className="fixed top-0 left-0 right-0 z-1 bg-white flex flex-row gap-8 py-4 px-16 shadow-md">
			<div>
				<select
					id="category"
					name="category"
					defaultValue="none"
					onChange={(e) => onChangeCategory(e.target.value)}
					className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				>
					<option value="none">Выберите категорию</option>
					{categories?.map((category) =>
						<option key={category.id} value={category.type}>{category.title}</option>
					)}
				</select>
			</div>
			<div>
				<select
					id="sort"
					name="sort"
					defaultValue="none"
					onChange={(e) => onChangeSort(e.target.value)}
					className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				>
					<option value="none">Без сортировки</option>
					<option value="cheap">Сначала недорогие</option>
					<option value="expensive">Сначала дорогие</option>
					<option value="alphabetical">По алфавиту</option>
					<option value="reverseAlpha">В обратном алфавитном порядке</option>
				</select>
			</div>
			<div className="md:flex-1">
				<input
					id="search"
					type="text"
					name="search"
					onChange={(e) => onChangeSearchString(e.target.value)}
					className="bg-gray-100 focus-visible:none border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
					placeholder="Найти..."
				/>
			</div>
		</header>
	);
};

export default Filters;
