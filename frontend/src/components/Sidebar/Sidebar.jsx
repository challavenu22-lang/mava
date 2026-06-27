import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  History, 
  BarChart2, 
  LayoutTemplate, 
  Settings as SettingsIcon,
  Rocket,
  Users,
  Car
} from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Sidebar.module.css';
import { getStoredSettings } from '../../services/settingsService';

const menuItems = [
  { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { path: '/generate', name: 'Generate Summary', icon: FileText },
  { path: '/history', name: 'History', icon: History },
  { path: '/analytics', name: 'Analytics', icon: BarChart2 },
  { path: '/templates', name: 'Templates', icon: LayoutTemplate },
  { path: '/drivers', name: 'Drivers', icon: Users },
  { path: '/vehicles', name: 'Vehicles', icon: Car },
  { path: '/settings', name: 'Settings', icon: SettingsIcon },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [settings, setSettings] = useState(() => getStoredSettings());

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
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon}>
          <Rocket size={24} color="#fff" />
        </div>
        <h2 className={styles.logoText}>Manivtha Tours</h2>
      </div>

      <nav className={styles.navMenu}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                onClick={() => window.innerWidth <= 768 && toggleSidebar()}
                className={({ isActive }) => 
                  `${styles.navItem} ${isActive ? styles.active : ''}`
                }
              >
                <item.icon className={styles.icon} size={20} />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.bottomSection}>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>{firstLetter}</div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{settings.name}</p>
            <p className={styles.userRole}>Workspace Owner</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
