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
  HiCog,
  HiBeaker,
  HiShieldExclamation,
  HiReceiptRefund,
  // Removed: HiMedicalServices, HiPrescription (not available in react-icons/hi)
  // Using available alternatives
  HiHeart, // For medical/health icon
  HiBadgeCheck // For prescription/verification icon
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

  // Orders data - Updated for pharmacy/medicine orders
  const [orders, setOrders] = useState([
    {
      id: 'MED-2024-7842',
      customer: {
        name: 'Rahul Sharma',
        phone: '+91 9876543210',
        address: 'Koramangala 4th Block, Bangalore',
        age: 45,
        gender: 'Male',
        allergies: 'None',
        medicalConditions: 'Diabetes Type 2'
      },
      pharmacy: {
        name: 'MediQuick Pharmacy',
        id: 'PHARM-001',
        phone: '+91 9876543222',
        rating: 4.5,
        license: 'PH123456789',
        address: 'MG Road, Bangalore'
      },
      rider: {
        name: 'Amit Kumar',
        id: 'RID-101',
        phone: '+91 9876543333',
        rating: 4.8
      },
      items: [
        { name: 'Metformin 500mg', quantity: 2, price: 120, type: 'Tablet', brand: 'Generic', prescriptionRequired: true, expiryDate: '2025-12-31' },
        { name: 'Insulin Syringes', quantity: 1, price: 60, type: 'Medical Device', brand: 'BD', prescriptionRequired: false, expiryDate: '2026-06-30' },
        { name: 'Blood Glucose Strips', quantity: 1, price: 45, type: 'Diagnostic', brand: 'Accu-Chek', prescriptionRequired: false, expiryDate: '2025-09-30' },
        { name: 'Vitamin D3 1000IU', quantity: 1, price: 90, type: 'Supplement', brand: 'Becosules', prescriptionRequired: false, expiryDate: '2025-11-30' }
      ],
      prescription: {
        doctorName: 'Dr. Anil Mehta',
        licenseNumber: 'MED12345',
        date: '2024-01-20',
        validity: '30 days',
        fileUrl: '/prescriptions/prescription-001.pdf',
        verified: true
      },
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
      specialInstructions: 'Keep medicines in cool place',
      tracking: [
        { time: '14:30', status: 'Order Placed', description: 'Order confirmed by pharmacy' },
        { time: '14:45', status: 'Verification', description: 'Prescription verification in progress' },
        { time: '15:00', status: 'Processing', description: 'Pharmacist is preparing your order' },
        { time: '15:15', status: 'Ready for Pickup', description: 'Order is ready for rider pickup' },
        { time: '15:30', status: 'Picked Up', description: 'Rider picked up the order' },
        { time: '16:15', status: 'On the Way', description: 'Rider is on the way to deliver' },
        { time: '16:45', status: 'Delivered', description: 'Order delivered successfully' }
      ],
      issues: [],
      commission: 15.75,
      pharmacyEarnings: 299.25
    },
    {
      id: 'MED-2024-7841',
      customer: {
        name: 'Priya Patel',
        phone: '+91 9876543211',
        address: 'Indiranagar, Bangalore',
        age: 32,
        gender: 'Female',
        allergies: 'Penicillin',
        medicalConditions: 'Asthma'
      },
      pharmacy: {
        name: 'HealthCare Pharmacy',
        id: 'PHARM-002',
        phone: '+91 9876543223',
        rating: 4.2,
        license: 'PH987654321',
        address: 'Indiranagar, Bangalore'
      },
      rider: {
        name: 'Rajesh Verma',
        id: 'RID-102',
        phone: '+91 9876543334',
        rating: 4.6
      },
      items: [
        { name: 'Salbutamol Inhaler', quantity: 2, price: 240, type: 'Inhaler', brand: 'Asthalin', prescriptionRequired: true, expiryDate: '2025-08-31' },
        { name: 'Montelukast 10mg', quantity: 1, price: 80, type: 'Tablet', brand: 'Montair', prescriptionRequired: true, expiryDate: '2025-10-31' },
        { name: 'Cetirizine 10mg', quantity: 1, price: 40, type: 'Tablet', brand: 'Cetrizine', prescriptionRequired: false, expiryDate: '2025-07-31' }
      ],
      prescription: {
        doctorName: 'Dr. Sunita Reddy',
        licenseNumber: 'MED67890',
        date: '2024-01-22',
        validity: '45 days',
        fileUrl: '/prescriptions/prescription-002.pdf',
        verified: true
      },
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
      specialInstructions: 'Keep inhaler at room temperature',
      tracking: [
        { time: '15:00', status: 'Order Placed', description: 'Order confirmed by pharmacy' },
        { time: '15:15', status: 'Verification', description: 'Prescription verification completed' },
        { time: '15:30', status: 'Processing', description: 'Pharmacist is preparing your order' },
        { time: '15:45', status: 'Ready for Pickup', description: 'Order is ready for rider pickup' },
        { time: '16:00', status: 'Picked Up', description: 'Rider picked up the order' },
        { time: '16:20', status: 'On the Way', description: 'Rider is on the way to deliver' }
      ],
      issues: [],
      commission: 19.25,
      pharmacyEarnings: 365.75
    },
    {
      id: 'MED-2024-7840',
      customer: {
        name: 'Arjun Singh',
        phone: '+91 9876543212',
        address: 'Whitefield, Bangalore',
        age: 65,
        gender: 'Male',
        allergies: 'Sulfa Drugs',
        medicalConditions: 'Hypertension, Arthritis'
      },
      pharmacy: {
        name: 'LifeCare Pharmacy',
        id: 'PHARM-003',
        phone: '+91 9876543224',
        rating: 4.7,
        license: 'PH456789123',
        address: 'Whitefield, Bangalore'
      },
      rider: {
        name: 'Suresh Reddy',
        id: 'RID-103',
        phone: '+91 9876543335',
        rating: 4.9
      },
      items: [
        { name: 'Losartan 50mg', quantity: 1, price: 25, type: 'Tablet', brand: 'Losar', prescriptionRequired: true, expiryDate: '2025-05-31' },
        { name: 'Vitamin C 1000mg', quantity: 1, price: 150, type: 'Tablet', brand: 'Limcee', prescriptionRequired: false, expiryDate: '2025-08-31' },
        { name: 'Hand Sanitizer 500ml', quantity: 1, price: 99, type: 'Personal Care', brand: 'Dettol', prescriptionRequired: false, expiryDate: '2026-01-31' },
        { name: 'Blood Pressure Monitor', quantity: 1, price: 1200, type: 'Medical Device', brand: 'Omron', prescriptionRequired: false, expiryDate: '2028-12-31' }
      ],
      prescription: {
        doctorName: 'Dr. Ravi Kumar',
        licenseNumber: 'MED24680',
        date: '2024-01-21',
        validity: '60 days',
        fileUrl: '/prescriptions/prescription-003.pdf',
        verified: true
      },
      totalAmount: 1474,
      discount: 10,
      deliveryFee: 40,
      finalAmount: 1504,
      status: 'pending',
      priority: 'critical',
      paymentMethod: 'Cash on Delivery',
      paymentStatus: 'pending',
      orderDate: '2024-01-23 16:00',
      deliveryDate: null,
      estimatedDelivery: '20-30 min',
      actualDeliveryTime: null,
      notes: 'Urgent medication delivery',
      specialInstructions: 'Patient is elderly, need assistance',
      tracking: [
        { time: '16:00', status: 'Order Placed', description: 'Order confirmed by pharmacy' },
        { time: '16:05', status: 'Verification', description: 'Prescription verification in progress' }
      ],
      issues: ['Stock shortage for Vitamin C 1000mg', 'Alternative offered'],
      commission: 75.2,
      pharmacyEarnings: 1428.8
    },
    {
      id: 'MED-2024-7839',
      customer: {
        name: 'Neha Gupta',
        phone: '+91 9876543213',
        address: 'Jayanagar, Bangalore',
        age: 28,
        gender: 'Female',
        allergies: 'None',
        medicalConditions: 'Migraine'
      },
      pharmacy: {
        name: 'Wellness Pharmacy',
        id: 'PHARM-004',
        phone: '+91 9876543225',
        rating: 4.3,
        license: 'PH789123456',
        address: 'Jayanagar, Bangalore'
      },
      rider: {
        name: 'Anil Verma',
        id: 'RID-104',
        phone: '+91 9876543336',
        rating: 4.4
      },
      items: [
        { name: 'Sumatriptan 50mg', quantity: 1, price: 149, type: 'Tablet', brand: 'Suminat', prescriptionRequired: true, expiryDate: '2025-03-31' },
        { name: 'Migraine Relief Oil', quantity: 1, price: 299, type: 'Ayurvedic', brand: 'Zandu', prescriptionRequired: false, expiryDate: '2025-06-30' }
      ],
      prescription: {
        doctorName: 'Dr. Meena Sharma',
        licenseNumber: 'MED13579',
        date: '2024-01-19',
        validity: '30 days',
        fileUrl: '/prescriptions/prescription-004.pdf',
        verified: true
      },
      totalAmount: 448,
      discount: 100,
      deliveryFee: 50,
      finalAmount: 398,
      status: 'cancelled',
      priority: 'normal',
      paymentMethod: 'Credit Card',
      paymentStatus: 'refunded',
      orderDate: '2024-01-23 13:00',
      deliveryDate: null,
      estimatedDelivery: '60-90 min',
      actualDeliveryTime: null,
      notes: 'Fragile item - migraine oil',
      specialInstructions: null,
      tracking: [
        { time: '13:00', status: 'Order Placed', description: 'Order confirmed by pharmacy' },
        { time: '13:30', status: 'Verification', description: 'Prescription verification completed' },
        { time: '14:00', status: 'Cancelled', description: 'Order cancelled by customer' }
      ],
      issues: ['Customer changed mind'],
      commission: 0,
      pharmacyEarnings: 0
    },
    {
      id: 'MED-2024-7838',
      customer: {
        name: 'Sanjay Kumar',
        phone: '+91 9876543214',
        address: 'BTM Layout, Bangalore',
        age: 52,
        gender: 'Male',
        allergies: 'Iodine',
        medicalConditions: 'Thyroid Disorder'
      },
      pharmacy: {
        name: 'MediQuick Pharmacy',
        id: 'PHARM-001',
        phone: '+91 9876543222',
        rating: 4.6,
        license: 'PH123456789',
        address: 'MG Road, Bangalore'
      },
      rider: {
        name: 'Vikram Singh',
        id: 'RID-105',
        phone: '+91 9876543337',
        rating: 4.7
      },
      items: [
        { name: 'Thyroxine 100mcg', quantity: 1, price: 150, type: 'Tablet', brand: 'Thyronorm', prescriptionRequired: true, expiryDate: '2025-04-30' },
        { name: 'Multivitamin Tablets', quantity: 1, price: 350, type: 'Supplement', brand: 'Supradyn', prescriptionRequired: false, expiryDate: '2025-09-30' },
        { name: 'Thermometer Digital', quantity: 1, price: 250, type: 'Medical Device', brand: 'Dr. Morepen', prescriptionRequired: false, expiryDate: '2027-12-31' }
      ],
      prescription: {
        doctorName: 'Dr. Anil Mehta',
        licenseNumber: 'MED12345',
        date: '2024-01-18',
        validity: '90 days',
        fileUrl: '/prescriptions/prescription-005.pdf',
        verified: true
      },
      totalAmount: 750,
      discount: 150,
      deliveryFee: 30,
      finalAmount: 630,
      status: 'delivered',
      priority: 'normal',
      paymentMethod: 'UPI',
      paymentStatus: 'paid',
      orderDate: '2024-01-23 12:00',
      deliveryDate: '2024-01-23 13:15',
      estimatedDelivery: '60-75 min',
      actualDeliveryTime: '75 min',
      notes: 'Deliver to reception',
      specialInstructions: 'Store thyroxine in refrigerator',
      tracking: [
        { time: '12:00', status: 'Order Placed', description: 'Order confirmed by pharmacy' },
        { time: '12:15', status: 'Verification', description: 'Prescription verification completed' },
        { time: '12:30', status: 'Processing', description: 'Pharmacist is preparing your order' },
        { time: '12:45', status: 'Ready for Pickup', description: 'Order is ready for rider pickup' },
        { time: '13:00', status: 'Picked Up', description: 'Rider picked up the order' },
        { time: '13:15', status: 'Delivered', description: 'Order delivered successfully' }
      ],
      issues: [],
      commission: 31.5,
      pharmacyEarnings: 598.5
    }
  ]);

  // High priority alerts
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Critical Medicine Order Delayed',
      description: 'MED-2024-7840 - Cardiac medication delayed by 45 minutes',
      orderId: 'MED-2024-7840',
      time: '10 minutes ago'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Prescription Verification Pending',
      description: 'MED-2024-7841 - Prescription requires doctor verification',
      orderId: 'MED-2024-7841',
      time: '25 minutes ago'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Temperature Sensitive Medicine',
      description: 'Order contains insulin that requires refrigeration',
      orderId: 'MED-2024-7838',
      time: '35 minutes ago'
    }
  ]);

  // Pharmacy quick stats
  const [pharmacyStats, setPharmacyStats] = useState([
    {
      id: 'PHARM-001',
      name: 'MediQuick Pharmacy',
      ordersToday: 45,
      avgRating: 4.5,
      successRate: '98%',
      commission: '₹6,450',
      revenue: '₹42,150',
      licenseStatus: 'Active',
      verified: true
    },
    {
      id: 'PHARM-002',
      name: 'HealthCare Pharmacy',
      ordersToday: 32,
      avgRating: 4.2,
      successRate: '95%',
      commission: '₹4,850',
      revenue: '₹31,250',
      licenseStatus: 'Active',
      verified: true
    },
    {
      id: 'PHARM-003',
      name: 'LifeCare Pharmacy',
      ordersToday: 28,
      avgRating: 4.7,
      successRate: '99%',
      commission: '₹3,980',
      revenue: '₹26,520',
      licenseStatus: 'Active',
      verified: true
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
      name: 'Pharmacy Manager',
      email: 'pharmacy@example.com',
      role: 'Pharmacy Support',
      permissions: 'Order Management, Prescription Verification',
      status: 'active',
      lastActive: '2024-01-23 15:30'
    },
    {
      id: 3,
      name: 'Medical Supervisor',
      email: 'medical@example.com',
      role: 'Medical',
      permissions: 'Prescription Approval, Medicine Verification',
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

  const handleContactPharmacy = (order) => {
    openModal('contactPharmacy', order);
  };

  const handleContactRider = (order) => {
    openModal('contactRider', order);
  };

  const handleViewPharmacy = (pharmacy) => {
    openModal('pharmacyDetails', pharmacy);
  };

  const handleManageUsers = () => {
    openModal('usersManagement');
  };

  const handleAddPharmacy = () => {
    openModal('addPharmacy');
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

  const handleVerifyPrescription = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { 
        ...order, 
        prescription: { ...order.prescription, verified: true } 
      } : order
    ));
    showNotification(`Prescription for ${orderId} verified successfully`, 'success');
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
        order.pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div className="text-xs text-info">{order.customer.age} yrs, {order.customer.gender}</div>
        </div>
      )
    },
    { 
      key: 'pharmacy.name', 
      label: 'Pharmacy',
      render: (_, order) => (
        <div>
          <div className="font-medium text-dark">{order.pharmacy.name}</div>
          <div className="flex items-center gap-1 text-xs">
            <HiStar className="text-warning" />
            <span className="text-soft">{order.pharmacy.rating}</span>
            {order.prescription.verified && (
              <HiShieldCheck className="text-success ml-2" title="Prescription Verified" />
            )}
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
          verification: { label: 'Verification', color: 'info', bg: 'bg-info/10', text: 'text-info' },
          processing: { label: 'Processing', color: 'info', bg: 'bg-info/10', text: 'text-info' },
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
            {status === 'verification' && <HiDocumentText className="w-3 h-3" />}
            {status === 'processing' && <HiBeaker className="w-3 h-3" />}
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
                onClick={() => handleUpdateOrderStatus(order.id, 'verification')}
                title="Start Prescription Verification"
              >
                <HiDocumentText />
              </button>
            </>
          )}
          {order.status === 'verification' && !order.prescription.verified && (
            <button 
              className="btn-icon"
              onClick={() => handleVerifyPrescription(order.id)}
              title="Verify Prescription"
            >
              <HiCheckCircle />
            </button>
          )}
          {order.status === 'processing' && (
            <button 
              className="btn-icon"
              onClick={() => handleUpdateOrderStatus(order.id, 'in_transit')}
              title="Mark as In Transit"
            >
              <HiTruck />
            </button>
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
          {(order.status === 'pending' || order.status === 'verification' || order.status === 'processing') && (
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

  // Pharmacy Stat Card Component
  const PharmacyStatCard = ({ pharmacy }) => (
    <div className="pharmacy-stat-card">
      <div className="pharmacy-stat-header">
        <h4>{pharmacy.name}</h4>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs text-soft">{pharmacy.id}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${pharmacy.verified ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
            {pharmacy.verified ? '✓ Verified' : 'Pending Verification'}
          </span>
        </div>
      </div>
      <div className="pharmacy-stat-body">
        <div className="stat-row">
          <span>Orders Today:</span>
          <strong>{pharmacy.ordersToday}</strong>
        </div>
        <div className="stat-row">
          <span>Avg Rating:</span>
          <div className="rating">
            <HiStar />
            <span>{pharmacy.avgRating}</span>
          </div>
        </div>
        <div className="stat-row">
          <span>Success Rate:</span>
          <span className="success-rate">{pharmacy.successRate}</span>
        </div>
        <div className="stat-row">
          <span>Commission:</span>
          <strong className="revenue">{pharmacy.commission}</strong>
        </div>
        <div className="stat-row">
          <span>Revenue:</span>
          <strong className="revenue">{pharmacy.revenue}</strong>
        </div>
      </div>
      <div className="flex justify-end mt-3 gap-2">
        <button 
          className="btn btn-sm btn-outline"
          onClick={() => handleViewPharmacy(pharmacy)}
        >
          View Details
        </button>
        <button 
          className="btn btn-sm btn-outline"
          onClick={() => openModal('contactPharmacy', pharmacy)}
        >
          <HiPhone /> Call
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
              <HiHeart /> Medicine Order Details - {modalData?.id}
            </h3>
            
            <div className="order-info-grid">
              <div className="info-section">
                <h4><HiUser /> Patient Information</h4>
                <div className="info-item">
                  <label>Name:</label>
                  <span>{modalData?.customer.name}</span>
                </div>
                <div className="info-item">
                  <label>Age/Gender:</label>
                  <span>{modalData?.customer.age} yrs, {modalData?.customer.gender}</span>
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
                  <label>Allergies:</label>
                  <span className={modalData?.customer.allergies !== 'None' ? 'text-error font-semibold' : ''}>
                    {modalData?.customer.allergies}
                  </span>
                </div>
                <div className="info-item">
                  <label>Medical Conditions:</label>
                  <span>{modalData?.customer.medicalConditions}</span>
                </div>
              </div>

              <div className="info-section">
                <h4><HiShoppingBag /> Pharmacy Information</h4>
                <div className="info-item">
                  <label>Name:</label>
                  <span>{modalData?.pharmacy.name}</span>
                </div>
                <div className="info-item">
                  <label>License:</label>
                  <span>{modalData?.pharmacy.license}</span>
                </div>
                <div className="info-item">
                  <label>Rating:</label>
                  <span className="rating">
                    <HiStar /> {modalData?.pharmacy.rating}
                  </span>
                </div>
                <div className="info-item">
                  <label>Phone:</label>
                  <span>{modalData?.pharmacy.phone}</span>
                </div>
                <div className="info-item">
                  <label>Address:</label>
                  <span>{modalData?.pharmacy.address}</span>
                </div>
              </div>

              <div className="info-section">
                <h4><HiBadgeCheck /> Prescription Details</h4>
                <div className="info-item">
                  <label>Doctor:</label>
                  <span>{modalData?.prescription.doctorName}</span>
                </div>
                <div className="info-item">
                  <label>License No:</label>
                  <span>{modalData?.prescription.licenseNumber}</span>
                </div>
                <div className="info-item">
                  <label>Date:</label>
                  <span>{new Date(modalData?.prescription.date).toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                  <label>Validity:</label>
                  <span>{modalData?.prescription.validity}</span>
                </div>
                <div className="info-item">
                  <label>Status:</label>
                  <span className={`status-badge ${modalData?.prescription.verified ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                    {modalData?.prescription.verified ? 'Verified' : 'Pending Verification'}
                  </span>
                </div>
                <div className="info-item">
                  <label>File:</label>
                  <a href={modalData?.prescription.fileUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    View Prescription
                  </a>
                </div>
              </div>

              <div className="info-section">
                <h4><HiTruck /> Delivery Information</h4>
                <div className="info-item">
                  <label>Rider:</label>
                  <span>{modalData?.rider?.name || 'Not assigned'}</span>
                </div>
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
                  <label>Special Instructions:</label>
                  <span>{modalData?.specialInstructions || 'None'}</span>
                </div>
              </div>
            </div>

            <div className="order-items-section">
              <h4>Medicine Items</h4>
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Medicine Name</th>
                    <th>Type</th>
                    <th>Brand</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Prescription</th>
                    <th>Expiry</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {modalData?.items.map((item, index) => (
                    <tr key={index} className={item.prescriptionRequired ? 'bg-blue-50' : ''}>
                      <td>
                        <div className="font-medium">{item.name}</div>
                        {item.prescriptionRequired && (
                          <span className="text-xs text-warning flex items-center gap-1">
                            <HiBadgeCheck /> Prescription Required
                          </span>
                        )}
                      </td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs ${getMedicineTypeClass(item.type)}`}>
                          {item.type}
                        </span>
                      </td>
                      <td>{item.brand}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.price}</td>
                      <td>
                        {item.prescriptionRequired ? (
                          <HiCheckCircle className="text-success" />
                        ) : (
                          <HiXCircle className="text-soft" />
                        )}
                      </td>
                      <td className={new Date(item.expiryDate) < new Date() ? 'text-error font-semibold' : ''}>
                        {new Date(item.expiryDate).toLocaleDateString()}
                      </td>
                      <td className="font-medium">₹{item.quantity * item.price}</td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td colSpan="7" className="text-right">Subtotal:</td>
                    <td className="font-medium">₹{modalData?.totalAmount}</td>
                  </tr>
                  <tr>
                    <td colSpan="7" className="text-right">Discount:</td>
                    <td className="text-success">-₹{modalData?.discount}</td>
                  </tr>
                  <tr>
                    <td colSpan="7" className="text-right">Delivery Fee:</td>
                    <td>₹{modalData?.deliveryFee}</td>
                  </tr>
                  <tr className="total-row">
                    <td colSpan="7" className="text-right font-bold">Total Amount:</td>
                    <td className="font-bold text-success">₹{modalData?.finalAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="tracking-section mt-6">
              <h4>Order Tracking</h4>
              <div className="timeline">
                {modalData?.tracking.map((track, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-time">{track.time}</div>
                      <div className="timeline-title">{track.status}</div>
                      <div className="timeline-description">{track.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button className="btn btn-outline" onClick={closeModal}>Close</button>
              {!modalData?.prescription.verified && (
                <button className="btn btn-warning" onClick={() => handleVerifyPrescription(modalData?.id)}>
                  <HiCheckCircle /> Verify Prescription
                </button>
              )}
              <button className="btn btn-primary" onClick={() => handleContactCustomer(modalData)}>
                <HiPhone /> Contact Patient
              </button>
            </div>
          </div>
        );

      case 'pharmacyDetails':
        return (
          <div className="pharmacy-details-modal">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HiShoppingBag /> Pharmacy Details - {modalData?.name}
            </h3>
            
            <div className="pharmacy-info-grid">
              <div className="info-section">
                <h4>Pharmacy Information</h4>
                <div className="info-item">
                  <label>Pharmacy Name:</label>
                  <span>{modalData?.name}</span>
                </div>
                <div className="info-item">
                  <label>License Number:</label>
                  <span className="font-mono">{modalData?.license || 'PH123456789'}</span>
                </div>
                <div className="info-item">
                  <label>License Status:</label>
                  <span className="success-rate">{modalData?.licenseStatus || 'Active'}</span>
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
                  <label>Address:</label>
                  <span>MG Road, Bangalore, Karnataka 560001</span>
                </div>
                <div className="info-item">
                  <label>Operating Hours:</label>
                  <span>24/7 Emergency Services Available</span>
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
                  <label>Avg Processing Time:</label>
                  <span>18 minutes</span>
                </div>
                <div className="info-item">
                  <label>Commission Rate:</label>
                  <span className="commission-rate">5%</span>
                </div>
                <div className="info-item">
                  <label>Verification Success:</label>
                  <span>99.2%</span>
                </div>
                <div className="info-item">
                  <label>Pharmacist On Duty:</label>
                  <span className="text-success">Dr. Anil Sharma (Licensed)</span>
                </div>
              </div>
            </div>

            <div className="pharmacy-performance-section">
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
                    <div className="pharmacy-rating">
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

            <div className="medicine-categories mt-6">
              <h4>Medicine Categories Available</h4>
              <div className="categories-grid">
                <span className="category-badge">Allopathic</span>
                <span className="category-badge">Ayurvedic</span>
                <span className="category-badge">Homeopathic</span>
                <span className="category-badge">Surgical</span>
                <span className="category-badge">Diagnostic</span>
                <span className="category-badge">Baby Care</span>
                <span className="category-badge">Personal Care</span>
                <span className="category-badge">Medical Devices</span>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn btn-outline" onClick={closeModal}>Close</button>
              <button className="btn btn-primary" onClick={() => handleContactPharmacy(modalData)}>
                <HiPhone /> Contact Pharmacy
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
                      <option value="pharmacy_support">Pharmacy Support</option>
                      <option value="medical_supervisor">Medical Supervisor</option>
                      <option value="customer_support">Customer Support</option>
                      <option value="rider_manager">Rider Manager</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Permissions</label>
                    <select className="form-input" required>
                      <option value="">Select Permissions</option>
                      <option value="full">Full Access</option>
                      <option value="pharmacy">Pharmacy Management</option>
                      <option value="prescription">Prescription Verification</option>
                      <option value="orders">Order Management Only</option>
                      <option value="finance">Finance Only</option>
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

      case 'addPharmacy':
        return (
          <div className="new-pharmacy-modal">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HiPlus /> Add New Pharmacy
            </h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              showNotification('Pharmacy added successfully', 'success');
              closeModal();
            }}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Pharmacy Name</label>
                  <input type="text" className="form-input" placeholder="Enter pharmacy name" required />
                </div>
                <div className="form-group">
                  <label>Owner Name</label>
                  <input type="text" className="form-input" placeholder="Enter owner name" required />
                </div>
                <div className="form-group">
                  <label>License Number</label>
                  <input type="text" className="form-input" placeholder="Enter pharmacy license number" required />
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
                  <label>Pharmacist Name</label>
                  <input type="text" className="form-input" placeholder="Enter licensed pharmacist name" required />
                </div>
                <div className="form-group">
                  <label>Commission Rate (%)</label>
                  <input type="number" className="form-input" placeholder="Enter commission rate" min="1" max="30" step="0.5" required />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea className="form-input" placeholder="Enter pharmacy address" rows="3" required></textarea>
                </div>
                <div className="form-group">
                  <label>Specialties</label>
                  <textarea className="form-input" placeholder="Enter specialties (e.g., Diabetes care, Pediatrics, etc.)" rows="3"></textarea>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  <HiPlus /> Add Pharmacy
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
                  <input type="checkbox" defaultChecked /> Patient Information
                </label>
                <label>
                  <input type="checkbox" defaultChecked /> Pharmacy Information
                </label>
                <label>
                  <input type="checkbox" defaultChecked /> Prescription Details
                </label>
                <label>
                  <input type="checkbox" defaultChecked /> Medicine Details
                </label>
                <label>
                  <input type="checkbox" /> Medical Analytics
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
              <HiPhoneOutgoing /> Contact Patient
            </h3>
            
            <div className="call-simulator">
              <div className="call-screen">
                <div className="caller-info">
                  <HiUser />
                  <span>{modalData?.customer.name}</span>
                </div>
                <p className="text-center text-soft mb-4">Calling patient at:</p>
                <p className="phone-number">{modalData?.customer.phone}</p>
                <div className="patient-notes mt-4">
                  <p className="text-sm">Medical Notes:</p>
                  <p className="text-sm">{modalData?.customer.medicalConditions}</p>
                </div>
                <p className="call-status text-center text-soft">Ringing...</p>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button className="btn btn-success" onClick={() => {
                showNotification(`Calling patient ${modalData?.customer.name}`, 'success');
                closeModal();
              }}>
                <HiPhone /> Start Call
              </button>
            </div>
          </div>
        );

      case 'contactPharmacy':
        return (
          <div className="modal-call">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HiPhoneOutgoing /> Contact Pharmacy
            </h3>
            
            <div className="call-simulator">
              <div className="call-screen">
                <div className="caller-info">
                  <HiShoppingBag />
                  <span>{modalData?.name}</span>
                </div>
                <p className="text-center text-soft mb-4">Calling pharmacy at:</p>
                <p className="phone-number">+91 9876543222</p>
                <div className="pharmacy-info mt-4">
                  <p className="text-sm">License: {modalData?.license || 'PH123456789'}</p>
                </div>
                <p className="call-status text-center text-soft">Ringing...</p>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button className="btn btn-success" onClick={() => {
                showNotification(`Calling pharmacy ${modalData?.name}`, 'success');
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
                <div className="delivery-info mt-4">
                  <p className="text-sm">Current Order: {modalData?.id}</p>
                  <p className="text-sm">Priority: {modalData?.priority}</p>
                </div>
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

  // Helper function for medicine type styling
  const getMedicineTypeClass = (type) => {
    const typeClasses = {
      'Tablet': 'bg-blue-100 text-blue-800',
      'Inhaler': 'bg-green-100 text-green-800',
      'Medical Device': 'bg-purple-100 text-purple-800',
      'Diagnostic': 'bg-yellow-100 text-yellow-800',
      'Supplement': 'bg-orange-100 text-orange-800',
      'Ayurvedic': 'bg-teal-100 text-teal-800',
      'Personal Care': 'bg-pink-100 text-pink-800'
    };
    return typeClasses[type] || 'bg-gray-100 text-gray-800';
  };

  // Get modal title
  const getModalTitle = (type) => {
    const titles = {
      orderDetails: 'Medicine Order Details',
      pharmacyDetails: 'Pharmacy Details',
      usersManagement: 'Users Management',
      addPharmacy: 'Add New Pharmacy',
      exportOrders: 'Export Orders',
      contactCustomer: 'Contact Patient',
      contactPharmacy: 'Contact Pharmacy',
      contactRider: 'Contact Rider'
    };
    return titles[type] || 'Modal';
  };

  // Get modal size
  const getModalSize = (type) => {
    if (['orderDetails', 'pharmacyDetails', 'usersManagement', 'addPharmacy'].includes(type)) {
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
            <h1><HiHeart /> Medicine Delivery Management</h1>
            <p>Monitor and manage all medicine orders in real-time. Track deliveries, handle prescription verification, and ensure timely delivery.</p>
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
            <button className="btn btn-outline" onClick={handleAddPharmacy}>
              <HiPlus /> Add New Pharmacy
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
          <h3><HiChartBar /> Real-time Medicine Order Statistics</h3>
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
            title="Pending Verification"
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
            icon={HiReceiptRefund}
            title="Pending Refunds"
            value={realTimeStats.pendingRefunds}
            change={2.1}
            color="warning"
            iconColor="#f59e0b"
          />
          <StatCard 
            icon={HiShieldExclamation}
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
          className={`tab-btn ${activeTab === 'verification' ? 'active' : ''}`}
          onClick={() => { setActiveTab('verification'); setSelectedStatus('verification'); }}
        >
          <HiDocumentText /> Verification ({orders.filter(o => o.status === 'verification').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'processing' ? 'active' : ''}`}
          onClick={() => { setActiveTab('processing'); setSelectedStatus('processing'); }}
        >
          <HiBeaker /> Processing ({orders.filter(o => o.status === 'processing').length})
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
          <HiShieldExclamation /> Critical ({orders.filter(o => o.priority === 'critical').length})
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
                placeholder="Search orders by ID, patient, or pharmacy..."
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
            <option value="verification">Verification</option>
            <option value="processing">Processing</option>
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
          <h4>Medicine Order Status Timeline</h4>
          <div className="timeline-stages">
            <span className="stage active">Order Placed</span>
            <span className={`stage ${getFilteredOrders().some(o => ['verification', 'processing', 'in_transit', 'delivered'].includes(o.status)) ? 'active' : ''}`}>
              Prescription Verification
            </span>
            <span className={`stage ${getFilteredOrders().some(o => ['processing', 'in_transit', 'delivered'].includes(o.status)) ? 'active' : ''}`}>
              Pharmacy Processing
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
                <HiHeart />
                <h4>No medicine orders found</h4>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            }
          />
        </div>
      </div>

      {/* High Priority Alerts */}
      <div className="card high-risk-alerts">
        <h3><HiShieldExclamation /> Medical Priority Alerts</h3>
        {alerts.length > 0 ? (
          <div className="alerts-list">
            {alerts.map(alert => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <HiCheckCircle />
            <h4>No active medical alerts</h4>
            <p>All systems are operating normally</p>
          </div>
        )}
      </div>

      {/* Pharmacy Quick Stats */}
      <div className="card pharmacy-quick-stats">
        <h3><HiShoppingBag /> Pharmacy Performance Today</h3>
        <div className="pharmacy-stats-grid">
          {pharmacyStats.map(pharmacy => (
            <PharmacyStatCard key={pharmacy.id} pharmacy={pharmacy} />
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