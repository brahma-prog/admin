import { format, parseISO, differenceInDays, isAfter, isBefore } from 'date-fns';

export const formatDate = (date, formatStr = 'dd/MM/yyyy') => {
  if (!date) return '-';
  try {
    return format(parseISO(date), formatStr);
  } catch (error) {
    return date;
  }
};

export const formatDateTime = (date) => {
  return formatDate(date, 'dd/MM/yyyy HH:mm');
};

export const formatCurrency = (amount, currency = '₹') => {
  return `${currency}${parseFloat(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

export const calculateDaysLeft = (expiryDate) => {
  if (!expiryDate) return null;
  const today = new Date();
  const expiry = parseISO(expiryDate);
  return differenceInDays(expiry, today);
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'active':
    case 'success':
    case 'delivered':
    case 'valid':
      return 'success';
    case 'pending':
    case 'processing':
    case 'expiring_soon':
      return 'warning';
    case 'suspended':
    case 'failed':
    case 'cancelled':
    case 'expired':
      return 'error';
    case 'out_for_delivery':
      return 'info';
    default:
      return 'default';
  }
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
};

export const generateId = (prefix = '') => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `${prefix}${timestamp}${random}`.toUpperCase();
};