import React, { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import Header from '../../components/header/Header';
import { calculateTotal } from '../cart/cart-slice';
import ProductItem from '../../components/ProductItem/ProductItem';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import commonStyles from '../../styles/commonStyles.module.css';

import Loader from '../../components/UI/Loader/Loader';

import styles from './productPage.module.css';

import { fetchProductById } from './product-slice';


const ProductPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { currentProduct: product, isLoading } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(calculateTotal());
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const OnBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <>
      <div className={commonStyles.wrapper}>
        <div className={commonStyles.container}>
          <Header />
          <main>
            <article className={`${styles.category} ${styles.category_single}`}>
              {isLoading ?
                <Loader />
                :
                <>
                  <div className={commonStyles.goBackBtnWrapper}>
                    <button className={commonStyles.btn}
                      onClick={OnBack}
                    >Назад</button>
                  </div>
                  <ul className={`${styles.category__list} ${styles.category__list_current}`}>
                    <ProductItem thisProduct={product} />
                  </ul>
                </>
              }

            </article>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
