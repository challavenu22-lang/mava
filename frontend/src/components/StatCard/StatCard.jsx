import React from 'react';
import styles from './StatCard.module.css';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color = 'primary' }) => {
  return (
    <motion.div 
      className={`card ${styles.statCard}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <h3 className={styles.value}>{value}</h3>
      </div>
      <div className={`${styles.iconContainer} ${styles[color]}`}>
        <Icon size={24} />
      </div>
    </motion.div>
  );
};

export default StatCard;
