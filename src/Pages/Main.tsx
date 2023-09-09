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
import { setDefaultSearchQuery } from '../features/search/search-slice';
import { useGetPage } from '../hooks/useGetPage';

const Main = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector(state => state.products);
  const { totalPages, isPaginationNeed, page, limit } = useAppSelector(state => state.pagination);
  const { filter } = useAppSelector(state => state);
  const { type } = useAppSelector(state => state.filter);
  const { searchQuery } = useAppSelector(state => state.search);

  useAuth();

  const pagesArray = getPagesArray(totalPages);

  const getPage = useGetPage();
  // const getPage = (page: number): void => {
  //   dispatch(setPage(page));
  //   dispatch(fetchProducts({ 
  //     limit, 
  //     page, 
  //     type,
  //     sort: filter.sort,
  //     order: filter.order,
  //    }));

  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: 'smooth',
  //   });
  // };

  const sortedAndSearchedProducts: IProduct[] = useSearchedAndSortedAndFilteredProducts(products, filter.sort, filter.searchQuery, filter.type);
   
  const sortOptions: Array<sortOptionsType> = [
    { 'value': {sort: 'title', order: 'ASC'}, 'title': 'по названию', 'icon': <IoArrowUp /> },
    { 'value': {sort: 'title', order: 'DESC'}, 'title': 'по названию', 'icon': <IoArrowDown /> },
    { 'value': {sort: 'price', order: 'ASC'}, 'title': 'по цене', 'icon': <IoArrowUp /> },
    { 'value': {sort: 'price', order: 'DESC'}, 'title': 'по цене', 'icon': <IoArrowDown /> },
  ];


  const onSetFilter = (filter: IFilterState) => {
    dispatch(setFilter(filter));
    dispatch(fetchProducts({
      limit,
      page,
      type,
      sort: filter.sort,
      order: filter.order,
      title_like: searchQuery,
    }));
    
  };

  const onSetFilterType = (type: string) => {
    dispatch(setTypeFilter(type));
    dispatch(setDefault());
    dispatch(setDefaultSearchQuery());
    const page = 1;
    dispatch(fetchProducts({ 
      limit, 
      page, 
      type,
      sort: filter.sort,
      order: filter.order,
      title_like: '',
     }));
     
  };

  useEffect(() => {
    dispatch(fetchProducts({ 
      limit, 
      page, 
      type,
      sort: filter.sort,
      order: filter.order,
      title_like: searchQuery,
    }));
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
