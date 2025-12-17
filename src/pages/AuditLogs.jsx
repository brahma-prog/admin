import React, { useState } from 'react';
import { 
  HiSearch, 
  HiFilter, 
  HiDownload, 
  HiEye,
  HiCalendar,
  HiUser,
  HiDocumentText,
  HiClock
} from 'react-icons/hi';
import Table from '../components/common/Table'; // Fixed path
import Modal from '../components/common/Modal'; // Fixed path
import SearchBar from '../components/common/SearchBar'; // Fixed path
import './AuditLogs.css';

const AuditLogs = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-01-24'
  });

  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-01-24 14:30:45',
      admin: 'Super Admin',
      action: 'Approved doctor registration',
      entity: 'Dr. Arjun Mehta',
      module: 'Doctor Management',
      ip: '192.168.1.100',
      status: 'success'
    },
    {
      id: 2,
      timestamp: '2024-01-24 13:15:22',
      admin: 'Finance Admin',
      action: 'Processed settlement',
      entity: 'Health Plus Pharmacy',
      module: 'Payment Management',
      ip: '192.168.1.101',
      status: 'success'
    },
    {
      id: 3,
      timestamp: '2024-01-24 12:45:10',
      admin: 'Compliance Admin',
      action: 'Flagged prescription',
      entity: 'ORD-2024-00123',
      module: 'Compliance Management',
      ip: '192.168.1.102',
      status: 'warning'
    },
    {
      id: 4,
      timestamp: '2024-01-24 11:20:33',
      admin: 'Vendor Manager',
      action: 'Suspended pharmacy account',
      entity: 'MedPlus Pharmacy',
      module: 'Pharmacy Management',
      ip: '192.168.1.103',
      status: 'error'
    },
    {
      id: 5,
      timestamp: '2024-01-24 10:15:18',
      admin: 'Super Admin',
      action: 'Created new admin role',
      entity: 'Content Manager',
      module: 'Role Management',
      ip: '192.168.1.100',
      status: 'success'
    },
    {
      id: 6,
      timestamp: '2024-01-24 09:45:55',
      admin: 'Medical Compliance Admin',
      action: 'Reviewed high-risk pregnancy case',
      entity: 'Case #HRP-001',
      module: 'Compliance Management',
      ip: '192.168.1.104',
      status: 'success'
    }
  ];

  const systemLogs = [
    {
      id: 7,
      timestamp: '2024-01-24 08:30:12',
      level: 'INFO',
      component: 'Payment Gateway',
      message: 'Payment gateway connection established',
      details: 'Razorpay API connected successfully'
    },
    {
      id: 8,
      timestamp: '2024-01-24 08:15:45',
      level: 'WARNING',
      component: 'Database',
      message: 'Slow query detected',
      details: 'Query took 2.3 seconds to execute'
    },
    {
      id: 9,
      timestamp: '2024-01-24 07:45:22',
      level: 'ERROR',
      component: 'Email Service',
      message: 'Failed to send notification email',
      details: 'SMTP connection timeout'
    }
  ];

  const columns = {
    all: [
      { key: 'timestamp', label: 'Timestamp' },
      { key: 'admin', label: 'Admin User' },
      { key: 'action', label: 'Action' },
      { key: 'entity', label: 'Entity' },
      { key: 'module', label: 'Module' },
      { key: 'ip', label: 'IP Address' },
      { 
        key: 'status', 
        label: 'Status',
        render: (status) => (
          <span className={`log-status ${status}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, log) => (
          <div className="action-buttons">
            <button 
              className="btn-icon btn-sm"
              onClick={() => viewLogDetails(log)}
              title="View Details"
            >
              <HiEye />
            </button>
            <button 
              className="btn-icon btn-sm"
              onClick={() => exportLog(log)}
              title="Export Log"
            >
              <HiDownload />
            </button>
          </div>
        )
      }
    ],
    system: [
      { key: 'timestamp', label: 'Timestamp' },
      { 
        key: 'level', 
        label: 'Level',
        render: (level) => (
          <span className={`log-level ${level.toLowerCase()}`}>
            {level}
          </span>
        )
      },
      { key: 'component', label: 'Component' },
      { key: 'message', label: 'Message' },
      { key: 'details', label: 'Details' },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, log) => (
          <div className="action-buttons">
            <button 
              className="btn-icon btn-sm"
              onClick={() => viewSystemLog(log)}
            >
              <HiEye />
            </button>
          </div>
        )
      }
    ],
    security: [
      { key: 'timestamp', label: 'Timestamp' },
      { key: 'admin', label: 'Admin User' },
      { key: 'action', label: 'Action' },
      { key: 'ip', label: 'IP Address' },
      { key: 'userAgent', label: 'User Agent' },
      { 
        key: 'status', 
        label: 'Status',
        render: () => (
          <span className="log-status success">Success</span>
        )
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, log) => (
          <div className="action-buttons">
            <button 
              className="btn-icon btn-sm"
              onClick={() => viewSecurityLog(log)}
            >
              <HiEye />
            </button>
          </div>
        )
      }
    ]
  };

  const viewLogDetails = (log) => {
    setSelectedLog(log);
    setShowModal(true);
  };

  const exportLog = (log) => {
    console.log('Export log:', log.id);
  };

  const viewSystemLog = (log) => {
    setSelectedLog(log);
    setShowModal(true);
  };

  const viewSecurityLog = (log) => {
    setSelectedLog(log);
    setShowModal(true);
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'all': return auditLogs;
      case 'system': return systemLogs;
      case 'security': return auditLogs.filter(log => log.module === 'Login' || log.module === 'Role Management');
      default: return [];
    }
  };

  const logStats = {
    totalLogs: '12,456',
    todayLogs: '124',
    errorLogs: '23',
    adminActivities: '89'
  };

  const handleDateChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="audit-logs">
      <div className="page-header">
        <h1>Audit Logs & System Monitoring</h1>
        <p>Track all system activities, admin actions, and security events</p>
      </div>

      <div className="log-stats card">
        <h3>Log Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <HiDocumentText />
            <div>
              <div className="stat-value">{logStats.totalLogs}</div>
              <div className="stat-label">Total Logs</div>
            </div>
          </div>
          <div className="stat-item">
            <HiClock />
            <div>
              <div className="stat-value">{logStats.todayLogs}</div>
              <div className="stat-label">Today's Logs</div>
            </div>
          </div>
          <div className="stat-item">
            <HiCalendar />
            <div>
              <div className="stat-value">{logStats.errorLogs}</div>
              <div className="stat-label">Error Logs</div>
            </div>
          </div>
          <div className="stat-item">
            <HiUser />
            <div>
              <div className="stat-value">{logStats.adminActivities}</div>
              <div className="stat-label">Admin Activities</div>
            </div>
          </div>
        </div>
      </div>

      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <HiDocumentText /> All Logs ({auditLogs.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'system' ? 'active' : ''}`}
          onClick={() => setActiveTab('system')}
        >
          <HiCalendar /> System Logs ({systemLogs.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <HiUser /> Security Logs
        </button>
        <button 
          className={`tab-btn ${activeTab === 'compliance' ? 'active' : ''}`}
          onClick={() => setActiveTab('compliance')}
        >
          <HiDocumentText /> Compliance Logs
        </button>
      </div>

      <div className="management-toolbar">
        <div className="toolbar-left">
          <SearchBar
            placeholder="Search logs by admin, action, or entity..."
            onChange={() => {}}
          />
          <div className="date-range-picker">
            <input 
              type="date" 
              className="form-input" 
              value={dateRange.start}
              onChange={(e) => handleDateChange('start', e.target.value)}
            />
            <span>to</span>
            <input 
              type="date" 
              className="form-input" 
              value={dateRange.end}
              onChange={(e) => handleDateChange('end', e.target.value)}
            />
            <button className="btn btn-outline">
              <HiFilter /> Apply Filter
            </button>
          </div>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-outline">
            <HiDownload /> Export Logs
          </button>
          <button className="btn btn-primary">
            Generate Audit Report
          </button>
        </div>
      </div>

      <div className="card">
        <div className="log-filters">
          <div className="filter-group">
            <label>Module:</label>
            <select className="form-input">
              <option value="">All Modules</option>
              <option value="Doctor Management">Doctor Management</option>
              <option value="Pharmacy Management">Pharmacy Management</option>
              <option value="Payment Management">Payment Management</option>
              <option value="Compliance Management">Compliance Management</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Admin:</label>
            <select className="form-input">
              <option value="">All Admins</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Finance Admin">Finance Admin</option>
              <option value="Medical Compliance Admin">Medical Compliance Admin</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Status:</label>
            <select className="form-input">
              <option value="">All Status</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>

        <Table
          columns={columns[activeTab]}
          data={getCurrentData()}
          emptyMessage={`No ${activeTab} found`}
        />
      </div>

      <div className="log-retention card">
        <h3>Log Retention Policy</h3>
        <div className="retention-info">
          <div className="retention-item">
            <strong>Audit Logs:</strong> Retained for 7 years as per regulatory requirements
          </div>
          <div className="retention-item">
            <strong>System Logs:</strong> Retained for 1 year
          </div>
          <div className="retention-item">
            <strong>Security Logs:</strong> Retained indefinitely
          </div>
          <div className="retention-item">
            <strong>Next Purge Date:</strong> 2024-02-01 (7 days from now)
          </div>
        </div>
        <button className="btn btn-outline">
          Configure Retention Policy
        </button>
      </div>

      {showModal && selectedLog && (
        <Modal
          title="Log Details"
          onClose={() => setShowModal(false)}
          size="medium"
        >
          <div className="log-details-modal">
            <div className="log-info-grid">
              <div className="info-item">
                <label>Timestamp:</label>
                <span>{selectedLog.timestamp}</span>
              </div>
              {selectedLog.admin && (
                <div className="info-item">
                  <label>Admin User:</label>
                  <span>{selectedLog.admin}</span>
                </div>
              )}
              <div className="info-item">
                <label>Action:</label>
                <span>{selectedLog.action}</span>
              </div>
              {selectedLog.entity && (
                <div className="info-item">
                  <label>Entity:</label>
                  <span>{selectedLog.entity}</span>
                </div>
              )}
              {selectedLog.module && (
                <div className="info-item">
                  <label>Module:</label>
                  <span>{selectedLog.module}</span>
                </div>
              )}
              {selectedLog.ip && (
                <div className="info-item">
                  <label>IP Address:</label>
                  <span>{selectedLog.ip}</span>
                </div>
              )}
              {selectedLog.status && (
                <div className="info-item">
                  <label>Status:</label>
                  <span className={`log-status ${selectedLog.status}`}>
                    {selectedLog.status}
                  </span>
                </div>
              )}
              {selectedLog.level && (
                <div className="info-item">
                  <label>Log Level:</label>
                  <span className={`log-level ${selectedLog.level.toLowerCase()}`}>
                    {selectedLog.level}
                  </span>
                </div>
              )}
              {selectedLog.component && (
                <div className="info-item">
                  <label>Component:</label>
                  <span>{selectedLog.component}</span>
                </div>
              )}
              {selectedLog.message && (
                <div className="info-item">
                  <label>Message:</label>
                  <span>{selectedLog.message}</span>
                </div>
              )}
              {selectedLog.details && (
                <div className="info-item full-width">
                  <label>Details:</label>
                  <pre className="log-details">{selectedLog.details}</pre>
                </div>
              )}
            </div>

            <div className="log-metadata">
              <h5>Additional Metadata</h5>
              <div className="metadata-grid">
                <div className="metadata-item">
                  <label>User Agent:</label>
                  <span>Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36</span>
                </div>
                <div className="metadata-item">
                  <label>Session ID:</label>
                  <span>SESS-1234567890</span>
                </div>
                <div className="metadata-item">
                  <label>Request ID:</label>
                  <span>REQ-9876543210</span>
                </div>
              </div>
            </div>

            <div className="log-actions">
              <button className="btn btn-outline">
                <HiDownload /> Export Full Log
              </button>
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AuditLogs;