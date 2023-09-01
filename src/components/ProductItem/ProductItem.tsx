import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { addProduct, calculateTotal } from '../../features/cart/cart-slice';
import { IProduct } from '../../types';

import { useAppSelector } from '../../hooks/redux';
import ProductControls from '../ProductControls/ProductControls';

import styles from './productItem.module.scss';


type ProductItemType = {
  thisProduct: IProduct
}

const ProductItem = ({ thisProduct }: ProductItemType) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productsFromCart = useAppSelector((state) => {
    return state.cart.products;
  });

  useEffect(() => {
    dispatch(calculateTotal());
  }, []);


  const OnOpenProduct = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(`/products/${thisProduct.id}`);
  };

  const onAddProduct = (product: IProduct) => {
    dispatch(addProduct(product));
    dispatch(calculateTotal());
  };

  return (
    <li className={styles.category__item}>
      <a className={styles.category__link} href={thisProduct.title}
        onClick={OnOpenProduct}
      >
        <img src={thisProduct.src} alt={thisProduct.title} className={styles.item__img} />
        <div className={styles.item__title}>{thisProduct.title}</div>
      </a>
      <ProductControls
        thisProduct={thisProduct}
        productsFromCart={productsFromCart}
        AddProduct={onAddProduct}
      />
    </li>
  );
};

export default ProductItem;