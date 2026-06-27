import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Star, Activity, PlusCircle, ArrowRight, ChevronRight, Clock, FileCheck } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import { STATUS_LABEL_MAP, STATUS_STYLE_MAP, REPORT_STATUSES } from '../data/statusConfig';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total_reports: 0,
    average_rating: 4.6,
    this_month_reports: 0,
    most_used_status: 'Good'
  });
  const [recentSummaries, setRecentSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsRes = await fetch('http://localhost:8000/api/dashboard/stats');
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }
        
        const recentRes = await fetch('http://localhost:8000/api/dashboard/recent');
        if (recentRes.ok) {
          const recentData = await recentRes.json();
          setRecentSummaries(recentData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.25rem' }}>Welcome back, Admin 👋</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Here is what's happening with Manivtha Tours & Travels today.</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => navigate('/generate')}
          style={{ padding: '0.5rem 1.25rem 0.5rem 0.5rem', gap: '0.75rem' }}
        >
          <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PlusCircle size={18} />
          </div>
          Generate New Summary
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <DashboardCard 
          title="Total Reports Generated" 
          value={stats.total_reports.toString()} 
          icon={<FileText size={24} />} 
          trend={12} 
          trendLabel="vs last month"
          colorClass="--color-primary"
        />
        <DashboardCard 
          title="Average Quality Rating" 
          value={stats.average_rating.toString()} 
          icon={<Star size={24} />} 
          trend={2.4} 
          trendLabel="vs last month"
          colorClass="--color-success"
        />
        <DashboardCard 
          title="This Month Reports" 
          value={stats.this_month_reports.toString()} 
          icon={<Activity size={24} />} 
          trend={20} 
          trendLabel="vs last month"
          colorClass="--color-warning"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem', alignItems: 'flex-start' }}>
        
        {/* Recent Summaries */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 className="card-title" style={{ margin: 0 }}>Recent Summaries</h3>
            <button className="btn btn-outline" onClick={() => navigate('/history')} style={{ padding: '0.35rem 1rem', fontSize: '0.8rem', color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>
              View All <ArrowRight size={14} style={{ marginLeft: '0.25rem' }} />
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {loading ? (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', padding: '1rem' }}>Loading recent summaries...</p>
            ) : recentSummaries.length > 0 ? (
              recentSummaries.map((item) => (
                <div key={item.id} onClick={() => navigate('/history')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '1rem', transition: 'all 0.2s ease', cursor: 'pointer' }} className="recent-summary-row hover-lift">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ backgroundColor: 'var(--bg-color)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-primary)' }}>
                      <FileCheck size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontWeight: '600', marginBottom: '0.125rem', color: 'var(--text-color)' }}>{item.report_title}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{new Date(item.created_at).toLocaleDateString()} • Created by Admin</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {(() => {
                      let normStatus = (item.status || 'average').toLowerCase().trim();
                      if (normStatus === 'needs_attention' || normStatus === 'needs attention') {
                        normStatus = 'average';
                      }
                      const theme = STATUS_STYLE_MAP[normStatus] || STATUS_STYLE_MAP[REPORT_STATUSES.AVERAGE];
                      const statusLabel = STATUS_LABEL_MAP[normStatus] || item.status;
                      return (
                        <span className={`badge ${theme.badgeClass}`}>
                          {statusLabel}
                        </span>
                      );
                    })()}
                    <div style={{ backgroundColor: 'var(--bg-color)', padding: '0.5rem', borderRadius: '50%', color: 'var(--color-text-muted)' }}>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', padding: '1rem' }}>No recent summaries generated yet.</p>
            )}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div onClick={() => navigate('/generate')} style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)', borderRadius: '1rem', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', color: 'white', boxShadow: '0 4px 6px -1px rgba(67, 56, 202, 0.4)', transition: 'transform 0.2s ease' }} className="hover-lift">
            <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: '0.75rem', display: 'flex' }}>
              <PlusCircle size={28} />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontWeight: '600', fontSize: '1.125rem', marginBottom: '0.125rem' }}>Create Monthly Report</h4>
              <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>Generate AI business summary</p>
            </div>
            <ChevronRight size={20} />
          </div>


          <div onClick={() => navigate('/analytics')} style={{ backgroundColor: '#EEF2FF', borderRadius: '1rem', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', border: '1px solid #E0E7FF', transition: 'transform 0.2s ease' }} className="hover-lift">
            <div style={{ color: '#4F46E5', display: 'flex', backgroundColor: '#E0E7FF', padding: '0.5rem', borderRadius: '50%' }}>
              <Activity size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontWeight: '600', fontSize: '1rem', color: '#312E81', marginBottom: '0.125rem' }}>View Business Trends</h4>
              <p style={{ fontSize: '0.875rem', color: '#4338CA' }}>Explore analytics & insights</p>
            </div>
            <ChevronRight size={20} color="#4F46E5" />
          </div>

          <div onClick={() => navigate('/history')} style={{ backgroundColor: '#FFF7ED', borderRadius: '1rem', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', border: '1px solid #FFEDD5', transition: 'transform 0.2s ease' }} className="hover-lift">
            <div style={{ color: '#F97316', display: 'flex', backgroundColor: '#FFEDD5', padding: '0.5rem', borderRadius: '50%' }}>
              <Clock size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontWeight: '600', fontSize: '1rem', color: '#7C2D12', marginBottom: '0.125rem' }}>View Report History</h4>
              <p style={{ fontSize: '0.875rem', color: '#C2410C' }}>See all previously generated reports</p>
            </div>
            <ChevronRight size={20} color="#F97316" />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
