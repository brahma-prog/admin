import React, { useState } from 'react';
import { 
  HiSearch, 
  HiFilter, 
  HiDownload, 
  HiExclamationCircle,
  HiShieldCheck,
  HiClock,
  HiDocumentText,
  HiEye,
  HiCheckCircle,
  HiXCircle,
  HiRefresh,
  HiUserGroup,
  HiTruck,
  HiBell,
  HiLockClosed,
  HiOfficeBuilding
} from 'react-icons/hi';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import SearchBar from '../components/common/SearchBar';
import './ComplianceManagement.css';

const ComplianceManagement = () => {
  const [activeTab, setActiveTab] = useState('expiring');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState('view');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    entityType: 'all',
    daysRange: 'all',
    status: 'all'
  });

  const expiringDocuments = [
    {
      id: 1,
      entity: 'Dr. Arjun Mehta',
      type: 'doctor',
      document: 'Medical License',
      documentId: 'MED-2021-12345',
      expiryDate: '2024-02-15',
      daysLeft: 22,
      status: 'expiring_soon',
      entityId: 'DOC-001',
      complianceScore: 95,
      lastAudit: '2024-01-15',
      riskLevel: 'low'
    },
    {
      id: 2,
      entity: 'Health Plus Pharmacy',
      type: 'pharmacy',
      document: 'Drug License',
      documentId: 'DRUG-2021-001',
      expiryDate: '2024-02-28',
      daysLeft: 35,
      status: 'expiring_soon',
      entityId: 'PH-001',
      complianceScore: 85,
      lastAudit: '2024-01-20',
      riskLevel: 'medium'
    },
    {
      id: 3,
      entity: 'Amit Kumar',
      type: 'rider',
      document: 'Driving License',
      documentId: 'DL-2022-001',
      expiryDate: '2024-03-10',
      daysLeft: 46,
      status: 'expiring_soon',
      entityId: 'RID-001',
      complianceScore: 90,
      lastAudit: '2024-01-05',
      riskLevel: 'low'
    },
    {
      id: 4,
      entity: 'Dr. Priya Singh',
      type: 'doctor',
      document: 'Medical Registration',
      documentId: 'MED-2020-54321',
      expiryDate: '2024-03-05',
      daysLeft: 41,
      status: 'expiring_soon',
      entityId: 'DOC-002',
      complianceScore: 75,
      lastAudit: '2024-01-10',
      riskLevel: 'medium'
    }
  ];

  const expiredDocuments = [
    {
      id: 5,
      entity: 'Dr. Sunita Reddy',
      type: 'doctor',
      document: 'Medical Registration',
      documentId: 'MED-2019-98765',
      expiryDate: '2024-01-10',
      daysLeft: -14,
      status: 'expired',
      entityId: 'DOC-003',
      complianceScore: 60,
      lastAudit: '2023-12-20',
      riskLevel: 'high',
      actionsTaken: ['account_restricted', 'notification_sent'],
      restrictionLevel: 'partial'
    },
    {
      id: 6,
      entity: 'MedPlus Pharmacy',
      type: 'pharmacy',
      document: 'GST Registration',
      documentId: 'GST-2020-001',
      expiryDate: '2023-12-31',
      daysLeft: -24,
      status: 'expired',
      entityId: 'PH-002',
      complianceScore: 40,
      lastAudit: '2023-12-15',
      riskLevel: 'high',
      actionsTaken: ['account_suspended', 'fine_imposed'],
      restrictionLevel: 'full'
    },
    {
      id: 7,
      entity: 'Quick Meds Pharmacy',
      type: 'pharmacy',
      document: 'Drug License',
      documentId: 'DRUG-2019-002',
      expiryDate: '2023-11-30',
      daysLeft: -55,
      status: 'expired',
      entityId: 'PH-003',
      complianceScore: 30,
      lastAudit: '2023-11-15',
      riskLevel: 'critical',
      actionsTaken: ['account_suspended', 'legal_notice'],
      restrictionLevel: 'full'
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
      status: 'pending',
      violationId: 'VIOL-001',
      category: 'clinical',
      impact: 'patient_safety',
      auditTrail: [
        { date: '2024-01-23', action: 'Reported by system', user: 'System' },
        { date: '2024-01-24', action: 'Assigned to review', user: 'Admin-001' }
      ]
    },
    {
      id: 2,
      entity: 'Care Pharmacy',
      type: 'pharmacy',
      violation: 'Substitution without consent',
      severity: 'high',
      reported: '2024-01-22',
      status: 'investigating',
      violationId: 'VIOL-002',
      category: 'ethical',
      impact: 'regulatory',
      auditTrail: [
        { date: '2024-01-22', action: 'Reported by patient', user: 'Patient-123' },
        { date: '2024-01-23', action: 'Escalated to legal', user: 'Compliance-001' }
      ]
    },
    {
      id: 3,
      entity: 'Speedy Delivery',
      type: 'rider',
      violation: 'Temperature breach during delivery',
      severity: 'high',
      reported: '2024-01-24',
      status: 'under_review',
      violationId: 'VIOL-003',
      category: 'operational',
      impact: 'medication_safety',
      auditTrail: [
        { date: '2024-01-24', action: 'System detected', user: 'IoT Sensor' }
      ]
    },
    {
      id: 4,
      entity: 'Dr. Neha Gupta',
      type: 'doctor',
      violation: 'Incomplete patient records',
      severity: 'low',
      reported: '2024-01-20',
      status: 'resolved',
      violationId: 'VIOL-004',
      category: 'administrative',
      impact: 'documentation',
      auditTrail: [
        { date: '2024-01-20', action: 'Reported', user: 'System' },
        { date: '2024-01-21', action: 'Corrected', user: 'Dr. Neha Gupta' },
        { date: '2024-01-22', action: 'Verified', user: 'Admin-002' }
      ]
    }
  ];

  const auditLogs = [
    {
      id: 1,
      admin: 'Super Admin',
      adminRole: 'system_admin',
      action: 'Approved doctor registration',
      entity: 'Dr. Arjun Mehta',
      entityId: 'DOC-001',
      entityType: 'doctor',
      timestamp: '2024-01-24 14:30:45',
      ip: '192.168.1.100',
      sessionId: 'SESS-20240124-001',
      changes: {
        field: 'status',
        from: 'pending',
        to: 'approved'
      }
    },
    {
      id: 2,
      admin: 'Finance Admin',
      adminRole: 'finance_admin',
      action: 'Processed settlement',
      entity: 'Health Plus Pharmacy',
      entityId: 'PH-001',
      entityType: 'pharmacy',
      timestamp: '2024-01-24 13:15:22',
      ip: '192.168.1.101',
      sessionId: 'SESS-20240124-002',
      changes: {
        amount: 15000,
        transactionId: 'TXN-001234'
      }
    },
    {
      id: 3,
      admin: 'Compliance Admin',
      adminRole: 'compliance_admin',
      action: 'Flagged prescription',
      entity: 'ORD-2024-00123',
      entityId: 'ORD-00123',
      entityType: 'order',
      timestamp: '2024-01-24 12:45:10',
      ip: '192.168.1.102',
      sessionId: 'SESS-20240124-003',
      changes: {
        flagType: 'potential_violation',
        reason: 'unusual_dosage'
      }
    },
    {
      id: 4,
      admin: 'Legal Admin',
      adminRole: 'legal_admin',
      action: 'Updated compliance policy',
      entity: 'Compliance Policy v2.1',
      entityId: 'POL-2024-001',
      entityType: 'policy',
      timestamp: '2024-01-24 11:20:33',
      ip: '192.168.1.103',
      sessionId: 'SESS-20240124-004',
      changes: {
        version: '2.0 to 2.1',
        sectionsUpdated: ['data_retention', 'audit_logs']
      }
    },
    {
      id: 5,
      admin: 'Compliance Admin',
      adminRole: 'compliance_admin',
      action: 'Restricted platform access',
      entity: 'MedPlus Pharmacy',
      entityId: 'PH-002',
      entityType: 'pharmacy',
      timestamp: '2024-01-24 10:05:17',
      ip: '192.168.1.102',
      sessionId: 'SESS-20240124-005',
      changes: {
        restrictionType: 'full_suspension',
        reason: 'expired_license'
      }
    }
  ];

  const renewalRequests = [
    {
      id: 1,
      requestId: 'REN-001',
      entity: 'Dr. Sunita Reddy',
      entityType: 'doctor',
      document: 'Medical Registration',
      originalExpiry: '2024-01-10',
      submittedDate: '2024-01-25',
      submittedBy: 'Dr. Sunita Reddy',
      status: 'pending_review',
      priority: 'high',
      attachedFiles: 3,
      reviewNotes: 'Awaiting verification from medical council'
    },
    {
      id: 2,
      requestId: 'REN-002',
      entity: 'MedPlus Pharmacy',
      entityType: 'pharmacy',
      document: 'GST Registration',
      originalExpiry: '2023-12-31',
      submittedDate: '2024-01-20',
      submittedBy: 'Pharmacy Manager',
      status: 'under_verification',
      priority: 'high',
      attachedFiles: 5,
      reviewNotes: 'Documents under legal review'
    }
  ];

  const historicalRecords = [
    {
      id: 1,
      entity: 'Dr. Arjun Mehta',
      period: '2023',
      complianceScore: 92,
      violations: 1,
      audits: 3,
      status: 'compliant'
    }
  ];

  const columns = {
    expiring: [
      { key: 'entity', label: 'Entity' },
      { key: 'type', label: 'Type' },
      { key: 'document', label: 'Document' },
      { key: 'documentId', label: 'Document ID' },
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
        key: 'riskLevel', 
        label: 'Risk Level',
        render: (level) => (
          <span className={`risk-level-badge ${level}`}>
            {level.toUpperCase()}
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
              title="Send reminder email"
            >
              <HiBell /> Remind
            </button>
            <button 
              className="btn btn-sm btn-warning"
              onClick={() => viewDocument(item)}
              title="View document details"
            >
              <HiEye /> View
            </button>
            <button 
              className="btn btn-sm btn-primary"
              onClick={() => requestRenewal(item)}
              title="Request document renewal"
            >
              <HiRefresh /> Renew
            </button>
          </div>
        )
      }
    ],
    expired: [
      { key: 'entity', label: 'Entity' },
      { key: 'type', label: 'Type' },
      { key: 'document', label: 'Document' },
      { key: 'documentId', label: 'Document ID' },
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
        key: 'complianceScore', 
        label: 'Compliance Score',
        render: (score) => (
          <span className={`compliance-score ${score > 80 ? 'good' : score > 60 ? 'medium' : 'poor'}`}>
            {score}%
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
              onClick={() => restrictEntity(item)}
              title="Restrict platform access"
            >
              <HiLockClosed /> Restrict
            </button>
            <button 
              className="btn btn-sm btn-outline"
              onClick={() => requestRenewal(item)}
              title="Request document renewal"
            >
              <HiRefresh /> Renew
            </button>
            <button 
              className="btn-icon btn-sm"
              onClick={() => viewDocument(item)}
              title="View details"
            >
              <HiEye />
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
              title="Investigate violation"
            >
              Investigate
            </button>
            <button 
              className="btn btn-sm btn-warning"
              onClick={() => takeAction(violation)}
              title="Take corrective action"
            >
              Take Action
            </button>
            <button 
              className="btn-icon btn-sm"
              onClick={() => viewAuditTrail(violation)}
              title="View audit trail"
            >
              <HiDocumentText />
            </button>
          </div>
        )
      }
    ],
    audit: [
      { key: 'admin', label: 'Admin User' },
      { key: 'adminRole', label: 'Role' },
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
              title="View audit details"
            >
              <HiEye />
            </button>
            <button 
              className="btn-icon btn-sm"
              onClick={() => exportLog(log)}
              title="Export log"
            >
              <HiDownload />
            </button>
          </div>
        )
      }
    ],
    renewals: [
      { key: 'entity', label: 'Entity' },
      { key: 'entityType', label: 'Type' },
      { key: 'document', label: 'Document' },
      { key: 'originalExpiry', label: 'Original Expiry' },
      { key: 'submittedDate', label: 'Submitted Date' },
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
        key: 'priority', 
        label: 'Priority',
        render: (priority) => (
          <span className={`priority-badge ${priority}`}>
            {priority.toUpperCase()}
          </span>
        )
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, request) => (
          <div className="action-buttons">
            <button 
              className="btn btn-sm btn-success"
              onClick={() => approveRenewal(request)}
              title="Approve renewal"
            >
              <HiCheckCircle /> Approve
            </button>
            <button 
              className="btn btn-sm btn-error"
              onClick={() => rejectRenewal(request)}
              title="Reject renewal"
            >
              <HiXCircle /> Reject
            </button>
            <button 
              className="btn-icon btn-sm"
              onClick={() => viewRenewalDetails(request)}
              title="View details"
            >
              <HiEye />
            </button>
          </div>
        )
      }
    ]
  };

  const sendReminder = (item) => {
    console.log('Send reminder for:', item.entity);
    alert(`Reminder sent to ${item.entity} about ${item.document} expiry in ${item.daysLeft} days`);
  };

  const viewDocument = (item) => {
    setSelectedItem(item);
    setModalType('document');
    setShowModal(true);
  };

  const restrictEntity = (item) => {
    if (window.confirm(`Restrict ${item.entity} due to expired ${item.document}? This will limit platform access.`)) {
      console.log('Restrict entity:', item.entity);
      alert(`${item.entity} has been restricted from platform activities`);
    }
  };

  const requestRenewal = (item) => {
    console.log('Request renewal for:', item.entity);
    alert(`Renewal request sent to ${item.entity} for ${item.document}`);
  };

  const investigateViolation = (violation) => {
    setSelectedItem(violation);
    setModalType('violation');
    setShowModal(true);
  };

  const takeAction = (violation) => {
    console.log('Take action on:', violation.entity);
    alert(`Action taken on violation: ${violation.violation}`);
  };

  const viewAuditTrail = (violation) => {
    setSelectedItem(violation);
    setModalType('auditTrail');
    setShowModal(true);
  };

  const viewAuditDetails = (log) => {
    setSelectedItem(log);
    setModalType('audit');
    setShowModal(true);
  };

  const exportLog = (log) => {
    console.log('Export log:', log.id);
    alert(`Exporting audit log for ${log.admin}`);
  };

  const approveRenewal = (request) => {
    if (window.confirm(`Approve renewal request ${request.requestId} for ${request.entity}?`)) {
      console.log('Approve renewal:', request.entity);
      alert(`Renewal approved for ${request.entity}`);
    }
  };

  const rejectRenewal = (request) => {
    if (window.confirm(`Reject renewal request ${request.requestId} for ${request.entity}?`)) {
      const reason = prompt('Enter rejection reason:');
      if (reason) {
        console.log('Reject renewal:', request.entity, 'Reason:', reason);
        alert(`Renewal rejected for ${request.entity}`);
      }
    }
  };

  const viewRenewalDetails = (request) => {
    setSelectedItem(request);
    setModalType('renewal');
    setShowModal(true);
  };

  const generateComplianceReport = () => {
    alert('Generating comprehensive compliance report...');
  };

  const enforceDataRetention = () => {
    if (window.confirm('Enforce data retention policies? This will archive records older than retention period.')) {
      alert('Data retention policies enforced');
    }
  };

  const flagHighRiskViolation = (violation) => {
    console.log('Flag high-risk violation:', violation);
    alert(`High-risk violation flagged: ${violation.violation}`);
  };

  const getCurrentData = () => {
    let data = [];
    switch (activeTab) {
      case 'expiring': data = expiringDocuments; break;
      case 'expired': data = expiredDocuments; break;
      case 'violations': data = complianceViolations; break;
      case 'audit': data = auditLogs; break;
      case 'renewals': data = renewalRequests; break;
      default: data = [];
    }
    
    if (searchTerm) {
      data = data.filter(item => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    return data;
  };

  const complianceStats = {
    totalExpiring: expiringDocuments.length,
    expiredDocuments: expiredDocuments.length,
    activeViolations: complianceViolations.filter(v => v.status !== 'resolved').length,
    auditEntries: auditLogs.length,
    pendingRenewals: renewalRequests.filter(r => r.status.includes('pending')).length,
    highRiskEntities: expiredDocuments.filter(d => d.riskLevel === 'high' || d.riskLevel === 'critical').length
  };

  const handleExportReport = () => {
    const data = getCurrentData();
    const report = {
      generatedAt: new Date().toISOString(),
      tab: activeTab,
      filter: filters,
      items: data.length,
      data: data
    };
    console.log('Exporting report:', report);
    alert(`Report exported with ${data.length} items`);
  };

  return (
    <div className="compliance-management">
      <div className="page-header">
        <h1>Compliance & Audit Management</h1>
        <p>Monitor regulatory compliance, document expiry, and maintain audit trails</p>
        <div className="compliance-status-summary">
          <span className="status-item compliant">
            <HiShieldCheck /> Overall Compliance: 85%
          </span>
          <span className="status-item warning">
            <HiClock /> {complianceStats.totalExpiring} Expiring Soon
          </span>
          <span className="status-item critical">
            <HiExclamationCircle /> {complianceStats.highRiskEntities} High Risk
          </span>
        </div>
      </div>

      <div className="compliance-stats card">
        <div className="stats-header">
          <h3>Compliance Dashboard</h3>
          <div className="stats-actions">
            <button className="btn btn-sm btn-outline" onClick={generateComplianceReport}>
              <HiDocumentText /> Generate Report
            </button>
            <button className="btn btn-sm btn-outline" onClick={enforceDataRetention}>
              <HiShieldCheck /> Enforce Retention
            </button>
          </div>
        </div>
        <div className="stats-grid">
          <div className="stat-item warning" onClick={() => setActiveTab('expiring')}>
            <HiClock />
            <div>
              <div className="stat-value">{complianceStats.totalExpiring}</div>
              <div className="stat-label">Documents Expiring Soon</div>
              <div className="stat-subtext">Next 90 days</div>
            </div>
          </div>
          <div className="stat-item error" onClick={() => setActiveTab('expired')}>
            <HiExclamationCircle />
            <div>
              <div className="stat-value">{complianceStats.expiredDocuments}</div>
              <div className="stat-label">Expired Documents</div>
              <div className="stat-subtext">Immediate action required</div>
            </div>
          </div>
          <div className="stat-item info" onClick={() => setActiveTab('violations')}>
            <HiShieldCheck />
            <div>
              <div className="stat-value">{complianceStats.activeViolations}</div>
              <div className="stat-label">Active Violations</div>
              <div className="stat-subtext">Under investigation</div>
            </div>
          </div>
          <div className="stat-item" onClick={() => setActiveTab('audit')}>
            <HiDocumentText />
            <div>
              <div className="stat-value">{complianceStats.auditEntries}</div>
              <div className="stat-label">Audit Entries</div>
              <div className="stat-subtext">Last 30 days</div>
            </div>
          </div>
          <div className="stat-item secondary" onClick={() => setActiveTab('renewals')}>
            <HiRefresh />
            <div>
              <div className="stat-value">{complianceStats.pendingRenewals}</div>
              <div className="stat-label">Pending Renewals</div>
              <div className="stat-subtext">Awaiting approval</div>
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
          className={`tab-btn ${activeTab === 'renewals' ? 'active' : ''}`}
          onClick={() => setActiveTab('renewals')}
        >
          <HiRefresh /> Renewals ({renewalRequests.length})
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
            placeholder={`Search ${activeTab.replace('_', ' ')}...`}
            onChange={(value) => setSearchTerm(value)}
            value={searchTerm}
          />
          <button className="btn btn-outline">
            <HiFilter /> Filter
          </button>
          <select 
            className="filter-select"
            value={filters.entityType}
            onChange={(e) => setFilters({...filters, entityType: e.target.value})}
          >
            <option value="all">All Types</option>
            <option value="doctor">Doctors</option>
            <option value="pharmacy">Pharmacies</option>
            <option value="rider">Delivery Partners</option>
          </select>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-outline" onClick={handleExportReport}>
            <HiDownload /> Export Report
          </button>
          {activeTab === 'audit' && (
            <button className="btn btn-primary" onClick={generateComplianceReport}>
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
          <div className="section-header">
            <h3>
              <HiExclamationCircle /> High-Risk Pregnancy Monitoring
            </h3>
            <button 
              className="btn btn-sm btn-error"
              onClick={() => flagHighRiskViolation(complianceViolations[1])}
            >
              Flag Critical Case
            </button>
          </div>
          <div className="risk-cases">
            <div className="risk-case high">
              <div className="case-header">
                <strong>Case #HRP-001</strong>
                <span className="risk-level">High Risk</span>
              </div>
              <p>Patient: Priya Sharma | Gestation: 32 weeks | Doctor: Dr. Sunita Reddy</p>
              <p className="case-details">
                Condition: Gestational Diabetes | Last Review: 2024-01-20 | Next Appointment: 2024-01-30
              </p>
              <div className="case-actions">
                <button className="btn btn-sm btn-outline">View Medical Records</button>
                <button className="btn btn-sm btn-error">Escalate to Specialist</button>
                <button className="btn btn-sm">Schedule Follow-up</button>
              </div>
            </div>
            <div className="risk-case medium">
              <div className="case-header">
                <strong>Case #HRP-002</strong>
                <span className="risk-level">Medium Risk</span>
              </div>
              <p>Patient: Sneha Gupta | Gestation: 28 weeks | Doctor: Dr. Arjun Mehta</p>
              <p className="case-details">
                Condition: Hypertension | Last Review: 2024-01-22 | Next Appointment: 2024-02-05
              </p>
              <div className="case-actions">
                <button className="btn btn-sm btn-outline">View Details</button>
                <button className="btn btn-sm btn-warning">Monitor Closely</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {(activeTab === 'expired' || activeTab === 'expiring') && (
        <div className="historical-records card">
          <h3>Historical Compliance Records</h3>
          <div className="records-table">
            <table>
              <thead>
                <tr>
                  <th>Entity</th>
                  <th>Period</th>
                  <th>Compliance Score</th>
                  <th>Violations</th>
                  <th>Audits</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {historicalRecords.map(record => (
                  <tr key={record.id}>
                    <td>{record.entity}</td>
                    <td>{record.period}</td>
                    <td>
                      <span className={`compliance-score ${record.complianceScore > 80 ? 'good' : 'medium'}`}>
                        {record.complianceScore}%
                      </span>
                    </td>
                    <td>{record.violations}</td>
                    <td>{record.audits}</td>
                    <td>
                      <span className={`status-badge status-${record.status}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && selectedItem && (
        <Modal
          title={getModalTitle()}
          onClose={() => {
            setShowModal(false);
            setSelectedItem(null);
            setModalType('view');
          }}
          size="large"
        >
          <div className="compliance-details-modal">
            {renderModalContent()}
          </div>
        </Modal>
      )}
    </div>
  );

  function getModalTitle() {
    switch (modalType) {
      case 'document': return 'Document Compliance Details';
      case 'violation': return 'Violation Investigation';
      case 'audit': return 'Audit Log Details';
      case 'auditTrail': return 'Violation Audit Trail';
      case 'renewal': return 'Renewal Request Details';
      default: return 'Compliance Details';
    }
  }

  function renderModalContent() {
    switch (modalType) {
      case 'document':
        return renderDocumentDetails();
      case 'violation':
        return renderViolationDetails();
      case 'audit':
        return renderAuditDetails();
      case 'auditTrail':
        return renderAuditTrail();
      case 'renewal':
        return renderRenewalDetails();
      default:
        return renderDefaultDetails();
    }
  }

  function renderDocumentDetails() {
    return (
      <div className="document-details">
        <div className="info-grid">
          <div className="info-item">
            <label>Entity:</label>
            <span>{selectedItem.entity}</span>
          </div>
          <div className="info-item">
            <label>Entity ID:</label>
            <span>{selectedItem.entityId}</span>
          </div>
          <div className="info-item">
            <label>Type:</label>
            <span className="entity-type">
              {selectedItem.type === 'doctor' && <HiUserGroup />}
              {selectedItem.type === 'pharmacy' && <HiOfficeBuilding />}
              {selectedItem.type === 'rider' && <HiTruck />}
              {selectedItem.type}
            </span>
          </div>
          <div className="info-item">
            <label>Document:</label>
            <span>{selectedItem.document}</span>
          </div>
          <div className="info-item">
            <label>Document ID:</label>
            <span>{selectedItem.documentId}</span>
          </div>
          <div className="info-item">
            <label>Expiry Date:</label>
            <span>{selectedItem.expiryDate}</span>
          </div>
          <div className="info-item">
            <label>Days Left:</label>
            <span className={`days-left ${selectedItem.daysLeft < 30 ? 'warning' : 'normal'}`}>
              {selectedItem.daysLeft} days
            </span>
          </div>
          <div className="info-item">
            <label>Compliance Score:</label>
            <span className={`compliance-score ${selectedItem.complianceScore > 80 ? 'good' : 'medium'}`}>
              {selectedItem.complianceScore}%
            </span>
          </div>
          <div className="info-item">
            <label>Risk Level:</label>
            <span className={`risk-level-badge ${selectedItem.riskLevel}`}>
              {selectedItem.riskLevel.toUpperCase()}
            </span>
          </div>
          <div className="info-item">
            <label>Last Audit:</label>
            <span>{selectedItem.lastAudit}</span>
          </div>
        </div>
        
        <div className="document-preview-section">
          <h5>Document Preview</h5>
          <div className="document-preview">
            <HiDocumentText />
            <p>Document image preview would appear here</p>
            <small>Supported formats: PDF, JPEG, PNG (Max 10MB)</small>
          </div>
        </div>
        
        <div className="document-actions">
          <button className="btn btn-outline">
            <HiDownload /> Download Document
          </button>
          <button className="btn btn-primary" onClick={() => sendReminder(selectedItem)}>
            <HiBell /> Send Reminder
          </button>
          {selectedItem.status === 'expired' && (
            <>
              <button className="btn btn-warning" onClick={() => restrictEntity(selectedItem)}>
                <HiLockClosed /> Restrict Access
              </button>
              <button className="btn btn-error" onClick={() => requestRenewal(selectedItem)}>
                <HiXCircle /> Force Renewal
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  function renderViolationDetails() {
    return (
      <div className="violation-details">
        <div className="info-grid">
          <div className="info-item">
            <label>Violation ID:</label>
            <span>{selectedItem.violationId}</span>
          </div>
          <div className="info-item">
            <label>Entity:</label>
            <span>{selectedItem.entity}</span>
          </div>
          <div className="info-item">
            <label>Type:</label>
            <span>{selectedItem.type}</span>
          </div>
          <div className="info-item full-width">
            <label>Violation:</label>
            <span>{selectedItem.violation}</span>
          </div>
          <div className="info-item">
            <label>Severity:</label>
            <span className={`severity-badge ${selectedItem.severity}`}>
              {selectedItem.severity.toUpperCase()}
            </span>
          </div>
          <div className="info-item">
            <label>Category:</label>
            <span>{selectedItem.category}</span>
          </div>
          <div className="info-item">
            <label>Impact:</label>
            <span>{selectedItem.impact}</span>
          </div>
          <div className="info-item">
            <label>Reported On:</label>
            <span>{selectedItem.reported}</span>
          </div>
          <div className="info-item">
            <label>Status:</label>
            <span className={`status-badge status-${selectedItem.status}`}>
              {selectedItem.status}
            </span>
          </div>
        </div>

        <div className="audit-trail-section">
          <h5>Audit Trail</h5>
          <div className="audit-trail">
            {selectedItem.auditTrail?.map((entry, index) => (
              <div key={index} className="audit-entry">
                <div className="audit-timestamp">{entry.date}</div>
                <div className="audit-action">{entry.action}</div>
                <div className="audit-user">{entry.user}</div>
              </div>
            )) || <p>No audit trail available</p>}
          </div>
        </div>

        <div className="violation-actions">
          <button className="btn btn-outline" onClick={() => investigateViolation(selectedItem)}>
            Investigate Further
          </button>
          <button className="btn btn-warning" onClick={() => takeAction(selectedItem)}>
            Take Corrective Action
          </button>
          {selectedItem.severity === 'high' && (
            <button className="btn btn-error" onClick={() => flagHighRiskViolation(selectedItem)}>
              Flag as High-Risk
            </button>
          )}
        </div>
      </div>
    );
  }

  function renderAuditDetails() {
    return (
      <div className="audit-details">
        <div className="info-grid">
          <div className="info-item">
            <label>Log ID:</label>
            <span>{selectedItem.id}</span>
          </div>
          <div className="info-item">
            <label>Admin User:</label>
            <span>{selectedItem.admin}</span>
          </div>
          <div className="info-item">
            <label>Role:</label>
            <span className="role-badge">{selectedItem.adminRole}</span>
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
            <label>Entity ID:</label>
            <span>{selectedItem.entityId}</span>
          </div>
          <div className="info-item">
            <label>Entity Type:</label>
            <span>{selectedItem.entityType}</span>
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
            <label>Session ID:</label>
            <span>{selectedItem.sessionId}</span>
          </div>
          <div className="info-item full-width">
            <label>Changes Made:</label>
            <pre className="changes-log">
              {JSON.stringify(selectedItem.changes, null, 2)}
            </pre>
          </div>
        </div>
        
        <div className="audit-actions">
          <button className="btn btn-outline" onClick={() => exportLog(selectedItem)}>
            <HiDownload /> Download Full Log
          </button>
          <button className="btn btn-primary">
            Generate Certificate
          </button>
          <button className="btn btn-secondary">
            View Session Details
          </button>
        </div>
      </div>
    );
  }

  function renderAuditTrail() {
    return (
      <div className="audit-trail-details">
        <h5>Complete Audit Trail for {selectedItem.violationId}</h5>
        <div className="audit-trail-list">
          {selectedItem.auditTrail?.map((entry, index) => (
            <div key={index} className="audit-trail-item">
              <div className="trail-header">
                <span className="trail-date">{entry.date}</span>
                <span className="trail-user">{entry.user}</span>
              </div>
              <div className="trail-action">{entry.action}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderRenewalDetails() {
    return (
      <div className="renewal-details">
        <div className="info-grid">
          <div className="info-item">
            <label>Request ID:</label>
            <span>{selectedItem.requestId}</span>
          </div>
          <div className="info-item">
            <label>Entity:</label>
            <span>{selectedItem.entity}</span>
          </div>
          <div className="info-item">
            <label>Entity Type:</label>
            <span>{selectedItem.entityType}</span>
          </div>
          <div className="info-item">
            <label>Document:</label>
            <span>{selectedItem.document}</span>
          </div>
          <div className="info-item">
            <label>Original Expiry:</label>
            <span>{selectedItem.originalExpiry}</span>
          </div>
          <div className="info-item">
            <label>Submitted Date:</label>
            <span>{selectedItem.submittedDate}</span>
          </div>
          <div className="info-item">
            <label>Submitted By:</label>
            <span>{selectedItem.submittedBy}</span>
          </div>
          <div className="info-item">
            <label>Status:</label>
            <span className={`status-badge status-${selectedItem.status}`}>
              {selectedItem.status.replace('_', ' ')}
            </span>
          </div>
          <div className="info-item">
            <label>Priority:</label>
            <span className={`priority-badge ${selectedItem.priority}`}>
              {selectedItem.priority.toUpperCase()}
            </span>
          </div>
          <div className="info-item">
            <label>Attached Files:</label>
            <span>{selectedItem.attachedFiles} files</span>
          </div>
          <div className="info-item full-width">
            <label>Review Notes:</label>
            <p>{selectedItem.reviewNotes}</p>
          </div>
        </div>

        <div className="renewal-actions">
          <button className="btn btn-success" onClick={() => approveRenewal(selectedItem)}>
            <HiCheckCircle /> Approve Renewal
          </button>
          <button className="btn btn-error" onClick={() => rejectRenewal(selectedItem)}>
            <HiXCircle /> Reject Renewal
          </button>
          <button className="btn btn-outline">
            Request Additional Documents
          </button>
          <button className="btn btn-primary">
            <HiEye /> View Uploaded Documents
          </button>
        </div>
      </div>
    );
  }

  function renderDefaultDetails() {
    return (
      <div className="default-details">
        <p>Details for {selectedItem.entity}</p>
      </div>
    );
  }
};

export default ComplianceManagement;