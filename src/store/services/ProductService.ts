import { fetchBaseQuery, createApi, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react'
import { IProduct } from '@/models/IProduct.ts';
import { IFiltersState } from '@/store/slices/FiltersSlice.ts';
import { ICategory } from '@/models/ICategory.ts';

type fetchProductsByCategoryType = Omit<IFiltersState, "totalCount">

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://products.eksiart.ru/api' }),
	endpoints: (build) => ({
		fetchAllCategories: build.query<ICategory[], void>({
			query: () => ({
				url: `/categories`,
			}),
		}),
		fetchProductsByCategory: build.query<{products: IProduct[], totalCount: number}, fetchProductsByCategoryType>({
			query: ({ limit = 10, offset = 0, category, sortBy, sortOrder, title } ) => {
				const params = {
					_limit: limit,
						_start: offset,
						category: category,
						title_like: title,
						_sort: sortBy,
						_order: sortOrder,
				}

				const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== undefined));

				return {
					url: `/products`,
					params: filteredParams,
				}
			},
			transformResponse(products: IProduct[], meta: FetchBaseQueryMeta) {
				return { products, totalCount: Number(meta?.response?.headers.get('X-Total-Count') || 0) }
			}
		}),
	})
})

export const { useFetchProductsByCategoryQuery, useFetchAllCategoriesQuery } = productApi
