import React from 'react';
import styles from './Loader.module.css';

const Loader = ({ fullScreen = true }) => {
  if (fullScreen) {
    return (
      <div className={styles.fullScreen}>
        <div className={styles.spinner}></div>
      </div>
    );
  }
  
  return <div className={styles.spinner}></div>;
};

export default Loader;
