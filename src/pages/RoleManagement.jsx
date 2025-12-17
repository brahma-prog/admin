import React, { useState } from 'react';
import { 
  HiPlus, 
  HiPencil, 
  HiTrash, 
  HiEye,
  HiCheckCircle,
  HiXCircle,
  HiLockOpen,
  HiLockClosed
} from 'react-icons/hi';
import Table from '../components/common/Table'; // Fixed path
import Modal from '../components/common/Modal'; // Fixed path
import './RoleManagement.css';

const RoleManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const roles = [
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      users: 1,
      permissions: 45,
      status: 'active',
      created: '2024-01-01'
    },
    {
      id: 2,
      name: 'Medical Compliance Admin',
      description: 'Manage doctor approvals and medical compliance',
      users: 3,
      permissions: 28,
      status: 'active',
      created: '2024-01-05'
    },
    {
      id: 3,
      name: 'Vendor Manager',
      description: 'Manage pharmacy onboarding and operations',
      users: 2,
      permissions: 22,
      status: 'active',
      created: '2024-01-08'
    },
    {
      id: 4,
      name: 'Finance Admin',
      description: 'Handle payments, settlements, and refunds',
      users: 2,
      permissions: 25,
      status: 'active',
      created: '2024-01-10'
    },
    {
      id: 5,
      name: 'Content Manager',
      description: 'Manage platform content and offers',
      users: 1,
      permissions: 15,
      status: 'inactive',
      created: '2024-01-12'
    }
  ];

  const permissions = [
    { id: 1, module: 'Dashboard', view: true, create: true, edit: true, delete: true },
    { id: 2, module: 'User Management', view: true, create: true, edit: true, delete: false },
    { id: 3, module: 'Doctor Management', view: true, create: true, edit: true, delete: false },
    { id: 4, module: 'Pharmacy Management', view: true, create: true, edit: true, delete: false },
    { id: 5, module: 'Order Management', view: true, create: false, edit: true, delete: false },
    { id: 6, module: 'Payment Management', view: true, create: false, edit: false, delete: false },
    { id: 7, module: 'Compliance', view: true, create: false, edit: true, delete: false },
    { id: 8, module: 'Role Management', view: false, create: false, edit: false, delete: false },
  ];

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
            className="btn-icon btn-sm"
            onClick={() => viewRole(role)}
            title="View Details"
          >
            <HiEye />
          </button>
          <button 
            className="btn-icon btn-sm"
            onClick={() => editRole(role)}
            title="Edit Role"
          >
            <HiPencil />
          </button>
          <button 
            className="btn-icon btn-sm btn-error"
            onClick={() => deleteRole(role)}
            title="Delete Role"
            disabled={role.name === 'Super Admin'}
          >
            <HiTrash />
          </button>
          <button 
            className="btn-icon btn-sm"
            onClick={() => toggleRoleStatus(role)}
            title={role.status === 'active' ? 'Deactivate' : 'Activate'}
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

  const editRole = (role) => {
    setSelectedRole(role);
    setIsEditing(true);
    setShowModal(true);
  };

  const deleteRole = (role) => {
    if (window.confirm(`Are you sure you want to delete the "${role.name}" role?`)) {
      console.log('Delete role:', role.id);
    }
  };

  const toggleRoleStatus = (role) => {
    const action = role.status === 'active' ? 'deactivate' : 'activate';
    if (window.confirm(`${action.charAt(0).toUpperCase() + action.slice(1)} "${role.name}" role?`)) {
      console.log(`${action} role:`, role.id);
    }
  };

  const createNewRole = () => {
    setSelectedRole(null);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <div className="role-management">
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1>Role Management</h1>
            <p>Manage admin roles and permissions for the QuickMed Admin Portal</p>
          </div>
          <button className="btn btn-primary" onClick={createNewRole}>
            <HiPlus /> Create New Role
          </button>
        </div>
      </div>

      <div className="permission-overview card">
        <h3>Permission Matrix Overview</h3>
        <div className="matrix-summary">
          <div className="summary-item">
            <span className="summary-value">{roles.length}</span>
            <span className="summary-label">Total Roles</span>
          </div>
          <div className="summary-item">
            <span className="summary-value">8</span>
            <span className="summary-label">Permission Modules</span>
          </div>
          <div className="summary-item">
            <span className="summary-value">45</span>
            <span className="summary-label">Total Permissions</span>
          </div>
          <div className="summary-item">
            <span className="summary-value">9</span>
            <span className="summary-label">Active Admin Users</span>
          </div>
        </div>
      </div>

      <div className="card">
        <Table
          columns={columns}
          data={roles}
          emptyMessage="No roles found"
        />
      </div>

      <div className="permission-modules card">
        <h3>Available Permission Modules</h3>
        <div className="modules-grid">
          {permissions.map(module => (
            <div key={module.id} className="module-card">
              <h4>{module.module}</h4>
              <div className="permission-checks">
                <div className="check-item">
                  <input type="checkbox" id={`view-${module.id}`} defaultChecked={module.view} />
                  <label htmlFor={`view-${module.id}`}>View</label>
                </div>
                <div className="check-item">
                  <input type="checkbox" id={`create-${module.id}`} defaultChecked={module.create} />
                  <label htmlFor={`create-${module.id}`}>Create</label>
                </div>
                <div className="check-item">
                  <input type="checkbox" id={`edit-${module.id}`} defaultChecked={module.edit} />
                  <label htmlFor={`edit-${module.id}`}>Edit</label>
                </div>
                <div className="check-item">
                  <input type="checkbox" id={`delete-${module.id}`} defaultChecked={module.delete} />
                  <label htmlFor={`delete-${module.id}`}>Delete</label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <Modal
          title={isEditing ? (selectedRole ? `Edit Role: ${selectedRole.name}` : 'Create New Role') : `Role Details: ${selectedRole.name}`}
          onClose={() => setShowModal(false)}
          size="large"
        >
          <div className="role-modal-content">
            {isEditing ? (
              <form className="role-form">
                <div className="form-group">
                  <label className="form-label">Role Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    defaultValue={selectedRole?.name || ''}
                    placeholder="Enter role name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea 
                    className="form-input" 
                    rows="3"
                    defaultValue={selectedRole?.description || ''}
                    placeholder="Enter role description"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-input" defaultValue={selectedRole?.status || 'active'}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Permissions</label>
                  <div className="permissions-selection">
                    {permissions.map(module => (
                      <div key={module.id} className="module-permissions">
                        <div className="module-header">
                          <h5>{module.module}</h5>
                          <input 
                            type="checkbox" 
                            id={`select-all-${module.id}`}
                            className="select-all"
                          />
                        </div>
                        <div className="permission-options">
                          <label>
                            <input type="checkbox" defaultChecked={module.view} />
                            View
                          </label>
                          <label>
                            <input type="checkbox" defaultChecked={module.create} />
                            Create
                          </label>
                          <label>
                            <input type="checkbox" defaultChecked={module.edit} />
                            Edit
                          </label>
                          <label>
                            <input type="checkbox" defaultChecked={module.delete} />
                            Delete
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {selectedRole ? 'Update Role' : 'Create Role'}
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
                    {permissions.map(module => (
                      <div key={module.id} className="permission-item">
                        <span className="module-name">{module.module}</span>
                        <div className="permission-badges">
                          {module.view && <span className="badge view">View</span>}
                          {module.create && <span className="badge create">Create</span>}
                          {module.edit && <span className="badge edit">Edit</span>}
                          {module.delete && <span className="badge delete">Delete</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="role-actions">
                  <button className="btn btn-outline" onClick={() => setIsEditing(true)}>
                    <HiPencil /> Edit Role
                  </button>
                  <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RoleManagement;