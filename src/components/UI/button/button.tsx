import React from 'react';

import styles from './Button.module.scss';

type ButtonType = {
  children: React.ReactNode,
  className?: string,
  onClick?: () => void
}

const Button = ({ children, ...props }: ButtonType) => {

  return (
    <button {...props} className={props.className + ' ' + styles.btn}>
      {children}
    </button>
  );
};

export default Button;