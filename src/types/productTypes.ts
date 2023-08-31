export interface IProduct {
  id: number,
  title: string,
  type: string,
  src: string,
  price: number,
  totalPrice: number,
  count: number,
  doughType: string,
  size: number
};

export const initialProduct = {
  id: 0,
  title: '',
  type: '',
  src: '',
  price: 0,
  totalPrice: 0,
  count: 0,
  doughType: '',
  size: 0
};

export interface IProducts {
  products: Array<IProduct>,
  currentProduct: IProduct
};

export interface IProductsState {
  products: IProducts,
  currentProduct: IProduct
};