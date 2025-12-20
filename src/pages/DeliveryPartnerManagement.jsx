import React, { useState, useEffect } from 'react';
import {
  HiCheckCircle,
  HiXCircle,
  HiClock,
  HiDocumentText,
  HiStar,
  HiUsers,
  HiCurrencyRupee,
  HiCalendar,
  HiTrendingUp,
  HiEye,
  HiPencil,
  HiTrash,
  HiDownload,
  HiFilter,
  HiTruck,
  HiLocationMarker,
  HiPhone,
  HiMail,
  HiChartBar,
  HiShieldCheck,
  HiExclamationCircle,
  HiMap,
  HiCreditCard,
  HiBell,
  HiRefresh,
  HiUserCircle,
  HiChartPie,
  HiCollection,
  HiExclamation,
  HiCash,
  HiFlag,
  HiUser,
  HiClipboardList,
  HiChartSquareBar,
  HiSwitchHorizontal,
  HiPlus,
  HiPrinter,
  HiCloudDownload,
  HiExternalLink,
  HiChevronRight,
  HiCheck,
  HiPhoneOutgoing,
  HiShieldExclamation,
  HiUserAdd,
  HiDocumentReport,
  HiDocumentDuplicate,
  HiInformationCircle,
  HiHome,
  HiBriefcase,
  HiSearch,
  HiShare,
  HiUserGroup,
  HiPhoneIncoming,
  HiOutlineX
} from 'react-icons/hi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import './DeliveryPartnerManagement.css';

const DeliveryPartnerManagement = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [statusFilter, setStatusFilter] = useState('all');
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [exportFormat, setExportFormat] = useState('csv');
  const [activeDetailTab, setActiveDetailTab] = useState('verification');
  const [newPartnerForm, setNewPartnerForm] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: 'Motorcycle',
    license: '',
    aadhar: '',
    zone: 'Central Zone',
    experience: '1 year'
  });
  
  // Track location simulation state
  const [isTracking, setIsTracking] = useState(false);
  const [trackingLocation, setTrackingLocation] = useState(null);
  const [callStatus, setCallStatus] = useState('dialing');
  const [callTimer, setCallTimer] = useState(0);
  
  // State for modal inputs
  const [rejectReason, setRejectReason] = useState('');
  const [suspendReason, setSuspendReason] = useState('');
  
  const [stats, setStats] = useState({
    totalPartners: 156,
    activePartners: 142,
    onDuty: 98,
    pendingApprovals: 8,
    suspendedPartners: 6,
    totalDeliveries: 12450,
    todaysDeliveries: 245,
    avgRating: 4.6,
    avgDeliveryTime: '28 min',
    todayEarnings: 65200,
    totalEarnings: 4525000,
    thisMonthGrowth: 15.2,
    acceptanceRate: 88.5
  });

  // Delivery performance data for charts
  const deliveryTrendData = [
    { day: 'Mon', deliveries: 185, earnings: 45000, online: 65 },
    { day: 'Tue', deliveries: 212, earnings: 52000, online: 72 },
    { day: 'Wed', deliveries: 198, earnings: 48500, online: 68 },
    { day: 'Thu', deliveries: 225, earnings: 55000, online: 78 },
    { day: 'Fri', deliveries: 245, earnings: 60000, online: 85 },
    { day: 'Sat', deliveries: 210, earnings: 52000, online: 75 },
    { day: 'Sun', deliveries: 175, earnings: 43000, online: 62 }
  ];

  const vehicleDistribution = [
    { name: 'Motorcycle', value: 65, color: '#0088FE' },
    { name: 'Scooter', value: 25, color: '#00C49F' },
    { name: 'Bicycle', value: 8, color: '#FFBB28' },
    { name: 'Car', value: 2, color: '#FF8042' }
  ];

  const performanceMetrics = [
    { name: 'On-Time Delivery', value: 92, color: '#4CAF50' },
    { name: 'Acceptance Rate', value: 88.5, color: '#2196F3' },
    { name: 'Customer Rating 4+', value: 85, color: '#FF9800' },
    { name: 'Order Accuracy', value: 96, color: '#9C27B0' }
  ];

  const zoneDistribution = [
    { name: 'Central Zone', partners: 45, deliveries: 1250, color: '#0088FE' },
    { name: 'East Zone', partners: 38, deliveries: 980, color: '#00C49F' },
    { name: 'West Zone', partners: 32, deliveries: 850, color: '#FFBB28' },
    { name: 'South Zone', partners: 41, deliveries: 1120, color: '#FF8042' }
  ];

  // Report data
  const reportsData = {
    partnerStatus: [
      { name: 'Active', value: 142, color: '#4CAF50' },
      { name: 'Suspended', value: 6, color: '#F44336' },
      { name: 'Pending', value: 8, color: '#FF9800' }
    ],
    monthlyEarnings: [
      { month: 'Jan', earnings: 4525000 },
      { month: 'Feb', earnings: 4852000 },
      { month: 'Mar', earnings: 5120000 },
      { month: 'Apr', earnings: 4785000 },
      { month: 'May', earnings: 5410000 },
      { month: 'Jun', earnings: 5960000 }
    ],
    sosIncidents: [
      { type: 'Emergency SOS', count: 12 },
      { type: 'Accidents', count: 8 },
      { type: 'Vehicle Issues', count: 15 },
      { type: 'Medical', count: 3 },
      { type: 'Other', count: 5 }
    ],
    performanceMetrics: [
      { metric: 'Avg Delivery Time', current: '28 min', previous: '32 min', change: '+12.5%' },
      { metric: 'Acceptance Rate', current: '88.5%', previous: '85.2%', change: '+3.9%' },
      { metric: 'Customer Rating', current: '4.6', previous: '4.5', change: '+2.2%' },
      { metric: 'On-time Delivery', current: '92%', previous: '89%', change: '+3.4%' }
    ]
  };

  // Reports data for Detailed Reports section
  const detailedReports = [
    {
      id: 1,
      name: 'Partner Performance Report',
      type: 'Monthly',
      filename: 'performance_jan_2024.pdf',
      icon: HiDocumentReport,
      status: 'approved'
    },
    {
      id: 2,
      name: 'Financial Summary',
      type: 'Monthly',
      filename: 'earnings_summary_jan_2024.pdf',
      icon: HiCash,
      status: 'approved'
    },
    {
      id: 3,
      name: 'SOS Incidents Report',
      type: 'Weekly',
      filename: 'sos_report_week_4.pdf',
      icon: HiShieldExclamation,
      status: 'pending'
    }
  ];

  // Documents data
  const documentsData = [
    {
      id: 1,
      name: 'Driving License',
      status: 'verified',
      file: 'license_123456.pdf',
      expiry: '2025-12-31',
      uploaded: '2024-01-15'
    },
    {
      id: 2,
      name: 'Aadhar Card',
      status: 'verified',
      file: 'aadhar_789012.pdf',
      expiry: null,
      uploaded: '2024-01-15'
    },
    {
      id: 3,
      name: 'Vehicle RC',
      status: 'pending',
      file: 'rc_456789.pdf',
      expiry: '2024-06-30',
      uploaded: '2024-01-20'
    },
    {
      id: 4,
      name: 'Police Verification',
      status: 'missing',
      file: null,
      expiry: null,
      uploaded: null
    }
  ];

  // Expiring documents data
  const expiringDocuments = [
    { partner: 'Rahul Sharma', document: 'Driving License', expiry: '2024-02-15', daysLeft: 23 },
    { partner: 'Vikram Singh', document: 'Vehicle Insurance', expiry: '2024-02-28', daysLeft: 36 },
    { partner: 'Sunil Kumar', document: 'Pollution Certificate', expiry: '2024-03-10', daysLeft: 47 }
  ];

  // Delivery Partners Data
  const [pendingPartners, setPendingPartners] = useState([
    {
      id: 'DP001',
      name: 'Rahul Sharma',
      phone: '+91 9876543210',
      vehicle: 'Motorcycle',
      license: 'DL-1234567890',
      aadhar: 'XXXX-XXXX-1234',
      submitted: '2024-01-23',
      status: 'pending',
      documents: documentsData,
      experience: '2 years',
      zone: 'Central Zone',
      expectedEarnings: '₹25,000/month'
    },
    {
      id: 'DP002',
      name: 'Vikram Singh',
      phone: '+91 9876543211',
      vehicle: 'Scooter',
      license: 'DL-0987654321',
      aadhar: 'XXXX-XXXX-5678',
      submitted: '2024-01-22',
      status: 'pending',
      documents: documentsData,
      experience: '1 year',
      zone: 'East Zone',
      expectedEarnings: '₹20,000/month'
    },
    {
      id: 'DP003',
      name: 'Sunil Kumar',
      phone: '+91 9876543212',
      vehicle: 'Bicycle',
      license: 'DL-1122334455',
      aadhar: 'XXXX-XXXX-9012',
      submitted: '2024-01-21',
      status: 'pending',
      documents: documentsData,
      experience: '6 months',
      zone: 'West Zone',
      expectedEarnings: '₹15,000/month'
    }
  ]);

  const [activePartners, setActivePartners] = useState([
    {
      id: 'DP101',
      name: 'Amit Kumar',
      phone: '+91 9876543213',
      email: 'amit.kumar@email.com',
      vehicle: 'Motorcycle',
      license: 'DL-5566778899',
      aadhar: 'XXXX-XXXX-3456',
      joined: '2024-01-10',
      rating: 4.8,
      totalDeliveries: 245,
      todaysDeliveries: 12,
      totalEarnings: 485000,
      todaysEarnings: 2450,
      status: 'active',
      availability: 'online',
      dutyStatus: 'on-duty',
      zone: 'Central Zone',
      experience: '3 years',
      acceptanceRate: 92,
      onTimeRate: 94,
      avgDeliveryTime: '26 min',
      lastActive: '2024-01-23 16:45',
      location: 'Koramangala, Bangalore',
      walletBalance: 12500,
      performanceScore: 95,
      emergencyContacts: ['+91 9876540000', '+91 9876541111'],
      documents: documentsData
    },
    {
      id: 'DP102',
      name: 'Rajesh Patel',
      phone: '+91 9876543214',
      email: 'rajesh.patel@email.com',
      vehicle: 'Scooter',
      license: 'DL-6677889900',
      aadhar: 'XXXX-XXXX-7890',
      joined: '2024-01-08',
      rating: 4.6,
      totalDeliveries: 189,
      todaysDeliveries: 8,
      totalEarnings: 378000,
      todaysEarnings: 1850,
      status: 'active',
      availability: 'online',
      dutyStatus: 'on-duty',
      zone: 'East Zone',
      experience: '2 years',
      acceptanceRate: 88,
      onTimeRate: 90,
      avgDeliveryTime: '32 min',
      lastActive: '2024-01-23 15:20',
      location: 'Indiranagar, Bangalore',
      walletBalance: 8500,
      performanceScore: 88,
      emergencyContacts: ['+91 9876542222'],
      documents: documentsData
    },
    {
      id: 'DP103',
      name: 'Suresh Reddy',
      phone: '+91 9876543215',
      email: 'suresh.reddy@email.com',
      vehicle: 'Motorcycle',
      license: 'DL-7788990011',
      aadhar: 'XXXX-XXXX-2345',
      joined: '2024-01-05',
      rating: 4.9,
      totalDeliveries: 312,
      todaysDeliveries: 15,
      totalEarnings: 624000,
      todaysEarnings: 3120,
      status: 'active',
      availability: 'online',
      dutyStatus: 'on-duty',
      zone: 'South Zone',
      experience: '4 years',
      acceptanceRate: 95,
      onTimeRate: 96,
      avgDeliveryTime: '24 min',
      lastActive: '2024-01-23 17:30',
      location: 'Whitefield, Bangalore',
      walletBalance: 18500,
      performanceScore: 98,
      emergencyContacts: ['+91 9876543333', '+91 9876544444'],
      documents: documentsData
    },
    {
      id: 'DP104',
      name: 'Anil Verma',
      phone: '+91 9876543216',
      email: 'anil.verma@email.com',
      vehicle: 'Bicycle',
      license: 'DL-8899001122',
      aadhar: 'XXXX-XXXX-6789',
      joined: '2024-01-02',
      rating: 4.4,
      totalDeliveries: 156,
      todaysDeliveries: 6,
      totalEarnings: 312000,
      todaysEarnings: 1560,
      status: 'active',
      availability: 'offline',
      dutyStatus: 'off-duty',
      zone: 'West Zone',
      experience: '1 year',
      acceptanceRate: 82,
      onTimeRate: 85,
      avgDeliveryTime: '35 min',
      lastActive: '2024-01-23 12:15',
      location: 'Jayanagar, Bangalore',
      walletBalance: 6500,
      performanceScore: 82,
      emergencyContacts: ['+91 9876545555'],
      documents: documentsData
    }
  ]);

  const [suspendedPartners, setSuspendedPartners] = useState([
    {
      id: 'DP201',
      name: 'Sanjay Gupta',
      phone: '+91 9876543222',
      email: 'sanjay.gupta@email.com',
      vehicle: 'Motorcycle',
      license: 'DL-9900112233',
      aadhar: 'XXXX-XXXX-1235',
      joined: '2023-12-15',
      suspendedDate: '2024-01-18',
      reason: 'License expired and not renewed',
      rating: 3.8,
      totalDeliveries: 89,
      totalEarnings: 178000,
      status: 'suspended',
      zone: 'Central Zone',
      documents: documentsData
    },
    {
      id: 'DP202',
      name: 'Manoj Singh',
      phone: '+91 9876543333',
      email: 'manoj.singh@email.com',
      vehicle: 'Scooter',
      license: 'DL-0011223344',
      aadhar: 'XXXX-XXXX-5679',
      joined: '2023-11-25',
      suspendedDate: '2024-01-10',
      reason: 'Multiple customer complaints about rude behavior',
      rating: 2.5,
      totalDeliveries: 45,
      totalEarnings: 90000,
      status: 'suspended',
      zone: 'East Zone',
      documents: documentsData
    }
  ]);

  // Partner History/Activity
  const partnerHistory = [
    {
      id: 1,
      date: '2024-01-23 16:30',
      partner: 'Amit Kumar',
      action: 'Order Delivered',
      orderId: 'ORD-7842',
      amount: 245,
      status: 'Completed',
      rating: 5
    },
    {
      id: 2,
      date: '2024-01-23 15:45',
      partner: 'Rajesh Patel',
      action: 'Order Picked',
      orderId: 'ORD-7841',
      amount: 185,
      status: 'In Transit',
      rating: null
    },
    {
      id: 3,
      date: '2024-01-23 14:20',
      partner: 'Suresh Reddy',
      action: 'Order Accepted',
      orderId: 'ORD-7840',
      amount: 312,
      status: 'Processing',
      rating: null
    },
    {
      id: 4,
      date: '2024-01-23 13:15',
      partner: 'Amit Kumar',
      action: 'Payment Received',
      amount: 1250,
      status: 'Wallet Updated',
      rating: null
    },
    {
      id: 5,
      date: '2024-01-23 11:30',
      partner: 'Anil Verma',
      action: 'Shift Ended',
      details: 'Completed 6 deliveries',
      amount: 1560,
      status: 'Off Duty',
      rating: null
    }
  ];

  // SOS Alerts
  const [sosAlerts, setSosAlerts] = useState([
    {
      id: 1,
      partner: 'Amit Kumar',
      type: 'SOS Emergency',
      time: '10 minutes ago',
      location: 'Near Koramangala 4th Block',
      status: 'active',
      priority: 'critical',
      partnerPhone: '+91 9876543213',
      locationDetails: 'Near Koramangala Water Tank, Bangalore',
      coordinates: { lat: 12.9352, lng: 77.6245 }
    },
    {
      id: 2,
      partner: 'Rajesh Patel',
      type: 'Accident Report',
      time: '2 hours ago',
      location: 'Indiranagar 100ft Road',
      status: 'resolved',
      priority: 'warning',
      partnerPhone: '+91 9876543214',
      locationDetails: '100ft Road, near Metro Station',
      coordinates: { lat: 12.9784, lng: 77.6408 }
    },
    {
      id: 3,
      partner: 'Sunil Kumar',
      type: 'Vehicle Breakdown',
      time: '3 hours ago',
      location: 'BTM Layout',
      status: 'pending',
      priority: 'info',
      partnerPhone: '+91 9876543212',
      locationDetails: 'Near BTM Lake, 2nd Stage',
      coordinates: { lat: 12.9166, lng: 77.6101 }
    }
  ]);

  // Call timer effect
  useEffect(() => {
    let interval;
    if (modalType === 'callRider' && callStatus === 'connected') {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [modalType, callStatus]);

  // Tracking simulation effect
  useEffect(() => {
    if (isTracking && trackingLocation) {
      const interval = setInterval(() => {
        setTrackingLocation(prev => ({
          ...prev,
          lat: prev.lat + (Math.random() - 0.5) * 0.0001,
          lng: prev.lng + (Math.random() - 0.5) * 0.0001
        }));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isTracking, trackingLocation]);

  // Modal Handlers
  const openModal = (type, data = null) => {
    setModalType(type);
    setModalData(data);
    setShowModal(true);
    
    // Initialize tracking if opening track location
    if (type === 'trackLocation' && data) {
      setIsTracking(true);
      setTrackingLocation(data.coordinates);
    }
    
    // Initialize call if opening call modal
    if (type === 'callRider') {
      setCallStatus('dialing');
      setCallTimer(0);
    }
    
    // Reset form states when opening reject/suspend modals
    if (type === 'reject' || type === 'suspend') {
      setRejectReason('');
      setSuspendReason('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setModalData(null);
    setSelectedPartner(null);
    setActiveDetailTab('verification');
    setIsTracking(false);
    setTrackingLocation(null);
    setCallStatus('dialing');
    setCallTimer(0);
    setRejectReason('');
    setSuspendReason('');
  };

  // SOS Action Handlers
  const handleEmergencyResponse = (alert) => {
    openModal('emergencyResponse', alert);
  };

  const handleCallRider = (alert) => {
    openModal('callRider', alert);
  };

  const handleTrackLocation = (alert) => {
    openModal('trackLocation', alert);
  };

  const handleSOSViewDetails = (alert) => {
    openModal('sosDetails', alert);
  };

  const handleCallPartner = (alert) => {
    openModal('callPartner', alert);
  };

  const handleMarkResolved = (alert) => {
    setSosAlerts(prev => prev.map(a => 
      a.id === alert.id ? { ...a, status: 'resolved' } : a
    ));
    closeModal();
  };

  // Partner Action Handlers
  const handleApprovePartner = (partner) => {
    setPendingPartners(prev => prev.filter(p => p.id !== partner.id));
    const newActivePartner = {
      ...partner,
      status: 'active',
      rating: 4.5,
      totalDeliveries: 0,
      todaysDeliveries: 0,
      totalEarnings: 0,
      todaysEarnings: 0,
      availability: 'offline',
      dutyStatus: 'off-duty',
      acceptanceRate: 0,
      onTimeRate: 0,
      avgDeliveryTime: '0 min',
      lastActive: new Date().toISOString(),
      walletBalance: 0,
      performanceScore: 0
    };
    setActivePartners(prev => [...prev, newActivePartner]);
    
    openModal('approve', partner);
  };

  const handleRejectPartner = (partner) => {
    openModal('reject', partner);
  };

  const confirmRejectPartner = (reason) => {
    if (!reason.trim()) {
      console.log('Please enter a reason for rejection');
      return;
    }
    
    setPendingPartners(prev => prev.filter(p => p.id !== modalData.id));
    closeModal();
  };

  const handleViewDocuments = (partner) => {
    setSelectedPartner(partner);
    setActiveDetailTab('verification');
    openModal('documents', partner);
  };

  const handleViewDetails = (partner) => {
    setSelectedPartner(partner);
    setActiveDetailTab('verification');
    openModal('details', partner);
  };

  const handleEditPartner = (partner) => {
    setSelectedPartner(partner);
    openModal('edit', partner);
  };

  const handleSuspendPartner = (partner) => {
    openModal('suspend', partner);
  };

  const confirmSuspendPartner = (reason) => {
    if (!reason.trim()) {
      console.log('Please enter a reason for suspension');
      return;
    }
    
    const partnerToSuspend = activePartners.find(p => p.id === modalData.id);
    if (partnerToSuspend) {
      setActivePartners(prev => prev.filter(p => p.id !== modalData.id));
      const suspendedPartner = {
        ...partnerToSuspend,
        status: 'suspended',
        suspendedDate: new Date().toISOString().split('T')[0],
        reason: reason
      };
      setSuspendedPartners(prev => [...prev, suspendedPartner]);
    }
    
    closeModal();
  };

  const handleReinstatePartner = (partner) => {
    openModal('reinstate', partner);
  };

  const confirmReinstatePartner = () => {
    const partnerToReinstate = suspendedPartners.find(p => p.id === modalData.id);
    if (partnerToReinstate) {
      setSuspendedPartners(prev => prev.filter(p => p.id !== modalData.id));
      const activePartner = {
        ...partnerToReinstate,
        status: 'active',
        suspendedDate: undefined,
        reason: undefined
      };
      setActivePartners(prev => [...prev, activePartner]);
    }
    
    closeModal();
  };

  const handleDeletePartner = (partner) => {
    openModal('delete', partner);
  };

  const confirmDeletePartner = () => {
    setSuspendedPartners(prev => prev.filter(p => p.id !== modalData.id));
    closeModal();
  };

  const handleExportData = () => {
    openModal('export');
  };

  const handleAddPartner = () => {
    openModal('add');
  };

  const handleReviewExpiringDocs = () => {
    openModal('expiringDocs');
  };

  const handleReviewApplications = () => {
    openModal('applications');
  };

  const handleViewAllActivities = () => {
    openModal('activities');
  };

  // Action Handlers
  const confirmApprovePartner = () => {
    closeModal();
  };

  const confirmExportData = () => {
    console.log(`Data exported successfully as ${exportFormat.toUpperCase()} file!`);
    closeModal();
  };

  const confirmAddPartner = () => {
    setNewPartnerForm({
      name: '',
      phone: '',
      email: '',
      vehicle: 'Motorcycle',
      license: '',
      aadhar: '',
      zone: 'Central Zone',
      experience: '1 year'
    });
    closeModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPartnerForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Document action handlers
  const handleSendReminder = (partnerName, documentName) => {
    console.log(`Reminder sent to ${partnerName} for ${documentName}`);
  };

  const handleViewDocument = (partnerName, documentName) => {
    console.log(`Viewing ${documentName} of ${partnerName}`);
  };

  // Report action handlers - NEW: Fixed View and Download buttons for Detailed Reports
  const handleViewReport = (report) => {
    console.log(`Viewing report: ${report.name}`);
    console.log(`Filename: ${report.filename}`);
    // Here you would typically open the report in a new tab or modal
    // For now, we'll log to console
    openModal('viewReport', report);
  };

  const handleDownloadReport = (report) => {
    console.log(`Downloading report: ${report.name}`);
    console.log(`Filename: ${report.filename}`);
    // Here you would typically trigger a download
    // Create a blob and download link
    const content = `This is the content of ${report.filename}\n\nReport: ${report.name}\nType: ${report.type}\nGenerated: ${new Date().toLocaleString()}`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = report.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGenerateReport = (report) => {
    console.log(`Generating report: ${report.name}`);
    // Simulate report generation
    setTimeout(() => {
      console.log(`Report ${report.name} generated successfully!`);
    }, 1000);
  };

  // Filter function for pending section
  const getFilteredData = () => {
    let data = [];
    switch (activeTab) {
      case 'pending': data = pendingPartners; break;
      case 'active': data = activePartners; break;
      case 'suspended': data = suspendedPartners; break;
      default: data = [];
    }

    if (searchTerm) {
      data = data.filter(partner => 
        partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.phone.includes(searchTerm) ||
        partner.license.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (vehicleFilter !== 'all') {
      data = data.filter(partner => partner.vehicle === vehicleFilter);
    }

    if (statusFilter !== 'all') {
      data = data.filter(partner => partner.status === statusFilter);
    }

    return data;
  };

  // Handle filter button click
  const handleFilter = () => {
    console.log('Filter applied:', { vehicleFilter, statusFilter, dateRange });
  };

  // Call handlers
  const handleAnswerCall = () => {
    setCallStatus('connected');
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      closeModal();
    }, 1000);
  };

  // Tracking handlers
  const handleStartTracking = () => {
    setIsTracking(true);
  };

  const handleStopTracking = () => {
    setIsTracking(false);
  };

  const handleRefreshLocation = () => {
    if (modalData?.coordinates) {
      setTrackingLocation({
        lat: modalData.coordinates.lat + (Math.random() - 0.5) * 0.001,
        lng: modalData.coordinates.lng + (Math.random() - 0.5) * 0.001
      });
    }
  };

  const handleOpenGoogleMaps = () => {
    const location = trackingLocation || modalData?.coordinates;
    if (location) {
      console.log(`Opening Google Maps for coordinates: ${location.lat}, ${location.lng}`);
    }
  };

  const handleShareLocation = () => {
    const location = trackingLocation || modalData?.coordinates;
    if (location && navigator.share) {
      navigator.share({
        title: `${modalData?.partner}'s Location`,
        text: `Location: ${modalData?.locationDetails}`,
        url: `https://maps.google.com/?q=${location.lat},${location.lng}`
      }).catch(error => {
        console.log('Sharing failed:', error);
      });
    } else {
      console.log(`Location link: https://maps.google.com/?q=${location?.lat},${location?.lng}`);
    }
  };

  // Detail tab content renderer
  const renderDetailTabContent = () => {
    switch (activeDetailTab) {
      case 'verification':
        return (
          <div className="verification-section">
            <h4>Verification Documents</h4>
            <div className="document-grid">
              {documentsData.map((doc, index) => (
                <div key={index} className="document-item">
                  <div className="document-header">
                    <h5>{doc.name}</h5>
                    <span className={`document-status ${doc.status}`}>
                      {doc.status}
                    </span>
                  </div>
                  <div className="document-preview">
                    <div className="document-placeholder">
                      <HiDocumentText />
                      <p>{doc.file || 'Not Uploaded'}</p>
                    </div>
                  </div>
                  <div className="document-actions">
                    {doc.file ? (
                      <>
                        <button 
                          className="btn btn-sm btn-outline" 
                          onClick={() => console.log(`Viewing ${doc.file}`)}
                        >
                          View
                        </button>
                        <button 
                          className="btn btn-sm btn-primary" 
                          onClick={() => console.log(`Downloading ${doc.file}`)}
                        >
                          Download
                        </button>
                      </>
                    ) : (
                      <button 
                        className="btn btn-sm btn-outline" 
                        onClick={() => console.log('Request sent to upload document')}
                      >
                        Request Upload
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'performance':
        return (
          <div className="performance-section">
            <h5>Performance Metrics</h5>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-value">{selectedPartner?.totalDeliveries || 0}</div>
                <div className="metric-label">Total Deliveries</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{selectedPartner?.rating || 'N/A'}</div>
                <div className="metric-label">Average Rating</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{selectedPartner?.acceptanceRate || 'N/A'}%</div>
                <div className="metric-label">Acceptance Rate</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{selectedPartner?.onTimeRate || 'N/A'}%</div>
                <div className="metric-label">On-Time Rate</div>
              </div>
            </div>
          </div>
        );

      case 'earnings':
        return (
          <div className="details-section">
            <h5>Earnings Details</h5>
            <div className="info-grid">
              <div className="info-item">
                <label>Total Earnings</label>
                <span className="text-success font-bold">₹{selectedPartner?.totalEarnings?.toLocaleString() || '0'}</span>
              </div>
              <div className="info-item">
                <label>Today's Earnings</label>
                <span className="text-success font-bold">₹{selectedPartner?.todaysEarnings?.toLocaleString() || '0'}</span>
              </div>
              <div className="info-item">
                <label>Wallet Balance</label>
                <span className="text-info font-bold">₹{selectedPartner?.walletBalance?.toLocaleString() || '0'}</span>
              </div>
              <div className="info-item">
                <label>Expected Monthly</label>
                <span className="text-warning font-bold">{selectedPartner?.expectedEarnings || '₹0/month'}</span>
              </div>
            </div>
          </div>
        );

      case 'deliveryHistory':
        return (
          <div className="details-section">
            <h5>Delivery History</h5>
            <div className="card mt-3">
              <Table
                columns={[
                  { key: 'date', label: 'Date & Time' },
                  { key: 'action', label: 'Action' },
                  { key: 'orderId', label: 'Order ID' },
                  { key: 'amount', label: 'Amount' },
                  { key: 'status', label: 'Status' }
                ]}
                data={partnerHistory.filter(h => h.partner === selectedPartner?.name)}
                emptyMessage="No delivery history found"
              />
            </div>
          </div>
        );

      case 'emergencyContacts':
        return (
          <div className="details-section">
            <h5>Emergency Contacts</h5>
            <div className="info-grid">
              {selectedPartner?.emergencyContacts?.map((contact, index) => (
                <div key={index} className="info-item">
                  <label>Contact {index + 1}</label>
                  <span>{contact}</span>
                </div>
              )) || (
                <div className="info-item">
                  <label>No emergency contacts</label>
                  <span className="text-soft">Not provided</span>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Table columns
  const columns = {
    pending: [
      { key: 'name', label: 'Name' },
      { key: 'phone', label: 'Phone' },
      { key: 'vehicle', label: 'Vehicle Type' },
      { key: 'license', label: 'License No.' },
      { 
        key: 'submitted', 
        label: 'Submitted On',
        render: (date) => new Date(date).toLocaleDateString()
      },
      {
        key: 'documents',
        label: 'Documents',
        render: (docs) => `${docs.length} files`
      },
      {
        key: 'expectedEarnings',
        label: 'Est. Monthly',
        render: (earnings) => (
          <span className="earnings-amount">
            <HiCurrencyRupee /> {earnings}
          </span>
        )
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, partner) => (
          <div className="action-buttons">
            <button 
              className="btn btn-sm btn-success"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleApprovePartner(partner);
              }}
            >
              <HiCheckCircle /> Approve
            </button>
            <button 
              className="btn btn-sm btn-error"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRejectPartner(partner);
              }}
            >
              <HiXCircle /> Reject
            </button>
            <button 
              className="btn btn-sm btn-outline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleViewDocuments(partner);
              }}
            >
              <HiDocumentText /> Docs
            </button>
          </div>
        )
      }
    ],
    active: [
      { key: 'name', label: 'Name' },
      { key: 'phone', label: 'Phone' },
      { key: 'vehicle', label: 'Vehicle' },
      { key: 'totalDeliveries', label: 'Total Deliveries' },
      { 
        key: 'todaysEarnings', 
        label: "Today's Earnings",
        render: (earnings) => (
          <span className="earnings-amount">
            <HiCurrencyRupee /> {earnings.toLocaleString()}
          </span>
        )
      },
      { 
        key: 'rating', 
        label: 'Rating',
        render: (rating) => (
          <div className="partner-rating">
            <HiStar />
            <span>{rating}</span>
          </div>
        )
      },
      { 
        key: 'dutyStatus', 
        label: 'Duty Status',
        render: (status) => (
          <span className={`duty-badge duty-${status}`}>
            {status === 'on-duty' ? '🟢 On Duty' : '⚫ Off Duty'}
          </span>
        )
      },
      { 
        key: 'performanceScore', 
        label: 'Performance',
        render: (score) => (
          <span className={`performance-badge ${score >= 90 ? 'excellent' : score >= 80 ? 'good' : 'average'}`}>
            {score}%
          </span>
        )
      },
      { 
        key: 'lastActive', 
        label: 'Last Active',
        render: (date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, partner) => (
          <div className="action-buttons">
            <button 
              className="btn btn-sm btn-outline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleViewDetails(partner);
              }}
            >
              <HiEye /> View
            </button>
            <button 
              className="btn btn-sm btn-warning"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleEditPartner(partner);
              }}
            >
              <HiPencil /> Edit
            </button>
            <button 
              className="btn btn-sm btn-error"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSuspendPartner(partner);
              }}
            >
              <HiXCircle /> Suspend
            </button>
          </div>
        )
      }
    ],
    suspended: [
      { key: 'name', label: 'Name' },
      { key: 'phone', label: 'Phone' },
      { key: 'vehicle', label: 'Vehicle' },
      { key: 'totalDeliveries', label: 'Total Deliveries' },
      { 
        key: 'totalEarnings', 
        label: 'Total Earnings',
        render: (earnings) => `₹${earnings.toLocaleString()}`
      },
      { 
        key: 'suspendedDate', 
        label: 'Suspended On',
        render: (date) => new Date(date).toLocaleDateString()
      },
      { key: 'reason', label: 'Reason' },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, partner) => (
          <div className="action-buttons">
            <button 
              className="btn btn-sm btn-success"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleReinstatePartner(partner);
              }}
            >
              <HiCheckCircle /> Reinstate
            </button>
            <button 
              className="btn btn-sm btn-error"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDeletePartner(partner);
              }}
            >
              <HiTrash /> Delete
            </button>
          </div>
        )
      }
    ]
  };

  // Stats Card Component
  const StatsCard = ({ icon: Icon, title, value, change, color, prefix = '', suffix = '' }) => (
    <div className="stats-card">
      <div className="stats-icon" style={{ backgroundColor: color + '20', color: color }}>
        <Icon />
      </div>
      <div className="stats-content">
        <h3>{prefix}{value}{suffix}</h3>
        <p>{title}</p>
        {change && <span className={`stats-change ${change > 0 ? 'positive' : 'negative'}`}>
          <HiTrendingUp /> {change}% from last month
        </span>}
      </div>
    </div>
  );

  // Dashboard render
  const renderDashboard = () => (
    <>
      <div className="stats-grid">
        <StatsCard 
          icon={HiUsers} 
          title="Total Partners" 
          value={stats.totalPartners} 
          change={8.2}
          color="#0088FE"
        />
        <StatsCard 
          icon={HiTruck} 
          title="Active on Duty" 
          value={stats.onDuty} 
          change={12.5}
          color="#00C49F"
        />
        <StatsCard 
          icon={HiClock} 
          title="Pending Approvals" 
          value={stats.pendingApprovals} 
          color="#FFBB28"
        />
        <StatsCard 
          icon={HiCurrencyRupee} 
          title="Today's Earnings" 
          value={`${(stats.todayEarnings / 1000).toFixed(1)}K`}
          change={15.2}
          color="#FF8042"
          prefix="₹"
        />
        <StatsCard 
          icon={HiStar} 
          title="Average Rating" 
          value={stats.avgRating} 
          color="#8884D8"
        />
        <StatsCard 
          icon={HiClipboardList} 
          title="Today's Deliveries" 
          value={stats.todaysDeliveries} 
          change={9.3}
          color="#82CA9D"
        />
        <StatsCard 
          icon={HiCalendar} 
          title="Avg Delivery Time" 
          value={stats.avgDeliveryTime} 
          change={-8.5}
          color="#FF6B6B"
        />
        <StatsCard 
          icon={HiCash} 
          title="Total Earnings" 
          value={`${(stats.totalEarnings / 1000000).toFixed(1)}M`}
          change={18.5}
          color="#4ECDC4"
          prefix="₹"
        />
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Daily Delivery & Earnings Trend</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={deliveryTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="deliveries" 
                  stackId="1"
                  stroke="#0088FE" 
                  fill="#0088FE"
                  fillOpacity={0.6}
                  name="Deliveries"
                />
                <Area 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="earnings" 
                  stackId="2"
                  stroke="#00C49F" 
                  fill="#00C49F"
                  fillOpacity={0.6}
                  name="Earnings (₹)"
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="online" 
                  stroke="#FF8042"
                  strokeWidth={2}
                  name="Online Partners"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Vehicle Type Distribution</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vehicleDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {vehicleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mid-section">
        <div className="performance-card">
          <h3>Performance Metrics</h3>
          <div className="performance-grid">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="performance-item">
                <div className="performance-progress">
                  <div 
                    className="progress-bar"
                    style={{ 
                      width: `${metric.value}%`,
                      backgroundColor: metric.color
                    }}
                  ></div>
                </div>
                <div className="performance-info">
                  <span className="performance-value">{metric.value}%</span>
                  <span className="performance-label">{metric.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="zone-card">
          <h3>Zone-wise Distribution</h3>
          <div className="zone-list">
            {zoneDistribution.map((zone, index) => (
              <div key={index} className="zone-item">
                <div className="zone-header">
                  <div className="zone-color" style={{ backgroundColor: zone.color }}></div>
                  <span className="zone-name">{zone.name}</span>
                  <span className="zone-partners">{zone.partners} partners</span>
                </div>
                <div className="zone-stats">
                  <span className="zone-deliveries">{zone.deliveries} deliveries</span>
                  <span className="zone-percentage">
                    {((zone.partners / stats.activePartners) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SOS Alerts */}
      <div className="sos-alerts">
        <div className="alert-item critical">
          <HiExclamationCircle />
          <div>
            <strong>SOS Emergency - Amit Kumar</strong>
            <p>Emergency button pressed near Koramangala. Immediate assistance required.</p>
          </div>
          <div className="alert-actions">
            <button 
              className="btn btn-sm btn-error"
              onClick={() => handleEmergencyResponse(sosAlerts[0])}
            >
              <HiShieldExclamation /> Emergency
            </button>
            <button 
              className="btn btn-sm btn-outline"
              onClick={() => handleCallRider(sosAlerts[0])}
            >
              <HiPhone /> Call Rider
            </button>
            <button 
              className="btn btn-sm btn-outline"
              onClick={() => handleTrackLocation(sosAlerts[0])}
            >
              <HiMap /> Track Location
            </button>
          </div>
        </div>
        <div className="alert-item warning">
          <HiExclamationCircle />
          <div>
            <strong>2 Partners with Expiring Documents</strong>
            <p>Driving licenses expiring within 15 days. Action required.</p>
          </div>
          <button 
            className="btn btn-sm btn-outline"
            onClick={handleReviewExpiringDocs}
          >
            Review Now
          </button>
        </div>
        <div className="alert-item info">
          <HiBell />
          <div>
            <strong>3 New Partner Applications</strong>
            <p>Pending review and verification.</p>
          </div>
          <button 
            className="btn btn-sm btn-outline"
            onClick={handleReviewApplications}
          >
            Review Now
          </button>
        </div>
      </div>

      <div className="recent-activity">
        <div className="activity-header">
          <h3>Recent Partner Activity</h3>
          <button 
            className="btn btn-outline btn-sm"
            onClick={handleViewAllActivities}
          >
            View All Activities
          </button>
        </div>
        <div className="card">
          <Table
            columns={[
              { key: 'date', label: 'Date & Time' },
              { key: 'partner', label: 'Partner' },
              { key: 'action', label: 'Action' },
              { key: 'orderId', label: 'Order ID' },
              { 
                key: 'amount', 
                label: 'Amount',
                render: (amount) => amount > 0 ? `₹${amount}` : '-'
              },
              { key: 'status', label: 'Status' },
              { 
                key: 'rating', 
                label: 'Rating',
                render: (rating) => rating ? (
                  <div className="rating-stars">
                    {'★'.repeat(rating)}{'☆'.repeat(5-rating)}
                  </div>
                ) : '-'
              }
            ]}
            data={partnerHistory}
          />
        </div>
      </div>
    </>
  );

  // Reports render - UPDATED with working buttons
  const renderReports = () => (
    <div className="reports-section">
      <div className="stats-grid">
        <StatsCard 
          icon={HiDocumentReport} 
          title="Monthly Report" 
          value="Jan 2024" 
          color="#0088FE"
          suffix=""
        />
        <StatsCard 
          icon={HiUsers} 
          title="Active Partners" 
          value={stats.activePartners} 
          change={12.5}
          color="#00C49F"
        />
        <StatsCard 
          icon={HiCurrencyRupee} 
          title="Monthly Earnings" 
          value={`₹${(stats.totalEarnings / 100000).toFixed(1)}L`}
          change={15.2}
          color="#FF8042"
          prefix=""
        />
        <StatsCard 
          icon={HiShieldExclamation} 
          title="SOS Incidents" 
          value="43" 
          change={-5.3}
          color="#FF6B6B"
        />
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Partner Status Distribution</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reportsData.partnerStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {reportsData.partnerStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Monthly Earnings Trend</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportsData.monthlyEarnings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${(value/1000000).toFixed(1)}M`, 'Earnings']} />
                <Bar dataKey="earnings" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mid-section">
        <div className="performance-card">
          <h3>SOS Incidents by Type</h3>
          <div className="performance-grid">
            {reportsData.sosIncidents.map((incident, index) => (
              <div key={index} className="performance-item">
                <div className="performance-progress">
                  <div 
                    className="progress-bar"
                    style={{ 
                      width: `${(incident.count / 43) * 100}%`,
                      backgroundColor: index % 2 === 0 ? '#0088FE' : '#FF9800'
                    }}
                  ></div>
                </div>
                <div className="performance-info">
                  <span className="performance-value">{incident.count}</span>
                  <span className="performance-label">{incident.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="zone-card">
          <h3>Performance Metrics</h3>
          <div className="zone-list">
            {reportsData.performanceMetrics.map((metric, index) => (
              <div key={index} className="zone-item">
                <div className="zone-header">
                  <span className="zone-name">{metric.metric}</span>
                  <span className={`zone-percentage ${metric.change.includes('+') ? 'positive' : 'negative'}`}>
                    {metric.change}
                  </span>
                </div>
                <div className="zone-stats">
                  <span className="zone-deliveries">Current: {metric.current}</span>
                  <span className="zone-percentage">Previous: {metric.previous}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <div className="activity-header">
          <h3>Detailed Reports</h3>
          <button className="btn btn-primary" onClick={handleExportData}>
            <HiDownload /> Export Report
          </button>
        </div>
        <div className="card">
          <div className="document-grid">
            {detailedReports.map((report) => (
              <div key={report.id} className="document-item">
                <div className="document-header">
                  <h5>{report.name}</h5>
                  <span className={`document-status ${report.status}`}>
                    {report.type}
                  </span>
                </div>
                <div className="document-preview">
                  <div className="document-placeholder">
                    {React.createElement(report.icon, { size: 48 })}
                    <p>{report.filename}</p>
                  </div>
                </div>
                <div className="document-actions">
                  <button 
                    className="btn btn-sm btn-outline" 
                    onClick={() => handleViewReport(report)}
                  >
                    View
                  </button>
                  {report.status === 'pending' ? (
                    <button 
                      className="btn btn-sm btn-success" 
                      onClick={() => handleGenerateReport(report)}
                    >
                      Generate
                    </button>
                  ) : (
                    <button 
                      className="btn btn-sm btn-primary" 
                      onClick={() => handleDownloadReport(report)}
                    >
                      Download
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    if (activeTab === 'dashboard') {
      return renderDashboard();
    }

    if (activeTab === 'reports') {
      return renderReports();
    }

    if (activeTab === 'sos') {
      return (
        <div className="sos-management">
          <div className="sos-stats">
            <div className="sos-stat active">
              <div className="sos-stat-value">1</div>
              <div className="sos-stat-label">Active SOS</div>
            </div>
            <div className="sos-stat resolved">
              <div className="sos-stat-value">1</div>
              <div className="sos-stat-label">Resolved Today</div>
            </div>
            <div className="sos-stat pending">
              <div className="sos-stat-value">1</div>
              <div className="sos-stat-label">Pending</div>
            </div>
          </div>
          
          <div className="sos-list">
            {sosAlerts.map((alert, index) => (
              <div key={index} className={`sos-alert-card ${alert.priority}`}>
                <div className="sos-alert-header">
                  <div className="sos-alert-type">
                    <HiExclamationCircle />
                    <span>{alert.type}</span>
                  </div>
                  <span className="sos-alert-time">{alert.time}</span>
                  <span className={`sos-alert-status ${alert.status}`}>
                    {alert.status}
                  </span>
                </div>
                <div className="sos-alert-body">
                  <div className="sos-alert-partner">
                    <HiUser />
                    <span>{alert.partner}</span>
                  </div>
                  <div className="sos-alert-location">
                    <HiLocationMarker />
                    <span>{alert.location}</span>
                  </div>
                </div>
                <div className="sos-alert-actions">
                  <button 
                    className="btn btn-sm btn-outline"
                    onClick={() => handleSOSViewDetails(alert)}
                  >
                    View Details
                  </button>
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => handleCallPartner(alert)}
                  >
                    Call Partner
                  </button>
                  {alert.status === 'active' && (
                    <button 
                      className="btn btn-sm btn-success"
                      onClick={() => handleMarkResolved(alert)}
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="card">
        <Table
          columns={columns[activeTab]}
          data={getFilteredData()}
          emptyMessage={`No ${activeTab} delivery partners found`}
        />
      </div>
    );
  };

  const getModalTitle = (type) => {
    const titles = {
      export: 'Export Data',
      add: 'Add New Delivery Partner',
      approve: 'Approve Partner',
      reject: 'Reject Application',
      suspend: 'Suspend Partner',
      reinstate: 'Reinstate Partner',
      delete: 'Delete Partner',
      emergencyResponse: 'Emergency Response',
      callRider: 'Call Rider',
      trackLocation: 'Track Location',
      expiringDocs: 'Expiring Documents',
      applications: 'New Applications',
      activities: 'All Activities',
      sosDetails: 'SOS Alert Details',
      markResolved: 'Mark as Resolved',
      callPartner: 'Call Partner',
      documents: 'Partner Documents',
      details: 'Partner Details',
      edit: 'Edit Partner Details',
      viewReport: 'View Report' // Added for report viewing
    };
    return titles[type] || 'Modal';
  };

  const getModalSize = (type) => {
    if (['add', 'details', 'documents', 'edit', 'activities', 'viewReport'].includes(type)) {
      return 'extra-large';
    }
    if (['export', 'applications', 'sosDetails', 'emergencyResponse'].includes(type)) {
      return 'large';
    }
    return 'medium';
  };

  // Modal content renderer
  const renderModalContent = () => {
    switch (modalType) {
      case 'export':
        return (
          <div className="modal-export">
            <div className="modal-header">
              <HiCloudDownload className="modal-icon info" />
              <h3>Export Data</h3>
            </div>
            <p>Select format and data range for export:</p>
            
            <div className="export-options">
              <div className="form-group">
                <label>Format:</label>
                <div className="format-buttons">
                  <button 
                    className={`btn ${exportFormat === 'csv' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setExportFormat('csv')}
                  >
                    CSV
                  </button>
                  <button 
                    className={`btn ${exportFormat === 'excel' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setExportFormat('excel')}
                  >
                    Excel
                  </button>
                  <button 
                    className={`btn ${exportFormat === 'pdf' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setExportFormat('pdf')}
                  >
                    PDF
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <label>Data Range:</label>
                <div className="date-range">
                  <input 
                    type="date" 
                    value={dateRange.start || ''}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    className="form-input"
                  />
                  <span>to</span>
                  <input 
                    type="date" 
                    value={dateRange.end || ''}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Include:</label>
                <div className="include-options">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked /> Partner Details
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked /> Performance Metrics
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked /> Earnings Data
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked /> SOS Incidents
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" /> Analytics Reports
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" /> Documents Info
                  </label>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" onClick={confirmExportData}>
                <HiDownload /> Export Data
              </button>
            </div>
          </div>
        );

      case 'callRider':
        return (
          <div className="modal-call">
            <HiPhoneOutgoing className="modal-icon info" />
            <h3>Call Rider</h3>
            <p>Calling <strong>{modalData?.partner}</strong> at:</p>
            <p className="phone-number">{modalData?.partnerPhone}</p>
            <div className="call-simulator">
              <div className="call-screen">
                <div className="caller-info">
                  <HiUserCircle />
                  <span>{modalData?.partner}</span>
                </div>
                <div className="call-status">
                  {callStatus === 'dialing' ? 'Dialing...' : 
                   callStatus === 'connected' ? 'Connected' : 
                   'Call Ended'}
                </div>
                {callStatus === 'connected' && (
                  <div className="call-timer">
                    {Math.floor(callTimer / 60).toString().padStart(2, '0')}:
                    {(callTimer % 60).toString().padStart(2, '0')}
                  </div>
                )}
              </div>
            </div>
            <div className="call-controls">
              {callStatus === 'dialing' && (
                <button className="btn btn-success" onClick={handleAnswerCall}>
                  <HiPhoneIncoming /> Answer
                </button>
              )}
              <button className="btn btn-error" onClick={handleEndCall}>
                <HiOutlineX /> End Call
              </button>
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        );

      case 'trackLocation':
        const currentLocation = trackingLocation || modalData?.coordinates;
        return (
          <div className="modal-location">
            <HiMap className="modal-icon info" />
            <h3>Track Location</h3>
            <p>Tracking <strong>{modalData?.partner}</strong></p>
            <p className="location-details">{modalData?.locationDetails}</p>
            <div className="map-simulator">
              <div className="map-container">
                <div className="map-marker">
                  <HiLocationMarker />
                </div>
                <div className="map-street">{modalData?.location}</div>
                <div className="map-coordinates">
                  Lat: {currentLocation?.lat.toFixed(6)}, Lng: {currentLocation?.lng.toFixed(6)}
                </div>
                <div className="map-zoom-controls">
                  <button className="btn-icon">+</button>
                  <button className="btn-icon">-</button>
                </div>
              </div>
            </div>
            <div className="tracking-actions">
              <button className="btn btn-outline" onClick={handleOpenGoogleMaps}>
                <HiMap /> Open in Google Maps
              </button>
              <button className="btn btn-primary" onClick={handleRefreshLocation}>
                <HiRefresh /> Refresh Location
              </button>
              <button className="btn btn-success" onClick={handleShareLocation}>
                <HiShare /> Share Location
              </button>
              {isTracking ? (
                <button className="btn btn-error" onClick={handleStopTracking}>
                  Stop Tracking
                </button>
              ) : (
                <button className="btn btn-warning" onClick={handleStartTracking}>
                  Start Tracking
                </button>
              )}
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        );

      case 'documents':
      case 'details':
        return (
          <div className="partner-details-modal">
            <div className="partner-header">
              <div className="partner-avatar">
                {selectedPartner?.name.charAt(0)}
              </div>
              <div className="partner-info">
                <h2>{selectedPartner?.name}</h2>
                <p className="partner-phone">{selectedPartner?.phone}</p>
                <div className="partner-stats">
                  {selectedPartner?.rating && (
                    <span className="stat-item">
                      <HiStar /> Rating: {selectedPartner?.rating || 'N/A'}
                    </span>
                  )}
                  <span className="stat-item">
                    <HiTruck /> Vehicle: {selectedPartner?.vehicle}
                  </span>
                  <span className="stat-item">
                    <HiLocationMarker /> Zone: {selectedPartner?.zone || 'N/A'}
                  </span>
                  {selectedPartner?.totalEarnings && (
                    <span className="stat-item">
                      <HiCurrencyRupee /> Earnings: ₹{selectedPartner?.totalEarnings?.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="tabs-section">
              <div className="detail-tabs">
                <button 
                  className={`detail-tab ${activeDetailTab === 'verification' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('verification')}
                >
                  <HiShieldCheck /> Verification
                </button>
                <button 
                  className={`detail-tab ${activeDetailTab === 'performance' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('performance')}
                >
                  <HiChartBar /> Performance
                </button>
                <button 
                  className={`detail-tab ${activeDetailTab === 'earnings' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('earnings')}
                >
                  <HiCurrencyRupee /> Earnings
                </button>
                <button 
                  className={`detail-tab ${activeDetailTab === 'deliveryHistory' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('deliveryHistory')}
                >
                  <HiClipboardList /> Delivery History
                </button>
                <button 
                  className={`detail-tab ${activeDetailTab === 'emergencyContacts' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('emergencyContacts')}
                >
                  <HiPhone /> Emergency Contacts
                </button>
              </div>

              <div className="tab-content">
                {renderDetailTabContent()}

                <div className="verification-actions">
                  {selectedPartner?.status === 'pending' ? (
                    <>
                      <button 
                        className="btn btn-error"
                        onClick={() => handleRejectPartner(selectedPartner)}
                      >
                        <HiXCircle /> Reject Application
                      </button>
                      <button 
                        className="btn btn-success"
                        onClick={() => handleApprovePartner(selectedPartner)}
                      >
                        <HiCheckCircle /> Approve Partner
                      </button>
                    </>
                  ) : selectedPartner?.status === 'suspended' ? (
                    <button 
                      className="btn btn-success"
                      onClick={() => handleReinstatePartner(selectedPartner)}
                    >
                      <HiCheckCircle /> Reinstate Partner
                    </button>
                  ) : (
                    <>
                      <button 
                        className="btn btn-warning"
                        onClick={() => handleSuspendPartner(selectedPartner)}
                      >
                        <HiXCircle /> Suspend Partner
                      </button>
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleEditPartner(selectedPartner)}
                      >
                        <HiPencil /> Edit Details
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'approve':
        return (
          <div className="modal-confirm">
            <HiCheckCircle className="modal-icon success" />
            <h3>Approve Partner</h3>
            <p>Are you sure you want to approve {modalData?.name} as a delivery partner?</p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button className="btn btn-success" onClick={confirmApprovePartner}>
                <HiCheckCircle /> Yes, Approve
              </button>
            </div>
          </div>
        );

      case 'reject':
        return (
          <div className="modal-reject">
            <HiXCircle className="modal-icon error" />
            <h3>Reject Application</h3>
            <p>Please provide a reason for rejecting {modalData?.name}'s application:</p>
            <textarea
              className="reject-reason"
              placeholder="Enter rejection reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button 
                className="btn btn-error" 
                onClick={() => confirmRejectPartner(rejectReason)}
              >
                <HiXCircle /> Reject Application
              </button>
            </div>
          </div>
        );

      case 'suspend':
        return (
          <div className="modal-reject">
            <HiXCircle className="modal-icon warning" />
            <h3>Suspend Partner</h3>
            <p>Please provide a reason for suspending {modalData?.name}:</p>
            <textarea
              className="reject-reason"
              placeholder="Enter suspension reason..."
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
            />
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button 
                className="btn btn-error" 
                onClick={() => confirmSuspendPartner(suspendReason)}
              >
                <HiXCircle /> Suspend Partner
              </button>
            </div>
          </div>
        );

      case 'reinstate':
        return (
          <div className="modal-confirm">
            <HiCheckCircle className="modal-icon success" />
            <h3>Reinstate Partner</h3>
            <p>Are you sure you want to reinstate {modalData?.name} as an active delivery partner?</p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button className="btn btn-success" onClick={confirmReinstatePartner}>
                <HiCheckCircle /> Yes, Reinstate
              </button>
            </div>
          </div>
        );

      case 'delete':
        return (
          <div className="modal-confirm">
            <HiTrash className="modal-icon error" />
            <h3>Delete Partner</h3>
            <p>Are you sure you want to permanently delete {modalData?.name}? This action cannot be undone.</p>
            <div className="warning-text">
              <HiExclamationCircle /> Warning: All partner data will be permanently deleted.
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button className="btn btn-error" onClick={confirmDeletePartner}>
                <HiTrash /> Yes, Delete Permanently
              </button>
            </div>
          </div>
        );

      case 'emergencyResponse':
        return (
          <div className="modal-sos">
            <HiShieldExclamation className="modal-icon critical" />
            <h3>Emergency Response Required!</h3>
            <div className="sos-info">
              <p><strong>Partner:</strong> {modalData?.partner}</p>
              <p><strong>Location:</strong> {modalData?.locationDetails}</p>
              <p><strong>Time:</strong> {modalData?.time}</p>
              <p><strong>Emergency Contact:</strong> {modalData?.partnerPhone}</p>
            </div>
            <div className="emergency-actions">
              <button 
                className="btn btn-error" 
                onClick={() => console.log('Emergency services alerted!')}
              >
                <HiShieldExclamation /> Alert Emergency Services
              </button>
              <button 
                className="btn btn-warning" 
                onClick={() => handleCallRider(modalData)}
              >
                <HiPhone /> Call Partner Immediately
              </button>
              <button 
                className="btn btn-info" 
                onClick={() => handleTrackLocation(modalData)}
              >
                <HiMap /> Track Real-time Location
              </button>
              <button 
                className="btn btn-success" 
                onClick={() => handleMarkResolved(modalData)}
              >
                <HiCheckCircle /> Mark as Resolved
              </button>
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        );

      case 'sosDetails':
        return (
          <div className="modal-sos-details">
            <h3>SOS Alert Details</h3>
            <div className="sos-details-grid">
              <div className="detail-item">
                <label>Alert Type</label>
                <span>{modalData?.type}</span>
              </div>
              <div className="detail-item">
                <label>Partner</label>
                <span>{modalData?.partner}</span>
              </div>
              <div className="detail-item">
                <label>Time</label>
                <span>{modalData?.time}</span>
              </div>
              <div className="detail-item">
                <label>Status</label>
                <span className={`status-badge status-${modalData?.status}`}>
                  {modalData?.status}
                </span>
              </div>
              <div className="detail-item">
                <label>Location</label>
                <span>{modalData?.location}</span>
              </div>
              <div className="detail-item">
                <label>Contact</label>
                <span>{modalData?.partnerPhone}</span>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Close</button>
              <button className="btn btn-primary" onClick={() => handleCallPartner(modalData)}>
                <HiPhone /> Call Partner
              </button>
              {modalData?.status === 'active' && (
                <button className="btn btn-success" onClick={() => handleMarkResolved(modalData)}>
                  <HiCheckCircle /> Mark Resolved
                </button>
              )}
            </div>
          </div>
        );

      case 'expiringDocs':
        return (
          <div className="modal-expiring-docs">
            <h3>Expiring Documents</h3>
            <p>Documents expiring within the next 60 days:</p>
            <div className="documents-list">
              {expiringDocuments.map((doc, index) => (
                <div key={index} className="document-item">
                  <div className="doc-header">
                    <strong>{doc.partner}</strong>
                    <span className="days-left">{doc.daysLeft} days left</span>
                  </div>
                  <div className="doc-details">
                    <span>{doc.document}</span>
                    <span>Expires: {new Date(doc.expiry).toLocaleDateString()}</span>
                  </div>
                  <div className="app-actions">
                    <button 
                      className="btn btn-sm btn-outline" 
                      onClick={() => handleSendReminder(doc.partner, doc.document)}
                    >
                      Send Reminder
                    </button>
                    <button 
                      className="btn btn-sm btn-warning" 
                      onClick={() => handleViewDocument(doc.partner, doc.document)}
                    >
                      View Document
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        );

      case 'applications':
        return (
          <div className="modal-applications">
            <h3>New Partner Applications ({pendingPartners.length})</h3>
            <div className="applications-list">
              {pendingPartners.map((partner, index) => (
                <div key={index} className="application-item">
                  <div className="app-header">
                    <strong>{partner.name}</strong>
                    <span className="app-date">Applied: {new Date(partner.submitted).toLocaleDateString()}</span>
                  </div>
                  <div className="app-details">
                    <span>{partner.phone}</span>
                    <span>{partner.vehicle}</span>
                    <span>{partner.zone}</span>
                  </div>
                  <div className="app-actions">
                    <button 
                      className="btn btn-sm btn-success"
                      onClick={() => handleApprovePartner(partner)}
                    >
                      Approve
                    </button>
                    <button 
                      className="btn btn-sm btn-outline"
                      onClick={() => handleViewDocuments(partner)}
                    >
                      Review Docs
                    </button>
                    <button 
                      className="btn btn-sm btn-error"
                      onClick={() => handleRejectPartner(partner)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        );

      case 'activities':
        return (
          <div className="modal-activities">
            <h3>All Partner Activities</h3>
            <div className="activities-table">
              <Table
                columns={[
                  { key: 'date', label: 'Date & Time' },
                  { key: 'partner', label: 'Partner' },
                  { key: 'action', label: 'Action' },
                  { key: 'orderId', label: 'Order ID' },
                  { key: 'amount', label: 'Amount' },
                  { key: 'status', label: 'Status' },
                  { key: 'rating', label: 'Rating' }
                ]}
                data={[...partnerHistory, ...partnerHistory.slice(0, 10)]}
                emptyMessage="No activities found"
              />
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={closeModal}>Close</button>
              <button className="btn btn-primary" onClick={handleExportData}>
                <HiDownload /> Export Activities
              </button>
            </div>
          </div>
        );

      case 'viewReport':
        return (
          <div className="modal-view-report">
            <h3>View Report</h3>
            <div className="report-details">
              <p><strong>Report Name:</strong> {modalData?.name}</p>
              <p><strong>Filename:</strong> {modalData?.filename}</p>
              <p><strong>Type:</strong> {modalData?.type}</p>
              <p><strong>Status:</strong> {modalData?.status}</p>
              <p><strong>Generated:</strong> {new Date().toLocaleDateString()}</p>
            </div>
            <div className="report-preview">
              <h4>Report Preview</h4>
              <div className="preview-content">
                <p>This is a preview of the {modalData?.name}.</p>
                <p>The report contains detailed analytics and statistics.</p>
                <p>You can download the complete report using the Download button.</p>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Close</button>
              <button className="btn btn-primary" onClick={() => handleDownloadReport(modalData)}>
                <HiDownload /> Download Report
              </button>
            </div>
          </div>
        );

      case 'add':
        return (
          <div className="modal-add-partner">
            <h3>Add New Delivery Partner</h3>
            <form onSubmit={(e) => { e.preventDefault(); confirmAddPartner(); }}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={newPartnerForm.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter full name"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={newPartnerForm.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+91 9876543210"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={newPartnerForm.email}
                    onChange={handleInputChange}
                    placeholder="partner@email.com"
                  />
                </div>
                <div className="form-group">
                  <label>Vehicle Type *</label>
                  <select
                    name="vehicle"
                    value={newPartnerForm.vehicle}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Bicycle">Bicycle</option>
                    <option value="Car">Car</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Driving License *</label>
                  <input
                    type="text"
                    name="license"
                    value={newPartnerForm.license}
                    onChange={handleInputChange}
                    required
                    placeholder="DL-1234567890"
                  />
                </div>
                <div className="form-group">
                  <label>Aadhar Number *</label>
                  <input
                    type="text"
                    name="aadhar"
                    value={newPartnerForm.aadhar}
                    onChange={handleInputChange}
                    required
                    placeholder="XXXX-XXXX-1234"
                  />
                </div>
                <div className="form-group">
                  <label>Zone *</label>
                  <select
                    name="zone"
                    value={newPartnerForm.zone}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Central Zone">Central Zone</option>
                    <option value="East Zone">East Zone</option>
                    <option value="West Zone">West Zone</option>
                    <option value="South Zone">South Zone</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Experience *</label>
                  <select
                    name="experience"
                    value={newPartnerForm.experience}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="1 year">1 year</option>
                    <option value="2 years">2 years</option>
                    <option value="3 years">3 years</option>
                    <option value="4+ years">4+ years</option>
                  </select>
                </div>
              </div>
              <div className="form-section">
                <h4>Additional Information</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Emergency Contact</label>
                    <input
                      type="tel"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred Working Hours</label>
                    <select>
                      <option value="morning">Morning (6 AM - 2 PM)</option>
                      <option value="afternoon">Afternoon (2 PM - 10 PM)</option>
                      <option value="night">Night (10 PM - 6 AM)</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-success">
                  <HiCheckCircle /> Add Partner
                </button>
              </div>
            </form>
          </div>
        );

      case 'edit':
        return (
          <div className="modal-edit-partner">
            <h3>Edit Partner Details</h3>
            <p>Editing details for {selectedPartner?.name}</p>
            <div className="form-grid">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  defaultValue={selectedPartner?.phone}
                  placeholder="Phone number"
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  defaultValue={selectedPartner?.email}
                  placeholder="Email address"
                />
              </div>
              <div className="form-group">
                <label>Vehicle Type</label>
                <select defaultValue={selectedPartner?.vehicle}>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Scooter">Scooter</option>
                  <option value="Bicycle">Bicycle</option>
                  <option value="Car">Car</option>
                </select>
              </div>
              <div className="form-group">
                <label>Zone</label>
                <select defaultValue={selectedPartner?.zone}>
                  <option value="Central Zone">Central Zone</option>
                  <option value="East Zone">East Zone</option>
                  <option value="West Zone">West Zone</option>
                  <option value="South Zone">South Zone</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" onClick={() => console.log('Details updated!')}>
                <HiCheckCircle /> Save Changes
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="modal-default">
            <h3>{getModalTitle(modalType)}</h3>
            <p>This is a default modal content.</p>
            <div className="modal-actions">
              <button className="btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="delivery-partner-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Delivery Partner Super Admin</h1>
          <p>Manage delivery partners, monitor performance, and oversee delivery operations</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={handleExportData}>
            <HiDownload /> Export Data
          </button>
          <button className="btn btn-primary" onClick={handleAddPartner}>
            <HiPlus /> Add New Partner
          </button>
        </div>
      </div>

      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <HiChartPie /> Dashboard
        </button>
        <button 
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          <HiClock /> Pending ({pendingPartners.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          <HiTruck /> Active ({activePartners.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'suspended' ? 'active' : ''}`}
          onClick={() => setActiveTab('suspended')}
        >
          <HiXCircle /> Suspended ({suspendedPartners.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'sos' ? 'active' : ''}`}
          onClick={() => setActiveTab('sos')}
        >
          <HiExclamationCircle /> SOS Alerts ({sosAlerts.filter(a => a.status === 'active').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          <HiDocumentText /> Reports
        </button>
      </div>

      {activeTab !== 'dashboard' && activeTab !== 'sos' && activeTab !== 'reports' && (
        <div className="management-toolbar">
          <div className="toolbar-left">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search partners by name, phone or license..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <HiSearch className="search-icon" />
            </div>
            <div className="filter-options">
              <select 
                className="select-input"
                value={vehicleFilter}
                onChange={(e) => setVehicleFilter(e.target.value)}
              >
                <option value="all">All Vehicle Types</option>
                <option value="Motorcycle">Motorcycle</option>
                <option value="Scooter">Scooter</option>
                <option value="Bicycle">Bicycle</option>
                <option value="Car">Car</option>
              </select>
              
              <div className="simple-date-input">
                <HiCalendar className="date-icon" />
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  placeholder="Start Date"
                  className="date-input-field"
                />
              </div>
              
              <div className="simple-date-input">
                <HiCalendar className="date-icon" />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  placeholder="End Date"
                  className="date-input-field"
                />
              </div>
              
              <button className="btn btn-outline" onClick={handleFilter}>
                <HiFilter /> Filter
              </button>
            </div>
          </div>
          <div className="toolbar-right">
            <span className="results-count">
              Showing {getFilteredData().length} of {getFilteredData().length} results
            </span>
          </div>
        </div>
      )}

      {renderTabContent()}

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

export default DeliveryPartnerManagement;