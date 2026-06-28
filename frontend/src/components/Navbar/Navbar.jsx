import React, { useState, useEffect } from 'react';
import { Menu, Bell, Search, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { getStoredSettings } from '../../services/settingsService';

const Navbar = ({ toggleSidebar }) => {
  const [settings, setSettings] = useState(() => getStoredSettings());
  const navigate = useNavigate();

  useEffect(() => {
    const handleSettingsUpdate = () => {
      setSettings(getStoredSettings());
    };
    window.addEventListener('settingsUpdated', handleSettingsUpdate);
    return () => {
      window.removeEventListener('settingsUpdated', handleSettingsUpdate);
    };
  }, []);

  const firstLetter = settings.name ? settings.name.charAt(0).toUpperCase() : 'A';

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <button className={styles.hamburger} onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
      </div>
      
      <div className={styles.right}>
        <div className={styles.profileDropdown} onClick={() => navigate('/settings')}>
          <div className={styles.avatar}>{firstLetter}</div>
          <span className={styles.name}>{settings.name}</span>
          <ChevronDown size={16} className={styles.chevron} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
