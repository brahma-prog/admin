import React, { useState, useEffect, useRef } from 'react';
import { 
  HiSearch, 
  HiEye, 
  HiLockOpen, 
  HiLockClosed,
  HiDownload,
  HiUserGroup,
  HiShoppingCart,
  HiVideoCamera,
  HiCreditCard,
  HiCalendar,
  HiClock,
  HiBell,
  HiDocumentText,
  HiChat,
  HiMap,
  HiCheckCircle,
  HiXCircle,
  HiTrash,
  HiRefresh,
  HiShieldCheck,
  HiX
} from 'react-icons/hi';
import { 
  FiHome,
  FiUsers,
  FiActivity,
  FiTrendingUp,
  FiTrendingDown
} from 'react-icons/fi';
import { 
  MdPregnantWoman,
  MdBabyChangingStation,
  MdMedicalServices,
  MdSecurity,
  MdDashboard,
  MdHistory,
  MdBarChart,
  MdWarning
} from 'react-icons/md';
import { 
  FaClipboardCheck,
  FaHeartbeat,
  FaUserMd
} from 'react-icons/fa';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import SearchBar from '../components/common/SearchBar';
import './UserManagement.css';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAuditLogs, setShowAuditLogs] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [selectedNotificationUser, setSelectedNotificationUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [realtimeStats, setRealtimeStats] = useState({
    onlineUsers: 0,
    activeConsultations: 0,
    pendingOrders: 0,
    pregnancyCareUsers: 0,
    babyCareUsers: 0,
    medicineOrdersToday: 0,
    revenueToday: 0,
    pendingPrescriptions: 0
  });
  const [showToast, setShowToast] = useState({ show: false, message: '', type: '' });
  const [viewingFile, setViewingFile] = useState(null);

  // Enhanced user data
  const initialUsers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: ' 9876543210',
      joined: '2024-01-15',
      lastActive: new Date().toLocaleString(),
      location: 'Mumbai',
      status: 'active',
      membership: 'Premium',
      userType: 'regular',
      
      familyProfiles: [
        {
          id: 'F001',
          name: 'Rajesh Kumar',
          age: 35,
          gender: 'Male',
          relationship: 'Self',
          type: 'regular',
          medicalHistory: ['Hypertension', 'Allergic Rhinitis']
        },
        {
          id: 'F002',
          name: 'Priya Kumar',
          age: 32,
          gender: 'Female',
          relationship: 'Wife',
          type: 'regular',
          medicalHistory: ['Migraine']
        },
        {
          id: 'F003',
          name: 'Aarav Kumar',
          age: 3,
          gender: 'Male',
          relationship: 'Son',
          type: 'baby',
          babyAge: '3 years',
          vaccinationSchedule: [
            { vaccine: 'MMR', date: '2024-03-15', status: 'upcoming' },
            { vaccine: 'Chickenpox', date: '2024-01-20', status: 'completed' }
          ]
        }
      ],
      
      dashboard: {
        activeOrders: 2,
        upcomingConsultations: 1,
        walletBalance: 2500,
        pendingActions: ['Upload Prescription', 'Complete Payment'],
        notifications: 5
      },
      
      medicineOrders: [
        {
          orderId: 'ORD001',
          date: '2024-02-20',
          status: 'delivered',
          items: [
            { name: 'Paracetamol 500mg', quantity: 1, price: 25 },
            { name: 'Cetirizine 10mg', quantity: 2, price: 15 }
          ],
          total: 55,
          pharmacy: 'MedLife Pharmacy',
          deliveryPartner: 'Delivery Agent 001',
          tracking: [
            { status: 'Ordered', time: '2024-02-20 10:30' },
            { status: 'Confirmed', time: '2024-02-20 10:45' },
            { status: 'Dispatched', time: '2024-02-20 11:30' },
            { status: 'Delivered', time: '2024-02-20 14:30' }
          ],
          prescriptionRequired: false
        },
        {
          orderId: 'ORD002',
          date: '2024-02-21',
          status: 'in_transit',
          items: [
            { name: 'Amoxicillin 250mg', quantity: 1, price: 45 },
            { name: 'Vitamin C 500mg', quantity: 1, price: 30 }
          ],
          total: 75,
          pharmacy: 'City Medicals',
          deliveryPartner: 'Delivery Agent 003',
          tracking: [
            { status: 'Ordered', time: '2024-02-21 09:15' },
            { status: 'Confirmed', time: '2024-02-21 09:30' },
            { status: 'Dispatched', time: '2024-02-21 10:15' }
          ],
          prescriptionRequired: true,
          prescriptionStatus: 'approved'
        }
      ],
      
      consultations: [
        {
          id: 'CON001',
          doctor: 'Dr. Sharma',
          type: 'video',
          date: '2024-02-22',
          time: '14:30',
          status: 'upcoming',
          specialty: 'General Physician',
          symptoms: ['Fever', 'Cough'],
          prescription: {
            medicines: ['Paracetamol', 'Azithromycin'],
            diagnosis: 'Viral Infection'
          }
        }
      ],
      
      wallet: {
        balance: 2500,
        transactions: [
          { id: 'TXN001', date: '2024-02-20', type: 'credit', amount: 1000, description: 'Wallet Top-up' },
          { id: 'TXN002', date: '2024-02-20', type: 'debit', amount: -55, description: 'Medicine Order' },
          { id: 'TXN003', date: '2024-02-21', type: 'debit', amount: -500, description: 'Consultation Fee' }
        ],
        paymentMethods: [
          { type: 'UPI', id: 'rajesh@upi' },
          { type: 'Credit Card', last4: '4321' }
        ]
      },
      
      fileLocker: [
        {
          id: 'DOC001',
          name: 'Blood Test Report',
          type: 'medical_report',
          uploadDate: '2024-02-15',
          size: '2.4 MB',
          profile: 'Self',
          category: 'reports',
          content: 'Patient shows normal hemoglobin levels. All other parameters within normal range.'
        },
        {
          id: 'DOC002',
          name: 'Prescription_Jan.pdf',
          type: 'prescription',
          uploadDate: '2024-02-10',
          size: '1.8 MB',
          profile: 'Self',
          category: 'prescriptions',
          content: 'Paracetamol 500mg - 1 tablet every 6 hours for 3 days'
        }
      ],
      
      notifications: [
        { id: 'NOT001', type: 'order', message: 'Your order ORD002 is out for delivery', time: '2 hours ago', read: false },
        { id: 'NOT002', type: 'appointment', message: 'Consultation with Dr. Sharma tomorrow at 14:30', time: '1 day ago', read: true },
        { id: 'NOT003', type: 'payment', message: 'Payment of ₹500 successful', time: '2 days ago', read: true }
      ],
      
      aiInteractions: [
        { id: 'AI001', query: 'How to upload prescription?', response: 'Go to Medicine Order → Upload Prescription', time: '2024-02-20 11:30' },
        { id: 'AI002', query: 'Track my order', response: 'Your order ORD002 is being processed', time: '2024-02-21 09:45' }
      ],
      
      devices: ['Android', 'Web'],
      loginHistory: [
        { device: 'Android', time: '2024-02-21 09:15', ip: '103.45.67.89' },
        { device: 'Web', time: '2024-02-20 14:30', ip: '103.45.67.90' }
      ]
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '9876543211',
      joined: '2024-01-10',
      lastActive: new Date().toLocaleString(),
      location: 'Delhi',
      status: 'active',
      membership: 'Premium',
      userType: 'pregnancy_care',
      
      familyProfiles: [
        {
          id: 'F101',
          name: 'Priya Sharma',
          age: 28,
          gender: 'Female',
          relationship: 'Self',
          type: 'pregnancy',
          pregnancyWeek: 24,
          expectedDelivery: '2024-06-15',
          doctor: 'Dr. Patel',
          highRisk: false,
          medicalHistory: ['Anemia']
        },
        {
          id: 'F102',
          name: 'Rahul Sharma',
          age: 30,
          gender: 'Male',
          relationship: 'Husband',
          type: 'regular',
          medicalHistory: []
        }
      ],
      
      pregnancyCare: {
        enrolled: true,
        enrollmentDate: '2024-01-15',
        package: 'Premium Pregnancy Care',
        weeks: 24,
        trimester: 2,
        upcomingTests: [
          { test: 'Glucose Test', date: '2024-03-01' },
          { test: 'Ultrasound Scan', date: '2024-03-15' }
        ],
        completedTests: [
          { test: 'Blood Tests', date: '2024-01-20', result: 'Normal' },
          { test: 'First Ultrasound', date: '2024-01-25', result: 'Normal' }
        ],
        consultations: [
          { date: '2024-02-19', doctor: 'Dr. Patel', type: 'video', notes: 'Regular checkup, all normal' },
          { date: '2024-02-05', doctor: 'Dr. Patel', type: 'offline', notes: 'Initial consultation' }
        ],
        medications: [
          { name: 'Folic Acid', dosage: 'Once daily', prescribedBy: 'Dr. Patel' },
          { name: 'Iron Supplements', dosage: 'Twice daily', prescribedBy: 'Dr. Patel' }
        ]
      },
      
      dashboard: {
        activeOrders: 1,
        upcomingConsultations: 2,
        walletBalance: 1500,
        pendingActions: ['Upload Scan Report'],
        notifications: 3
      },
      
      medicineOrders: [
        {
          orderId: 'ORD101',
          date: '2024-02-21',
          status: 'delivered',
          items: [
            { name: 'Folic Acid Tablets', quantity: 1, price: 120 },
            { name: 'Iron Supplements', quantity: 1, price: 180 }
          ],
          total: 300,
          pharmacy: 'Mothercare Pharmacy',
          deliveryPartner: 'Delivery Agent 002',
          tracking: [
            { status: 'Ordered', time: '2024-02-21 09:00' },
            { status: 'Confirmed', time: '2024-02-21 09:15' },
            { status: 'Delivered', time: '2024-02-21 13:30' }
          ],
          prescriptionRequired: true,
          prescriptionStatus: 'approved'
        }
      ],
      
      fileLocker: [
        {
          id: 'DOC101',
          name: 'Ultrasound Report.pdf',
          type: 'scan_report',
          uploadDate: '2024-02-10',
          size: '3.2 MB',
          profile: 'Self',
          category: 'pregnancy',
          content: 'Ultrasound shows normal fetal development. Estimated gestational age: 24 weeks. Heart rate: 145 bpm.'
        },
        {
          id: 'DOC102',
          name: 'Blood Test Results.jpg',
          type: 'medical_report',
          uploadDate: '2024-02-05',
          size: '1.5 MB',
          profile: 'Self',
          category: 'pregnancy',
          content: 'Hemoglobin: 11.2 g/dL. Iron supplements prescribed. All other parameters normal.'
        }
      ]
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit@example.com',
      phone: '9876543212',
      joined: '2024-01-05',
      lastActive: '2024-02-10 11:45:00',
      location: 'Bangalore',
      status: 'suspended',
      membership: 'Basic',
      userType: 'regular',
      suspensionReason: 'Payment Issues',
      suspendedBy: 'Admin',
      suspensionDate: '2024-02-11',
      
      familyProfiles: [
        {
          id: 'F201',
          name: 'Amit Patel',
          age: 40,
          gender: 'Male',
          relationship: 'Self',
          type: 'regular',
          medicalHistory: ['Diabetes Type 2']
        }
      ],
      
      dashboard: {
        activeOrders: 0,
        upcomingConsultations: 0,
        walletBalance: 0,
        pendingActions: ['Complete KYC'],
        notifications: 2
      }
    },
    {
      id: 4,
      name: 'Sneha Gupta',
      email: 'sneha@example.com',
      phone: '9876543213',
      joined: '2023-12-20',
      lastActive: new Date().toLocaleString(),
      location: 'Chennai',
      status: 'active',
      membership: 'Premium',
      userType: 'baby_care',
      
      familyProfiles: [
        {
          id: 'F301',
          name: 'Sneha Gupta',
          age: 29,
          gender: 'Female',
          relationship: 'Self',
          type: 'regular',
          medicalHistory: ['Postpartum Care']
        },
        {
          id: 'F302',
          name: 'Aarav Gupta',
          age: '6 months',
          gender: 'Male',
          relationship: 'Son',
          type: 'baby',
          dateOfBirth: '2023-08-15',
          pediatrician: 'Dr. Reddy',
          vaccinationSchedule: [
            { vaccine: 'BCG', date: '2023-08-17', status: 'completed' },
            { vaccine: 'Hepatitis B', date: '2023-08-17', status: 'completed' },
            { vaccine: 'OPV', date: '2023-10-15', status: 'completed' },
            { vaccine: 'Pentavalent', date: '2024-02-15', status: 'upcoming' }
          ],
          growthMilestones: [
            { milestone: 'Smiling', achieved: true, age: '2 months' },
            { milestone: 'Rolling over', achieved: true, age: '4 months' },
            { milestone: 'Sitting without support', achieved: false, expected: '6-7 months' }
          ]
        }
      ],
      
      babyCare: {
        enrolled: true,
        babyName: 'Aarav',
        dateOfBirth: '2023-08-15',
        age: '6 months',
        pediatrician: 'Dr. Reddy',
        upcomingVaccinations: [
          { vaccine: 'Pentavalent', date: '2024-02-15', status: 'upcoming' },
          { vaccine: 'Rotavirus', date: '2024-02-20', status: 'upcoming' }
        ],
        completedVaccinations: [
          { vaccine: 'BCG', date: '2023-08-17' },
          { vaccine: 'Hepatitis B', date: '2023-08-17' },
          { vaccine: 'OPV', date: '2023-10-15' }
        ],
        consultations: [
          { date: '2024-01-20', doctor: 'Dr. Reddy', reason: 'Regular checkup', notes: 'Healthy growth' },
          { date: '2023-12-15', doctor: 'Dr. Reddy', reason: 'Vaccination', notes: 'Administered OPV' }
        ],
        medications: [
          { name: 'Vitamin D Drops', dosage: 'Once daily', prescribedBy: 'Dr. Reddy' }
        ]
      },
      
      dashboard: {
        activeOrders: 1,
        upcomingConsultations: 1,
        walletBalance: 3200,
        pendingActions: ['Upload vaccination certificate'],
        notifications: 4
      },
      
      medicineOrders: [
        {
          orderId: 'ORD301',
          date: '2024-02-21',
          status: 'processing',
          items: [
            { name: 'Baby Diapers', quantity: 2, price: 800 },
            { name: 'Baby Lotion', quantity: 1, price: 250 }
          ],
          total: 1050,
          pharmacy: 'BabyCare Pharmacy',
          prescriptionRequired: false
        }
      ]
    }
  ];

  useEffect(() => {
    setUsers(initialUsers);
    
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setRealtimeStats({
        onlineUsers: Math.floor(Math.random() * 50) + 150,
        activeConsultations: Math.floor(Math.random() * 20) + 8,
        pendingOrders: Math.floor(Math.random() * 30) + 15,
        pregnancyCareUsers: initialUsers.filter(u => u.familyProfiles?.some(f => f.type === 'pregnancy')).length,
        babyCareUsers: initialUsers.filter(u => u.familyProfiles?.some(f => f.type === 'baby')).length,
        medicineOrdersToday: Math.floor(Math.random() * 100) + 50,
        revenueToday: Math.floor(Math.random() * 50000) + 25000,
        pendingPrescriptions: Math.floor(Math.random() * 20) + 5
      });
    }, 5000);

    // Initialize audit logs
    const logs = [
      { id: 1, timestamp: new Date().toLocaleString(), admin: 'Admin', action: 'Login', ip: '192.168.1.100', details: 'Successful login' },
      { id: 2, timestamp: '2024-02-21 10:45:12', admin: 'Admin', action: 'User View', ip: '192.168.1.100', details: 'Viewed Priya Sharma profile' },
      { id: 3, timestamp: '2024-02-21 11:00:30', admin: 'Admin', action: 'Order Monitoring', ip: '192.168.1.100', details: 'Checked medicine order ORD002 status' },
    ];
    setAuditLogs(logs);

    return () => clearInterval(interval);
  }, []);

  const showToastMessage = (message, type = 'info') => {
    setShowToast({ show: true, message, type });
    setTimeout(() => {
      setShowToast({ show: false, message: '', type: '' });
    }, 3000);
  };

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
            <div className="user-tags">
              {user.familyProfiles?.some(f => f.type === 'pregnancy') && 
                <span className="tag-pregnancy"><MdPregnantWoman /> Pregnancy</span>}
              {user.familyProfiles?.some(f => f.type === 'baby') && 
                <span className="tag-baby"><MdBabyChangingStation /> Baby Care</span>}
              {user.membership === 'Premium' && 
                <span className="tag-premium"><HiShieldCheck /> Premium</span>}
            </div>
          </div>
        </div>
      )
    },
    { 
      key: 'phone', 
      label: 'Contact',
      render: (value) => <div className="contact-cell">{value}</div>
    },
    { 
      key: 'joined', 
      label: 'Member Since',
      render: (value) => (
        <div className="date-cell">
          <HiCalendar />
          <span>{value}</span>
        </div>
      )
    },
    { 
      key: 'dashboard', 
      label: 'Active',
      render: (value) => (
        <div className="active-cell">
          <div className="active-items">
            <span className="active-orders">{value?.activeOrders || 0} orders</span>
            <span className="active-consults">{value?.upcomingConsultations || 0} consults</span>
          </div>
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
          {user.familyProfiles?.some(f => f.type === 'pregnancy') && (
            <span className="pregnancy-badge">
              <MdPregnantWoman /> Week {user.familyProfiles.find(f => f.type === 'pregnancy')?.pregnancyWeek}
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
            className="btn-icon btn-sm btn-view"
            onClick={() => viewUserDetails(user)}
            title="View Profile"
          >
            <HiEye />
          </button>
          <button 
            className="btn-icon btn-sm btn-suspend"
            onClick={() => toggleUserStatus(user)}
            title={user.status === 'active' ? 'Suspend' : 'Activate'}
          >
            {user.status === 'active' ? <HiLockClosed /> : <HiLockOpen />}
          </button>
          <button 
            className="btn-icon btn-sm btn-notify"
            onClick={() => openNotificationModal(user)}
            title="Send Notification"
          >
            <HiBell />
          </button>
        </div>
      )
    }
  ];

  const auditColumns = [
    { key: 'timestamp', label: 'Timestamp' },
    { key: 'admin', label: 'Admin' },
    { key: 'action', label: 'Action' },
    { key: 'ip', label: 'IP Address' },
    { key: 'details', label: 'Details' }
  ];

  const viewUserDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const toggleUserStatus = (user) => {
    const action = user.status === 'active' ? 'suspend' : 'activate';
    const actionName = user.status === 'active' ? 'Suspended' : 'Activated';
    
    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        return {
          ...u,
          status: u.status === 'active' ? 'suspended' : 'active'
        };
      }
      return u;
    });
    
    setUsers(updatedUsers);
    
    // Add to audit log
    const newLog = {
      id: auditLogs.length + 1,
      timestamp: new Date().toLocaleString(),
      admin: 'Admin',
      action: `User ${action}ed`,
      ip: '192.168.1.100',
      details: `${action}ed user: ${user.name} (ID: ${user.id})`
    };
    setAuditLogs([newLog, ...auditLogs]);
    
    showToastMessage(`${user.name} has been ${actionName} successfully.`, 'success');
  };

  const openNotificationModal = (user) => {
    setSelectedNotificationUser(user);
    setNotificationMessage('');
    setShowNotificationModal(true);
  };

  const sendNotification = () => {
    if (!notificationMessage.trim()) {
      showToastMessage('Please enter a notification message.', 'warning');
      return;
    }
    
    // Add to audit log
    const newLog = {
      id: auditLogs.length + 1,
      timestamp: new Date().toLocaleString(),
      admin: 'Admin',
      action: 'Notification Sent',
      ip: '192.168.1.100',
      details: `Notification to ${selectedNotificationUser.name}: ${notificationMessage}`
    };
    setAuditLogs([newLog, ...auditLogs]);
    
    // Update user's notifications
    const updatedUsers = users.map(user => {
      if (user.id === selectedNotificationUser.id) {
        const newNotification = {
          id: `NOT${Date.now()}`,
          type: 'admin',
          message: notificationMessage,
          time: 'Just now',
          read: false
        };
        
        return {
          ...user,
          notifications: [newNotification, ...(user.notifications || [])]
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    showToastMessage(`Notification sent to ${selectedNotificationUser.name} successfully!`, 'success');
    setShowNotificationModal(false);
    setNotificationMessage('');
  };

  const viewFile = (file) => {
    setViewingFile(file);
  };

  const downloadFile = (file) => {
    // Create a blob and download link
    const blob = new Blob([`Medical File Content:\n\nFile: ${file.name}\nType: ${file.type}\nUpload Date: ${file.uploadDate}\nSize: ${file.size}\n\nContent:\n${file.content}`], 
      { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${file.name}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToastMessage(`Downloading ${file.name}...`, 'success');
  };

  const exportAllData = () => {
    const dataStr = JSON.stringify(users, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `users_data_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
    
    showToastMessage('User data exported successfully!', 'success');
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
      (activeFilter === 'pregnancy' && user.familyProfiles?.some(f => f.type === 'pregnancy')) ||
      (activeFilter === 'babycare' && user.familyProfiles?.some(f => f.type === 'baby')) ||
      (activeFilter === 'premium' && user.membership === 'Premium');
    
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return <HiCheckCircle className="status-icon delivered" />;
      case 'in_transit': return '🚚';
      case 'processing': return <HiRefresh className="status-icon processing" />;
      default: return <HiClock className="status-icon pending" />;
    }
  };

  const getDocumentIcon = (type) => {
    switch(type) {
      case 'prescription': return <FaClipboardCheck />;
      case 'medical_report': return <MdMedicalServices />;
      case 'scan_report': return <FaHeartbeat />;
      default: return <HiDocumentText />;
    }
  };

  return (
    <div className="user-management">
      <div className="page-header">
        <h1>User Management Portal</h1>
        <p>Monitor and manage all user activities, medical records, and healthcare services</p>
      </div>

      {/* Toast Notification */}
      {showToast.show && (
        <div className={`toast-notification toast-${showToast.type}`}>
          <div className="toast-content">
            <span>{showToast.message}</span>
            <button className="toast-close" onClick={() => setShowToast({ show: false, message: '', type: '' })}>
              <HiX />
            </button>
          </div>
        </div>
      )}

      {/* Real-time Platform Stats */}
      <div className="stats-grid">
        <div className="stat-card stat-primary">
          <div className="stat-icon">
            <FiUsers />
          </div>
          <div className="stat-content">
            <h3>{users.length}</h3>
            <p>Total Users</p>
            <div className="real-time">
              <span className="online-indicator"></span>
              <span>{realtimeStats.onlineUsers} online now</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card stat-pregnancy">
          <div className="stat-icon">
            <MdPregnantWoman />
          </div>
          <div className="stat-content">
            <h3>{realtimeStats.pregnancyCareUsers}</h3>
            <p>Pregnancy Care</p>
            <div className="real-time">
              <span className="active-indicator"></span>
              <span>Active monitoring</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card stat-baby">
          <div className="stat-icon">
            <MdBabyChangingStation />
          </div>
          <div className="stat-content">
            <h3>{realtimeStats.babyCareUsers}</h3>
            <p>Baby Care</p>
            <div className="real-time">
              <span className="active-indicator"></span>
              <span>Vaccination tracking</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card stat-info">
          <div className="stat-icon">
            <HiShoppingCart />
          </div>
          <div className="stat-content">
            <h3>{realtimeStats.medicineOrdersToday}</h3>
            <p>Orders Today</p>
            <div className="real-time">
              <span className="live-indicator"></span>
              <span>₹{realtimeStats.revenueToday.toLocaleString()} revenue</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Management Toolbar */}
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
              className={`filter-btn ${activeFilter === 'pregnancy' ? 'active' : ''}`}
              onClick={() => setActiveFilter('pregnancy')}
            >
              <MdPregnantWoman /> Pregnancy
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'babycare' ? 'active' : ''}`}
              onClick={() => setActiveFilter('babycare')}
            >
              <MdBabyChangingStation /> Baby Care
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'premium' ? 'active' : ''}`}
              onClick={() => setActiveFilter('premium')}
            >
              <HiShieldCheck /> Premium
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
          <button className="btn btn-outline" onClick={exportAllData}>
            <HiDownload />
            Export Data
          </button>
          <button className="btn btn-outline" onClick={() => setShowAuditLogs(true)}>
            <FiActivity />
            Audit Logs
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="card table-card">
        <div className="card-header">
          <h3>User Management</h3>
          <div className="card-stats">
            <span className="badge">{filteredUsers.length} users</span>
            <span className="badge badge-success">{users.filter(u => u.status === 'active').length} active</span>
            <span className="badge badge-suspended">{users.filter(u => u.status === 'suspended').length} suspended</span>
          </div>
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
          title={`User Portal: ${selectedUser.name}`}
          onClose={() => setShowModal(false)}
          size="xl"
          className="user-details-modal"
        >
          <div className="user-portal-view">
            <div className="user-portal-header">
              <div className="portal-avatar">
                {selectedUser.name.charAt(0)}
              </div>
              <div className="portal-info">
                <h3>{selectedUser.name}</h3>
                <p>{selectedUser.email} • {selectedUser.phone} • {selectedUser.location}</p>
                <div className="portal-tags">
                  <span className={`status-badge status-${selectedUser.status}`}>
                    {selectedUser.status}
                  </span>
                  <span className="membership-tag">
                    {selectedUser.membership} Member
                  </span>
                  {selectedUser.familyProfiles?.some(f => f.type === 'pregnancy') && (
                    <span className="pregnancy-tag">
                      <MdPregnantWoman /> Pregnancy Care
                    </span>
                  )}
                  {selectedUser.familyProfiles?.some(f => f.type === 'baby') && (
                    <span className="baby-tag">
                      <MdBabyChangingStation /> Baby Care
                    </span>
                  )}
                </div>
              </div>
              <div className="portal-stats">
                <div className="stat-item">
                  <span className="stat-number">{selectedUser.medicineOrders?.length || 0}</span>
                  <span className="stat-label">Orders</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{selectedUser.consultations?.length || 0}</span>
                  <span className="stat-label">Consults</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{selectedUser.familyProfiles?.length || 1}</span>
                  <span className="stat-label">Family</span>
                </div>
              </div>
            </div>

            <div className="portal-sections">
              {/* Dashboard Overview */}
              <div className="portal-section">
                <h4><FiHome /> Dashboard Overview</h4>
                <div className="dashboard-grid">
                  <div className="dashboard-card">
                    <div className="card-header">
                      <h5><HiShoppingCart /> Active Orders</h5>
                      <span className="badge">{selectedUser.dashboard?.activeOrders || 0}</span>
                    </div>
                    {selectedUser.medicineOrders?.filter(o => ['processing', 'in_transit'].includes(o.status)).length > 0 ? (
                      selectedUser.medicineOrders?.filter(o => ['processing', 'in_transit'].includes(o.status)).map(order => (
                        <div key={order.orderId} className="order-item">
                          <span className="order-id">{order.orderId}</span>
                          <span className={`order-status ${order.status}`}>
                            {getStatusIcon(order.status)}
                            {order.status.replace('_', ' ')}
                          </span>
                          <span className="order-amount">₹{order.total}</span>
                        </div>
                      ))
                    ) : (
                      <p className="no-data">No active orders</p>
                    )}
                  </div>

                  <div className="dashboard-card">
                    <div className="card-header">
                      <h5><HiVideoCamera /> Upcoming Consultations</h5>
                      <span className="badge">{selectedUser.dashboard?.upcomingConsultations || 0}</span>
                    </div>
                    {selectedUser.consultations?.filter(c => c.status === 'upcoming').length > 0 ? (
                      selectedUser.consultations?.filter(c => c.status === 'upcoming').map(consult => (
                        <div key={consult.id} className="consult-item">
                          <span className="consult-doctor">Dr. {consult.doctor}</span>
                          <span className="consult-date">{consult.date} {consult.time}</span>
                        </div>
                      ))
                    ) : (
                      <p className="no-data">No upcoming consultations</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Medicine Orders */}
              <div className="portal-section">
                <h4><HiShoppingCart /> Medicine Orders</h4>
                <div className="orders-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Pharmacy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedUser.medicineOrders?.length > 0 ? (
                        selectedUser.medicineOrders?.map(order => (
                          <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.date}</td>
                            <td>₹{order.total}</td>
                            <td>
                              <span className={`order-status ${order.status}`}>
                                {getStatusIcon(order.status)}
                                {order.status.replace('_', ' ')}
                              </span>
                            </td>
                            <td>{order.pharmacy}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="no-data">No orders found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Medical File Locker */}
              <div className="portal-section">
                <h4><HiDocumentText /> Medical File Locker</h4>
                <div className="file-locker-grid">
                  {selectedUser.fileLocker?.length > 0 ? (
                    selectedUser.fileLocker?.map(file => (
                      <div key={file.id} className="file-card">
                        <div className="file-icon">
                          {getDocumentIcon(file.type)}
                        </div>
                        <div className="file-details">
                          <h6>{file.name}</h6>
                          <p><strong>Type:</strong> {file.type.replace('_', ' ')}</p>
                          <p><strong>Uploaded:</strong> {file.uploadDate}</p>
                          <p><strong>Size:</strong> {file.size}</p>
                        </div>
                        <div className="file-actions">
                          <button 
                            className="btn-icon btn-sm btn-view"
                            onClick={() => viewFile(file)}
                            title="View File"
                          >
                            <HiEye />
                          </button>
                          <button 
                            className="btn-icon btn-sm btn-download"
                            onClick={() => downloadFile(file)}
                            title="Download File"
                          >
                            <HiDownload />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-data">No files in locker</p>
                  )}
                </div>
              </div>

              {/* Notifications */}
              <div className="portal-section">
                <h4><HiBell /> Notifications</h4>
                <div className="notifications-list">
                  {selectedUser.notifications?.length > 0 ? (
                    selectedUser.notifications?.slice(0, 5).map(notif => (
                      <div key={notif.id} className={`notification-item ${notif.read ? 'read' : 'unread'}`}>
                        <p>{notif.message}</p>
                        <span className="notification-time">{notif.time}</span>
                      </div>
                    ))
                  ) : (
                    <p className="no-data">No notifications</p>
                  )}
                </div>
              </div>

              {/* Admin Actions */}
              <div className="portal-actions">
                <button className="btn btn-outline" onClick={exportAllData}>
                  <HiDownload />
                  Export User Data
                </button>
                <button className="btn btn-suspend" onClick={() => toggleUserStatus(selectedUser)}>
                  {selectedUser.status === 'active' ? (
                    <>
                      <HiLockClosed />
                      Suspend Account
                    </>
                  ) : (
                    <>
                      <HiLockOpen />
                      Activate Account
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* File View Modal */}
      {viewingFile && (
        <Modal
          title={`Viewing: ${viewingFile.name}`}
          onClose={() => setViewingFile(null)}
          size="lg"
        >
          <div className="file-view-modal">
            <div className="file-view-header">
              <div className="file-view-icon">
                {getDocumentIcon(viewingFile.type)}
              </div>
              <div className="file-view-info">
                <h4>{viewingFile.name}</h4>
                <p>Type: {viewingFile.type.replace('_', ' ')}</p>
                <p>Uploaded: {viewingFile.uploadDate}</p>
                <p>Size: {viewingFile.size}</p>
              </div>
            </div>
            <div className="file-view-content">
              <h5>File Content:</h5>
              <div className="content-preview">
                {viewingFile.content}
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setViewingFile(null)}>
                Close
              </button>
              <button className="btn btn-primary" onClick={() => downloadFile(viewingFile)}>
                <HiDownload />
                Download File
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Notification Modal */}
      {showNotificationModal && selectedNotificationUser && (
        <Modal
          title={`Send Notification to ${selectedNotificationUser.name}`}
          onClose={() => {
            setShowNotificationModal(false);
            setNotificationMessage('');
          }}
          size="md"
        >
          <div className="notification-modal">
            <div className="form-group">
              <label>Message:</label>
              <textarea
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
                placeholder="Enter your notification message here..."
                rows={4}
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setShowNotificationModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={sendNotification}>
                Send Notification
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Audit Logs Modal */}
      {showAuditLogs && (
        <Modal
          title="Admin Audit Logs"
          onClose={() => setShowAuditLogs(false)}
          size="xl"
          className="audit-logs-modal"
        >
          <div className="audit-logs-content">
            <Table
              columns={auditColumns}
              data={auditLogs}
              emptyMessage="No audit logs available"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserManagement;