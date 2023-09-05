import React, { useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { IFilterState, sortOptionsType } from '../../types';

import ProductFinder from '../../components/productFinder/ProductFinder';

import { setIsPaginationNeed } from '../pagination/pagination-slice';

import FilterItem from './FilterItem';
import { setActiveTypeFilter, setFilter, setIsSortPopupIsVisible } from './filter-slice';

import styles from './filter.module.scss';

type ProductFilterType = {
  filter: IFilterState,
  SetFilter: (filter: IFilterState) => void,
  SetFilterType: (type: string) => void,
  sortOptions: Array<sortOptionsType>
}
type filterArrayType = {
  title: string,
  type: string
}

export const filterArray: filterArrayType[] = [
  {
    title: 'Все',
    type: ''
  },
  {
    title: 'Мясные',
    type: 'meat'
  },
  {
    title: 'Вегетарианские',
    type: 'vegetarian'
  },
  {
    title: 'Гриль',
    type: 'grill'
  },
  {
    title: 'Острые',
    type: 'spicy'
  },
  {
    title: 'Закрытые',
    type: 'closed'
  },
];

const ProductFilter = ({ filter, SetFilter, SetFilterType, sortOptions }: ProductFilterType) => {
  const dispatch = useAppDispatch();

  const { activeTypeFilter, sort: sortFilter, order: sortOrder, isSortPopupIsVisible } = useAppSelector(state => state.filter);

  const onSetActiveFilterType = (activeTypeFilter: string) => {
    dispatch(setActiveTypeFilter(activeTypeFilter));
  };
  const onSetFilterType = (typeFilter: string) => {
    SetFilterType(typeFilter);
  };
  const getSortPopup = () => {
    dispatch(setIsSortPopupIsVisible(true));
  };
  const onChangeSort = (e: React.MouseEvent, value: {sort: string, order: string}) => {
    SetFilter({ ...filter, sort: value.sort, order: value.order });
    dispatch(setIsSortPopupIsVisible(false));
  };

  const titleOfSortedBy = sortOptions.find(elem => elem.value.sort === sortFilter);

  const sortSpan = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && !sortSpan.current?.contains(e.target)) {
        dispatch(setIsSortPopupIsVisible(false));
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [dispatch]);

  const onSetFilter = (filter: IFilterState) => {
    dispatch(setFilter(filter));
    filter.searchQuery !== '' ? dispatch(setIsPaginationNeed(false)) : dispatch(setIsPaginationNeed(true));
  };

  return (
    <>
      <div className={styles.filter}>
        <ul className={styles.filter__categories}>
          {filterArray.map((item) => {
            return <FilterItem
              title={item.title}
              type={item.type}
              SetFilterType={onSetFilterType}
              activeTypeFilter={activeTypeFilter}
              onSetActiveFilterType={onSetActiveFilterType}
            />;
          })
          }
        </ul>
        <div className={styles.filter__sort}>
          <div className={styles.filter__sortInner}>
            <label className={styles.sort__label} htmlFor="sort">Сортировка по:</label>
            <div className={styles.sort__selected}
              ref={sortSpan}
              onClick={getSortPopup}
             > {titleOfSortedBy && <span>{titleOfSortedBy.title} {titleOfSortedBy.icon}</span>}  </div>
            {isSortPopupIsVisible ?
              <ul className={styles.sort__selectVisible}>
                {sortOptions.map((elem) => {
                  return <li className={(sortFilter === elem.value.sort && sortOrder === elem.value.order) ?
                    `${styles.sort__optionVisible} ${styles.sort__optionVisible_active}`
                    :
                    `${styles.sort__optionVisible}`
                  }
                  onClick={(e: React.MouseEvent) => onChangeSort(e, elem.value)}
                  >{elem.title} {elem.icon}</li>;
                })
                }
              </ul>
              : null
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;