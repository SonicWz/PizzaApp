import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useAuth } from '../../hooks/useAuth';

import styles from './Form.module.css';

import { clearError, signIn } from './auth-slice';
import Form from './Form';
import SignUpPage from './SignUpPage';

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const signInUser = (email: string, password: string) => {
    dispatch(signIn({ email, password }));
  }
  const [email, error] = useAuth();

  const handleTransition = () => {
    dispatch(clearError())
  }

  return (
    <div className={styles.formWrapper}>
      <Form
        title={'Авторизация'}
        submitTitle={'Войти'}
        handleClick={signInUser}
      />
      <Link
        to="/register"
        className="link"
        onClick={handleTransition}
      >Зарегистрироваться</Link>
      {error && <p>Ошибка: {error}</p>}
    </div>
  );
};

export default AuthPage;