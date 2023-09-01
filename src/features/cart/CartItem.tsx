import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';

import { IProduct } from '../../types';
import { useAppSelector } from '../../hooks/redux';

import { calculateTotal, decrementProductCount, incrementProductCount, removeProduct } from './cart-slice';

import styles from './cart.module.scss';

type CartItemType = {
  product: IProduct
}

const CartItem = ({ product }: CartItemType) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products: productsInCart } = useAppSelector(state => state.cart);

  const thisProduct = productsInCart.find((elem) => {
    return (elem.id === product.id) &&
      (elem.size === product.size) &&
      (elem.doughType === product.doughType);
  }) as IProduct;

  const incrementProduct = () => {
    dispatch(incrementProductCount(thisProduct as IProduct));
    dispatch(calculateTotal());
  };
  const decrementProduct = () => {
    dispatch(decrementProductCount(thisProduct as IProduct));
    dispatch(calculateTotal());
  };
  const onRemove = () => {
    dispatch(removeProduct(thisProduct as IProduct));
    dispatch(calculateTotal());
  };

  interface objMatchesType<TValue> {
    [key: string]: TValue;
  }

  const objMatches: objMatchesType<string> = {
    'normal': 'Традиционное',
    'thin': 'Тонкое',
  };

  const onGetProduct = (e: React.MouseEvent<HTMLAnchorElement>, id: number) => {
    e.preventDefault();
    navigate(`/products/${id}`);
  };
  return (
    <>
      <li className={styles.cart__item}>
        <div className={styles.product__info}>
          <a href="src/features/cart/CartItem" className={styles.product__link}
            onClick={(e) => onGetProduct(e, product.id)}
          >
            <img src={product.src} alt={product.title}
              className={styles.product__img} />
            <div className={styles.product__options}>
              <span className={styles.product__title}>{product.title}</span>
              <div className={styles.product__desc}>
                <span>{objMatches[product.doughType]}</span>, <span>{product.size} см</span></div>
            </div>
          </a>
        </div>
        <div className={styles.product__countWrapper}>
          <button className={`${styles.product__countDecrementBtn} ${styles.cartBtn}`}
            onClick={decrementProduct}
            disabled={thisProduct.count < 2}
          >
            <i className="fa fa-minus" aria-hidden="true"></i></button>
          <span className={styles.product__count}>{thisProduct.count}</span>
            <button className={`${styles.product__countIncrementBtn} ${styles.cartBtn}`}
            onClick={incrementProduct}
            disabled={thisProduct.count >= 9}
          ><i className="fa fa-plus" aria-hidden="true"></i></button>
        </div>
        <span className={styles.product__price}>{thisProduct.totalPrice} <i className="fa fa-rub" aria-hidden="true"></i></span>
        <div className={styles.removeBtnWrap}>
          <button className={`${styles.product__removeBtn} ${styles.cartBtn}`}
            onClick={onRemove}
          ><i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
      </li>
      {
        (product.count >= 9) ?
          <h3>Выбрано максимальное количество товара</h3>
          : null
      }
    </>
  );
};

export default CartItem;