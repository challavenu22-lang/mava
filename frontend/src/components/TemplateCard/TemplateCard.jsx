import React from 'react';
import { Star, Users, TrendingDown, AlertCircle } from 'lucide-react';
import Button from '../Button/Button';
import styles from './TemplateCard.module.css';

const iconMap = {
  'star': Star,
  'users': Users,
  'trending-down': TrendingDown,
  'alert-circle': AlertCircle
};

const TemplateCard = ({ template, onUse }) => {
  const Icon = iconMap[template.icon] || Star;
  
  return (
    <div className={`card ${styles.templateCard}`}>
      <div className={`${styles.iconHeader} ${styles[template.color]}`}>
        <Icon size={24} />
      </div>
      <h3 className={styles.title}>{template.name}</h3>
      <p className={styles.description}>{template.description}</p>
      
      <div className={styles.actions}>
        <Button variant="primary" onClick={() => onUse(template)}>Use Template</Button>
      </div>
    </div>
  );
};

export default TemplateCard;
