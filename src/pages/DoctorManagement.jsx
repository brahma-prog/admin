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
  HiFilter
} from 'react-icons/hi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import SearchBar from '../components/common/SearchBar';
import './DoctorManagement.css';

const DoctorManagement = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [stats, setStats] = useState({
    totalDoctors: 156,
    activeDoctors: 142,
    pendingApprovals: 8,
    suspendedDoctors: 6,
    totalRevenue: 4525000,
    avgRating: 4.7,
    totalConsultations: 12450,
    thisMonthGrowth: 12.5
  });

  // Doctor performance data for charts
  const performanceData = [
    { month: 'Jan', consultations: 245, revenue: 350000, rating: 4.6 },
    { month: 'Feb', consultations: 312, revenue: 420000, rating: 4.7 },
    { month: 'Mar', consultations: 289, revenue: 398000, rating: 4.5 },
    { month: 'Apr', consultations: 356, revenue: 485000, rating: 4.8 },
    { month: 'May', consultations: 412, revenue: 560000, rating: 4.9 },
    { month: 'Jun', consultations: 398, revenue: 520000, rating: 4.7 }
  ];

  const specializationData = [
    { name: 'Cardiology', value: 25, color: '#0088FE' },
    { name: 'Gynecology', value: 18, color: '#00C49F' },
    { name: 'Pediatrics', value: 15, color: '#FFBB28' },
    { name: 'Dermatology', value: 12, color: '#FF8042' },
    { name: 'Orthopedics', value: 10, color: '#8884D8' },
    { name: 'Others', value: 20, color: '#82CA9D' }
  ];

  const pendingDoctors = [
    {
      id: 1,
      name: 'Dr. Arjun Mehta',
      specialization: 'Cardiologist',
      license: 'MH-12345',
      experience: '10 years',
      submitted: '2024-01-20',
      rating: null,
      documents: ['license.pdf', 'id_proof.pdf', 'certificate.pdf'],
      contact: 'arjun.mehta@email.com',
      phone: '+91 9876543210',
      registrationDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Dr. Sunita Reddy',
      specialization: 'Gynecologist',
      license: 'KA-67890',
      experience: '8 years',
      submitted: '2024-01-19',
      rating: null,
      documents: ['license.pdf', 'id_proof.pdf'],
      contact: 's.reddy@email.com',
      phone: '+91 8765432109',
      registrationDate: '2024-01-14'
    },
    {
      id: 3,
      name: 'Dr. Rajesh Kumar',
      specialization: 'Pediatrician',
      license: 'DL-54321',
      experience: '7 years',
      submitted: '2024-01-18',
      rating: null,
      documents: ['license.pdf', 'certificate.pdf'],
      contact: 'rajesh.k@email.com',
      phone: '+91 7654321098',
      registrationDate: '2024-01-13'
    }
  ];

  const activeDoctors = [
    {
      id: 101,
      name: 'Dr. Rohan Sharma',
      specialization: 'Pediatrician',
      license: 'DL-54321',
      experience: '12 years',
      joined: '2024-01-10',
      consultations: 245,
      rating: 4.8,
      status: 'active',
      revenue: 450000,
      patients: 156,
      availability: 'Mon-Fri, 9AM-6PM',
      lastActive: '2024-01-20 14:30',
      contact: 'rohan.sharma@email.com',
      phone: '+91 9876543211'
    },
    {
      id: 102,
      name: 'Dr. Ananya Patel',
      specialization: 'Dermatologist',
      license: 'GJ-98765',
      experience: '6 years',
      joined: '2024-01-05',
      consultations: 189,
      rating: 4.6,
      status: 'active',
      revenue: 320000,
      patients: 112,
      availability: 'Tue-Sat, 10AM-7PM',
      lastActive: '2024-01-20 16:45',
      contact: 'ananya.p@email.com',
      phone: '+91 8765432112'
    },
    {
      id: 103,
      name: 'Dr. Vikram Singh',
      specialization: 'Cardiologist',
      license: 'UP-45678',
      experience: '15 years',
      joined: '2024-01-02',
      consultations: 312,
      rating: 4.9,
      status: 'active',
      revenue: 680000,
      patients: 198,
      availability: 'Mon-Sun, 8AM-8PM',
      lastActive: '2024-01-20 19:20',
      contact: 'vikram.s@email.com',
      phone: '+91 7654321123'
    },
    {
      id: 104,
      name: 'Dr. Priya Nair',
      specialization: 'Gynecologist',
      license: 'TN-78901',
      experience: '9 years',
      joined: '2024-01-08',
      consultations: 276,
      rating: 4.7,
      status: 'active',
      revenue: 510000,
      patients: 167,
      availability: 'Mon-Fri, 9AM-5PM',
      lastActive: '2024-01-20 17:15',
      contact: 'priya.nair@email.com',
      phone: '+91 6543211234'
    }
  ];

  const suspendedDoctors = [
    {
      id: 201,
      name: 'Dr. Sanjay Gupta',
      specialization: 'Orthopedic',
      license: 'MH-23456',
      experience: '11 years',
      joined: '2023-12-15',
      consultations: 89,
      rating: 4.2,
      status: 'suspended',
      suspensionDate: '2024-01-18',
      reason: 'License verification pending',
      contact: 'sanjay.g@email.com',
      phone: '+91 9876543222'
    }
  ];

  const doctorHistory = [
    { date: '2024-01-20', action: 'Consultation', patients: 12, revenue: 24000, duration: '8h 30m' },
    { date: '2024-01-19', action: 'Consultation', patients: 15, revenue: 30000, duration: '9h 15m' },
    { date: '2024-01-18', action: 'Video Call', patients: 8, revenue: 16000, duration: '4h 20m' },
    { date: '2024-01-17', action: 'Consultation', patients: 10, revenue: 20000, duration: '6h 45m' },
    { date: '2024-01-16', action: 'Follow-up', patients: 6, revenue: 12000, duration: '3h 30m' }
  ];

  const columns = {
    pending: [
      { key: 'name', label: 'Doctor Name' },
      { key: 'specialization', label: 'Specialization' },
      { key: 'license', label: 'License No.' },
      { key: 'experience', label: 'Experience' },
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
        key: 'actions',
        label: 'Actions',
        render: (_, doctor) => (
          <div className="action-buttons">
            <button 
              className="btn-icon btn-sm btn-success"
              onClick={() => approveDoctor(doctor)}
              title="Approve Doctor"
            >
              <HiCheckCircle /> Approve
            </button>
            <button 
              className="btn-icon btn-sm btn-error"
              onClick={() => rejectDoctor(doctor)}
              title="Reject Application"
            >
              <HiXCircle /> Reject
            </button>
            <button 
              className="btn-icon btn-sm btn-outline"
              onClick={() => viewDocuments(doctor)}
              title="View Documents"
            >
              <HiDocumentText /> Docs
            </button>
            <button 
              className="btn-icon btn-sm btn-info"
              onClick={() => viewDoctorDetails(doctor)}
              title="View Details"
            >
              <HiEye />
            </button>
          </div>
        )
      }
    ],
    active: [
      { key: 'name', label: 'Doctor Name' },
      { key: 'specialization', label: 'Specialization' },
      { key: 'consultations', label: 'Consultations' },
      { key: 'patients', label: 'Patients' },
      { 
        key: 'revenue', 
        label: 'Revenue',
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
          <div className="doctor-rating">
            <HiStar />
            <span>{rating}</span>
          </div>
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
        render: (_, doctor) => (
          <div className="action-buttons">
            <button 
              className="btn-icon btn-sm btn-info"
              onClick={() => viewDoctorDetails(doctor)}
              title="View Details"
            >
              <HiEye />
            </button>
            <button 
              className="btn-icon btn-sm btn-warning"
              onClick={() => editDoctor(doctor)}
              title="Edit Details"
            >
              <HiPencil />
            </button>
            <button 
              className="btn-icon btn-sm btn-error"
              onClick={() => suspendDoctor(doctor)}
              title="Suspend Doctor"
            >
              <HiXCircle />
            </button>
          </div>
        )
      }
    ],
    suspended: [
      { key: 'name', label: 'Doctor Name' },
      { key: 'specialization', label: 'Specialization' },
      { key: 'consultations', label: 'Total Consults' },
      { key: 'rating', label: 'Rating' },
      { 
        key: 'suspensionDate', 
        label: 'Suspended On',
        render: (date) => new Date(date).toLocaleDateString()
      },
      { key: 'reason', label: 'Reason' },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, doctor) => (
          <div className="action-buttons">
            <button 
              className="btn-icon btn-sm btn-success"
              onClick={() => reinstateDoctor(doctor)}
              title="Reinstate Doctor"
            >
              <HiCheckCircle /> Reinstate
            </button>
            <button 
              className="btn-icon btn-sm btn-error"
              onClick={() => deleteDoctor(doctor)}
              title="Delete Permanently"
            >
              <HiTrash />
            </button>
          </div>
        )
      }
    ]
  };

  const approveDoctor = (doctor) => {
    if (window.confirm(`Approve ${doctor.name}?`)) {
      // API call to approve
      console.log('Approve doctor:', doctor.id);
      alert(`Dr. ${doctor.name} has been approved successfully!`);
    }
  };

  const rejectDoctor = (doctor) => {
    const reason = prompt('Enter reason for rejection:', '');
    if (reason) {
      // API call to reject
      console.log('Reject doctor:', doctor.id, reason);
      alert(`Dr. ${doctor.name} has been rejected.`);
    }
  };

  const viewDocuments = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const viewDoctorDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const editDoctor = (doctor) => {
    // Open edit modal or navigate to edit page
    console.log('Edit doctor:', doctor.id);
  };

  const suspendDoctor = (doctor) => {
    const reason = prompt('Enter reason for suspension:', '');
    if (reason) {
      if (window.confirm(`Suspend ${doctor.name}?`)) {
        // API call to suspend
        console.log('Suspend doctor:', doctor.id, reason);
        alert(`Dr. ${doctor.name} has been suspended.`);
      }
    }
  };

  const reinstateDoctor = (doctor) => {
    if (window.confirm(`Reinstate ${doctor.name}?`)) {
      // API call to reinstate
      console.log('Reinstate doctor:', doctor.id);
      alert(`Dr. ${doctor.name} has been reinstated.`);
    }
  };

  const deleteDoctor = (doctor) => {
    if (window.confirm(`Permanently delete ${doctor.name}? This action cannot be undone.`)) {
      // API call to delete
      console.log('Delete doctor:', doctor.id);
      alert(`Dr. ${doctor.name} has been deleted.`);
    }
  };

  const exportData = () => {
    // Export data logic
    console.log('Exporting doctor data...');
    alert('Data exported successfully!');
  };

  const getFilteredData = () => {
    let data = [];
    switch (activeTab) {
      case 'pending': data = pendingDoctors; break;
      case 'active': data = activeDoctors; break;
      case 'suspended': data = suspendedDoctors; break;
      default: data = [];
    }

    if (searchTerm) {
      data = data.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.license.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return data;
  };

  const StatsCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="stats-card">
      <div className="stats-icon" style={{ backgroundColor: color + '20', color: color }}>
        <Icon />
      </div>
      <div className="stats-content">
        <h3>{value}</h3>
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
          value={`₹${(stats.totalRevenue / 100000).toFixed(1)}L`} 
          change={12.5}
          color="#FF8042"
        />
        <StatsCard 
          icon={HiStar} 
          title="Average Rating" 
          value={stats.avgRating} 
          color="#8884D8"
        />
        <StatsCard 
          icon={HiCalendar} 
          title="Consultations" 
          value={stats.totalConsultations} 
          change={9.3}
          color="#82CA9D"
        />
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Doctor Performance Overview</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="consultations" fill="#0088FE" name="Consultations" />
                <Bar yAxisId="right" dataKey="revenue" fill="#00C49F" name="Revenue (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Specialization Distribution</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={specializationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {specializationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Doctor Activity</h3>
        <div className="card">
          <Table
            columns={[
              { key: 'date', label: 'Date' },
              { key: 'action', label: 'Activity Type' },
              { key: 'patients', label: 'Patients' },
              { key: 'revenue', label: 'Revenue' },
              { key: 'duration', label: 'Duration' }
            ]}
            data={doctorHistory}
          />
        </div>
      </div>
    </>
  );

  // Simple Date Input Component (as fallback)
  const SimpleDateInput = ({ placeholder, onChange }) => (
    <div className="simple-date-input">
      <HiCalendar className="date-icon" />
      <input
        type="date"
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        className="date-input-field"
      />
    </div>
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
          emptyMessage={`No ${activeTab} doctors found`}
        />
      </div>
    );
  };

  return (
    <div className="doctor-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Super Admin Dashboard</h1>
          <p>Manage all doctors, monitor performance, and oversee platform operations</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={exportData}>
            <HiDownload /> Export Data
          </button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add New Doctor
          </button>
        </div>
      </div>

      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          <HiClock /> Pending ({pendingDoctors.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          <HiCheckCircle /> Active ({activeDoctors.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'suspended' ? 'active' : ''}`}
          onClick={() => setActiveTab('suspended')}
        >
          <HiXCircle /> Suspended ({suspendedDoctors.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          <HiDocumentText /> Reports
        </button>
      </div>

      {activeTab !== 'dashboard' && (
        <div className="management-toolbar">
          <div className="toolbar-left">
            <SearchBar
              placeholder="Search doctors by name, specialization or license..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="filter-options">
              <select className="select-input">
                <option>All Specializations</option>
                <option>Cardiology</option>
                <option>Gynecology</option>
                <option>Pediatrics</option>
                <option>Dermatology</option>
              </select>
              
              {/* Using simple date input instead of DatePicker */}
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

      {renderTabContent()}

      {showModal && selectedDoctor && (
        <Modal
          title="Doctor Details & Documents"
          onClose={() => {
            setShowModal(false);
            setSelectedDoctor(null);
          }}
          size="extra-large"
        >
          <div className="doctor-details-modal">
            <div className="doctor-header">
              <div className="doctor-avatar">
                {selectedDoctor.name.charAt(0)}
              </div>
              <div className="doctor-info">
                <h2>{selectedDoctor.name}</h2>
                <p className="specialization">{selectedDoctor.specialization}</p>
                <div className="doctor-stats">
                  <span className="stat-item">
                    <HiStar /> Rating: {selectedDoctor.rating || 'N/A'}
                  </span>
                  <span className="stat-item">
                    <HiUsers /> Patients: {selectedDoctor.patients || 'N/A'}
                  </span>
                  <span className="stat-item">
                    <HiCalendar /> Experience: {selectedDoctor.experience}
                  </span>
                  {selectedDoctor.revenue && (
                    <span className="stat-item">
                      <HiCurrencyRupee /> Revenue: ₹{selectedDoctor.revenue?.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="tabs-section">
              <div className="detail-tabs">
                <button className="detail-tab active">Documents</button>
                <button className="detail-tab">Profile</button>
                <button className="detail-tab">Performance</button>
                <button className="detail-tab">Activity Log</button>
                <button className="detail-tab">Financials</button>
              </div>

              <div className="tab-content">
                <div className="document-section">
                  <h4>Verification Documents</h4>
                  <div className="document-grid">
                    <div className="document-item">
                      <div className="document-header">
                        <h5>Medical License</h5>
                        <span className="document-status approved">Approved</span>
                      </div>
                      <div className="document-preview">
                        <div className="document-placeholder">
                          <HiDocumentText />
                          <p>license.pdf</p>
                        </div>
                      </div>
                      <div className="document-actions">
                        <button className="btn btn-sm btn-outline">View</button>
                        <button className="btn btn-sm btn-primary">Download</button>
                      </div>
                    </div>

                    <div className="document-item">
                      <div className="document-header">
                        <h5>ID Proof</h5>
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
                        <h5>Specialization Certificate</h5>
                        <span className="document-status approved">Approved</span>
                      </div>
                      <div className="document-preview">
                        <div className="document-placeholder">
                          <HiDocumentText />
                          <p>certificate.pdf</p>
                        </div>
                      </div>
                      <div className="document-actions">
                        <button className="btn btn-sm btn-outline">View</button>
                        <button className="btn btn-sm btn-primary">Download</button>
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
                    <h5>Personal Information</h5>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Full Name</label>
                        <span>{selectedDoctor.name}</span>
                      </div>
                      <div className="info-item">
                        <label>Email</label>
                        <span>{selectedDoctor.contact || 'N/A'}</span>
                      </div>
                      <div className="info-item">
                        <label>Phone</label>
                        <span>{selectedDoctor.phone || 'N/A'}</span>
                      </div>
                      <div className="info-item">
                        <label>License Number</label>
                        <span>{selectedDoctor.license}</span>
                      </div>
                      <div className="info-item">
                        <label>Registration Date</label>
                        <span>{selectedDoctor.registrationDate || selectedDoctor.joined}</span>
                      </div>
                      <div className="info-item">
                        <label>Status</label>
                        <span className={`status-badge status-${selectedDoctor.status || 'pending'}`}>
                          {selectedDoctor.status || 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="details-section">
                    <h5>Professional Details</h5>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Specialization</label>
                        <span>{selectedDoctor.specialization}</span>
                      </div>
                      <div className="info-item">
                        <label>Experience</label>
                        <span>{selectedDoctor.experience}</span>
                      </div>
                      <div className="info-item">
                        <label>Availability</label>
                        <span>{selectedDoctor.availability || 'Not specified'}</span>
                      </div>
                      {selectedDoctor.consultations && (
                        <>
                          <div className="info-item">
                            <label>Total Consultations</label>
                            <span>{selectedDoctor.consultations}</span>
                          </div>
                          <div className="info-item">
                            <label>Success Rate</label>
                            <span>{selectedDoctor.rating ? (selectedDoctor.rating * 20).toFixed(1) + '%' : 'N/A'}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {selectedDoctor.consultations && (
                  <div className="performance-section">
                    <h5>Performance Metrics</h5>
                    <div className="metrics-grid">
                      <div className="metric-card">
                        <div className="metric-value">{selectedDoctor.consultations}</div>
                        <div className="metric-label">Total Consultations</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">{selectedDoctor.rating}</div>
                        <div className="metric-label">Average Rating</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">{selectedDoctor.patients || 'N/A'}</div>
                        <div className="metric-label">Total Patients</div>
                      </div>
                      <div className="metric-card">
                        <div className="metric-value">₹{selectedDoctor.revenue?.toLocaleString()}</div>
                        <div className="metric-label">Total Revenue</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DoctorManagement;