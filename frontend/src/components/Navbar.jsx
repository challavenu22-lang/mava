import React from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
      </div>
      
      <div className="navbar-right">
        
        <div className="profile-section">
          <div className="profile-avatar-circle">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" 
              alt="Admin" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="avatar-fallback" style={{ display: 'none' }}>A</div>
          </div>
          <div className="profile-info">
            <span className="profile-name">Admin User</span>
            <span className="profile-role">Administrator</span>
          </div>
          <ChevronDown size={16} className="navbar-profile-chevron" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
