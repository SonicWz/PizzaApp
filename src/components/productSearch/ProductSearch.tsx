import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

import { useDebouncedCallback  } from 'use-debounce';
import { setDefaultSearchQuery } from '../../features/search/search-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import Input from '../UI/input/input';

import styles from './ProductSearch.module.scss';

interface IProductSearchType {
  searchQuery: string,
  SetFilter: (searchQuery: string) => void
}


const ProductSearch = ({ searchQuery, SetFilter }: IProductSearchType) => {

  const dispatch = useAppDispatch();
  const { searchQuery: query } = useAppSelector(state => state.search);

  const [inputValue, setInputValue] = useState(query);
  
  const debounced = useDebouncedCallback(
    (value) => {
      SetFilter( value );
    }, 500 );

  const onInputChange = (val: string) => {
    setInputValue(val);
    debounced(val);
  };
  const onCloseBtn = () => {
    dispatch(setDefaultSearchQuery())
  }; 

  useEffect(() => {
    setInputValue(query)
  }, [query])

  return (
    <div className={styles.search}>
      <Input type="text"
        className={styles.search__searchInput}
        placeholder="Поиск пиццы..."
        name="searchInput"
        id="searchInput"
        onChange={(e) => onInputChange( e.target.value )}
        value={inputValue}
      />
      {
        query && <IoClose 
          className={styles.closeBtn}
          onClick={onCloseBtn}
        />
      }
    </div>
  );
};

export default ProductSearch;