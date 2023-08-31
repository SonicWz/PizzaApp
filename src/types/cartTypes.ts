import {IProduct} from './productTypes';

export interface ICartState {
  products: Array<IProduct>,
  totalPrice: number,
  totalCount: number,
  isOrderDone: boolean
}