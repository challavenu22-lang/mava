import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { getDrivers, getVehicles } from '../../services/apiService';
import Loader from '../../components/Loader/Loader';
import styles from './Analytics.module.css';

const COLORS = ['#5B5CEB', '#22C55E', '#F59E0B', '#EF4444', '#6D4CFF', '#8B5CF6', '#EC4899'];

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [selection, setSelection] = useState('drivers');
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [driversData, vehiclesData] = await Promise.all([
          getDrivers(),
          getVehicles()
        ]);
        setDrivers(driversData);
        setVehicles(vehiclesData);
      } catch (error) {
        console.error("Error fetching analytics data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getVehicleTypeDistribution = () => {
    const counts = {};
    vehicles.forEach(v => {
      // Simplistic type extraction from name for the demo (e.g. "Innova Crysta" -> "Innova")
      const type = v.name.split(' ')[0]; 
      counts[type] = (counts[type] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  };

  const getDriverRecommendations = () => {
    const lowRated = drivers.filter(d => d.rating < 4.0);
    const recs = [];
    if (lowRated.length > 0) {
      recs.push(`Schedule defensive driving training for ${lowRated.length} drivers with ratings below 4.0.`);
      recs.push(`Conduct 1-on-1 performance reviews for ${lowRated.map(d => d.name).join(', ')}.`);
    } else {
      recs.push('Driver performance is excellent across the board. Maintain current incentive programs.');
    }
    recs.push('Launch seasonal driver recruitment campaign to prepare for peak season.');
    recs.push('Implement a peer-mentorship program pairing high-rated drivers with newer recruits.');
    return recs;
  };

  const getVehicleRecommendations = () => {
    const lowRated = vehicles.filter(v => v.rating < 4.0);
    const recs = [];
    if (lowRated.length > 0) {
      recs.push(`Schedule immediate maintenance for ${lowRated.length} vehicles with low operational ratings.`);
      recs.push(`Check AC and tire pressure on: ${lowRated.map(v => v.registration).join(', ')}.`);
    } else {
      recs.push('Fleet condition is optimal. Ensure regular oil changes are met.');
    }
    recs.push('Renegotiate fuel vendor contracts to reduce overhead on long-distance routes.');
    recs.push('Consider replacing vehicles older than 5 years to improve overall fleet rating.');
    return recs;
  };

  if (loading) return <Loader />;

  return (
    <motion.div 
      className={styles.analyticsPage}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1>Analytics Overview</h1>
          <select 
            className={styles.selectFilter} 
            value={selection} 
            onChange={(e) => setSelection(e.target.value)}
          >
            <option value="drivers">Drivers Overview</option>
            <option value="vehicles">Vehicles Overview</option>
          </select>
        </div>
        <p>Insights derived directly from your active {selection === 'drivers' ? 'driver' : 'vehicle'} roster.</p>
      </div>

      <div className={styles.grid}>
        
        {selection === 'drivers' ? (
          <>
            {/* Drivers Line Chart */}
            <div className={`card ${styles.chartCard}`}>
              <h3>Driver Performance Ratings</h3>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={drivers} margin={{ left: -20, bottom: 20, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} angle={-45} textAnchor="end" />
                    <YAxis domain={[0, 5]} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--bg-card)', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: '12px', 
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                      }} 
                      labelStyle={{ color: 'var(--text-main)', fontWeight: 'bold' }} 
                      itemStyle={{ color: 'var(--text-main)' }} 
                    />
                    <Line type="monotone" dataKey="rating" name="Rating" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Drivers Bar Chart */}
            <div className={`card ${styles.chartCard}`}>
              <h3>Driver Age Distribution</h3>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={drivers} margin={{ left: -20, bottom: 20, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} angle={-45} textAnchor="end" />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(91, 92, 235, 0.05)' }} 
                      contentStyle={{ 
                        backgroundColor: 'var(--bg-card)', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: '12px', 
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                      }} 
                      labelStyle={{ color: 'var(--text-main)', fontWeight: 'bold' }} 
                      itemStyle={{ color: 'var(--text-main)' }} 
                    />
                    <Bar dataKey="age" name="Age" fill="var(--color-warning)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recommendations */}
            <div className={`card ${styles.chartCard}`} style={{ gridColumn: '1 / -1', height: 'auto' }}>
              <h3>Top AI Recommendations for Drivers</h3>
              <div className={styles.recommendationsList}>
                {getDriverRecommendations().map((rec, index) => (
                  <div key={index} className={styles.recItem}>
                    <div className={styles.recNumber}>{index + 1}</div>
                    <p>{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Vehicles Area Chart */}
            <div className={`card ${styles.chartCard}`}>
              <h3>Vehicle Operational Ratings</h3>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={vehicles} margin={{ left: -20, bottom: 20, right: 20 }}>
                    <defs>
                      <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="registration" axisLine={false} tickLine={false} tick={{fontSize: 12}} angle={-45} textAnchor="end" />
                    <YAxis domain={[0, 5]} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--bg-card)', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: '12px', 
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                      }} 
                      labelStyle={{ color: 'var(--text-main)', fontWeight: 'bold' }} 
                      itemStyle={{ color: 'var(--text-main)' }} 
                    />
                    <Area type="monotone" dataKey="rating" name="Rating" stroke="var(--color-success)" strokeWidth={3} fillOpacity={1} fill="url(#colorQuality)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Vehicles Pie Chart */}
            <div className={`card ${styles.chartCard}`}>
              <h3>Fleet Composition by Type</h3>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getVehicleTypeDistribution()}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {getVehicleTypeDistribution().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--bg-card)', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: '12px', 
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                      }} 
                      labelStyle={{ color: 'var(--text-main)', fontWeight: 'bold' }} 
                      itemStyle={{ color: 'var(--text-main)' }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recommendations */}
            <div className={`card ${styles.chartCard}`} style={{ gridColumn: '1 / -1', height: 'auto' }}>
              <h3>Top AI Recommendations for Fleet</h3>
              <div className={styles.recommendationsList}>
                {getVehicleRecommendations().map((rec, index) => (
                  <div key={index} className={styles.recItem}>
                    <div className={styles.recNumber}>{index + 1}</div>
                    <p>{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
      </div>
    </motion.div>
  );
};

export default Analytics;
