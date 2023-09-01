import React from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { IProduct } from '../../types';

import ProductItem from '../ProductItem/ProductItem';

import commonStyles from '../../styles/commonStyles.module.scss';

import styles from './productList.module.scss';

type ProductsListType = {
  products: Array<IProduct>,
  title: string
}

const ProductsList = ({ products, title }: ProductsListType) => {
  if (!products.length) {
    return (<div className={commonStyles.errorTitleWrap}>
      <p className={commonStyles.errorTitle}>Ничего не найдено</p>
    </div>);
  }
  return (
    <>
      <h1 className={styles.category__title}>{title}</h1>
      <TransitionGroup>
        <ul className={styles.category__list}>
          {products.map((product, index) => {
            return <CSSTransition
              key={product.id}
              timeout={500}
              classNames="products"
            >
              <ProductItem
                thisProduct={product}
              />
            </CSSTransition>;
          })
          }
        </ul>
      </TransitionGroup>
    </>
  );
};

export default ProductsList;