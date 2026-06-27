import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, AlertTriangle, Target, Send, RotateCcw } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import SummaryCard from '../../components/SummaryCard/SummaryCard';
import { generateSummary } from '../../services/apiService';
import styles from './GenerateSummary.module.css';

const GenerateSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    wins: '',
    risks: '',
    actions: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.template) {
      setFormData(prev => ({
        ...prev,
        title: location.state.template.name,
        risks: location.state.template.description
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.wins.trim()) newErrors.wins = 'Key wins are required';
    if (!formData.risks.trim()) newErrors.risks = 'Risks are required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsGenerating(true);
    setResult(null);
    try {
      const summary = await generateSummary(formData);
      setResult(summary);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setFormData({ title: '', wins: '', risks: '', actions: '' });
    setResult(null);
    setErrors({});
  };

  return (
    <motion.div 
      className={styles.generatePage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.header}>
        <h1>Generate AI Summary</h1>
        <p>Input your business highlights to generate a comprehensive health report.</p>
      </div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div 
            key="form"
            className={`card ${styles.formCard}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <form onSubmit={handleSubmit} className={styles.form}>
              
              <div className={styles.formGroup}>
                <label>Report Title / Month</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title} 
                  onChange={handleChange}
                  placeholder="e.g. June 2026 Operations"
                  className={errors.title ? styles.errorInput : ''}
                />
                {errors.title && <span className={styles.errorText}>{errors.title}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>
                  <Sparkles size={16} className={styles.labelIcon} color="var(--color-success)" />
                  Key Wins
                </label>
                <textarea 
                  name="wins"
                  value={formData.wins} 
                  onChange={handleChange}
                  placeholder="What went well this month?"
                  rows={4}
                  maxLength={500}
                  className={errors.wins ? styles.errorInput : ''}
                />
                <div className={styles.formFooter}>
                  {errors.wins ? <span className={styles.errorText}>{errors.wins}</span> : <span>Highlight positive outcomes</span>}
                  <span className={styles.charCount}>{formData.wins.length}/500</span>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>
                  <AlertTriangle size={16} className={styles.labelIcon} color="var(--color-warning)" />
                  Risks & Challenges
                </label>
                <textarea 
                  name="risks"
                  value={formData.risks} 
                  onChange={handleChange}
                  placeholder="What bottlenecks or issues were faced?"
                  rows={4}
                  maxLength={500}
                  className={errors.risks ? styles.errorInput : ''}
                />
                <div className={styles.formFooter}>
                  {errors.risks ? <span className={styles.errorText}>{errors.risks}</span> : <span>Be specific about operational risks</span>}
                  <span className={styles.charCount}>{formData.risks.length}/500</span>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>
                  <Target size={16} className={styles.labelIcon} color="var(--color-primary)" />
                  Recommended Actions (Optional)
                </label>
                <textarea 
                  name="actions"
                  value={formData.actions} 
                  onChange={handleChange}
                  placeholder="What actions are you planning?"
                  rows={3}
                  maxLength={300}
                />
                <div className={styles.formFooter}>
                  <span>Propose solutions for AI to refine</span>
                  <span className={styles.charCount}>{formData.actions.length}/300</span>
                </div>
              </div>

              <div className={styles.formActions}>
                <Button variant="ghost" icon={RotateCcw} onClick={handleReset} type="button">Reset</Button>
                <Button variant="primary" icon={Send} type="submit" disabled={isGenerating}>
                  {isGenerating ? 'Generating...' : 'Generate AI Summary'}
                </Button>
              </div>
            </form>
            
            {isGenerating && (
              <div className={styles.generatingOverlay}>
                <Loader fullScreen={false} />
                <p>AI is analyzing your input...</p>
              </div>
            )}
          </motion.div>
        ) : (
          <SummaryCard data={result} onRegenerate={handleReset} onOk={() => navigate('/history')} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GenerateSummary;
