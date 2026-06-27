import React, { useState, useEffect } from 'react';
import { Search, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';
import OutputCard from '../components/OutputCard';
import { STATUS_LABEL_MAP, STATUS_STYLE_MAP, REPORT_STATUSES } from '../data/statusConfig';

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        let url = 'http://localhost:8000/api/reports?limit=100';
        if (searchTerm) {
          url += `&search=${encodeURIComponent(searchTerm)}`;
        }
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setHistoryList(data);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchHistory();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        const response = await fetch(`http://localhost:8000/api/reports/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setHistoryList(prev => prev.filter(item => item.id !== id));
        } else {
          alert("Failed to delete report.");
        }
      } catch (error) {
        console.error('Error deleting report:', error);
      }
    }
  };

  const filteredHistory = historyList;

  const getOutputFormat = (item) => ({
    id: item.id,
    reportTitle: item.report_title,
    timestamp: item.created_at,
    status: item.status,
    executiveSummary: item.executive_summary,
    wins: item.key_wins_overview,
    risks: item.risks_analysis,
    recommendations: item.recommendations
  });

  return (
    <div className="history-page">
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.375rem' }}>Report History</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>View and manage previously generated business health summaries.</p>
      </div>

      {/* Search control */}
      <div className="card" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', padding: '1.25rem 1.5rem', backgroundColor: '#ffffff', border: '1px solid #f3f4f6', borderRadius: '0.75rem' }}>
        <div style={{ flex: 1, position: 'relative', minWidth: '240px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input 
            type="text" 
            className="form-control-with-icon" 
            placeholder="Search by title or content..." 
            style={{ paddingLeft: '2.75rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* History Cards List */}
      {loading ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--color-text-muted)', backgroundColor: '#ffffff', borderRadius: '1rem', border: '1px solid #f3f4f6' }}>
          <p style={{ fontSize: '0.95rem', margin: 0 }}>Loading report history...</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => {
              let normStatus = (item.status || 'average').toLowerCase().trim();
              if (normStatus === 'needs_attention' || normStatus === 'needs attention') {
                normStatus = 'average';
              }
              const theme = STATUS_STYLE_MAP[normStatus] || STATUS_STYLE_MAP[REPORT_STATUSES.AVERAGE];
              const statusLabel = STATUS_LABEL_MAP[normStatus] || item.status;

              return (
                <div 
                  key={item.id} 
                  className="card hover-lift" 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '1.5rem 1.75rem', 
                    border: '1px solid #f3f4f6', 
                    borderRadius: '1rem',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.2s ease-in-out' 
                  }}
                >
                  <div style={{ flex: 1, paddingRight: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <div style={{ 
                        width: '36px', 
                        height: '36px', 
                        borderRadius: '50%', 
                        backgroundColor: theme.iconBg, 
                        color: theme.iconColor, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {theme.icon}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0F172A', margin: 0 }}>{item.report_title}</h3>
                          <span className={`badge ${theme.badgeClass}`}>{statusLabel}</span>
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '0.125rem' }}>
                          {new Date(item.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p style={{ 
                      fontSize: '0.9rem', 
                      color: '#4B5563', 
                      lineHeight: '1.6', 
                      display: '-webkit-box', 
                      WebkitLineClamp: 2, 
                      WebkitBoxOrient: 'vertical', 
                      overflow: 'hidden',
                      margin: '0.5rem 0 0 0'
                    }}>
                      {item.executive_summary}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button 
                      className="btn" 
                      style={{ 
                        backgroundColor: 'transparent',
                        border: `1.5px solid ${theme.btnBorderColor}`,
                        color: theme.btnTextColor,
                        fontWeight: '600',
                        padding: '0.625rem 1.25rem',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => setSelectedItem(item)}
                      onMouseEnter={(e) => e.target.style.backgroundColor = theme.btnHoverBg}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      View Full Summary
                    </button>
                    <button 
                      className="btn btn-outline" 
                      style={{ 
                        borderColor: '#ef4444',
                        color: '#ef4444',
                        padding: '0.625rem',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => handleDelete(item.id)}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#fdf2f2';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--color-text-muted)', backgroundColor: '#ffffff', borderRadius: '1rem', border: '1px solid #f3f4f6' }}>
              <p style={{ fontSize: '0.95rem', margin: 0 }}>No history items match your search.</p>
            </div>
          )}
        </div>
      )}

      {selectedItem && (
        <Modal onClose={() => setSelectedItem(null)}>
          <OutputCard summary={getOutputFormat(selectedItem)} isHistoryView={true} />
        </Modal>
      )}
    </div>
  );
};

export default History;
