import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFilterState } from '../../types';

interface FilterSlice {
  sort: string,
  searchQuery: string,
  type: string,
  activeTypeFilter: string,
  isSortPopupIsVisible: boolean
}

const initialState: FilterSlice = {
  sort: 'title-ascending',
  searchQuery: '',
  type: '',
  activeTypeFilter: '',
  isSortPopupIsVisible: false
};

export const filterSlice = createSlice({
  name: '@@filter',
  initialState: initialState,
  reducers: {
    setFilter(state, action: PayloadAction<IFilterState>) {
      state.sort = action.payload.sort;
      state.searchQuery = action.payload.searchQuery;
    },
    setTypeFilter(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
    setActiveTypeFilter(state, action: PayloadAction<string>) {
      state.activeTypeFilter = action.payload;
    },
    setIsSortPopupIsVisible(state, action: PayloadAction<boolean>) {
      state.isSortPopupIsVisible = action.payload;
    }
  }
});

export default filterSlice.reducer;

export const { setFilter, setTypeFilter, setActiveTypeFilter, setIsSortPopupIsVisible } = filterSlice.actions;
