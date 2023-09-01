import { useState } from 'react';

import classNames from 'classnames';

import commonStyles from '../../styles/commonStyles.module.scss';

import styles from './Form.module.scss';

interface IForm {
  title: string,
  submitTitle: string,
  handleClick: (email: string, pass: string) => void
}

const Form = ({ title, submitTitle, handleClick }: IForm) => {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [message, setMessage] = useState('');

  const emailValidation = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (regEx.test(email)) {
      setMessage('');
      handleClick(email, pass);
    } else if (!regEx.test(email) && email !== '""') {
      setMessage('Email неподходящего формата');
    } else {
      setMessage('');
    }
  };

  const handleOnChange = (e: any) => {
    setEmail(e.target.value);
  };

  return (
    <form className={styles.form}>
      <h2 className={styles.form__title}>{title}</h2>
      <input
        className={styles.form__field}
        type="email"
        value={email}
        onChange={(e) => { handleOnChange(e); }}
        placeholder="email"
      />
      <input
        className={styles.form__field}
        type="password"
        value={pass}
        onChange={(e) => {setPass(e.target.value); }}
        placeholder="Пароль"
      />
      <button
        className={classNames(commonStyles.btn, commonStyles.btn_action)}
        onClick={(e) => { e.preventDefault(); emailValidation() }}
      >
        {submitTitle}
      </button>
      {message && <p className={commonStyles.errorTitle}>{message}</p>}
    </form>
  );
};

export default Form;