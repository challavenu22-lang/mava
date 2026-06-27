import React from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

const Button = ({ children, variant = 'primary', onClick, type = 'button', icon: Icon, disabled, className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {Icon && <Icon className={styles.icon} />}
      {children}
    </motion.button>
  );
};

export default Button;
