import React from 'react';

import { useNavigate } from 'react-router-dom';

import Header from '../../components/header/Header';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import commonStyles from '../../styles/commonStyles.module.css';

import styles from './cart.module.css';

import CartItem from './CartItem';
import { calculateTotal, clearCart } from './cart-slice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { products: productsInCart, totalCount, totalPrice } = useAppSelector(state => state.cart);

  const onBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/');
  };
  const onClearCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(clearCart());
    dispatch(calculateTotal());
  };
  return (
    <>
      <div className={commonStyles.wrapper}>
        <div className={commonStyles.container}>
          <Header isSearchFieldIsRequired={false} />
          <main>
            <div className={styles.cartWrapper}>
              <article className={styles.cart}>
                <div className={styles.cart__header}>
                  <h1 className={styles.cart__title}><i className={`fa fa-shopping-cart ${styles.faShoppingCart_cart}`}
                    aria-hidden="true"></i>Корзина</h1>
                  <button className={`${commonStyles.btn} ${styles.btn_cart} ${styles.btnTrash}`}
                    onClick={onClearCart}
                  >
                    <i className={`fa fa-trash ${styles.faTrash_cart}`} aria-hidden="true"></i> Очистить
                    корзину
                  </button>
                </div>
                <ul className={styles.cart__list}>
                  {productsInCart.map((product) => {
                    return <CartItem
                      key={product.id}
                      product={product}
                    />;
                  })
                  }
                </ul>
                <div className={styles.cart__footer}>
                  <div className={styles.cart__total}>
                    <div className={styles.cart__totalProducts}>Всего товаров: <span
                      className={styles.cart__totalProductsCount}>{totalCount} шт.</span></div>
                    <div className={styles.cart__totalPrice}>Сумма заказа: <span
                      className={styles.cart__totalPriceCount}>{totalPrice}<i className="fa fa-rub"
                        aria-hidden="true"></i></span>
                    </div>
                  </div>
                  <div className={styles.cart__controls}>
                    <button onClick={onBack}
                      className={`${commonStyles.btn} ${commonStyles.btn_inaction}`}>На главную</button>
                    <button className={`${commonStyles.btn} ${commonStyles.btn_action}`}>Оплатить сейчас</button>
                  </div>
                </div>
              </article>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Cart;
