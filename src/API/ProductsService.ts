import axios from 'axios';

import { IProduct } from '../types/productTypes';

export interface IgetAll {
  page: number,
  limit: number,
  type?: string
}

export default class ProductsService {
  static async getAll({ page, limit, type }: IgetAll) {
    const response = await axios.get<IProduct[]>('https://scythe-mud-mascara.glitch.me/products', {
      params: {
        _page: page,
        _limit: limit,
        type: type
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