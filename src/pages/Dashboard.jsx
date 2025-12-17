import React, { useState, useEffect } from 'react';
import { 
  HiUsers, 
  HiUserGroup, 
  HiShoppingBag, 
  HiTruck,
  HiShoppingCart,
  HiCurrencyDollar,
  HiExclamationCircle,
  HiArrowUp,
  HiArrowDown,
  HiRefresh
} from 'react-icons/hi';
import StatsCard from '../components/dashboard/StatsCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import PendingApprovals from '../components/dashboard/PendingApprovals';
import LineChart from '../components/charts/LineChart';
import PieChart from '../components/charts/PieChart';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const stats = [
    {
      title: 'Total Users',
      value: '12,847',
      change: '+12%',
      trend: 'up',
      icon: <HiUsers />,
      color: 'var(--primary)'
    },
    {
      title: 'Active Doctors',
      value: '423',
      change: '+8%',
      trend: 'up',
      icon: <HiUserGroup />,
      color: 'var(--info)'
    },
    {
      title: 'Pharmacies',
      value: '156',
      change: '+5%',
      trend: 'up',
      icon: <HiShoppingBag />,
      color: 'var(--success)'
    },
    {
      title: 'Delivery Partners',
      value: '289',
      change: '-2%',
      trend: 'down',
      icon: <HiTruck />,
      color: 'var(--warning)'
    },
    {
      title: 'Active Orders',
      value: '47',
      change: '+15%',
      trend: 'up',
      icon: <HiShoppingCart />,
      color: 'var(--mint)'
    },
    {
      title: 'Revenue Today',
      value: '₹124,850',
      change: '+18%',
      trend: 'up',
      icon: <HiCurrencyDollar />,
      color: 'var(--success)'
    }
  ];

  const criticalAlerts = [
    { id: 1, type: 'high-risk', message: 'High-risk pregnancy consultation in progress', priority: 'high' },
    { id: 2, type: 'compliance', message: '3 doctor licenses expiring this week', priority: 'medium' },
    { id: 3, type: 'order', message: '5 orders delayed beyond SLA', priority: 'high' },
    { id: 4, type: 'payment', message: 'Payment gateway experiencing issues', priority: 'medium' },
  ];

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // Initial data load
    refreshData();
  }, []);

  return (
    <div className="dashboard">
      <div className="page-header">
        <div className="header-row">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {user?.name}! Here's what's happening with your platform today.</p>
          </div>
          <div className="header-actions">
            <button 
              className="btn btn-outline" 
              onClick={refreshData}
              disabled={loading}
            >
              <HiRefresh /> {loading ? 'Refreshing...' : 'Refresh Data'}
            </button>
            <div className="last-updated">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-warning">
        <HiExclamationCircle />
        <div>
          <strong>System Notification:</strong> Platform maintenance scheduled for Sunday, 2 AM - 4 AM.
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="dashboard-content grid grid-cols-2">
        <div className="chart-section card">
          <h3>Platform Growth Overview</h3>
          <LineChart />
        </div>
        
        <div className="chart-section card">
          <h3>Order Status Distribution</h3>
          <PieChart />
        </div>
      </div>

      <div className="dashboard-content grid grid-cols-2">
        <div className="card">
          <h3>Critical Alerts</h3>
          <div className="alerts-list">
            {criticalAlerts.map(alert => (
              <div key={alert.id} className={`alert-item ${alert.priority}`}>
                <div className="alert-indicator"></div>
                <div className="alert-content">
                  <p className="alert-message">{alert.message}</p>
                  <span className="alert-type">{alert.type}</span>
                </div>
                <button className="btn btn-sm btn-outline">View</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Pending Approvals</h3>
          <PendingApprovals />
        </div>
      </div>

      <div className="card">
        <div className="section-header">
          <h3>Recent Activity</h3>
          <button className="btn btn-sm btn-outline">View All</button>
        </div>
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard; 