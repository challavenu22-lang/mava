import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, Calendar, Users, Car, Plus, Edit2, Trash2, Star, Sparkles } from 'lucide-react';
import StatCard from '../../components/StatCard/StatCard';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal';
import { 
  getDashboardStats, 
  getRecentReports, 
  getDrivers, 
  getVehicles,
  addDriver,
  updateDriver,
  deleteDriver,
  addVehicle,
  updateVehicle,
  deleteVehicle
} from '../../services/apiService';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentReports, setRecentReports] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  // Modals state
  const [driverModal, setDriverModal] = useState({ show: false, editData: null });
  const [vehicleModal, setVehicleModal] = useState({ show: false, editData: null });

  // Form states
  const [driverForm, setDriverForm] = useState({ name: '', age: '', rating: '5.0' });
  const [vehicleForm, setVehicleForm] = useState({ name: '', registration: '', rating: '5.0' });

  const fetchData = async () => {
    try {
      const [statsData, reportsData, driversData, vehiclesData] = await Promise.all([
        getDashboardStats(),
        getRecentReports(),
        getDrivers(),
        getVehicles()
      ]);
      setStats(statsData);
      setRecentReports(reportsData);
      setDrivers(driversData);
      setVehicles(vehiclesData);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshStats = async () => {
    const statsData = await getDashboardStats();
    setStats(statsData);
  };

  // Drivers Handlers
  const handleDriverSubmit = async (e) => {
    e.preventDefault();
    if (driverModal.editData) {
      const updated = await updateDriver(driverModal.editData.id, driverForm);
      setDrivers(prev => prev.map(d => d.id === updated.id ? updated : d));
    } else {
      const added = await addDriver(driverForm);
      setDrivers(prev => [...prev, added]);
    }
    setDriverModal({ show: false, editData: null });
    refreshStats();
  };

  const handleDeleteDriver = async (id) => {
    await deleteDriver(id);
    setDrivers(prev => prev.filter(d => d.id !== id));
    refreshStats();
  };

  // Vehicles Handlers
  const handleVehicleSubmit = async (e) => {
    e.preventDefault();
    if (vehicleModal.editData) {
      const updated = await updateVehicle(vehicleModal.editData.id, vehicleForm);
      setVehicles(prev => prev.map(v => v.id === updated.id ? updated : v));
    } else {
      const added = await addVehicle(vehicleForm);
      setVehicles(prev => [...prev, added]);
    }
    setVehicleModal({ show: false, editData: null });
    refreshStats();
  };

  const handleDeleteVehicle = async (id) => {
    await deleteVehicle(id);
    setVehicles(prev => prev.filter(v => v.id !== id));
    refreshStats();
  };

  const openDriverModal = (driver = null) => {
    setDriverForm(driver ? { name: driver.name, age: driver.age.toString(), rating: (driver.rating !== undefined && driver.rating !== null) ? driver.rating.toString() : '5.0' } : { name: '', age: '', rating: '5.0' });
    setDriverModal({ show: true, editData: driver });
  };

  const openVehicleModal = (vehicle = null) => {
    setVehicleForm(vehicle ? { name: vehicle.name, registration: vehicle.registration, rating: (vehicle.rating !== undefined && vehicle.rating !== null) ? vehicle.rating.toString() : '5.0' } : { name: '', registration: '', rating: '5.0' });
    setVehicleModal({ show: true, editData: vehicle });
  };

  const renderStars = (rating = 5.0) => {
    return (
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map(star => (
          <Star key={star} size={14} className={star <= Math.round(rating) ? styles.star : `${styles.star} ${styles.empty}`} fill="currentColor" />
        ))}
        <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (loading) return <Loader />;

  return (
    <motion.div 
      className={styles.dashboard}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome back, Admin 👋</h1>
          <p className={styles.subtitle}>Business overview for this month</p>
        </div>
        <button className={styles.addBtn} onClick={() => navigate('/generate')} style={{ padding: '10px 20px' }}>
          <Sparkles size={18} /> Generate Summary
        </button>
      </div>

      {stats && (
        <div className={styles.statsGrid}>
          <StatCard title="Total Reports" value={stats.totalReports} icon={FileText} color="primary" />
          <StatCard title="Average Rating" value={stats.averageRating} icon={TrendingUp} color="success" />
          <StatCard title="Monthly Reports" value={stats.monthlyReports} icon={Calendar} color="warning" />
          <StatCard title="Total Drivers" value={stats.totalDrivers} icon={Users} color="primary" />
          <StatCard title="Total Vehicles" value={stats.totalVehicles} icon={Car} color="success" />
        </div>
      )}

      <div className={styles.mainGrid}>
        <div className={styles.recentSection}>
          <div className={styles.sectionHeader}>
            <h2>Recent Reports</h2>
            <button className={styles.viewAllBtn} onClick={() => navigate('/history')}>View All</button>
          </div>
          
          <div className={`card ${styles.tableCard}`}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Report Title</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map(report => (
                  <tr key={report.id}>
                    <td className={styles.reportTitle}>{report.title}</td>
                    <td className={styles.reportDate}>{report.date}</td>
                    <td><StatusBadge status={report.status} /></td>
                    <td>
                      <button className={styles.viewBtn} onClick={() => navigate('/history')}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.sideLists}>
          {/* Drivers List */}
          <div className={styles.listCard}>
            <div className={styles.listHeader}>
              <h3>
                <div className={styles.iconWrapper}><Users size={16} /></div>
                Drivers
              </h3>
              <button className={styles.addBtn} onClick={() => openDriverModal()}>
                <Plus size={14} /> Add Driver
              </button>
            </div>
            <div className={styles.tableContainer}>
              <table className={styles.sideTable}>
                <thead>
                  <tr>
                    <th>Driver Name</th>
                    <th>Age</th>
                    <th>Rating</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.slice(0, 5).map(driver => (
                    <tr key={driver.id}>
                      <td className={styles.listName}>{driver.name}</td>
                      <td className={styles.listSub}>{driver.age}</td>
                      <td>{renderStars(driver.rating)}</td>
                      <td>
                        <div className={styles.actionBtns}>
                          <button className={`${styles.actionBtn} ${styles.edit}`} onClick={() => openDriverModal(driver)}>
                            <Edit2 size={14} />
                          </button>
                          <button className={styles.actionBtn} onClick={() => handleDeleteDriver(driver.id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {drivers.length > 5 && (
              <div className={styles.viewAllCenter}>
                <button className={styles.viewAllBtn} onClick={() => navigate('/drivers')}>View All Drivers</button>
              </div>
            )}
          </div>

          {/* Vehicles List */}
          <div className={styles.listCard}>
            <div className={styles.listHeader}>
              <h3>
                <div className={styles.iconWrapper}><Car size={16} /></div>
                Vehicles
              </h3>
              <button className={styles.addBtn} onClick={() => openVehicleModal()}>
                <Plus size={14} /> Add Vehicle
              </button>
            </div>
            <div className={styles.tableContainer}>
              <table className={styles.sideTable}>
                <thead>
                  <tr>
                    <th>Vehicle Name</th>
                    <th>Number Plate</th>
                    <th>Rating</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.slice(0, 5).map(vehicle => (
                    <tr key={vehicle.id}>
                      <td className={styles.listName}>{vehicle.name}</td>
                      <td className={styles.listSub}>{vehicle.registration}</td>
                      <td>{renderStars(vehicle.rating)}</td>
                      <td>
                        <div className={styles.actionBtns}>
                          <button className={`${styles.actionBtn} ${styles.edit}`} onClick={() => openVehicleModal(vehicle)}>
                            <Edit2 size={14} />
                          </button>
                          <button className={styles.actionBtn} onClick={() => handleDeleteVehicle(vehicle.id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {vehicles.length > 5 && (
              <div className={styles.viewAllCenter}>
                <button className={styles.viewAllBtn} onClick={() => navigate('/vehicles')}>View All Vehicles</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Driver Modal */}
      {driverModal.show && (
        <Modal onClose={() => setDriverModal({ show: false, editData: null })}>
          <div style={{ padding: '24px' }}>
            <h2 style={{ marginBottom: '16px' }}>{driverModal.editData ? 'Edit Driver' : 'Add Driver'}</h2>
            <form onSubmit={handleDriverSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#4b5563' }}>Name</label>
                <input 
                  type="text" 
                  value={driverForm.name}
                  onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#4b5563' }}>Age</label>
                <input 
                  type="number" 
                  value={driverForm.age}
                  onChange={(e) => setDriverForm({ ...driverForm, age: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#4b5563' }}>Rating (1.0 - 5.0)</label>
                <input 
                  type="number" 
                  min="1" max="5" step="0.1"
                  value={driverForm.rating}
                  onChange={(e) => setDriverForm({ ...driverForm, rating: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                  required
                />
              </div>
              <button type="submit" className={styles.addBtn} style={{ marginTop: '8px', justifyContent: 'center' }}>
                {driverModal.editData ? 'Save Changes' : 'Add Driver'}
              </button>
            </form>
          </div>
        </Modal>
      )}

      {/* Vehicle Modal */}
      {vehicleModal.show && (
        <Modal onClose={() => setVehicleModal({ show: false, editData: null })}>
          <div style={{ padding: '24px' }}>
            <h2 style={{ marginBottom: '16px' }}>{vehicleModal.editData ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
            <form onSubmit={handleVehicleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#4b5563' }}>Vehicle Name</label>
                <input 
                  type="text" 
                  value={vehicleForm.name}
                  onChange={(e) => setVehicleForm({ ...vehicleForm, name: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#4b5563' }}>Registration</label>
                <input 
                  type="text" 
                  value={vehicleForm.registration}
                  onChange={(e) => setVehicleForm({ ...vehicleForm, registration: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#4b5563' }}>Rating (1.0 - 5.0)</label>
                <input 
                  type="number" 
                  min="1" max="5" step="0.1"
                  value={vehicleForm.rating}
                  onChange={(e) => setVehicleForm({ ...vehicleForm, rating: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                  required
                />
              </div>
              <button type="submit" className={styles.addBtn} style={{ marginTop: '8px', justifyContent: 'center' }}>
                {vehicleModal.editData ? 'Save Changes' : 'Add Vehicle'}
              </button>
            </form>
          </div>
        </Modal>
      )}
    </motion.div>
  );
};

export default Dashboard;
