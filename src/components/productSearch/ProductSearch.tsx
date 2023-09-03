import { IFilterState } from '../../types';

import Input from '../UI/input/input';

import styles from './ProductSearch.module.scss';

interface IProductSearchType {
  searchQuery: string,
  SetFilter: (searchQuery: string) => void
}

const ProductSearch = ({ searchQuery, SetFilter }: IProductSearchType) => {
  return (
    <>
      <Input type="text"
        className={styles.search__searchInput}
        placeholder="Поиск пиццы..."
        name="searchInput"
        id="searchInput"
        onChange={(e) => SetFilter( e.target.value )}
        value={searchQuery}
      />
    </>
  );
};

export default ProductSearch;