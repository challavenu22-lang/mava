import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getTemplates } from '../../services/apiService';
import Loader from '../../components/Loader/Loader';
import TemplateCard from '../../components/TemplateCard/TemplateCard';
import styles from './Templates.module.css';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getTemplates();
        setTemplates(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const handleUseTemplate = (template) => {
    navigate('/generate', { state: { template } });
  };

  if (loading) return <Loader />;

  return (
    <motion.div 
      className={styles.templatesPage}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h1>Report Templates</h1>
        <p>Choose a pre-defined template to quickly structure your AI summaries.</p>
      </div>

      <div className={styles.grid}>
        {templates.map(template => (
          <motion.div key={template.id} whileHover={{ y: -5 }}>
            <TemplateCard template={template} onUse={handleUseTemplate} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Templates;
