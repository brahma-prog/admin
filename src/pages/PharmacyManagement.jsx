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
  HiExclamation
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
  Area
} from 'recharts';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import SearchBar from '../components/common/SearchBar';
import './PharmacyManagement.css';

const PharmacyManagement = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
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

  // Pharmacy Data
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
      documents: ['drug_license.pdf', 'gst_certificate.pdf', 'id_proof.pdf', 'address_proof.pdf'],
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
      documents: ['drug_license.pdf', 'gst_certificate.pdf', 'id_proof.pdf'],
      estimatedRevenue: 3200000,
      productsToAdd: 185,
      storeHours: '24/7',
      deliveryRadius: '8 km'
    },
    {
      id: 'PH003',
      name: 'Fortis Pharmacy',
      type: 'Hospital Pharmacy',
      owner: 'Dr. Anil Sharma',
      email: 'anil@fortis.com',
      phone: '+91 7654321098',
      address: '789 Indiranagar, Bangalore, Karnataka',
      license: 'KA-PH-54321',
      gst: '29KLMNO9012H3X7',
      submitted: '2024-01-20',
      documents: ['drug_license.pdf', 'gst_certificate.pdf', 'id_proof.pdf', 'medical_certificate.pdf'],
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
      customerCount: 1250
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
      customerCount: 890
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
      customerCount: 620
    },
    {
      id: 'PH104',
      name: 'Wellness Pharmacy',
      type: 'Chain Pharmacy',
      owner: 'Dr. Neha Verma',
      email: 'neha@wellnesspharma.com',
      phone: '+91 6543211234',
      address: '456 HSR Layout, Bangalore, Karnataka',
      license: 'KA-PH-55667',
      gst: '29EFGHI5678L7T2',
      joined: '2024-01-08',
      rating: 4.4,
      status: 'active',
      totalRevenue: 1850000,
      monthlyRevenue: 380000,
      totalOrders: 780,
      monthlyOrders: 72,
      totalProducts: 165,
      activeProducts: 145,
      commissionRate: 8.5,
      commissionEarned: 185000,
      verified: true,
      performance: 85,
      compliance: 'valid',
      lastActive: '2024-01-20 12:20',
      deliveryStatus: 'active',
      inventoryValue: 520000,
      customerCount: 540
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
      name: 'City Med Pharmacy',
      type: 'Retail Pharmacy',
      owner: 'Dr. Arjun Mehta',
      email: 'arjun@citymed.com',
      phone: '+91 8765432333',
      address: '321 Indiranagar, Bangalore, Karnataka',
      license: 'KA-PH-99001',
      gst: '29RSTUV3456N9R4',
      joined: '2023-11-25',
      suspendedDate: '2024-01-10',
      reason: 'Multiple customer complaints about service',
      rating: 3.2,
      totalRevenue: 850000,
      totalOrders: 320,
      totalProducts: 95,
      status: 'suspended',
      compliance: 'invalid'
    }
  ];

  // Pharmacy History/Activity
  const pharmacyHistory = [
    {
      id: 1,
      date: '2024-01-20 14:30',
      pharmacy: 'Health Plus Pharmacy',
      action: 'Order Processed',
      orderId: 'ORD-7842',
      amount: 2450,
      status: 'Delivered',
      items: 8
    },
    {
      id: 2,
      date: '2024-01-20 11:15',
      pharmacy: 'Care Pharmacy',
      action: 'Inventory Added',
      details: 'Added 15 new medicines',
      amount: 0,
      status: 'Completed',
      items: 15
    },
    {
      id: 3,
      date: '2024-01-19 16:45',
      pharmacy: 'MedicFirst Pharmacy',
      action: 'Payment Received',
      orderId: 'PAY-6521',
      amount: 12500,
      status: 'Success',
      items: 0
    },
    {
      id: 4,
      date: '2024-01-19 09:30',
      pharmacy: 'Wellness Pharmacy',
      action: 'Order Cancelled',
      orderId: 'ORD-6523',
      amount: 1850,
      status: 'Refunded',
      items: 5
    },
    {
      id: 5,
      date: '2024-01-18 17:20',
      pharmacy: 'Health Plus Pharmacy',
      action: 'Prescription Upload',
      details: 'Uploaded prescription for order',
      amount: 0,
      status: 'Verified',
      items: 1
    }
  ];

  // Order Statistics
  const orderStats = [
    { status: 'Pending', count: 45, color: '#FFB300' },
    { status: 'Processing', count: 28, color: '#2196F3' },
    { status: 'Shipped', count: 65, color: '#4CAF50' },
    { status: 'Delivered', count: 120, color: '#0088FE' },
    { status: 'Cancelled', count: 12, color: '#F44336' }
  ];

  const columns = {
    pending: [
      { key: 'name', label: 'Pharmacy Name' },
      { key: 'type', label: 'Type' },
      { key: 'owner', label: 'Owner' },
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
        key: 'estimatedRevenue',
        label: 'Est. Monthly Revenue',
        render: (revenue) => (
          <span className="revenue-amount">
            <HiCurrencyRupee /> {revenue.toLocaleString()}
          </span>
        )
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, pharmacy) => (
          <div className="action-buttons">
            <button 
              className="btn-icon btn-sm btn-success"
              onClick={() => approvePharmacy(pharmacy)}
              title="Approve Pharmacy"
            >
              <HiCheckCircle /> Approve
            </button>
            <button 
              className="btn-icon btn-sm btn-error"
              onClick={() => rejectPharmacy(pharmacy)}
              title="Reject Application"
            >
              <HiXCircle /> Reject
            </button>
            <button 
              className="btn-icon btn-sm btn-outline"
              onClick={() => viewDocuments(pharmacy)}
              title="View Documents"
            >
              <HiDocumentText /> Docs
            </button>
            <button 
              className="btn-icon btn-sm btn-info"
              onClick={() => viewPharmacyDetails(pharmacy)}
              title="View Details"
            >
              <HiEye />
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
            <HiCurrencyRupee /> {revenue.toLocaleString()}
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
        key: 'lastActive', 
        label: 'Last Active',
        render: (date) => new Date(date).toLocaleString()
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, pharmacy) => (
          <div className="action-buttons">
            <button 
              className="btn-icon btn-sm btn-info"
              onClick={() => viewPharmacyDetails(pharmacy)}
              title="View Details"
            >
              <HiEye />
            </button>
            <button 
              className="btn-icon btn-sm btn-warning"
              onClick={() => editPharmacy(pharmacy)}
              title="Edit Details"
            >
              <HiPencil />
            </button>
            <button 
              className="btn-icon btn-sm btn-error"
              onClick={() => suspendPharmacy(pharmacy)}
              title="Suspend Pharmacy"
            >
              <HiXCircle />
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
        render: (date) => new Date(date).toLocaleDateString()
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
              className="btn-icon btn-sm btn-success"
              onClick={() => reinstatePharmacy(pharmacy)}
              title="Reinstate Pharmacy"
            >
              <HiCheckCircle /> Reinstate
            </button>
            <button 
              className="btn-icon btn-sm btn-error"
              onClick={() => deletePharmacy(pharmacy)}
              title="Delete Permanently"
            >
              <HiTrash />
            </button>
          </div>
        )
      }
    ]
  };

  const approvePharmacy = (pharmacy) => {
    if (window.confirm(`Approve ${pharmacy.name}?`)) {
      // API call to approve
      console.log('Approve pharmacy:', pharmacy.id);
      alert(`${pharmacy.name} has been approved successfully!`);
    }
  };

  const rejectPharmacy = (pharmacy) => {
    const reason = prompt('Enter reason for rejection:', '');
    if (reason) {
      // API call to reject
      console.log('Reject pharmacy:', pharmacy.id, reason);
      alert(`${pharmacy.name} has been rejected.`);
    }
  };

  const viewDocuments = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setShowModal(true);
  };

  const viewPharmacyDetails = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setShowModal(true);
  };

  const editPharmacy = (pharmacy) => {
    // Open edit modal or navigate to edit page
    console.log('Edit pharmacy:', pharmacy.id);
    alert(`Edit functionality for ${pharmacy.name}`);
  };

  const suspendPharmacy = (pharmacy) => {
    const reason = prompt('Enter reason for suspension:', '');
    if (reason) {
      if (window.confirm(`Suspend ${pharmacy.name}?`)) {
        // API call to suspend
        console.log('Suspend pharmacy:', pharmacy.id, reason);
        alert(`${pharmacy.name} has been suspended.`);
      }
    }
  };

  const reinstatePharmacy = (pharmacy) => {
    if (window.confirm(`Reinstate ${pharmacy.name}?`)) {
      // API call to reinstate
      console.log('Reinstate pharmacy:', pharmacy.id);
      alert(`${pharmacy.name} has been reinstated.`);
    }
  };

  const deletePharmacy = (pharmacy) => {
    if (window.confirm(`Permanently delete ${pharmacy.name}? This action cannot be undone.`)) {
      // API call to delete
      console.log('Delete pharmacy:', pharmacy.id);
      alert(`${pharmacy.name} has been deleted.`);
    }
  };

  const exportData = () => {
    // Export data logic
    console.log('Exporting pharmacy data...');
    alert('Pharmacy data exported successfully!');
  };

  const getFilteredData = () => {
    let data = [];
    switch (activeTab) {
      case 'pending': data = pendingPharmacies; break;
      case 'active': data = activePharmacies; break;
      case 'suspended': data = suspendedPharmacies; break;
      default: data = [];
    }

    if (searchTerm) {
      data = data.filter(pharmacy => 
        pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pharmacy.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pharmacy.license.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return data;
  };

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
            {orderStats.map((stat, index) => (
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
          <button className="btn btn-outline btn-sm">
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
                render: (amount) => amount > 0 ? `₹${amount}` : '-'
              },
              { key: 'status', label: 'Status' },
              { key: 'items', label: 'Items' }
            ]}
            data={pharmacyHistory}
          />
        </div>
      </div>
    </>
  );

  const renderTabContent = () => {
    if (activeTab === 'dashboard') {
      return renderDashboard();
    }

    return (
      <div className="card">
        <Table
          columns={columns[activeTab]}
          data={getFilteredData()}
          emptyMessage={`No ${activeTab} pharmacies found`}
        />
      </div>
    );
  };

  return (
    <div className="pharmacy-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Pharmacy Super Admin Dashboard</h1>
          <p>Manage pharmacy onboarding, monitor performance, and oversee all pharmacy operations</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={exportData}>
            <HiDownload /> Export Data
          </button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add New Pharmacy
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
          <HiClock /> Pending ({pendingPharmacies.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          <HiCheckCircle /> Active ({activePharmacies.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'suspended' ? 'active' : ''}`}
          onClick={() => setActiveTab('suspended')}
        >
          <HiXCircle /> Suspended ({suspendedPharmacies.length})
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

      {activeTab !== 'dashboard' && (
        <div className="management-toolbar">
          <div className="toolbar-left">
            <SearchBar
              placeholder="Search pharmacies by name, owner or license..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="filter-options">
              <select className="select-input">
                <option>All Pharmacy Types</option>
                <option>Retail Pharmacy</option>
                <option>Hospital Pharmacy</option>
                <option>Chain Pharmacy</option>
                <option>Online Pharmacy</option>
              </select>
              
              <div className="simple-date-input">
                <HiCalendar className="date-icon" />
                <input
                  type="date"
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  placeholder="Start Date"
                  className="date-input-field"
                />
              </div>
              
              <div className="simple-date-input">
                <HiCalendar className="date-icon" />
                <input
                  type="date"
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  placeholder="End Date"
                  className="date-input-field"
                />
              </div>
              
              <button className="btn btn-outline">
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

      {activeTab === 'dashboard' && (
        <div className="compliance-alerts">
          <div className="alert-item warning">
            <HiExclamationCircle />
            <div>
              <strong>3 Pharmacies with Expiring Licenses</strong>
              <p>Licenses expiring within 30 days. Review and request renewals.</p>
            </div>
            <button className="btn btn-sm btn-outline">View List</button>
          </div>
          <div className="alert-item error">
            <HiExclamationCircle />
            <div>
              <strong>2 Pharmacies Suspended</strong>
              <p>Due to compliance issues. Immediate action required.</p>
            </div>
            <button className="btn btn-sm btn-outline">Review</button>
          </div>
          <div className="alert-item info">
            <HiBell />
            <div>
              <strong>5 New Pharmacy Applications</strong>
              <p>Pending review and verification.</p>
            </div>
            <button className="btn btn-sm btn-outline">Review Now</button>
          </div>
        </div>
      )}

      {renderTabContent()}

      {showModal && selectedPharmacy && (
        <Modal
          title={`Pharmacy Details - ${selectedPharmacy.name}`}
          onClose={() => {
            setShowModal(false);
            setSelectedPharmacy(null);
          }}
          size="extra-large"
        >
          <div className="pharmacy-details-modal">
            <div className="pharmacy-header">
              <div className="pharmacy-avatar">
                {selectedPharmacy.name.charAt(0)}
              </div>
              <div className="pharmacy-info">
                <h2>{selectedPharmacy.name}</h2>
                <p className="pharmacy-type">{selectedPharmacy.type}</p>
                <div className="pharmacy-stats">
                  <span className="stat-item">
                    <HiStar /> Rating: {selectedPharmacy.rating || 'N/A'}
                  </span>
                  <span className="stat-item">
                    <HiShoppingCart /> Orders: {selectedPharmacy.totalOrders || selectedPharmacy.estimatedRevenue || 'N/A'}
                  </span>
                  <span className="stat-item">
                    <HiLocationMarker /> Location: {selectedPharmacy.address.split(',')[0]}
                  </span>
                  {selectedPharmacy.totalRevenue && (
                    <span className="stat-item">
                      <HiCurrencyRupee /> Revenue: ₹{selectedPharmacy.totalRevenue?.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="tabs-section">
              <div className="detail-tabs">
                <button className="detail-tab active">Verification</button>
                <button className="detail-tab">Business Details</button>
                <button className="detail-tab">Performance</button>
                <button className="detail-tab">Order History</button>
                <button className="detail-tab">Financials</button>
              </div>

              <div className="tab-content">
                <div className="verification-section">
                  <h4>Verification Documents</h4>
                  <div className="document-grid">
                    <div className="document-item">
                      <div className="document-header">
                        <h5>Drug License</h5>
                        <span className="document-status approved">Verified</span>
                      </div>
                      <div className="document-preview">
                        <div className="document-placeholder">
                          <HiDocumentText />
                          <p>drug_license.pdf</p>
                        </div>
                      </div>
                      <div className="document-actions">
                        <button className="btn btn-sm btn-outline">View</button>
                        <button className="btn btn-sm btn-primary">Download</button>
                      </div>
                    </div>

                    <div className="document-item">
                      <div className="document-header">
                        <h5>GST Certificate</h5>
                        <span className="document-status approved">Verified</span>
                      </div>
                      <div className="document-preview">
                        <div className="document-placeholder">
                          <HiDocumentText />
                          <p>gst_certificate.pdf</p>
                        </div>
                      </div>
                      <div className="document-actions">
                        <button className="btn btn-sm btn-outline">View</button>
                        <button className="btn btn-sm btn-primary">Download</button>
                      </div>
                    </div>

                    <div className="document-item">
                      <div className="document-header">
                        <h5>Owner ID Proof</h5>
                        <span className="document-status pending">Pending</span>
                      </div>
                      <div className="document-preview">
                        <div className="document-placeholder">
                          <HiDocumentText />
                          <p>id_proof.pdf</p>
                        </div>
                      </div>
                      <div className="document-actions">
                        <button className="btn btn-sm btn-outline">View</button>
                        <button className="btn btn-sm btn-success">Approve</button>
                        <button className="btn btn-sm btn-error">Reject</button>
                      </div>
                    </div>

                    <div className="document-item">
                      <div className="document-header">
                        <h5>Address Proof</h5>
                        <span className="document-status missing">Missing</span>
                      </div>
                      <div className="document-preview">
                        <div className="document-placeholder missing">
                          <HiDocumentText />
                          <p>Not Uploaded</p>
                        </div>
                      </div>
                      <div className="document-actions">
                        <button className="btn btn-sm btn-outline">Request</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="details-grid">
                  <div className="details-section">
                    <h5>Business Information</h5>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Pharmacy Name</label>
                        <span>{selectedPharmacy.name}</span>
                      </div>
                      <div className="info-item">
                        <label>Owner Name</label>
                        <span>{selectedPharmacy.owner}</span>
                      </div>
                      <div className="info-item">
                        <label>Email</label>
                        <span>{selectedPharmacy.email}</span>
                      </div>
                      <div className="info-item">
                        <label>Phone</label>
                        <span>{selectedPharmacy.phone}</span>
                      </div>
                      <div className="info-item">
                        <label>License Number</label>
                        <span>{selectedPharmacy.license}</span>
                      </div>
                      <div className="info-item">
                        <label>GST Number</label>
                        <span>{selectedPharmacy.gst}</span>
                      </div>
                      <div className="info-item">
                        <label>Registration Date</label>
                        <span>{selectedPharmacy.joined || selectedPharmacy.submitted}</span>
                      </div>
                      <div className="info-item">
                        <label>Status</label>
                        <span className={`status-badge status-${selectedPharmacy.status || 'pending'}`}>
                          {selectedPharmacy.status || 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="details-section">
                    <h5>Location & Operations</h5>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Address</label>
                        <span>{selectedPharmacy.address}</span>
                      </div>
                      <div className="info-item">
                        <label>Store Hours</label>
                        <span>{selectedPharmacy.storeHours || '9:00 AM - 9:00 PM'}</span>
                      </div>
                      <div className="info-item">
                        <label>Delivery Radius</label>
                        <span>{selectedPharmacy.deliveryRadius || '5 km'}</span>
                      </div>
                      <div className="info-item">
                        <label>Pharmacy Type</label>
                        <span>{selectedPharmacy.type}</span>
                      </div>
                      {selectedPharmacy.compliance && (
                        <div className="info-item">
                          <label>Compliance Status</label>
                          <span className={`compliance-badge compliance-${selectedPharmacy.compliance}`}>
                            {selectedPharmacy.compliance === 'valid' ? (
                              <><HiShieldCheck /> Valid</>
                            ) : selectedPharmacy.compliance === 'expiring' ? (
                              <><HiExclamationCircle /> Expiring</>
                            ) : (
                              <><HiExclamation /> {selectedPharmacy.compliance}</>
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {selectedPharmacy.totalRevenue && (
                  <div className="performance-section">
                    <h5>Performance Metrics</h5>
                    <div className="metrics-grid">
                      <div className="metric-card">
                        <div className="metric-value">{selectedPharmacy.totalOrders || '0'}</div>
                        <div className="metric-label">Total Orders</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">₹{selectedPharmacy.totalRevenue?.toLocaleString()}</div>
                        <div className="metric-label">Total Revenue</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">{selectedPharmacy.totalProducts || '0'}</div>
                        <div className="metric-label">Total Products</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">₹{selectedPharmacy.commissionEarned?.toLocaleString()}</div>
                        <div className="metric-label">Commission Earned</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">{selectedPharmacy.customerCount || '0'}</div>
                        <div className="metric-label">Total Customers</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">{selectedPharmacy.performance || '0'}%</div>
                        <div className="metric-label">Performance Score</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="verification-actions">
                  {selectedPharmacy.status === 'pending' ? (
                    <>
                      <button 
                        className="btn btn-error"
                        onClick={() => rejectPharmacy(selectedPharmacy)}
                      >
                        <HiXCircle /> Reject Application
                      </button>
                      <button 
                        className="btn btn-success"
                        onClick={() => approvePharmacy(selectedPharmacy)}
                      >
                        <HiCheckCircle /> Approve Pharmacy
                      </button>
                    </>
                  ) : selectedPharmacy.status === 'suspended' ? (
                    <button 
                      className="btn btn-success"
                      onClick={() => reinstatePharmacy(selectedPharmacy)}
                    >
                      <HiCheckCircle /> Reinstate Pharmacy
                    </button>
                  ) : (
                    <button 
                      className="btn btn-warning"
                      onClick={() => suspendPharmacy(selectedPharmacy)}
                    >
                      <HiXCircle /> Suspend Pharmacy
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PharmacyManagement;