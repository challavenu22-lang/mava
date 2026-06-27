import React, { useState } from 'react';
import { Download, Copy, Trash2, CheckCircle2, RefreshCw } from 'lucide-react';
import RatingSection from './RatingSection';
import { STATUS_LABEL_MAP, STATUS_STYLE_MAP, REPORT_STATUSES } from '../data/statusConfig';

const OutputCard = ({ summary, onClear, onRegenerate, isGenerating, isHistoryView = false }) => {
  const [copied, setCopied] = useState(false);

  let normStatus = (summary.status || 'average').toLowerCase().trim();
  if (normStatus === 'needs_attention' || normStatus === 'needs attention') {
    normStatus = 'average';
  }
  const statusLabel = STATUS_LABEL_MAP[normStatus] || summary.status;


  const formattedText = `
${summary.reportTitle ? summary.reportTitle.toUpperCase() : 'MONTHLY SUMMARY'}
Generated: ${new Date(summary.timestamp).toLocaleString()}
Health Status: ${statusLabel}

EXECUTIVE SUMMARY:
${summary.executiveSummary}

KEY WINS:
${summary.wins.map(w => '- ' + w).join('\n')}

RISKS & CONCERNS:
${summary.risks.map(r => '- ' + r).join('\n')}

RECOMMENDED ACTIONS:
${summary.recommendations.map(r => '- ' + r).join('\n')}
  `.trim();

  const handleCopy = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(formattedText)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
          .catch((err) => {
            console.error("Clipboard write failed, using fallback:", err);
            fallbackCopyText(formattedText);
          });
      } else {
        fallbackCopyText(formattedText);
      }
    } catch (e) {
      console.error("Clipboard error:", e);
      fallbackCopyText(formattedText);
    }
  };

  const fallbackCopyText = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        console.error('Fallback copy failed');
      }
    } catch (err) {
      console.error('Fallback copy failed with error:', err);
    }
    document.body.removeChild(textArea);
  };

  const handleDownload = () => {
    const blob = new Blob([formattedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Summary_${summary.reportTitle || 'Report'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card" style={{ borderTop: '4px solid var(--color-primary)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h3 className="card-title" style={{ marginBottom: '0.25rem' }}>AI Generated Summary</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Generated on {new Date(summary.timestamp).toLocaleString()}
          </p>
        </div>
        <span className={`badge ${STATUS_STYLE_MAP[normStatus]?.badgeClass || STATUS_STYLE_MAP[REPORT_STATUSES.AVERAGE].badgeClass}`}>
          {statusLabel}
        </span>
      </div>

      <div style={{ backgroundColor: 'var(--bg-color)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Executive Summary
        </h4>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>{summary.executiveSummary}</p>

        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Key Wins
        </h4>
        <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          {summary.wins.map((win, idx) => (
            <li key={idx} style={{ marginBottom: '0.25rem' }}>{win}</li>
          ))}
        </ul>

        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Risks & Concerns
        </h4>
        <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          {summary.risks.map((risk, idx) => (
            <li key={idx} style={{ marginBottom: '0.25rem' }}>{risk}</li>
          ))}
        </ul>

        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Recommended Actions
        </h4>
        <ul style={{ paddingLeft: '1.25rem', marginBottom: '0', lineHeight: '1.6' }}>
          {summary.recommendations.map((rec, idx) => (
            <li key={idx} style={{ marginBottom: '0.25rem' }}>{rec}</li>
          ))}
        </ul>
      </div>

      <div className="action-bar">
        {!isHistoryView && (
          <button 
            className="btn btn-gradient" 
            onClick={onRegenerate} 
            disabled={isGenerating}
          >
            {isGenerating ? (
              <><RefreshCw size={16} className="lucide-spin" style={{ animation: 'spin 2s linear infinite' }} /> Regenerating...</>
            ) : (
              <><RefreshCw size={16} /> Regenerate</>
            )}
          </button>
        )}
        
        <button className="btn btn-outline" onClick={handleCopy} disabled={isGenerating}>
          {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
        
        <button className="btn btn-outline" onClick={handleDownload} disabled={isGenerating}>
          <Download size={16} /> Download
        </button>
        
        <div style={{ flex: 1 }}></div>
        
        {!isHistoryView && (
          <button className="btn btn-danger" onClick={onClear} disabled={isGenerating}>
            <Trash2 size={16} /> Clear Output
          </button>
        )}
      </div>

      <RatingSection reportId={summary.id} />
    </div>
  );
};

export default OutputCard;
