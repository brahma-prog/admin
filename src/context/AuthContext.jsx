import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Dummy credentials for testing (email: password)
const DUMMY_CREDENTIALS = {
  'admin@quickmed.com': 'Admin@123',
  'compliance@quickmed.com': 'Compliance@123',
  'vendor@quickmed.com': 'Vendor@123',
  'finance@quickmed.com': 'Finance@123',
  'operations@quickmed.com': 'Operations@123',
  'content@quickmed.com': 'Content@123',
 };

const initialUser = {
  id: 1,
  email: 'admin@quickmed.com',
  name: 'Super Admin',
  role: 'super_admin',
  avatar: 'SA',
  permissions: ['all']
};

const mockUsers = {
  'super_admin': {
    ...initialUser,
    name: 'Super Admin',
    role: 'super_admin',
    permissions: ['all']
  },
  'medical_compliance_admin': {
    id: 2,
    email: 'compliance@quickmed.com',
    name: 'Medical Compliance Admin',
    role: 'medical_compliance_admin',
    avatar: 'MC',
    permissions: ['view_dashboard', 'manage_doctors', 'view_compliance', 'view_audit_logs']
  },
  'vendor_manager': {
    id: 3,
    email: 'vendor@quickmed.com',
    name: 'Vendor Manager',
    role: 'vendor_manager',
    avatar: 'VM',
    permissions: ['view_dashboard', 'manage_pharmacies', 'view_audit_logs']
  },
  'finance_admin': {
    id: 4,
    email: 'finance@quickmed.com',
    name: 'Finance Admin',
    role: 'finance_admin',
    avatar: 'FA',
    permissions: ['view_dashboard', 'manage_payments', 'view_audit_logs']
  },
  'operations_admin': {
    id: 5,
    email: 'operations@quickmed.com',
    name: 'Operations Admin',
    role: 'operations_admin',
    avatar: 'OA',
    permissions: ['view_dashboard', 'manage_orders', 'manage_delivery', 'view_audit_logs']
  },
  'content_manager': {
    id: 6,
    email: 'content@quickmed.com',
    name: 'Content Manager',
    role: 'content_manager',
    avatar: 'CM',
    permissions: ['view_dashboard', 'manage_content', 'view_audit_logs']
  },
  'doctor': {
    id: 7,
    email: 'doctor@quickmed.com',
    name: 'Dr. John Smith',
    role: 'doctor',
    avatar: 'JS',
    permissions: ['view_dashboard', 'manage_patients', 'manage_prescriptions', 'view_schedule'],
    doctorId: 'DOC001',
    specialization: 'Cardiology',
    licenseNumber: 'MED123456'
  },
  'doctor2': {
    id: 8,
    email: 'doctor2@quickmed.com',
    name: 'Dr. Sarah Johnson',
    role: 'doctor',
    avatar: 'SJ',
    permissions: ['view_dashboard', 'manage_patients', 'manage_prescriptions', 'view_schedule'],
    doctorId: 'DOC002',
    specialization: 'Pediatrics',
    licenseNumber: 'MED654321'
  }
};

// Helper function to get user by email
const getUserByEmail = (email) => {
  const users = Object.values(mockUsers);
  return users.find(user => user.email === email);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.removeItem('admin_user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password, navigateCallback) => {
    setError('');
    setLoading(true);

    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if email exists in dummy credentials
      if (!DUMMY_CREDENTIALS[email]) {
        throw new Error('Invalid email address');
      }
      
      // Check if password matches
      if (DUMMY_CREDENTIALS[email] !== password) {
        throw new Error('Invalid password');
      }
      
      // Get user data
      let userData = getUserByEmail(email);
      
      // If doctor email not in mockUsers, create a generic doctor user
      if (!userData && email.includes('doctor')) {
        userData = {
          id: Date.now(),
          email,
          name: email === 'doctor@quickmed.com' ? 'Dr. John Smith' : 
                email === 'doctor2@quickmed.com' ? 'Dr. Sarah Johnson' : 
                'Dr. Test User',
          role: 'doctor',
          avatar: email.charAt(0).toUpperCase(),
          permissions: ['view_dashboard', 'manage_patients', 'manage_prescriptions', 'view_schedule'],
          doctorId: email === 'doctor@quickmed.com' ? 'DOC001' : 
                   email === 'doctor2@quickmed.com' ? 'DOC002' : 
                   'DOC' + Math.floor(Math.random() * 1000),
          specialization: email === 'doctor@quickmed.com' ? 'Cardiology' : 
                         email === 'doctor2@quickmed.com' ? 'Pediatrics' : 
                         'General Medicine',
          licenseNumber: 'MED' + Math.floor(Math.random() * 1000000)
        };
      }
      
      if (!userData) {
        throw new Error('User not found');
      }

      setUser(userData);
      localStorage.setItem('admin_user', JSON.stringify(userData));
      localStorage.setItem('last_login', new Date().toISOString());
      
      // Call navigate callback if provided
      if (navigateCallback) {
        navigateCallback();
      }
      
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback((navigateCallback) => {
    setUser(null);
    localStorage.removeItem('admin_user');
    
    // Call navigate callback if provided
    if (navigateCallback) {
      navigateCallback();
    }
  }, []);

  const updateProfile = useCallback(async (updates) => {
    if (!user) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('admin_user', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [user]);

  const hasPermission = useCallback((permission) => {
    if (!user) return false;
    if (user.role === 'super_admin') return true;
    return user.permissions?.includes(permission) || user.permissions?.includes('all');
  }, [user]);

  const canAccessRoute = useCallback((path) => {
    // Public routes
    if (path === '/login') return true;
    
    // Route-based permission mapping
    const routePermissions = {
      '/': 'view_dashboard',
      '/dashboard': 'view_dashboard',
      '/users': 'manage_users',
      '/doctors': 'manage_doctors',
      '/pharmacies': 'manage_pharmacies',
      '/delivery-partners': 'manage_delivery',
      '/orders': 'manage_orders',
      '/payments': 'manage_payments',
      '/compliance': 'view_compliance',
      '/roles': 'manage_roles',
      '/content': 'manage_content',
      '/audit-logs': 'view_audit_logs',
      '/profile': 'view_dashboard',
      
      // Doctor-specific routes
      '/doctor/dashboard': 'view_dashboard',
      '/doctor/patients': 'manage_patients',
      '/doctor/prescriptions': 'manage_prescriptions',
      '/doctor/schedule': 'view_schedule',
      '/doctor/appointments': 'manage_patients',
      '/doctor/medical-records': 'manage_patients',
      '/doctor/telemedicine': 'manage_patients'
    };
    
    const requiredPermission = routePermissions[path];
    if (!requiredPermission) return true;
    
    return hasPermission(requiredPermission);
  }, [hasPermission]);

  const getRoleName = useCallback(() => {
    if (!user) return '';
    
    const roleNames = {
      'super_admin': 'Super Admin',
      'medical_compliance_admin': 'Medical Compliance Admin',
      'vendor_manager': 'Vendor Manager',
      'finance_admin': 'Finance Admin',
      'operations_admin': 'Operations Admin',
      'content_manager': 'Content Manager',
      'doctor': 'Doctor'
    };
    
    return roleNames[user.role] || user.role.replace('_', ' ');
  }, [user]);

  const isDoctor = useCallback(() => {
    return user?.role === 'doctor';
  }, [user]);

  const isAdmin = useCallback(() => {
    const adminRoles = ['super_admin', 'medical_compliance_admin', 'vendor_manager', 
                       'finance_admin', 'operations_admin', 'content_manager'];
    return adminRoles.includes(user?.role);
  }, [user]);

  const getDummyCredentials = useCallback(() => {
    return Object.entries(DUMMY_CREDENTIALS).map(([email, password]) => ({
      email,
      password,
      role: getUserByEmail(email)?.role || 'doctor',
      name: email === 'doctor@quickmed.com' ? 'Dr. John Smith' : 
            email === 'doctor2@quickmed.com' ? 'Dr. Sarah Johnson' : 
            email.replace('@quickmed.com', '').replace('_', ' ')
    }));
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    updateProfile,
    hasPermission,
    canAccessRoute,
    getRoleName,
    isAuthenticated: !!user,
    isDoctor,
    isAdmin,
    getDummyCredentials
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;