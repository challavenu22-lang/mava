import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Share2, RefreshCw } from 'lucide-react';
import StatusBadge from '../StatusBadge/StatusBadge';
import Button from '../Button/Button';
import styles from './SummaryCard.module.css';

const SummaryCard = ({ data, onRegenerate, onOk }) => {
  return (
    <motion.div 
      className={`card ${styles.summaryCard}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>AI Generated Summary</h2>
          <p className={styles.subtitle}>Quality Score: {data.qualityScore}/5.0</p>
        </div>
        <StatusBadge status={data.status} />
      </div>

      <div className={styles.section}>
        <h3>Executive Summary</h3>
        <p>{data.executiveSummary}</p>
      </div>

      <div className={styles.twoColumn}>
        <div className={styles.section}>
          <h3>Key Insights</h3>
          <ul>
            {data.keyInsights.map((insight, idx) => (
              <li key={idx}>{insight}</li>
            ))}
          </ul>
        </div>
        
        <div className={styles.section}>
          <h3>Recommendations</h3>
          <ul>
            {data.recommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.spacer}></div>
        <Button variant="secondary" icon={RefreshCw} onClick={onRegenerate}>Regenerate</Button>
        <Button variant="primary" onClick={onOk}>OK</Button>
      </div>
    </motion.div>
  );
};

export default SummaryCard;
