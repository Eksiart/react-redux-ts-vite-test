import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productApi } from '@/store/services/ProductService.ts';
import { filtersSlice } from '@/store/slices/FiltersSlice.ts';

const rootReducer = combineReducers({
	filters: filtersSlice.reducer,
	[productApi.reducerPath]: productApi.reducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(productApi.middleware)
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

