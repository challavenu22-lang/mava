import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Edit2, Trash2 } from 'lucide-react';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal';
import { getVehicles, addVehicle, updateVehicle, deleteVehicle } from '../../services/apiService';
import styles from './Vehicles.module.css';

const Vehicles = () => {
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);

  // Modal state
  const [vehicleModal, setVehicleModal] = useState({ show: false, editData: null });
  const [vehicleForm, setVehicleForm] = useState({ name: '', registration: '', rating: '5.0' });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (error) {
      console.error("Error fetching vehicles", error);
    } finally {
      setLoading(false);
    }
  };

  const openVehicleModal = (vehicle = null) => {
    setVehicleForm(vehicle ? { name: vehicle.name, registration: vehicle.registration, rating: (vehicle.rating !== undefined && vehicle.rating !== null) ? vehicle.rating.toString() : '5.0' } : { name: '', registration: '', rating: '5.0' });
    setVehicleModal({ show: true, editData: vehicle });
  };

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
  };

  const handleDeleteVehicle = async (id) => {
    await deleteVehicle(id);
    setVehicles(prev => prev.filter(v => v.id !== id));
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
          <h1 className={styles.title}>Vehicles</h1>
          <p className={styles.subtitle}>View and manage all registered vehicles</p>
        </div>
        <button className={styles.addBtn} onClick={() => openVehicleModal()}>
          <Plus size={16} /> Add Vehicle
        </button>
      </div>

      <div className={`card ${styles.tableCard}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Vehicle Name</th>
              <th>Registration / Plate</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={vehicle.id}>
                <td className={styles.sub}>{index + 1}</td>
                <td className={styles.name}>{vehicle.name}</td>
                <td className={styles.sub}>{vehicle.registration}</td>
                <td>{renderStars(vehicle.rating)}</td>
                <td>
                  <div className={styles.actionBtns}>
                    <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => openVehicleModal(vehicle)}>
                      <Edit2 size={16} />
                    </button>
                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDeleteVehicle(vehicle.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {vehicles.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: '#6b7280' }}>
                  No vehicles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
              <button type="submit" className={styles.submitBtn} style={{ marginTop: '8px', justifyContent: 'center' }}>
                {vehicleModal.editData ? 'Save Changes' : 'Add Vehicle'}
              </button>
            </form>
          </div>
        </Modal>
      )}
    </motion.div>
  );
};

export default Vehicles;
