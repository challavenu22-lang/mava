import React from 'react';

const DashboardCard = ({ title, value, icon, trend, trendLabel, colorClass }) => {
  let bgColor = 'rgba(37, 99, 235, 0.1)';
  let iconColor = '#2563eb';
  if (colorClass === '--color-success') {
    bgColor = 'rgba(16, 185, 129, 0.1)';
    iconColor = '#10b981';
  } else if (colorClass === '--color-warning') {
    bgColor = 'rgba(245, 158, 11, 0.1)';
    iconColor = '#f59e0b';
  } else if (colorClass === '--color-danger') {
    bgColor = 'rgba(239, 68, 68, 0.1)';
    iconColor = '#df3b3bff';
  }

  return (
    <div className="card dashboard-card hover-lift">
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <h3 className="card-title" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{title}</h3>
          <div style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--text-color)' }}>{value}</div>
        </div>
        <div style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: bgColor, color: iconColor, display: 'flex' }}>
          {icon}
        </div>
      </div>
      
      {trend && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <span style={{ color: trend > 0 ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: '600' }}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
          <span style={{ color: 'var(--color-text-muted)' }}>{trendLabel}</span>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
