import React, { useState, useEffect } from 'react';
import { 
  HiPlus, 
  HiPencil, 
  HiTrash, 
  HiEye,
  HiCheckCircle,
  HiXCircle,
  HiLockOpen,
  HiLockClosed,
  HiUserGroup,
  HiShieldCheck,
  HiDocumentText,
  HiEyeOff,
  HiEye as HiEyeShow
} from 'react-icons/hi';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import './RoleManagement.css';

const RoleManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active',
    assignedPermissions: {},
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [showStatusConfirm, setShowStatusConfirm] = useState(false);
  const [roleToToggle, setRoleToToggle] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  // Permission modules according to FRD 3.1 and BRD 8.1
  const permissionModules = [
    { id: 'dashboard', name: 'Dashboard', description: 'Platform overview and analytics' },
    { id: 'userManagement', name: 'User Management', description: 'Manage patient accounts and activities' },
    { id: 'doctorManagement', name: 'Doctor Management', description: 'Doctor onboarding and verification' },
    { id: 'pharmacyManagement', name: 'Pharmacy Management', description: 'Vendor onboarding and oversight' },
    { id: 'deliveryManagement', name: 'Delivery Management', description: 'Rider onboarding and tracking' },
    { id: 'orderManagement', name: 'Order Management', description: 'Order monitoring and intervention' },
    { id: 'consultationOversight', name: 'Consultation Oversight', description: 'Clinical governance and monitoring' },
    { id: 'financeManagement', name: 'Finance Management', description: 'Payments, refunds, and transactions' },
    { id: 'settlementManagement', name: 'Settlement Management', description: 'Payouts and tax compliance' },
    { id: 'contentManagement', name: 'Content Management', description: 'Articles, guides, and announcements' },
    { id: 'offerManagement', name: 'Offer Management', description: 'Promotions and coupon campaigns' },
    { id: 'complianceManagement', name: 'Compliance Management', description: 'Regulatory monitoring and enforcement' },
    { id: 'auditLogs', name: 'Audit Logs', description: 'System audit trails and logs' },
    { id: 'roleManagement', name: 'Role Management', description: 'Admin roles and permissions' },
    { id: 'systemSettings', name: 'System Settings', description: 'Platform configuration and settings' }
  ];

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    if (!password) return '';
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (strength < 2) return 'weak';
    if (strength < 4) return 'medium';
    return 'strong';
  };

  // Initialize roles with proper permissions
  const initializeRoles = () => {
    const savedRoles = localStorage.getItem('quickmed_roles');
    
    if (savedRoles) {
      return JSON.parse(savedRoles);
    }
    
    // Default roles with proper edit/suspend permissions
    const defaultRoles = [
      {
        id: 1,
        name: 'Super Admin',
        description: 'Full system access with all permissions across all modules',
        users: 1,
        permissions: 48,
        status: 'active',
        created: '2024-01-01',
        canDelete: false,
        canEdit: false,
        canDeactivate: false,
        permissionsMap: {
          dashboard: { view: true, create: true, edit: true, delete: true },
          userManagement: { view: true, create: true, edit: true, delete: true },
          doctorManagement: { view: true, create: true, edit: true, delete: true },
          pharmacyManagement: { view: true, create: true, edit: true, delete: true },
          deliveryManagement: { view: true, create: true, edit: true, delete: true },
          orderManagement: { view: true, create: true, edit: true, delete: true },
          consultationOversight: { view: true, create: true, edit: true, delete: true },
          financeManagement: { view: true, create: true, edit: true, delete: true },
          settlementManagement: { view: true, create: true, edit: true, delete: true },
          contentManagement: { view: true, create: true, edit: true, delete: true },
          offerManagement: { view: true, create: true, edit: true, delete: true },
          complianceManagement: { view: true, create: true, edit: true, delete: true },
          auditLogs: { view: true, create: true, edit: true, delete: true },
          roleManagement: { view: true, create: true, edit: true, delete: true },
          systemSettings: { view: true, create: true, edit: true, delete: true }
        }
      },
      {
        id: 2,
        name: 'Medical Compliance Admin',
        description: 'Manage doctor approvals, medical compliance, and clinical oversight',
        users: 3,
        permissions: 28,
        status: 'active',
        created: '2024-01-05',
        canDelete: true,
        canEdit: true,
        canDeactivate: true,
        permissionsMap: {
          dashboard: { view: true, create: false, edit: false, delete: false },
          userManagement: { view: true, create: false, edit: true, delete: false },
          doctorManagement: { view: true, create: true, edit: true, delete: false },
          pharmacyManagement: { view: true, create: false, edit: false, delete: false },
          deliveryManagement: { view: false, create: false, edit: false, delete: false },
          orderManagement: { view: true, create: false, edit: false, delete: false },
          consultationOversight: { view: true, create: false, edit: true, delete: false },
          financeManagement: { view: false, create: false, edit: false, delete: false },
          settlementManagement: { view: false, create: false, edit: false, delete: false },
          contentManagement: { view: true, create: true, edit: true, delete: false },
          offerManagement: { view: false, create: false, edit: false, delete: false },
          complianceManagement: { view: true, create: true, edit: true, delete: false },
          auditLogs: { view: true, create: false, edit: false, delete: false },
          roleManagement: { view: false, create: false, edit: false, delete: false },
          systemSettings: { view: false, create: false, edit: false, delete: false }
        }
      },
      {
        id: 3,
        name: 'Vendor Manager',
        description: 'Manage pharmacy onboarding, operations, and vendor compliance',
        users: 2,
        permissions: 22,
        status: 'active',
        created: '2024-01-08',
        canDelete: true,
        canEdit: true,
        canDeactivate: true,
        permissionsMap: {
          dashboard: { view: true, create: false, edit: false, delete: false },
          userManagement: { view: true, create: false, edit: false, delete: false },
          doctorManagement: { view: false, create: false, edit: false, delete: false },
          pharmacyManagement: { view: true, create: true, edit: true, delete: false },
          deliveryManagement: { view: true, create: false, edit: false, delete: false },
          orderManagement: { view: true, create: false, edit: true, delete: false },
          consultationOversight: { view: false, create: false, edit: false, delete: false },
          financeManagement: { view: false, create: false, edit: false, delete: false },
          settlementManagement: { view: true, create: false, edit: false, delete: false },
          contentManagement: { view: false, create: false, edit: false, delete: false },
          offerManagement: { view: false, create: false, edit: false, delete: false },
          complianceManagement: { view: true, create: false, edit: true, delete: false },
          auditLogs: { view: true, create: false, edit: false, delete: false },
          roleManagement: { view: false, create: false, edit: false, delete: false },
          systemSettings: { view: false, create: false, edit: false, delete: false }
        }
      },
      {
        id: 4,
        name: 'Finance Admin',
        description: 'Handle payments, settlements, refunds, and financial operations',
        users: 2,
        permissions: 25,
        status: 'active',
        created: '2024-01-10',
        canDelete: true,
        canEdit: true,
        canDeactivate: true,
        permissionsMap: {
          dashboard: { view: true, create: false, edit: false, delete: false },
          userManagement: { view: true, create: false, edit: false, delete: false },
          doctorManagement: { view: true, create: false, edit: false, delete: false },
          pharmacyManagement: { view: true, create: false, edit: false, delete: false },
          deliveryManagement: { view: true, create: false, edit: false, delete: false },
          orderManagement: { view: true, create: false, edit: false, delete: false },
          consultationOversight: { view: false, create: false, edit: false, delete: false },
          financeManagement: { view: true, create: true, edit: true, delete: true },
          settlementManagement: { view: true, create: true, edit: true, delete: false },
          contentManagement: { view: false, create: false, edit: false, delete: false },
          offerManagement: { view: true, create: true, edit: true, delete: false },
          complianceManagement: { view: false, create: false, edit: false, delete: false },
          auditLogs: { view: true, create: false, edit: false, delete: false },
          roleManagement: { view: false, create: false, edit: false, delete: false },
          systemSettings: { view: false, create: false, edit: false, delete: false }
        }
      },
      {
        id: 5,
        name: 'Content Manager',
        description: 'Manage platform content, offers, and promotional campaigns',
        users: 1,
        permissions: 15,
        status: 'inactive',
        created: '2024-01-12',
        canDelete: true,
        canEdit: true,
        canDeactivate: true,
        permissionsMap: {
          dashboard: { view: true, create: false, edit: false, delete: false },
          userManagement: { view: false, create: false, edit: false, delete: false },
          doctorManagement: { view: false, create: false, edit: false, delete: false },
          pharmacyManagement: { view: false, create: false, edit: false, delete: false },
          deliveryManagement: { view: false, create: false, edit: false, delete: false },
          orderManagement: { view: false, create: false, edit: false, delete: false },
          consultationOversight: { view: false, create: false, edit: false, delete: false },
          financeManagement: { view: false, create: false, edit: false, delete: false },
          settlementManagement: { view: false, create: false, edit: false, delete: false },
          contentManagement: { view: true, create: true, edit: true, delete: true },
          offerManagement: { view: true, create: true, edit: true, delete: true },
          complianceManagement: { view: false, create: false, edit: false, delete: false },
          auditLogs: { view: true, create: false, edit: false, delete: false },
          roleManagement: { view: false, create: false, edit: false, delete: false },
          systemSettings: { view: false, create: false, edit: false, delete: false }
        }
      }
    ];
    
    localStorage.setItem('quickmed_roles', JSON.stringify(defaultRoles));
    return defaultRoles;
  };

  useEffect(() => {
    const rolesData = initializeRoles();
    setRoles(rolesData);
  }, []);

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(formData.password));
  }, [formData.password]);

  const columns = [
    { key: 'name', label: 'Role Name' },
    { key: 'description', label: 'Description' },
    { key: 'users', label: 'Assigned Users' },
    { key: 'permissions', label: 'Permissions Count' },
    { 
      key: 'status', 
      label: 'Status',
      render: (status) => (
        <span className={`status-badge status-${status}`}>
          {status === 'active' ? <HiCheckCircle /> : <HiXCircle />}
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    },
    { key: 'created', label: 'Created On' },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, role) => (
        <div className="action-buttons">
          <button 
            className="btn-icon btn-view"
            onClick={() => viewRole(role)}
            title="View Details"
          >
            <HiEye />
          </button>
          <button 
            className="btn-icon btn-edit"
            onClick={() => handleEditRole(role)}
            title="Edit Role"
            disabled={role.name === 'Super Admin'}
          >
            <HiPencil />
          </button>
          <button 
            className="btn-icon btn-delete"
            onClick={() => confirmDeleteRole(role)}
            title="Delete Role"
            disabled={role.name === 'Super Admin'}
          >
            <HiTrash />
          </button>
          <button 
            className="btn-icon btn-status"
            onClick={() => confirmToggleRoleStatus(role)}
            title={role.status === 'active' ? 'Suspend' : 'Activate'}
            disabled={role.name === 'Super Admin'}
          >
            {role.status === 'active' ? <HiLockClosed /> : <HiLockOpen />}
          </button>
        </div>
      )
    }
  ];

  const viewRole = (role) => {
    setSelectedRole(role);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditRole = (role) => {
    if (role.name === 'Super Admin') {
      alert('Super Admin role cannot be edited.');
      return;
    }
    
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      status: role.status,
      assignedPermissions: role.permissionsMap || {},
      email: '',
      password: '',
      confirmPassword: ''
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const confirmDeleteRole = (role) => {
    if (role.name === 'Super Admin') {
      alert('Super Admin role cannot be deleted.');
      return;
    }
    
    // Check if there are admin users assigned to this role
    const adminUsers = JSON.parse(localStorage.getItem('quickmed_admins') || '[]');
    const assignedAdmins = adminUsers.filter(admin => admin.roleId === role.id);
    
    if (assignedAdmins.length > 0) {
      alert(`Cannot delete role. There are ${assignedAdmins.length} admin users assigned to this role. Please reassign or delete those users first.`);
      return;
    }
    
    setRoleToDelete(role);
    setShowDeleteConfirm(true);
  };

  const deleteRole = () => {
    if (roleToDelete) {
      const updatedRoles = roles.filter(r => r.id !== roleToDelete.id);
      setRoles(updatedRoles);
      localStorage.setItem('quickmed_roles', JSON.stringify(updatedRoles));
      
      setSuccessMessage(`Role "${roleToDelete.name}" has been deleted successfully.`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setShowDeleteConfirm(false);
      setRoleToDelete(null);
    }
  };

  const confirmToggleRoleStatus = (role) => {
    if (role.name === 'Super Admin') {
      alert('Super Admin role cannot be suspended.');
      return;
    }
    setRoleToToggle(role);
    setShowStatusConfirm(true);
  };

  const toggleRoleStatus = () => {
    if (roleToToggle) {
      const updatedRoles = roles.map(role => {
        if (role.id === roleToToggle.id) {
          const newStatus = role.status === 'active' ? 'inactive' : 'active';
          return {
            ...role,
            status: newStatus
          };
        }
        return role;
      });
      
      setRoles(updatedRoles);
      localStorage.setItem('quickmed_roles', JSON.stringify(updatedRoles));
      
      // Update admin users status if any
      const adminUsers = JSON.parse(localStorage.getItem('quickmed_admins') || '[]');
      const updatedAdminUsers = adminUsers.map(admin => {
        if (admin.roleId === roleToToggle.id) {
          return {
            ...admin,
            status: roleToToggle.status === 'active' ? 'inactive' : 'active'
          };
        }
        return admin;
      });
      localStorage.setItem('quickmed_admins', JSON.stringify(updatedAdminUsers));
      
      const action = roleToToggle.status === 'active' ? 'suspended' : 'activated';
      setSuccessMessage(`Role "${roleToToggle.name}" has been ${action} successfully. All associated admin users have also been ${action}.`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setShowStatusConfirm(false);
      setRoleToToggle(null);
    }
  };

  const createNewRole = () => {
    setSelectedRole(null);
    setFormData({
      name: '',
      description: '',
      status: 'active',
      assignedPermissions: {},
      email: '',
      password: '',
      confirmPassword: ''
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (moduleId, permissionType, value) => {
    setFormData(prev => ({
      ...prev,
      assignedPermissions: {
        ...prev.assignedPermissions,
        [moduleId]: {
          ...prev.assignedPermissions[moduleId],
          [permissionType]: value
        }
      }
    }));
  };

  const handleSelectAll = (moduleId, value) => {
    setFormData(prev => ({
      ...prev,
      assignedPermissions: {
        ...prev.assignedPermissions,
        [moduleId]: {
          view: value,
          create: value,
          edit: value,
          delete: value
        }
      }
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation for new roles
    if (!selectedRole) {
      // Validate email
      if (!validateEmail(formData.email)) {
        alert('Please enter a valid email address!');
        return;
      }
      
      // Check if email already exists
      const existingAdmins = JSON.parse(localStorage.getItem('quickmed_admins') || '[]');
      if (existingAdmins.some(admin => admin.email === formData.email)) {
        alert('This email is already registered!');
        return;
      }
      
      // Validate passwords
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      
      if (formData.password.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
      }
      
      if (!/[A-Z]/.test(formData.password)) {
        alert('Password must contain at least one uppercase letter!');
        return;
      }
      
      if (!/[0-9]/.test(formData.password)) {
        alert('Password must contain at least one number!');
        return;
      }
    }
    
    // Validate permissions (at least one module should have view permission)
    const hasViewPermission = Object.values(formData.assignedPermissions).some(
      perms => perms && perms.view === true
    );
    
    if (!hasViewPermission) {
      alert('Please assign at least view permission to one module!');
      return;
    }
    
    const permissionCount = Object.values(formData.assignedPermissions).reduce(
      (count, perms) => count + Object.values(perms).filter(Boolean).length,
      0
    );
    
    // Calculate assigned users count
    const existingUsers = selectedRole ? selectedRole.users : 0;
    
    const newRole = {
      id: selectedRole ? selectedRole.id : Date.now(),
      name: formData.name,
      description: formData.description,
      users: existingUsers,
      permissions: permissionCount,
      status: formData.status,
      created: selectedRole ? selectedRole.created : new Date().toISOString().split('T')[0],
      canDelete: formData.name !== 'Super Admin',
      canEdit: formData.name !== 'Super Admin',
      canDeactivate: formData.name !== 'Super Admin',
      permissionsMap: formData.assignedPermissions
    };
    
    let updatedRoles;
    if (selectedRole) {
      // Update existing role
      updatedRoles = roles.map(role => 
        role.id === selectedRole.id ? newRole : role
      );
      setSuccessMessage(`Role "${formData.name}" has been updated successfully.`);
    } else {
      // Create new role and admin user
      updatedRoles = [...roles, newRole];
      
      // Create admin user with credentials
      const newAdmin = {
        id: Date.now() + 1,
        roleId: newRole.id,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        roleName: formData.name,
        permissionsMap: formData.assignedPermissions,
        status: formData.status,
        createdAt: new Date().toISOString(),
        lastLogin: null
      };
      
      // Save admin to localStorage
      const existingAdmins = JSON.parse(localStorage.getItem('quickmed_admins') || '[]');
      existingAdmins.push(newAdmin);
      localStorage.setItem('quickmed_admins', JSON.stringify(existingAdmins));
      
      // Update role with user count
      newRole.users = 1;
      updatedRoles[updatedRoles.length - 1] = newRole;
      
      setSuccessMessage(`Role "${formData.name}" and admin user have been created successfully. The admin can now login with email: ${formData.email}`);
    }
    
    setRoles(updatedRoles);
    localStorage.setItem('quickmed_roles', JSON.stringify(updatedRoles));
    
    setTimeout(() => setSuccessMessage(''), 3000);
    setShowModal(false);
    setSelectedRole(null);
    setIsEditing(false);
    // Reset form data
    setFormData({
      name: '',
      description: '',
      status: 'active',
      assignedPermissions: {},
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const calculatePermissions = () => {
    return roles.reduce((total, role) => total + role.permissions, 0);
  };

  const calculateActiveUsers = () => {
    const adminUsers = JSON.parse(localStorage.getItem('quickmed_admins') || '[]');
    const activeAdmins = adminUsers.filter(admin => admin.status === 'active');
    return roles.reduce((total, role) => total + role.users, 0) + activeAdmins.length;
  };

  // Initialize form data when editing
  useEffect(() => {
    if (selectedRole && isEditing) {
      setFormData({
        name: selectedRole.name,
        description: selectedRole.description,
        status: selectedRole.status,
        assignedPermissions: selectedRole.permissionsMap || {},
        email: '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [selectedRole, isEditing]);

  return (
    <div className="role-management">
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1>Role Management</h1>
            <p>Manage admin roles and permissions for the QuickMed Admin Portal</p>
            <p className="text-sm text-gray-600">
              Based on FRD 3.1 - Roles, Access Control & User Management
            </p>
          </div>
          <button className="btn btn-primary" onClick={createNewRole}>
            <HiPlus /> Create New Role
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="success-message">
          <HiCheckCircle /> {successMessage}
        </div>
      )}

      <div className="permission-overview card">
        <h3><HiShieldCheck /> Permission Matrix Overview</h3>
        <div className="matrix-summary">
          <div className="summary-item">
            <span className="summary-value">{roles.length}</span>
            <span className="summary-label">Total Roles</span>
          </div>
          <div className="summary-item">
            <span className="summary-value">{permissionModules.length}</span>
            <span className="summary-label">Permission Modules</span>
          </div>
          <div className="summary-item">
            <span className="summary-value">{calculatePermissions()}</span>
            <span className="summary-label">Total Permissions</span>
          </div>
          <div className="summary-item">
            <span className="summary-value">{calculateActiveUsers()}</span>
            <span className="summary-label">Assigned Admin Users</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-header">
          <h3><HiUserGroup /> Admin Roles List</h3>
          <p className="text-sm text-gray-600">
            Manage role-based access control 
          </p>
        </div>
        <Table
          columns={columns}
          data={roles}
          emptyMessage="No roles found. Create your first role to get started."
        />
      </div>

      <div className="permission-modules card">
        <h3><HiDocumentText /> Available Permission Modules</h3>
        <p className="text-sm text-gray-600 mb-4">
          These modules correspond to the Admin Portal workflow sections
        </p>
        <div className="modules-grid">
          {permissionModules.map(module => (
            <div key={module.id} className="module-card">
              <h4>{module.name}</h4>
              <p className="module-description">{module.description}</p>
              <div className="permission-checks">
                <div className="check-item">
                  <input type="checkbox" id={`view-${module.id}`} defaultChecked={true} disabled />
                  <label htmlFor={`view-${module.id}`}>View</label>
                </div>
                <div className="check-item">
                  <input type="checkbox" id={`create-${module.id}`} defaultChecked={true} disabled />
                  <label htmlFor={`create-${module.id}`}>Create</label>
                </div>
                <div className="check-item">
                  <input type="checkbox" id={`edit-${module.id}`} defaultChecked={true} disabled />
                  <label htmlFor={`edit-${module.id}`}>Edit</label>
                </div>
                <div className="check-item">
                  <input type="checkbox" id={`delete-${module.id}`} defaultChecked={true} disabled />
                  <label htmlFor={`delete-${module.id}`}>Delete</label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Role Modal */}
      {showModal && (
        <Modal
          title={isEditing ? (selectedRole ? `Edit Role: ${selectedRole.name}` : 'Create New Role') : `Role Details: ${selectedRole.name}`}
          onClose={() => {
            setShowModal(false);
            setSelectedRole(null);
            setIsEditing(false);
          }}
          size="large"
        >
          <div className="role-modal-content">
            {isEditing ? (
              <form className="role-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Role Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    className="form-input" 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter role name (e.g., Operations Admin)"
                    required
                    disabled={selectedRole && selectedRole.name === 'Super Admin'}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea 
                    name="description"
                    className="form-input" 
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter role description and responsibilities"
                    required
                  />
                </div>

                {/* Add these fields for NEW roles only */}
                {!selectedRole && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Admin Email *</label>
                      <input 
                        type="email" 
                        name="email"
                        className="form-input" 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter admin email address"
                        required={!selectedRole}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        This email will be used for login
                      </p>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Password *</label>
                      <div className="password-input-group">
                        <input 
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className="form-input" 
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter password"
                          required={!selectedRole}
                          minLength="6"
                        />
                        <button 
                          type="button" 
                          className="toggle-password"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <HiEyeOff /> : <HiEyeShow />}
                        </button>
                      </div>
                      <div className={`password-strength ${passwordStrength}`}>
                        {formData.password && (
                          <>
                            Password Strength: <strong>{passwordStrength.toUpperCase()}</strong>
                          </>
                        )}
                      </div>
                      <div className="password-requirements">
                        <p className="text-xs font-medium mb-1">Password Requirements:</p>
                        <ul>
                          <li>At least 6 characters</li>
                          <li>At least one uppercase letter</li>
                          <li>At least one number</li>
                        </ul>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Confirm Password *</label>
                      <div className="password-input-group">
                        <input 
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          className="form-input" 
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm password"
                          required={!selectedRole}
                        />
                        <button 
                          type="button" 
                          className="toggle-password"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <HiEyeOff /> : <HiEyeShow />}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select 
                    className="form-input" 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    disabled={selectedRole && selectedRole.name === 'Super Admin'}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Permissions Assignment *</label>
                  <p className="text-sm text-gray-600 mb-3">
                    Assign permissions according to FRD 3.1 requirements
                  </p>
                  <div className="permissions-selection">
                    {permissionModules.map(module => {
                      const modulePerms = formData.assignedPermissions[module.id] || {
                        view: false,
                        create: false,
                        edit: false,
                        delete: false
                      };
                      const allChecked = modulePerms.view && modulePerms.create && 
                                        modulePerms.edit && modulePerms.delete;
                      
                      return (
                        <div key={module.id} className="module-permissions">
                          <div className="module-header">
                            <div>
                              <h5>{module.name}</h5>
                              <p className="text-xs text-gray-500">{module.description}</p>
                            </div>
                            <div className="select-all-container">
                              <input 
                                type="checkbox" 
                                id={`select-all-${module.id}`}
                                className="select-all"
                                checked={allChecked}
                                onChange={(e) => handleSelectAll(module.id, e.target.checked)}
                                disabled={selectedRole && selectedRole.name === 'Super Admin'}
                              />
                              <label htmlFor={`select-all-${module.id}`}>Select All</label>
                            </div>
                          </div>
                          <div className="permission-options">
                            <label>
                              <input 
                                type="checkbox" 
                                checked={modulePerms.view}
                                onChange={(e) => handlePermissionChange(module.id, 'view', e.target.checked)}
                                disabled={selectedRole && selectedRole.name === 'Super Admin'}
                              />
                              View
                            </label>
                            <label>
                              <input 
                                type="checkbox" 
                                checked={modulePerms.create}
                                onChange={(e) => handlePermissionChange(module.id, 'create', e.target.checked)}
                                disabled={selectedRole && selectedRole.name === 'Super Admin'}
                              />
                              Create
                            </label>
                            <label>
                              <input 
                                type="checkbox" 
                                checked={modulePerms.edit}
                                onChange={(e) => handlePermissionChange(module.id, 'edit', e.target.checked)}
                                disabled={selectedRole && selectedRole.name === 'Super Admin'}
                              />
                              Edit
                            </label>
                            <label>
                              <input 
                                type="checkbox" 
                                checked={modulePerms.delete}
                                onChange={(e) => handlePermissionChange(module.id, 'delete', e.target.checked)}
                                disabled={selectedRole && selectedRole.name === 'Super Admin'}
                              />
                              Delete
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-outline" 
                    onClick={() => {
                      setShowModal(false);
                      setSelectedRole(null);
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={selectedRole && selectedRole.name === 'Super Admin'}
                  >
                    {selectedRole ? 'Update Role' : 'Create Role & Admin User'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="role-details">
                <div className="role-info">
                  <div className="info-item">
                    <label>Role Name:</label>
                    <span>{selectedRole.name}</span>
                  </div>
                  <div className="info-item">
                    <label>Description:</label>
                    <span>{selectedRole.description}</span>
                  </div>
                  <div className="info-item">
                    <label>Assigned Users:</label>
                    <span>{selectedRole.users} users</span>
                  </div>
                  <div className="info-item">
                    <label>Permissions Count:</label>
                    <span>{selectedRole.permissions} permissions</span>
                  </div>
                  <div className="info-item">
                    <label>Status:</label>
                    <span className={`status-badge status-${selectedRole.status}`}>
                      {selectedRole.status}
                    </span>
                  </div>
                  <div className="info-item">
                    <label>Created On:</label>
                    <span>{selectedRole.created}</span>
                  </div>
                </div>

                <div className="role-permissions">
                  <h4>Assigned Permissions</h4>
                  <div className="permissions-list">
                    {permissionModules.map(module => {
                      const modulePerms = selectedRole.permissionsMap[module.id];
                      if (!modulePerms) return null;
                      
                      return (
                        <div key={module.id} className="permission-item">
                          <div>
                            <span className="module-name">{module.name}</span>
                            <p className="text-xs text-gray-500">{module.description}</p>
                          </div>
                          <div className="permission-badges">
                            {modulePerms.view && <span className="badge view">View</span>}
                            {modulePerms.create && <span className="badge create">Create</span>}
                            {modulePerms.edit && <span className="badge edit">Edit</span>}
                            {modulePerms.delete && <span className="badge delete">Delete</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="role-actions">
                  <button 
                    className="btn btn-outline" 
                    onClick={() => handleEditRole(selectedRole)}
                    disabled={selectedRole.name === 'Super Admin'}
                  >
                    <HiPencil /> Edit Role
                  </button>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => {
                      setShowModal(false);
                      setSelectedRole(null);
                      setIsEditing(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <Modal
          title="Confirm Delete Role"
          onClose={() => setShowDeleteConfirm(false)}
          size="small"
        >
          <div className="confirmation-modal">
            <HiTrash className="confirmation-icon" />
            <h3>Delete Role</h3>
            <p>Are you sure you want to delete the "{roleToDelete?.name}" role?</p>
            <p className="text-sm text-gray-600">
              This action cannot be undone. All users assigned to this role will need to be reassigned.
            </p>
            <div className="confirmation-actions">
              <button 
                className="btn btn-outline" 
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-error" 
                onClick={deleteRole}
              >
                Delete Role
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Status Toggle Confirmation Modal */}
      {showStatusConfirm && (
        <Modal
          title={roleToToggle?.status === 'active' ? 'Confirm Suspend Role' : 'Confirm Activate Role'}
          onClose={() => setShowStatusConfirm(false)}
          size="small"
        >
          <div className="confirmation-modal">
            {roleToToggle?.status === 'active' ? (
              <HiLockClosed className="confirmation-icon" />
            ) : (
              <HiLockOpen className="confirmation-icon" />
            )}
            <h3>{roleToToggle?.status === 'active' ? 'Suspend' : 'Activate'} Role</h3>
            <p>
              {roleToToggle?.status === 'active' 
                ? `Suspend the "${roleToToggle?.name}" role?` 
                : `Activate the "${roleToToggle?.name}" role?`
              }
            </p>
            <p className="text-sm text-gray-600">
              {roleToToggle?.status === 'active' 
                ? 'Users with this role will lose access until reactivated.'
                : 'Users will regain access with this role.'
              }
            </p>
            <div className="confirmation-actions">
              <button 
                className="btn btn-outline" 
                onClick={() => setShowStatusConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={toggleRoleStatus}
              >
                {roleToToggle?.status === 'active' ? 'Suspend' : 'Activate'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RoleManagement;