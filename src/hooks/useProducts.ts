import { useMemo } from 'react';

import { IProduct } from '../types/productTypes';

export const UseSorterProducts = (products: IProduct[], sortMethod: string) => {
  const sortedProducts = useMemo(() => {

    if (sortMethod === 'price-ascending') {
      return [...products].sort((a, b) => a['price'] - b['price']);
    }
    if (sortMethod === 'price-descending') {
      return [...products].sort((a, b) => b['price'] - a['price']);
    }
    if (sortMethod === 'title-ascending') {
      return [...products].sort((a, b) => a['title'].localeCompare(b['title']));
    }
    if (sortMethod === 'title-descending') {
      return [...products].sort((a, b) => b['title'].localeCompare(a['title']));
    }
    return products;
  }, [sortMethod, products]);

  return sortedProducts;
};

export const useSearchedAndSortedProducts = (products: IProduct[], sortMethod: string, searchQuery: string) => {
  const sortedProducts = UseSorterProducts(products, sortMethod);

  const searchedAndSortedProducts = useMemo(() => {
    return sortedProducts.filter((elem: IProduct) => elem.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, sortedProducts]);

  return searchedAndSortedProducts;
};

export const useSearchedAndSortedAndFilteredProducts = (products: IProduct[], sortMethod: string, searchQuery: string, type: string) => {
  const searchedAndSortedProducts = useSearchedAndSortedProducts(products, sortMethod, searchQuery);

  const searchedAndSortedAndFilteredProducts = useMemo(() => {
    if (type === '') {
      return searchedAndSortedProducts;
    };
    return searchedAndSortedProducts.filter((elem: IProduct) => elem.type.toLowerCase() === type
    );
  }, [type, searchedAndSortedProducts]);

  return searchedAndSortedAndFilteredProducts;
};
