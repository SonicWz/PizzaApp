import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getPagesCount } from '../../utils/pages';
import { fetchProductByName, fetchProducts } from '../product/product-slice';

interface PaginationSlice {
  totalPages: number,
  limit: number,
  page: number,
  isPaginationNeed: boolean
}

const initialState: PaginationSlice = {
  totalPages: 1,
  limit: 6,
  page: 1,
  isPaginationNeed: true
};

export const paginationSlice = createSlice({
  name: '@@pagination',
  initialState,
  reducers: {
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setIsPaginationNeed(state, action: PayloadAction<boolean>) {
      state.isPaginationNeed = action.payload;
    },
    setDefault() {
      return initialState;
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled.type]: (state, action: PayloadAction<any>) => {
      const totalProductsCount = Number(action.payload.headers['x-total-count']);
      state.totalPages = getPagesCount(totalProductsCount, state.limit);
      totalProductsCount <= state.limit ? state.isPaginationNeed = false : state.isPaginationNeed = true;
    },
    [fetchProductByName.fulfilled.type]: (state, action: PayloadAction<any>) => {
      const totalProductsCount = Number(action.payload.data.length);
      state.totalPages = getPagesCount(totalProductsCount, state.limit);
      totalProductsCount <= state.limit ? state.isPaginationNeed = false : state.isPaginationNeed = true;
    }
  }
});

export const {
  setDefault,
  setLimit,
  setTotalPages,
  setPage,
  setIsPaginationNeed,
} = paginationSlice.actions;

export default paginationSlice.reducer;


