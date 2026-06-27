import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Calendar, CheckCircle2, AlertTriangle, Target, FileText } from 'lucide-react';
import { REPORT_STATUSES } from '../data/statusConfig';

const SummaryForm = ({ onSubmit, isGenerating, initialData, formRef }) => {
  const [formData, setFormData] = useState({
    title: '',
    keyWins: '',
    risks: '',
    recommendedActions: '',
    status: REPORT_STATUSES.AVERAGE
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        keyWins: initialData.keyWins || '',
        risks: initialData.risks || '',
        recommendedActions: initialData.recommendedActions || '',
        status: initialData.status || REPORT_STATUSES.AVERAGE
      });
    }
  }, [initialData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= 500) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title/Month is required';
    if (!formData.keyWins.trim()) newErrors.keyWins = 'Key Wins are required';
    if (!formData.risks.trim()) newErrors.risks = 'Risks/Issues are required';
    if (!formData.recommendedActions.trim()) newErrors.recommendedActions = 'Recommended Actions are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      keyWins: '',
      risks: '',
      recommendedActions: '',
      status: REPORT_STATUSES.AVERAGE
    });
    setErrors({});
  };


  return (
    <div className="card form-card-container">
      {/* Header inside card */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '1rem' }}>
        <div style={{ padding: '0.5rem', backgroundColor: '#F5F3FF', color: '#8B5CF6', borderRadius: '0.5rem', display: 'flex' }}>
          <FileText size={20} />
        </div>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: '#0F172A' }}>Business Inputs</h3>
      </div>

      <form ref={formRef} onSubmit={handleSubmit}>
        
        {/* Month / Report Title */}
        <div className="form-group">
          <label className="form-label">Month / Report Title <span style={{ color: '#EF4444' }}>*</span></label>
          <div className="input-icon-wrapper">
            <Calendar size={18} className="input-left-icon" />
            <input 
              type="text" 
              name="title"
              className="form-control-with-icon" 
              placeholder="e.g., June 2026 Monthly Report" 
              value={formData.title}
              onChange={handleChange}
              disabled={isGenerating}
            />
          </div>
          {errors.title ? (
            <div className="form-error">{errors.title}</div>
          ) : (
            <div className="input-helper-text">Enter the month and a short title for this report.</div>
          )}
        </div>

        {/* Key Wins */}
        <div className="form-group">
          <label className="form-label">Key Wins <span style={{ color: '#EF4444' }}>*</span></label>
          <div className="textarea-stripe-container key-wins-container">
            <div className="textarea-stripe key-wins-stripe">
              <CheckCircle2 size={20} />
            </div>
            <div className="textarea-wrapper">
              <textarea 
                name="keyWins"
                className="form-textarea-custom" 
                placeholder="List major successes, contract wins, positive customer feedback, booking improvements, or operational achievements..." 
                rows="4"
                value={formData.keyWins}
                onChange={handleChange}
                disabled={isGenerating}
              ></textarea>
              <span className="textarea-char-count">{formData.keyWins.length} / 500</span>
            </div>
          </div>
          {errors.keyWins ? (
            <div className="form-error">{errors.keyWins}</div>
          ) : (
            <div className="input-helper-text">One win per line is recommended.</div>
          )}
        </div>

        {/* Risks / Issues */}
        <div className="form-group">
          <label className="form-label">Risks / Issues <span style={{ color: '#EF4444' }}>*</span></label>
          <div className="textarea-stripe-container risks-container">
            <div className="textarea-stripe risks-stripe">
              <AlertTriangle size={20} />
            </div>
            <div className="textarea-wrapper">
              <textarea 
                name="risks"
                className="form-textarea-custom" 
                placeholder="List operational challenges, resource shortages, delays, rising costs, customer complaints, or low-demand areas..." 
                rows="4"
                value={formData.risks}
                onChange={handleChange}
                disabled={isGenerating}
              ></textarea>
              <span className="textarea-char-count">{formData.risks.length} / 500</span>
            </div>
          </div>
          {errors.risks ? (
            <div className="form-error">{errors.risks}</div>
          ) : (
            <div className="input-helper-text">Be honest about operational issues.</div>
          )}
        </div>

        {/* Recommended Actions */}
        <div className="form-group">
          <label className="form-label">Recommended Actions <span style={{ color: '#EF4444' }}>*</span></label>
          <div className="textarea-stripe-container actions-container">
            <div className="textarea-stripe actions-stripe">
              <Target size={20} />
            </div>
            <div className="textarea-wrapper">
              <textarea 
                name="recommendedActions"
                className="form-textarea-custom" 
                placeholder="List next steps to reduce risks, improve operations, and build on this month's wins..." 
                rows="4"
                value={formData.recommendedActions}
                onChange={handleChange}
                disabled={isGenerating}
              ></textarea>
              <span className="textarea-char-count">{formData.recommendedActions.length} / 500</span>
            </div>
          </div>
          {errors.recommendedActions ? (
            <div className="form-error">{errors.recommendedActions}</div>
          ) : (
            <div className="input-helper-text">Actionable steps for the next month.</div>
          )}
        </div>

        {/* Bottom Button Row matching screenshot */}
        <div className="form-buttons-row">
          <button type="submit" className="btn btn-gradient" disabled={isGenerating} style={{ flex: 1, padding: '0.875rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            {isGenerating ? (
              <><RefreshCw size={20} className="lucide-spin" style={{ animation: 'spin 2s linear infinite' }} /> Generating AI Summary...</>
            ) : (
              <><Sparkles size={20} /> Generate AI Summary</>
            )}
          </button>
          
          <button type="button" className="btn btn-outline reset-btn-custom" onClick={handleReset} disabled={isGenerating} style={{ padding: '0.875rem 2rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RefreshCw size={18} /> Reset Form
          </button>
        </div>
      </form>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
};

export default SummaryForm;
