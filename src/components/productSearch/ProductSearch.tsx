import { IFilterState } from '../../types';

import Input from '../UI/input/input';

import styles from './ProductSearch.module.css';

interface IProductSearchType {
  filter: IFilterState,
  SetFilter: (filter: IFilterState) => void
}

const ProductSearch = ({ filter, SetFilter }: IProductSearchType) => {
  return (
    <>
      <Input type="text"
        className={styles.search__searchInput}
        placeholder="Поиск пиццы..."
        name="searchInput"
        id="searchInput"
        onChange={(e) => SetFilter({ ...filter, searchQuery: e.target.value })}
        value={filter.searchQuery}
      />
    </>
  );
};

export default ProductSearch;