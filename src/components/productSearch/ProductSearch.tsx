import React, { useEffect, useState } from 'react';

import { IFilterState } from '../../types';
import { useDebouncedCallback  } from 'use-debounce';

import Input from '../UI/input/input';

import styles from './ProductSearch.module.scss';

interface IProductSearchType {
  searchQuery: string,
  SetFilter: (searchQuery: string) => void
}


const ProductSearch = ({ searchQuery, SetFilter }: IProductSearchType) => {

  const [inputValue, setInputValue] = useState('');

  const debounced = useDebouncedCallback(
    (value) => {
      SetFilter( value );
    }, 500 );

  const onInputChange = (val: string) => {
    setInputValue(val);
    debounced(val);
  };

  return (
    <>
      <Input type="text"
        className={styles.search__searchInput}
        placeholder="Поиск пиццы..."
        name="searchInput"
        id="searchInput"
        onChange={(e) => onInputChange( e.target.value )}
        value={inputValue}
      />
    </>
  );
};

export default ProductSearch;