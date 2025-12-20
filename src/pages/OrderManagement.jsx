import React, { useState, useEffect } from 'react';
import {
  HiClipboardList,
  HiClock,
  HiCheckCircle,
  HiXCircle,
  HiExclamation,
  HiTruck,
  HiCurrencyRupee,
  HiStar,
  HiUser,
  HiSearch,
  HiFilter,
  HiRefresh,
  HiEye,
  HiPencil,
  HiTrash,
  HiBell,
  HiChartBar,
  HiCash,
  HiShieldCheck,
  HiLocationMarker,
  HiPhone,
  HiMail,
  HiCalendar,
  HiPlus,
  HiDownload,
  HiPrinter,
  HiExclamationCircle,
  HiTrendingUp,
  HiTrendingDown,
  HiArrowRight,
  HiDotsVertical,
  HiCheck,
  HiBan,
  HiPlay,
  HiPause,
  HiUserGroup,
  HiShoppingBag,
  HiTag,
  HiCreditCard,
  HiDocumentText,
  HiChat,
  HiChatAlt2,
  HiPhoneOutgoing,
  HiMap,
  HiShare,
  HiDuplicate,
  HiLockOpen,
  HiLockClosed,
  HiUserAdd,
  HiUserRemove,
  HiCog
} from 'react-icons/hi';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import './OrderManagement.css';

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Real-time stats
  const [realTimeStats, setRealTimeStats] = useState({
    totalOrders: 1245,
    pendingOrders: 156,
    inTransit: 89,
    deliveredToday: 342,
    cancelledToday: 18,
    avgDeliveryTime: '32 min',
    pendingRefunds: 7,
    criticalAlerts: 3
  });

  // Orders data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2024-7842',
      customer: {
        name: 'Rahul Sharma',
        phone: '+91 9876543210',
        address: 'Koramangala 4th Block, Bangalore'
      },
      vendor: {
        name: 'FreshMart Superstore',
        id: 'VEN-001',
        phone: '+91 9876543222',
        rating: 4.5
      },
      rider: {
        name: 'Amit Kumar',
        id: 'RID-101',
        phone: '+91 9876543333',
        rating: 4.8
      },
      items: [
        { name: 'Organic Apples', quantity: 2, price: 120 },
        { name: 'Milk 1L', quantity: 1, price: 60 },
        { name: 'Whole Wheat Bread', quantity: 1, price: 45 },
        { name: 'Eggs (Dozen)', quantity: 1, price: 90 }
      ],
      totalAmount: 315,
      discount: 15,
      deliveryFee: 30,
      finalAmount: 330,
      status: 'delivered',
      priority: 'normal',
      paymentMethod: 'Credit Card',
      paymentStatus: 'paid',
      orderDate: '2024-01-23 14:30',
      deliveryDate: '2024-01-23 16:45',
      estimatedDelivery: '30-40 min',
      actualDeliveryTime: '35 min',
      notes: 'Leave at door if not home',
      tracking: [
        { time: '14:30', status: 'Order Placed', description: 'Order confirmed by vendor' },
        { time: '14:45', status: 'Preparing', description: 'Vendor is preparing your order' },
        { time: '15:15', status: 'Ready for Pickup', description: 'Order is ready for rider pickup' },
        { time: '15:30', status: 'Picked Up', description: 'Rider picked up the order' },
        { time: '16:15', status: 'On the Way', description: 'Rider is on the way to deliver' },
        { time: '16:45', status: 'Delivered', description: 'Order delivered successfully' }
      ],
      issues: [],
      commission: 15.75,
      vendorEarnings: 299.25
    },
    {
      id: 'ORD-2024-7841',
      customer: {
        name: 'Priya Patel',
        phone: '+91 9876543211',
        address: 'Indiranagar, Bangalore'
      },
      vendor: {
        name: 'Foodie Delights',
        id: 'VEN-002',
        phone: '+91 9876543223',
        rating: 4.2
      },
      rider: {
        name: 'Rajesh Verma',
        id: 'RID-102',
        phone: '+91 9876543334',
        rating: 4.6
      },
      items: [
        { name: 'Chicken Biryani', quantity: 2, price: 240 },
        { name: 'Butter Naan', quantity: 4, price: 80 },
        { name: 'Raita', quantity: 1, price: 40 }
      ],
      totalAmount: 360,
      discount: 0,
      deliveryFee: 25,
      finalAmount: 385,
      status: 'in_transit',
      priority: 'high',
      paymentMethod: 'UPI',
      paymentStatus: 'paid',
      orderDate: '2024-01-23 15:00',
      deliveryDate: null,
      estimatedDelivery: '40-50 min',
      actualDeliveryTime: null,
      notes: 'Call before delivery',
      tracking: [
        { time: '15:00', status: 'Order Placed', description: 'Order confirmed by vendor' },
        { time: '15:15', status: 'Preparing', description: 'Vendor is preparing your order' },
        { time: '15:45', status: 'Ready for Pickup', description: 'Order is ready for rider pickup' },
        { time: '16:00', status: 'Picked Up', description: 'Rider picked up the order' },
        { time: '16:20', status: 'On the Way', description: 'Rider is on the way to deliver' }
      ],
      issues: [],
      commission: 19.25,
      vendorEarnings: 365.75
    },
    {
      id: 'ORD-2024-7840',
      customer: {
        name: 'Arjun Singh',
        phone: '+91 9876543212',
        address: 'Whitefield, Bangalore'
      },
      vendor: {
        name: 'MediQuick Pharmacy',
        id: 'VEN-003',
        phone: '+91 9876543224',
        rating: 4.7
      },
      rider: {
        name: 'Suresh Reddy',
        id: 'RID-103',
        phone: '+91 9876543335',
        rating: 4.9
      },
      items: [
        { name: 'Paracetamol 500mg', quantity: 1, price: 25 },
        { name: 'Vitamin C Tablets', quantity: 1, price: 150 },
        { name: 'Hand Sanitizer', quantity: 1, price: 99 }
      ],
      totalAmount: 274,
      discount: 10,
      deliveryFee: 40,
      finalAmount: 304,
      status: 'pending',
      priority: 'critical',
      paymentMethod: 'Cash on Delivery',
      paymentStatus: 'pending',
      orderDate: '2024-01-23 16:00',
      deliveryDate: null,
      estimatedDelivery: '20-30 min',
      actualDeliveryTime: null,
      notes: 'Urgent medication delivery',
      tracking: [
        { time: '16:00', status: 'Order Placed', description: 'Order confirmed by vendor' },
        { time: '16:05', status: 'Preparing', description: 'Vendor is preparing your order' }
      ],
      issues: ['Vendor is out of stock for Vitamin C'],
      commission: 15.2,
      vendorEarnings: 288.8
    },
    {
      id: 'ORD-2024-7839',
      customer: {
        name: 'Neha Gupta',
        phone: '+91 9876543213',
        address: 'Jayanagar, Bangalore'
      },
      vendor: {
        name: 'ElectroHub',
        id: 'VEN-004',
        phone: '+91 9876543225',
        rating: 4.3
      },
      rider: {
        name: 'Anil Verma',
        id: 'RID-104',
        phone: '+91 9876543336',
        rating: 4.4
      },
      items: [
        { name: 'Bluetooth Headphones', quantity: 1, price: 1499 },
        { name: 'Phone Case', quantity: 1, price: 299 }
      ],
      totalAmount: 1798,
      discount: 100,
      deliveryFee: 50,
      finalAmount: 1748,
      status: 'cancelled',
      priority: 'normal',
      paymentMethod: 'Credit Card',
      paymentStatus: 'refunded',
      orderDate: '2024-01-23 13:00',
      deliveryDate: null,
      estimatedDelivery: '60-90 min',
      actualDeliveryTime: null,
      notes: 'Fragile item',
      tracking: [
        { time: '13:00', status: 'Order Placed', description: 'Order confirmed by vendor' },
        { time: '13:30', status: 'Preparing', description: 'Vendor is preparing your order' },
        { time: '14:00', status: 'Cancelled', description: 'Order cancelled by customer' }
      ],
      issues: ['Customer changed mind'],
      commission: 0,
      vendorEarnings: 0
    },
    {
      id: 'ORD-2024-7838',
      customer: {
        name: 'Sanjay Kumar',
        phone: '+91 9876543214',
        address: 'BTM Layout, Bangalore'
      },
      vendor: {
        name: 'BookWorm Store',
        id: 'VEN-005',
        phone: '+91 9876543226',
        rating: 4.6
      },
      rider: {
        name: 'Vikram Singh',
        id: 'RID-105',
        phone: '+91 9876543337',
        rating: 4.7
      },
      items: [
        { name: 'React Programming Guide', quantity: 1, price: 450 },
        { name: 'JavaScript Essentials', quantity: 1, price: 350 },
        { name: 'Web Development', quantity: 1, price: 550 }
      ],
      totalAmount: 1350,
      discount: 150,
      deliveryFee: 30,
      finalAmount: 1230,
      status: 'delivered',
      priority: 'normal',
      paymentMethod: 'UPI',
      paymentStatus: 'paid',
      orderDate: '2024-01-23 12:00',
      deliveryDate: '2024-01-23 13:15',
      estimatedDelivery: '60-75 min',
      actualDeliveryTime: '75 min',
      notes: 'Deliver to reception',
      tracking: [
        { time: '12:00', status: 'Order Placed', description: 'Order confirmed by vendor' },
        { time: '12:15', status: 'Preparing', description: 'Vendor is preparing your order' },
        { time: '12:45', status: 'Ready for Pickup', description: 'Order is ready for rider pickup' },
        { time: '13:00', status: 'Picked Up', description: 'Rider picked up the order' },
        { time: '13:15', status: 'Delivered', description: 'Order delivered successfully' }
      ],
      issues: [],
      commission: 61.5,
      vendorEarnings: 1168.5
    }
  ]);

  // High priority alerts
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Critical Order Delayed',
      description: 'ORD-2024-7840 - Medication delivery delayed by 45 minutes',
      orderId: 'ORD-2024-7840',
      time: '10 minutes ago'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Payment Issue',
      description: 'ORD-2024-7841 - Payment verification pending for ₹385',
      orderId: 'ORD-2024-7841',
      time: '25 minutes ago'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Rider Running Late',
      description: 'Rider Rajesh Verma is 20 minutes behind schedule',
      orderId: 'ORD-2024-7841',
      time: '35 minutes ago'
    }
  ]);

  // Vendor quick stats
  const [vendorStats, setVendorStats] = useState([
    {
      id: 'VEN-001',
      name: 'FreshMart Superstore',
      ordersToday: 45,
      avgRating: 4.5,
      successRate: '98%',
      commission: '₹6,450',
      revenue: '₹42,150'
    },
    {
      id: 'VEN-002',
      name: 'Foodie Delights',
      ordersToday: 32,
      avgRating: 4.2,
      successRate: '95%',
      commission: '₹4,850',
      revenue: '₹31,250'
    },
    {
      id: 'VEN-003',
      name: 'MediQuick Pharmacy',
      ordersToday: 28,
      avgRating: 4.7,
      successRate: '99%',
      commission: '₹3,980',
      revenue: '₹26,520'
    }
  ]);

  // Users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'Super Admin',
      permissions: 'Full Access',
      status: 'active',
      lastActive: '2024-01-23 16:45'
    },
    {
      id: 2,
      name: 'Support Manager',
      email: 'support@example.com',
      role: 'Support',
      permissions: 'Order Management, Customer Support',
      status: 'active',
      lastActive: '2024-01-23 15:30'
    },
    {
      id: 3,
      name: 'Finance Manager',
      email: 'finance@example.com',
      role: 'Finance',
      permissions: 'Payment Processing, Refunds',
      status: 'active',
      lastActive: '2024-01-23 14:15'
    }
  ]);

  // Modal Handlers
  const openModal = (type, data = null) => {
    setModalType(type);
    setModalData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setModalData(null);
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 5000);
  };

  // Refresh data
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
      showNotification('Data refreshed successfully', 'success');
    }, 1500);
  };

  // Action Handlers
  const handleViewDetails = (order) => {
    openModal('orderDetails', order);
  };

  const handleEditOrder = (order) => {
    openModal('editOrder', order);
  };

  const handleCancelOrder = (order) => {
    openModal('cancelOrder', order);
  };

  const handleRefundOrder = (order) => {
    openModal('refundOrder', order);
  };

  const handleAssignRider = (order) => {
    openModal('assignRider', order);
  };

  const handleContactCustomer = (order) => {
    openModal('contactCustomer', order);
  };

  const handleContactVendor = (order) => {
    openModal('contactVendor', order);
  };

  const handleContactRider = (order) => {
    openModal('contactRider', order);
  };

  const handleViewVendor = (vendor) => {
    openModal('vendorDetails', vendor);
  };

  const handleManageUsers = () => {
    openModal('usersManagement');
  };

  const handleAddVendor = () => {
    openModal('addVendor');
  };

  const handleExportOrders = () => {
    openModal('exportOrders');
  };

  const handlePrintOrders = () => {
    window.print();
    showNotification('Printing started', 'info');
  };

  const handleMarkResolved = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
    showNotification('Alert marked as resolved', 'success');
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    showNotification(`Order ${orderId} status updated to ${newStatus}`, 'success');
  };

  const handleUpdatePriority = (orderId, newPriority) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, priority: newPriority } : order
    ));
    showNotification(`Order ${orderId} priority updated to ${newPriority}`, 'success');
  };

  // Filter orders based on search and filters
  const getFilteredOrders = () => {
    let filtered = orders;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.phone.includes(searchTerm) ||
        order.vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === selectedStatus);
    }

    // Filter by priority
    if (selectedPriority !== 'all') {
      filtered = filtered.filter(order => order.priority === selectedPriority);
    }

    // Filter by date range
    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.orderDate);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        endDate.setHours(23, 59, 59, 999);
        return orderDate >= startDate && orderDate <= endDate;
      });
    }

    return filtered;
  };

  // Table columns
  const columns = [
    { 
      key: 'id', 
      label: 'Order ID',
      render: (id) => (
        <span className="font-semibold text-primary">{id}</span>
      )
    },
    { 
      key: 'customer.name', 
      label: 'Customer',
      render: (_, order) => (
        <div>
          <div className="font-medium text-dark">{order.customer.name}</div>
          <div className="text-xs text-soft">{order.customer.phone}</div>
        </div>
      )
    },
    { 
      key: 'vendor.name', 
      label: 'Vendor',
      render: (_, order) => (
        <div>
          <div className="font-medium text-dark">{order.vendor.name}</div>
          <div className="flex items-center gap-1 text-xs">
            <HiStar className="text-warning" />
            <span className="text-soft">{order.vendor.rating}</span>
          </div>
        </div>
      )
    },
    { 
      key: 'rider.name', 
      label: 'Rider',
      render: (_, order) => order.rider ? (
        <div>
          <div className="font-medium text-dark">{order.rider.name}</div>
          <div className="flex items-center gap-1 text-xs">
            <HiStar className="text-warning" />
            <span className="text-soft">{order.rider.rating}</span>
          </div>
        </div>
      ) : (
        <span className="text-soft text-sm">Unassigned</span>
      )
    },
    { 
      key: 'finalAmount', 
      label: 'Amount',
      render: (amount) => (
        <div className="font-semibold text-success">₹{amount}</div>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (status) => {
        const statusConfig = {
          pending: { label: 'Pending', color: 'warning', bg: 'bg-warning/10', text: 'text-warning' },
          in_transit: { label: 'In Transit', color: 'info', bg: 'bg-info/10', text: 'text-info' },
          delivered: { label: 'Delivered', color: 'success', bg: 'bg-success/10', text: 'text-success' },
          cancelled: { label: 'Cancelled', color: 'error', bg: 'bg-error/10', text: 'text-error' }
        };
        const config = statusConfig[status] || { label: status, color: 'soft', bg: 'bg-gray-100', text: 'text-soft' };
        return (
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
            {status === 'delivered' && <HiCheckCircle className="w-3 h-3" />}
            {status === 'in_transit' && <HiTruck className="w-3 h-3" />}
            {status === 'pending' && <HiClock className="w-3 h-3" />}
            {status === 'cancelled' && <HiXCircle className="w-3 h-3" />}
            {config.label}
          </span>
        );
      }
    },
    { 
      key: 'priority', 
      label: 'Priority',
      render: (priority) => {
        const priorityConfig = {
          normal: { label: 'Normal', color: 'info', bg: 'bg-info/10', text: 'text-info' },
          high: { label: 'High', color: 'warning', bg: 'bg-warning/10', text: 'text-warning' },
          critical: { label: 'Critical', color: 'error', bg: 'bg-error/10', text: 'text-error' }
        };
        const config = priorityConfig[priority] || { label: priority, color: 'soft', bg: 'bg-gray-100', text: 'text-soft' };
        return (
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
            {priority === 'critical' && <HiExclamationCircle className="w-3 h-3" />}
            {config.label}
          </span>
        );
      }
    },
    { 
      key: 'orderDate', 
      label: 'Order Time',
      render: (date) => (
        <div>
          <div className="font-medium text-dark">{new Date(date).toLocaleDateString()}</div>
          <div className="text-xs text-soft">{new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, order) => (
        <div className="flex items-center gap-2">
          <button 
            className="btn-icon"
            onClick={() => handleViewDetails(order)}
            title="View Details"
          >
            <HiEye />
          </button>
          {order.status === 'pending' && (
            <>
              <button 
                className="btn-icon"
                onClick={() => handleAssignRider(order)}
                title="Assign Rider"
              >
                <HiUserAdd />
              </button>
              <button 
                className="btn-icon"
                onClick={() => handleUpdateOrderStatus(order.id, 'in_transit')}
                title="Mark as In Transit"
              >
                <HiTruck />
              </button>
            </>
          )}
          {order.status === 'in_transit' && (
            <button 
              className="btn-icon"
              onClick={() => handleUpdateOrderStatus(order.id, 'delivered')}
              title="Mark as Delivered"
            >
              <HiCheckCircle />
            </button>
          )}
          {(order.status === 'pending' || order.status === 'in_transit') && (
            <button 
              className="btn-icon"
              onClick={() => handleCancelOrder(order)}
              title="Cancel Order"
            >
              <HiXCircle />
            </button>
          )}
          <button 
            className="btn-icon"
            onClick={() => handleContactCustomer(order)}
            title="Contact Customer"
          >
            <HiPhone />
          </button>
        </div>
      )
    }
  ];

  // Stats Card Component
  const StatCard = ({ icon: Icon, title, value, change, color, iconColor }) => (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-icon">
        <Icon style={{ color: iconColor }} />
      </div>
      <div className="stat-content">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{title}</div>
        {change && (
          <span className={`stat-change ${change > 0 ? 'up' : 'down'}`}>
            {change > 0 ? <HiTrendingUp /> : <HiTrendingDown />}
            {Math.abs(change)}%
          </span>
        )}
      </div>
    </div>
  );

  // Alert Item Component
  const AlertItem = ({ alert }) => (
    <div className={`alert-item ${alert.type}`}>
      {alert.type === 'critical' ? <HiExclamationCircle /> : <HiExclamation />}
      <div>
        <strong>{alert.title}</strong>
        <p>{alert.description}</p>
      </div>
      <button 
        className="btn btn-sm btn-outline ml-auto"
        onClick={() => handleMarkResolved(alert.id)}
      >
        Mark Resolved
      </button>
    </div>
  );

  // Vendor Stat Card Component
  const VendorStatCard = ({ vendor }) => (
    <div className="vendor-stat-card">
      <div className="vendor-stat-header">
        <h4>{vendor.name}</h4>
        <span className="text-xs text-soft">{vendor.id}</span>
      </div>
      <div className="vendor-stat-body">
        <div className="stat-row">
          <span>Orders Today:</span>
          <strong>{vendor.ordersToday}</strong>
        </div>
        <div className="stat-row">
          <span>Avg Rating:</span>
          <div className="rating">
            <HiStar />
            <span>{vendor.avgRating}</span>
          </div>
        </div>
        <div className="stat-row">
          <span>Success Rate:</span>
          <span className="success-rate">{vendor.successRate}</span>
        </div>
        <div className="stat-row">
          <span>Commission:</span>
          <strong className="revenue">{vendor.commission}</strong>
        </div>
        <div className="stat-row">
          <span>Revenue:</span>
          <strong className="revenue">{vendor.revenue}</strong>
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <button 
          className="btn btn-sm btn-outline"
          onClick={() => handleViewVendor(vendor)}
        >
          View Details
        </button>
      </div>
    </div>
  );

  // User Card Component
  const UserCard = ({ user }) => (
    <div className="user-card">
      <div className="user-info">
        <div className="user-icon">
          <HiUser />
        </div>
        <div className="flex-1">
          <div className="user-name">{user.name}</div>
          <div className="user-email">{user.email}</div>
          <div className="user-permissions">{user.permissions}</div>
        </div>
      </div>
      <div className="user-details">
        <span className="user-role">{user.role}</span>
        <span className={`user-status ${user.status}`}>{user.status}</span>
        <span className="user-last-active">Last active: {new Date(user.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div className="user-actions">
        <button className="btn-icon" title="Edit User">
          <HiPencil />
        </button>
        <button className="btn-icon" title="Reset Password">
          <HiLockOpen />
        </button>
        <button className="btn-icon" title="Deactivate User">
          <HiUserRemove />
        </button>
      </div>
    </div>
  );

  // Modal Content Renderer
  const renderModalContent = () => {
    switch (modalType) {
      case 'orderDetails':
        return (
          <div className="order-details-modal">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HiClipboardList /> Order Details - {modalData?.id}
            </h3>
            
            <div className="order-info-grid">
              <div className="info-section">
                <h4><HiUser /> Customer Information</h4>
                <div className="info-item">
                  <label>Name:</label>
                  <span>{modalData?.customer.name}</span>
                </div>
                <div className="info-item">
                  <label>Phone:</label>
                  <span>{modalData?.customer.phone}</span>
                </div>
                <div className="info-item">
                  <label>Address:</label>
                  <span>{modalData?.customer.address}</span>
                </div>
                <div className="info-item">
                  <label>Notes:</label>
                  <span>{modalData?.notes || 'No notes'}</span>
                </div>
              </div>

              <div className="info-section">
                <h4><HiShoppingBag /> Vendor Information</h4>
                <div className="info-item">
                  <label>Name:</label>
                  <span>{modalData?.vendor.name}</span>
                </div>
                <div className="info-item">
                  <label>Rating:</label>
                  <span className="rating">
                    <HiStar /> {modalData?.vendor.rating}
                  </span>
                </div>
                <div className="info-item">
                  <label>Phone:</label>
                  <span>{modalData?.vendor.phone}</span>
                </div>
                <div className="info-item">
                  <label>ID:</label>
                  <span>{modalData?.vendor.id}</span>
                </div>
              </div>

              <div className="info-section">
                <h4><HiTruck /> Rider Information</h4>
                <div className="info-item">
                  <label>Name:</label>
                  <span>{modalData?.rider?.name || 'Not assigned'}</span>
                </div>
                <div className="info-item">
                  <label>Rating:</label>
                  <span className="rating">
                    <HiStar /> {modalData?.rider?.rating || 'N/A'}
                  </span>
                </div>
                <div className="info-item">
                  <label>Phone:</label>
                  <span>{modalData?.rider?.phone || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <label>ID:</label>
                  <span>{modalData?.rider?.id || 'N/A'}</span>
                </div>
              </div>

              <div className="info-section">
                <h4><HiCreditCard /> Order Information</h4>
                <div className="info-item">
                  <label>Status:</label>
                  <span className={`status-badge status-${modalData?.status}`}>
                    {modalData?.status}
                  </span>
                </div>
                <div className="info-item">
                  <label>Priority:</label>
                  <span className={`priority-badge ${modalData?.priority}`}>
                    {modalData?.priority}
                  </span>
                </div>
                <div className="info-item">
                  <label>Payment:</label>
                  <span>{modalData?.paymentMethod} ({modalData?.paymentStatus})</span>
                </div>
                <div className="info-item">
                  <label>Order Time:</label>
                  <span>{new Date(modalData?.orderDate).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="order-items-section">
              <h4>Order Items</h4>
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {modalData?.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.price}</td>
                      <td>₹{item.quantity * item.price}</td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td colSpan="3" className="text-right">Subtotal:</td>
                    <td>₹{modalData?.totalAmount}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="text-right">Discount:</td>
                    <td className="text-success">-₹{modalData?.discount}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="text-right">Delivery Fee:</td>
                    <td>₹{modalData?.deliveryFee}</td>
                  </tr>
                  <tr className="total-row">
                    <td colSpan="3" className="text-right font-bold">Total Amount:</td>
                    <td className="font-bold text-success">₹{modalData?.finalAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="form-actions">
              <button className="btn btn-outline" onClick={closeModal}>Close</button>
              <button className="btn btn-primary" onClick={() => handleContactCustomer(modalData)}>
                <HiPhone /> Contact Customer
              </button>
            </div>
          </div>
        );

      case 'vendorDetails':
        return (
          <div className="vendor-details-modal">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HiShoppingBag /> Vendor Details - {modalData?.name}
            </h3>
            
            <div className="vendor-info-grid">
              <div className="info-section">
                <h4>Basic Information</h4>
                <div className="info-item">
                  <label>Vendor Name:</label>
                  <span>{modalData?.name}</span>
                </div>
                <div className="info-item">
                  <label>Vendor ID:</label>
                  <span>{modalData?.id}</span>
                </div>
                <div className="info-item">
                  <label>Phone:</label>
                  <span>+91 9876543222</span>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <span>contact@{modalData?.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
                <div className="info-item">
                  <label>Category:</label>
                  <span>Supermarket</span>
                </div>
              </div>

              <div className="info-section">
                <h4>Performance Metrics</h4>
                <div className="info-item">
                  <label>Total Orders:</label>
                  <span>1,245</span>
                </div>
                <div className="info-item">
                  <label>Success Rate:</label>
                  <span className="success-rate">{modalData?.successRate || '98%'}</span>
                </div>
                <div className="info-item">
                  <label>Avg Rating:</label>
                  <span className="rating">
                    <HiStar /> {modalData?.avgRating}
                  </span>
                </div>
                <div className="info-item">
                  <label>Avg Preparation Time:</label>
                  <span>22 minutes</span>
                </div>
                <div className="info-item">
                  <label>Commission Rate:</label>
                  <span className="commission-rate">5%</span>
                </div>
              </div>
            </div>

            <div className="vendor-performance-section">
              <h4>Detailed Performance</h4>
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-label">Orders Today</div>
                  <div className="metric-value">{modalData?.ordersToday}</div>
                  <div className="metric-progress">
                    <div className="progress-bar" style={{ width: '85%' }}></div>
                  </div>
                  <div className="metric-subtext">+12% from yesterday</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Total Revenue</div>
                  <div className="metric-value">{modalData?.revenue}</div>
                  <div className="metric-progress">
                    <div className="progress-bar" style={{ width: '78%' }}></div>
                  </div>
                  <div className="metric-subtext">+8% from yesterday</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Commission Earned</div>
                  <div className="metric-value">{modalData?.commission}</div>
                  <div className="metric-progress">
                    <div className="progress-bar" style={{ width: '92%' }}></div>
                  </div>
                  <div className="metric-subtext">+15% from yesterday</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Customer Rating</div>
                  <div className="metric-value">
                    <div className="vendor-rating">
                      <HiStar className="star-icon" />
                      <span>{modalData?.avgRating}</span>
                    </div>
                  </div>
                  <div className="metric-progress">
                    <div className="progress-bar" style={{ width: '90%' }}></div>
                  </div>
                  <div className="metric-subtext">Based on 1,245 reviews</div>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn btn-outline" onClick={closeModal}>Close</button>
              <button className="btn btn-primary" onClick={() => handleContactVendor(modalData)}>
                <HiPhone /> Contact Vendor
              </button>
            </div>
          </div>
        );

      case 'usersManagement':
        return (
          <div className="users-management-modal">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HiUserGroup /> Users Management
            </h3>
            
            <div className="users-list-section">
              <h4>Current Users</h4>
              <div className="users-list">
                {users.map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </div>

            <div className="add-user-section">
              <h4>Add New User</h4>
              <form className="user-form" onSubmit={(e) => {
                e.preventDefault();
                showNotification('User added successfully', 'success');
                closeModal();
              }}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" className="form-input" placeholder="Enter full name" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-input" placeholder="Enter email address" required />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <select className="form-input" required>
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="support">Support</option>
                      <option value="finance">Finance</option>
                      <option value="operations">Operations</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Permissions</label>
                    <select className="form-input" required>
                      <option value="">Select Permissions</option>
                      <option value="full">Full Access</option>
                      <option value="orders">Order Management Only</option>
                      <option value="finance">Finance Only</option>
                      <option value="support">Customer Support Only</option>
                    </select>
                  </div>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn btn-primary">
                    <HiUserAdd /> Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      case 'addVendor':
        return (
          <div className="new-vendor-modal">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HiPlus /> Add New Vendor
            </h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              showNotification('Vendor added successfully', 'success');
              closeModal();
            }}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Vendor Name</label>
                  <input type="text" className="form-input" placeholder="Enter vendor name" required />
                </div>
                <div className="form-group">
                  <label>Contact Person</label>
                  <input type="text" className="form-input" placeholder="Enter contact person name" required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" className="form-input" placeholder="Enter phone number" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-input" placeholder="Enter email address" required />
                </div>
                <div className="form-group">
                  <label>Business Type</label>
                  <select className="form-input" required>
                    <option value="">Select Business Type</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="grocery">Grocery Store</option>
                    <option value="pharmacy">Pharmacy</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Commission Rate (%)</label>
                  <input type="number" className="form-input" placeholder="Enter commission rate" min="1" max="30" step="0.5" required />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea className="form-input" placeholder="Enter business address" rows="3" required></textarea>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-input" placeholder="Enter business description" rows="3"></textarea>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  <HiPlus /> Add Vendor
                </button>
              </div>
            </form>
          </div>
        );

      case 'exportOrders':
        return (
          <div className="modal-export">
            <h3 className="text-xl font-bold mb-4">Export Orders</h3>
            
            <div className="export-options">
              <label>Export Format:</label>
              <div className="format-buttons">
                <button className="btn btn-outline active">CSV</button>
                <button className="btn btn-outline">Excel</button>
                <button className="btn btn-outline">PDF</button>
              </div>
              
              <label>Date Range:</label>
              <div className="date-range">
                <input 
                  type="date" 
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  className="date-input"
                />
                <span>to</span>
                <input 
                  type="date" 
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="date-input"
                />
              </div>
              
              <label>Include Data:</label>
              <div className="include-options">
                <label>
                  <input type="checkbox" defaultChecked /> Order Details
                </label>
                <label>
                  <input type="checkbox" defaultChecked /> Customer Information
                </label>
                <label>
                  <input type="checkbox" defaultChecked /> Vendor Information
                </label>
                <label>
                  <input type="checkbox" defaultChecked /> Payment Details
                </label>
                <label>
                  <input type="checkbox" /> Analytics
                </label>
                <label>
                  <input type="checkbox" /> Performance Metrics
                </label>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" onClick={() => {
                showNotification('Orders exported successfully', 'success');
                closeModal();
              }}>
                <HiDownload /> Export Orders
              </button>
            </div>
          </div>
        );

      case 'contactCustomer':
        return (
          <div className="modal-call">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HiPhoneOutgoing /> Contact Customer
            </h3>
            
            <div className="call-simulator">
              <div className="call-screen">
                <div className="caller-info">
                  <HiUser />
                  <span>{modalData?.customer.name}</span>
                </div>
                <p className="text-center text-soft mb-4">Calling customer at:</p>
                <p className="phone-number">{modalData?.customer.phone}</p>
                <p className="call-status text-center text-soft">Ringing...</p>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button className="btn btn-success" onClick={() => {
                showNotification(`Calling ${modalData?.customer.phone}`, 'success');
                closeModal();
              }}>
                <HiPhone /> Start Call
              </button>
            </div>
          </div>
        );

      case 'contactVendor':
        return (
          <div className="modal-call">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HiPhoneOutgoing /> Contact Vendor
            </h3>
            
            <div className="call-simulator">
              <div className="call-screen">
                <div className="caller-info">
                  <HiShoppingBag />
                  <span>{modalData?.name}</span>
                </div>
                <p className="text-center text-soft mb-4">Calling vendor at:</p>
                <p className="phone-number">+91 9876543222</p>
                <p className="call-status text-center text-soft">Ringing...</p>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button className="btn btn-success" onClick={() => {
                showNotification(`Calling vendor ${modalData?.name}`, 'success');
                closeModal();
              }}>
                <HiPhone /> Start Call
              </button>
            </div>
          </div>
        );

      case 'contactRider':
        return (
          <div className="modal-call">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HiPhoneOutgoing /> Contact Rider
            </h3>
            
            <div className="call-simulator">
              <div className="call-screen">
                <div className="caller-info">
                  <HiTruck />
                  <span>{modalData?.rider?.name}</span>
                </div>
                <p className="text-center text-soft mb-4">Calling rider at:</p>
                <p className="phone-number">{modalData?.rider?.phone}</p>
                <p className="call-status text-center text-soft">Ringing...</p>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button className="btn btn-success" onClick={() => {
                showNotification(`Calling rider ${modalData?.rider?.name}`, 'success');
                closeModal();
              }}>
                <HiPhone /> Start Call
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Get modal title
  const getModalTitle = (type) => {
    const titles = {
      orderDetails: 'Order Details',
      vendorDetails: 'Vendor Details',
      usersManagement: 'Users Management',
      addVendor: 'Add New Vendor',
      exportOrders: 'Export Orders',
      contactCustomer: 'Contact Customer',
      contactVendor: 'Contact Vendor',
      contactRider: 'Contact Rider'
    };
    return titles[type] || 'Modal';
  };

  // Get modal size
  const getModalSize = (type) => {
    if (['orderDetails', 'vendorDetails', 'usersManagement', 'addVendor'].includes(type)) {
      return 'extra-large';
    }
    return 'large';
  };

  return (
    <div className="order-management">
      {/* Page Header with Top Right Action Buttons */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Order Management System</h1>
            <p>Monitor and manage all orders in real-time. Track deliveries, handle issues, and analyze performance.</p>
            <div className="real-time-indicator">
              <span className="live-dot"></span>
              <span>Live Updates</span>
              <HiRefresh 
                className={`refresh-icon ${isRefreshing ? 'animate-spin' : ''}`}
                onClick={handleRefresh}
              />
            </div>
          </div>
          <div className="header-actions-row">
            <button className="btn btn-outline" onClick={handleAddVendor}>
              <HiPlus /> Add New Vendor
            </button>
            <button className="btn btn-outline" onClick={handleManageUsers}>
              <HiUserGroup /> Manage Users
            </button>
            <button className="btn btn-primary" onClick={handleExportOrders}>
              <HiDownload /> Export Data
            </button>
            <button className="btn btn-success" onClick={handlePrintOrders}>
              <HiPrinter /> Print Report
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="real-time-stats">
        <div className="stats-header">
          <h3><HiChartBar /> Real-time Order Statistics</h3>
          <span className="last-updated">
            Last updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="stats-grid">
          <StatCard 
            icon={HiClipboardList}
            title="Total Orders"
            value={realTimeStats.totalOrders}
            change={8.2}
            color="primary"
            iconColor="#3b82f6"
          />
          <StatCard 
            icon={HiClock}
            title="Pending Orders"
            value={realTimeStats.pendingOrders}
            change={-3.5}
            color="warning"
            iconColor="#f59e0b"
          />
          <StatCard 
            icon={HiTruck}
            title="In Transit"
            value={realTimeStats.inTransit}
            change={12.8}
            color="info"
            iconColor="#06b6d4"
          />
          <StatCard 
            icon={HiCheckCircle}
            title="Delivered Today"
            value={realTimeStats.deliveredToday}
            change={15.3}
            color="success"
            iconColor="#10b981"
          />
          <StatCard 
            icon={HiXCircle}
            title="Cancelled Today"
            value={realTimeStats.cancelledToday}
            change={-5.2}
            color="error"
            iconColor="#ef4444"
          />
          <StatCard 
            icon={HiClock}
            title="Avg Delivery Time"
            value={realTimeStats.avgDeliveryTime}
            change={-8.5}
            color="info"
            iconColor="#06b6d4"
          />
          <StatCard 
            icon={HiCurrencyRupee}
            title="Pending Refunds"
            value={realTimeStats.pendingRefunds}
            change={2.1}
            color="warning"
            iconColor="#f59e0b"
          />
          <StatCard 
            icon={HiExclamationCircle}
            title="Critical Alerts"
            value={realTimeStats.criticalAlerts}
            change={-25.0}
            color="error"
            iconColor="#ef4444"
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <HiClipboardList /> All Orders ({orders.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => { setActiveTab('pending'); setSelectedStatus('pending'); }}
        >
          <HiClock /> Pending ({orders.filter(o => o.status === 'pending').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'in_transit' ? 'active' : ''}`}
          onClick={() => { setActiveTab('in_transit'); setSelectedStatus('in_transit'); }}
        >
          <HiTruck /> In Transit ({orders.filter(o => o.status === 'in_transit').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'delivered' ? 'active' : ''}`}
          onClick={() => { setActiveTab('delivered'); setSelectedStatus('delivered'); }}
        >
          <HiCheckCircle /> Delivered ({orders.filter(o => o.status === 'delivered').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
          onClick={() => { setActiveTab('cancelled'); setSelectedStatus('cancelled'); }}
        >
          <HiXCircle /> Cancelled ({orders.filter(o => o.status === 'cancelled').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'critical' ? 'active' : ''}`}
          onClick={() => { setActiveTab('critical'); setSelectedPriority('critical'); }}
        >
          <HiExclamationCircle /> Critical ({orders.filter(o => o.priority === 'critical').length})
        </button>
      </div>

      {/* Management Toolbar */}
      <div className="management-toolbar">
        <div className="toolbar-left">
          <div className="search-container">
            <div className="search-bar-container">
              <input
                type="text"
                className="search-bar"
                placeholder="Search orders by ID, customer, or vendor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-count">
                {getFilteredOrders().length} orders
              </span>
            </div>
          </div>
          
          <div className="date-filter">
            <span>Filter by date:</span>
            <input 
              type="date" 
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              placeholder="Start Date"
            />
            <span>to</span>
            <input 
              type="date" 
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              placeholder="End Date"
            />
          </div>
        </div>
        
        <div className="toolbar-right">
          <select 
            className="form-input"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <select 
            className="form-input"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            <option value="all">All Priority</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          
          <button className="btn btn-outline">
            <HiFilter /> Filter
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="card">
        <div className="order-timeline-header">
          <h4>Order Status Timeline</h4>
          <div className="timeline-stages">
            <span className="stage active">Order Placed</span>
            <span className={`stage ${getFilteredOrders().some(o => ['preparing', 'in_transit', 'delivered'].includes(o.status)) ? 'active' : ''}`}>
              Preparing
            </span>
            <span className={`stage ${getFilteredOrders().some(o => ['in_transit', 'delivered'].includes(o.status)) ? 'active' : ''}`}>
              In Transit
            </span>
            <span className={`stage ${getFilteredOrders().some(o => o.status === 'delivered') ? 'active' : ''}`}>
              Delivered
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <Table
            columns={columns}
            data={getFilteredOrders()}
            emptyMessage={
              <div className="table-empty-state">
                <HiClipboardList />
                <h4>No orders found</h4>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            }
          />
        </div>
      </div>

      {/* High Priority Alerts */}
      <div className="card high-risk-alerts">
        <h3><HiExclamationCircle /> High Priority Alerts</h3>
        {alerts.length > 0 ? (
          <div className="alerts-list">
            {alerts.map(alert => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <HiCheckCircle />
            <h4>No active alerts</h4>
            <p>All systems are operating normally</p>
          </div>
        )}
      </div>

      {/* Vendor Quick Stats */}
      <div className="card vendor-quick-stats">
        <h3><HiShoppingBag /> Vendor Performance Today</h3>
        <div className="vendor-stats-grid">
          {vendorStats.map(vendor => (
            <VendorStatCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className={`notification ${notification.type} show`}>
          {notification.type === 'success' && <HiCheckCircle />}
          {notification.type === 'error' && <HiXCircle />}
          {notification.type === 'warning' && <HiExclamation />}
          {notification.type === 'info' && <HiExclamationCircle />}
          <div className="notification-content">{notification.message}</div>
          <button 
            className="btn-icon btn-icon-sm"
            onClick={() => setNotification({ show: false, message: '', type: '' })}
          >
            <HiXCircle />
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <Modal
          title={getModalTitle(modalType)}
          onClose={closeModal}
          size={getModalSize(modalType)}
        >
          {renderModalContent()}
        </Modal>
      )}
    </div>
  );
};

export default OrderManagement;