import React from 'react';
import styles from './Skeleton.module.css';

const Skeleton = ({ width, height, borderRadius = 'var(--border-radius-sm)', className = '' }) => {
  const style = {
    width: width || '100%',
    height: height || '20px',
    borderRadius: borderRadius,
  };

  return <div className={`${styles.skeleton} ${className}`} style={style}></div>;
};

export default Skeleton;
