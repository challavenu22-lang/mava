import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  History, 
  BarChart3, 
  CopyPlus, 
  Settings,
  Bus,
  ChevronDown
} from 'lucide-react';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/generate', name: 'Generate Summary', icon: <FileText size={20} /> },
    { path: '/history', name: 'History', icon: <History size={20} /> },
    { path: '/analytics', name: 'Analytics', icon: <BarChart3 size={20} /> },
    { path: '/templates', name: 'Templates', icon: <CopyPlus size={20} /> },
    { path: '/settings', name: 'Settings', icon: <Settings size={20} /> }
  ];

  return (
    <aside className={`sidebar ${!isOpen ? 'closed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <Bus className="logo-icon" size={20} />
        </div>
        <div className="brand-text-container">
          <span className="brand-name">Manivtha</span>
          <span className="brand-sub">Tours & Travels</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => {
              if (window.innerWidth <= 768) {
                setIsOpen(false);
              }
            }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {isOpen && (
        <div className="sidebar-footer">
          {/* User Profile Info */}
          <div className="sidebar-profile">
            <div className="profile-avatar-circle">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" 
                alt="Admin" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="avatar-fallback" style={{ display: 'none' }}>AU</div>
            </div>
            <div className="profile-details">
              <span className="profile-username">Admin User</span>
              <span className="profile-email">admin@manivtha.com</span>
            </div>
            <ChevronDown size={16} className="profile-chevron" />
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
