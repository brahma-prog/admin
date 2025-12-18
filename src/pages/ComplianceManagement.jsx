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
  HiOfficeBuilding,
  HiInformationCircle
} from 'react-icons/hi';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import SearchBar from '../components/common/SearchBar';
// import Notification from '../components/common/Notification';
import './ComplianceManagement.css';

const ComplianceManagement = () => {
  const [activeTab, setActiveTab] = useState('expiring');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState('view');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  
  const [filters, setFilters] = useState({
    entityType: 'all',
    daysRange: 'all',
    status: 'all',
    severity: 'all'
  });
  
  // State for all data to allow updates
  const [expiringDocuments, setExpiringDocuments] = useState([
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
      riskLevel: 'low',
      reminderSent: false
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
      riskLevel: 'medium',
      reminderSent: false
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
      riskLevel: 'low',
      reminderSent: false
    }
  ]);

  const [expiredDocuments, setExpiredDocuments] = useState([
    {
      id: 4,
      entity: 'Dr. Sunita Reddy',
      type: 'doctor',
      document: 'Medical Registration',
      documentId: 'MED-2019-98765',
      expiryDate: '2024-01-10',
      daysLeft: -14,
      status: 'expired',
      entityId: 'DOC-002',
      complianceScore: 60,
      lastAudit: '2023-12-20',
      riskLevel: 'high',
      actionsTaken: ['account_restricted', 'notification_sent'],
      restrictionLevel: 'partial',
      isRestricted: true
    },
    {
      id: 5,
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
      restrictionLevel: 'full',
      isRestricted: true
    }
  ]);

  const [complianceViolations, setComplianceViolations] = useState([
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
    }
  ]);

  const [auditLogs, setAuditLogs] = useState([
    {
      id: 1,
      admin: 'Super Admin',
      adminRole: 'system_admin',
      action: 'Approved doctor registration',
      entity: 'Dr. Arjun Mehta',
      entityId: 'DOC-001',
      entityType: 'doctor',
      timestamp: '2024-01-24 14:30:45',
      ip: '192.168.1.100'
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
      ip: '192.168.1.101'
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
      ip: '192.168.1.102'
    }
  ]);

  const [renewalRequests, setRenewalRequests] = useState([
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
    }
  ]);

  // Show notification function
  const showNotificationMessage = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Columns configuration
  const columns = {
    expiring: [
      { key: 'entity', label: 'Entity' },
      { key: 'type', label: 'Type' },
      { key: 'document', label: 'Document' },
      { key: 'expiryDate', label: 'Expiry Date' },
      { 
        key: 'daysLeft', 
        label: 'Days Left',
        render: (days, item) => (
          <span className={`days-left ${days < 30 ? 'warning' : days < 0 ? 'expired' : 'normal'}`}>
            {days} days {item.reminderSent && <HiBell className="reminder-icon" title="Reminder sent" />}
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
              className={`btn btn-sm ${item.reminderSent ? 'btn-secondary' : 'btn-outline'}`}
              onClick={() => sendReminder(item)}
              title="Send reminder email"
            >
              <HiBell /> {item.reminderSent ? 'Re-send' : 'Remind'}
            </button>
            <button 
              className="btn btn-sm btn-warning"
              onClick={() => viewDocument(item)}
              title="View document details"
            >
              <HiEye /> View
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
        render: (_, item) => (
          <span className={`status-badge status-${item.status} ${item.isRestricted ? 'restricted' : ''}`}>
            {item.isRestricted ? 'Restricted' : 'Expired'}
          </span>
        )
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, item) => (
          <div className="action-buttons">
            <button 
              className={`btn btn-sm ${item.isRestricted ? 'btn-success' : 'btn-error'}`}
              onClick={() => toggleRestriction(item)}
              title={item.isRestricted ? "Restore access" : "Restrict platform access"}
            >
              <HiLockClosed /> {item.isRestricted ? 'Restore' : 'Restrict'}
            </button>
            <button 
              className="btn btn-sm btn-outline"
              onClick={() => requestRenewal(item)}
              title="Request document renewal"
            >
              <HiRefresh /> Renew
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
              className="btn btn-sm btn-warning"
              onClick={() => openViolationDetails(violation)}
              title="View violation details"
            >
              <HiEye /> Details
            </button>
            <button 
              className="btn btn-sm btn-success"
              onClick={() => resolveViolation(violation)}
              title="Mark as resolved"
            >
              <HiCheckCircle /> Resolve
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
              onClick={() => handleRenewalAction(request, 'approved')}
              title="Approve renewal"
            >
              <HiCheckCircle /> Approve
            </button>
            <button 
              className="btn btn-sm btn-error"
              onClick={() => handleRenewalAction(request, 'rejected')}
              title="Reject renewal"
            >
              <HiXCircle /> Reject
            </button>
          </div>
        )
      }
    ]
  };

  // Working Functions

  const sendReminder = (item) => {
    if (activeTab === 'expiring') {
      setExpiringDocuments(prev => 
        prev.map(doc => 
          doc.id === item.id ? { ...doc, reminderSent: true } : doc
        )
      );
    }
    
    // Add audit log
    const newAuditLog = {
      id: auditLogs.length + 1,
      admin: 'Compliance Admin',
      adminRole: 'compliance_admin',
      action: 'Sent reminder for document expiry',
      entity: item.entity,
      entityId: item.entityId,
      entityType: item.type,
      timestamp: new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      ip: '192.168.1.104'
    };
    
    setAuditLogs(prev => [newAuditLog, ...prev]);
    
    showNotificationMessage(`Reminder sent to ${item.entity} about ${item.document} expiry`, 'success');
  };

  const viewDocument = (item) => {
    setSelectedItem(item);
    setModalType('document');
    setShowModal(true);
  };

  const toggleRestriction = (item) => {
    const newStatus = !item.isRestricted;
    const action = newStatus ? 'Restored' : 'Restricted';
    
    // Confirmation modal
    setSelectedItem({
      ...item,
      action: action.toLowerCase(),
      newStatus: newStatus
    });
    setModalType('confirm');
    setShowModal(true);
  };

  const confirmRestriction = () => {
    const item = selectedItem;
    const action = item.action;
    const newStatus = item.newStatus;
    
    setExpiredDocuments(prev => 
      prev.map(doc => 
        doc.id === item.id ? { ...doc, isRestricted: newStatus } : doc
      )
    );
    
    // Add audit log
    const newAuditLog = {
      id: auditLogs.length + 1,
      admin: 'Compliance Admin',
      adminRole: 'compliance_admin',
      action: `${action.charAt(0).toUpperCase() + action.slice(1)} platform access`,
      entity: item.entity,
      entityId: item.entityId,
      entityType: item.type,
      timestamp: new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      ip: '192.168.1.105'
    };
    
    setAuditLogs(prev => [newAuditLog, ...prev]);
    
    showNotificationMessage(`${item.entity} has been ${action} from platform activities`, 'success');
    setShowModal(false);
    setSelectedItem(null);
  };

  const requestRenewal = (item) => {
    const newRequest = {
      id: renewalRequests.length + 1,
      requestId: `REN-${String(renewalRequests.length + 1).padStart(3, '0')}`,
      entity: item.entity,
      entityType: item.type,
      document: item.document,
      originalExpiry: item.expiryDate,
      submittedDate: new Date().toISOString().split('T')[0],
      submittedBy: 'System Auto',
      status: 'pending_review',
      priority: item.daysLeft < 0 ? 'high' : 'medium',
      attachedFiles: 0,
      reviewNotes: 'Auto-generated renewal request'
    };
    
    setRenewalRequests(prev => [newRequest, ...prev]);
    
    // Add audit log
    const newAuditLog = {
      id: auditLogs.length + 1,
      admin: 'System',
      adminRole: 'system',
      action: 'Auto-generated renewal request',
      entity: item.entity,
      entityId: item.entityId,
      entityType: item.type,
      timestamp: new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      ip: '192.168.1.106'
    };
    
    setAuditLogs(prev => [newAuditLog, ...prev]);
    
    setActiveTab('renewals');
    showNotificationMessage(`Renewal request created for ${item.entity} - ${item.document}`, 'success');
  };

  const openViolationDetails = (violation) => {
    setSelectedItem(violation);
    setModalType('violation');
    setShowModal(true);
  };

  const resolveViolation = (violation) => {
    setSelectedItem({
      ...violation,
      action: 'resolve'
    });
    setModalType('confirm');
    setShowModal(true);
  };

  const confirmResolveViolation = () => {
    const violation = selectedItem;
    
    setComplianceViolations(prev => 
      prev.map(viol => 
        viol.id === violation.id ? { ...viol, status: 'resolved' } : viol
      )
    );
    
    // Add audit log
    const newAuditLog = {
      id: auditLogs.length + 1,
      admin: 'Compliance Admin',
      adminRole: 'compliance_admin',
      action: 'Resolved compliance violation',
      entity: violation.entity,
      entityId: violation.violationId,
      entityType: 'violation',
      timestamp: new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      ip: '192.168.1.107'
    };
    
    setAuditLogs(prev => [newAuditLog, ...prev]);
    
    showNotificationMessage(`Violation ${violation.violationId} has been resolved`, 'success');
    setShowModal(false);
    setSelectedItem(null);
  };

  const viewAuditDetails = (log) => {
    setSelectedItem(log);
    setModalType('audit');
    setShowModal(true);
  };

  const handleRenewalAction = (request, action) => {
    setSelectedItem({
      ...request,
      action: action
    });
    setModalType('confirm');
    setShowModal(true);
  };

  const confirmRenewalAction = () => {
    const request = selectedItem;
    const action = request.action;
    const actionText = action === 'approved' ? 'Approve' : 'Reject';
    
    setRenewalRequests(prev => 
      prev.map(req => 
        req.id === request.id ? { ...req, status: action === 'approved' ? 'approved' : 'rejected' } : req
      )
    );
    
    if (action === 'approved') {
      const updatedDoc = expiredDocuments.find(doc => 
        doc.entity === request.entity && doc.document === request.document
      );
      
      if (updatedDoc) {
        const newExpiryDate = new Date();
        newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);
        const formattedDate = newExpiryDate.toISOString().split('T')[0];
        
        setExpiredDocuments(prev => prev.filter(doc => doc.id !== updatedDoc.id));
        setExpiringDocuments(prev => [...prev, {
          ...updatedDoc,
          id: expiringDocuments.length + 1,
          expiryDate: formattedDate,
          daysLeft: 365,
          status: 'expiring_soon',
          isRestricted: false,
          riskLevel: 'low'
        }]);
      }
    }
    
    // Add audit log
    const newAuditLog = {
      id: auditLogs.length + 1,
      admin: 'Compliance Admin',
      adminRole: 'compliance_admin',
      action: `${actionText}ed renewal request`,
      entity: request.entity,
      entityId: request.requestId,
      entityType: request.entityType,
      timestamp: new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      ip: '192.168.1.108'
    };
    
    setAuditLogs(prev => [newAuditLog, ...prev]);
    
    showNotificationMessage(`Renewal request ${request.requestId} has been ${action}ed`, 'success');
    setShowModal(false);
    setSelectedItem(null);
  };

  const generateComplianceReport = () => {
    // Create report data
    const reportData = {
      generatedAt: new Date().toISOString(),
      reportId: `REP-${Date.now()}`,
      summary: {
        totalEntities: expiringDocuments.length + expiredDocuments.length,
        expiringSoon: expiringDocuments.length,
        expired: expiredDocuments.length,
        activeViolations: complianceViolations.filter(v => v.status !== 'resolved').length,
        pendingRenewals: renewalRequests.filter(r => r.status === 'pending_review').length
      },
      expiringDocuments: expiringDocuments,
      expiredDocuments: expiredDocuments,
      complianceViolations: complianceViolations,
      renewalRequests: renewalRequests
    };
    
    // Create downloadable report
    const reportContent = `Compliance Report - ${new Date().toLocaleDateString()}\n\n` +
      `========================================\n` +
      `SUMMARY\n` +
      `========================================\n` +
      `Total Entities: ${reportData.summary.totalEntities}\n` +
      `Expiring Soon: ${reportData.summary.expiringSoon}\n` +
      `Expired: ${reportData.summary.expired}\n` +
      `Active Violations: ${reportData.summary.activeViolations}\n` +
      `Pending Renewals: ${reportData.summary.pendingRenewals}\n\n` +
      `========================================\n` +
      `DETAILED DATA\n` +
      `========================================\n\n` +
      `Expiring Documents (${expiringDocuments.length}):\n` +
      expiringDocuments.map(doc => 
        `  • ${doc.entity} - ${doc.document} (Expires: ${doc.expiryDate}, Days Left: ${doc.daysLeft})`
      ).join('\n') + '\n\n' +
      `Expired Documents (${expiredDocuments.length}):\n` +
      expiredDocuments.map(doc => 
        `  • ${doc.entity} - ${doc.document} (Expired: ${doc.expiryDate}, Overdue: ${Math.abs(doc.daysLeft)} days)`
      ).join('\n');
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compliance-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Add audit log
    const newAuditLog = {
      id: auditLogs.length + 1,
      admin: 'Compliance Admin',
      adminRole: 'compliance_admin',
      action: 'Generated compliance report',
      entity: 'System Report',
      entityId: reportData.reportId,
      entityType: 'report',
      timestamp: new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      ip: '192.168.1.109'
    };
    
    setAuditLogs(prev => [newAuditLog, ...prev]);
    
    showNotificationMessage('Compliance report generated and downloaded successfully!', 'success');
  };

  const enforceDataRetention = () => {
    // Add audit log
    const newAuditLog = {
      id: auditLogs.length + 1,
      admin: 'System Admin',
      adminRole: 'system_admin',
      action: 'Enforced data retention policies',
      entity: 'All Compliance Records',
      entityId: 'RETENTION-001',
      entityType: 'system',
      timestamp: new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      ip: '192.168.1.110'
    };
    
    setAuditLogs(prev => [newAuditLog, ...prev]);
    
    showNotificationMessage('Data retention policies enforced successfully. Records older than 7 years have been archived.', 'info');
  };

  const flagHighRiskViolation = () => {
    showNotificationMessage('High-risk case has been flagged for immediate attention', 'warning');
  };

  const applyFilters = (data) => {
    let filteredData = [...data];
    
    if (filters.entityType !== 'all') {
      filteredData = filteredData.filter(item => item.type === filters.entityType);
    }
    
    if (filters.status !== 'all') {
      filteredData = filteredData.filter(item => item.status === filters.status);
    }
    
    if (activeTab === 'violations' && filters.severity !== 'all') {
      filteredData = filteredData.filter(item => item.severity === filters.severity);
    }
    
    if (activeTab === 'expiring' || activeTab === 'expired') {
      if (filters.daysRange === 'critical') {
        filteredData = filteredData.filter(item => Math.abs(item.daysLeft) <= 7);
      } else if (filters.daysRange === 'warning') {
        filteredData = filteredData.filter(item => Math.abs(item.daysLeft) > 7 && Math.abs(item.daysLeft) <= 30);
      }
    }
    
    if (searchTerm) {
      filteredData = filteredData.filter(item => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    return filteredData;
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
    
    return applyFilters(data);
  };

  const handleExportReport = () => {
    const data = getCurrentData();
    
    const headers = columns[activeTab].map(col => col.label).join(',');
    const rows = data.map(item => 
      columns[activeTab].map(col => {
        if (col.render) {
          return `"${col.key === 'status' ? item.status : item[col.key]}"`;
        }
        return `"${item[col.key] || ''}"`;
      }).join(',')
    ).join('\n');
    
    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compliance-${activeTab}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotificationMessage(`${data.length} ${activeTab} items exported successfully`, 'success');
  };

  const complianceStats = {
    totalExpiring: expiringDocuments.length,
    expiredDocuments: expiredDocuments.length,
    activeViolations: complianceViolations.filter(v => v.status !== 'resolved').length,
    auditEntries: auditLogs.length,
    pendingRenewals: renewalRequests.filter(r => r.status.includes('pending') || r.status.includes('under')).length,
    highRiskEntities: expiredDocuments.filter(d => d.riskLevel === 'high' || d.riskLevel === 'critical').length
  };

  return (
    <div className="compliance-management">
      {/* Notification Component */}
      {showNotification && (
        <div className={`notification notification-${notificationType}`}>
          <div className="notification-content">
            {notificationType === 'success' && <HiCheckCircle />}
            {notificationType === 'error' && <HiExclamationCircle />}
            {notificationType === 'warning' && <HiInformationCircle />}
            {notificationType === 'info' && <HiInformationCircle />}
            <span>{notificationMessage}</span>
          </div>
          <button className="notification-close" onClick={() => setShowNotification(false)}>×</button>
        </div>
      )}

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
          <button 
            className="btn btn-outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <HiFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-outline" onClick={handleExportReport}>
            <HiDownload /> Export Report
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel card">
          <h4>Filters</h4>
          <div className="filters-grid">
            <div className="filter-group">
              <label>Entity Type:</label>
              <select 
                value={filters.entityType}
                onChange={(e) => setFilters({...filters, entityType: e.target.value})}
              >
                <option value="all">All Types</option>
                <option value="doctor">Doctors</option>
                <option value="pharmacy">Pharmacies</option>
                <option value="rider">Delivery Partners</option>
              </select>
            </div>
            
            {(activeTab === 'expiring' || activeTab === 'expired') && (
              <div className="filter-group">
                <label>Days Range:</label>
                <select 
                  value={filters.daysRange}
                  onChange={(e) => setFilters({...filters, daysRange: e.target.value})}
                >
                  <option value="all">All</option>
                  <option value="critical">Critical (&lt; 7 days)</option>
                  <option value="warning">Warning (7-30 days)</option>
                </select>
              </div>
            )}
            
            {activeTab === 'violations' && (
              <div className="filter-group">
                <label>Severity:</label>
                <select 
                  value={filters.severity}
                  onChange={(e) => setFilters({...filters, severity: e.target.value})}
                >
                  <option value="all">All</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            )}
            
            <div className="filter-group">
              <label>Status:</label>
              <select 
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="all">All</option>
                {activeTab === 'expiring' && <option value="expiring_soon">Expiring Soon</option>}
                {activeTab === 'expired' && <option value="expired">Expired</option>}
                {activeTab === 'violations' && (
                  <>
                    <option value="pending">Pending</option>
                    <option value="investigating">Investigating</option>
                    <option value="resolved">Resolved</option>
                  </>
                )}
                {activeTab === 'renewals' && (
                  <>
                    <option value="pending_review">Pending Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </>
                )}
              </select>
            </div>
            
            <div className="filter-actions">
              <button 
                className="btn btn-sm btn-outline"
                onClick={() => setFilters({
                  entityType: 'all',
                  daysRange: 'all',
                  status: 'all',
                  severity: 'all'
                })}
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <Table
          columns={columns[activeTab]}
          data={getCurrentData()}
          emptyMessage={`No ${activeTab} items found. Try adjusting your filters.`}
        />
        <div className="table-footer">
          <div className="table-summary">
            Showing {getCurrentData().length} of {
              activeTab === 'expiring' ? expiringDocuments.length :
              activeTab === 'expired' ? expiredDocuments.length :
              activeTab === 'violations' ? complianceViolations.length :
              activeTab === 'audit' ? auditLogs.length :
              renewalRequests.length
            } items
          </div>
        </div>
      </div>

      {activeTab === 'violations' && (
        <div className="high-risk-section card">
          <div className="section-header">
            <h3>
              <HiExclamationCircle /> High-Risk Pregnancy Monitoring
            </h3>
            <button 
              className="btn btn-sm btn-error"
              onClick={flagHighRiskViolation}
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
                <button className="btn btn-sm btn-outline" onClick={() => showNotificationMessage('Opening medical records...', 'info')}>
                  View Medical Records
                </button>
                <button className="btn btn-sm btn-error" onClick={() => showNotificationMessage('Case escalated to specialist', 'warning')}>
                  Escalate to Specialist
                </button>
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
                <button className="btn btn-sm btn-outline" onClick={() => showNotificationMessage('Opening case details...', 'info')}>
                  View Details
                </button>
                <button className="btn btn-sm btn-warning" onClick={() => showNotificationMessage('Case added to close monitoring list', 'info')}>
                  Monitor Closely
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && selectedItem && (
        <Modal
          title={
            modalType === 'document' ? 'Document Compliance Details' :
            modalType === 'violation' ? 'Violation Investigation' :
            modalType === 'audit' ? 'Audit Log Details' :
            modalType === 'confirm' ? 'Confirm Action' :
            'Compliance Details'
          }
          onClose={() => {
            setShowModal(false);
            setSelectedItem(null);
            setModalType('view');
          }}
          size={modalType === 'confirm' ? 'small' : 'large'}
        >
          <div className="compliance-details-modal">
            {modalType === 'confirm' ? (
              <div className="confirmation-modal">
                <div className="confirmation-icon">
                  {selectedItem.action === 'restricted' || selectedItem.action === 'restore' ? (
                    <HiLockClosed />
                  ) : selectedItem.action === 'resolve' ? (
                    <HiCheckCircle />
                  ) : selectedItem.action === 'approved' ? (
                    <HiCheckCircle />
                  ) : selectedItem.action === 'rejected' ? (
                    <HiXCircle />
                  ) : (
                    <HiInformationCircle />
                  )}
                </div>
                <div className="confirmation-message">
                  {selectedItem.action === 'restricted' && (
                    <p>Are you sure you want to restrict <strong>{selectedItem.entity}</strong> due to expired <strong>{selectedItem.document}</strong>?</p>
                  )}
                  {selectedItem.action === 'restore' && (
                    <p>Are you sure you want to restore access for <strong>{selectedItem.entity}</strong>?</p>
                  )}
                  {selectedItem.action === 'resolve' && (
                    <p>Are you sure you want to mark violation <strong>{selectedItem.violationId}</strong> as resolved?</p>
                  )}
                  {selectedItem.action === 'approved' && (
                    <p>Are you sure you want to approve renewal request <strong>{selectedItem.requestId}</strong> for <strong>{selectedItem.entity}</strong>?</p>
                  )}
                  {selectedItem.action === 'rejected' && (
                    <p>Are you sure you want to reject renewal request <strong>{selectedItem.requestId}</strong> for <strong>{selectedItem.entity}</strong>?</p>
                  )}
                  <p className="confirmation-warning">This action cannot be undone.</p>
                </div>
                <div className="confirmation-actions">
                  <button 
                    className="btn btn-outline"
                    onClick={() => {
                      setShowModal(false);
                      setSelectedItem(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      if (selectedItem.action === 'restricted' || selectedItem.action === 'restore') {
                        confirmRestriction();
                      } else if (selectedItem.action === 'resolve') {
                        confirmResolveViolation();
                      } else if (selectedItem.action === 'approved' || selectedItem.action === 'rejected') {
                        confirmRenewalAction();
                      }
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            ) : modalType === 'document' ? (
              <div className="document-details">
                <div className="info-grid">
                  <div className="info-item">
                    <label>Entity:</label>
                    <span>{selectedItem.entity}</span>
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
                </div>
                
                <div className="document-preview-section">
                  <h5>Document Preview</h5>
                  <div className="document-preview">
                    <HiDocumentText />
                    <p>Document image preview would appear here</p>
                  </div>
                </div>
                
                <div className="document-actions">
                  <button className="btn btn-outline" onClick={() => showNotificationMessage('Document download initiated', 'info')}>
                    <HiDownload /> Download Document
                  </button>
                  <button className="btn btn-primary" onClick={() => sendReminder(selectedItem)}>
                    <HiBell /> {selectedItem.reminderSent ? 'Re-send Reminder' : 'Send Reminder'}
                  </button>
                </div>
              </div>
            ) : modalType === 'violation' ? (
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
                  <button className="btn btn-warning" onClick={() => resolveViolation(selectedItem)}>
                    Mark as Resolved
                  </button>
                  <button className="btn btn-outline" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            ) : modalType === 'audit' ? (
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
                    <label>Timestamp:</label>
                    <span>{selectedItem.timestamp}</span>
                  </div>
                  <div className="info-item">
                    <label>IP Address:</label>
                    <span>{selectedItem.ip}</span>
                  </div>
                </div>
                
                <div className="audit-actions">
                  <button className="btn btn-outline" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="default-details">
                <p>Details for {selectedItem.entity}</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ComplianceManagement;