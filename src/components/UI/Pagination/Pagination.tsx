import styles from './pagination.module.css';

type PaginationType = {
  totalPagesArray: number[],
  getPage: (page: number) => void,
  activePage: number
}

const Pagination = ({ totalPagesArray, getPage, activePage }: PaginationType) => {

  const getPageLocal = (page: number) => {
    getPage(page);
  };

  return (
    <div className={styles.pagination}>
      <ul className={styles.pagination__list}>
        {totalPagesArray.map((elem) =>
          <li className={activePage === elem ? `${styles.pagination__item} ${styles.pagination__item_active}` : `${styles.pagination__item}`}
            key={elem}
            onClick={() => getPageLocal(elem)}
          >{elem}
          </li>
        )
        }
      </ul>
    </div>
  );
};

export default Pagination;