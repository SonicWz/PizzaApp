import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux';
import { useAuth } from '../../hooks/useAuth';

import styles from './Form.module.scss';

import { clearError, signIn } from './auth-slice';
import Form from './Form';


const AuthPage = () => {
  const dispatch = useAppDispatch();
  const signInUser = (email: string, password: string) => {
    dispatch(signIn({ email, password }));
  };
  const [error] = useAuth();

  const handleTransition = () => {
    dispatch(clearError());
  };

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