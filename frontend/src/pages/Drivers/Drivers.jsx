import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Edit2, Trash2 } from 'lucide-react';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal';
import { getDrivers, addDriver, updateDriver, deleteDriver } from '../../services/apiService';
import styles from './Drivers.module.css';

const Drivers = () => {
  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);

  // Modal state
  const [driverModal, setDriverModal] = useState({ show: false, editData: null });
  const [driverForm, setDriverForm] = useState({ name: '', age: '', rating: '5.0' });

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const data = await getDrivers();
      setDrivers(data);
    } catch (error) {
      console.error("Error fetching drivers", error);
    } finally {
      setLoading(false);
    }
  };

  const openDriverModal = (driver = null) => {
    setDriverForm(driver ? { name: driver.name, age: driver.age.toString(), rating: (driver.rating !== undefined && driver.rating !== null) ? driver.rating.toString() : '5.0' } : { name: '', age: '', rating: '5.0' });
    setDriverModal({ show: true, editData: driver });
  };

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
  };

  const handleDeleteDriver = async (id) => {
    await deleteDriver(id);
    setDrivers(prev => prev.filter(d => d.id !== id));
  };

  const renderStars = (rating = 5.0) => {
    return (
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map(star => (
          <Star key={star} size={16} className={star <= Math.round(rating) ? styles.star : `${styles.star} ${styles.empty}`} fill="currentColor" />
        ))}
        <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (loading) return <Loader />;

  return (
    <motion.div 
      className={styles.page}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Drivers</h1>
          <p className={styles.subtitle}>View and manage all registered drivers</p>
        </div>
        <button className={styles.addBtn} onClick={() => openDriverModal()}>
          <Plus size={16} /> Add Driver
        </button>
      </div>

      <div className={`card ${styles.tableCard}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Driver Name</th>
              <th>Age</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={driver.id}>
                <td className={styles.sub}>{index + 1}</td>
                <td className={styles.name}>{driver.name}</td>
                <td className={styles.sub}>{driver.age}</td>
                <td>{renderStars(driver.rating)}</td>
                <td>
                  <div className={styles.actionBtns}>
                    <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => openDriverModal(driver)}>
                      <Edit2 size={16} />
                    </button>
                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDeleteDriver(driver.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {drivers.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: '#6b7280' }}>
                  No drivers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
              <button type="submit" className={styles.submitBtn} style={{ marginTop: '8px', justifyContent: 'center' }}>
                {driverModal.editData ? 'Save Changes' : 'Add Driver'}
              </button>
            </form>
          </div>
        </Modal>
      )}
    </motion.div>
  );
};

export default Drivers;
