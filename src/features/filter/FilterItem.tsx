import Button from '../../components/UI/button/button';

import commonStyles from '../../styles/commonStyles.module.css';

import styles from './filter.module.css';

type FilterItemType = {
  title: string,
  type: string,
  SetFilterType: (typeFilter: string) => void,
  activeTypeFilter: string,
  onSetActiveFilterType: (activeFilterType: string) => void
}

const FilterItem = ({ title, type, SetFilterType, activeTypeFilter, onSetActiveFilterType }: FilterItemType) => {
  const OnSetFilterType = () => {
    onSetActiveFilterType(type);
    SetFilterType(type);
  };
  return (
    <li className={styles.filter__item}>
      <Button
        className={(type === activeTypeFilter) ? `${commonStyles.btn} ${commonStyles.btn_active}` : `${commonStyles.btn}`}
        onClick={() => OnSetFilterType()}
      >{title}</Button>
    </li>
  );
};

export default FilterItem;