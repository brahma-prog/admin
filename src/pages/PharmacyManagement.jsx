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
  HiShoppingBag,
  HiLocationMarker,
  HiPhone,
  HiMail,
  HiChartBar,
  HiCreditCard,
  HiShieldCheck,
  HiExclamationCircle,
  HiArchive,
  HiTag,
  HiTruck,
  HiReceiptTax,
  HiBell,
  HiCash,
  HiCollection,
  HiChartPie,
  HiShoppingCart,
  HiExclamation,
  HiPrinter,
  HiDocumentReport,
  HiDatabase,
  HiSearch,
  HiPaperClip,
  HiDocument,
  HiCheck,
  HiX,
  HiRefresh,
  HiUserCircle,
  HiOfficeBuilding
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
import SearchBar from '../components/common/SearchBar';
import './PharmacyManagement.css';

const PharmacyManagement = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [pharmacyTypeFilter, setPharmacyTypeFilter] = useState('all');
  const [pharmacies, setPharmacies] = useState({
    pending: [],
    active: [],
    suspended: []
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeDetailTab, setActiveDetailTab] = useState('verification');
  const [exportFormat, setExportFormat] = useState('csv');
  const [newPharmacyForm, setNewPharmacyForm] = useState({
    name: '',
    type: 'retail',
    owner: '',
    email: '',
    phone: '',
    address: '',
    license: '',
    gst: '',
    storeHours: '9:00 AM - 9:00 PM',
    deliveryRadius: '5 km'
  });
  const [suspensionReason, setSuspensionReason] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [documentModalType, setDocumentModalType] = useState('view');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [activeDocumentTab, setActiveDocumentTab] = useState('all');
  const [isSearching, setIsSearching] = useState(false);
  const [approvalModal, setApprovalModal] = useState({ show: false, pharmacy: null });
  const [reinstatementModal, setReinstatementModal] = useState({ show: false, pharmacy: null });

  // Stats state
  const [stats, setStats] = useState({
    totalPharmacies: 156,
    activePharmacies: 142,
    pendingApprovals: 8,
    suspendedPharmacies: 6,
    totalRevenue: 45250000,
    avgRating: 4.7,
    totalOrders: 12450,
    thisMonthGrowth: 12.5,
    totalProducts: 56890,
    activeProducts: 43210,
    totalCustomers: 45200,
    totalCommission: 4525000
  });

  // Initialize data
  useEffect(() => {
    const pendingPharmacies = [
      {
        id: 'PH001',
        name: 'MedPlus Pharmacy',
        type: 'Retail Pharmacy',
        owner: 'Dr. Ramesh Kumar',
        email: 'ramesh@medplus.com',
        phone: '+91 9876543210',
        address: '123 MG Road, Bangalore, Karnataka',
        license: 'DL-PH-12345',
        gst: '29ABCDE1234F1Z5',
        submitted: '2024-01-22',
        documents: [
          { name: 'drug_license.pdf', type: 'Drug License', status: 'verified', uploaded: '2024-01-20', size: '2.4 MB' },
          { name: 'gst_certificate.pdf', type: 'GST Certificate', status: 'verified', uploaded: '2024-01-20', size: '1.8 MB' },
          { name: 'id_proof.pdf', type: 'ID Proof', status: 'pending', uploaded: '2024-01-21', size: '1.2 MB' },
          { name: 'address_proof.pdf', type: 'Address Proof', status: 'missing', uploaded: null, size: null }
        ],
        estimatedRevenue: 2500000,
        productsToAdd: 120,
        storeHours: '8:00 AM - 10:00 PM',
        deliveryRadius: '5 km'
      },
      {
        id: 'PH002',
        name: 'Apollo Pharmacy',
        type: 'Chain Pharmacy',
        owner: 'Dr. Sunita Rao',
        email: 'sunita@apollo.com',
        phone: '+91 8765432109',
        address: '456 Koramangala, Bangalore, Karnataka',
        license: 'KA-PH-67890',
        gst: '29FGHIJ5678G2Y6',
        submitted: '2024-01-21',
        documents: [
          { name: 'drug_license.pdf', type: 'Drug License', status: 'verified', uploaded: '2024-01-19', size: '2.1 MB' },
          { name: 'gst_certificate.pdf', type: 'GST Certificate', status: 'verified', uploaded: '2024-01-19', size: '1.9 MB' },
          { name: 'id_proof.pdf', type: 'ID Proof', status: 'verified', uploaded: '2024-01-20', size: '1.3 MB' }
        ],
        estimatedRevenue: 3200000,
        productsToAdd: 185,
        storeHours: '24/7',
        deliveryRadius: '8 km'
      },
      {
        id: 'PH003',
        name: 'City Med Pharmacy',
        type: 'Retail Pharmacy',
        owner: 'Dr. Arjun Mehta',
        email: 'arjun@citymed.com',
        phone: '+91 7654321098',
        address: '321 Indiranagar, Bangalore, Karnataka',
        license: 'KA-PH-99001',
        gst: '29RSTUV3456N9R4',
        submitted: '2024-01-20',
        documents: [
          { name: 'drug_license.pdf', type: 'Drug License', status: 'pending', uploaded: '2024-01-19', size: '2.2 MB' },
          { name: 'gst_certificate.pdf', type: 'GST Certificate', status: 'missing', uploaded: null, size: null },
          { name: 'id_proof.pdf', type: 'ID Proof', status: 'pending', uploaded: '2024-01-20', size: '1.1 MB' }
        ],
        estimatedRevenue: 1800000,
        productsToAdd: 95,
        storeHours: '7:00 AM - 11:00 PM',
        deliveryRadius: '3 km'
      }
    ];

    const activePharmacies = [
      {
        id: 'PH101',
        name: 'Health Plus Pharmacy',
        type: 'Retail Pharmacy',
        owner: 'Dr. Anil Sharma',
        email: 'anil@healthplus.com',
        phone: '+91 9876543211',
        address: '321 Jayanagar, Bangalore, Karnataka',
        license: 'KA-PH-98765',
        gst: '29PQRST3456I4W8',
        joined: '2024-01-15',
        rating: 4.7,
        status: 'active',
        totalRevenue: 4850000,
        monthlyRevenue: 850000,
        totalOrders: 1560,
        monthlyOrders: 145,
        totalProducts: 320,
        activeProducts: 285,
        commissionRate: 12.5,
        commissionEarned: 485000,
        verified: true,
        performance: 92,
        compliance: 'valid',
        lastActive: '2024-01-20 16:30',
        deliveryStatus: 'active',
        inventoryValue: 1250000,
        customerCount: 1250,
        licenseExpiry: '2024-12-31',
        documents: [
          { name: 'drug_license.pdf', type: 'Drug License', status: 'verified', expiry: '2024-12-31' },
          { name: 'gst_certificate.pdf', type: 'GST Certificate', status: 'verified', expiry: '2025-03-31' }
        ]
      },
      {
        id: 'PH102',
        name: 'Care Pharmacy',
        type: 'Retail Pharmacy',
        owner: 'Dr. Priya Reddy',
        email: 'priya@carepharmacy.com',
        phone: '+91 8765432112',
        address: '654 Whitefield, Bangalore, Karnataka',
        license: 'KA-PH-11223',
        gst: '29UVWXY7890J5V9',
        joined: '2024-01-12',
        rating: 4.5,
        status: 'active',
        totalRevenue: 3250000,
        monthlyRevenue: 620000,
        totalOrders: 1250,
        monthlyOrders: 112,
        totalProducts: 285,
        activeProducts: 245,
        commissionRate: 10.5,
        commissionEarned: 325000,
        verified: true,
        performance: 88,
        compliance: 'expiring',
        lastActive: '2024-01-20 14:15',
        deliveryStatus: 'active',
        inventoryValue: 980000,
        customerCount: 890,
        licenseExpiry: '2024-02-15',
        documents: [
          { name: 'drug_license.pdf', type: 'Drug License', status: 'expiring', expiry: '2024-02-15' },
          { name: 'gst_certificate.pdf', type: 'GST Certificate', status: 'verified', expiry: '2025-01-31' }
        ]
      },
      {
        id: 'PH103',
        name: 'MedicFirst Pharmacy',
        type: 'Online Pharmacy',
        owner: 'Dr. Vikram Singh',
        email: 'vikram@medicfirst.com',
        phone: '+91 7654321123',
        address: '987 Marathahalli, Bangalore, Karnataka',
        license: 'KA-PH-33445',
        gst: '29ZABCD1234K6U1',
        joined: '2024-01-10',
        rating: 4.9,
        status: 'active',
        totalRevenue: 2150000,
        monthlyRevenue: 420000,
        totalOrders: 890,
        monthlyOrders: 85,
        totalProducts: 195,
        activeProducts: 175,
        commissionRate: 9.5,
        commissionEarned: 215000,
        verified: true,
        performance: 95,
        compliance: 'valid',
        lastActive: '2024-01-20 18:45',
        deliveryStatus: 'active',
        inventoryValue: 650000,
        customerCount: 620,
        licenseExpiry: '2025-06-30',
        documents: [
          { name: 'drug_license.pdf', type: 'Drug License', status: 'verified', expiry: '2025-06-30' },
          { name: 'gst_certificate.pdf', type: 'GST Certificate', status: 'verified', expiry: '2025-03-31' }
        ]
      }
    ];

    const suspendedPharmacies = [
      {
        id: 'PH201',
        name: 'Quick Med Pharmacy',
        type: 'Retail Pharmacy',
        owner: 'Dr. Sanjay Gupta',
        email: 'sanjay@quickmed.com',
        phone: '+91 9876543222',
        address: '789 Koramangala, Bangalore, Karnataka',
        license: 'KA-PH-77889',
        gst: '29MNOPQ9012M8S3',
        joined: '2023-12-10',
        suspendedDate: '2024-01-15',
        reason: 'License expired and not renewed',
        rating: 3.8,
        totalRevenue: 1250000,
        totalOrders: 450,
        totalProducts: 120,
        status: 'suspended',
        compliance: 'expired'
      },
      {
        id: 'PH202',
        name: 'City Med Care',
        type: 'Retail Pharmacy',
        owner: 'Dr. Rahul Verma',
        email: 'rahul@citymedcare.com',
        phone: '+91 8765432333',
        address: '147 MG Road, Mumbai, Maharashtra',
        license: 'MH-PH-45678',
        gst: '27ABCDE1234F1Z5',
        joined: '2023-11-20',
        suspendedDate: '2024-01-10',
        reason: 'Multiple customer complaints',
        rating: 3.5,
        totalRevenue: 980000,
        totalOrders: 320,
        totalProducts: 85,
        status: 'suspended',
        compliance: 'invalid'
      }
    ];

    setPharmacies({
      pending: pendingPharmacies,
      active: activePharmacies,
      suspended: suspendedPharmacies
    });
  }, []);

  // Pharmacy performance data for charts
  const pharmacyGrowthData = [
    { month: 'Jan', pharmacies: 120, orders: 850, revenue: 3500000 },
    { month: 'Feb', pharmacies: 128, orders: 920, revenue: 4200000 },
    { month: 'Mar', pharmacies: 135, orders: 880, revenue: 3980000 },
    { month: 'Apr', pharmacies: 142, orders: 1050, revenue: 4850000 },
    { month: 'May', pharmacies: 148, orders: 1120, revenue: 5600000 },
    { month: 'Jun', pharmacies: 156, orders: 1090, revenue: 5200000 }
  ];

  const categoryDistribution = [
    { name: 'Retail Pharmacy', value: 45, color: '#0088FE' },
    { name: 'Hospital Pharmacy', value: 25, color: '#00C49F' },
    { name: 'Chain Pharmacy', value: 18, color: '#FFBB28' },
    { name: 'Online Pharmacy', value: 12, color: '#FF8042' }
  ];

  const revenueTrendData = [
    { day: 'Mon', revenue: 850000, orders: 45 },
    { day: 'Tue', revenue: 920000, orders: 52 },
    { day: 'Wed', revenue: 780000, orders: 41 },
    { day: 'Thu', revenue: 1050000, orders: 58 },
    { day: 'Fri', revenue: 950000, orders: 51 },
    { day: 'Sat', revenue: 880000, orders: 48 },
    { day: 'Sun', revenue: 650000, orders: 35 }
  ];

  // Toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPharmacyForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Export data function
  const handleExport = () => {
    setModalType('export');
    setShowModal(true);
  };

  const performExport = (format) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      showToast(`Data exported successfully in ${format.toUpperCase()} format`, 'success');
      setShowModal(false);
      setLoading(false);
    }, 1500);
  };

  // Add new pharmacy
  const handleAddPharmacy = () => {
    setModalType('add');
    setShowModal(true);
  };

  const submitNewPharmacy = () => {
    if (!newPharmacyForm.name || !newPharmacyForm.owner || !newPharmacyForm.license) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newPharmacy = {
        id: `PH${Date.now()}`,
        ...newPharmacyForm,
        type: newPharmacyForm.type === 'retail' ? 'Retail Pharmacy' :
              newPharmacyForm.type === 'hospital' ? 'Hospital Pharmacy' :
              newPharmacyForm.type === 'chain' ? 'Chain Pharmacy' : 'Online Pharmacy',
        submitted: new Date().toISOString().split('T')[0],
        documents: [
          { name: 'drug_license.pdf', type: 'Drug License', status: 'pending', uploaded: new Date().toISOString().split('T')[0], size: '0 KB' },
          { name: 'gst_certificate.pdf', type: 'GST Certificate', status: 'pending', uploaded: null, size: null },
          { name: 'id_proof.pdf', type: 'ID Proof', status: 'pending', uploaded: null, size: null }
        ],
        estimatedRevenue: 2000000
      };
      
      setPharmacies(prev => ({
        ...prev,
        pending: [newPharmacy, ...prev.pending]
      }));
      
      setStats(prev => ({
        ...prev,
        pendingApprovals: prev.pendingApprovals + 1,
        totalPharmacies: prev.totalPharmacies + 1
      }));
      
      showToast('Pharmacy application submitted successfully!', 'success');
      setShowModal(false);
      setNewPharmacyForm({
        name: '',
        type: 'retail',
        owner: '',
        email: '',
        phone: '',
        address: '',
        license: '',
        gst: '',
        storeHours: '9:00 AM - 9:00 PM',
        deliveryRadius: '5 km'
      });
      setLoading(false);
    }, 2000);
  };

  // View pharmacy details
  const viewPharmacyDetails = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setModalType('details');
    setActiveDetailTab('verification');
    setShowModal(true);
  };

  // View documents for pending pharmacy
  const handleViewDocuments = (pharmacy, e) => {
    e.stopPropagation();
    setSelectedPharmacy(pharmacy);
    setModalType('documents');
    setActiveDocumentTab('all');
    setShowModal(true);
  };

  // Handle document actions
  const handleDocumentAction = (action, document) => {
    setSelectedDocument(document);
    setDocumentModalType(action);
    
    if (action === 'approve') {
      setLoading(true);
      setTimeout(() => {
        // Update document status
        const updatedPharmacy = {
          ...selectedPharmacy,
          documents: selectedPharmacy.documents.map(doc => 
            doc.type === document.type ? { ...doc, status: 'verified' } : doc
          )
        };
        
        // Update pharmacies state
        setPharmacies(prev => ({
          ...prev,
          pending: prev.pending.map(p => 
            p.id === selectedPharmacy.id ? updatedPharmacy : p
          )
        }));
        
        showToast(`${document.type} approved successfully`, 'success');
        setLoading(false);
        setDocumentModalType('view');
        setSelectedPharmacy(updatedPharmacy);
      }, 1000);
    } else if (action === 'reject') {
      setLoading(true);
      setTimeout(() => {
        showToast(`${document.type} rejected`, 'error');
        setLoading(false);
        setDocumentModalType('view');
      }, 1000);
    }
  };

  // Show approval confirmation modal
  const showApprovalConfirmation = (pharmacy) => {
    setApprovalModal({ show: true, pharmacy });
  };

  // Confirm approve pharmacy
  const confirmApprovePharmacy = () => {
    const { pharmacy } = approvalModal;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPharmacies(prev => ({
        ...prev,
        pending: prev.pending.filter(p => p.id !== pharmacy.id),
        active: [{ 
          ...pharmacy, 
          status: 'active', 
          joined: new Date().toISOString().split('T')[0],
          rating: 4.5,
          totalRevenue: pharmacy.estimatedRevenue,
          monthlyRevenue: Math.floor(pharmacy.estimatedRevenue / 12),
          totalOrders: 0,
          monthlyOrders: 0,
          totalProducts: pharmacy.productsToAdd,
          activeProducts: Math.floor(pharmacy.productsToAdd * 0.9),
          commissionRate: 10,
          commissionEarned: 0,
          performance: 85,
          compliance: 'valid',
          lastActive: new Date().toISOString(),
          deliveryStatus: 'active',
          inventoryValue: Math.floor(pharmacy.estimatedRevenue * 0.25),
          customerCount: 0
        }, ...prev.active]
      }));
      
      setStats(prev => ({
        ...prev,
        pendingApprovals: prev.pendingApprovals - 1,
        activePharmacies: prev.activePharmacies + 1
      }));
      
      showToast(`${pharmacy.name} has been approved successfully!`, 'success');
      setApprovalModal({ show: false, pharmacy: null });
      setLoading(false);
    }, 1000);
  };

  // Reject pharmacy
  const showRejectionModal = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setModalType('reject');
    setRejectionReason('');
    setShowModal(true);
  };

  const confirmRejectPharmacy = () => {
    if (!rejectionReason.trim()) {
      showToast('Please provide a reason for rejection', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setPharmacies(prev => ({
        ...prev,
        pending: prev.pending.filter(p => p.id !== selectedPharmacy.id)
      }));
      
      setStats(prev => ({
        ...prev,
        pendingApprovals: prev.pendingApprovals - 1
      }));
      
      showToast(`${selectedPharmacy.name} has been rejected.`, 'error');
      setShowModal(false);
      setModalType(null);
      setSelectedPharmacy(null);
      setRejectionReason('');
      setLoading(false);
    }, 1000);
  };

  // Suspend pharmacy
  const showSuspensionModal = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setModalType('suspend');
    setSuspensionReason('');
    setShowModal(true);
  };

  const confirmSuspendPharmacy = () => {
    if (!suspensionReason.trim()) {
      showToast('Please provide a reason for suspension', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setPharmacies(prev => ({
        ...prev,
        active: prev.active.filter(p => p.id !== selectedPharmacy.id),
        suspended: [{ 
          ...selectedPharmacy, 
          status: 'suspended', 
          suspendedDate: new Date().toISOString().split('T')[0], 
          reason: suspensionReason,
          compliance: 'expired'
        }, ...prev.suspended]
      }));
      
      setStats(prev => ({
        ...prev,
        activePharmacies: prev.activePharmacies - 1,
        suspendedPharmacies: prev.suspendedPharmacies + 1
      }));
      
      showToast(`${selectedPharmacy.name} has been suspended.`, 'warning');
      setShowModal(false);
      setModalType(null);
      setSelectedPharmacy(null);
      setSuspensionReason('');
      setLoading(false);
    }, 1000);
  };

  // Show reinstatement confirmation modal
  const showReinstatementModal = (pharmacy) => {
    setReinstatementModal({ show: true, pharmacy });
  };

  // Confirm reinstate pharmacy
  const confirmReinstatePharmacy = () => {
    const { pharmacy } = reinstatementModal;
    setLoading(true);
    setTimeout(() => {
      setPharmacies(prev => ({
        ...prev,
        suspended: prev.suspended.filter(p => p.id !== pharmacy.id),
        active: [{ ...pharmacy, status: 'active', compliance: 'valid' }, ...prev.active]
      }));
      
      setStats(prev => ({
        ...prev,
        activePharmacies: prev.activePharmacies + 1,
        suspendedPharmacies: prev.suspendedPharmacies - 1
      }));
      
      showToast(`${pharmacy.name} has been reinstated.`, 'success');
      setReinstatementModal({ show: false, pharmacy: null });
      setLoading(false);
    }, 1000);
  };

  // Delete pharmacy
  const showDeleteModal = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setModalType('delete');
    setShowModal(true);
  };

  const confirmDeletePharmacy = () => {
    setLoading(true);
    setTimeout(() => {
      setPharmacies(prev => ({
        ...prev,
        suspended: prev.suspended.filter(p => p.id !== selectedPharmacy.id)
      }));
      
      setStats(prev => ({
        ...prev,
        suspendedPharmacies: prev.suspendedPharmacies - 1,
        totalPharmacies: prev.totalPharmacies - 1
      }));
      
      showToast(`${selectedPharmacy.name} has been deleted permanently.`, 'error');
      setShowModal(false);
      setSelectedPharmacy(null);
      setModalType(null);
      setLoading(false);
    }, 1000);
  };

  // View all activities
  const viewAllActivities = () => {
    setModalType('activities');
    setShowModal(true);
  };

  // View expiring licenses
  const viewExpiringLicenses = () => {
    setModalType('expiring');
    setShowModal(true);
  };

  // Search functionality
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // Filter data based on document tab
  const filterDocumentsByTab = (documents) => {
    if (!documents) return [];
    
    switch (activeDocumentTab) {
      case 'verified':
        return documents.filter(doc => doc.status === 'verified');
      case 'pending':
        return documents.filter(doc => doc.status === 'pending' || doc.status === 'expiring');
      case 'missing':
        return documents.filter(doc => doc.status === 'missing');
      case 'all':
      default:
        return documents;
    }
  };

  // Filter data
  const getFilteredData = () => {
    let data = pharmacies[activeTab] || [];
    
    // Apply search filter
    if (searchTerm) {
      data = data.filter(pharmacy => 
        pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pharmacy.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pharmacy.license.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pharmacy.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply type filter
    if (pharmacyTypeFilter !== 'all') {
      const typeMap = {
        'retail': 'Retail Pharmacy',
        'hospital': 'Hospital Pharmacy',
        'chain': 'Chain Pharmacy',
        'online': 'Online Pharmacy'
      };
      data = data.filter(pharmacy => 
        pharmacy.type === typeMap[pharmacyTypeFilter]
      );
    }
    
    // Apply date filter
    if (dateRange.start && dateRange.end) {
      data = data.filter(pharmacy => {
        const date = new Date(pharmacy.joined || pharmacy.submitted || pharmacy.suspendedDate);
        const start = new Date(dateRange.start);
        const end = new Date(dateRange.end);
        end.setHours(23, 59, 59, 999);
        return date >= start && date <= end;
      });
    }
    
    return data;
  };

  // Table columns
  const columns = {
    pending: [
      { key: 'name', label: 'Pharmacy Name' },
      { key: 'type', label: 'Type' },
      { key: 'owner', label: 'Owner' },
      { key: 'license', label: 'License No.' },
      { 
        key: 'submitted', 
        label: 'Submitted On',
        render: (date) => new Date(date).toLocaleDateString('en-IN')
      },
      {
        key: 'documents',
        label: 'Documents',
        render: (docs) => `${docs.filter(d => d.status !== 'missing').length}/${docs.length} files`
      },
      {
        key: 'estimatedRevenue',
        label: 'Est. Monthly Revenue',
        render: (revenue) => (
          <span className="revenue-amount">
            <HiCurrencyRupee /> {(revenue || 0).toLocaleString('en-IN')}
          </span>
        )
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, pharmacy) => (
          <div className="action-buttons">
            <button 
              className="btn btn-sm btn-success"
              onClick={(e) => {
                e.stopPropagation();
                showApprovalConfirmation(pharmacy);
              }}
              title="Approve Pharmacy"
            >
              <HiCheckCircle /> Approve
            </button>
            <button 
              className="btn btn-sm btn-error"
              onClick={(e) => {
                e.stopPropagation();
                showRejectionModal(pharmacy);
              }}
              title="Reject Application"
            >
              <HiXCircle /> Reject
            </button>
            <button 
              className="btn btn-sm btn-outline"
              onClick={(e) => handleViewDocuments(pharmacy, e)}
              title="View Documents"
            >
              <HiDocumentText /> Docs
            </button>
          </div>
        )
      }
    ],
    active: [
      { key: 'name', label: 'Pharmacy Name' },
      { key: 'type', label: 'Type' },
      { key: 'totalOrders', label: 'Total Orders' },
      { key: 'monthlyOrders', label: 'Monthly Orders' },
      { 
        key: 'totalRevenue', 
        label: 'Total Revenue',
        render: (revenue) => (
          <span className="revenue-amount">
            <HiCurrencyRupee /> {(revenue || 0).toLocaleString('en-IN')}
          </span>
        )
      },
      { 
        key: 'rating', 
        label: 'Rating',
        render: (rating) => (
          <div className="pharmacy-rating">
            <HiStar />
            <span>{rating}</span>
          </div>
        )
      },
      { 
        key: 'compliance', 
        label: 'Compliance',
        render: (compliance) => (
          <span className={`compliance-badge compliance-${compliance}`}>
            {compliance === 'valid' ? (
              <><HiShieldCheck /> Valid</>
            ) : (
              <><HiExclamationCircle /> Expiring</>
            )}
          </span>
        )
      },
      { 
        key: 'status', 
        label: 'Status',
        render: (status) => (
          <span className={`status-badge status-${status}`}>
            {status}
          </span>
        )
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, pharmacy) => (
          <div className="action-buttons">
            <button 
              className="btn btn-sm btn-warning"
              onClick={(e) => {
                e.stopPropagation();
                showSuspensionModal(pharmacy);
              }}
              title="Suspend Pharmacy"
            >
              <HiXCircle /> Suspend
            </button>
          </div>
        )
      }
    ],
    suspended: [
      { key: 'name', label: 'Pharmacy Name' },
      { key: 'type', label: 'Type' },
      { key: 'totalOrders', label: 'Total Orders' },
      { key: 'totalRevenue', label: 'Total Revenue' },
      { 
        key: 'suspendedDate', 
        label: 'Suspended On',
        render: (date) => new Date(date).toLocaleDateString('en-IN')
      },
      { key: 'reason', label: 'Reason' },
      { 
        key: 'compliance', 
        label: 'Compliance',
        render: (compliance) => (
          <span className={`compliance-badge compliance-${compliance}`}>
            {compliance === 'expired' ? (
              <><HiExclamationCircle /> Expired</>
            ) : (
              <><HiExclamation /> Invalid</>
            )}
          </span>
        )
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, pharmacy) => (
          <div className="action-buttons">
            <button 
              className="btn btn-sm btn-success"
              onClick={(e) => {
                e.stopPropagation();
                showReinstatementModal(pharmacy);
              }}
              title="Reinstate Pharmacy"
            >
              <HiCheckCircle /> Reinstate
            </button>
            <button 
              className="btn btn-sm btn-error"
              onClick={(e) => {
                e.stopPropagation();
                showDeleteModal(pharmacy);
              }}
              title="Delete Permanently"
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

  // Get expiring pharmacies
  const getExpiringPharmacies = () => {
    return pharmacies.active.filter(p => p.compliance === 'expiring');
  };

  // Render document status badge
  const renderDocumentStatus = (status) => {
    switch (status) {
      case 'verified':
        return <span className="status-badge-document status-approved"><HiCheckCircle /> Verified</span>;
      case 'pending':
        return <span className="status-badge-document status-pending"><HiClock /> Pending</span>;
      case 'expiring':
        return <span className="status-badge-document status-pending"><HiExclamationCircle /> Expiring</span>;
      case 'missing':
        return <span className="status-badge-document status-missing"><HiXCircle /> Missing</span>;
      default:
        return null;
    }
  };

  // Render dashboard
  const renderDashboard = () => (
    <>
      <div className="stats-grid">
        <StatsCard 
          icon={HiShoppingBag} 
          title="Total Pharmacies" 
          value={stats.totalPharmacies} 
          change={8.2}
          color="#0088FE"
        />
        <StatsCard 
          icon={HiCheckCircle} 
          title="Active Pharmacies" 
          value={stats.activePharmacies} 
          change={5.7}
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
          title="Total Revenue" 
          value={`${(stats.totalRevenue / 10000000).toFixed(1)}Cr`}
          change={12.5}
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
          icon={HiShoppingCart} 
          title="Total Orders" 
          value={stats.totalOrders} 
          change={9.3}
          color="#82CA9D"
        />
        <StatsCard 
          icon={HiArchive} 
          title="Total Products" 
          value={(stats.totalProducts / 1000).toFixed(1) + 'K'}
          change={7.2}
          color="#FF6B6B"
        />
        <StatsCard 
          icon={HiCash} 
          title="Total Commission" 
          value={`${(stats.totalCommission / 1000000).toFixed(1)}M`}
          change={14.2}
          color="#4ECDC4"
          prefix="₹"
        />
      </div>

      <div className="compliance-alerts">
        <div className="alert-item warning">
          <HiExclamationCircle />
          <div>
            <strong>{getExpiringPharmacies().length} Pharmacies with Expiring Licenses</strong>
            <p>Licenses expiring within 30 days. Review and request renewals.</p>
          </div>
          <button className="btn btn-sm btn-outline" onClick={viewExpiringLicenses}>
            View List
          </button>
        </div>
        <div className="alert-item error">
          <HiExclamationCircle />
          <div>
            <strong>{pharmacies.suspended.length} Pharmacies Suspended</strong>
            <p>Due to compliance issues. Immediate action required.</p>
          </div>
          <button className="btn btn-sm btn-outline" onClick={() => setActiveTab('suspended')}>
            Review
          </button>
        </div>
        <div className="alert-item info">
          <HiBell />
          <div>
            <strong>{pharmacies.pending.length} New Pharmacy Applications</strong>
            <p>Pending review and verification.</p>
          </div>
          <button className="btn btn-sm btn-outline" onClick={() => setActiveTab('pending')}>
            Review Now
          </button>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Pharmacy Growth & Revenue</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={pharmacyGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stackId="1"
                  stroke="#0088FE" 
                  fill="#0088FE"
                  fillOpacity={0.6}
                  name="Revenue (₹)"
                />
                <Area 
                  type="monotone" 
                  dataKey="orders" 
                  stackId="2"
                  stroke="#00C49F" 
                  fill="#00C49F"
                  fillOpacity={0.6}
                  name="Orders"
                />
                <Line 
                  type="monotone" 
                  dataKey="pharmacies" 
                  stroke="#FF8042"
                  strokeWidth={2}
                  name="Pharmacies"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Pharmacy Type Distribution</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mid-section">
        <div className="order-stats-card">
          <h3>Order Status Distribution</h3>
          <div className="order-stats-grid">
            {[
              { status: 'Pending', count: 45, color: '#FFB300' },
              { status: 'Processing', count: 28, color: '#2196F3' },
              { status: 'Shipped', count: 65, color: '#4CAF50' },
              { status: 'Delivered', count: 120, color: '#0088FE' },
              { status: 'Cancelled', count: 12, color: '#F44336' }
            ].map((stat, index) => (
              <div key={index} className="order-stat-item">
                <div className="order-stat-color" style={{ backgroundColor: stat.color }}></div>
                <div className="order-stat-content">
                  <span className="order-stat-count">{stat.count}</span>
                  <span className="order-stat-label">{stat.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="revenue-trend-card">
          <h3>Weekly Revenue Trend</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={revenueTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#0088FE" name="Revenue (₹)" />
                <Bar dataKey="orders" fill="#00C49F" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <div className="activity-header">
          <h3>Recent Pharmacy Activity</h3>
          <button className="btn btn-outline btn-sm" onClick={viewAllActivities}>
            View All Activities
          </button>
        </div>
        <div className="card">
          <Table
            columns={[
              { key: 'date', label: 'Date & Time' },
              { key: 'pharmacy', label: 'Pharmacy' },
              { key: 'action', label: 'Action' },
              { key: 'orderId', label: 'Order ID' },
              { 
                key: 'amount', 
                label: 'Amount',
                render: (amount) => amount > 0 ? `₹${amount.toLocaleString('en-IN')}` : '-'
              },
              { key: 'status', label: 'Status' },
              { key: 'items', label: 'Items' }
            ]}
            data={[
              { date: '2024-01-20 14:30', pharmacy: 'Health Plus Pharmacy', action: 'Order Processed', orderId: 'ORD-7842', amount: 2450, status: 'Delivered', items: 8 },
              { date: '2024-01-20 11:15', pharmacy: 'Care Pharmacy', action: 'Inventory Added', orderId: 'N/A', amount: 0, status: 'Completed', items: 15 },
              { date: '2024-01-19 16:45', pharmacy: 'MedicFirst Pharmacy', action: 'Payment Received', orderId: 'PAY-6521', amount: 12500, status: 'Success', items: 0 },
              { date: '2024-01-19 09:30', pharmacy: 'Wellness Pharmacy', action: 'Order Cancelled', orderId: 'ORD-6523', amount: 1850, status: 'Refunded', items: 5 },
              { date: '2024-01-18 17:20', pharmacy: 'Health Plus Pharmacy', action: 'Prescription Upload', orderId: 'N/A', amount: 0, status: 'Verified', items: 1 }
            ]}
          />
        </div>
      </div>
    </>
  );

  // Render reports
  const renderReports = () => (
    <div className="reports-section">
      <div className="reports-grid">
        <div className="report-card">
          <h4>Revenue by Pharmacy Type</h4>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { type: 'Retail Pharmacy', revenue: 28500000, percentage: 63 },
                { type: 'Hospital Pharmacy', revenue: 9850000, percentage: 22 },
                { type: 'Chain Pharmacy', revenue: 5400000, percentage: 12 },
                { type: 'Online Pharmacy', revenue: 1500000, percentage: 3 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="report-card">
          <h4>Monthly Performance</h4>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[
                { month: 'Jul', revenue: 4200000, orders: 980 },
                { month: 'Aug', revenue: 3850000, orders: 890 },
                { month: 'Sep', revenue: 4520000, orders: 1050 },
                { month: 'Oct', revenue: 4980000, orders: 1120 },
                { month: 'Nov', revenue: 5120000, orders: 1180 },
                { month: 'Dec', revenue: 4850000, orders: 1090 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#FF8042" strokeWidth={2} />
                <Line type="monotone" dataKey="orders" stroke="#00C49F" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="report-card">
          <h4>Key Metrics</h4>
          <div className="report-metrics">
            <div className="report-metric">
              <div className="report-value">{stats.totalPharmacies}</div>
              <div className="report-label">Total Pharmacies</div>
            </div>
            <div className="report-metric">
              <div className="report-value">₹{(stats.totalRevenue / 10000000).toFixed(1)}Cr</div>
              <div className="report-label">Total Revenue</div>
            </div>
            <div className="report-metric">
              <div className="report-value">{stats.totalOrders}</div>
              <div className="report-label">Total Orders</div>
            </div>
            <div className="report-metric">
              <div className="report-value">₹{(stats.totalCommission / 1000000).toFixed(1)}M</div>
              <div className="report-label">Commission</div>
            </div>
          </div>
        </div>

        <div className="report-card">
          <h4>Compliance Status</h4>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Valid', value: stats.activePharmacies - getExpiringPharmacies().length, color: '#00C49F' },
                    { name: 'Expiring', value: getExpiringPharmacies().length, color: '#FFBB28' },
                    { name: 'Expired', value: stats.suspendedPharmacies, color: '#FF8042' }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[
                    { name: 'Valid', value: stats.activePharmacies - getExpiringPharmacies().length, color: '#00C49F' },
                    { name: 'Expiring', value: getExpiringPharmacies().length, color: '#FFBB28' },
                    { name: 'Expired', value: stats.suspendedPharmacies, color: '#FF8042' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  // Render analytics
  const renderAnalytics = () => (
    <div className="analytics-section">
      <div className="stats-grid">
        <StatsCard 
          icon={HiTrendingUp} 
          title="Monthly Growth" 
          value={`${stats.thisMonthGrowth}%`} 
          color="#0088FE"
        />
        <StatsCard 
          icon={HiUsers} 
          title="New Customers" 
          value="1,250" 
          change={8.5}
          color="#00C49F"
        />
        <StatsCard 
          icon={HiShoppingCart} 
          title="Order Value" 
          value="₹3,850" 
          change={4.2}
          color="#FF8042"
          prefix="₹"
        />
        <StatsCard 
          icon={HiStar} 
          title="Satisfaction" 
          value="94.5%" 
          color="#8884D8"
        />
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Pharmacy Performance Trend</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[
                { month: 'Jul', revenue: 4200000, orders: 980 },
                { month: 'Aug', revenue: 3850000, orders: 890 },
                { month: 'Sep', revenue: 4520000, orders: 1050 },
                { month: 'Oct', revenue: 4980000, orders: 1120 },
                { month: 'Nov', revenue: 5120000, orders: 1180 },
                { month: 'Dec', revenue: 4850000, orders: 1090 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#0088FE" strokeWidth={2} />
                <Line type="monotone" dataKey="orders" stroke="#00C49F" strokeWidth={2} />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Regional Distribution</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { region: 'North', pharmacies: 35, revenue: 12500000 },
                { region: 'South', pharmacies: 58, revenue: 18500000 },
                { region: 'East', pharmacies: 28, revenue: 8500000 },
                { region: 'West', pharmacies: 35, revenue: 11500000 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pharmacies" fill="#0088FE" name="Pharmacies" />
                <Bar dataKey="revenue" fill="#00C49F" name="Revenue (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'reports':
        return renderReports();
      case 'analytics':
        return renderAnalytics();
      default:
        return (
          <div className="card">
            <Table
              columns={columns[activeTab]}
              data={getFilteredData()}
              emptyMessage={`No ${activeTab} pharmacies found`}
              onRowClick={activeTab === 'active' || activeTab === 'pending' ? viewPharmacyDetails : null}
              rowClassName={activeTab === 'active' || activeTab === 'pending' ? 'table-row-clickable' : ''}
            />
          </div>
        );
    }
  };

  // Render modal content
  const renderModalContent = () => {
    switch (modalType) {
      case 'export':
        return (
          <div className="modal-body">
            <h4>Export Data</h4>
            <p>Select the format to export pharmacy data:</p>
            <div className="export-grid">
              <div className="export-option" onClick={() => performExport('csv')}>
                <HiDocumentText />
                <h5>CSV Format</h5>
                <p>Comma separated values, ideal for spreadsheets</p>
              </div>
              <div className="export-option" onClick={() => performExport('excel')}>
                <HiDocumentReport />
                <h5>Excel Format</h5>
                <p>Microsoft Excel format with formatting</p>
              </div>
              <div className="export-option" onClick={() => performExport('pdf')}>
                <HiPrinter />
                <h5>PDF Report</h5>
                <p>Printable PDF document with charts</p>
              </div>
              <div className="export-option" onClick={() => performExport('json')}>
                <HiDatabase />
                <h5>JSON Data</h5>
                <p>Raw JSON data for developers</p>
              </div>
            </div>
          </div>
        );

      case 'add':
        return (
          <div className="modal-body">
            <h4>Add New Pharmacy</h4>
            <div className="form-group">
              <label className="form-label">Pharmacy Name *</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={newPharmacyForm.name}
                onChange={handleInputChange}
                placeholder="Enter pharmacy name"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Pharmacy Type *</label>
                <select
                  className="form-control"
                  name="type"
                  value={newPharmacyForm.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="retail">Retail Pharmacy</option>
                  <option value="hospital">Hospital Pharmacy</option>
                  <option value="chain">Chain Pharmacy</option>
                  <option value="online">Online Pharmacy</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Owner Name *</label>
                <input
                  type="text"
                  className="form-control"
                  name="owner"
                  value={newPharmacyForm.owner}
                  onChange={handleInputChange}
                  placeholder="Enter owner name"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={newPharmacyForm.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone *</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={newPharmacyForm.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Address *</label>
              <textarea
                className="form-control"
                name="address"
                value={newPharmacyForm.address}
                onChange={handleInputChange}
                rows="3"
                placeholder="Enter full address"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Drug License No. *</label>
                <input
                  type="text"
                  className="form-control"
                  name="license"
                  value={newPharmacyForm.license}
                  onChange={handleInputChange}
                  placeholder="Enter license number"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">GST Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="gst"
                  value={newPharmacyForm.gst}
                  onChange={handleInputChange}
                  placeholder="Enter GST number"
                />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-outline" onClick={() => setShowModal(false)} disabled={loading}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={submitNewPharmacy}
                disabled={loading}
              >
                {loading ? <span className="loading-spinner" /> : 'Submit Application'}
              </button>
            </div>
          </div>
        );

      case 'details':
        return (
          <div className="pharmacy-details-modal">
            <div className="pharmacy-header">
              <div className="pharmacy-avatar">
                {selectedPharmacy?.name?.charAt(0)}
              </div>
              <div className="pharmacy-info">
                <h2>{selectedPharmacy?.name}</h2>
                <p className="pharmacy-type">{selectedPharmacy?.type}</p>
                <div className="pharmacy-stats">
                  {selectedPharmacy?.rating && (
                    <span className="stat-item">
                      <HiStar /> Rating: {selectedPharmacy?.rating || 'N/A'}
                    </span>
                  )}
                  <span className="stat-item">
                    <HiShoppingCart /> Orders: {selectedPharmacy?.totalOrders || selectedPharmacy?.estimatedRevenue || 'N/A'}
                  </span>
                  <span className="stat-item">
                    <HiLocationMarker /> {selectedPharmacy?.address?.split(',')[0]}
                  </span>
                  {selectedPharmacy?.totalRevenue && (
                    <span className="stat-item">
                      <HiCurrencyRupee /> Revenue: ₹{(selectedPharmacy?.totalRevenue || 0).toLocaleString('en-IN')}
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
                  Verification
                </button>
                <button 
                  className={`detail-tab ${activeDetailTab === 'business' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('business')}
                >
                  Business Details
                </button>
                <button 
                  className={`detail-tab ${activeDetailTab === 'performance' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('performance')}
                >
                  Performance
                </button>
                <button 
                  className={`detail-tab ${activeDetailTab === 'history' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('history')}
                >
                  Order History
                </button>
                <button 
                  className={`detail-tab ${activeDetailTab === 'financials' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('financials')}
                >
                  Financials
                </button>
              </div>

              <div className="tab-content">
                {activeDetailTab === 'verification' && (
                  <div className="verification-section">
                    <h4>Verification Documents</h4>
                    <div className="document-grid">
                      {selectedPharmacy?.documents?.map((doc, index) => (
                        <div key={index} className="document-item">
                          <div className="document-header">
                            <h5>{doc.type}</h5>
                            {renderDocumentStatus(doc.status)}
                          </div>
                          <div className="document-preview">
                            <div className="document-placeholder">
                              <HiDocumentText />
                              <p>{doc.name || 'No document uploaded'}</p>
                            </div>
                          </div>
                          <div className="document-actions">
                            {doc.status === 'missing' ? (
                              <button className="btn btn-sm btn-outline" onClick={() => showToast('Document request sent to pharmacy', 'info')}>
                                Request Upload
                              </button>
                            ) : (
                              <>
                                <button className="btn btn-sm btn-outline" onClick={() => {
                                  setSelectedDocument(doc);
                                  showToast('Document opened in viewer', 'info');
                                }}>
                                  View
                                </button>
                                <button className="btn btn-sm btn-primary" onClick={() => {
                                  setSelectedDocument(doc);
                                  showToast('Document downloaded', 'success');
                                }}>
                                  Download
                                </button>
                                {doc.status === 'pending' && (
                                  <>
                                    <button className="btn btn-sm btn-success" onClick={() => handleDocumentAction('approve', doc)}>
                                      Approve
                                    </button>
                                    <button className="btn btn-sm btn-error" onClick={() => handleDocumentAction('reject', doc)}>
                                      Reject
                                    </button>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeDetailTab === 'business' && (
                  <div className="details-grid">
                    <div className="details-section">
                      <h5>Business Information</h5>
                      <div className="info-grid">
                        <div className="info-item">
                          <label>Pharmacy Name</label>
                          <span>{selectedPharmacy?.name}</span>
                        </div>
                        <div className="info-item">
                          <label>Owner Name</label>
                          <span>{selectedPharmacy?.owner}</span>
                        </div>
                        <div className="info-item">
                          <label>Email</label>
                          <span>{selectedPharmacy?.email}</span>
                        </div>
                        <div className="info-item">
                          <label>Phone</label>
                          <span>{selectedPharmacy?.phone}</span>
                        </div>
                        <div className="info-item">
                          <label>License Number</label>
                          <span>{selectedPharmacy?.license}</span>
                        </div>
                        <div className="info-item">
                          <label>GST Number</label>
                          <span>{selectedPharmacy?.gst || 'N/A'}</span>
                        </div>
                        <div className="info-item">
                          <label>Registration Date</label>
                          <span>{new Date(selectedPharmacy?.joined || selectedPharmacy?.submitted).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="info-item">
                          <label>Status</label>
                          <span className={`status-badge status-${selectedPharmacy?.status || 'pending'}`}>
                            {selectedPharmacy?.status || 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="details-section">
                      <h5>Location & Operations</h5>
                      <div className="info-grid">
                        <div className="info-item">
                          <label>Address</label>
                          <span>{selectedPharmacy?.address}</span>
                        </div>
                        <div className="info-item">
                          <label>Store Hours</label>
                          <span>{selectedPharmacy?.storeHours || '9:00 AM - 9:00 PM'}</span>
                        </div>
                        <div className="info-item">
                          <label>Delivery Radius</label>
                          <span>{selectedPharmacy?.deliveryRadius || '5 km'}</span>
                        </div>
                        <div className="info-item">
                          <label>Pharmacy Type</label>
                          <span>{selectedPharmacy?.type}</span>
                        </div>
                        {selectedPharmacy?.compliance && (
                          <div className="info-item">
                            <label>Compliance Status</label>
                            <span className={`compliance-badge compliance-${selectedPharmacy?.compliance}`}>
                              {selectedPharmacy?.compliance === 'valid' ? (
                                <><HiShieldCheck /> Valid</>
                              ) : selectedPharmacy?.compliance === 'expiring' ? (
                                <><HiExclamationCircle /> Expiring</>
                              ) : (
                                <><HiExclamation /> {selectedPharmacy?.compliance}</>
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeDetailTab === 'performance' && selectedPharmacy?.totalRevenue && (
                  <div className="performance-section">
                    <h5>Performance Metrics</h5>
                    <div className="metrics-grid">
                      <div className="metric-card">
                        <div className="metric-value">{selectedPharmacy?.totalOrders || '0'}</div>
                        <div className="metric-label">Total Orders</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">₹{(selectedPharmacy?.totalRevenue || 0).toLocaleString('en-IN')}</div>
                        <div className="metric-label">Total Revenue</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">{selectedPharmacy?.totalProducts || '0'}</div>
                        <div className="metric-label">Total Products</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">₹{(selectedPharmacy?.commissionEarned || 0).toLocaleString('en-IN')}</div>
                        <div className="metric-label">Commission Earned</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">{selectedPharmacy?.customerCount || '0'}</div>
                        <div className="metric-label">Total Customers</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">{selectedPharmacy?.performance || '0'}%</div>
                        <div className="metric-label">Performance Score</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeDetailTab === 'history' && (
                  <div className="recent-activity">
                    <h4>Order History - {selectedPharmacy?.name}</h4>
                    <div className="card">
                      <Table
                        columns={[
                          { key: 'date', label: 'Date' },
                          { key: 'orderId', label: 'Order ID' },
                          { key: 'amount', label: 'Amount' },
                          { key: 'status', label: 'Status' },
                          { key: 'items', label: 'Items' }
                        ]}
                        data={[
                          { date: '2024-01-20', orderId: 'ORD-7842', amount: 2450, status: 'Delivered', items: 8 },
                          { date: '2024-01-19', orderId: 'ORD-6521', amount: 12500, status: 'Success', items: 12 },
                          { date: '2024-01-18', orderId: 'ORD-5123', amount: 850, status: 'Delivered', items: 3 },
                          { date: '2024-01-17', orderId: 'ORD-4125', amount: 3250, status: 'Cancelled', items: 6 }
                        ]}
                      />
                    </div>
                  </div>
                )}

                {activeDetailTab === 'financials' && selectedPharmacy?.totalRevenue && (
                  <div className="performance-section">
                    <h5>Financial Overview</h5>
                    <div className="metrics-grid">
                      <div className="metric-card">
                        <div className="metric-value">₹{(selectedPharmacy?.totalRevenue || 0).toLocaleString('en-IN')}</div>
                        <div className="metric-label">Total Revenue</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">₹{(selectedPharmacy?.monthlyRevenue || 0).toLocaleString('en-IN')}</div>
                        <div className="metric-label">Monthly Revenue</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">{selectedPharmacy?.commissionRate || '0'}%</div>
                        <div className="metric-label">Commission Rate</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">₹{(selectedPharmacy?.commissionEarned || 0).toLocaleString('en-IN')}</div>
                        <div className="metric-label">Commission Earned</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">₹{(selectedPharmacy?.inventoryValue || 0).toLocaleString('en-IN')}</div>
                        <div className="metric-label">Inventory Value</div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPharmacy?.status === 'pending' && (
                  <div className="verification-actions">
                    <button 
                      className="btn btn-error"
                      onClick={() => showRejectionModal(selectedPharmacy)}
                      disabled={loading}
                    >
                      <HiXCircle /> Reject Application
                    </button>
                    <button 
                      className="btn btn-success"
                      onClick={() => showApprovalConfirmation(selectedPharmacy)}
                      disabled={loading}
                    >
                      <HiCheckCircle /> Approve Pharmacy
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'delete':
        return (
          <div className="modal-body">
            <div className="delete-confirmation">
              <div className="delete-icon">
                <HiExclamationCircle />
              </div>
              <div className="delete-message">
                <h4>Delete Pharmacy Permanently?</h4>
                <p>Are you sure you want to delete <strong>{selectedPharmacy?.name}</strong>? This action cannot be undone.</p>
              </div>
              <div className="form-actions">
                <button className="btn btn-outline" onClick={() => {
                  setShowModal(false);
                  setModalType(null);
                  setSelectedPharmacy(null);
                }} disabled={loading}>
                  Cancel
                </button>
                <button 
                  className="btn btn-error" 
                  onClick={confirmDeletePharmacy}
                  disabled={loading}
                >
                  {loading ? <span className="loading-spinner" /> : 'Delete Permanently'}
                </button>
              </div>
            </div>
          </div>
        );

      case 'activities':
        return (
          <div className="modal-body">
            <h4>All Pharmacy Activities</h4>
            <div className="activity-filters">
              <select className="activity-filter-select">
                <option>All Pharmacies</option>
                <option>Health Plus Pharmacy</option>
                <option>Care Pharmacy</option>
                <option>MedicFirst Pharmacy</option>
              </select>
              <select className="activity-filter-select">
                <option>All Actions</option>
                <option>Order Processed</option>
                <option>Payment Received</option>
                <option>Inventory Added</option>
              </select>
              <select className="activity-filter-select">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
            <div className="activity-stats">
              <div className="activity-stat-card">
                <div className="activity-stat-value">156</div>
                <div className="activity-stat-label">Total Activities</div>
              </div>
              <div className="activity-stat-card">
                <div className="activity-stat-value">₹1.2M</div>
                <div className="activity-stat-label">Total Value</div>
              </div>
              <div className="activity-stat-card">
                <div className="activity-stat-value">45</div>
                <div className="activity-stat-label">Successful Orders</div>
              </div>
              <div className="activity-stat-card">
                <div className="activity-stat-value">3</div>
                <div className="activity-stat-label">Cancelled Orders</div>
              </div>
            </div>
            <div className="activity-list">
              {[
                { id: 1, date: '2024-01-20 14:30', pharmacy: 'Health Plus Pharmacy', action: 'Order Processed', orderId: 'ORD-7842', amount: 2450, status: 'Delivered', items: 8 },
                { id: 2, date: '2024-01-20 11:15', pharmacy: 'Care Pharmacy', action: 'Inventory Added', orderId: 'N/A', amount: 0, status: 'Completed', items: 15 },
                { id: 3, date: '2024-01-19 16:45', pharmacy: 'MedicFirst Pharmacy', action: 'Payment Received', orderId: 'PAY-6521', amount: 12500, status: 'Success', items: 0 },
                { id: 4, date: '2024-01-19 09:30', pharmacy: 'Wellness Pharmacy', action: 'Order Cancelled', orderId: 'ORD-6523', amount: 1850, status: 'Refunded', items: 5 },
                { id: 5, date: '2024-01-18 17:20', pharmacy: 'Health Plus Pharmacy', action: 'Prescription Upload', orderId: 'N/A', amount: 0, status: 'Verified', items: 1 },
                { id: 6, date: '2024-01-18 10:45', pharmacy: 'MedicFirst Pharmacy', action: 'Order Processed', orderId: 'ORD-4125', amount: 3250, status: 'Delivered', items: 6 },
                { id: 7, date: '2024-01-17 15:20', pharmacy: 'Care Pharmacy', action: 'Payment Received', orderId: 'PAY-3214', amount: 18500, status: 'Success', items: 0 },
                { id: 8, date: '2024-01-17 09:10', pharmacy: 'Health Plus Pharmacy', action: 'Inventory Added', orderId: 'N/A', amount: 0, status: 'Completed', items: 12 }
              ].map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-info">
                    <h5>{activity.pharmacy} - {activity.action}</h5>
                    <p>{activity.date} • Order ID: {activity.orderId}</p>
                  </div>
                  <div className="activity-details">
                    <span>₹{activity.amount > 0 ? activity.amount.toLocaleString('en-IN') : '0'}</span>
                    <span className={`activity-status status-${activity.status.toLowerCase()}`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'expiring':
        const expiringPharmacies = getExpiringPharmacies();
        return (
          <div className="modal-body">
            <h4>Pharmacies with Expiring Licenses</h4>
            <p>{expiringPharmacies.length} pharmacies have licenses expiring within 30 days.</p>
            <div className="expiring-licenses-grid">
              {expiringPharmacies.map((pharmacy, index) => {
                const daysLeft = Math.ceil((new Date(pharmacy.licenseExpiry) - new Date()) / (1000 * 60 * 60 * 24));
                let daysClass = 'info';
                if (daysLeft <= 7) daysClass = 'critical';
                else if (daysLeft <= 15) daysClass = 'warning';
                
                return (
                  <div key={index} className="expiring-pharmacy-card">
                    <div className="expiring-pharmacy-header">
                      <div className="expiring-pharmacy-name">{pharmacy.name}</div>
                      <div className={`expiring-days ${daysClass}`}>
                        {daysLeft} days
                      </div>
                    </div>
                    <div className="expiring-pharmacy-details">
                      <div className="expiring-detail-item">
                        <span className="expiring-detail-label">License No.</span>
                        <span className="expiring-detail-value">{pharmacy.license}</span>
                      </div>
                      <div className="expiring-detail-item">
                        <span className="expiring-detail-label">Expiry Date</span>
                        <span className="expiring-detail-value">{new Date(pharmacy.licenseExpiry).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="expiring-detail-item">
                        <span className="expiring-detail-label">Owner</span>
                        <span className="expiring-detail-value">{pharmacy.owner}</span>
                      </div>
                      <div className="expiring-detail-item">
                        <span className="expiring-detail-label">Contact</span>
                        <span className="expiring-detail-value">{pharmacy.phone}</span>
                      </div>
                    </div>
                    <div className="quick-actions">
                      <button className="btn btn-sm btn-outline" onClick={() => showToast(`Notification sent to ${pharmacy.name}`, 'info')}>
                        Send Reminder
                      </button>
                      <button className="btn btn-sm btn-warning" onClick={() => showSuspensionModal(pharmacy)}>
                        Suspend
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={() => {
                expiringPharmacies.forEach(p => showToast(`Reminder sent to ${p.name}`, 'info'));
              }}>
                Send All Reminders
              </button>
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        );

      case 'documents':
        const filteredDocuments = filterDocumentsByTab(selectedPharmacy?.documents);
        return (
          <div className="modal-body">
            <div className="document-preview-modal">
              <h4>Pharmacy Documents - {selectedPharmacy?.name}</h4>
              <div className="document-tabs">
                <button 
                  className={`document-tab ${activeDocumentTab === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveDocumentTab('all')}
                >
                  All Documents
                </button>
                <button 
                  className={`document-tab ${activeDocumentTab === 'verified' ? 'active' : ''}`}
                  onClick={() => setActiveDocumentTab('verified')}
                >
                  Verified
                </button>
                <button 
                  className={`document-tab ${activeDocumentTab === 'pending' ? 'active' : ''}`}
                  onClick={() => setActiveDocumentTab('pending')}
                >
                  Pending
                </button>
                <button 
                  className={`document-tab ${activeDocumentTab === 'missing' ? 'active' : ''}`}
                  onClick={() => setActiveDocumentTab('missing')}
                >
                  Missing
                </button>
              </div>
              
              <div className="document-viewer">
                {selectedDocument ? (
                  <div className="document-info">
                    <HiDocumentText size={64} color="#0088FE" />
                    <h4>{selectedDocument.type}</h4>
                    <p>File: {selectedDocument.name}</p>
                    <div className="document-meta">
                      <div className="document-meta-item">
                        <div className="document-meta-label">Status</div>
                        <div className="document-meta-value">
                          {selectedDocument.status === 'verified' ? 'Verified' : 
                           selectedDocument.status === 'pending' ? 'Pending Review' : 
                           selectedDocument.status === 'missing' ? 'Not Uploaded' : 'Unknown'}
                        </div>
                      </div>
                      <div className="document-meta-item">
                        <div className="document-meta-label">Uploaded</div>
                        <div className="document-meta-value">
                          {selectedDocument.uploaded ? new Date(selectedDocument.uploaded).toLocaleDateString('en-IN') : 'Not uploaded'}
                        </div>
                      </div>
                      <div className="document-meta-item">
                        <div className="document-meta-label">File Size</div>
                        <div className="document-meta-value">{selectedDocument.size || 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="document-info">
                    <HiDocumentText size={64} color="#7F8C8D" />
                    <h4>Select a document to preview</h4>
                    <p>Click on any document to view details</p>
                  </div>
                )}
              </div>

              <div className="document-grid">
                {filteredDocuments.map((doc, index) => (
                  <div key={index} className="document-item" onClick={() => setSelectedDocument(doc)}>
                    <div className="document-header">
                      <h5>{doc.type}</h5>
                      {renderDocumentStatus(doc.status)}
                    </div>
                    <div className="document-preview">
                      <div className="document-placeholder">
                        <HiDocumentText />
                        <p>{doc.name || 'No document'}</p>
                      </div>
                    </div>
                    <div className="document-actions">
                      {doc.status !== 'missing' ? (
                        <>
                          <button className="btn btn-sm btn-outline" onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDocument(doc);
                            showToast('Document opened in viewer', 'info');
                          }}>
                            View
                          </button>
                          <button className="btn btn-sm btn-primary" onClick={(e) => {
                            e.stopPropagation();
                            showToast('Document downloaded', 'success');
                          }}>
                            Download
                          </button>
                          {doc.status === 'pending' && (
                            <>
                              <button className="btn btn-sm btn-success" onClick={(e) => {
                                e.stopPropagation();
                                handleDocumentAction('approve', doc);
                              }}>
                                Approve
                              </button>
                              <button className="btn btn-sm btn-error" onClick={(e) => {
                                e.stopPropagation();
                                handleDocumentAction('reject', doc);
                              }}>
                                Reject
                              </button>
                            </>
                          )}
                        </>
                      ) : (
                        <button className="btn btn-sm btn-outline" onClick={(e) => {
                          e.stopPropagation();
                          showToast('Document upload request sent', 'info');
                        }}>
                          Request Upload
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'suspend':
        return (
          <div className="modal-body">
            <h4>Suspend Pharmacy</h4>
            <p>You are about to suspend <strong>{selectedPharmacy?.name}</strong>. Please provide a reason for suspension.</p>
            
            <div className="suspension-reason">
              <label className="form-label">Reason for Suspension *</label>
              <textarea
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value)}
                placeholder="Enter detailed reason for suspension..."
                className="form-control"
              />
            </div>

            <div className="form-actions">
              <button className="btn btn-outline" onClick={() => {
                setShowModal(false);
                setModalType(null);
                setSelectedPharmacy(null);
                setSuspensionReason('');
              }} disabled={loading}>
                Cancel
              </button>
              <button 
                className="btn btn-error" 
                onClick={confirmSuspendPharmacy}
                disabled={!suspensionReason.trim() || loading}
              >
                {loading ? <span className="loading-spinner" /> : 'Confirm Suspension'}
              </button>
            </div>
          </div>
        );

      case 'reject':
        return (
          <div className="modal-body">
            <h4>Reject Pharmacy Application</h4>
            <p>You are about to reject <strong>{selectedPharmacy?.name}</strong>'s application. Please provide a reason for rejection.</p>
            
            <div className="suspension-reason">
              <label className="form-label">Reason for Rejection *</label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter detailed reason for rejection..."
                className="form-control"
              />
            </div>

            <div className="form-actions">
              <button className="btn btn-outline" onClick={() => {
                setShowModal(false);
                setModalType(null);
                setSelectedPharmacy(null);
                setRejectionReason('');
              }} disabled={loading}>
                Cancel
              </button>
              <button 
                className="btn btn-error" 
                onClick={confirmRejectPharmacy}
                disabled={!rejectionReason.trim() || loading}
              >
                {loading ? <span className="loading-spinner" /> : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pharmacy-management">
      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Processing request...</p>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.type === 'success' && <HiCheckCircle color="#4CAF50" />}
          {toast.type === 'error' && <HiXCircle color="#F44336" />}
          {toast.type === 'warning' && <HiExclamationCircle color="#FFB300" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Approval Confirmation Modal */}
      {approvalModal.show && (
        <Modal
          title="Confirm Pharmacy Approval"
          onClose={() => setApprovalModal({ show: false, pharmacy: null })}
          size="medium"
        >
          <div className="modal-body">
            <div className="delete-confirmation">
              <div className="delete-icon" style={{ color: '#4CAF50' }}>
                <HiCheckCircle />
              </div>
              <div className="delete-message">
                <h4>Approve Pharmacy?</h4>
                <p>Are you sure you want to approve <strong>{approvalModal.pharmacy?.name}</strong>? This will activate their account.</p>
              </div>
              <div className="form-actions">
                <button className="btn btn-outline" onClick={() => setApprovalModal({ show: false, pharmacy: null })} disabled={loading}>
                  Cancel
                </button>
                <button 
                  className="btn btn-success" 
                  onClick={confirmApprovePharmacy}
                  disabled={loading}
                >
                  {loading ? <span className="loading-spinner" /> : 'Confirm Approval'}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Reinstatement Confirmation Modal */}
      {reinstatementModal.show && (
        <Modal
          title="Confirm Pharmacy Reinstatement"
          onClose={() => setReinstatementModal({ show: false, pharmacy: null })}
          size="medium"
        >
          <div className="modal-body">
            <div className="delete-confirmation">
              <div className="delete-icon" style={{ color: '#4CAF50' }}>
                <HiCheckCircle />
              </div>
              <div className="delete-message">
                <h4>Reinstate Pharmacy?</h4>
                <p>Are you sure you want to reinstate <strong>{reinstatementModal.pharmacy?.name}</strong>? This will reactivate their account.</p>
              </div>
              <div className="form-actions">
                <button className="btn btn-outline" onClick={() => setReinstatementModal({ show: false, pharmacy: null })} disabled={loading}>
                  Cancel
                </button>
                <button 
                  className="btn btn-success" 
                  onClick={confirmReinstatePharmacy}
                  disabled={loading}
                >
                  {loading ? <span className="loading-spinner" /> : 'Confirm Reinstatement'}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <div className="page-header">
        <div className="header-content">
          <h1>Pharmacy Super Admin Dashboard</h1>
          <p>Manage pharmacy onboarding, monitor performance, and oversee all pharmacy operations</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={handleExport}>
            <HiDownload /> Export Data
          </button>
          <button className="btn btn-primary" onClick={handleAddPharmacy}>
            <HiShoppingBag /> Add New Pharmacy
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
          <HiClock /> Pending ({pharmacies.pending.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          <HiCheckCircle /> Active ({pharmacies.active.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'suspended' ? 'active' : ''}`}
          onClick={() => setActiveTab('suspended')}
        >
          <HiXCircle /> Suspended ({pharmacies.suspended.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          <HiDocumentText /> Reports
        </button>
        <button 
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <HiChartBar /> Analytics
        </button>
      </div>

      {activeTab !== 'dashboard' && activeTab !== 'reports' && activeTab !== 'analytics' && (
        <div className="management-toolbar">
          <div className="toolbar-left">
            <div className="search-bar">
              <HiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search pharmacies by name, owner, license, email or phone..."
                value={searchTerm}
                onChange={handleSearch}
                className="form-control"
              />
            </div>
            <div className="filter-options">
              <select 
                className="select-input"
                value={pharmacyTypeFilter}
                onChange={(e) => setPharmacyTypeFilter(e.target.value)}
              >
                <option value="all">All Pharmacy Types</option>
                <option value="retail">Retail Pharmacy</option>
                <option value="hospital">Hospital Pharmacy</option>
                <option value="chain">Chain Pharmacy</option>
                <option value="online">Online Pharmacy</option>
              </select>
              
              <div className="simple-date-input">
                <HiCalendar className="date-icon" />
                <input
                  type="date"
                  value={dateRange.start || ''}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  placeholder="Start Date"
                  className="date-input-field"
                />
              </div>
              
              <div className="simple-date-input">
                <HiCalendar className="date-icon" />
                <input
                  type="date"
                  value={dateRange.end || ''}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  placeholder="End Date"
                  className="date-input-field"
                />
              </div>
              
              <button 
                className="btn btn-outline"
                onClick={() => {
                  setSearchTerm('');
                  setDateRange({ start: null, end: null });
                  setPharmacyTypeFilter('all');
                  showToast('Filters cleared', 'info');
                }}
              >
                <HiFilter /> Clear Filters
              </button>
            </div>
          </div>
          <div className="toolbar-right">
            <span className="results-count">
              Showing {getFilteredData().length} of {pharmacies[activeTab]?.length || 0} results
            </span>
          </div>
        </div>
      )}

      {/* Search Results Info */}
      {searchTerm && activeTab !== 'dashboard' && activeTab !== 'reports' && activeTab !== 'analytics' && (
        <div className="compliance-alerts info">
          <div className="alert-item info">
            <HiSearch />
            <div>
              <strong>Search Results for "{searchTerm}"</strong>
              <p>Found {getFilteredData().length} pharmacies matching your search</p>
            </div>
            <button className="btn btn-sm btn-outline" onClick={() => setSearchTerm('')}>
              Clear Search
            </button>
          </div>
        </div>
      )}

      {renderTabContent()}

      {/* Main Modal */}
      {showModal && (
        <Modal
          title={
            modalType === 'export' ? 'Export Data' :
            modalType === 'add' ? 'Add New Pharmacy' :
            modalType === 'details' ? `Pharmacy Details - ${selectedPharmacy?.name}` :
            modalType === 'delete' ? 'Confirm Deletion' :
            modalType === 'activities' ? 'All Pharmacy Activities' :
            modalType === 'expiring' ? 'Expiring Licenses' :
            modalType === 'documents' ? `Documents - ${selectedPharmacy?.name}` :
            modalType === 'suspend' ? 'Suspend Pharmacy' :
            modalType === 'reject' ? 'Reject Pharmacy Application' : 'Modal'
          }
          onClose={() => {
            setShowModal(false);
            setModalType(null);
            setSelectedPharmacy(null);
            setActiveDetailTab('verification');
            setSuspensionReason('');
            setRejectionReason('');
            setSelectedDocument(null);
            setActiveDocumentTab('all');
          }}
          size={
            modalType === 'details' || modalType === 'expiring' || modalType === 'documents' || 
            modalType === 'activities' ? 'extra-large' : 'large'
          }
        >
          {renderModalContent()}
        </Modal>
      )}
    </div>
  );
};

export default PharmacyManagement;