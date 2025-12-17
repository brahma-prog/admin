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
  HiSwitchHorizontal
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
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import SearchBar from '../components/common/SearchBar';
import './DeliveryPartnerManagement.css';

const DeliveryPartnerManagement = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
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

  // Delivery Partners Data
  const pendingPartners = [
    {
      id: 'DP001',
      name: 'Rahul Sharma',
      phone: '+91 9876543210',
      vehicle: 'Motorcycle',
      license: 'DL-1234567890',
      aadhar: 'XXXX-XXXX-1234',
      submitted: '2024-01-23',
      status: 'pending',
      documents: ['driving_license.pdf', 'aadhar_card.pdf', 'vehicle_rc.pdf', 'insurance.pdf'],
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
      documents: ['driving_license.pdf', 'aadhar_card.pdf', 'pan_card.pdf'],
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
      documents: ['driving_license.pdf', 'aadhar_card.pdf'],
      experience: '6 months',
      zone: 'West Zone',
      expectedEarnings: '₹15,000/month'
    }
  ];

  const activePartners = [
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
      emergencyContacts: ['+91 9876540000', '+91 9876541111']
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
      emergencyContacts: ['+91 9876542222']
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
      emergencyContacts: ['+91 9876543333', '+91 9876544444']
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
      emergencyContacts: ['+91 9876545555']
    }
  ];

  const suspendedPartners = [
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
      zone: 'Central Zone'
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
      zone: 'East Zone'
    }
  ];

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
  const sosAlerts = [
    {
      id: 1,
      partner: 'Amit Kumar',
      type: 'SOS Emergency',
      time: '10 minutes ago',
      location: 'Near Koramangala 4th Block',
      status: 'active',
      priority: 'critical'
    },
    {
      id: 2,
      partner: 'Rajesh Patel',
      type: 'Accident Report',
      time: '2 hours ago',
      location: 'Indiranagar 100ft Road',
      status: 'resolved',
      priority: 'warning'
    },
    {
      id: 3,
      partner: 'Sunil Kumar',
      type: 'Vehicle Breakdown',
      time: '3 hours ago',
      location: 'BTM Layout',
      status: 'pending',
      priority: 'info'
    }
  ];

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
              className="btn-icon btn-sm btn-success"
              onClick={() => approvePartner(partner)}
              title="Approve Partner"
            >
              <HiCheckCircle /> Approve
            </button>
            <button 
              className="btn-icon btn-sm btn-error"
              onClick={() => rejectPartner(partner)}
              title="Reject Application"
            >
              <HiXCircle /> Reject
            </button>
            <button 
              className="btn-icon btn-sm btn-outline"
              onClick={() => viewDocuments(partner)}
              title="View Documents"
            >
              <HiDocumentText /> Docs
            </button>
            <button 
              className="btn-icon btn-sm btn-info"
              onClick={() => viewPartnerDetails(partner)}
              title="View Details"
            >
              <HiEye />
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
              className="btn-icon btn-sm btn-info"
              onClick={() => viewPartnerDetails(partner)}
              title="View Details"
            >
              <HiEye />
            </button>
            <button 
              className="btn-icon btn-sm btn-warning"
              onClick={() => editPartner(partner)}
              title="Edit Details"
            >
              <HiPencil />
            </button>
            <button 
              className="btn-icon btn-sm btn-error"
              onClick={() => suspendPartner(partner)}
              title="Suspend Partner"
            >
              <HiXCircle />
            </button>
            <button 
              className="btn-icon btn-sm"
              onClick={() => callPartner(partner)}
              title="Call Partner"
            >
              <HiPhone />
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
      { key: 'totalEarnings', label: 'Total Earnings' },
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
              className="btn-icon btn-sm btn-success"
              onClick={() => reinstatePartner(partner)}
              title="Reinstate Partner"
            >
              <HiCheckCircle /> Reinstate
            </button>
            <button 
              className="btn-icon btn-sm btn-error"
              onClick={() => deletePartner(partner)}
              title="Delete Permanently"
            >
              <HiTrash />
            </button>
          </div>
        )
      }
    ]
  };

  const approvePartner = (partner) => {
    if (window.confirm(`Approve ${partner.name} as delivery partner?`)) {
      // API call to approve
      console.log('Approve partner:', partner.id);
      alert(`${partner.name} has been approved successfully!`);
    }
  };

  const rejectPartner = (partner) => {
    const reason = prompt('Enter reason for rejection:', '');
    if (reason) {
      // API call to reject
      console.log('Reject partner:', partner.id, reason);
      alert(`${partner.name} has been rejected.`);
    }
  };

  const viewDocuments = (partner) => {
    setSelectedPartner(partner);
    setShowModal(true);
  };

  const viewPartnerDetails = (partner) => {
    setSelectedPartner(partner);
    setShowModal(true);
  };

  const editPartner = (partner) => {
    // Open edit modal or navigate to edit page
    console.log('Edit partner:', partner.id);
    alert(`Edit functionality for ${partner.name}`);
  };

  const suspendPartner = (partner) => {
    const reason = prompt('Enter reason for suspension:', '');
    if (reason) {
      if (window.confirm(`Suspend ${partner.name}?`)) {
        // API call to suspend
        console.log('Suspend partner:', partner.id, reason);
        alert(`${partner.name} has been suspended.`);
      }
    }
  };

  const callPartner = (partner) => {
    window.location.href = `tel:${partner.phone}`;
  };

  const reinstatePartner = (partner) => {
    if (window.confirm(`Reinstate ${partner.name}?`)) {
      // API call to reinstate
      console.log('Reinstate partner:', partner.id);
      alert(`${partner.name} has been reinstated.`);
    }
  };

  const deletePartner = (partner) => {
    if (window.confirm(`Permanently delete ${partner.name}? This action cannot be undone.`)) {
      // API call to delete
      console.log('Delete partner:', partner.id);
      alert(`${partner.name} has been deleted.`);
    }
  };

  const exportData = () => {
    // Export data logic
    console.log('Exporting partner data...');
    alert('Delivery partner data exported successfully!');
  };

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

      <div className="recent-activity">
        <div className="activity-header">
          <h3>Recent Partner Activity</h3>
          <button className="btn btn-outline btn-sm">
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

  const renderTabContent = () => {
    if (activeTab === 'dashboard') {
      return renderDashboard();
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

  return (
    <div className="delivery-partner-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Delivery Partner Super Admin</h1>
          <p>Manage delivery partners, monitor performance, and oversee delivery operations</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={exportData}>
            <HiDownload /> Export Data
          </button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add New Partner
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

      {activeTab === 'dashboard' && (
        <div className="sos-alerts">
          <div className="alert-item critical">
            <HiExclamationCircle />
            <div>
              <strong>SOS Emergency - Amit Kumar</strong>
              <p>Emergency button pressed near Koramangala. Immediate assistance required.</p>
            </div>
            <div className="alert-actions">
              <button className="btn btn-sm btn-error">Emergency Response</button>
              <button className="btn btn-sm btn-outline">Call Rider</button>
              <button className="btn btn-sm">Track Location</button>
            </div>
          </div>
          <div className="alert-item warning">
            <HiExclamationCircle />
            <div>
              <strong>2 Partners with Expiring Documents</strong>
              <p>Driving licenses expiring within 15 days. Action required.</p>
            </div>
            <button className="btn btn-sm btn-outline">Review Now</button>
          </div>
          <div className="alert-item info">
            <HiBell />
            <div>
              <strong>3 New Partner Applications</strong>
              <p>Pending review and verification.</p>
            </div>
            <button className="btn btn-sm btn-outline">Review Now</button>
          </div>
        </div>
      )}

      {activeTab !== 'dashboard' && activeTab !== 'sos' && (
        <div className="management-toolbar">
          <div className="toolbar-left">
            <SearchBar
              placeholder="Search partners by name, phone or license..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="filter-options">
              <select className="select-input">
                <option>All Vehicle Types</option>
                <option>Motorcycle</option>
                <option>Scooter</option>
                <option>Bicycle</option>
                <option>Car</option>
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

      {activeTab === 'sos' && (
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
                  <button className="btn btn-sm btn-outline">View Details</button>
                  <button className="btn btn-sm btn-primary">Call Partner</button>
                  {alert.status === 'active' && (
                    <button className="btn btn-sm btn-success">Mark Resolved</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {renderTabContent()}

      {showModal && selectedPartner && (
        <Modal
          title={`Delivery Partner Details - ${selectedPartner.name}`}
          onClose={() => {
            setShowModal(false);
            setSelectedPartner(null);
          }}
          size="extra-large"
        >
          <div className="partner-details-modal">
            <div className="partner-header">
              <div className="partner-avatar">
                {selectedPartner.name.charAt(0)}
              </div>
              <div className="partner-info">
                <h2>{selectedPartner.name}</h2>
                <p className="partner-phone">{selectedPartner.phone}</p>
                <div className="partner-stats">
                  <span className="stat-item">
                    <HiStar /> Rating: {selectedPartner.rating || 'N/A'}
                  </span>
                  <span className="stat-item">
                    <HiTruck /> Vehicle: {selectedPartner.vehicle}
                  </span>
                  <span className="stat-item">
                    <HiLocationMarker /> Zone: {selectedPartner.zone || 'N/A'}
                  </span>
                  {selectedPartner.totalEarnings && (
                    <span className="stat-item">
                      <HiCurrencyRupee /> Earnings: ₹{selectedPartner.totalEarnings?.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="tabs-section">
              <div className="detail-tabs">
                <button className="detail-tab active">Verification</button>
                <button className="detail-tab">Performance</button>
                <button className="detail-tab">Earnings</button>
                <button className="detail-tab">Delivery History</button>
                <button className="detail-tab">Emergency Contacts</button>
              </div>

              <div className="tab-content">
                <div className="verification-section">
                  <h4>Verification Documents</h4>
                  <div className="document-grid">
                    <div className="document-item">
                      <div className="document-header">
                        <h5>Driving License</h5>
                        <span className="document-status approved">Verified</span>
                      </div>
                      <div className="document-preview">
                        <div className="document-placeholder">
                          <HiDocumentText />
                          <p>driving_license.pdf</p>
                        </div>
                      </div>
                      <div className="document-actions">
                        <button className="btn btn-sm btn-outline">View</button>
                        <button className="btn btn-sm btn-primary">Download</button>
                      </div>
                    </div>

                    <div className="document-item">
                      <div className="document-header">
                        <h5>Aadhar Card</h5>
                        <span className="document-status approved">Verified</span>
                      </div>
                      <div className="document-preview">
                        <div className="document-placeholder">
                          <HiDocumentText />
                          <p>aadhar_card.pdf</p>
                        </div>
                      </div>
                      <div className="document-actions">
                        <button className="btn btn-sm btn-outline">View</button>
                        <button className="btn btn-sm btn-primary">Download</button>
                      </div>
                    </div>

                    <div className="document-item">
                      <div className="document-header">
                        <h5>Vehicle RC</h5>
                        <span className="document-status pending">Pending</span>
                      </div>
                      <div className="document-preview">
                        <div className="document-placeholder">
                          <HiDocumentText />
                          <p>vehicle_rc.pdf</p>
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
                        <h5>Police Verification</h5>
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
                    <h5>Personal Information</h5>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Full Name</label>
                        <span>{selectedPartner.name}</span>
                      </div>
                      <div className="info-item">
                        <label>Phone Number</label>
                        <span>{selectedPartner.phone}</span>
                      </div>
                      <div className="info-item">
                        <label>Email</label>
                        <span>{selectedPartner.email || 'N/A'}</span>
                      </div>
                      <div className="info-item">
                        <label>License Number</label>
                        <span>{selectedPartner.license}</span>
                      </div>
                      <div className="info-item">
                        <label>Aadhar Number</label>
                        <span>{selectedPartner.aadhar || 'N/A'}</span>
                      </div>
                      <div className="info-item">
                        <label>Registration Date</label>
                        <span>{selectedPartner.joined || selectedPartner.submitted}</span>
                      </div>
                      <div className="info-item">
                        <label>Status</label>
                        <span className={`status-badge status-${selectedPartner.status || 'pending'}`}>
                          {selectedPartner.status || 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="details-section">
                    <h5>Vehicle & Zone Information</h5>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Vehicle Type</label>
                        <span>{selectedPartner.vehicle}</span>
                      </div>
                      <div className="info-item">
                        <label>Zone Assigned</label>
                        <span>{selectedPartner.zone || 'Not Assigned'}</span>
                      </div>
                      <div className="info-item">
                        <label>Experience</label>
                        <span>{selectedPartner.experience || 'N/A'}</span>
                      </div>
                      <div className="info-item">
                        <label>Current Location</label>
                        <span>{selectedPartner.location || 'N/A'}</span>
                      </div>
                      <div className="info-item">
                        <label>Duty Status</label>
                        <span className={`duty-badge duty-${selectedPartner.dutyStatus || 'off-duty'}`}>
                          {selectedPartner.dutyStatus ? 
                            (selectedPartner.dutyStatus === 'on-duty' ? '🟢 On Duty' : '⚫ Off Duty') : 
                            'Not Available'
                          }
                        </span>
                      </div>
                      <div className="info-item">
                        <label>Last Active</label>
                        <span>{selectedPartner.lastActive || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedPartner.totalDeliveries && (
                  <div className="performance-section">
                    <h5>Performance Metrics</h5>
                    <div className="metrics-grid">
                      <div className="metric-card">
                        <div className="metric-value">{selectedPartner.totalDeliveries}</div>
                        <div className="metric-label">Total Deliveries</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">{selectedPartner.rating || 'N/A'}</div>
                        <div className="metric-label">Average Rating</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">{selectedPartner.acceptanceRate || 'N/A'}%</div>
                        <div className="metric-label">Acceptance Rate</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">{selectedPartner.onTimeRate || 'N/A'}%</div>
                        <div className="metric-label">On-Time Rate</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">{selectedPartner.avgDeliveryTime || 'N/A'}</div>
                        <div className="metric-label">Avg Delivery Time</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">₹{selectedPartner.totalEarnings?.toLocaleString()}</div>
                        <div className="metric-label">Total Earnings</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="verification-actions">
                  {selectedPartner.status === 'pending' ? (
                    <>
                      <button 
                        className="btn btn-error"
                        onClick={() => rejectPartner(selectedPartner)}
                      >
                        <HiXCircle /> Reject Application
                      </button>
                      <button 
                        className="btn btn-success"
                        onClick={() => approvePartner(selectedPartner)}
                      >
                        <HiCheckCircle /> Approve Partner
                      </button>
                    </>
                  ) : selectedPartner.status === 'suspended' ? (
                    <button 
                      className="btn btn-success"
                      onClick={() => reinstatePartner(selectedPartner)}
                    >
                      <HiCheckCircle /> Reinstate Partner
                    </button>
                  ) : (
                    <>
                      <button 
                        className="btn btn-warning"
                        onClick={() => suspendPartner(selectedPartner)}
                      >
                        <HiXCircle /> Suspend Partner
                      </button>
                      <button 
                        className="btn btn-outline"
                        onClick={() => callPartner(selectedPartner)}
                      >
                        <HiPhone /> Call Partner
                      </button>
                      <button 
                        className="btn btn-primary"
                        onClick={() => editPartner(selectedPartner)}
                      >
                        <HiPencil /> Edit Details
                      </button>
                    </>
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

export default DeliveryPartnerManagement;