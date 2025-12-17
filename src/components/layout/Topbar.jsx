import React, { useState } from 'react';
import { HiBell, HiSearch, HiUserCircle } from 'react-icons/hi';
import './Topbar.css';

const Topbar = () => {
  const [notifications] = useState([
    { id: 1, message: '3 new doctor approvals pending', type: 'warning' },
    { id: 2, message: 'High-risk pregnancy alert', type: 'error' },
    { id: 3, message: 'Payment settlement completed', type: 'info' },
  ]);

  return (
    <header className="topbar">
      <div className="search-container">
        <HiSearch className="search-icon" />
        <input 
          type="text" 
          placeholder="Search users, orders, doctors..." 
          className="search-input"
        />
      </div>
      
      <div className="topbar-actions">
        <div className="notifications">
          <button className="notification-btn">
            <HiBell />
            <span className="notification-badge">3</span>
          </button>
          <div className="notification-dropdown">
            {notifications.map(notif => (
              <div key={notif.id} className={`notification-item ${notif.type}`}>
                <p>{notif.message}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="user-menu">
          <button className="user-menu-btn">
            <HiUserCircle />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;