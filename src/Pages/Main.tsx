import React, { useEffect } from 'react';

import commonStyles from '../styles/commonStyles.module.scss';

import ProductsList from '../components/ProductList/ProductsList';
import Header from '../components/header/Header';
import Pagination from '../components/UI/Pagination/Pagination';
import { getPagesArray } from '../utils/pages';
import { setDefault, setPage } from '../features/pagination/pagination-slice';
import ProductFilter, { filterArray } from '../features/filter/ProductFilter';
import { setFilter, setTypeFilter } from '../features/filter/filter-slice';
import { useSearchedAndSortedAndFilteredProducts } from '../hooks/useProducts';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { IProduct } from '../types';
import { IFilterState, sortOptionsType } from '../types/filterTypes';
import { fetchProducts } from '../features/product/product-slice';
import Loader from '../components/UI/Loader/Loader';
import { useAuth } from '../hooks/useAuth';

import { IoArrowUp, IoArrowDown } from "react-icons/io5";

const Main = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector(state => state.products);
  const { totalPages, isPaginationNeed, page, limit } = useAppSelector(state => state.pagination);
  const { filter } = useAppSelector(state => state);
  const { type } = useAppSelector(state => state.filter);

  useAuth();

  const pagesArray = getPagesArray(totalPages);

  const getPage = (page: number): void => {
    dispatch(setPage(page));
    dispatch(fetchProducts({ limit, page, type }));
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const sortedAndSearchedProducts: IProduct[] = useSearchedAndSortedAndFilteredProducts(products, filter.sort, filter.searchQuery, filter.type);

  const sortOptions: Array<sortOptionsType> = [
    { 'value': 'title-ascending', 'title': 'По названию', 'icon': <IoArrowUp /> },
    { 'value': 'title-descending', 'title': 'По названию', 'icon': <IoArrowDown /> },
    { 'value': 'price-ascending', 'title': 'По цене', 'icon': <IoArrowUp /> },
    { 'value': 'price-descending', 'title': 'По цене', 'icon': <IoArrowDown /> },
  ];


  const onSetFilter = (filter: IFilterState) => {
    dispatch(setFilter(filter));
  };
  const onSetFilterType = (type: string) => {
    dispatch(setTypeFilter(type));
    dispatch(setDefault());
    const page = 1;
    dispatch(fetchProducts({ limit, page, type }));
  };

  useEffect(() => {
    dispatch(fetchProducts({ limit, page, type }));
  }, []);

  let categoryTitle = '';
  let categoryTitleElement = filterArray.find((elem) => elem.type === filter.type);
  if (categoryTitleElement) {
    categoryTitle = categoryTitleElement.type === ''? 'Все пиццы' :  categoryTitleElement.title;
  }
  
  return (
    <>
      <div className={commonStyles.wrapper}>
        <div className={commonStyles.container}>
          <Header />
          <main>
            <ProductFilter
              filter={filter}
              SetFilter={onSetFilter}
              SetFilterType={onSetFilterType}
              sortOptions={sortOptions}
            />
            {isPaginationNeed && !isLoading ?
              <Pagination
                totalPagesArray={pagesArray}
                getPage={getPage}
                activePage={page}
              />
              : null
            }
            <article className={commonStyles.category}>
              {isLoading ? <Loader />
                :
                <ProductsList
                  products={sortedAndSearchedProducts}
                  title={categoryTitle}
                />
              }
            </article>
            {isPaginationNeed && !isLoading ?
              <Pagination
                totalPagesArray={pagesArray}
                getPage={getPage}
                activePage={page}
              />
              : null
            }
          </main>
        </div>
      </div>
    </>
  );
};

export default Main;
