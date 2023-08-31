import React from 'react';
import { SpinnerCircular } from 'spinners-react';

import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderWrap}>
      <div className={styles.loader}>
        <SpinnerCircular
          size="20em"
          secondaryColor='rgba(0, 0, 0, 0.00)'
          speed={150}
          color='#fe5f1e'
        />
      </div>
    </div>
  );
};

export default Loader;