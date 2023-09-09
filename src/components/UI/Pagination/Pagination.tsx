import { useState } from 'react';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

import styles from './pagination.module.scss';

type PaginationType = {
  totalPagesArray: number[],
  getPage: (page: number) => void,
  activePage: number,
}

const Pagination = ({ totalPagesArray, getPage, activePage }: PaginationType) => {

  const [pageNumber, setPageNumber] = useState(activePage);
  const portion = 4;

  const getPageLocal = (page: number) => {
    getPage(page);
  };
  const getPrevPageLocal = (page: number) => {
    if (pageNumber !== 1) {
      getPage(page - 1);
    }
  };
  const getNextPageLocal = (page: number) => {
    if (pageNumber !== totalPagesArray.length - 1) {
      getPage(page + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <ul className={styles.pagination__list}>

        {/* prev */}
        <li
          className={pageNumber !== 1 ? `${styles.pagination__item}` : `${styles.pagination__item} ${styles.pagination__item_inaction}`}
          onClick={() => getPrevPageLocal(pageNumber)}
        ><IoArrowBack /></li>

        {/* first page, ... */}
        <div className={styles.optionalBlock}>
          {
            !(activePage < portion) ? <>
              <li
                className={styles.pagination__item}
                onClick={() => getPageLocal(1)}
              >1</li>
              <li
                className={`${styles.pagination__item} ${styles.pagination__item_unselectable}`}
              >...</li>
            </> : null
          }
        </div>

        {
          (totalPagesArray.length >= portion) && (activePage < portion) ?

            //prev, portion page
            totalPagesArray.map((elem, index) => {
              if (index <= portion) {
                return <li className={activePage === elem ? `${styles.pagination__item} ${styles.pagination__item_active}` : `${styles.pagination__item}`}
                  key={elem}
                  onClick={() => getPageLocal(elem)}
                >{elem}
                </li>
              }
            }
            )
            :

            // prev, first page, ...,  portion page
            totalPagesArray.map((elem, index) => {
              if ((index >= activePage - portion / 2) && (index <= activePage + portion / 2)) {
                return <li className={activePage === elem ? `${styles.pagination__item} ${styles.pagination__item_active}` : `${styles.pagination__item}`}
                  key={elem}
                  onClick={() => getPageLocal(elem)}
                >{elem}
                </li>
              }
            }
            )

        }

        {/* ..., last page*/}
        <div className={styles.optionalBlock}>
          {
            (activePage < totalPagesArray.length - (portion / 2 + 1)) ? <>
              <li
                className={`${styles.pagination__item} ${styles.pagination__item_unselectable}`}
              >...</li>
              <li
                className={styles.pagination__item}
                onClick={() => getPageLocal(totalPagesArray.length - 1)}
              >Последняя</li>
            </> : null
          }
        </div>

        {/* next */}
        <li
          className={pageNumber === totalPagesArray.length - 1 ? `${styles.pagination__item} ${styles.pagination__item_inaction}` : `${styles.pagination__item}`}
          onClick={() => getNextPageLocal(pageNumber)}
        ><IoArrowForward /></li>
      </ul>
    </div>
  );
};

export default Pagination;