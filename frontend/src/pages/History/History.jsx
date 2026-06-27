import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Share2, Trash2, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { getHistory, deleteReport } from '../../services/apiService';
import Loader from '../../components/Loader/Loader';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import Button from '../../components/Button/Button';
import styles from './History.module.css';

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  const handleDelete = async (id) => {
    // Remove locally immediately for snappy UI
    setHistoryData(prev => prev.filter(item => item.id !== id));
    setFilteredData(prev => prev.filter(item => item.id !== id));
    
    // Remove from mock backend
    try {
      await deleteReport(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = (report) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(report.title, 20, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Date: ${report.date} | Status: ${report.status}`, 20, 30);
    
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Report Preview:", 20, 45);
    
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(report.preview, 170);
    doc.text(splitText, 20, 55);
    
    doc.save(`${report.title.replace(/\s+/g, '_')}_Report.pdf`);
  };

  const handleShare = async (report) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: report.title,
          text: `Check out this report: ${report.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert('Native sharing is not supported on this browser/device.');
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        setHistoryData(data);
        setFilteredData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    let result = historyData;

    if (searchTerm) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.preview.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(result);
  }, [searchTerm, historyData]);

  if (loading) return <Loader />;

  return (
    <motion.div 
      className={styles.historyPage}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h1>Report History</h1>
        <p>View and manage your previously generated AI summaries.</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search history..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.grid}>
        {filteredData.length > 0 ? (
          filteredData.map(item => (
            <motion.div 
              key={item.id} 
              className={`card ${styles.historyCard}`}
              whileHover={{ y: -4 }}
            >
              <div className={styles.cardHeader}>
                <StatusBadge status={item.status} />
                <span className={styles.date}>{item.date}</span>
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.preview}>{item.preview}</p>
              <div className={styles.cardFooter}>
                <Button variant="primary" onClick={() => setSelectedReport(item)}>View Summary</Button>
                <Button variant="danger" icon={Trash2} onClick={() => handleDelete(item.id)}>Delete</Button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Search size={40} />
            </div>
            <h3>No reports found</h3>
            <p>Try adjusting your search criteria.</p>
            <Button variant="primary" onClick={() => setSearchTerm('')}>Clear Search</Button>
          </div>
        )}
      </div>

      {/* Simple Modal overlay for View Summary */}
      {selectedReport && (
        <div className={styles.modalOverlay} onClick={() => setSelectedReport(null)}>
          <div className={`card ${styles.modalContent}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{selectedReport.title}</h2>
              <StatusBadge status={selectedReport.status} />
            </div>
            <p className={styles.modalDate}>{selectedReport.date}</p>
            <div className={styles.modalBody}>
              <h3>Report Preview</h3>
              <p>{selectedReport.preview}</p>
              <br/>
              <p><em>(Full AI generated summary would be displayed here in production.)</em></p>
            </div>
            <div className={styles.modalFooter}>
              <Button variant="secondary" onClick={() => handleDownload(selectedReport)}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Download size={16} /> Download
                </span>
              </Button>
              <Button variant="secondary" onClick={() => handleShare(selectedReport)}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Share2 size={16} /> Share
                </span>
              </Button>
              <Button variant="primary" onClick={() => setSelectedReport(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default History;
