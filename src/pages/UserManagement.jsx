import React, { useState, useEffect } from 'react';
import { 
  HiSearch, 
  HiFilter, 
  HiEye, 
  HiPencil, 
  HiTrash, 
  HiLockOpen, 
  HiLockClosed,
  HiDownload,
  HiUserGroup,
  HiShoppingCart,
  HiVideoCamera,
  HiCurrencyRupee,
  HiCalendar,
  HiClock,
  HiLocationMarker
} from 'react-icons/hi';
import { 
  FiTrendingUp, 
  FiTrendingDown,
  FiPackage,
  FiUsers
} from 'react-icons/fi';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import SearchBar from '../components/common/SearchBar';
import './UserManagement.css';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newToday: 0,
    totalOrders: 0,
    totalRevenue: 0,
    avgConsultations: 0
  });

  // Enhanced user data with more real-time details
  const users = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 9876543210',
      joined: '2024-01-15',
      lastActive: '2024-02-20 14:30',
      location: 'Mumbai',
      orders: 12,
      consultations: 5,
      familyMembers: 4,
      totalSpent: 12500,
      status: 'active',
      membership: 'Premium',
      recentActivity: [
        { type: 'order', date: '2024-02-20', value: 'Medicine Delivery', amount: 850 },
        { type: 'consultation', date: '2024-02-18', value: 'Video Consultation', doctor: 'Dr. Sharma' },
        { type: 'purchase', date: '2024-02-15', value: 'Baby Care Kit', amount: 1200 }
      ],
      devices: ['Android', 'Web'],
      pregnancyCare: false
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 9876543211',
      joined: '2024-01-10',
      lastActive: '2024-02-21 09:15',
      location: 'Delhi',
      orders: 8,
      consultations: 3,
      familyMembers: 3,
      totalSpent: 8900,
      status: 'active',
      membership: 'Basic',
      recentActivity: [
        { type: 'order', date: '2024-02-21', value: 'Prescription Medicines', amount: 650 },
        { type: 'consultation', date: '2024-02-19', value: 'Pregnancy Checkup', doctor: 'Dr. Patel' }
      ],
      devices: ['iOS'],
      pregnancyCare: true,
      pregnancyWeek: 24
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit@example.com',
      phone: '+91 9876543212',
      joined: '2024-01-05',
      lastActive: '2024-02-10 11:45',
      location: 'Bangalore',
      orders: 3,
      consultations: 1,
      familyMembers: 2,
      totalSpent: 3200,
      status: 'suspended',
      membership: 'Basic',
      recentActivity: [
        { type: 'order', date: '2024-02-10', value: 'OTC Medicines', amount: 450 }
      ],
      devices: ['Android'],
      pregnancyCare: false
    },
    {
      id: 4,
      name: 'Sneha Gupta',
      email: 'sneha@example.com',
      phone: '+91 9876543213',
      joined: '2023-12-20',
      lastActive: '2024-02-21 16:20',
      location: 'Chennai',
      orders: 20,
      consultations: 8,
      familyMembers: 6,
      totalSpent: 21500,
      status: 'active',
      membership: 'Premium',
      recentActivity: [
        { type: 'order', date: '2024-02-21', value: 'Baby Essentials', amount: 1800 },
        { type: 'consultation', date: '2024-02-20', value: 'Pediatric Consultation', doctor: 'Dr. Reddy' },
        { type: 'purchase', date: '2024-02-18', value: 'Health Supplements', amount: 1200 }
      ],
      devices: ['iOS', 'Web'],
      pregnancyCare: false
    },
    {
      id: 5,
      name: 'Vikram Singh',
      email: 'vikram@example.com',
      phone: '+91 9876543214',
      joined: '2023-12-15',
      lastActive: '2024-02-19 20:10',
      location: 'Hyderabad',
      orders: 15,
      consultations: 6,
      familyMembers: 5,
      totalSpent: 16700,
      status: 'pending',
      membership: 'Basic',
      recentActivity: [
        { type: 'order', date: '2024-02-19', value: 'Emergency Medicines', amount: 950 },
        { type: 'consultation', date: '2024-02-17', value: 'General Checkup', doctor: 'Dr. Mehta' }
      ],
      devices: ['Android'],
      pregnancyCare: false
    }
  ];

  const columns = [
    { 
      key: 'name', 
      label: 'User',
      render: (value, user) => (
        <div className="user-cell">
          <div className="user-avatar">
            {user.name.charAt(0)}
          </div>
          <div className="user-info">
            <span className="user-name">{value}</span>
            <span className="user-email">{user.email}</span>
          </div>
        </div>
      )
    },
    { 
      key: 'phone', 
      label: 'Contact',
      render: (value) => (
        <div className="contact-cell">
          <span>{value}</span>
        </div>
      )
    },
    { 
      key: 'joined', 
      label: 'Joined',
      render: (value) => (
        <div className="date-cell">
          <HiCalendar />
          <span>{value}</span>
        </div>
      )
    },
    { 
      key: 'orders', 
      label: 'Orders',
      render: (value) => (
        <div className="stat-cell">
          <HiShoppingCart />
          <span>{value}</span>
        </div>
      )
    },
    { 
      key: 'consultations', 
      label: 'Consults',
      render: (value) => (
        <div className="stat-cell">
          <HiVideoCamera />
          <span>{value}</span>
        </div>
      )
    },
    { 
      key: 'totalSpent', 
      label: 'Spent',
      render: (value) => (
        <div className="amount-cell">
          <HiCurrencyRupee />
          <span>{value.toLocaleString()}</span>
        </div>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value, user) => (
        <div className="status-cell">
          <span className={`status-badge status-${value}`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
          {user.pregnancyCare && (
            <span className="pregnancy-badge">
              Pregnant
            </span>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, user) => (
        <div className="action-buttons">
          <button 
            className="btn-icon btn-sm btn-info"
            onClick={() => viewUserDetails(user)}
            title="View Details"
          >
            <HiEye />
          </button>
          <button 
            className="btn-icon btn-sm btn-warning"
            onClick={() => toggleUserStatus(user)}
            title={user.status === 'active' ? 'Suspend' : 'Activate'}
          >
            {user.status === 'active' ? <HiLockClosed /> : <HiLockOpen />}
          </button>
          <button 
            className="btn-icon btn-sm btn-error"
            onClick={() => confirmDelete(user)}
            title="Delete"
          >
            <HiTrash />
          </button>
        </div>
      )
    }
  ];

  // Calculate statistics
  useEffect(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const totalOrders = users.reduce((sum, user) => sum + user.orders, 0);
    const totalRevenue = users.reduce((sum, user) => sum + user.totalSpent, 0);
    const avgConsultations = users.reduce((sum, user) => sum + user.consultations, 0) / users.length;
    
    setStats({
      totalUsers,
      activeUsers,
      newToday: 3, // Mock data
      totalOrders,
      totalRevenue,
      avgConsultations: avgConsultations.toFixed(1)
    });
  }, []);

  const viewUserDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const toggleUserStatus = (user) => {
    // API call to toggle status
    console.log('Toggle status for:', user.id);
  };

  const confirmDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      // API call to delete
      console.log('Delete user:', user.id);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      activeFilter === 'all' || 
      (activeFilter === 'active' && user.status === 'active') ||
      (activeFilter === 'suspended' && user.status === 'suspended') ||
      (activeFilter === 'pending' && user.status === 'pending') ||
      (activeFilter === 'pregnant' && user.pregnancyCare);
    
    return matchesSearch && matchesFilter;
  });

  const getActivityIcon = (type) => {
    switch(type) {
      case 'order': return <HiShoppingCart />;
      case 'consultation': return <HiVideoCamera />;
      case 'purchase': return <FiPackage />;
      default: return <HiCalendar />;
    }
  };

  return (
    <div className="user-management">
      <div className="page-header">
        <h1>User Management Dashboard</h1>
        <p>Super Admin Panel - Monitor all patient accounts, activities, and real-time data</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-primary">
          <div className="stat-icon">
            <FiUsers />
          </div>
          <div className="stat-content">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
            <span className="stat-trend">
              <FiTrendingUp /> +12% this month
            </span>
          </div>
        </div>
        
        <div className="stat-card stat-success">
          <div className="stat-icon">
            <HiUserGroup />
          </div>
          <div className="stat-content">
            <h3>{stats.activeUsers}</h3>
            <p>Active Users</p>
            <span className="stat-trend">
              <FiTrendingUp /> +8% this week
            </span>
          </div>
        </div>
        
        <div className="stat-card stat-warning">
          <div className="stat-icon">
            <HiShoppingCart />
          </div>
          <div className="stat-content">
            <h3>{stats.totalOrders}</h3>
            <p>Total Orders</p>
            <span className="stat-trend">
              <FiTrendingUp /> +24% today
            </span>
          </div>
        </div>
        
        <div className="stat-card stat-info">
          <div className="stat-icon">
            <HiCurrencyRupee />
          </div>
          <div className="stat-content">
            <h3>₹{stats.totalRevenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
            <span className="stat-trend">
              <FiTrendingUp /> +18% this month
            </span>
          </div>
        </div>
      </div>

      {/* Management Toolbar */}
      <div className="management-toolbar">
        <div className="toolbar-left">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search users by name, email, phone, or location..."
          />
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Users
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'active' ? 'active' : ''}`}
              onClick={() => setActiveFilter('active')}
            >
              Active
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'pregnant' ? 'active' : ''}`}
              onClick={() => setActiveFilter('pregnant')}
            >
              Pregnancy Care
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'suspended' ? 'active' : ''}`}
              onClick={() => setActiveFilter('suspended')}
            >
              Suspended
            </button>
          </div>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-outline">
            <HiDownload />
            Export Data
          </button>
          <button className="btn btn-primary">
            Add New User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="card table-card">
        <div className="card-header">
          <h3>User Management</h3>
          <span className="badge">{filteredUsers.length} users</span>
        </div>
        <Table
          columns={columns}
          data={filteredUsers}
          emptyMessage="No users found matching your criteria"
        />
      </div>

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <Modal
          title="User Detailed Profile"
          onClose={() => setShowModal(false)}
          size="lg"
        >
          <div className="user-details-modal">
            {/* User Profile Header */}
            <div className="user-profile-header">
              <div className="profile-avatar">
                {selectedUser.name.charAt(0)}
              </div>
              <div className="profile-info">
                <h3>{selectedUser.name}</h3>
                <p>{selectedUser.email} • {selectedUser.phone}</p>
                <div className="profile-tags">
                  <span className={`status-badge status-${selectedUser.status}`}>
                    {selectedUser.status}
                  </span>
                  <span className="membership-tag">
                    {selectedUser.membership} Member
                  </span>
                  {selectedUser.pregnancyCare && (
                    <span className="pregnancy-tag">
                      Pregnancy Week {selectedUser.pregnancyWeek}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* User Details Grid */}
            <div className="user-details-grid">
              <div className="detail-section">
                <h4>Account Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label><HiCalendar /> Joined Date</label>
                    <span>{selectedUser.joined}</span>
                  </div>
                  <div className="detail-item">
                    <label><HiClock /> Last Active</label>
                    <span>{selectedUser.lastActive}</span>
                  </div>
                  <div className="detail-item">
                    <label><HiLocationMarker /> Location</label>
                    <span>{selectedUser.location}</span>
                  </div>
                  <div className="detail-item">
                    <label><HiUserGroup /> Family Members</label>
                    <span>{selectedUser.familyMembers} members</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Financial Summary</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label><HiShoppingCart /> Total Orders</label>
                    <span>{selectedUser.orders}</span>
                  </div>
                  <div className="detail-item">
                    <label><HiVideoCamera /> Consultations</label>
                    <span>{selectedUser.consultations}</span>
                  </div>
                  <div className="detail-item">
                    <label><HiCurrencyRupee /> Total Spent</label>
                    <span>₹{selectedUser.totalSpent.toLocaleString()}</span>
                  </div>
                  <div className="detail-item">
                    <label>Avg Order Value</label>
                    <span>₹{(selectedUser.totalSpent / selectedUser.orders || 0).toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="activity-section">
              <h4>Recent Activity</h4>
              <div className="activity-list">
                {selectedUser.recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="activity-content">
                      <span className="activity-title">{activity.value}</span>
                      <span className="activity-date">{activity.date}</span>
                      {activity.doctor && (
                        <span className="activity-doctor">with {activity.doctor}</span>
                      )}
                      {activity.amount && (
                        <span className="activity-amount">₹{activity.amount}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Devices & Access */}
            <div className="devices-section">
              <h4>Devices & Access</h4>
              <div className="devices-list">
                {selectedUser.devices.map((device, index) => (
                  <span key={index} className="device-tag">
                    {device}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-actions">
              <button className="btn btn-outline">View Full History</button>
              <button className="btn btn-primary">Edit Profile</button>
              <button className="btn btn-warning">Send Notification</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserManagement;