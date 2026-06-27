import React from 'react';
import styles from './StatusBadge.module.css';

const StatusBadge = ({ status }) => {
  let statusClass = '';

  switch (status) {
    case 'EXCELLENT':
      statusClass = styles.excellent;
      break;
    case 'GOOD':
      statusClass = styles.good;
      break;
    case 'AVERAGE':
      statusClass = styles.average;
      break;
    case 'OK':
      statusClass = styles.needsAttention;
      break;
    default:
      statusClass = styles.default;
  }

  return (
    <span className={`${styles.badge} ${statusClass}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
