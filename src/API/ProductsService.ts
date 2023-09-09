import axios from 'axios';

import { IProduct } from '../types/productTypes';

export interface IgetAll {
  page: number,
  limit: number,
  type?: string,
  sort?: string | undefined,
  order?: string | undefined,
  title_like?: string | undefined,
}

export default class ProductsService {
  static async getAll({ page, limit, type, sort, order, title_like }: IgetAll) {
    const response = await axios.get<IProduct[]>('https://scythe-mud-mascara.glitch.me/products', {
      params: {
        _page: page,
        _limit: limit,
        type: type,
        _sort: sort,
        _order: order,
        title_like: title_like,
      }
    });
    return response;
  }
  static async getProductById(productId: string | undefined) {
    const response = await axios.get<IProduct>(`https://scythe-mud-mascara.glitch.me/products/${productId}`);
    return response;
  }
  static async getProductByName(productName: string | undefined) {
    const response = await axios.get<IProduct[]>(`https://scythe-mud-mascara.glitch.me/products?title_like=${productName}`);
    return response;
  }

}