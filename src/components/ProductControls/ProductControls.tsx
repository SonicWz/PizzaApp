import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { IProduct } from '../../types';
import { IRootState } from '../../types';

import commonStyles from '../../styles/commonStyles.module.css';

import styles from './productControls.module.css';
import { useAppSelector } from '../../hooks/redux';

interface IProductControls {
  thisProduct: IProduct,
  productsFromCart: IProduct[]
  AddProduct: (product: IProduct) => void,
}

const ProductControls = ({ thisProduct, productsFromCart, AddProduct }: IProductControls) => {

  const isProductsInCart = useAppSelector((state) => {
    if (state.cart.products.length < 1) {
      return false;
    }
    return state.cart.products;
  });
  
  const [currentProductParams, setCurrentProductParams] = useState({
    'doughType': 'normal',
    'size': 40,
  });

  const [product, setProduct] = useState({} as IProduct);
  const [productCount, setProductCount] = useState(0);
  let thisProductCount: IProduct[];
  let commonProductCount: number;

  useEffect(() => {
    setProduct(() => ({
      ...thisProduct,
      ...currentProductParams,
    }));
  }, [currentProductParams]);

  const onAddProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setProductCount(productCount + 1);

    AddProduct({
      ...thisProduct,
      ...currentProductParams,
    });
  };

  const onAddDoughType = (doughType: string) => {
    setCurrentProductParams((prevState) => ({
      ...prevState,
      'doughType': doughType
    }));
  };

  const onAddSize = (size: number) => {
    setCurrentProductParams((prevState) => ({
      ...prevState,
      'size': size
    }));
  };

  if (productsFromCart.length > 0) {
    thisProductCount = productsFromCart.filter((elem) => elem.id === thisProduct.id);

    commonProductCount = thisProductCount.reduce((acc, elem) => {
      acc = acc + elem.count;
      return acc;
    }, 0);
  } else {
    commonProductCount = 0;
  }

  return (
    <>
      <div className={styles.item__details}>
        <div className={styles.item__type}>
          <span
            className={product.doughType === 'thin' ? styles.active : ''}
            onClick={() => onAddDoughType('thin')}
          >Тонкое</span>
          <span
            className={product.doughType === 'normal' ? styles.active : ''}
            onClick={() => onAddDoughType('normal')}
          >Традиционное</span>
        </div>
        <div className={styles.item__size}>
          <span
            className={product.size === 26 ? styles.active : ''}
            onClick={() => onAddSize(26)}>26 см</span>
          <span
            className={product.size === 30 ? styles.active : ''}
            onClick={() => onAddSize(30)}>30 см</span>
          <span
            className={product.size === 40 ? styles.active : ''}
            onClick={() => onAddSize(40)}>40 см</span>
        </div>
      </div>
      <div className={styles.item__controls}>
        <div className={styles.item__price}>от {thisProduct.price}<i className="fa fa-rub" aria-hidden="true"></i></div>
        <button className={`${commonStyles.btn} ${styles.item__add}`}
          onClick={onAddProduct}
          disabled={productCount >= 9}
        >+ Добавить
          {isProductsInCart && productsFromCart.find((elem) => elem.id === thisProduct.id) ?
            <span className={styles.item__addedCount}>
              {commonProductCount}
            </span> : null
          }
        </button>
      </div>
    </>
  );
};

export default ProductControls;