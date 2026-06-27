import React from 'react';
import { LineChart, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';
import { mockAnalytics } from '../data/mockAnalytics';

const Analytics = () => {
  return (
    <div className="analytics-page" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Premium Dark Header Block */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
        padding: '1.75rem 2rem', 
        borderRadius: '1rem', 
        color: '#ffffff', 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' 
      }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', margin: 0 }}>Analytics Dashboard</h2>
        <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.375rem', fontWeight: '400' }}>
          Insights and trends from your generated business health summaries.
        </p>
      </div>

      {/* Grid for two SVG Line Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem' }}>
        
        {/* Chart 1: Monthly Report Activity */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#EFF6FF', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={18} />
            </div>
            <h3 className="card-title" style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#0F172A' }}>
              Monthly Report Activity
            </h3>
          </div>

          <div style={{ position: 'relative', height: '240px', width: '100%', marginTop: '1rem' }}>
            {/* SVG Line Chart */}
            <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0"/>
                </linearGradient>
              </defs>
              
              {/* Horizontal Grid lines */}
              <line x1="40" y1="30" x2="380" y2="30" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="40" y1="70" x2="380" y2="70" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="40" y1="110" x2="380" y2="110" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="40" y1="150" x2="380" y2="150" stroke="#f3f4f6" strokeWidth="1" />
              
              {/* Y Axis labels */}
              <text x="15" y="34" fontSize="10" fill="#9ca3af" fontWeight="600">20</text>
              <text x="15" y="74" fontSize="10" fill="#9ca3af" fontWeight="600">15</text>
              <text x="15" y="114" fontSize="10" fill="#9ca3af" fontWeight="600">10</text>
              <text x="15" y="154" fontSize="10" fill="#9ca3af" fontWeight="600">5</text>
              <text x="20" y="184" fontSize="10" fill="#9ca3af" fontWeight="600">0</text>
              
              {/* X Axis line */}
              <line x1="40" y1="180" x2="380" y2="180" stroke="#e5e7eb" strokeWidth="1.5" />
              
              {/* Shaded Area Chart */}
              <path d="M 40 160 Q 108 120 176 140 T 312 90 L 380 40 L 380 180 L 40 180 Z" fill="url(#blueGrad)" />
              
              {/* Line Curve */}
              <path d="M 40 160 Q 108 120 176 140 T 312 90 L 380 40" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
              
              {/* Data points (Dots) */}
              <circle cx="40" cy="160" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              <circle cx="108" cy="120" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              <circle cx="176" cy="140" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              <circle cx="244" cy="115" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              <circle cx="312" cy="90" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              <circle cx="380" cy="40" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              
              {/* X Axis labels */}
              <text x="35" y="195" fontSize="10" fill="#9ca3af" fontWeight="600">Jan</text>
              <text x="100" y="195" fontSize="10" fill="#9ca3af" fontWeight="600">Feb</text>
              <text x="168" y="195" fontSize="10" fill="#9ca3af" fontWeight="600">Mar</text>
              <text x="236" y="195" fontSize="10" fill="#9ca3af" fontWeight="600">Apr</text>
              <text x="302" y="195" fontSize="10" fill="#9ca3af" fontWeight="600">May</text>
              <text x="372" y="195" fontSize="10" fill="#9ca3af" fontWeight="600">Jun</text>
            </svg>
          </div>
        </div>

        {/* Chart 2: Average Quality Trend */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LineChart size={18} />
            </div>
            <h3 className="card-title" style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#0F172A' }}>
              Average Quality Trend
            </h3>
          </div>

          <div style={{ position: 'relative', height: '240px', width: '100%', marginTop: '1rem' }}>
            {/* SVG Line Chart */}
            <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0"/>
                </linearGradient>
              </defs>
              
              {/* Horizontal Grid lines */}
              <line x1="40" y1="30" x2="380" y2="30" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="40" y1="80" x2="380" y2="80" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="40" y1="130" x2="380" y2="130" stroke="#f3f4f6" strokeWidth="1" />
              
              {/* Y Axis labels */}
              <text x="20" y="34" fontSize="10" fill="#9ca3af" fontWeight="600">6</text>
              <text x="20" y="84" fontSize="10" fill="#9ca3af" fontWeight="600">5</text>
              <text x="20" y="134" fontSize="10" fill="#9ca3af" fontWeight="600">4</text>
              <text x="20" y="184" fontSize="10" fill="#9ca3af" fontWeight="600">3</text>
              
              {/* X Axis line */}
              <line x1="40" y1="180" x2="380" y2="180" stroke="#e5e7eb" strokeWidth="1.5" />
              
              {/* Shaded Area Chart */}
              <path d="M 40 120 Q 108 90 176 100 T 312 70 L 380 60 L 380 180 L 40 180 Z" fill="url(#greenGrad)" />
              
              {/* Line Curve */}
              <path d="M 40 120 Q 108 90 176 100 T 312 70 L 380 60" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
              
              {/* Data points (Dots) & Value Labels */}
              <circle cx="40" cy="120" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <text x="32" y="110" fontSize="10" fill="#0f172a" fontWeight="700">4.2</text>

              <circle cx="108" cy="90" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <text x="100" y="80" fontSize="10" fill="#0f172a" fontWeight="700">4.5</text>

              <circle cx="176" cy="100" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <text x="168" y="90" fontSize="10" fill="#0f172a" fontWeight="700">4.4</text>

              <circle cx="244" cy="85" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <text x="236" y="75" fontSize="10" fill="#0f172a" fontWeight="700">4.7</text>

              <circle cx="312" cy="70" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <text x="304" y="60" fontSize="10" fill="#0f172a" fontWeight="700">4.8</text>

              <circle cx="380" cy="60" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <text x="372" y="50" fontSize="10" fill="#0f172a" fontWeight="700">4.9</text>
              
              {/* X Axis labels */}
              <text x="35" y="195" fontSize="10" fill="#9ca3af" fontWeight="600">Jan</text>
              <text x="100" y="195" fontSize="10" fill="#9ca3af" fontWeight="600">Feb</text>
              <text x="168" y="195" fontSize="10" fill="#9ca3af" fontWeight="600">Mar</text>
              <text x="236" y="195" fontSize="10" fill="#9ca3af" fontWeight="600">Apr</text>
              <text x="302" y="195" fontSize="10" fill="#9ca3af" fontWeight="600">May</text>
              <text x="372" y="195" fontSize="10" fill="#9ca3af" fontWeight="600">Jun</text>
            </svg>
          </div>
        </div>

      </div>

      {/* Grid for Risks and Recommendations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem' }}>
        
        {/* Common Risks & Issues */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FFF7ED', color: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldAlert size={18} />
            </div>
            <h3 className="card-title" style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#0F172A' }}>
              Common Risks & Issues
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {mockAnalytics.topRisks.map((risk, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>
                  <span>{risk.name}</span>
                  <span style={{ color: '#F97316' }}>{risk.percentage}%</span>
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: '#F3F4F6', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: `${risk.percentage}%`, height: '100%', backgroundColor: '#F97316', borderRadius: '9999px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Frequent Recommendations */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#F5F3FF', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} />
            </div>
            <h3 className="card-title" style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#0F172A' }}>
              Most Frequent Recommendations
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mockAnalytics.topActions.map((action, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 0' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  backgroundColor: '#F5F3FF', 
                  color: '#8B5CF6', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: '700',
                  fontSize: '0.9rem'
                }}>
                  {idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1F2937' }}>{action.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.125rem' }}>Recommended in {action.value} reports</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Analytics;
