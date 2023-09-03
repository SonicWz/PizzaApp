import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ISearchSlice {
  searchQuery: string,
}

const initialState: ISearchSlice = {
  searchQuery: '',
};


export const searchSlice = createSlice({
  name: '@@search',
  initialState: initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<ISearchSlice>) {
      state.searchQuery = action.payload.searchQuery;
    },
  }
});

export default searchSlice.reducer;

export const { setSearchQuery } = searchSlice.actions;
