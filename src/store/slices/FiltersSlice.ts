import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFiltersState {
	limit: number;
	offset: number;
	category?: string;
	title?: string;
	sortBy?: 'title' | 'price';
	sortOrder?: 'asc' | 'desc';
	totalCount: number;
}

const initialState: IFiltersState = {
	limit: 10,
	offset: 0,
	totalCount: 0,
}

export const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setTotalCount: (state, action: PayloadAction<number>) => {
			state.totalCount = action.payload;
		},
		setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
        setCategory: (state, action: PayloadAction<string | undefined>) => {
            state.category = action.payload;
        },
        setTitle: (state, action: PayloadAction<string | undefined>) => {
            state.title = action.payload;
        },
        setSort: (state, action: PayloadAction<string>) => {
			switch (action.payload) {
				case 'none':
                    state.sortBy = undefined;
                    state.sortOrder = undefined;
                    break;
                case 'cheap':
                    state.sortBy = 'price';
                    state.sortOrder = 'asc';
                    break;
                case 'expensive':
                    state.sortBy = 'price';
                    state.sortOrder = 'desc';
                    break;
                case 'alphabetical':
                    state.sortBy = 'title';
                    state.sortOrder = 'desc';
                    break;
                case 'reverseAlpha':
                    state.sortBy = 'title';
                    state.sortOrder = 'asc';
                    break;
			}
        },
	},
})

export const { actions: filtersActions } = filtersSlice;
export const { reducer: filtersReducer } = filtersSlice;
