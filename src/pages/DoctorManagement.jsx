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
  HiOfficeBuilding,
  HiUserGroup,
  HiAcademicCap,
  HiBadgeCheck,
  HiBan,
  HiChat,
  HiPhone,
  HiMail,
  HiLocationMarker,
  HiDocumentDuplicate,
  HiClipboardCheck,
  HiChartBar,
  HiChatAlt,
  HiLockClosed,
  HiCog,
  HiExternalLink,
  HiHeart
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
import './DoctorManagement.css';

const DoctorManagement = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [doctors, setDoctors] = useState({
    pending: [],
    active: [],
    suspended: []
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeDetailTab, setActiveDetailTab] = useState('verification');
  const [exportFormat, setExportFormat] = useState('csv');
  const [newDoctorForm, setNewDoctorForm] = useState({
    name: '',
    specialization: 'Cardiologist',
    email: '',
    phone: '',
    license: '',
    experience: '',
    hospital: '',
    qualifications: '',
    consultationFee: '',
    availability: 'Mon-Fri, 9AM-6PM'
  });
  const [suspensionReason, setSuspensionReason] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [documentModalType, setDocumentModalType] = useState('view');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [activeDocumentTab, setActiveDocumentTab] = useState('all');
  const [isSearching, setIsSearching] = useState(false);
  const [approvalModal, setApprovalModal] = useState({ show: false, doctor: null });
  const [reinstatementModal, setReinstatementModal] = useState({ show: false, doctor: null });

  // Stats state
  const [stats, setStats] = useState({
    totalDoctors: 245,
    activeDoctors: 210,
    pendingApprovals: 15,
    suspendedDoctors: 20,
    totalRevenue: 125000000,
    avgRating: 4.8,
    totalConsultations: 45680,
    thisMonthGrowth: 15.2,
    totalPatients: 125600,
    monthlyRevenue: 10500000,
    activeSpecializations: 28,
    licenseExpiring: 8
  });

  // Initialize data
  useEffect(() => {
    const pendingDoctors = [
      {
        id: 'DR001',
        name: 'Dr. Arjun Mehta',
        specialization: 'Cardiologist',
        email: 'arjun.mehta@example.com',
        phone: '+91 9876543210',
        license: 'MCI-12345',
        experience: '10 years',
        hospital: 'Apollo Hospitals, Delhi',
        qualifications: 'MD, DM Cardiology',
        submitted: '2024-01-22',
        documents: [
          { name: 'medical_license.pdf', type: 'Medical License', status: 'verified', uploaded: '2024-01-20', size: '2.4 MB' },
          { name: 'id_proof.pdf', type: 'ID Proof', status: 'verified', uploaded: '2024-01-20', size: '1.8 MB' },
          { name: 'qualification_certificates.pdf', type: 'Qualification Certificates', status: 'pending', uploaded: '2024-01-21', size: '3.2 MB' },
          { name: 'experience_certificate.pdf', type: 'Experience Certificate', status: 'missing', uploaded: null, size: null }
        ],
        estimatedRevenue: 500000,
        consultationFee: 1500,
        availability: 'Mon-Fri, 9AM-6PM'
      },
      {
        id: 'DR002',
        name: 'Dr. Sunita Rao',
        specialization: 'Gynecologist',
        email: 'sunita.rao@example.com',
        phone: '+91 8765432109',
        license: 'MCI-67890',
        experience: '8 years',
        hospital: 'Fortis Hospital, Mumbai',
        qualifications: 'MD, DGO',
        submitted: '2024-01-21',
        documents: [
          { name: 'medical_license.pdf', type: 'Medical License', status: 'verified', uploaded: '2024-01-19', size: '2.1 MB' },
          { name: 'id_proof.pdf', type: 'ID Proof', status: 'verified', uploaded: '2024-01-19', size: '1.9 MB' },
          { name: 'qualification_certificates.pdf', type: 'Qualification Certificates', status: 'verified', uploaded: '2024-01-20', size: '3.3 MB' }
        ],
        estimatedRevenue: 450000,
        consultationFee: 1200,
        availability: 'Tue-Sat, 10AM-7PM'
      },
      {
        id: 'DR003',
        name: 'Dr. Vikram Singh',
        specialization: 'Orthopedic Surgeon',
        email: 'vikram.singh@example.com',
        phone: '+91 7654321098',
        license: 'MCI-99001',
        experience: '12 years',
        hospital: 'Medanta Hospital, Gurgaon',
        qualifications: 'MS Orthopedics',
        submitted: '2024-01-20',
        documents: [
          { name: 'medical_license.pdf', type: 'Medical License', status: 'pending', uploaded: '2024-01-19', size: '2.2 MB' },
          { name: 'id_proof.pdf', type: 'ID Proof', status: 'missing', uploaded: null, size: null },
          { name: 'qualification_certificates.pdf', type: 'Qualification Certificates', status: 'pending', uploaded: '2024-01-20', size: '3.1 MB' }
        ],
        estimatedRevenue: 600000,
        consultationFee: 2000,
        availability: 'Mon-Sat, 8AM-8PM'
      }
    ];

    const activeDoctors = [
      {
        id: 'DR101',
        name: 'Dr. Ramesh Kumar',
        specialization: 'Cardiologist',
        email: 'ramesh.kumar@example.com',
        phone: '+91 9876543211',
        license: 'MCI-98765',
        experience: '15 years',
        hospital: 'Max Hospital, Delhi',
        qualifications: 'DM Cardiology',
        joined: '2024-01-15',
        rating: 4.9,
        status: 'active',
        totalRevenue: 12500000,
        monthlyRevenue: 850000,
        totalConsultations: 1560,
        monthlyConsultations: 145,
        totalPatients: 1250,
        activePatients: 285,
        consultationFee: 2000,
        revenueEarned: 12500000,
        verified: true,
        performance: 96,
        compliance: 'valid',
        lastActive: '2024-01-20 16:30',
        availability: 'active',
        experienceValue: '15 years',
        patientCount: 1250,
        licenseExpiry: '2024-12-31',
        documents: [
          { name: 'medical_license.pdf', type: 'Medical License', status: 'verified', expiry: '2024-12-31' },
          { name: 'id_proof.pdf', type: 'ID Proof', status: 'verified', expiry: '2025-03-31' }
        ]
      },
      {
        id: 'DR102',
        name: 'Dr. Priya Reddy',
        specialization: 'Pediatrician',
        email: 'priya.reddy@example.com',
        phone: '+91 8765432112',
        license: 'MCI-11223',
        experience: '10 years',
        hospital: 'Rainbow Children Hospital, Hyderabad',
        qualifications: 'MD Pediatrics',
        joined: '2024-01-12',
        rating: 4.7,
        status: 'active',
        totalRevenue: 8500000,
        monthlyRevenue: 620000,
        totalConsultations: 1250,
        monthlyConsultations: 112,
        totalPatients: 890,
        activePatients: 245,
        consultationFee: 1500,
        revenueEarned: 8500000,
        verified: true,
        performance: 92,
        compliance: 'expiring',
        lastActive: '2024-01-20 14:15',
        availability: 'active',
        experienceValue: '10 years',
        patientCount: 890,
        licenseExpiry: '2024-02-15',
        documents: [
          { name: 'medical_license.pdf', type: 'Medical License', status: 'expiring', expiry: '2024-02-15' },
          { name: 'id_proof.pdf', type: 'ID Proof', status: 'verified', expiry: '2025-01-31' }
        ]
      },
      {
        id: 'DR103',
        name: 'Dr. Anil Sharma',
        specialization: 'Dermatologist',
        email: 'anil.sharma@example.com',
        phone: '+91 7654321123',
        license: 'MCI-33445',
        experience: '8 years',
        hospital: 'Skin Care Clinic, Bangalore',
        qualifications: 'MD Dermatology',
        joined: '2024-01-10',
        rating: 4.8,
        status: 'active',
        totalRevenue: 6500000,
        monthlyRevenue: 420000,
        totalConsultations: 890,
        monthlyConsultations: 85,
        totalPatients: 620,
        activePatients: 175,
        consultationFee: 1200,
        revenueEarned: 6500000,
        verified: true,
        performance: 94,
        compliance: 'valid',
        lastActive: '2024-01-20 18:45',
        availability: 'active',
        experienceValue: '8 years',
        patientCount: 620,
        licenseExpiry: '2025-06-30',
        documents: [
          { name: 'medical_license.pdf', type: 'Medical License', status: 'verified', expiry: '2025-06-30' },
          { name: 'id_proof.pdf', type: 'ID Proof', status: 'verified', expiry: '2025-03-31' }
        ]
      }
    ];

    const suspendedDoctors = [
      {
        id: 'DR201',
        name: 'Dr. Sanjay Gupta',
        specialization: 'Orthopedic Surgeon',
        email: 'sanjay.gupta@example.com',
        phone: '+91 9876543222',
        license: 'MCI-77889',
        experience: '11 years',
        hospital: 'City Hospital, Mumbai',
        qualifications: 'MS Orthopedics',
        joined: '2023-12-10',
        suspendedDate: '2024-01-15',
        reason: 'License expired and not renewed',
        rating: 4.2,
        totalRevenue: 3500000,
        totalConsultations: 450,
        totalPatients: 120,
        status: 'suspended',
        compliance: 'expired'
      },
      {
        id: 'DR202',
        name: 'Dr. Rahul Verma',
        specialization: 'General Physician',
        email: 'rahul.verma@example.com',
        phone: '+91 8765432333',
        license: 'MCI-45678',
        experience: '7 years',
        hospital: 'Metro Clinic, Delhi',
        qualifications: 'MBBS, MD',
        joined: '2023-11-20',
        suspendedDate: '2024-01-10',
        reason: 'Multiple patient complaints',
        rating: 3.8,
        totalRevenue: 2800000,
        totalConsultations: 320,
        totalPatients: 85,
        status: 'suspended',
        compliance: 'invalid'
      }
    ];

    setDoctors({
      pending: pendingDoctors,
      active: activeDoctors,
      suspended: suspendedDoctors
    });
  }, []);

  // Doctor performance data for charts
  const doctorGrowthData = [
    { month: 'Jan', doctors: 180, consultations: 6500, revenue: 8500000 },
    { month: 'Feb', doctors: 192, consultations: 7200, revenue: 9200000 },
    { month: 'Mar', doctors: 205, consultations: 6800, revenue: 8980000 },
    { month: 'Apr', doctors: 215, consultations: 8050, revenue: 9850000 },
    { month: 'May', doctors: 228, consultations: 9120, revenue: 10600000 },
    { month: 'Jun', doctors: 245, consultations: 10900, revenue: 12500000 }
  ];

  const specializationDistribution = [
    { name: 'Cardiologist', value: 18, color: '#0088FE' },
    { name: 'Orthopedic', value: 15, color: '#00C49F' },
    { name: 'Pediatrician', value: 12, color: '#FFBB28' },
    { name: 'Gynecologist', value: 10, color: '#FF8042' },
    { name: 'Dermatologist', value: 8, color: '#8884D8' },
    { name: 'General Physician', value: 20, color: '#82CA9D' },
    { name: 'Others', value: 17, color: '#FF6B6B' }
  ];

  const revenueTrendData = [
    { day: 'Mon', revenue: 1850000, consultations: 145 },
    { day: 'Tue', revenue: 1920000, consultations: 152 },
    { day: 'Wed', revenue: 1780000, consultations: 141 },
    { day: 'Thu', revenue: 2105000, consultations: 168 },
    { day: 'Fri', revenue: 1950000, consultations: 151 },
    { day: 'Sat', revenue: 1880000, consultations: 148 },
    { day: 'Sun', revenue: 1650000, consultations: 135 }
  ];

  // Toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctorForm(prev => ({
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

  // Add new doctor
  const handleAddDoctor = () => {
    setModalType('add');
    setShowModal(true);
  };

  const submitNewDoctor = () => {
    if (!newDoctorForm.name || !newDoctorForm.license || !newDoctorForm.qualifications) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newDoctor = {
        id: `DR${Date.now()}`,
        ...newDoctorForm,
        submitted: new Date().toISOString().split('T')[0],
        documents: [
          { name: 'medical_license.pdf', type: 'Medical License', status: 'pending', uploaded: new Date().toISOString().split('T')[0], size: '0 KB' },
          { name: 'id_proof.pdf', type: 'ID Proof', status: 'pending', uploaded: null, size: null },
          { name: 'qualification_certificates.pdf', type: 'Qualification Certificates', status: 'pending', uploaded: null, size: null }
        ],
        estimatedRevenue: parseInt(newDoctorForm.consultationFee) * 100 || 500000
      };
      
      setDoctors(prev => ({
        ...prev,
        pending: [newDoctor, ...prev.pending]
      }));
      
      setStats(prev => ({
        ...prev,
        pendingApprovals: prev.pendingApprovals + 1,
        totalDoctors: prev.totalDoctors + 1
      }));
      
      showToast('Doctor application submitted successfully!', 'success');
      setShowModal(false);
      setNewDoctorForm({
        name: '',
        specialization: 'Cardiologist',
        email: '',
        phone: '',
        license: '',
        experience: '',
        hospital: '',
        qualifications: '',
        consultationFee: '',
        availability: 'Mon-Fri, 9AM-6PM'
      });
      setLoading(false);
    }, 2000);
  };

  // View doctor details
  const viewDoctorDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setModalType('details');
    setActiveDetailTab('verification');
    setShowModal(true);
  };

  // View documents for pending doctor
  const handleViewDocuments = (doctor, e) => {
    e.stopPropagation();
    setSelectedDoctor(doctor);
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
        const updatedDoctor = {
          ...selectedDoctor,
          documents: selectedDoctor.documents.map(doc => 
            doc.type === document.type ? { ...doc, status: 'verified' } : doc
          )
        };
        
        // Update doctors state
        setDoctors(prev => ({
          ...prev,
          pending: prev.pending.map(d => 
            d.id === selectedDoctor.id ? updatedDoctor : d
          )
        }));
        
        showToast(`${document.type} approved successfully`, 'success');
        setLoading(false);
        setDocumentModalType('view');
        setSelectedDoctor(updatedDoctor);
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
  const showApprovalConfirmation = (doctor) => {
    setApprovalModal({ show: true, doctor });
  };

  // Confirm approve doctor
  const confirmApproveDoctor = () => {
    const { doctor } = approvalModal;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setDoctors(prev => ({
        ...prev,
        pending: prev.pending.filter(d => d.id !== doctor.id),
        active: [{ 
          ...doctor, 
          status: 'active', 
          joined: new Date().toISOString().split('T')[0],
          rating: 4.5,
          totalRevenue: doctor.estimatedRevenue,
          monthlyRevenue: Math.floor(doctor.estimatedRevenue / 12),
          totalConsultations: 0,
          monthlyConsultations: 0,
          totalPatients: 0,
          activePatients: 0,
          consultationFee: doctor.consultationFee,
          revenueEarned: 0,
          performance: 85,
          compliance: 'valid',
          lastActive: new Date().toISOString(),
          availability: 'active',
          patientCount: 0
        }, ...prev.active]
      }));
      
      setStats(prev => ({
        ...prev,
        pendingApprovals: prev.pendingApprovals - 1,
        activeDoctors: prev.activeDoctors + 1
      }));
      
      showToast(`${doctor.name} has been approved successfully!`, 'success');
      setApprovalModal({ show: false, doctor: null });
      setLoading(false);
    }, 1000);
  };

  // Reject doctor
  const showRejectionModal = (doctor) => {
    setSelectedDoctor(doctor);
    setModalType('reject');
    setRejectionReason('');
    setShowModal(true);
  };

  const confirmRejectDoctor = () => {
    if (!rejectionReason.trim()) {
      showToast('Please provide a reason for rejection', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setDoctors(prev => ({
        ...prev,
        pending: prev.pending.filter(d => d.id !== selectedDoctor.id)
      }));
      
      setStats(prev => ({
        ...prev,
        pendingApprovals: prev.pendingApprovals - 1
      }));
      
      showToast(`${selectedDoctor.name} has been rejected.`, 'error');
      setShowModal(false);
      setModalType(null);
      setSelectedDoctor(null);
      setRejectionReason('');
      setLoading(false);
    }, 1000);
  };

  // Suspend doctor
  const showSuspensionModal = (doctor) => {
    setSelectedDoctor(doctor);
    setModalType('suspend');
    setSuspensionReason('');
    setShowModal(true);
  };

  const confirmSuspendDoctor = () => {
    if (!suspensionReason.trim()) {
      showToast('Please provide a reason for suspension', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setDoctors(prev => ({
        ...prev,
        active: prev.active.filter(d => d.id !== selectedDoctor.id),
        suspended: [{ 
          ...selectedDoctor, 
          status: 'suspended', 
          suspendedDate: new Date().toISOString().split('T')[0], 
          reason: suspensionReason,
          compliance: 'expired'
        }, ...prev.suspended]
      }));
      
      setStats(prev => ({
        ...prev,
        activeDoctors: prev.activeDoctors - 1,
        suspendedDoctors: prev.suspendedDoctors + 1
      }));
      
      showToast(`${selectedDoctor.name} has been suspended.`, 'warning');
      setShowModal(false);
      setModalType(null);
      setSelectedDoctor(null);
      setSuspensionReason('');
      setLoading(false);
    }, 1000);
  };

  // Show reinstatement confirmation modal
  const showReinstatementModal = (doctor) => {
    setReinstatementModal({ show: true, doctor });
  };

  // Confirm reinstate doctor
  const confirmReinstateDoctor = () => {
    const { doctor } = reinstatementModal;
    setLoading(true);
    setTimeout(() => {
      setDoctors(prev => ({
        ...prev,
        suspended: prev.suspended.filter(d => d.id !== doctor.id),
        active: [{ ...doctor, status: 'active', compliance: 'valid' }, ...prev.active]
      }));
      
      setStats(prev => ({
        ...prev,
        activeDoctors: prev.activeDoctors + 1,
        suspendedDoctors: prev.suspendedDoctors - 1
      }));
      
      showToast(`${doctor.name} has been reinstated.`, 'success');
      setReinstatementModal({ show: false, doctor: null });
      setLoading(false);
    }, 1000);
  };

  // Delete doctor
  const showDeleteModal = (doctor) => {
    setSelectedDoctor(doctor);
    setModalType('delete');
    setShowModal(true);
  };

  const confirmDeleteDoctor = () => {
    setLoading(true);
    setTimeout(() => {
      setDoctors(prev => ({
        ...prev,
        suspended: prev.suspended.filter(d => d.id !== selectedDoctor.id)
      }));
      
      setStats(prev => ({
        ...prev,
        suspendedDoctors: prev.suspendedDoctors - 1,
        totalDoctors: prev.totalDoctors - 1
      }));
      
      showToast(`${selectedDoctor.name} has been deleted permanently.`, 'error');
      setShowModal(false);
      setSelectedDoctor(null);
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
    let data = doctors[activeTab] || [];
    
    // Apply search filter
    if (searchTerm) {
      data = data.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.license.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply specialization filter
    if (specializationFilter !== 'all') {
      data = data.filter(doctor => 
        doctor.specialization === specializationFilter
      );
    }
    
    // Apply date filter
    if (dateRange.start && dateRange.end) {
      data = data.filter(doctor => {
        const date = new Date(doctor.joined || doctor.submitted || doctor.suspendedDate);
        const start = new Date(dateRange.start);
        const end = new Date(dateRange.end);
        end.setHours(23, 59, 59, 999);
        return date >= start && date <= end;
      });
    }
    
    return data;
  };

  // Get expiring doctors
  const getExpiringDoctors = () => {
    return doctors.active.filter(d => d.compliance === 'expiring');
  };

  // Table columns
  const columns = {
    pending: [
      { key: 'name', label: 'Doctor Name' },
      { key: 'specialization', label: 'Specialization' },
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
        key: 'consultationFee',
        label: 'Consultation Fee',
        render: (fee) => (
          <span className="revenue-amount">
            <HiCurrencyRupee /> {(fee || 0).toLocaleString('en-IN')}
          </span>
        )
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, doctor) => (
          <div className="action-buttons">
            <button 
              className="btn btn-sm btn-success"
              onClick={(e) => {
                e.stopPropagation();
                showApprovalConfirmation(doctor);
              }}
              title="Approve Doctor"
            >
              <HiCheckCircle /> Approve
            </button>
            <button 
              className="btn btn-sm btn-error"
              onClick={(e) => {
                e.stopPropagation();
                showRejectionModal(doctor);
              }}
              title="Reject Application"
            >
              <HiXCircle /> Reject
            </button>
            <button 
              className="btn btn-sm btn-outline"
              onClick={(e) => handleViewDocuments(doctor, e)}
              title="View Documents"
            >
              <HiDocumentText /> Docs
            </button>
          </div>
        )
      }
    ],
    active: [
      { key: 'name', label: 'Doctor Name' },
      { key: 'specialization', label: 'Specialization' },
      { key: 'totalConsultations', label: 'Total Consultations' },
      { key: 'monthlyConsultations', label: 'Monthly Consultations' },
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
          <div className="doctor-rating">
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
        render: (_, doctor) => (
          <div className="action-buttons">
            <button 
              className="btn btn-sm btn-warning"
              onClick={(e) => {
                e.stopPropagation();
                showSuspensionModal(doctor);
              }}
              title="Suspend Doctor"
            >
              <HiXCircle /> Suspend
            </button>
          </div>
        )
      }
    ],
    suspended: [
      { key: 'name', label: 'Doctor Name' },
      { key: 'specialization', label: 'Specialization' },
      { key: 'totalConsultations', label: 'Total Consultations' },
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
        render: (_, doctor) => (
          <div className="action-buttons">
            <button 
              className="btn btn-sm btn-success"
              onClick={(e) => {
                e.stopPropagation();
                showReinstatementModal(doctor);
              }}
              title="Reinstate Doctor"
            >
              <HiCheckCircle /> Reinstate
            </button>
            <button 
              className="btn btn-sm btn-error"
              onClick={(e) => {
                e.stopPropagation();
                showDeleteModal(doctor);
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
          icon={HiUserGroup} 
          title="Total Doctors" 
          value={stats.totalDoctors} 
          change={8.2}
          color="#0088FE"
        />
        <StatsCard 
          icon={HiCheckCircle} 
          title="Active Doctors" 
          value={stats.activeDoctors} 
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
          icon={HiChat} 
          title="Total Consultations" 
          value={stats.totalConsultations} 
          change={9.3}
          color="#82CA9D"
        />
        <StatsCard 
          icon={HiHeart} 
          title="Total Patients" 
          value={(stats.totalPatients / 1000).toFixed(1) + 'K'}
          change={7.2}
          color="#FF6B6B"
        />
        <StatsCard 
          icon={HiAcademicCap} 
          title="Specializations" 
          value={stats.activeSpecializations}
          change={14.2}
          color="#4ECDC4"
        />
      </div>

      <div className="compliance-alerts">
        <div className="alert-item warning">
          <HiExclamationCircle />
          <div>
            <strong>{getExpiringDoctors().length} Doctors with Expiring Licenses</strong>
            <p>Licenses expiring within 30 days. Review and request renewals.</p>
          </div>
          <button className="btn btn-sm btn-outline" onClick={viewExpiringLicenses}>
            View List
          </button>
        </div>
        <div className="alert-item error">
          <HiExclamationCircle />
          <div>
            <strong>{doctors.suspended.length} Doctors Suspended</strong>
            <p>Due to compliance issues. Immediate action required.</p>
          </div>
          <button className="btn btn-sm btn-outline" onClick={() => setActiveTab('suspended')}>
            Review
          </button>
        </div>
        <div className="alert-item info">
          <HiBell />
          <div>
            <strong>{doctors.pending.length} New Doctor Applications</strong>
            <p>Pending review and verification.</p>
          </div>
          <button className="btn btn-sm btn-outline" onClick={() => setActiveTab('pending')}>
            Review Now
          </button>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Doctor Growth & Revenue</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={doctorGrowthData}>
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
                  dataKey="consultations" 
                  stackId="2"
                  stroke="#00C49F" 
                  fill="#00C49F"
                  fillOpacity={0.6}
                  name="Consultations"
                />
                <Line 
                  type="monotone" 
                  dataKey="doctors" 
                  stroke="#FF8042"
                  strokeWidth={2}
                  name="Doctors"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Specialization Distribution</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={specializationDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {specializationDistribution.map((entry, index) => (
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
          <h3>Consultation Status Distribution</h3>
          <div className="order-stats-grid">
            {[
              { status: 'Scheduled', count: 85, color: '#2196F3' },
              { status: 'In Progress', count: 28, color: '#FFB300' },
              { status: 'Completed', count: 165, color: '#4CAF50' },
              { status: 'Cancelled', count: 12, color: '#F44336' },
              { status: 'Rescheduled', count: 18, color: '#9C27B0' }
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
                <Bar dataKey="consultations" fill="#00C49F" name="Consultations" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <div className="activity-header">
          <h3>Recent Doctor Activity</h3>
          <button className="btn btn-outline btn-sm" onClick={viewAllActivities}>
            View All Activities
          </button>
        </div>
        <div className="card">
          <Table
            columns={[
              { key: 'date', label: 'Date & Time' },
              { key: 'doctor', label: 'Doctor' },
              { key: 'action', label: 'Action' },
              { key: 'patientId', label: 'Patient ID' },
              { 
                key: 'amount', 
                label: 'Amount',
                render: (amount) => amount > 0 ? `₹${amount.toLocaleString('en-IN')}` : '-'
              },
              { key: 'status', label: 'Status' },
              { key: 'duration', label: 'Duration' }
            ]}
            data={[
              { date: '2024-01-20 14:30', doctor: 'Dr. Ramesh Kumar', action: 'Consultation Completed', patientId: 'PAT-7842', amount: 2000, status: 'Completed', duration: '30 min' },
              { date: '2024-01-20 11:15', doctor: 'Dr. Priya Reddy', action: 'Follow-up Scheduled', patientId: 'PAT-6521', amount: 1500, status: 'Scheduled', duration: '20 min' },
              { date: '2024-01-19 16:45', doctor: 'Dr. Anil Sharma', action: 'Prescription Issued', patientId: 'PAY-6521', amount: 0, status: 'Completed', duration: '25 min' },
              { date: '2024-01-19 09:30', doctor: 'Dr. Ramesh Kumar', action: 'Emergency Consultation', patientId: 'PAT-6523', amount: 3000, status: 'Completed', duration: '45 min' },
              { date: '2024-01-18 17:20', doctor: 'Dr. Priya Reddy', action: 'Video Consultation', patientId: 'PAT-5123', amount: 1800, status: 'Completed', duration: '35 min' }
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
          <h4>Revenue by Specialization</h4>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { specialization: 'Cardiologist', revenue: 28500000, percentage: 23 },
                { specialization: 'Orthopedic', revenue: 24500000, percentage: 20 },
                { specialization: 'Pediatrician', revenue: 18500000, percentage: 15 },
                { specialization: 'Gynecologist', revenue: 16500000, percentage: 13 },
                { specialization: 'Dermatologist', revenue: 12500000, percentage: 10 },
                { specialization: 'Others', revenue: 24500000, percentage: 19 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="specialization" />
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
                { month: 'Jul', revenue: 8500000, consultations: 3200 },
                { month: 'Aug', revenue: 9200000, consultations: 3450 },
                { month: 'Sep', revenue: 10500000, consultations: 3850 },
                { month: 'Oct', revenue: 11500000, consultations: 4200 },
                { month: 'Nov', revenue: 12200000, consultations: 4560 },
                { month: 'Dec', revenue: 12500000, consultations: 4680 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#FF8042" strokeWidth={2} />
                <Line type="monotone" dataKey="consultations" stroke="#00C49F" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="report-card">
          <h4>Key Metrics</h4>
          <div className="report-metrics">
            <div className="report-metric">
              <div className="report-value">{stats.totalDoctors}</div>
              <div className="report-label">Total Doctors</div>
            </div>
            <div className="report-metric">
              <div className="report-value">₹{(stats.totalRevenue / 10000000).toFixed(1)}Cr</div>
              <div className="report-label">Total Revenue</div>
            </div>
            <div className="report-metric">
              <div className="report-value">{stats.totalConsultations}</div>
              <div className="report-label">Total Consultations</div>
            </div>
            <div className="report-metric">
              <div className="report-value">{stats.avgRating}</div>
              <div className="report-label">Avg Rating</div>
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
                    { name: 'Valid', value: stats.activeDoctors - getExpiringDoctors().length, color: '#00C49F' },
                    { name: 'Expiring', value: getExpiringDoctors().length, color: '#FFBB28' },
                    { name: 'Expired', value: stats.suspendedDoctors, color: '#FF8042' }
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
                    { name: 'Valid', value: stats.activeDoctors - getExpiringDoctors().length, color: '#00C49F' },
                    { name: 'Expiring', value: getExpiringDoctors().length, color: '#FFBB28' },
                    { name: 'Expired', value: stats.suspendedDoctors, color: '#FF8042' }
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
          title="New Patients" 
          value="2,850" 
          change={8.5}
          color="#00C49F"
        />
        <StatsCard 
          icon={HiChat} 
          title="Avg Consultation Fee" 
          value="₹1,850" 
          change={4.2}
          color="#FF8042"
          prefix="₹"
        />
        <StatsCard 
          icon={HiStar} 
          title="Satisfaction" 
          value="96.5%" 
          color="#8884D8"
        />
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Doctor Performance Trend</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[
                { month: 'Jul', revenue: 8500000, consultations: 3200 },
                { month: 'Aug', revenue: 9200000, consultations: 3450 },
                { month: 'Sep', revenue: 10500000, consultations: 3850 },
                { month: 'Oct', revenue: 11500000, consultations: 4200 },
                { month: 'Nov', revenue: 12200000, consultations: 4560 },
                { month: 'Dec', revenue: 12500000, consultations: 4680 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#0088FE" strokeWidth={2} />
                <Line type="monotone" dataKey="consultations" stroke="#00C49F" strokeWidth={2} />
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
                { region: 'North', doctors: 65, revenue: 35000000 },
                { region: 'South', doctors: 88, revenue: 48500000 },
                { region: 'East', doctors: 38, revenue: 18500000 },
                { region: 'West', doctors: 54, revenue: 28500000 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="doctors" fill="#0088FE" name="Doctors" />
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
              emptyMessage={`No ${activeTab} doctors found`}
              onRowClick={activeTab === 'active' || activeTab === 'pending' ? viewDoctorDetails : null}
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
            <p>Select the format to export doctor data:</p>
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
            <h4>Add New Doctor</h4>
            <div className="form-group">
              <label className="form-label">Doctor Name *</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={newDoctorForm.name}
                onChange={handleInputChange}
                placeholder="Enter doctor name"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Specialization *</label>
                <select
                  className="form-control"
                  name="specialization"
                  value={newDoctorForm.specialization}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Orthopedic">Orthopedic Surgeon</option>
                  <option value="Pediatrician">Pediatrician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="General Physician">General Physician</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Psychiatrist">Psychiatrist</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Medical License No. *</label>
                <input
                  type="text"
                  className="form-control"
                  name="license"
                  value={newDoctorForm.license}
                  onChange={handleInputChange}
                  placeholder="Enter license number"
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
                  value={newDoctorForm.email}
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
                  value={newDoctorForm.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Qualifications *</label>
                <input
                  type="text"
                  className="form-control"
                  name="qualifications"
                  value={newDoctorForm.qualifications}
                  onChange={handleInputChange}
                  placeholder="e.g., MBBS, MD, DM"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Experience</label>
                <input
                  type="text"
                  className="form-control"
                  name="experience"
                  value={newDoctorForm.experience}
                  onChange={handleInputChange}
                  placeholder="e.g., 10 years"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Hospital/Clinic</label>
                <input
                  type="text"
                  className="form-control"
                  name="hospital"
                  value={newDoctorForm.hospital}
                  onChange={handleInputChange}
                  placeholder="Enter hospital or clinic name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Consultation Fee (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  name="consultationFee"
                  value={newDoctorForm.consultationFee}
                  onChange={handleInputChange}
                  placeholder="Enter consultation fee"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Availability</label>
              <input
                type="text"
                className="form-control"
                name="availability"
                value={newDoctorForm.availability}
                onChange={handleInputChange}
                placeholder="e.g., Mon-Fri, 9AM-6PM"
              />
            </div>
            <div className="form-actions">
              <button className="btn btn-outline" onClick={() => setShowModal(false)} disabled={loading}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={submitNewDoctor}
                disabled={loading}
              >
                {loading ? <span className="loading-spinner" /> : 'Submit Application'}
              </button>
            </div>
          </div>
        );

      case 'details':
        return (
          <div className="doctor-details-modal">
            <div className="doctor-header">
              <div className="doctor-avatar">
                {selectedDoctor?.name?.charAt(0)}
              </div>
              <div className="doctor-info">
                <h2>{selectedDoctor?.name}</h2>
                <p className="doctor-specialization">{selectedDoctor?.specialization}</p>
                <div className="doctor-stats">
                  {selectedDoctor?.rating && (
                    <span className="stat-item">
                      <HiStar /> Rating: {selectedDoctor?.rating || 'N/A'}
                    </span>
                  )}
                  <span className="stat-item">
                    <HiChat /> Consultations: {selectedDoctor?.totalConsultations || selectedDoctor?.estimatedRevenue || 'N/A'}
                  </span>
                  <span className="stat-item">
                    <HiAcademicCap /> {selectedDoctor?.qualifications || 'N/A'}
                  </span>
                  {selectedDoctor?.totalRevenue && (
                    <span className="stat-item">
                      <HiCurrencyRupee /> Revenue: ₹{(selectedDoctor?.totalRevenue || 0).toLocaleString('en-IN')}
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
                  className={`detail-tab ${activeDetailTab === 'professional' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('professional')}
                >
                  Professional Details
                </button>
                <button 
                  className={`detail-tab ${activeDetailTab === 'performance' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('performance')}
                >
                  Performance
                </button>
                <button 
                  className={`detail-tab ${activeDetailTab === 'consultations' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('consultations')}
                >
                  Consultations
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
                      {selectedDoctor?.documents?.map((doc, index) => (
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
                              <button className="btn btn-sm btn-outline" onClick={() => showToast('Document request sent to doctor', 'info')}>
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

                {activeDetailTab === 'professional' && (
                  <div className="details-grid">
                    <div className="details-section">
                      <h5>Professional Information</h5>
                      <div className="info-grid">
                        <div className="info-item">
                          <label>Doctor Name</label>
                          <span>{selectedDoctor?.name}</span>
                        </div>
                        <div className="info-item">
                          <label>Specialization</label>
                          <span>{selectedDoctor?.specialization}</span>
                        </div>
                        <div className="info-item">
                          <label>Qualifications</label>
                          <span>{selectedDoctor?.qualifications}</span>
                        </div>
                        <div className="info-item">
                          <label>Experience</label>
                          <span>{selectedDoctor?.experience}</span>
                        </div>
                        <div className="info-item">
                          <label>License Number</label>
                          <span>{selectedDoctor?.license}</span>
                        </div>
                        <div className="info-item">
                          <label>Hospital/Clinic</label>
                          <span>{selectedDoctor?.hospital || 'N/A'}</span>
                        </div>
                        <div className="info-item">
                          <label>Registration Date</label>
                          <span>{new Date(selectedDoctor?.joined || selectedDoctor?.submitted).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="info-item">
                          <label>Status</label>
                          <span className={`status-badge status-${selectedDoctor?.status || 'pending'}`}>
                            {selectedDoctor?.status || 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="details-section">
                      <h5>Contact & Availability</h5>
                      <div className="info-grid">
                        <div className="info-item">
                          <label>Email</label>
                          <span>{selectedDoctor?.email}</span>
                        </div>
                        <div className="info-item">
                          <label>Phone</label>
                          <span>{selectedDoctor?.phone}</span>
                        </div>
                        <div className="info-item">
                          <label>Availability</label>
                          <span>{selectedDoctor?.availability || 'Mon-Fri, 9AM-6PM'}</span>
                        </div>
                        <div className="info-item">
                          <label>Consultation Fee</label>
                          <span>₹{(selectedDoctor?.consultationFee || 0).toLocaleString('en-IN')}</span>
                        </div>
                        {selectedDoctor?.compliance && (
                          <div className="info-item">
                            <label>Compliance Status</label>
                            <span className={`compliance-badge compliance-${selectedDoctor?.compliance}`}>
                              {selectedDoctor?.compliance === 'valid' ? (
                                <><HiShieldCheck /> Valid</>
                              ) : selectedDoctor?.compliance === 'expiring' ? (
                                <><HiExclamationCircle /> Expiring</>
                              ) : (
                                <><HiExclamation /> {selectedDoctor?.compliance}</>
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeDetailTab === 'performance' && selectedDoctor?.totalRevenue && (
                  <div className="performance-section">
                    <h5>Performance Metrics</h5>
                    <div className="metrics-grid">
                      <div className="metric-card">
                        <div className="metric-value">{selectedDoctor?.totalConsultations || '0'}</div>
                        <div className="metric-label">Total Consultations</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">₹{(selectedDoctor?.totalRevenue || 0).toLocaleString('en-IN')}</div>
                        <div className="metric-label">Total Revenue</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">{selectedDoctor?.totalPatients || '0'}</div>
                        <div className="metric-label">Total Patients</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">{selectedDoctor?.rating || '0'}</div>
                        <div className="metric-label">Rating</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">{selectedDoctor?.patientCount || '0'}</div>
                        <div className="metric-label">Active Patients</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">{selectedDoctor?.performance || '0'}%</div>
                        <div className="metric-label">Performance Score</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeDetailTab === 'consultations' && (
                  <div className="recent-activity">
                    <h4>Consultation History - {selectedDoctor?.name}</h4>
                    <div className="card">
                      <Table
                        columns={[
                          { key: 'date', label: 'Date' },
                          { key: 'patientId', label: 'Patient ID' },
                          { key: 'amount', label: 'Amount' },
                          { key: 'status', label: 'Status' },
                          { key: 'duration', label: 'Duration' }
                        ]}
                        data={[
                          { date: '2024-01-20', patientId: 'PAT-7842', amount: 2000, status: 'Completed', duration: '30 min' },
                          { date: '2024-01-19', patientId: 'PAT-6521', amount: 1500, status: 'Scheduled', duration: '20 min' },
                          { date: '2024-01-18', patientId: 'PAT-5123', amount: 1800, status: 'Completed', duration: '35 min' },
                          { date: '2024-01-17', patientId: 'PAT-4125', amount: 3000, status: 'Emergency', duration: '45 min' }
                        ]}
                      />
                    </div>
                  </div>
                )}

                {activeDetailTab === 'financials' && selectedDoctor?.totalRevenue && (
                  <div className="performance-section">
                    <h5>Financial Overview</h5>
                    <div className="metrics-grid">
                      <div className="metric-card">
                        <div className="metric-value">₹{(selectedDoctor?.totalRevenue || 0).toLocaleString('en-IN')}</div>
                        <div className="metric-label">Total Revenue</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">₹{(selectedDoctor?.monthlyRevenue || 0).toLocaleString('en-IN')}</div>
                        <div className="metric-label">Monthly Revenue</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">₹{(selectedDoctor?.consultationFee || 0).toLocaleString('en-IN')}</div>
                        <div className="metric-label">Consultation Fee</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">{selectedDoctor?.totalConsultations || '0'}</div>
                        <div className="metric-label">Total Consultations</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">{selectedDoctor?.totalPatients || '0'}</div>
                        <div className="metric-label">Total Patients</div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedDoctor?.status === 'pending' && (
                  <div className="verification-actions">
                    <button 
                      className="btn btn-error"
                      onClick={() => showRejectionModal(selectedDoctor)}
                      disabled={loading}
                    >
                      <HiXCircle /> Reject Application
                    </button>
                    <button 
                      className="btn btn-success"
                      onClick={() => showApprovalConfirmation(selectedDoctor)}
                      disabled={loading}
                    >
                      <HiCheckCircle /> Approve Doctor
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
                <h4>Delete Doctor Permanently?</h4>
                <p>Are you sure you want to delete <strong>{selectedDoctor?.name}</strong>? This action cannot be undone.</p>
              </div>
              <div className="form-actions">
                <button className="btn btn-outline" onClick={() => {
                  setShowModal(false);
                  setModalType(null);
                  setSelectedDoctor(null);
                }} disabled={loading}>
                  Cancel
                </button>
                <button 
                  className="btn btn-error" 
                  onClick={confirmDeleteDoctor}
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
            <h4>All Doctor Activities</h4>
            <div className="activity-filters">
              <select className="activity-filter-select">
                <option>All Doctors</option>
                <option>Dr. Ramesh Kumar</option>
                <option>Dr. Priya Reddy</option>
                <option>Dr. Anil Sharma</option>
              </select>
              <select className="activity-filter-select">
                <option>All Actions</option>
                <option>Consultation</option>
                <option>Prescription</option>
                <option>Follow-up</option>
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
                <div className="activity-stat-value">₹2.5M</div>
                <div className="activity-stat-label">Total Value</div>
              </div>
              <div className="activity-stat-card">
                <div className="activity-stat-value">145</div>
                <div className="activity-stat-label">Consultations</div>
              </div>
              <div className="activity-stat-card">
                <div className="activity-stat-value">11</div>
                <div className="activity-stat-label">Cancelled</div>
              </div>
            </div>
            <div className="activity-list">
              {[
                { id: 1, date: '2024-01-20 14:30', doctor: 'Dr. Ramesh Kumar', action: 'Consultation Completed', patientId: 'PAT-7842', amount: 2000, status: 'Completed', duration: '30 min' },
                { id: 2, date: '2024-01-20 11:15', doctor: 'Dr. Priya Reddy', action: 'Follow-up Scheduled', patientId: 'PAT-6521', amount: 1500, status: 'Scheduled', duration: '20 min' },
                { id: 3, date: '2024-01-19 16:45', doctor: 'Dr. Anil Sharma', action: 'Prescription Issued', patientId: 'PAY-6521', amount: 0, status: 'Completed', duration: '25 min' },
                { id: 4, date: '2024-01-19 09:30', doctor: 'Dr. Ramesh Kumar', action: 'Emergency Consultation', patientId: 'PAT-6523', amount: 3000, status: 'Completed', duration: '45 min' },
                { id: 5, date: '2024-01-18 17:20', doctor: 'Dr. Priya Reddy', action: 'Video Consultation', patientId: 'PAT-5123', amount: 1800, status: 'Completed', duration: '35 min' },
                { id: 6, date: '2024-01-18 10:45', doctor: 'Dr. Anil Sharma', action: 'Consultation Completed', patientId: 'PAT-4125', amount: 1200, status: 'Completed', duration: '30 min' },
                { id: 7, date: '2024-01-17 15:20', doctor: 'Dr. Ramesh Kumar', action: 'Follow-up', patientId: 'PAT-3214', amount: 1800, status: 'Completed', duration: '25 min' },
                { id: 8, date: '2024-01-17 09:10', doctor: 'Dr. Priya Reddy', action: 'New Patient', patientId: 'PAT-2345', amount: 1500, status: 'Completed', duration: '40 min' }
              ].map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-info">
                    <h5>{activity.doctor} - {activity.action}</h5>
                    <p>{activity.date} • Patient ID: {activity.patientId}</p>
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
        const expiringDoctors = getExpiringDoctors();
        return (
          <div className="modal-body">
            <h4>Doctors with Expiring Licenses</h4>
            <p>{expiringDoctors.length} doctors have licenses expiring within 30 days.</p>
            <div className="expiring-licenses-grid">
              {expiringDoctors.map((doctor, index) => {
                const daysLeft = Math.ceil((new Date(doctor.licenseExpiry) - new Date()) / (1000 * 60 * 60 * 24));
                let daysClass = 'info';
                if (daysLeft <= 7) daysClass = 'critical';
                else if (daysLeft <= 15) daysClass = 'warning';
                
                return (
                  <div key={index} className="expiring-doctor-card">
                    <div className="expiring-doctor-header">
                      <div className="expiring-doctor-name">{doctor.name}</div>
                      <div className={`expiring-days ${daysClass}`}>
                        {daysLeft} days
                      </div>
                    </div>
                    <div className="expiring-doctor-details">
                      <div className="expiring-detail-item">
                        <span className="expiring-detail-label">License No.</span>
                        <span className="expiring-detail-value">{doctor.license}</span>
                      </div>
                      <div className="expiring-detail-item">
                        <span className="expiring-detail-label">Expiry Date</span>
                        <span className="expiring-detail-value">{new Date(doctor.licenseExpiry).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="expiring-detail-item">
                        <span className="expiring-detail-label">Specialization</span>
                        <span className="expiring-detail-value">{doctor.specialization}</span>
                      </div>
                      <div className="expiring-detail-item">
                        <span className="expiring-detail-label">Contact</span>
                        <span className="expiring-detail-value">{doctor.phone}</span>
                      </div>
                    </div>
                    <div className="quick-actions">
                      <button className="btn btn-sm btn-outline" onClick={() => showToast(`Notification sent to ${doctor.name}`, 'info')}>
                        Send Reminder
                      </button>
                      <button className="btn btn-sm btn-warning" onClick={() => showSuspensionModal(doctor)}>
                        Suspend
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={() => {
                expiringDoctors.forEach(d => showToast(`Reminder sent to ${d.name}`, 'info'));
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
        const filteredDocuments = filterDocumentsByTab(selectedDoctor?.documents);
        return (
          <div className="modal-body">
            <div className="document-preview-modal">
              <h4>Doctor Documents - {selectedDoctor?.name}</h4>
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
            <h4>Suspend Doctor</h4>
            <p>You are about to suspend <strong>{selectedDoctor?.name}</strong>. Please provide a reason for suspension.</p>
            
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
                setSelectedDoctor(null);
                setSuspensionReason('');
              }} disabled={loading}>
                Cancel
              </button>
              <button 
                className="btn btn-error" 
                onClick={confirmSuspendDoctor}
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
            <h4>Reject Doctor Application</h4>
            <p>You are about to reject <strong>{selectedDoctor?.name}</strong>'s application. Please provide a reason for rejection.</p>
            
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
                setSelectedDoctor(null);
                setRejectionReason('');
              }} disabled={loading}>
                Cancel
              </button>
              <button 
                className="btn btn-error" 
                onClick={confirmRejectDoctor}
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
    <div className="doctor-management">
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
          title="Confirm Doctor Approval"
          onClose={() => setApprovalModal({ show: false, doctor: null })}
          size="medium"
        >
          <div className="modal-body">
            <div className="delete-confirmation">
              <div className="delete-icon" style={{ color: '#4CAF50' }}>
                <HiCheckCircle />
              </div>
              <div className="delete-message">
                <h4>Approve Doctor?</h4>
                <p>Are you sure you want to approve <strong>{approvalModal.doctor?.name}</strong>? This will activate their account.</p>
              </div>
              <div className="form-actions">
                <button className="btn btn-outline" onClick={() => setApprovalModal({ show: false, doctor: null })} disabled={loading}>
                  Cancel
                </button>
                <button 
                  className="btn btn-success" 
                  onClick={confirmApproveDoctor}
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
          title="Confirm Doctor Reinstatement"
          onClose={() => setReinstatementModal({ show: false, doctor: null })}
          size="medium"
        >
          <div className="modal-body">
            <div className="delete-confirmation">
              <div className="delete-icon" style={{ color: '#4CAF50' }}>
                <HiCheckCircle />
              </div>
              <div className="delete-message">
                <h4>Reinstate Doctor?</h4>
                <p>Are you sure you want to reinstate <strong>{reinstatementModal.doctor?.name}</strong>? This will reactivate their account.</p>
              </div>
              <div className="form-actions">
                <button className="btn btn-outline" onClick={() => setReinstatementModal({ show: false, doctor: null })} disabled={loading}>
                  Cancel
                </button>
                <button 
                  className="btn btn-success" 
                  onClick={confirmReinstateDoctor}
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
          <h1>Doctor Management Dashboard</h1>
          <p>Manage doctor onboarding, monitor performance, and oversee all doctor operations</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={handleExport}>
            <HiDownload /> Export Data
          </button>
          <button className="btn btn-primary" onClick={handleAddDoctor}>
            <HiUserGroup /> Add New Doctor
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
          <HiClock /> Pending ({doctors.pending.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          <HiCheckCircle /> Active ({doctors.active.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'suspended' ? 'active' : ''}`}
          onClick={() => setActiveTab('suspended')}
        >
          <HiXCircle /> Suspended ({doctors.suspended.length})
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
                placeholder="Search doctors by name, specialization, license, email or phone..."
                value={searchTerm}
                onChange={handleSearch}
                className="form-control"
              />
            </div>
            <div className="filter-options">
              <select 
                className="select-input"
                value={specializationFilter}
                onChange={(e) => setSpecializationFilter(e.target.value)}
              >
                <option value="all">All Specializations</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Orthopedic">Orthopedic Surgeon</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="General Physician">General Physician</option>
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
                  setSpecializationFilter('all');
                  showToast('Filters cleared', 'info');
                }}
              >
                <HiFilter /> Clear Filters
              </button>
            </div>
          </div>
          <div className="toolbar-right">
            <span className="results-count">
              Showing {getFilteredData().length} of {doctors[activeTab]?.length || 0} results
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
              <p>Found {getFilteredData().length} doctors matching your search</p>
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
            modalType === 'add' ? 'Add New Doctor' :
            modalType === 'details' ? `Doctor Details - ${selectedDoctor?.name}` :
            modalType === 'delete' ? 'Confirm Deletion' :
            modalType === 'activities' ? 'All Doctor Activities' :
            modalType === 'expiring' ? 'Expiring Licenses' :
            modalType === 'documents' ? `Documents - ${selectedDoctor?.name}` :
            modalType === 'suspend' ? 'Suspend Doctor' :
            modalType === 'reject' ? 'Reject Doctor Application' : 'Modal'
          }
          onClose={() => {
            setShowModal(false);
            setModalType(null);
            setSelectedDoctor(null);
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

export default DoctorManagement;