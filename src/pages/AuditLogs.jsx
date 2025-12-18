import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  HiSearch, 
  HiFilter, 
  HiDownload, 
  HiEye,
  HiCalendar,
  HiUser,
  HiDocumentText,
  HiClock,
  HiRefresh,
  HiX
} from 'react-icons/hi';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import SearchBar from '../components/common/SearchBar';
import './AuditLogs.css';

const AuditLogs = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-01-31'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    module: '',
    admin: '',
    status: '',
    level: ''
  });
  const [filterModal, setFilterModal] = useState(false);
  const [logs, setLogs] = useState([]);
  const [systemLogs, setSystemLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [showExportModal, setShowExportModal] = useState(false);

  // Mock data for audit logs
  const initialAuditLogs = [
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
    },
    {
      id: 7,
      timestamp: '2024-01-23 16:30:12',
      admin: 'System Admin',
      action: 'Updated system configuration',
      entity: 'Server Config',
      module: 'System Management',
      ip: '192.168.1.105',
      status: 'success'
    },
    {
      id: 8,
      timestamp: '2024-01-23 15:45:33',
      admin: 'Security Admin',
      action: 'Failed login attempt',
      entity: 'user123',
      module: 'Security',
      ip: '192.168.1.106',
      status: 'error'
    }
  ];

  const initialSystemLogs = [
    {
      id: 9,
      timestamp: '2024-01-24 08:30:12',
      level: 'INFO',
      component: 'Payment Gateway',
      message: 'Payment gateway connection established',
      details: 'Razorpay API connected successfully'
    },
    {
      id: 10,
      timestamp: '2024-01-24 08:15:45',
      level: 'WARNING',
      component: 'Database',
      message: 'Slow query detected',
      details: 'Query took 2.3 seconds to execute'
    },
    {
      id: 11,
      timestamp: '2024-01-24 07:45:22',
      level: 'ERROR',
      component: 'Email Service',
      message: 'Failed to send notification email',
      details: 'SMTP connection timeout'
    },
    {
      id: 12,
      timestamp: '2024-01-23 18:20:15',
      level: 'INFO',
      component: 'Cache Service',
      message: 'Cache cleared successfully',
      details: 'All cache entries cleared'
    },
    {
      id: 13,
      timestamp: '2024-01-23 17:30:45',
      level: 'INFO',
      component: 'Backup Service',
      message: 'Database backup completed',
      details: 'Backup size: 2.4 GB, Duration: 15 minutes'
    }
  ];

  // Initialize logs
  useEffect(() => {
    setLogs(initialAuditLogs);
    setSystemLogs(initialSystemLogs);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      addNewLog();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Add new log for real-time simulation
  const addNewLog = useCallback(() => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substr(0, 19),
      admin: ['Super Admin', 'System Admin', 'Security Admin'][Math.floor(Math.random() * 3)],
      action: ['User login', 'Data export', 'Report generated', 'Configuration updated'][Math.floor(Math.random() * 4)],
      entity: `LOG-${Math.floor(Math.random() * 10000)}`,
      module: ['Security', 'System Management', 'User Management'][Math.floor(Math.random() * 3)],
      ip: `192.168.1.${Math.floor(Math.random() * 100) + 100}`,
      status: ['success', 'warning'][Math.floor(Math.random() * 2)]
    };
    
    setLogs(prev => [newLog, ...prev]);
  }, []);

  // Filter logs based on search and filters
  const filteredLogs = useMemo(() => {
    let filtered = logs;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(log => 
        log.admin.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.entity.toLowerCase().includes(query) ||
        log.module.toLowerCase().includes(query)
      );
    }
    
    if (filters.module) {
      filtered = filtered.filter(log => log.module === filters.module);
    }
    
    if (filters.admin) {
      filtered = filtered.filter(log => log.admin === filters.admin);
    }
    
    if (filters.status) {
      filtered = filtered.filter(log => log.status === filters.status);
    }
    
    filtered = filtered.filter(log => {
      const logDate = new Date(log.timestamp);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999);
      return logDate >= startDate && logDate <= endDate;
    });
    
    return filtered;
  }, [logs, searchQuery, filters, dateRange]);

  // Filter system logs
  const filteredSystemLogs = useMemo(() => {
    let filtered = systemLogs;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(log => 
        log.component.toLowerCase().includes(query) ||
        log.message.toLowerCase().includes(query)
      );
    }
    
    if (filters.level) {
      filtered = filtered.filter(log => log.level === filters.level);
    }
    
    filtered = filtered.filter(log => {
      const logDate = new Date(log.timestamp);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999);
      return logDate >= startDate && logDate <= endDate;
    });
    
    return filtered;
  }, [systemLogs, searchQuery, filters, dateRange]);

  // Calculate statistics
  const logStats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = logs.filter(log => log.timestamp.startsWith(today)).length;
    const errorLogs = logs.filter(log => log.status === 'error').length;
    
    return {
      totalLogs: logs.length.toLocaleString(),
      todayLogs: todayLogs.toLocaleString(),
      errorLogs: errorLogs.toLocaleString(),
      adminActivities: (logs.filter(log => log.action.includes('login')).length).toLocaleString()
    };
  }, [logs]);

  // Get unique values for filter dropdowns
  const uniqueModules = useMemo(() => {
    return [...new Set(logs.map(log => log.module))];
  }, [logs]);

  const uniqueAdmins = useMemo(() => {
    return [...new Set(logs.map(log => log.admin))];
  }, [logs]);

  const uniqueLevels = useMemo(() => {
    return [...new Set(systemLogs.map(log => log.level))];
  }, [systemLogs]);

  const columns = {
    all: [
      { key: 'timestamp', label: 'Timestamp', sortable: true },
      { key: 'admin', label: 'Admin User', sortable: true },
      { key: 'action', label: 'Action', sortable: true },
      { key: 'entity', label: 'Entity', sortable: true },
      { key: 'module', label: 'Module', sortable: true },
      { key: 'ip', label: 'IP Address', sortable: true },
      { 
        key: 'status', 
        label: 'Status',
        sortable: true,
        render: (status) => (
          <span className="log-status" data-status={status}>
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
              onClick={() => exportSingleLog(log)}
              title="Export Log"
            >
              <HiDownload />
            </button>
          </div>
        )
      }
    ],
    system: [
      { key: 'timestamp', label: 'Timestamp', sortable: true },
      { 
        key: 'level', 
        label: 'Level',
        sortable: true,
        render: (level) => (
          <span className="log-level" data-level={level.toLowerCase()}>
            {level}
          </span>
        )
      },
      { key: 'component', label: 'Component', sortable: true },
      { key: 'message', label: 'Message', sortable: true },
      { key: 'details', label: 'Details', sortable: true },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, log) => (
          <div className="action-buttons">
            <button 
              className="btn-icon btn-sm"
              onClick={() => viewSystemLog(log)}
              title="View Details"
            >
              <HiEye />
            </button>
          </div>
        )
      }
    ],
    security: [
      { key: 'timestamp', label: 'Timestamp', sortable: true },
      { key: 'admin', label: 'Admin User', sortable: true },
      { key: 'action', label: 'Action', sortable: true },
      { key: 'ip', label: 'IP Address', sortable: true },
      { key: 'entity', label: 'User/Entity', sortable: true },
      { 
        key: 'status', 
        label: 'Status',
        sortable: true,
        render: (status) => (
          <span className="log-status" data-status={status}>
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
              onClick={() => viewSecurityLog(log)}
              title="View Details"
            >
              <HiEye />
            </button>
          </div>
        )
      }
    ]
  };

  // View log details
  const viewLogDetails = (log) => {
    setSelectedLog({
      ...log,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      sessionId: `SESS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      requestId: `REQ-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    });
    setShowModal(true);
  };

  const viewSystemLog = (log) => {
    setSelectedLog({
      ...log,
      userAgent: 'System Process',
      sessionId: 'SYSTEM',
      requestId: `SYS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    });
    setShowModal(true);
  };

  const viewSecurityLog = (log) => {
    setSelectedLog({
      ...log,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      sessionId: `SEC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      requestId: `REQ-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    });
    setShowModal(true);
  };

  // Export functions
  const exportSingleLog = (log) => {
    const data = JSON.stringify(log, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `log-${log.id}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAllLogs = () => {
    const data = getCurrentData();
    let content, mimeType, extension;
    
    if (exportFormat === 'csv') {
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map(log => Object.values(log).map(val => 
        typeof val === 'object' ? JSON.stringify(val) : val
      ).join(','));
      content = [headers, ...rows].join('\n');
      mimeType = 'text/csv';
      extension = 'csv';
    } else {
      content = JSON.stringify(data, null, 2);
      mimeType = 'application/json';
      extension = 'json';
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${activeTab}-${new Date().toISOString().split('T')[0]}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setShowExportModal(false);
  };

  const generateAuditReport = () => {
    const data = getCurrentData();
    const report = {
      generatedAt: new Date().toISOString(),
      filters: {
        dateRange,
        activeTab,
        searchQuery,
        ...filters
      },
      summary: {
        totalRecords: data.length,
        dateRange: `${dateRange.start} to ${dateRange.end}`,
        module: activeTab
      },
      logs: data
    };
    
    const content = JSON.stringify(report, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case 'all': return filteredLogs;
      case 'system': return filteredSystemLogs;
      case 'security': return filteredLogs.filter(log => 
        log.module === 'Security' || log.action.includes('login')
      );
      case 'compliance': return filteredLogs.filter(log => 
        log.module === 'Compliance Management'
      );
      default: return [];
    }
  };

  // Handle date change
  const handleDateChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle filter change
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setFilters({
      module: '',
      admin: '',
      status: '',
      level: ''
    });
    setDateRange({
      start: '2024-01-01',
      end: '2024-01-31'
    });
  };

  // Apply filters from modal
  const applyFilters = () => {
    setFilterModal(false);
  };

  // Refresh logs
  const refreshLogs = () => {
    setIsLoading(true);
    setTimeout(() => {
      addNewLog();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="audit-logs-page">
      <div className="audit-logs-container">
        <div className="page-header">
          <h1>Audit Logs & System Monitoring</h1>
          <p>Track all system activities, admin actions, and security events</p>
        </div>

        <div className="log-stats card">
          <div className="stats-header">
            <h3>Log Statistics</h3>
            <button 
              className="refresh-btn"
              onClick={refreshLogs}
              disabled={isLoading}
              title="Refresh Logs"
            >
              <HiRefresh className={isLoading ? 'spin' : ''} />
            </button>
          </div>
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
            <HiDocumentText /> All Logs ({filteredLogs.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'system' ? 'active' : ''}`}
            onClick={() => setActiveTab('system')}
          >
            <HiCalendar /> System Logs ({filteredSystemLogs.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <HiUser /> Security Logs ({filteredLogs.filter(log => 
              log.module === 'Security' || log.action.includes('login')
            ).length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'compliance' ? 'active' : ''}`}
            onClick={() => setActiveTab('compliance')}
          >
            <HiDocumentText /> Compliance Logs ({filteredLogs.filter(log => 
              log.module === 'Compliance Management'
            ).length})
          </button>
        </div>

        <div className="management-toolbar">
          <div className="toolbar-left">
            <div className="search-container">
              <HiSearch className="search-icon" />
              <input
                type="text"
                className="form-input"
                placeholder="Search logs by admin, action, or entity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchQuery('')}
                >
                  <HiX />
                </button>
              )}
            </div>
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
              <button 
                className="btn btn-outline filter-btn"
                onClick={() => setFilterModal(true)}
              >
                <HiFilter /> Advanced Filter
              </button>
            </div>
          </div>
          <div className="toolbar-right">
            <button 
              className="btn btn-outline"
              onClick={() => setShowExportModal(true)}
            >
              <HiDownload /> Export Logs
            </button>
            <button 
              className="btn btn-primary"
              onClick={generateAuditReport}
            >
              Generate Audit Report
            </button>
          </div>
        </div>

        <div className="card table-card">
          <div className="log-filters">
            <div className="filter-group">
              <label>Module:</label>
              <select 
                className="form-input"
                value={filters.module}
                onChange={(e) => handleFilterChange('module', e.target.value)}
              >
                <option value="">All Modules</option>
                {uniqueModules.map(module => (
                  <option key={module} value={module}>{module}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Admin:</label>
              <select 
                className="form-input"
                value={filters.admin}
                onChange={(e) => handleFilterChange('admin', e.target.value)}
              >
                <option value="">All Admins</option>
                {uniqueAdmins.map(admin => (
                  <option key={admin} value={admin}>{admin}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Status:</label>
              <select 
                className="form-input"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Actions:</label>
              <div className="filter-actions">
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          <div className="table-wrapper">
            <Table
              columns={columns[activeTab] || columns.all}
              data={getCurrentData()}
              emptyMessage={`No ${activeTab} logs found`}
              sortable={true}
            />
          </div>
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

        {/* Filter Modal */}
        {filterModal && (
          <Modal
            title="Advanced Filters"
            onClose={() => setFilterModal(false)}
            size="medium"
          >
            <div className="filter-modal">
              <div className="filter-section">
                <h4>Date & Time</h4>
                <div className="date-time-filters">
                  <div className="filter-group">
                    <label>Start Date & Time:</label>
                    <input 
                      type="datetime-local" 
                      className="form-input"
                      value={`${dateRange.start}T00:00`}
                      onChange={(e) => handleDateChange('start', e.target.value.split('T')[0])}
                    />
                  </div>
                  <div className="filter-group">
                    <label>End Date & Time:</label>
                    <input 
                      type="datetime-local" 
                      className="form-input"
                      value={`${dateRange.end}T23:59`}
                      onChange={(e) => handleDateChange('end', e.target.value.split('T')[0])}
                    />
                  </div>
                </div>
              </div>

              <div className="filter-section">
                <h4>Log Level (System Logs)</h4>
                <div className="level-filters">
                  <div className="checkbox-group">
                    {uniqueLevels.map(level => (
                      <label key={level} className="checkbox-label">
                        <input 
                          type="checkbox"
                          checked={filters.level === level}
                          onChange={(e) => handleFilterChange('level', e.target.checked ? level : '')}
                        />
                        <span className={`log-level-badge ${level.toLowerCase()}`}>
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="filter-section">
                <h4>Status Filter</h4>
                <div className="status-filters">
                  {['success', 'warning', 'error'].map(status => (
                    <label key={status} className="radio-label">
                      <input 
                        type="radio"
                        name="status"
                        checked={filters.status === status}
                        onChange={() => handleFilterChange('status', status)}
                      />
                      <span className={`log-status-badge ${status}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-actions-modal">
                <button className="btn btn-outline" onClick={resetFilters}>
                  Reset All
                </button>
                <button className="btn btn-primary" onClick={applyFilters}>
                  Apply Filters
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Export Modal */}
        {showExportModal && (
          <Modal
            title="Export Logs"
            onClose={() => setShowExportModal(false)}
            size="small"
          >
            <div className="export-modal">
              <div className="export-options">
                <h4>Select Export Format</h4>
                <div className="format-options">
                  <label className="radio-label">
                    <input 
                      type="radio"
                      name="exportFormat"
                      value="csv"
                      checked={exportFormat === 'csv'}
                      onChange={(e) => setExportFormat(e.target.value)}
                    />
                    <span>CSV Format</span>
                  </label>
                  <label className="radio-label">
                    <input 
                      type="radio"
                      name="exportFormat"
                      value="json"
                      checked={exportFormat === 'json'}
                      onChange={(e) => setExportFormat(e.target.value)}
                    />
                    <span>JSON Format</span>
                  </label>
                </div>
                
                <div className="export-info">
                  <p>Exporting <strong>{getCurrentData().length}</strong> records from <strong>{activeTab}</strong> logs</p>
                  <p className="export-date-range">
                    Date Range: {dateRange.start} to {dateRange.end}
                  </p>
                </div>
              </div>
              
              <div className="export-actions">
                <button className="btn btn-outline" onClick={() => setShowExportModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={exportAllLogs}>
                  <HiDownload /> Export Now
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Log Details Modal */}
        {showModal && selectedLog && (
          <Modal
            title="Log Details"
            onClose={() => setShowModal(false)}
            size="large"
          >
            <div className="log-details-modal">
              <div className="log-header">
                <div className="log-id">Log ID: {selectedLog.id}</div>
                <div className="log-timestamp">
                  <HiClock /> {selectedLog.timestamp}
                </div>
              </div>
              
              <div className="log-info-grid">
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
                    <span className="log-status" data-status={selectedLog.status}>
                      {selectedLog.status.charAt(0).toUpperCase() + selectedLog.status.slice(1)}
                    </span>
                  </div>
                )}
                {selectedLog.level && (
                  <div className="info-item">
                    <label>Log Level:</label>
                    <span className="log-level" data-level={selectedLog.level.toLowerCase()}>
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
              </div>

              {selectedLog.details && (
                <div className="log-details-section">
                  <h5>Details</h5>
                  <div className="log-details-content">
                    {selectedLog.details}
                  </div>
                </div>
              )}

              <div className="log-metadata">
                <h5>Additional Metadata</h5>
                <div className="metadata-grid">
                  <div className="metadata-item">
                    <label>User Agent:</label>
                    <span>{selectedLog.userAgent}</span>
                  </div>
                  <div className="metadata-item">
                    <label>Session ID:</label>
                    <span>{selectedLog.sessionId}</span>
                  </div>
                  <div className="metadata-item">
                    <label>Request ID:</label>
                    <span>{selectedLog.requestId}</span>
                  </div>
                </div>
              </div>

              <div className="log-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => exportSingleLog(selectedLog)}
                >
                  <HiDownload /> Export This Log
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AuditLogs;