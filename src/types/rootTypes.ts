import { IProducts } from './productTypes';
import { IPaginationState } from './paginationTypes';
import { IFilterState } from './filterTypes';
import { IModalState } from './modalTypes';
import { ICartState } from './cartTypes';
import { IAuthState } from './authTypes';

export interface IRootState {
  products: IProducts,
  pagination: IPaginationState,
  filter: IFilterState,
  modal: IModalState,
  cart: ICartState,
  auth: IAuthState,
}