import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import paginationReducer from '../features/pagination/pagination-slice';
import cartReducer from '../features/cart/cart-slice';
import filterReducer from '../features/filter/filter-slice';

import { productsReducer } from '../features/product/product-slice';
import { authReducer } from '../features/auth/auth-slice';
import searchSlice from '../features/search/search-slice';




const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  pagination: paginationReducer,
  filter: filterReducer,
  cart: cartReducer,
  search: searchSlice
});

const persistConfig = {
  key: 'root',
  storage,
};
 
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

