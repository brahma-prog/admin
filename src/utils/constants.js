export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  MEDICAL_COMPLIANCE_ADMIN: 'medical_compliance_admin',
  VENDOR_MANAGER: 'vendor_manager',
  FINANCE_ADMIN: 'finance_admin',
  OPERATIONS_ADMIN: 'operations_admin',
  CONTENT_MANAGER: 'content_manager'
};

export const PERMISSIONS = {
  VIEW_DASHBOARD: 'view_dashboard',
  MANAGE_USERS: 'manage_users',
  MANAGE_DOCTORS: 'manage_doctors',
  MANAGE_PHARMACIES: 'manage_pharmacies',
  MANAGE_DELIVERY: 'manage_delivery',
  MANAGE_ORDERS: 'manage_orders',
  MANAGE_PAYMENTS: 'manage_payments',
  VIEW_COMPLIANCE: 'view_compliance',
  MANAGE_ROLES: 'manage_roles',
  MANAGE_CONTENT: 'manage_content',
  VIEW_AUDIT_LOGS: 'view_audit_logs'
};

export const STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  DELETED: 'deleted',
  EXPIRED: 'expired'
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const PAYMENT_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
  PENDING: 'pending',
  REFUNDED: 'refunded'
};

export const COMPLIANCE_STATUS = {
  VALID: 'valid',
  EXPIRING_SOON: 'expiring_soon',
  EXPIRED: 'expired',
  PENDING_VERIFICATION: 'pending_verification'
};