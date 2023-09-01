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

  return (
    <form className={styles.form}>
      <h2 className={styles.form__title}>{title}</h2>
      <input
        className={styles.form__field}
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); }}
        placeholder="email"
      />
      <input
        className={styles.form__field}
        type="password"
        value={pass}
        onChange={(e) => { setPass(e.target.value); }}
        placeholder="Пароль"
      />
      <button
        className={classNames(commonStyles.btn, commonStyles.btn_action)}
        onClick={(e) => { e.preventDefault(); handleClick(email, pass); }}
      >
        {submitTitle}
      </button>
    </form>
  );
};

export default Form;