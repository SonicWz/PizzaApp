import { IFilterState } from '../../types';

import Input from '../UI/input/input';

import styles from './ProductFinder.module.scss';

interface IProductFinderType {
  filter: IFilterState,
  SetFilter: (filter: IFilterState) => void
}

const ProductFinder = ({ filter, SetFilter }: IProductFinderType) => {
  return (
    <>
      <Input type="text"
        className={styles.search__searchInput}
        placeholder="Найти в этом разделе"
        name="searchInput"
        id="searchInput"
        onChange={(e) => SetFilter({ ...filter, searchQuery: e.target.value })}
        value={filter.searchQuery}
      />
    </>
  );
};

export default ProductFinder;