import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useAuth } from '../../hooks/useAuth';

import { signUp } from './auth-slice';

import styles from './Form.module.css';

import AuthPage from './AuthPage';
import Form from './Form';

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const signUpUser = (email: string, password: string) => {
    dispatch(signUp({ email, password }));
  };
  const { error } = useAppSelector(state => state.auth);

  return (
    <div className={styles.formWrapper}>
      <Form
        title={'Регистрация'}
        submitTitle={'ОК'}
        handleClick={signUpUser}
      />
      <Link
        to="/auth"
        className="link"
      >Уже есть учетная запись? Авторизоваться</Link>
      {error && <p>Ошибка: {error}</p>}
    </div>
  );
};

export default SignUpPage;