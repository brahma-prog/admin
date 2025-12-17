import React from 'react';
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
  HiChevronRight
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ collapsed, onToggleCollapse }) => {
  const { user, logout, getRoleName } = useAuth();
  const navigate = useNavigate();
  
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
    if (window.confirm('Are you sure you want to logout?')) {
      logout(() => navigate('/login'));
    }
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2 className="logo">
          <span className="logo-icon">QM</span>
          {!collapsed && <span>QuickMed</span>}
        </h2>
        {!collapsed && <p className="logo-subtitle">Admin Portal</p>}
        
        <button 
          className="sidebar-toggle-btn"
          onClick={onToggleCollapse}
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
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
            {user?.avatar || user?.name?.charAt(0)}
          </div>
          {!collapsed && (
            <div className="user-details">
              <p className="user-name">{user?.name}</p>
              <p className="user-role">{getRoleName()}</p>
            </div>
          )}
        </div>
        <button onClick={handleLogout} className="logout-btn" title="Logout">
          <HiLogout />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;