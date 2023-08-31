import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProduct } from '../../types';

interface CartSlice {
  products: IProduct[],
  totalPrice: number,
  totalCount: number,
  isOrderDone: boolean
}
const initialState: CartSlice = {
  products: [],
  totalPrice: 0,
  totalCount: 0,
  isOrderDone: false
};
export const cartSlice = createSlice({
  name: '@@cart',
  initialState,
  reducers: {
    setProductsInCart(state, action: PayloadAction<IProduct[]>) {
      state.products = [...action.payload];
    },
    addProduct(state, action: PayloadAction<IProduct>) {
      const foundProduct: IProduct | undefined = state.products.find(elem => {
        return (elem.id === action.payload.id) &&
          (elem.size === action.payload.size) &&
          (elem.doughType === action.payload.doughType);
      });
      if (foundProduct) {
        foundProduct.count++;
        foundProduct.totalPrice = foundProduct.price * foundProduct.count;
      } else {
        state.products.push({
          ...action.payload,
          count: 1,
          totalPrice: action.payload.price
        });
      }

    },
    incrementProductCount(state, action: PayloadAction<IProduct>) {
      const foundProduct = state.products.find(elem => {
        return (elem.id === action.payload.id) &&
          (elem.size === action.payload.size) &&
          (elem.doughType === action.payload.doughType)
      })
      if (foundProduct) {
        foundProduct.count++;
        foundProduct.totalPrice = foundProduct.price * foundProduct.count
      }
    },
    decrementProductCount(state, action: PayloadAction<IProduct>) {
      const foundProduct = state.products.find(elem => {
        return (elem.id === action.payload.id) &&
          (elem.size === action.payload.size) &&
          (elem.doughType === action.payload.doughType)
      })
      if (foundProduct) {
        foundProduct.count--;
        foundProduct.totalPrice = foundProduct.price * foundProduct.count
      }
    },
    calculateTotal(state) {
      state.totalPrice = state.products.reduce((acc, product) => {
        return acc + product.price * product.count;
      }, 0);
      state.totalCount = state.products.reduce((acc, product) => {
        return acc + product.count;
      }, 0);
    },
    removeProduct(state, action: PayloadAction<IProduct>) {
      state.products = state.products.filter((elem) => {
        return (elem.id !== action.payload.id) || (elem.size !== action.payload.size) || (elem.doughType !== action.payload.doughType)
      });
    },
    clearCart(state) {
      state.products = [];
    }
  }
});

export default cartSlice.reducer;

export const {
  setProductsInCart,
  addProduct,
  calculateTotal,
  decrementProductCount,
  incrementProductCount,
  removeProduct,
  clearCart
} = cartSlice.actions;
