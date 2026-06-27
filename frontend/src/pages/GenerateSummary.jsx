import React, { useState, useRef } from 'react';
import SummaryForm from '../components/SummaryForm';
import OutputCard from '../components/OutputCard';
import { generateAISummary } from '../data/mockSummary';
import { useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const GenerateSummary = () => {
  const location = useLocation();
  const templateData = location.state?.templateData;
  const formRef = useRef(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [summaryResult, setSummaryResult] = useState(null);
  const [lastFormData, setLastFormData] = useState(null);

  const handleGenerate = async (formData) => {
    setIsGenerating(true);
    setLastFormData(formData);
    try {
      const response = await fetch('http://localhost:8000/api/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          report_title: formData.title,
          key_wins: formData.keyWins,
          risks_issues: formData.risks,
          recommended_actions: formData.recommendedActions,
          status: formData.status
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate report: ${response.statusText}`);
      }

      const result = await response.json();
      setSummaryResult({
        id: result.id,
        reportTitle: result.report_title,
        timestamp: result.created_at,
        status: result.status,
        executiveSummary: result.executive_summary,
        wins: result.key_wins_overview,
        risks: result.risks_analysis,
        recommendations: result.recommendations
      });
    } catch (error) {
      console.error('Error generating summary:', error);
      alert('Failed to connect to the backend server. Please make sure it is running on port 8000.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async () => {
    if (lastFormData) {
      await handleGenerate(lastFormData);
    }
  };

  const handleClear = () => {
    setSummaryResult(null);
    setLastFormData(null);
  };

  const triggerFormSubmit = () => {
    if (formRef.current) {
      // Trigger HTML5 submit on the form element inside SummaryForm
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  return (
    <div className="generate-summary-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1000px' }}>
        
        {/* Header Block matching screenshot exactly */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              background: '#F5F3FF', 
              border: '1px solid #DDD6FE', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#8B5CF6',
              flexShrink: 0
            }}>
              <Sparkles size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Enter</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>the monthly details below, and the AI will format a professional business health summary.</span>
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0F172A', margin: '0.125rem 0 0 0' }}>Generate AI Summary</h2>
            </div>
          </div>
          
          <button 
            className="btn btn-gradient" 
            onClick={triggerFormSubmit} 
            disabled={isGenerating}
            style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Sparkles size={16} /> Generate AI Summary
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div style={{ width: '100%' }}>
            <SummaryForm 
              onSubmit={handleGenerate} 
              isGenerating={isGenerating} 
              initialData={templateData} 
              formRef={formRef}
            />
          </div>

          {summaryResult && (
            <div style={{ width: '100%' }}>
              <OutputCard 
                summary={summaryResult} 
                onClear={handleClear} 
                onRegenerate={handleRegenerate} 
                isGenerating={isGenerating}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default GenerateSummary;
