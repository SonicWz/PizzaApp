import React from 'react';

import { useNavigate } from 'react-router-dom';

import classNames from 'classnames';

import { setDefaultFilter, setFilter } from '../../features/filter/filter-slice';
import logo from '../../assets/pizza_logo.svg';
import { setDefault, setIsPaginationNeed, setPage } from '../../features/pagination/pagination-slice';
import { IFilterState } from '../../types';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logOut } from '../../features/auth/auth-slice';

import ProductSearch from '../productSearch/ProductSearch';

import commonStyles from '../../styles/commonStyles.module.scss';

import styles from './header.module.scss';
import { setDefaultSearchQuery, setSearchQuery } from '../../features/search/search-slice';
import { fetchProductByName } from '../../features/product/product-slice';
import { useGetPage } from '../../hooks/useGetPage';


interface IHeader {
  isSearchFieldIsRequired?: boolean,
}

const Header = ({ isSearchFieldIsRequired = true }: IHeader) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { email } = useAppSelector(state => state.auth);
  const { totalCount, totalPrice } = useAppSelector(state => state.cart);
  const { searchQuery } = useAppSelector(state => state.search);
  const getPage = useGetPage();

  const onSetFilter = (searchQuery: string) => {
    dispatch(setDefaultFilter());
    dispatch(setSearchQuery({searchQuery}));
    dispatch(fetchProductByName(searchQuery));
    dispatch(setPage(1));
  };
  const onCartClick = () => {
    navigate('/cart');
  };
  const onLogoClick = () => {
    navigate('/');
    dispatch(setDefaultSearchQuery());
    dispatch(setDefaultFilter());
    getPage(1);
  };
  const logOutUser = () => {
    dispatch(logOut());
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={onLogoClick}>
        <img className={styles.logo__img} src={logo} alt="React pizza" />
        <div className={styles.logo__inner}>
          <span className={styles.logo__title}>The best pizza</span>
          <p className={styles.logo__description}>cамая вкусная пицца</p>
        </div>
      </div >
      {isSearchFieldIsRequired ?
        <ProductSearch
          searchQuery={searchQuery}
          SetFilter={onSetFilter}
        />
        :
        null
      }
      {email &&
        <div className={styles.authInfo}>
          <div className={styles.userEmail}>{email}</div>
          <button
            className={commonStyles.btn}
            onClick={logOutUser}
          >Выйти</button>
        </div>
      }
      <div className={styles.userCart}>
        <button className={classNames(commonStyles.btn, commonStyles.btn_action, styles.userCart__cartLink)} onClick={onCartClick}>
          <div className={styles.userCart__totalCash}>
            <span className={styles.totalCashCount}>{totalPrice}</span>
            <i className="fa fa-rub fa-1x" aria-hidden="true"></i>
          </div>
          <div className={styles.userCart__totalGoods}>
            <i className="fa fa-shopping-cart fa-1x" aria-hidden="true"></i>
            <span className={styles.totalGoodsCount}>{totalCount}</span>
          </div>
        </button>
      </div>
    </header >
  );
};

export default Header;