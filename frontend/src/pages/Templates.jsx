import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTemplates } from '../data/mockTemplates';
import { STATUS_STYLE_MAP, REPORT_STATUSES } from '../data/statusConfig';
import { FileText, ArrowRight } from 'lucide-react';

const Templates = () => {
  const navigate = useNavigate();

  const handleUseTemplate = (template) => {
    // Pass the data along with the status of the template
    const templateData = {
      ...template.data,
      status: template.status
    };
    navigate('/generate', { state: { templateData } });
  };

  return (
    <div className="templates-page">
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.375rem' }}>Summary Templates</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Use these pre-filled scenarios to quickly generate realistic business reports.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {mockTemplates.map((template) => {
          const theme = STATUS_STYLE_MAP[template.status] || STATUS_STYLE_MAP[REPORT_STATUSES.AVERAGE];
          return (
            <div 
              key={template.id} 
              className="card hover-lift" 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                border: `1.5px solid ${theme.borderColor}`,
                padding: '1.5rem',
                borderRadius: '1rem',
                backgroundColor: '#ffffff'
              }}
            >
              {/* Top badge and title */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  backgroundColor: theme.iconBg, 
                  color: theme.iconColor, 
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileText size={20} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0F172A', margin: 0, minHeight: '48px', lineHeight: '1.3' }}>
                  {template.title}
                </h3>
              </div>
              
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem', flex: 1, lineHeight: '1.5' }}>
                {template.description}
              </p>

              {/* Wins / Risks Previews inside a themed background */}
              <div style={{ 
                backgroundColor: theme.previewBg, 
                padding: '1rem', 
                borderRadius: '0.75rem', 
                marginBottom: '1.5rem', 
                fontSize: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <div>
                  <strong style={{ color: '#374151', textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.05em' }}>Preview Wins:</strong>
                  <p style={{ color: '#4B5563', margin: '0.125rem 0 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {template.data.keyWins.split('\n')[0]}
                  </p>
                </div>
                
                <div>
                  <strong style={{ color: '#374151', textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.05em' }}>Preview Risks:</strong>
                  <p style={{ color: '#4B5563', margin: '0.125rem 0 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {template.data.risks.split('\n')[0]}
                  </p>
                </div>
              </div>

              {/* Action Button using themed gradient */}
              <button 
                className="btn" 
                style={{ 
                  width: '100%', 
                  justifyContent: 'center', 
                  padding: '0.75rem', 
                  fontWeight: '600',
                  background: theme.btnBg,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer'
                }}
                onClick={() => handleUseTemplate(template)}
              >
                Use Template <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Templates;
