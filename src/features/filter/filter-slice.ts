import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFilterState } from '../../types';

interface FilterSlice {
  sort: string,
  order: string,
  searchQuery: string,
  type: string,
  activeTypeFilter: string,
  isSortPopupIsVisible: boolean
}

const initialState: FilterSlice = {
  sort: 'title',
  order: 'ASC',
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
      state.order = action.payload.order;
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
    },
    setDefaultFilter(){
      return initialState;
    }
  }
});

export default filterSlice.reducer;

export const { 
  setFilter, 
  setTypeFilter, 
  setActiveTypeFilter, 
  setIsSortPopupIsVisible, 
  setDefaultFilter 
} = filterSlice.actions;
