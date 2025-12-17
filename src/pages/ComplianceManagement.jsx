import React, { useState } from 'react';
import { 
  HiSearch, 
  HiFilter, 
  HiDownload, 
  HiExclamationCircle,
  HiShieldCheck,
  HiClock,
  HiDocumentText,
  HiEye
} from 'react-icons/hi';
import Table from '../components/common/Table'; // Fixed path
import Modal from '../components/common/Modal'; // Fixed path
import SearchBar from '../components/common/SearchBar'; // Fixed path
import './ComplianceManagement.css';

const ComplianceManagement = () => {
  const [activeTab, setActiveTab] = useState('expiring');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const expiringDocuments = [
    {
      id: 1,
      entity: 'Dr. Arjun Mehta',
      type: 'doctor',
      document: 'Medical License',
      expiryDate: '2024-02-15',
      daysLeft: 22,
      status: 'expiring_soon'
    },
    {
      id: 2,
      entity: 'Health Plus Pharmacy',
      type: 'pharmacy',
      document: 'Drug License',
      expiryDate: '2024-02-28',
      daysLeft: 35,
      status: 'expiring_soon'
    },
    {
      id: 3,
      entity: 'Amit Kumar',
      type: 'rider',
      document: 'Driving License',
      expiryDate: '2024-03-10',
      daysLeft: 46,
      status: 'expiring_soon'
    }
  ];

  const expiredDocuments = [
    {
      id: 4,
      entity: 'Dr. Sunita Reddy',
      type: 'doctor',
      document: 'Medical Registration',
      expiryDate: '2024-01-10',
      daysLeft: -14,
      status: 'expired'
    },
    {
      id: 5,
      entity: 'MedPlus Pharmacy',
      type: 'pharmacy',
      document: 'GST Registration',
      expiryDate: '2023-12-31',
      daysLeft: -24,
      status: 'expired'
    }
  ];

  const complianceViolations = [
    {
      id: 1,
      entity: 'Dr. Rohan Sharma',
      type: 'doctor',
      violation: 'Prescription without proper diagnosis',
      severity: 'medium',
      reported: '2024-01-23',
      status: 'pending'
    },
    {
      id: 2,
      entity: 'Care Pharmacy',
      type: 'pharmacy',
      violation: 'Substitution without consent',
      severity: 'high',
      reported: '2024-01-22',
      status: 'investigating'
    }
  ];

  const auditLogs = [
    {
      id: 1,
      admin: 'Super Admin',
      action: 'Approved doctor registration',
      entity: 'Dr. Arjun Mehta',
      timestamp: '2024-01-24 14:30:45',
      ip: '192.168.1.100'
    },
    {
      id: 2,
      admin: 'Finance Admin',
      action: 'Processed settlement',
      entity: 'Health Plus Pharmacy',
      timestamp: '2024-01-24 13:15:22',
      ip: '192.168.1.101'
    },
    {
      id: 3,
      admin: 'Compliance Admin',
      action: 'Flagged prescription',
      entity: 'ORD-2024-00123',
      timestamp: '2024-01-24 12:45:10',
      ip: '192.168.1.102'
    }
  ];

  const columns = {
    expiring: [
      { key: 'entity', label: 'Entity' },
      { key: 'type', label: 'Type' },
      { key: 'document', label: 'Document' },
      { key: 'expiryDate', label: 'Expiry Date' },
      { 
        key: 'daysLeft', 
        label: 'Days Left',
        render: (days) => (
          <span className={`days-left ${days < 30 ? 'warning' : days < 0 ? 'expired' : 'normal'}`}>
            {days} days
          </span>
        )
      },
      { 
        key: 'status', 
        label: 'Status',
        render: (status) => (
          <span className={`status-badge status-${status}`}>
            {status.replace('_', ' ')}
          </span>
        )
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, item) => (
          <div className="action-buttons">
            <button 
              className="btn btn-sm btn-outline"
              onClick={() => sendReminder(item)}
            >
              Send Reminder
            </button>
            <button 
              className="btn-icon btn-sm"
              onClick={() => viewDocument(item)}
            >
              <HiEye />
            </button>
          </div>
        )
      }
    ],
    expired: [
      { key: 'entity', label: 'Entity' },
      { key: 'type', label: 'Type' },
      { key: 'document', label: 'Document' },
      { key: 'expiryDate', label: 'Expiry Date' },
      { 
        key: 'daysLeft', 
        label: 'Days Overdue',
        render: (days) => (
          <span className="days-overdue">
            {Math.abs(days)} days
          </span>
        )
      },
      { 
        key: 'status', 
        label: 'Status',
        render: () => (
          <span className="status-badge status-expired">
            <HiExclamationCircle /> Expired
          </span>
        )
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, item) => (
          <div className="action-buttons">
            <button 
              className="btn btn-sm btn-error"
              onClick={() => suspendEntity(item)}
            >
              Suspend
            </button>
            <button 
              className="btn btn-sm btn-outline"
              onClick={() => requestRenewal(item)}
            >
              Request Renewal
            </button>
          </div>
        )
      }
    ],
    violations: [
      { key: 'entity', label: 'Entity' },
      { key: 'type', label: 'Type' },
      { key: 'violation', label: 'Violation' },
      { 
        key: 'severity', 
        label: 'Severity',
        render: (severity) => (
          <span className={`severity-badge ${severity}`}>
            {severity.toUpperCase()}
          </span>
        )
      },
      { key: 'reported', label: 'Reported On' },
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
        render: (_, violation) => (
          <div className="action-buttons">
            <button 
              className="btn btn-sm btn-outline"
              onClick={() => investigateViolation(violation)}
            >
              Investigate
            </button>
            <button 
              className="btn btn-sm btn-warning"
              onClick={() => takeAction(violation)}
            >
              Take Action
            </button>
          </div>
        )
      }
    ],
    audit: [
      { key: 'admin', label: 'Admin User' },
      { key: 'action', label: 'Action' },
      { key: 'entity', label: 'Entity' },
      { key: 'timestamp', label: 'Timestamp' },
      { key: 'ip', label: 'IP Address' },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, log) => (
          <div className="action-buttons">
            <button 
              className="btn-icon btn-sm"
              onClick={() => viewAuditDetails(log)}
            >
              <HiEye />
            </button>
            <button 
              className="btn-icon btn-sm"
              onClick={() => exportLog(log)}
            >
              <HiDownload />
            </button>
          </div>
        )
      }
    ]
  };

  const sendReminder = (item) => {
    console.log('Send reminder for:', item.entity);
  };

  const viewDocument = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const suspendEntity = (item) => {
    if (window.confirm(`Suspend ${item.entity} due to expired ${item.document}?`)) {
      console.log('Suspend entity:', item.entity);
    }
  };

  const requestRenewal = (item) => {
    console.log('Request renewal for:', item.entity);
  };

  const investigateViolation = (violation) => {
    setSelectedItem(violation);
    setShowModal(true);
  };

  const takeAction = (violation) => {
    console.log('Take action on:', violation.entity);
  };

  const viewAuditDetails = (log) => {
    setSelectedItem(log);
    setShowModal(true);
  };

  const exportLog = (log) => {
    console.log('Export log:', log.id);
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'expiring': return expiringDocuments;
      case 'expired': return expiredDocuments;
      case 'violations': return complianceViolations;
      case 'audit': return auditLogs;
      default: return [];
    }
  };

  const complianceStats = {
    totalExpiring: 8,
    expiredDocuments: 5,
    activeViolations: 3,
    auditEntries: '1,245'
  };

  return (
    <div className="compliance-management">
      <div className="page-header">
        <h1>Compliance & Audit Management</h1>
        <p>Monitor regulatory compliance, document expiry, and maintain audit trails</p>
      </div>

      <div className="compliance-stats card">
        <h3>Compliance Dashboard</h3>
        <div className="stats-grid">
          <div className="stat-item warning">
            <HiClock />
            <div>
              <div className="stat-value">{complianceStats.totalExpiring}</div>
              <div className="stat-label">Documents Expiring Soon</div>
            </div>
          </div>
          <div className="stat-item error">
            <HiExclamationCircle />
            <div>
              <div className="stat-value">{complianceStats.expiredDocuments}</div>
              <div className="stat-label">Expired Documents</div>
            </div>
          </div>
          <div className="stat-item info">
            <HiShieldCheck />
            <div>
              <div className="stat-value">{complianceStats.activeViolations}</div>
              <div className="stat-label">Active Violations</div>
            </div>
          </div>
          <div className="stat-item">
            <HiDocumentText />
            <div>
              <div className="stat-value">{complianceStats.auditEntries}</div>
              <div className="stat-label">Audit Entries</div>
            </div>
          </div>
        </div>
      </div>

      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'expiring' ? 'active' : ''}`}
          onClick={() => setActiveTab('expiring')}
        >
          <HiClock /> Expiring Soon ({expiringDocuments.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'expired' ? 'active' : ''}`}
          onClick={() => setActiveTab('expired')}
        >
          <HiExclamationCircle /> Expired ({expiredDocuments.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'violations' ? 'active' : ''}`}
          onClick={() => setActiveTab('violations')}
        >
          <HiShieldCheck /> Violations ({complianceViolations.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'audit' ? 'active' : ''}`}
          onClick={() => setActiveTab('audit')}
        >
          <HiDocumentText /> Audit Logs
        </button>
      </div>

      <div className="management-toolbar">
        <div className="toolbar-left">
          <SearchBar
            placeholder={`Search ${activeTab}...`}
            onChange={() => {}}
          />
          <button className="btn btn-outline">
            <HiFilter /> Filter
          </button>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-outline">
            <HiDownload /> Export Report
          </button>
          {activeTab === 'audit' && (
            <button className="btn btn-primary">
              Generate Audit Report
            </button>
          )}
        </div>
      </div>

      <div className="card">
        <Table
          columns={columns[activeTab]}
          data={getCurrentData()}
          emptyMessage={`No ${activeTab} items found`}
        />
      </div>

      {activeTab === 'violations' && (
        <div className="high-risk-section card">
          <h3>High-Risk Pregnancy Monitoring</h3>
          <div className="risk-cases">
            <div className="risk-case high">
              <div className="case-header">
                <strong>Case #HRP-001</strong>
                <span className="risk-level">High Risk</span>
              </div>
              <p>Patient: Priya Sharma | Gestation: 32 weeks | Doctor: Dr. Sunita Reddy</p>
              <div className="case-actions">
                <button className="btn btn-sm btn-outline">View Details</button>
                <button className="btn btn-sm btn-error">Flag for Review</button>
              </div>
            </div>
            <div className="risk-case medium">
              <div className="case-header">
                <strong>Case #HRP-002</strong>
                <span className="risk-level">Medium Risk</span>
              </div>
              <p>Patient: Sneha Gupta | Gestation: 28 weeks | Doctor: Dr. Arjun Mehta</p>
              <div className="case-actions">
                <button className="btn btn-sm btn-outline">View Details</button>
                <button className="btn btn-sm">Monitor</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && selectedItem && (
        <Modal
          title={`${activeTab === 'audit' ? 'Audit Log Details' : 'Document Details'}`}
          onClose={() => setShowModal(false)}
          size="medium"
        >
          <div className="compliance-details-modal">
            {activeTab === 'audit' ? (
              <div className="audit-details">
                <div className="info-grid">
                  <div className="info-item">
                    <label>Admin User:</label>
                    <span>{selectedItem.admin}</span>
                  </div>
                  <div className="info-item">
                    <label>Action:</label>
                    <span>{selectedItem.action}</span>
                  </div>
                  <div className="info-item">
                    <label>Entity:</label>
                    <span>{selectedItem.entity}</span>
                  </div>
                  <div className="info-item">
                    <label>Timestamp:</label>
                    <span>{selectedItem.timestamp}</span>
                  </div>
                  <div className="info-item">
                    <label>IP Address:</label>
                    <span>{selectedItem.ip}</span>
                  </div>
                  <div className="info-item">
                    <label>User Agent:</label>
                    <span>Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36</span>
                  </div>
                </div>
                
                <div className="audit-actions">
                  <button className="btn btn-outline">Download Full Log</button>
                  <button className="btn btn-primary">Generate Certificate</button>
                </div>
              </div>
            ) : (
              <div className="document-details">
                <div className="info-grid">
                  <div className="info-item">
                    <label>Entity:</label>
                    <span>{selectedItem.entity}</span>
                  </div>
                  <div className="info-item">
                    <label>Type:</label>
                    <span>{selectedItem.type}</span>
                  </div>
                  <div className="info-item">
                    <label>Document:</label>
                    <span>{selectedItem.document}</span>
                  </div>
                  <div className="info-item">
                    <label>Expiry Date:</label>
                    <span>{selectedItem.expiryDate}</span>
                  </div>
                  <div className="info-item">
                    <label>Status:</label>
                    <span className={`status-badge status-${selectedItem.status}`}>
                      {selectedItem.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="document-preview-section">
                  <h5>Document Preview</h5>
                  <div className="document-preview">
                    <HiDocumentText />
                    <p>Document image preview would appear here</p>
                  </div>
                </div>
                
                <div className="document-actions">
                  <button className="btn btn-outline">Download Document</button>
                  <button className="btn btn-primary">Send Renewal Reminder</button>
                  {selectedItem.status === 'expired' && (
                    <button className="btn btn-error" onClick={() => suspendEntity(selectedItem)}>
                      Suspend Account
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ComplianceManagement;