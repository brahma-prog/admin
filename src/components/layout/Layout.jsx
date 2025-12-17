import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, canAccessRoute } = useAuth();
  const location = useLocation();

  // Check if user can access current route
  const canAccess = canAccessRoute(location.pathname);

  // Handle sidebar collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Redirect if user cannot access route
  if (!canAccess) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="layout">
      <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="main-content">
        <Topbar 
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)} 
          sidebarCollapsed={sidebarCollapsed}
        />
        <main className="content-area">
          <div className="container">
            {user ? <Outlet /> : <Navigate to="/login" replace />}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="app-footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-left">
                <p>© {new Date().getFullYear()} QuickMed Admin Portal. All rights reserved.</p>
              </div>
              <div className="footer-right">
                <p>v1.0.0 • Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;