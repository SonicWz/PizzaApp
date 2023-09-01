import React, { LegacyRef } from 'react';

import style from './input.module.scss';

type InputType = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
  placeholder?: string,
  type?: string,
  className?: string,
  name?: string,
  id?: string
}

const Input = React.forwardRef((props: InputType, ref: LegacyRef<HTMLInputElement> | undefined) => {
  return (
    <input ref={ref} className={style.formField} {...props} />
  );
});

export default Input;