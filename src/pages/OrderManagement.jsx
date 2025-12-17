import React, { useState, useEffect } from 'react';
import { 
  HiSearch, 
  HiFilter, 
  HiEye, 
  HiClock,
  HiCheckCircle,
  HiXCircle,
  HiTruck,
  HiExclamationCircle,
  HiRefresh,
  HiUsers,
  HiShoppingBag,
  HiCurrencyRupee,
  HiChartBar,
  HiUserGroup,
  HiOfficeBuilding, // Changed from HiBuildingStorefront
  HiMapPin,
  HiPhone,
  HiMail,
  HiStar,
  HiTrendingUp,
  HiTrendingDown
} from 'react-icons/hi';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import SearchBar from '../components/common/SearchBar';
import './OrderManagement.css';

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [realTimeStats, setRealTimeStats] = useState({
    totalOrders: 0,
    activeOrders: 0,
    delayedOrders: 0,
    totalRevenue: 0,
    avgDeliveryTime: 0,
    vendorsOnline: 0
  });

  // Real-time data simulation
  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealTimeStats(prev => ({
        ...prev,
        totalOrders: Math.floor(Math.random() * 200) + 100,
        activeOrders: Math.floor(Math.random() * 30) + 5,
        delayedOrders: Math.floor(Math.random() * 10) + 1,
        totalRevenue: Math.floor(Math.random() * 500000) + 100000,
        avgDeliveryTime: Math.floor(Math.random() * 20) + 30,
        vendorsOnline: Math.floor(Math.random() * 50) + 20
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const activeOrders = [
    {
      id: 'ORD-2024-00123',
      user: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      pharmacy: 'Health Plus Pharmacy',
      pharmacyId: 'PH-001',
      rider: 'Amit Kumar',
      amount: '₹1,245',
      status: 'processing',
      stage: 'Pharmacy Processing',
      time: '10 min ago',
      priority: 'normal',
      items: 3,
      location: 'Mumbai'
    },
    {
      id: 'ORD-2024-00124',
      user: 'Priya Sharma',
      phone: '+91 98765 43211',
      pharmacy: 'MedPlus Pharmacy',
      pharmacyId: 'PH-002',
      rider: 'Not Assigned',
      amount: '₹890',
      status: 'pending',
      stage: 'Awaiting Pharmacy',
      time: '25 min ago',
      priority: 'high',
      items: 2,
      location: 'Delhi'
    },
    {
      id: 'ORD-2024-00125',
      user: 'Amit Patel',
      phone: '+91 98765 43212',
      pharmacy: 'Care Pharmacy',
      pharmacyId: 'PH-003',
      rider: 'Vikram Singh',
      amount: '₹2,150',
      status: 'out_for_delivery',
      stage: 'Out for Delivery',
      time: '45 min ago',
      priority: 'normal',
      items: 5,
      location: 'Bangalore'
    }
  ];

  const completedOrders = [
    {
      id: 'ORD-2024-00122',
      user: 'Sneha Gupta',
      phone: '+91 98765 43213',
      pharmacy: 'Apollo Pharmacy',
      pharmacyId: 'PH-004',
      rider: 'Rajesh Patel',
      amount: '₹1,560',
      status: 'delivered',
      stage: 'Completed',
      time: '2 hours ago',
      rating: 5,
      items: 4,
      location: 'Chennai'
    },
    {
      id: 'ORD-2024-00121',
      user: 'Vikram Singh',
      phone: '+91 98765 43214',
      pharmacy: 'Health Plus Pharmacy',
      pharmacyId: 'PH-001',
      rider: 'Amit Kumar',
      amount: '₹980',
      status: 'delivered',
      stage: 'Completed',
      time: '4 hours ago',
      rating: 4,
      items: 3,
      location: 'Mumbai'
    }
  ];

  const vendors = [
    {
      id: 'VEN-001',
      name: 'Health Plus Pharmacy',
      owner: 'Rajesh Mehra',
      email: 'healthplus@pharmacy.com',
      phone: '+91 98765 43200',
      address: '123 Main Street, Mumbai',
      registrationDate: '2023-01-15',
      totalOrders: 1245,
      completedOrders: 1200,
      pendingOrders: 45,
      totalRevenue: '₹2,45,000',
      rating: 4.8,
      status: 'active',
      licenseNumber: 'PHAR-2023-MH-001',
      commissionRate: '15%'
    },
    {
      id: 'VEN-002',
      name: 'MedPlus Pharmacy',
      owner: 'Priya Sharma',
      email: 'medplus@pharmacy.com',
      phone: '+91 98765 43201',
      address: '456 Market Street, Delhi',
      registrationDate: '2023-02-20',
      totalOrders: 980,
      completedOrders: 950,
      pendingOrders: 30,
      totalRevenue: '₹1,89,500',
      rating: 4.5,
      status: 'active',
      licenseNumber: 'PHAR-2023-DL-002',
      commissionRate: '12%'
    },
    {
      id: 'VEN-003',
      name: 'Care Pharmacy',
      owner: 'Amit Verma',
      email: 'care@pharmacy.com',
      phone: '+91 98765 43202',
      address: '789 Park Avenue, Bangalore',
      registrationDate: '2023-03-10',
      totalOrders: 765,
      completedOrders: 750,
      pendingOrders: 15,
      totalRevenue: '₹1,52,300',
      rating: 4.7,
      status: 'active',
      licenseNumber: 'PHAR-2023-KA-003',
      commissionRate: '14%'
    }
  ];

  const columns = {
    active: [
      { key: 'id', label: 'Order ID' },
      { key: 'user', label: 'Customer' },
      { key: 'pharmacy', label: 'Pharmacy' },
      { key: 'rider', label: 'Rider' },
      { key: 'amount', label: 'Amount' },
      { 
        key: 'status', 
        label: 'Status',
        render: (status) => {
          const statusConfig = {
            processing: { label: 'Processing', color: 'warning', icon: '🔄' },
            pending: { label: 'Pending', color: 'warning', icon: '⏳' },
            out_for_delivery: { label: 'Out for Delivery', color: 'info', icon: '🚚' },
            delivered: { label: 'Delivered', color: 'success', icon: '✅' },
            cancelled: { label: 'Cancelled', color: 'error', icon: '❌' }
          };
          const config = statusConfig[status] || { label: status, color: 'default', icon: '' };
          return (
            <span className={`status-badge status-${config.color}`}>
              {config.icon} {config.label}
            </span>
          );
        }
      },
      { key: 'stage', label: 'Current Stage' },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, order) => (
          <div className="action-buttons">
            <button 
              className="btn-icon btn-sm"
              onClick={() => viewOrderDetails(order)}
              title="View Details"
            >
              <HiEye />
            </button>
            {order.rider === 'Not Assigned' && (
              <button 
                className="btn btn-sm btn-outline"
                onClick={() => assignRider(order)}
              >
                <HiTruck /> Assign
              </button>
            )}
            <button 
              className="btn-icon btn-sm btn-warning"
              onClick={() => escalateOrder(order)}
              title="Escalate"
            >
              <HiExclamationCircle />
            </button>
          </div>
        )
      }
    ],
    completed: [
      { key: 'id', label: 'Order ID' },
      { key: 'user', label: 'Customer' },
      { key: 'pharmacy', label: 'Pharmacy' },
      { key: 'rider', label: 'Rider' },
      { key: 'amount', label: 'Amount' },
      { 
        key: 'status', 
        label: 'Status',
        render: () => (
          <span className="status-badge status-success">
            <HiCheckCircle /> Delivered
          </span>
        )
      },
      { 
        key: 'rating', 
        label: 'Rating',
        render: (rating) => (
          <div className="rating-stars">
            {'★'.repeat(rating)}{'☆'.repeat(5-rating)}
          </div>
        )
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, order) => (
          <div className="action-buttons">
            <button 
              className="btn-icon btn-sm"
              onClick={() => viewOrderDetails(order)}
            >
              <HiEye />
            </button>
            <button 
              className="btn-icon btn-sm"
              onClick={() => generateInvoice(order)}
            >
              Invoice
            </button>
          </div>
        )
      }
    ],
    vendors: [
      { key: 'id', label: 'Vendor ID' },
      { key: 'name', label: 'Pharmacy Name' },
      { key: 'owner', label: 'Owner' },
      { key: 'phone', label: 'Contact' },
      { 
        key: 'totalOrders', 
        label: 'Total Orders',
        render: (orders) => (
          <span className="stat-value">{orders.toLocaleString()}</span>
        )
      },
      { 
        key: 'totalRevenue', 
        label: 'Total Revenue',
        render: (revenue) => (
          <span className="revenue-amount">{revenue}</span>
        )
      },
      { 
        key: 'rating', 
        label: 'Rating',
        render: (rating) => (
          <div className="vendor-rating">
            <HiStar className="star-icon" />
            <span>{rating}</span>
          </div>
        )
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, vendor) => (
          <div className="action-buttons">
            <button 
              className="btn-icon btn-sm"
              onClick={() => viewVendorDetails(vendor)}
              title="View Details"
            >
              <HiEye />
            </button>
            <button 
              className="btn btn-sm btn-outline"
              onClick={() => viewVendorOrders(vendor)}
            >
              <HiShoppingBag /> Orders
            </button>
          </div>
        )
      }
    ]
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const viewVendorDetails = (vendor) => {
    setSelectedVendor(vendor);
    setShowVendorModal(true);
  };

  const viewVendorOrders = (vendor) => {
    console.log('View orders for vendor:', vendor.id);
    // Filter orders by pharmacy
    const vendorOrders = [...activeOrders, ...completedOrders].filter(
      order => order.pharmacyId === vendor.id.replace('VEN', 'PH')
    );
    console.log('Vendor orders:', vendorOrders);
  };

  const assignRider = (order) => {
    const rider = prompt('Enter rider name for assignment:');
    if (rider) {
      alert(`Rider ${rider} assigned to order ${order.id}`);
    }
  };

  const escalateOrder = (order) => {
    if (window.confirm(`Escalate order ${order.id} to higher priority?`)) {
      alert(`Order ${order.id} escalated to HIGH priority!`);
    }
  };

  const generateInvoice = (order) => {
    alert(`Invoice generated for ${order.id}`);
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'active': return activeOrders;
      case 'completed': return completedOrders;
      case 'vendors': return vendors;
      case 'delayed': return [];
      case 'cancelled': return [];
      default: return [];
    }
  };

  const realTimeStatsData = [
    { 
      label: 'Total Orders', 
      value: realTimeStats.totalOrders.toLocaleString(), 
      icon: <HiShoppingBag />,
      change: '+12%',
      trend: 'up',
      color: 'primary' 
    },
    { 
      label: 'Active Orders', 
      value: realTimeStats.activeOrders, 
      icon: <HiClock />,
      change: '+3',
      trend: 'up',
      color: 'warning' 
    },
    { 
      label: 'Delayed Orders', 
      value: realTimeStats.delayedOrders, 
      icon: <HiExclamationCircle />,
      change: '-2',
      trend: 'down',
      color: 'error' 
    },
    { 
      label: 'Total Revenue', 
      value: `₹${(realTimeStats.totalRevenue / 1000).toFixed(0)}K`, 
      icon: <HiCurrencyRupee />,
      change: '+8.5%',
      trend: 'up',
      color: 'success' 
    },
    { 
      label: 'Avg Delivery Time', 
      value: `${realTimeStats.avgDeliveryTime} min`, 
      icon: <HiTruck />,
      change: '-5 min',
      trend: 'down',
      color: 'info' 
    },
    { 
      label: 'Active Vendors', 
      value: realTimeStats.vendorsOnline, 
      icon: <HiUserGroup />,
      change: '+4',
      trend: 'up',
      color: 'primary' 
    }
  ];

  return (
    <div className="order-management">
      <div className="page-header">
        <h1>Super Admin Dashboard - Order Management</h1>
        <p>Real-time monitoring and management of all orders and vendors</p>
        <div className="real-time-indicator">
          <span className="live-dot"></span>
          Live Updates
          <HiRefresh className="refresh-icon" />
        </div>
      </div>

      {/* Real-time Stats Dashboard */}
      <div className="real-time-stats">
        <div className="stats-header">
          <h3><HiChartBar /> Real-time Dashboard</h3>
          <span className="last-updated">Updated just now</span>
        </div>
        <div className="stats-grid">
          {realTimeStatsData.map((stat, index) => (
            <div key={index} className={`stat-card stat-${stat.color}`}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className={`stat-change ${stat.trend}`}>
                  {stat.trend === 'up' ? <HiTrendingUp /> : <HiTrendingDown />}
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          <HiClock /> Active Orders ({activeOrders.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          <HiCheckCircle /> Completed ({completedOrders.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'vendors' ? 'active' : ''}`}
          onClick={() => setActiveTab('vendors')}
        >
          <HiOfficeBuilding /> Vendors ({vendors.length}) {/* Changed icon here */}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'delayed' ? 'active' : ''}`}
          onClick={() => setActiveTab('delayed')}
        >
          <HiExclamationCircle /> Delayed (5)
        </button>
        <button 
          className={`tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
          onClick={() => setActiveTab('cancelled')}
        >
          <HiXCircle /> Cancelled (3)
        </button>
      </div>

      {/* Management Toolbar */}
      <div className="management-toolbar">
        <div className="toolbar-left">
          <SearchBar
            placeholder="Search by Order ID, Customer, Vendor, or Phone..."
            onChange={() => {}}
          />
          <div className="date-filter">
            <input type="date" className="form-input" />
            <span>to</span>
            <input type="date" className="form-input" />
            <button className="btn btn-outline">
              <HiFilter /> Apply
            </button>
          </div>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-outline">
            <HiRefresh /> Refresh
          </button>
          <button className="btn btn-primary">
            <HiUsers /> Manage Users
          </button>
          <button className="btn btn-success">
            + New Vendor
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="card">
        <div className="order-timeline-header">
          <h4>Order Flow Timeline</h4>
          <div className="timeline-stages">
            <div className="stage active">Order Placed</div>
            <div className="stage active">Pharmacy Processing</div>
            <div className="stage">Rider Assigned</div>
            <div className="stage">Out for Delivery</div>
            <div className="stage">Delivered</div>
          </div>
        </div>
        
        <Table
          columns={columns[activeTab] || columns.active}
          data={getCurrentData()}
          emptyMessage={`No ${activeTab} records found`}
        />
      </div>

      {/* High Priority Alerts */}
      <div className="high-risk-alerts card">
        <h3><HiExclamationCircle /> High Priority Alerts</h3>
        <div className="alerts-list">
          <div className="alert-item critical">
            <HiExclamationCircle />
            <div>
              <strong>High-Risk Pregnancy Order - ORD-2024-00126</strong>
              <p>Medications for high-risk pregnancy case. Requires special handling.</p>
            </div>
            <button className="btn btn-sm btn-error">Handle Priority</button>
          </div>
          <div className="alert-item warning">
            <HiClock />
            <div>
              <strong>Order ORD-2024-00119 Delayed by 2+ hours</strong>
              <p>Rider facing traffic issues. Consider reassignment.</p>
            </div>
            <button className="btn btn-sm btn-warning">Reassign Rider</button>
          </div>
        </div>
      </div>

      {/* Quick Vendor Stats */}
      {activeTab === 'vendors' && (
        <div className="vendor-quick-stats card">
          <h3><HiChartBar /> Vendor Performance Summary</h3>
          <div className="vendor-stats-grid">
            {vendors.map(vendor => (
              <div key={vendor.id} className="vendor-stat-card">
                <div className="vendor-stat-header">
                  <h4>{vendor.name}</h4>
                  <span className={`status-badge status-${vendor.status}`}>
                    {vendor.status}
                  </span>
                </div>
                <div className="vendor-stat-body">
                  <div className="stat-row">
                    <span>Total Orders:</span>
                    <strong>{vendor.totalOrders.toLocaleString()}</strong>
                  </div>
                  <div className="stat-row">
                    <span>Completed:</span>
                    <strong>{vendor.completedOrders.toLocaleString()}</strong>
                  </div>
                  <div className="stat-row">
                    <span>Revenue:</span>
                    <strong className="revenue">{vendor.totalRevenue}</strong>
                  </div>
                  <div className="stat-row">
                    <span>Rating:</span>
                    <div className="rating">
                      <HiStar />
                      {vendor.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <Modal
          title={`Order Details - ${selectedOrder.id}`}
          onClose={() => setShowOrderModal(false)}
          size="large"
        >
          <div className="order-details-modal">
            <div className="order-info-grid">
              <div className="info-section">
                <h4><HiUsers /> Customer Information</h4>
                <div className="info-item">
                  <label>Customer Name:</label>
                  <span>{selectedOrder.user}</span>
                </div>
                <div className="info-item">
                  <label>Phone Number:</label>
                  <span>{selectedOrder.phone}</span>
                </div>
                <div className="info-item">
                  <label>Location:</label>
                  <span>{selectedOrder.location}</span>
                </div>
                <div className="info-item">
                  <label>Order Time:</label>
                  <span>{selectedOrder.time}</span>
                </div>
              </div>

              <div className="info-section">
                <h4><HiOfficeBuilding /> Pharmacy Information</h4> {/* Changed icon here */}
                <div className="info-item">
                  <label>Pharmacy:</label>
                  <span>{selectedOrder.pharmacy}</span>
                </div>
                <div className="info-item">
                  <label>Pharmacy ID:</label>
                  <span>{selectedOrder.pharmacyId}</span>
                </div>
                <div className="info-item">
                  <label>Rider:</label>
                  <span>{selectedOrder.rider}</span>
                </div>
                <div className="info-item">
                  <label>Priority:</label>
                  <span className={`priority-badge ${selectedOrder.priority}`}>
                    {selectedOrder.priority.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="info-section">
                <h4><HiCurrencyRupee /> Order Information</h4>
                <div className="info-item">
                  <label>Order ID:</label>
                  <span>{selectedOrder.id}</span>
                </div>
                <div className="info-item">
                  <label>Total Amount:</label>
                  <span className="order-amount">{selectedOrder.amount}</span>
                </div>
                <div className="info-item">
                  <label>Items Count:</label>
                  <span>{selectedOrder.items} items</span>
                </div>
                <div className="info-item">
                  <label>Status:</label>
                  <span className={`status-badge status-${selectedOrder.status}`}>
                    {selectedOrder.stage}
                  </span>
                </div>
              </div>
            </div>

            <div className="order-items-section">
              <h4>Order Items</h4>
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Medicine</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Paracetamol 500mg</td>
                    <td>1 Strip</td>
                    <td>₹25</td>
                    <td>₹25</td>
                  </tr>
                  <tr>
                    <td>Cetirizine 10mg</td>
                    <td>1 Strip</td>
                    <td>₹40</td>
                    <td>₹40</td>
                  </tr>
                  <tr>
                    <td>Vitamin C Tablets</td>
                    <td>1 Bottle</td>
                    <td>₹180</td>
                    <td>₹180</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="order-actions">
              <h4>Admin Actions</h4>
              <div className="action-buttons-group">
                <button className="btn btn-outline">Update Status</button>
                <button className="btn btn-outline">Reassign Rider</button>
                <button className="btn btn-outline">Contact Customer</button>
                <button className="btn btn-error">Cancel Order</button>
                <button className="btn btn-primary">Generate Invoice</button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Vendor Details Modal */}
      {showVendorModal && selectedVendor && (
        <Modal
          title={`Vendor Details - ${selectedVendor.name}`}
          onClose={() => setShowVendorModal(false)}
          size="large"
        >
          <div className="vendor-details-modal">
            <div className="vendor-info-grid">
              <div className="info-section">
                <h4><HiOfficeBuilding /> Pharmacy Details</h4> {/* Changed icon here */}
                <div className="info-item">
                  <label>Vendor ID:</label>
                  <span>{selectedVendor.id}</span>
                </div>
                <div className="info-item">
                  <label>Pharmacy Name:</label>
                  <span>{selectedVendor.name}</span>
                </div>
                <div className="info-item">
                  <label>Owner:</label>
                  <span>{selectedVendor.owner}</span>
                </div>
                <div className="info-item">
                  <label>License Number:</label>
                  <span>{selectedVendor.licenseNumber}</span>
                </div>
              </div>

              <div className="info-section">
                <h4><HiUsers /> Contact Information</h4>
                <div className="info-item">
                  <label>Email:</label>
                  <span>{selectedVendor.email}</span>
                </div>
                <div className="info-item">
                  <label>Phone:</label>
                  <span>{selectedVendor.phone}</span>
                </div>
                <div className="info-item">
                  <label>Address:</label>
                  <span>{selectedVendor.address}</span>
                </div>
                <div className="info-item">
                  <label>Registration Date:</label>
                  <span>{selectedVendor.registrationDate}</span>
                </div>
              </div>

              <div className="info-section">
                <h4><HiChartBar /> Business Statistics</h4>
                <div className="info-item">
                  <label>Commission Rate:</label>
                  <span className="commission-rate">{selectedVendor.commissionRate}</span>
                </div>
                <div className="info-item">
                  <label>Total Revenue:</label>
                  <span className="revenue-amount">{selectedVendor.totalRevenue}</span>
                </div>
                <div className="info-item">
                  <label>Total Orders:</label>
                  <span>{selectedVendor.totalOrders.toLocaleString()}</span>
                </div>
                <div className="info-item">
                  <label>Success Rate:</label>
                  <span className="success-rate">
                    {((selectedVendor.completedOrders / selectedVendor.totalOrders) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="vendor-performance-section">
              <h4>Performance Metrics</h4>
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-label">Order Completion Rate</div>
                  <div className="metric-value">
                    {((selectedVendor.completedOrders / selectedVendor.totalOrders) * 100).toFixed(1)}%
                  </div>
                  <div className="metric-progress">
                    <div 
                      className="progress-bar" 
                      style={{width: `${(selectedVendor.completedOrders / selectedVendor.totalOrders) * 100}%`}}
                    ></div>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Customer Rating</div>
                  <div className="metric-value">
                    <HiStar /> {selectedVendor.rating}/5
                  </div>
                  <div className="metric-progress">
                    <div 
                      className="progress-bar" 
                      style={{width: `${(selectedVendor.rating / 5) * 100}%`}}
                    ></div>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Pending Orders</div>
                  <div className="metric-value">{selectedVendor.pendingOrders}</div>
                  <div className="metric-subtext">Needs attention</div>
                </div>
              </div>
            </div>

            <div className="vendor-actions">
              <h4>Admin Actions</h4>
              <div className="action-buttons-group">
                <button className="btn btn-outline">
                  <HiMail /> Send Email
                </button>
                <button className="btn btn-outline">
                  <HiPhone /> Call Vendor
                </button>
                <button className="btn btn-warning">
                  Update Commission
                </button>
                <button className="btn btn-error">
                  Suspend Account
                </button>
                <button className="btn btn-primary">
                  View All Orders
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrderManagement;