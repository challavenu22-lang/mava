import React, { useState, useEffect } from 'react';
import { Moon, Sun, Bell, User, Layout, Save } from 'lucide-react';
import { getStoredSettings, saveStoredSettings } from '../services/settingsService';

const Settings = () => {
  const [settings, setSettings] = useState(() => getStoredSettings());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const handleSettingsUpdate = () => {
      setSettings(getStoredSettings());
    };
    window.addEventListener('settingsUpdated', handleSettingsUpdate);
    return () => {
      window.removeEventListener('settingsUpdated', handleSettingsUpdate);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name, value) => {
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleDarkMode = () => {
    const updatedSettings = {
      ...settings,
      darkMode: !settings.darkMode
    };
    setSettings(updatedSettings);
    saveStoredSettings(updatedSettings);
    if (updatedSettings.darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  };

  const toggleNotifications = () => {
    const updatedSettings = {
      ...settings,
      notifications: !settings.notifications
    };
    setSettings(updatedSettings);
    saveStoredSettings(updatedSettings);
  };

  const handleSave = () => {
    saveStoredSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="settings-page" style={{ width: '100%' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.375rem' }}>Settings</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Manage your application preferences and profile.</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '2rem' 
      }}>
        
        {/* Appearance Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color, #f3f4f6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color, #f3f4f6)', paddingBottom: '1rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#F5F3FF', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layout size={18} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)' }}>Appearance</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
            <div>
              <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>Dark Mode</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.125rem', marginBottom: '0.75rem' }}>Toggle dark theme across the application.</div>
              <button 
                className="btn"
                type="button"
                onClick={toggleDarkMode}
                style={{ 
                  background: settings.darkMode ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' : '#f3f4f6', 
                  color: settings.darkMode ? '#ffffff' : '#374151',
                  border: 'none',
                  padding: '0.625rem 1.25rem',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: '600',
                  width: '100%',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {settings.darkMode ? <Moon size={16} /> : <Sun size={16} />}
                {settings.darkMode ? 'Dark' : 'Light'}
              </button>
            </div>
          </div>
        </div>

        {/* Admin Profile Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color, #f3f4f6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color, #f3f4f6)', paddingBottom: '1rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={18} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)' }}>Admin Profile</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
            <div className="form-group" style={{ margin: 0, display: 'flex', flexDirection: 'column' }}>
              <label className="form-label" style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Full Name</label>
              <input 
                type="text" 
                name="name"
                className="form-control" 
                value={settings.name} 
                onChange={handleChange}
                style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color, #e5e7eb)', outline: 'none' }}
              />
            </div>
            
            <div className="form-group" style={{ margin: 0, display: 'flex', flexDirection: 'column' }}>
              <label className="form-label" style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Email Address</label>
              <input 
                type="email" 
                name="email"
                className="form-control" 
                value={settings.email} 
                onChange={handleChange}
                style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color, #e5e7eb)', outline: 'none' }}
              />
            </div>
          </div>
        </div>

        {/* Preferences Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color, #f3f4f6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color, #f3f4f6)', paddingBottom: '1rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#EFF6FF', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={18} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)' }}>Preferences</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
            <div>
              <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-main)' }}>Email Notifications</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.125rem', marginBottom: '0.75rem' }}>Receive email when a new summary is generated.</div>
              <button 
                className="btn"
                type="button"
                onClick={toggleNotifications}
                style={{ 
                  background: settings.notifications ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : '#f3f4f6', 
                  color: settings.notifications ? '#ffffff' : '#374151',
                  border: 'none',
                  padding: '0.625rem 1.25rem',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  width: '100%',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {settings.notifications ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Footer / Save settings section matching screenshot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
        <button 
          className="btn" 
          type="button"
          onClick={handleSave}
          style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            color: '#ffffff',
            border: 'none',
            padding: '0.875rem 2rem',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)'
          }}
        >
          <Save size={18} /> Save Settings
        </button>
        {saved && (
          <span style={{ color: 'var(--color-success)', fontSize: '0.9rem', fontWeight: '600', animation: 'fadeIn 0.5s ease' }}>
            Settings saved successfully!
          </span>
        )}
      </div>
    </div>
  );
};

export default Settings;
