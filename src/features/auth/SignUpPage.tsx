
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { signUp } from './auth-slice';

import styles from './Form.module.scss';

import Form from './Form';
import { useEffect } from 'react';

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const signUpUser = (email: string, password: string) => {
    dispatch(signUp({ email, password }));
  };
  const { email, error } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (email){
      navigate('/');
    }
  }, [email]);

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