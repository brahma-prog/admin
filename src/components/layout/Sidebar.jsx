import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  HiHome, 
  HiUsers, 
  HiUserGroup, 
  HiShoppingBag,
  HiTruck,
  HiShoppingCart,
  HiCurrencyDollar,
  HiDocumentText,
  HiKey,
  HiNewspaper,
  HiClipboardList,
  HiLogout,
  HiCog,
  HiChevronLeft,
  HiChevronRight,
  HiMenu,
  HiX
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ collapsed, onToggleCollapse }) => {
  const { user, logout, getRoleName } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: <HiHome />, permission: 'view_dashboard' },
    { path: '/users', label: 'User Management', icon: <HiUsers />, permission: 'manage_users' },
    { path: '/doctors', label: 'Doctor Management', icon: <HiUserGroup />, permission: 'manage_doctors' },
    { path: '/pharmacies', label: 'Pharmacy Management', icon: <HiShoppingBag />, permission: 'manage_pharmacies' },
    { path: '/delivery-partners', label: 'Delivery Partners', icon: <HiTruck />, permission: 'manage_delivery' },
    { path: '/orders', label: 'Order Management', icon: <HiShoppingCart />, permission: 'manage_orders' },
    { path: '/payments', label: 'Payments & Settlements', icon: <HiCurrencyDollar />, permission: 'manage_payments' },
    { path: '/compliance', label: 'Compliance', icon: <HiDocumentText />, permission: 'view_compliance' },
    { path: '/roles', label: 'Role Management', icon: <HiKey />, permission: 'manage_roles' },
    { path: '/content', label: 'Content Management', icon: <HiNewspaper />, permission: 'manage_content' },
    { path: '/audit-logs', label: 'Audit Logs', icon: <HiClipboardList />, permission: 'view_audit_logs' },
    { path: '/settings', label: 'Settings', icon: <HiCog />, permission: 'all' },
  ];

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout(() => navigate('/login'));
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogoError = (e) => {
    setLogoError(true);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm Logout</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to logout from the admin portal?</p>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-btn cancel-btn"
                onClick={cancelLogout}
              >
                Cancel
              </button>
              <button 
                className="modal-btn confirm-btn"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon-wrapper">
              {!logoError ? (
                <img 
                  src="/QuickMed_logo.png" 
                  alt="QuickMed Logo" 
                  className="logo-image"
                  onError={handleLogoError}
                />
              ) : (
                <div className="logo-icon-fallback">
                  QM
                </div>
              )}
            </div>
            {!collapsed && (
              <div className="logo-text">
                <h2 className="logo-title">QuickMed</h2>
                <p className="logo-subtitle">Admin Portal</p>
              </div>
            )}
          </div>
          
          <button 
            className="sidebar-toggle-btn"
            onClick={onToggleCollapse}
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <HiChevronRight /> : <HiChevronLeft />}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            if (!user?.permissions?.includes('all') && !user?.permissions?.includes(item.permission)) {
              return null;
            }
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                title={collapsed ? item.label : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                {!collapsed && <span className="nav-label">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user?.avatar || (user?.name ? user.name.charAt(0).toUpperCase() : 'U')}
            </div>
            {!collapsed && (
              <div className="user-details">
                <p className="user-name">{user?.name || 'User'}</p>
                
              </div>
            )}
          </div>
          <button 
            onClick={handleLogout} 
            className="logout-btn" 
            title="Logout"
            aria-label="Logout"
          >
            <HiLogout />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;