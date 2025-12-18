import React, { useState, useEffect, useCallback } from 'react';
import './Settings.css';
import {
  FiSettings, FiUsers, FiSliders, FiDollarSign, FiHeart,
  FiTruck, FiBell, FiShield, FiFileText, FiArrowLeft,
  FiPlus, FiEdit2, FiTrash2, FiEye, FiSave, FiFilter,
  FiDownload, FiCheck, FiX, FiUser, FiBriefcase,
  FiPackage, FiMapPin, FiAlertTriangle, FiClock,
  FiLock, FiRefreshCw, FiLogOut, FiDatabase,
  FiSearch, FiChevronDown, FiChevronUp, FiAlertCircle,
  FiCheckCircle, FiXCircle, FiUpload, FiCopy,
  FiExternalLink, FiHelpCircle, FiActivity
} from 'react-icons/fi';

// Enhanced mock data
const mockAuditLogs = [
  { id: 1, admin: "Super Admin", role: "Super Admin", module: "Financial Settings", action: "Update", oldValue: "10%", newValue: "12%", timestamp: "2024-01-15 14:30:00", ip: "192.168.1.1", status: "success" },
  { id: 2, admin: "Ops Admin", role: "Operations", module: "Platform Rules", action: "Create", oldValue: "-", newValue: "Enabled Blood Bank", timestamp: "2024-01-15 10:15:00", ip: "192.168.1.2", status: "success" },
  { id: 3, admin: "Compliance Admin", role: "Compliance", module: "Medical Rules", action: "Update", oldValue: "3 days", newValue: "7 days", timestamp: "2024-01-14 16:45:00", ip: "192.168.1.3", status: "warning" },
  { id: 4, admin: "Finance Admin", role: "Finance", module: "Commission Settings", action: "Delete", oldValue: "Fixed Rate", newValue: "Percentage", timestamp: "2024-01-14 09:20:00", ip: "192.168.1.4", status: "error" },
];

const mockRoles = [
  { id: 1, name: "Super Admin", description: "Full system access", permissions: ["All"], activeAdmins: 1, status: "active", createdAt: "2024-01-01" },
  { id: 2, name: "Operations Admin", description: "Platform operations", permissions: ["Platform Rules", "Order & Delivery", "Notifications"], activeAdmins: 3, status: "active", createdAt: "2024-01-02" },
  { id: 3, name: "Finance Admin", description: "Financial settings", permissions: ["Financial Settings", "Commission", "Tax"], activeAdmins: 2, status: "active", createdAt: "2024-01-03" },
  { id: 4, name: "Compliance Admin", description: "Medical compliance", permissions: ["Medical Rules", "Security"], activeAdmins: 2, status: "active", createdAt: "2024-01-04" },
  { id: 5, name: "Support Admin", description: "Customer support access", permissions: ["User Management", "Ticket View"], activeAdmins: 5, status: "inactive", createdAt: "2024-01-05" },
];

// Permission templates for quick role setup
const permissionTemplates = {
  'Super Admin': ['all'],
  'Operations Admin': ['platformRules', 'orderDelivery', 'notifications', 'auditView'],
  'Finance Admin': ['financialSettings', 'commissionSettings', 'taxSettings', 'refundSettings'],
  'Compliance Admin': ['medicalRules', 'security', 'auditView'],
  'Support Admin': ['userManagement', 'ticketView', 'basicSettings']
};

// Clipboard utility function with fallback
const copyToClipboard = (text) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text)
      .then(() => true)
      .catch(() => {
        // Fallback to textarea method
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);
          return successful;
        } catch (err) {
          document.body.removeChild(textArea);
          return false;
        }
      });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return Promise.resolve(successful);
    } catch (err) {
      document.body.removeChild(textArea);
      return Promise.resolve(false);
    }
  }
};

const Settings = () => {
  const [currentScreen, setCurrentScreen] = useState('systemSettings');
  const [userRole, setUserRole] = useState('Super Admin');
  const [settingsData, setSettingsData] = useState({
    platformRules: {
      userLimits: { familyProfiles: 5, documentsPerProfile: 10, activePrescriptions: 3 },
      profileRules: { editingAllowed: true, mandatoryFields: ['name', 'dob', 'contact'], profileDeletion: false },
      featureToggles: { bloodBank: true, labTest: true, vehicleBooking: false, autoPayments: true, chatbot: false }
    },
    financialSettings: {
      commissions: { doctorConsultation: 15, pharmacyOrder: 10, deliveryPartner: 8 },
      tax: { gstPercentage: 18, taxInclusive: true, appliesTo: ['doctor', 'medicine', 'delivery'] },
      refund: { timeWindow: 7, partialRefund: true, autoRefund: false }
    },
    medicalRules: {
      pregnancy: { mandatoryOffline: true, freeFirstConsultation: true, maxFollowUps: 3 },
      prescription: { validityPeriod: 30, maxRefills: 3, controlledMedicine: true },
      consultation: { allowedModes: ['video', 'audio', 'chat'], timeLimit: 30, emergencyHandling: 'priority' }
    },
    orderDelivery: {
      deliveryRadius: { maxDistance: 10, emergencyRadius: 15, cityBased: true },
      emergencyPriority: { autoPriority: true, fastTrack: true, pregnancyPriority: true },
      riderAssignment: { distanceBased: true, performanceBased: true, maxOrders: 5 }
    },
    notifications: {
      user: { orderUpdates: true, deliveryTracking: true, consultationReminders: true, pregnancyMilestones: true },
      doctor: { newAppointments: true, complianceAlerts: true, licenseReminders: true },
      vendor: { newOrders: true, stockAlerts: true, settlementNotifications: true },
      rider: { newTasks: true, emergencyAlerts: true, earningsUpdates: true }
    },
    security: {
      login: { minPasswordLength: 8, maxFailedAttempts: 3, lockoutDuration: 30, passwordChangeInterval: 90 },
      otp: { validity: 5, maxResend: 3, cooldown: 60 },
      session: { timeout: 30, concurrentSessions: 1, forceLogout: true }
    }
  });

  const [auditLogs, setAuditLogs] = useState(mockAuditLogs);
  const [roles, setRoles] = useState(mockRoles);
  const [newLog, setNewLog] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [tempSettings, setTempSettings] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({});
  const [activeTab, setActiveTab] = useState('all');
  const [bulkActions, setBulkActions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(null);
  const [importData, setImportData] = useState(null);
  const [notification, setNotification] = useState(null);

  // Show notification
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Enhanced permission check with granular controls
  const hasPermission = (module, action = 'view') => {
    const permissions = {
      'Super Admin': { all: ['create', 'view', 'edit', 'delete'] },
      'Operations Admin': { 
        platformRules: ['view', 'edit'],
        orderDelivery: ['view', 'edit'],
        notifications: ['view', 'edit'],
        auditView: ['view']
      },
      'Finance Admin': { 
        financialSettings: ['view', 'edit'],
        commissionSettings: ['view', 'edit'],
        taxSettings: ['view', 'edit'],
        refundSettings: ['view', 'edit']
      },
      'Compliance Admin': { 
        medicalRules: ['view', 'edit'],
        security: ['view', 'edit'],
        auditView: ['view']
      }
    };
    
    if (userRole === 'Super Admin') return true;
    
    const rolePermissions = permissions[userRole];
    if (!rolePermissions) return false;
    
    return rolePermissions.all || 
           (rolePermissions[module] && rolePermissions[module].includes(action));
  };

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const actions = ['Update', 'Create', 'Delete'];
        const modules = ['Financial Settings', 'Platform Rules', 'Medical Rules', 'Security Settings'];
        const admins = ['Super Admin', 'Ops Admin', 'Finance Admin', 'Compliance Admin'];
        
        const newLog = {
          id: auditLogs.length + 1,
          admin: admins[Math.floor(Math.random() * admins.length)],
          role: userRole,
          module: modules[Math.floor(Math.random() * modules.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          oldValue: Math.floor(Math.random() * 100) + '%',
          newValue: Math.floor(Math.random() * 100) + '%',
          timestamp: new Date().toISOString().replace('T', ' ').substr(0, 19),
          ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
          status: ['success', 'warning', 'error'][Math.floor(Math.random() * 3)]
        };
        
        setNewLog(newLog);
        setTimeout(() => {
          setAuditLogs(prev => [newLog, ...prev.slice(0, 99)]); // Keep only last 100 logs
          setNewLog(null);
        }, 3000);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [auditLogs.length, userRole]);

  // Enhanced logging with status tracking
  const logChange = useCallback((module, action, field, oldValue, newValue, status = 'success') => {
    const logEntry = {
      id: auditLogs.length + 1,
      admin: userRole,
      role: userRole,
      module: module,
      action: action,
      oldValue: oldValue,
      newValue: newValue,
      field: field,
      timestamp: new Date().toISOString().replace('T', ' ').substr(0, 19),
      ip: '192.168.1.100',
      status: status
    };
    
    setAuditLogs(prev => [logEntry, ...prev.slice(0, 99)]);
  }, [auditLogs.length, userRole]);

  // Enhanced settings update with validation
  const updateSettings = useCallback((module, section, field, value) => {
    if (!hasPermission(module, 'edit')) {
      showNotification('Access Denied: You do not have permission to modify these settings.', 'error');
      return false;
    }

    const oldValue = settingsData[module][section][field];
    
    // Validation based on module
    let isValid = true;
    if (module === 'financialSettings' && section === 'commissions') {
      if (value < 0 || value > 100) {
        showNotification('Commission percentage must be between 0 and 100', 'error');
        isValid = false;
      }
    }
    
    if (isValid) {
      setTempSettings(prev => ({
        ...(prev || settingsData),
        [module]: {
          ...(prev?.[module] || settingsData[module]),
          [section]: {
            ...(prev?.[module]?.[section] || settingsData[module][section]),
            [field]: value
          }
        }
      }));
      
      setUnsavedChanges(true);
      return true;
    }
    
    return false;
  }, [settingsData, hasPermission, showNotification]);

  // Enhanced save with confirmation
  const saveSettings = useCallback((module, section = null) => {
    if (!tempSettings) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (section) {
        // Save specific section
        const oldSection = settingsData[module][section];
        const newSection = tempSettings[module][section];
        
        Object.keys(newSection).forEach(field => {
          if (newSection[field] !== oldSection[field]) {
            logChange(
              module.charAt(0).toUpperCase() + module.slice(1).replace(/([A-Z])/g, ' $1'),
              'Update',
              `${section}.${field}`,
              oldSection[field],
              newSection[field],
              'success'
            );
          }
        });
        
        setSettingsData(prev => ({
          ...prev,
          [module]: {
            ...prev[module],
            [section]: newSection
          }
        }));
      } else {
        // Save entire module
        Object.keys(tempSettings[module]).forEach(section => {
          Object.keys(tempSettings[module][section]).forEach(field => {
            if (tempSettings[module][section][field] !== settingsData[module][section][field]) {
              logChange(
                module.charAt(0).toUpperCase() + module.slice(1).replace(/([A-Z])/g, ' $1'),
                'Update',
                `${section}.${field}`,
                settingsData[module][section][field],
                tempSettings[module][section][field],
                'success'
              );
            }
          });
        });

        setSettingsData(tempSettings);
      }

      setTempSettings(null);
      setUnsavedChanges(false);
      setLoading(false);
      showNotification('Settings saved successfully!', 'success');
    }, 1000);
  }, [tempSettings, settingsData, logChange, showNotification]);

  // Reset settings to defaults
  const resetSettings = useCallback((module, section = null) => {
    setShowConfirmation({
      type: 'reset',
      message: `Are you sure you want to reset ${section ? section : module} to default values?`,
      module: module,
      section: section,
      onConfirm: () => {
        const defaults = {
          platformRules: {
            userLimits: { familyProfiles: 5, documentsPerProfile: 10, activePrescriptions: 3 },
            profileRules: { editingAllowed: true, mandatoryFields: ['name', 'dob', 'contact'], profileDeletion: false },
            featureToggles: { bloodBank: true, labTest: true, vehicleBooking: false, autoPayments: true, chatbot: false }
          },
          financialSettings: {
            commissions: { doctorConsultation: 15, pharmacyOrder: 10, deliveryPartner: 8 },
            tax: { gstPercentage: 18, taxInclusive: true, appliesTo: ['doctor', 'medicine', 'delivery'] },
            refund: { timeWindow: 7, partialRefund: true, autoRefund: false }
          },
          medicalRules: {
            pregnancy: { mandatoryOffline: true, freeFirstConsultation: true, maxFollowUps: 3 },
            prescription: { validityPeriod: 30, maxRefills: 3, controlledMedicine: true },
            consultation: { allowedModes: ['video', 'audio', 'chat'], timeLimit: 30, emergencyHandling: 'priority' }
          },
          orderDelivery: {
            deliveryRadius: { maxDistance: 10, emergencyRadius: 15, cityBased: true },
            emergencyPriority: { autoPriority: true, fastTrack: true, pregnancyPriority: true },
            riderAssignment: { distanceBased: true, performanceBased: true, maxOrders: 5 }
          },
          notifications: {
            user: { orderUpdates: true, deliveryTracking: true, consultationReminders: true, pregnancyMilestones: true },
            doctor: { newAppointments: true, complianceAlerts: true, licenseReminders: true },
            vendor: { newOrders: true, stockAlerts: true, settlementNotifications: true },
            rider: { newTasks: true, emergencyAlerts: true, earningsUpdates: true }
          },
          security: {
            login: { minPasswordLength: 8, maxFailedAttempts: 3, lockoutDuration: 30, passwordChangeInterval: 90 },
            otp: { validity: 5, maxResend: 3, cooldown: 60 },
            session: { timeout: 30, concurrentSessions: 1, forceLogout: true }
          }
        };

        if (section) {
          setTempSettings(prev => ({
            ...prev,
            [module]: {
              ...prev[module],
              [section]: defaults[module][section]
            }
          }));
        } else {
          setTempSettings(prev => ({
            ...prev,
            [module]: defaults[module]
          }));
        }
        
        setUnsavedChanges(true);
        setShowConfirmation(null);
      }
    });
  }, []);

  // Export settings
  const exportSettings = useCallback((module) => {
    const data = module ? settingsData[module] : settingsData;
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quickmed-settings-${module || 'all'}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    logChange(
      'Settings Export',
      'Export',
      module || 'All Settings',
      '-',
      'Exported',
      'success'
    );
    showNotification('Settings exported successfully!', 'success');
  }, [settingsData, logChange, showNotification]);

  // Import settings
  const handleImport = useCallback((event, module) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        setImportData({ data: importedData, module });
        setShowConfirmation({
          type: 'import',
          message: `Import settings for ${module}? This will overwrite current settings.`,
          module: module,
          onConfirm: () => {
            setTempSettings(prev => ({
              ...prev,
              [module]: importedData
            }));
            setUnsavedChanges(true);
            setImportData(null);
            setShowConfirmation(null);
            showNotification('Settings imported successfully!', 'success');
          }
        });
      } catch (error) {
        showNotification('Invalid settings file format', 'error');
      }
    };
    reader.readAsText(file);
  }, [showNotification]);

  // Navigate with confirmation for unsaved changes
  const navigateTo = useCallback((screen) => {
    if (unsavedChanges) {
      setShowConfirmation({
        type: 'navigate',
        message: 'You have unsaved changes. Are you sure you want to leave?',
        onConfirm: () => {
          setCurrentScreen(screen);
          setTempSettings(null);
          setUnsavedChanges(false);
          setShowConfirmation(null);
        },
        onCancel: () => setShowConfirmation(null)
      });
    } else {
      setCurrentScreen(screen);
    }
  }, [unsavedChanges]);

  // Toggle section expansion
  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  // Bulk operations for roles
  const handleBulkAction = useCallback((action, selectedIds) => {
    switch(action) {
      case 'activate':
        setRoles(prev => prev.map(role => 
          selectedIds.includes(role.id) ? { ...role, status: 'active' } : role
        ));
        showNotification(`${selectedIds.length} roles activated successfully!`, 'success');
        break;
      case 'deactivate':
        setRoles(prev => prev.map(role => 
          selectedIds.includes(role.id) ? { ...role, status: 'inactive' } : role
        ));
        showNotification(`${selectedIds.length} roles deactivated successfully!`, 'success');
        break;
      case 'delete':
        setShowConfirmation({
          type: 'bulkDelete',
          message: `Delete ${selectedIds.length} selected roles?`,
          onConfirm: () => {
            setRoles(prev => prev.filter(role => !selectedIds.includes(role.id)));
            setBulkActions([]);
            setShowConfirmation(null);
            showNotification(`${selectedIds.length} roles deleted successfully!`, 'success');
          },
          onCancel: () => setShowConfirmation(null)
        });
        break;
    }
  }, [showNotification]);

  // Search and filter functions
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = !searchTerm || 
      log.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || log.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const filteredRoles = roles.filter(role => 
    !searchTerm || 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render screens based on currentScreen
  const renderScreen = () => {
    const commonProps = {
      navigateTo,
      logChange,
      hasPermission,
      loading,
      auditLogs,
      showNotification,
      copyToClipboard
    };

    switch(currentScreen) {
      case 'systemSettings':
        return (
          <SystemSettingsScreen 
            {...commonProps}
            userRole={userRole}
            newLog={newLog}
            unsavedChanges={unsavedChanges}
            setUserRole={setUserRole}
            auditLogs={auditLogs}
            roles={roles}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        );
      case 'roles':
        return (
          <RolesScreen 
            {...commonProps}
            roles={filteredRoles}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            bulkActions={bulkActions}
            setBulkActions={setBulkActions}
            handleBulkAction={handleBulkAction}
            permissionTemplates={permissionTemplates}
            setRoles={setRoles}
          />
        );
      case 'platformRules':
        return (
          <EnhancedSettingsScreen 
            {...commonProps}
            module="platformRules"
            title="Platform Rules"
            icon={<FiSliders />}
            subtitle="Configure system-wide rules and feature toggles"
            settings={tempSettings?.platformRules || settingsData.platformRules}
            updateSettings={updateSettings}
            saveSettings={saveSettings}
            resetSettings={resetSettings}
            exportSettings={exportSettings}
            handleImport={handleImport}
            unsavedChanges={unsavedChanges}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        );
      case 'financialSettings':
        return (
          <EnhancedSettingsScreen 
            {...commonProps}
            module="financialSettings"
            title="Financial Settings"
            icon={<FiDollarSign />}
            subtitle="Configure commissions, taxes, and refund policies"
            settings={tempSettings?.financialSettings || settingsData.financialSettings}
            updateSettings={updateSettings}
            saveSettings={saveSettings}
            resetSettings={resetSettings}
            exportSettings={exportSettings}
            handleImport={handleImport}
            unsavedChanges={unsavedChanges}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        );
      case 'medicalRules':
        return (
          <EnhancedSettingsScreen 
            {...commonProps}
            module="medicalRules"
            title="Medical Rules"
            icon={<FiHeart />}
            subtitle="Configure medical safety and compliance standards"
            settings={tempSettings?.medicalRules || settingsData.medicalRules}
            updateSettings={updateSettings}
            saveSettings={saveSettings}
            resetSettings={resetSettings}
            exportSettings={exportSettings}
            handleImport={handleImport}
            unsavedChanges={unsavedChanges}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        );
      case 'orderDelivery':
        return (
          <EnhancedSettingsScreen 
            {...commonProps}
            module="orderDelivery"
            title="Order & Delivery Rules"
            icon={<FiTruck />}
            subtitle="Configure delivery parameters and prioritization rules"
            settings={tempSettings?.orderDelivery || settingsData.orderDelivery}
            updateSettings={updateSettings}
            saveSettings={saveSettings}
            resetSettings={resetSettings}
            exportSettings={exportSettings}
            handleImport={handleImport}
            unsavedChanges={unsavedChanges}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        );
      case 'notifications':
        return (
          <EnhancedSettingsScreen 
            {...commonProps}
            module="notifications"
            title="Notification Settings"
            icon={<FiBell />}
            subtitle="Configure alerts and notifications for different user roles"
            settings={tempSettings?.notifications || settingsData.notifications}
            updateSettings={updateSettings}
            saveSettings={saveSettings}
            resetSettings={resetSettings}
            exportSettings={exportSettings}
            handleImport={handleImport}
            unsavedChanges={unsavedChanges}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        );
      case 'security':
        return (
          <EnhancedSettingsScreen 
            {...commonProps}
            module="security"
            title="Security Settings"
            icon={<FiShield />}
            subtitle="Configure security policies and access controls"
            settings={tempSettings?.security || settingsData.security}
            updateSettings={updateSettings}
            saveSettings={saveSettings}
            resetSettings={resetSettings}
            exportSettings={exportSettings}
            handleImport={handleImport}
            unsavedChanges={unsavedChanges}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        );
      case 'auditLogs':
        return (
          <AuditLogsScreen 
            {...commonProps}
            logs={filteredLogs}
            newLog={newLog}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings-container">
      {/* Global Notification */}
      {notification && (
        <div className={`global-notification ${notification.type}`}>
          {notification.type === 'success' && <FiCheckCircle />}
          {notification.type === 'error' && <FiXCircle />}
          {notification.type === 'info' && <FiAlertCircle />}
          {notification.message}
          <button className="notification-close" onClick={() => setNotification(null)}>
            <FiX />
          </button>
        </div>
      )}

      <div className="settings-header">
        <div className="header-left">
          <FiSettings className="main-icon" />
          <div>
            <h1>Admin Settings</h1>
            <p className="header-subtitle">QuickMed Platform Configuration</p>
          </div>
        </div>
        <div className="user-info">
          <div className="role-selector">
            <select 
              value={userRole} 
              onChange={(e) => setUserRole(e.target.value)}
              className="role-dropdown"
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Operations Admin">Operations Admin</option>
              <option value="Finance Admin">Finance Admin</option>
              <option value="Compliance Admin">Compliance Admin</option>
            </select>
          </div>
          <div className="role-badge">{userRole}</div>
          {unsavedChanges && (
            <div className="unsaved-changes">
              <FiAlertTriangle /> Unsaved Changes
            </div>
          )}
          <div className="system-status">
            <FiActivity className={`status-icon ${loading ? 'loading' : 'active'}`} />
            <span className="status-text">{loading ? 'Saving...' : 'System Active'}</span>
          </div>
        </div>
      </div>
      
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Saving changes...</p>
        </div>
      )}
      
      {showConfirmation && (
        <ConfirmationDialog 
          {...showConfirmation}
          onCancel={() => setShowConfirmation(null)}
        />
      )}
      
      {renderScreen()}
    </div>
  );
};

// Enhanced System Settings Screen
const SystemSettingsScreen = ({ 
  navigateTo, 
  userRole, 
  newLog, 
  unsavedChanges, 
  setUserRole, 
  auditLogs, 
  roles,
  searchTerm,
  setSearchTerm
}) => {
  const modules = [
    { id: 'roles', icon: <FiUsers />, title: 'Roles & Permissions', subtitle: 'Manage admin roles and access controls', badge: 'Role Management', color: 'primary' },
    { id: 'platformRules', icon: <FiSliders />, title: 'Platform Rules', subtitle: 'Configure system-wide rules and features', badge: 'System Config', color: 'mint' },
    { id: 'financialSettings', icon: <FiDollarSign />, title: 'Financial Settings', subtitle: 'Manage commissions, taxes, and refunds', badge: 'Finance', color: 'primary' },
    { id: 'medicalRules', icon: <FiHeart />, title: 'Medical Rules', subtitle: 'Configure medical compliance and safety', badge: 'Medical', color: 'mint' },
    { id: 'orderDelivery', icon: <FiTruck />, title: 'Order & Delivery Rules', subtitle: 'Set delivery parameters and priorities', badge: 'Delivery', color: 'primary' },
    { id: 'notifications', icon: <FiBell />, title: 'Notification Settings', subtitle: 'Configure alerts and notifications', badge: 'Alerts', color: 'mint' },
    { id: 'security', icon: <FiShield />, title: 'Security Settings', subtitle: 'Manage security policies and access', badge: 'Security', color: 'primary' },
    { id: 'auditLogs', icon: <FiFileText />, title: 'Audit & Settings Logs', subtitle: 'View all configuration changes', badge: 'Audit', color: 'mint', notification: newLog },
  ];

  const permissions = {
    'Super Admin': ['all'],
    'Operations Admin': ['platformRules', 'orderDelivery', 'notifications'],
    'Finance Admin': ['financialSettings'],
    'Compliance Admin': ['medicalRules', 'security']
  };

  const hasAccess = (module) => {
    return userRole === 'Super Admin' || 
           (permissions[userRole] && 
            (permissions[userRole].includes('all') || 
             permissions[userRole].includes(module)));
  };

  const filteredModules = modules.filter(module => 
    !searchTerm || 
    module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="system-settings">
      <div className="screen-header">
        <h2><FiSettings className="header-icon" /> System Settings</h2>
        <p className="screen-subtitle">Configure platform-wide rules and access controls</p>
        
        <div className="quick-stats">
          <div className="stat-card">
            <FiUsers />
            <span>{roles.length} Active Roles</span>
          </div>
          <div className="stat-card">
            <FiFileText />
            <span>{auditLogs.length} Audit Logs</span>
          </div>
          <div className="stat-card">
            <FiSettings />
            <span>8 Config Modules</span>
          </div>
        </div>
      </div>
      
      <div className="search-bar">
        <FiSearch />
        <input 
          type="text" 
          placeholder="Search settings modules..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="settings-grid">
        {filteredModules.map(module => (
          hasAccess(module.id) && (
            <div 
              key={module.id} 
              className="settings-card"
              onClick={() => navigateTo(module.id)}
            >
              <div className={`settings-icon ${module.color}-bg`}>
                {module.icon}
              </div>
              <h3>{module.title}</h3>
              <p>{module.subtitle}</p>
              <span className="card-badge">{module.badge}</span>
              {module.notification && (
                <span className="new-update-indicator">New Update</span>
              )}
              <div className="access-level">
                <span className="access-badge">
                  {userRole === 'Super Admin' ? 'Full Access' : 'Limited Access'}
                </span>
              </div>
            </div>
          )
        ))}
      </div>
      
      {filteredModules.length === 0 && (
        <div className="no-results">
          <FiSearch />
          <p>No modules found matching "{searchTerm}"</p>
          <button className="btn-secondary" onClick={() => setSearchTerm('')}>
            Clear Search
          </button>
        </div>
      )}
      
      <div className="system-actions">
        <button className="btn-secondary" onClick={() => navigateTo('auditLogs')}>
          <FiFileText /> View Recent Changes
        </button>
        <button className="btn-secondary" onClick={() => setUserRole('Super Admin')}>
          <FiUser /> Switch to Super Admin
        </button>
        <button className="back-button" onClick={() => window.history.back()}>
          <FiArrowLeft /> Back to Dashboard
        </button>
      </div>
      
      {unsavedChanges && (
        <div className="unsaved-warning">
          <FiAlertCircle />
          <span>You have unsaved changes in another tab</span>
        </div>
      )}
    </div>
  );
};

// Enhanced Roles Screen
const RolesScreen = ({ 
  roles, 
  selectedRole, 
  setSelectedRole, 
  navigateTo, 
  logChange,
  searchTerm,
  setSearchTerm,
  bulkActions,
  setBulkActions,
  handleBulkAction,
  permissionTemplates,
  setRoles,
  showNotification,
  copyToClipboard
}) => {
  const [showAddRole, setShowAddRole] = useState(false);
  const [showEditRole, setShowEditRole] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [showPermissions, setShowPermissions] = useState(false);
  const [roleForm, setRoleForm] = useState({ name: '', description: '', template: '' });
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handleAddRole = () => {
    if (roleForm.name && roleForm.description) {
      const newRole = {
        id: roles.length + 1,
        name: roleForm.name,
        description: roleForm.description,
        permissions: roleForm.template ? permissionTemplates[roleForm.template] : selectedPermissions,
        activeAdmins: 0,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setRoles(prev => [...prev, newRole]);
      logChange('Roles & Permissions', 'Create', 'Role', '-', roleForm.name, 'success');
      showNotification(`Role "${roleForm.name}" created successfully!`, 'success');
      setRoleForm({ name: '', description: '', template: '' });
      setSelectedPermissions([]);
      setShowAddRole(false);
    } else {
      showNotification('Please fill in all required fields', 'error');
    }
  };

  const handleEditRole = () => {
    if (editingRole && roleForm.name) {
      const oldName = editingRole.name;
      const updatedRole = {
        ...editingRole,
        name: roleForm.name,
        description: roleForm.description
      };
      
      setRoles(prev => prev.map(role => 
        role.id === editingRole.id ? updatedRole : role
      ));
      
      logChange('Roles & Permissions', 'Update', 'Role', oldName, roleForm.name, 'success');
      showNotification(`Role "${roleForm.name}" updated successfully!`, 'success');
      setEditingRole(null);
      setRoleForm({ name: '', description: '', template: '' });
      setSelectedPermissions([]);
      setShowEditRole(false);
    } else {
      showNotification('Please fill in all required fields', 'error');
    }
  };

  const handleDeleteRole = (role) => {
    if (role.activeAdmins > 0) {
      showNotification(`Cannot delete role "${role.name}" as it is assigned to ${role.activeAdmins} admin(s).`, 'error');
      return;
    }
    
    setRoles(prev => prev.filter(r => r.id !== role.id));
    logChange('Roles & Permissions', 'Delete', 'Role', role.name, '-', 'success');
    showNotification(`Role "${role.name}" deleted successfully!`, 'success');
    if (selectedRole?.id === role.id) {
      setSelectedRole(null);
    }
  };

  const handleTemplateSelect = (template) => {
    setRoleForm(prev => ({ ...prev, template }));
    if (template && permissionTemplates[template]) {
      setSelectedPermissions(permissionTemplates[template]);
    }
  };

  const togglePermission = (permission) => {
    setSelectedPermissions(prev => 
      prev.includes(permission) 
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const toggleBulkSelect = (roleId) => {
    setBulkActions(prev =>
      prev.includes(roleId)
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleCopyRole = async (role) => {
    const roleText = JSON.stringify(role, null, 2);
    const success = await copyToClipboard(roleText);
    if (success) {
      showNotification('Role details copied to clipboard', 'success');
    } else {
      showNotification('Failed to copy to clipboard', 'error');
    }
  };

  const filteredRoles = roles.filter(role => 
    !searchTerm || 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="screen-container">
      <div className="screen-header">
        <h2><FiUsers /> Roles & Permissions</h2>
        <p className="screen-subtitle">Manage admin roles and their access permissions</p>
      </div>
      
      <div className="action-bar">
        <div className="search-bar">
          <FiSearch />
          <input 
            type="text" 
            placeholder="Search roles..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="action-buttons-group">
          <button className="btn-primary" onClick={() => setShowAddRole(true)}>
            <FiPlus /> Add Role
          </button>
          {bulkActions.length > 0 && (
            <div className="bulk-actions">
              <span className="bulk-count">{bulkActions.length} selected</span>
              <button className="btn-secondary" onClick={() => handleBulkAction('activate', bulkActions)}>
                <FiCheckCircle /> Activate
              </button>
              <button className="btn-secondary" onClick={() => handleBulkAction('deactivate', bulkActions)}>
                <FiXCircle /> Deactivate
              </button>
              <button className="btn-danger" onClick={() => handleBulkAction('delete', bulkActions)}>
                <FiTrash2 /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="roles-grid">
        {filteredRoles.map(role => (
          <div 
            key={role.id} 
            className={`role-card ${selectedRole?.id === role.id ? 'selected' : ''} ${role.status}`}
            onClick={() => setSelectedRole(role)}
          >
            <div className="role-card-header">
              <div className="role-select-checkbox">
                <input 
                  type="checkbox" 
                  checked={bulkActions.includes(role.id)}
                  onChange={() => toggleBulkSelect(role.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="role-icon">
                <FiBriefcase />
              </div>
              <div>
                <h3>{role.name}</h3>
                <p className="role-description">{role.description}</p>
                <div className="role-meta">
                  <span className={`status-indicator status-${role.status}`}></span>
                  <span className="meta-text">Created: {role.createdAt}</span>
                  <span className="meta-text">•</span>
                  <span className="meta-text">{role.activeAdmins} active admin(s)</span>
                </div>
              </div>
            </div>
            <div className="role-stats">
              <div className="stat">
                <span className="stat-label">Permissions</span>
                <span className="stat-value">{role.permissions.length}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Active Admins</span>
                <span className="stat-value">{role.activeAdmins}</span>
              </div>
            </div>
            <div className="role-actions">
              <button className="icon-btn" onClick={(e) => {
                e.stopPropagation();
                setEditingRole(role);
                setRoleForm({ name: role.name, description: role.description, template: '' });
                setSelectedPermissions(role.permissions);
                setShowEditRole(true);
              }}>
                <FiEdit2 />
              </button>
              <button className="icon-btn danger" onClick={(e) => {
                e.stopPropagation();
                if (role.name === 'Super Admin') {
                  showNotification('Cannot delete Super Admin role', 'error');
                  return;
                }
                if (window.confirm(`Are you sure you want to delete "${role.name}"?`)) {
                  handleDeleteRole(role);
                }
              }}>
                <FiTrash2 />
              </button>
              <button className="icon-btn" onClick={(e) => {
                e.stopPropagation();
                setSelectedRole(role);
                setSelectedPermissions(role.permissions);
                setShowPermissions(true);
              }}>
                <FiEye />
              </button>
              <button className="icon-btn" onClick={(e) => {
                e.stopPropagation();
                handleCopyRole(role);
              }}>
                <FiCopy />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRoles.length === 0 && (
        <div className="no-results">
          <FiSearch />
          <p>No roles found matching "{searchTerm}"</p>
          <button className="btn-secondary" onClick={() => setSearchTerm('')}>
            Clear Search
          </button>
        </div>
      )}

      {selectedRole && (
        <div className="role-details">
          <div className="details-header">
            <h3><FiUsers /> {selectedRole.name} Permissions</h3>
            <button className="btn-secondary" onClick={() => {
              setSelectedPermissions(selectedRole.permissions);
              setShowPermissions(true);
            }}>
              <FiEdit2 /> Edit Permissions
            </button>
          </div>
          <div className="permissions-list">
            {selectedRole.permissions.map((perm, idx) => (
              <span key={idx} className="permission-tag">
                <FiCheck /> {perm}
              </span>
            ))}
            {selectedRole.permissions.length === 0 && (
              <span className="no-permissions">No permissions assigned</span>
            )}
          </div>
        </div>
      )}

      {showAddRole && (
        <RoleModal 
          title="Add New Role"
          roleForm={roleForm}
          setRoleForm={setRoleForm}
          selectedPermissions={selectedPermissions}
          permissionTemplates={permissionTemplates}
          handleTemplateSelect={handleTemplateSelect}
          togglePermission={togglePermission}
          onSave={handleAddRole}
          onClose={() => {
            setShowAddRole(false);
            setRoleForm({ name: '', description: '', template: '' });
            setSelectedPermissions([]);
          }}
        />
      )}

      {showEditRole && (
        <RoleModal 
          title="Edit Role"
          roleForm={roleForm}
          setRoleForm={setRoleForm}
          selectedPermissions={selectedPermissions}
          permissionTemplates={permissionTemplates}
          handleTemplateSelect={handleTemplateSelect}
          togglePermission={togglePermission}
          onSave={handleEditRole}
          onClose={() => {
            setShowEditRole(false);
            setEditingRole(null);
            setRoleForm({ name: '', description: '', template: '' });
            setSelectedPermissions([]);
          }}
        />
      )}

      {showPermissions && selectedRole && (
        <PermissionsModal
          role={selectedRole}
          selectedPermissions={selectedPermissions}
          setSelectedPermissions={setSelectedPermissions}
          onClose={() => setShowPermissions(false)}
          onSave={() => {
            const updatedRole = {
              ...selectedRole,
              permissions: selectedPermissions
            };
            setRoles(prev => prev.map(role => 
              role.id === selectedRole.id ? updatedRole : role
            ));
            setSelectedRole(updatedRole);
            logChange('Roles & Permissions', 'Update', 'Permissions', selectedRole.permissions.join(', '), selectedPermissions.join(', '), 'success');
            showNotification(`Permissions updated for "${selectedRole.name}"`, 'success');
            setShowPermissions(false);
          }}
        />
      )}

      <div className="screen-footer">
        <div className="action-buttons">
          <button className="btn-secondary" onClick={() => {
            const templatesText = JSON.stringify(permissionTemplates, null, 2);
            copyToClipboard(templatesText).then(success => {
              if (success) {
                showNotification('Role templates copied to clipboard', 'success');
              } else {
                showNotification('Failed to copy templates', 'error');
              }
            });
          }}>
            <FiCopy /> Copy Templates
          </button>
          <button className="back-button" onClick={() => navigateTo('systemSettings')}>
            <FiArrowLeft /> Back to System Settings
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Settings Screen Component
const EnhancedSettingsScreen = ({
  module,
  title,
  icon,
  subtitle,
  settings,
  updateSettings,
  saveSettings,
  resetSettings,
  exportSettings,
  handleImport,
  unsavedChanges,
  navigateTo,
  expandedSections,
  toggleSection,
  loading,
  showNotification,
  copyToClipboard
}) => {
  
  const renderSection = (sectionKey, sectionTitle, sectionIcon, fields, type = 'input') => {
    const isExpanded = expandedSections[sectionKey] !== false;
    
    return (
      <div className="settings-section">
        <div 
          className="section-header clickable"
          onClick={() => toggleSection(sectionKey)}
        >
          <div className="section-title">
            {sectionIcon} {sectionTitle}
            <span className="section-badge">
              {Object.keys(fields).length} settings
            </span>
          </div>
          <div className="section-toggle">
            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </div>
        
        {isExpanded && (
          <div className="section-content">
            {type === 'input' && (
              <div className="input-grid">
                {Object.entries(fields).map(([field, value]) => (
                  <div key={field} className="input-group">
                    <label>
                      {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                    </label>
                    {typeof value === 'boolean' ? (
                      <label className="toggle-item">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => updateSettings(module, sectionKey, field, e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                        <span>{value ? 'Enabled' : 'Disabled'}</span>
                      </label>
                    ) : typeof value === 'number' ? (
                      <div className="input-with-icon">
                        <input
                          type="number"
                          value={value}
                          onChange={(e) => updateSettings(module, sectionKey, field, parseFloat(e.target.value) || 0)}
                        />
                        <span className="input-suffix">
                          {field.includes('Percentage') ? '%' : 
                           field.includes('Distance') ? 'km' :
                           field.includes('Time') ? 'min' :
                           field.includes('Days') ? 'days' : ''}
                        </span>
                      </div>
                    ) : Array.isArray(value) ? (
                      <div className="tags-input">
                        {value.map((item, idx) => (
                          <span key={idx} className="tag">
                            {item}
                            <button 
                              type="button"
                              className="tag-remove"
                              onClick={() => {
                                const newArray = [...value];
                                newArray.splice(idx, 1);
                                updateSettings(module, sectionKey, field, newArray);
                              }}
                            >
                              <FiX size={12} />
                            </button>
                          </span>
                        ))}
                        <input
                          type="text"
                          placeholder="Add item..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && e.target.value.trim()) {
                              updateSettings(module, sectionKey, field, [...value, e.target.value.trim()]);
                              e.target.value = '';
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateSettings(module, sectionKey, field, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {type === 'toggle' && (
              <div className="toggle-grid">
                {Object.entries(fields).map(([field, enabled]) => (
                  <label key={field} className="toggle-item">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(e) => updateSettings(module, sectionKey, field, e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-label">
                      {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                      {enabled && <span className="toggle-status active">Active</span>}
                    </span>
                  </label>
                ))}
              </div>
            )}
            
            <div className="section-actions">
              <button 
                className="btn-secondary"
                onClick={() => resetSettings(module, sectionKey)}
              >
                <FiRefreshCw /> Reset Section
              </button>
              <div className="section-info">
                <FiHelpCircle />
                <span>Changes apply to future actions only</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleCopySettings = async () => {
    const settingsText = JSON.stringify(settings, null, 2);
    const success = await copyToClipboard(settingsText);
    if (success) {
      showNotification('Settings copied to clipboard', 'success');
    } else {
      showNotification('Failed to copy settings', 'error');
    }
  };

  return (
    <div className="screen-container">
      <div className="screen-header">
        <h2>{icon} {title}</h2>
        <p className="screen-subtitle">{subtitle}</p>
        
        <div className="module-stats">
          <div className="stat-badge">
            <FiSettings />
            <span>Last updated: Today</span>
          </div>
          <div className="stat-badge">
            <FiUser />
            <span>Applied to all users</span>
          </div>
        </div>
      </div>
      
      <div className="action-bar">
        <div className="module-actions">
          <button 
            className={`btn-primary ${unsavedChanges ? 'pulse' : ''}`}
            onClick={() => saveSettings(module)}
            disabled={!unsavedChanges || loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Saving...
              </>
            ) : (
              <>
                <FiSave /> Save All Changes
              </>
            )}
          </button>
          
          <div className="import-export">
            <label className="btn-secondary">
              <FiUpload /> Import
              <input
                type="file"
                accept=".json"
                onChange={(e) => handleImport(e, module)}
                style={{ display: 'none' }}
              />
            </label>
            <button className="btn-secondary" onClick={() => exportSettings(module)}>
              <FiDownload /> Export
            </button>
            <button className="btn-secondary" onClick={handleCopySettings}>
              <FiCopy /> Copy
            </button>
          </div>
          
          <button className="btn-secondary" onClick={() => resetSettings(module)}>
            <FiRefreshCw /> Reset All
          </button>
        </div>
      </div>
      
      <div className="settings-sections">
        {Object.entries(settings).map(([sectionKey, sectionData]) => {
          const sectionConfig = {
            userLimits: { title: 'User Limits', icon: <FiUsers />, type: 'input' },
            profileRules: { title: 'Profile Rules', icon: <FiUser />, type: 'input' },
            featureToggles: { title: 'Feature Toggles', icon: <FiSliders />, type: 'toggle' },
            commissions: { title: 'Commission Settings', icon: <FiDollarSign />, type: 'input' },
            tax: { title: 'Tax / GST Settings', icon: <FiFileText />, type: 'input' },
            refund: { title: 'Refund Rules', icon: <FiRefreshCw />, type: 'input' },
            pregnancy: { title: 'Pregnancy Rules', icon: <FiHeart />, type: 'input' },
            prescription: { title: 'Prescription Rules', icon: <FiFileText />, type: 'input' },
            consultation: { title: 'Consultation Rules', icon: <FiClock />, type: 'input' },
            deliveryRadius: { title: 'Delivery Radius', icon: <FiMapPin />, type: 'input' },
            emergencyPriority: { title: 'Emergency Priority', icon: <FiAlertTriangle />, type: 'input' },
            riderAssignment: { title: 'Rider Assignment', icon: <FiTruck />, type: 'input' },
            user: { title: 'User Notifications', icon: <FiUser />, type: 'toggle' },
            doctor: { title: 'Doctor Notifications', icon: <FiBriefcase />, type: 'toggle' },
            vendor: { title: 'Vendor Notifications', icon: <FiPackage />, type: 'toggle' },
            rider: { title: 'Rider Notifications', icon: <FiTruck />, type: 'toggle' },
            login: { title: 'Login Policies', icon: <FiLock />, type: 'input' },
            otp: { title: 'OTP Rules', icon: <FiShield />, type: 'input' },
            session: { title: 'Session Management', icon: <FiLogOut />, type: 'input' },
          };
          
          const config = sectionConfig[sectionKey] || { title: sectionKey, icon: <FiSettings />, type: 'input' };
          
          return renderSection(
            sectionKey,
            config.title,
            config.icon,
            sectionData,
            config.type
          );
        })}
      </div>
      
      <div className="screen-footer">
        <div className="action-buttons">
          <div className="quick-save">
            <button 
              className="btn-primary"
              onClick={() => saveSettings(module)}
              disabled={!unsavedChanges || loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            {unsavedChanges && (
              <span className="save-hint">
                You have unsaved changes
              </span>
            )}
          </div>
          
          <div className="navigation-buttons">
            <button className="btn-secondary" onClick={() => navigateTo('auditLogs')}>
              <FiFileText /> View Changes
            </button>
            <button className="back-button" onClick={() => navigateTo('systemSettings')}>
              <FiArrowLeft /> Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Audit Logs Screen
const AuditLogsScreen = ({ 
  logs, 
  navigateTo, 
  newLog,
  searchTerm,
  setSearchTerm,
  activeTab,
  setActiveTab,
  showNotification,
  copyToClipboard
}) => {
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedAction, setSelectedAction] = useState('');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = !searchTerm || 
      log.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = (!dateRange.from || log.timestamp >= dateRange.from) &&
                       (!dateRange.to || log.timestamp <= dateRange.to);
    
    const matchesModule = !selectedModule || log.module === selectedModule;
    const matchesAction = !selectedAction || log.action === selectedAction;
    const matchesTab = activeTab === 'all' || log.status === activeTab;
    
    return matchesSearch && matchesDate && matchesModule && matchesAction && matchesTab;
  });

  const downloadLogs = (format = 'csv') => {
    if (format === 'csv') {
      const csvContent = [
        ['ID', 'Admin', 'Role', 'Module', 'Action', 'Old Value', 'New Value', 'Timestamp', 'IP', 'Status'],
        ...filteredLogs.map(log => [
          log.id,
          log.admin,
          log.role,
          log.module,
          log.action,
          log.oldValue,
          log.newValue,
          log.timestamp,
          log.ip,
          log.status
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const jsonContent = JSON.stringify(filteredLogs, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
    showNotification(`${format.toUpperCase()} file downloaded successfully!`, 'success');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateRange({ from: '', to: '' });
    setSelectedModule('');
    setSelectedAction('');
    setActiveTab('all');
  };

  const handleCopyLog = async (log) => {
    const logText = JSON.stringify(log, null, 2);
    const success = await copyToClipboard(logText);
    if (success) {
      showNotification('Log details copied to clipboard', 'success');
    } else {
      showNotification('Failed to copy log details', 'error');
    }
  };

  const modules = [...new Set(logs.map(log => log.module))];
  const actions = [...new Set(logs.map(log => log.action))];

  return (
    <div className="screen-container">
      <div className="screen-header">
        <h2><FiFileText /> Audit & Settings Logs</h2>
        <p className="screen-subtitle">Track all configuration changes with full traceability</p>
      </div>
      
      {newLog && (
        <div className="new-log-notification">
          <FiBell /> 
          <div className="notification-content">
            <strong>New setting update:</strong> {newLog.admin} {newLog.action} in {newLog.module}
            <span className="notification-time">Just now</span>
          </div>
          <button className="notification-close" onClick={() => setNewLog(null)}>
            <FiX />
          </button>
        </div>
      )}

      <div className="action-bar">
        <div className="filter-section">
          <div className="filter-tabs">
            <button 
              className={`tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Logs
            </button>
            <button 
              className={`tab ${activeTab === 'success' ? 'active' : ''}`}
              onClick={() => setActiveTab('success')}
            >
              <FiCheckCircle /> Success
            </button>
            <button 
              className={`tab ${activeTab === 'warning' ? 'active' : ''}`}
              onClick={() => setActiveTab('warning')}
            >
              <FiAlertTriangle /> Warning
            </button>
            <button 
              className={`tab ${activeTab === 'error' ? 'active' : ''}`}
              onClick={() => setActiveTab('error')}
            >
              <FiXCircle /> Error
            </button>
          </div>
          
          <div className="search-bar">
            <FiSearch />
            <input 
              type="text" 
              placeholder="Search logs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="export-buttons">
          <button className="btn-secondary" onClick={() => downloadLogs('csv')}>
            <FiDownload /> CSV
          </button>
          <button className="btn-secondary" onClick={() => downloadLogs('json')}>
            <FiDownload /> JSON
          </button>
          <button className="btn-primary" onClick={clearFilters}>
            <FiRefreshCw /> Clear Filters
          </button>
        </div>
      </div>

      <div className="advanced-filters">
        <div className="filter-group">
          <label>Date Range</label>
          <div className="date-range">
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
            />
            <span>to</span>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
            />
          </div>
        </div>
        
        <div className="filter-group">
          <label>Module</label>
          <select value={selectedModule} onChange={(e) => setSelectedModule(e.target.value)}>
            <option value="">All Modules</option>
            {modules.map(module => (
              <option key={module} value={module}>{module}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Action</label>
          <select value={selectedAction} onChange={(e) => setSelectedAction(e.target.value)}>
            <option value="">All Actions</option>
            {actions.map(action => (
              <option key={action} value={action}>{action}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="logs-table-container">
        <div className="table-header">
          <span className="table-count">
            {filteredLogs.length} audit logs found
            {filteredLogs.length !== logs.length && ` (filtered from ${logs.length})`}
          </span>
          <span className="table-refresh">
            <FiActivity /> Real-time updates enabled
          </span>
        </div>
        
        <div className="table-scroll">
          <table className="logs-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Admin</th>
                <th>Module</th>
                <th>Action</th>
                <th>Changes</th>
                <th>Status</th>
                <th>IP</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td>
                    <div className="timestamp-cell">
                      <FiClock />
                      {log.timestamp}
                    </div>
                  </td>
                  <td>
                    <div className="admin-cell">
                      <FiUser />
                      <div>
                        <strong>{log.admin}</strong>
                        <small>{log.role}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="module-tag">{log.module}</span>
                  </td>
                  <td>
                    <span className={`action-badge ${log.action.toLowerCase()}`}>
                      {log.action === 'Create' ? <FiPlus /> : 
                       log.action === 'Update' ? <FiEdit2 /> : 
                       <FiTrash2 />}
                      {log.action}
                    </span>
                  </td>
                  <td>
                    <div className="value-change">
                      <span className="old-value" title={log.oldValue}>
                        {log.oldValue.length > 20 ? log.oldValue.substring(0, 20) + '...' : log.oldValue}
                      </span>
                      <span className="arrow">→</span>
                      <span className="new-value" title={log.newValue}>
                        {log.newValue.length > 20 ? log.newValue.substring(0, 20) + '...' : log.newValue}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge status-${log.status}`}>
                      {log.status === 'success' && <FiCheckCircle />}
                      {log.status === 'warning' && <FiAlertTriangle />}
                      {log.status === 'error' && <FiXCircle />}
                      {log.status}
                    </span>
                  </td>
                  <td>
                    <div className="ip-cell">
                      <FiDatabase />
                      {log.ip}
                    </div>
                  </td>
                  <td>
                    <div className="log-actions">
                      <button 
                        className="icon-btn"
                        onClick={() => {
                          const details = `ID: ${log.id}\nAdmin: ${log.admin}\nRole: ${log.role}\nModule: ${log.module}\nAction: ${log.action}\nOld Value: ${log.oldValue}\nNew Value: ${log.newValue}\nTimestamp: ${log.timestamp}\nIP: ${log.ip}\nStatus: ${log.status}`;
                          alert(details);
                        }}
                        title="View details"
                      >
                        <FiEye />
                      </button>
                      <button 
                        className="icon-btn"
                        onClick={() => handleCopyLog(log)}
                        title="Copy to clipboard"
                      >
                        <FiCopy />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredLogs.length === 0 && (
          <div className="no-results">
            <FiFileText />
            <p>No audit logs found matching your filters</p>
            <button className="btn-secondary" onClick={clearFilters}>
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <div className="screen-footer">
        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-label">Total Logs:</span>
            <span className="stat-value">{logs.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Last 24h:</span>
            <span className="stat-value">
              {logs.filter(log => {
                const logDate = new Date(log.timestamp);
                const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
                return logDate > yesterday;
              }).length}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Success Rate:</span>
            <span className="stat-value success">
              {((logs.filter(log => log.status === 'success').length / logs.length) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
        
        <button className="back-button" onClick={() => navigateTo('systemSettings')}>
          <FiArrowLeft /> Back to System Settings
        </button>
      </div>
    </div>
  );
};

// Modal Components
const RoleModal = ({ 
  title, 
  roleForm, 
  setRoleForm, 
  selectedPermissions, 
  permissionTemplates,
  handleTemplateSelect,
  togglePermission,
  onSave, 
  onClose 
}) => (
  <div className="modal-overlay">
    <div className="modal">
      <div className="modal-header">
        <h3>{title}</h3>
        <button className="close-btn" onClick={onClose}>
          <FiX />
        </button>
      </div>
      
      <div className="modal-body">
        <div className="form-group">
          <label><FiBriefcase /> Role Name *</label>
          <input
            type="text"
            placeholder="e.g., Finance Admin"
            value={roleForm.name}
            onChange={(e) => setRoleForm({...roleForm, name: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label><FiFileText /> Description *</label>
          <textarea
            placeholder="Describe the role's responsibilities..."
            value={roleForm.description}
            onChange={(e) => setRoleForm({...roleForm, description: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label><FiSliders /> Permission Template</label>
          <select
            value={roleForm.template}
            onChange={(e) => handleTemplateSelect(e.target.value)}
          >
            <option value="">Select a template (optional)</option>
            {Object.keys(permissionTemplates).map(template => (
              <option key={template} value={template}>{template}</option>
            ))}
          </select>
          {roleForm.template && (
            <div className="template-info">
              <FiCheckCircle /> {permissionTemplates[roleForm.template].length} permissions included
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label><FiShield /> Custom Permissions</label>
          <div className="permissions-selector">
            {['View', 'Create', 'Edit', 'Delete', 'Approve', 'Export', 'Manage', 'Configure'].map(perm => (
              <label key={perm} className="permission-option">
                <input
                  type="checkbox"
                  checked={selectedPermissions.includes(perm)}
                  onChange={() => togglePermission(perm)}
                />
                <span className="checkmark"></span>
                {perm}
              </label>
            ))}
          </div>
        </div>
      </div>
      
      <div className="modal-actions">
        <button className="btn-primary" onClick={onSave}>
          <FiSave /> Save Role
        </button>
        <button className="btn-secondary" onClick={onClose}>
          <FiX /> Cancel
        </button>
      </div>
    </div>
  </div>
);

const PermissionsModal = ({ 
  role, 
  selectedPermissions, 
  setSelectedPermissions, 
  onClose, 
  onSave 
}) => {
  const allPermissions = [
    'Users: View', 'Users: Create', 'Users: Edit', 'Users: Delete',
    'Doctors: View', 'Doctors: Approve', 'Doctors: Suspend',
    'Finance: View', 'Finance: Process', 'Finance: Refund',
    'Medical: View', 'Medical: Configure', 'Medical: Approve',
    'Settings: View', 'Settings: Edit', 'Settings: Export',
    'Audit: View', 'Audit: Export'
  ];

  return (
    <div className="modal-overlay">
      <div className="modal large">
        <div className="modal-header">
          <h3><FiShield /> Edit Permissions for {role.name}</h3>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="permissions-grid">
            {allPermissions.map(permission => (
              <label key={permission} className="permission-item">
                <input
                  type="checkbox"
                  checked={selectedPermissions.includes(permission)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPermissions([...selectedPermissions, permission]);
                    } else {
                      setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
                    }
                  }}
                />
                <span className="custom-checkmark"></span>
                <span className="permission-text">{permission}</span>
              </label>
            ))}
          </div>
          
          <div className="selected-count">
            <FiCheckCircle /> {selectedPermissions.length} permissions selected
          </div>
        </div>
        
        <div className="modal-actions">
          <button className="btn-primary" onClick={onSave}>
            <FiSave /> Update Permissions
          </button>
          <button className="btn-secondary" onClick={onClose}>
            <FiX /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmationDialog = ({ type, message, onConfirm, onCancel, module, section }) => (
  <div className="modal-overlay">
    <div className="modal confirmation-dialog">
      <div className="modal-header">
        <h3>
          {type === 'delete' && <FiAlertTriangle />}
          {type === 'reset' && <FiRefreshCw />}
          {type === 'import' && <FiUpload />}
          {type === 'bulkDelete' && <FiTrash2 />}
          {type === 'navigate' && <FiAlertTriangle />}
          Confirmation Required
        </h3>
      </div>
      
      <div className="modal-body">
        <div className="confirmation-icon">
          {type === 'delete' && <FiAlertTriangle size={48} />}
          {type === 'reset' && <FiRefreshCw size={48} />}
          {type === 'import' && <FiUpload size={48} />}
          {type === 'bulkDelete' && <FiTrash2 size={48} />}
          {type === 'navigate' && <FiAlertTriangle size={48} />}
        </div>
        
        <p>{message}</p>
        
        {module && (
          <div className="affected-modules">
            <strong>Affected Module:</strong> {module}
            {section && <span> → {section}</span>}
          </div>
        )}
      </div>
      
      <div className="modal-actions confirmation-actions">
        <button className="btn-danger" onClick={onConfirm}>
          {type === 'delete' && <FiTrash2 />}
          {type === 'reset' && <FiRefreshCw />}
          {type === 'import' && <FiUpload />}
          {type === 'bulkDelete' && <FiTrash2 />}
          {type === 'navigate' && <FiAlertTriangle />}
          Confirm
        </button>
        <button className="btn-secondary" onClick={onCancel}>
          <FiX /> Cancel
        </button>
      </div>
    </div>
  </div>
);

export default Settings;