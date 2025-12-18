import React, { useState, useEffect, useMemo } from 'react';
import { 
  HiSearch, 
  HiFilter, 
  HiDownload, 
  HiCheckCircle,
  HiClock,
  HiCurrencyRupee,
  HiReceiptRefund,
  HiDocumentReport,
  HiUser,
  HiOfficeBuilding,
  HiTruck,
  HiEye,
  HiXCircle,
  HiCalculator,
  HiDocument,
  HiOutlineEye,
  HiOutlineDownload
} from 'react-icons/hi';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import SearchBar from '../components/common/SearchBar';
import './PaymentManagement.css';

// Generate unique IDs
const generateId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

// Initial data
const initialTransactions = [
  {
    id: 'TXN-2024-00123',
    orderId: 'ORD-2024-00123',
    user: 'Rajesh Kumar',
    amount: 1245,
    type: 'order_payment',
    method: 'UPI',
    status: 'success',
    date: '2024-01-24 14:30',
    commission: 124,
    tax: 112,
    netAmount: 1009,
    breakdown: {
      orderAmount: 1120,
      tax: 112,
      platformFee: 13,
      total: 1245
    }
  },
  {
    id: 'TXN-2024-00124',
    orderId: 'ORD-2024-00124',
    user: 'Priya Sharma',
    amount: 890,
    type: 'order_payment',
    method: 'Card',
    status: 'pending',
    date: '2024-01-24 14:25',
    commission: 89,
    tax: 80,
    netAmount: 721
  },
  {
    id: 'TXN-2024-00125',
    orderId: 'CON-2024-00125',
    user: 'Amit Patel',
    amount: 500,
    type: 'consultation',
    method: 'Wallet',
    status: 'success',
    date: '2024-01-24 14:15',
    commission: 75,
    tax: 45,
    netAmount: 380
  }
];

const initialSettlements = [
  {
    id: 'SET-2024-001',
    partner: 'Dr. Arjun Mehta',
    type: 'doctor',
    period: 'Jan 15-21, 2024',
    amount: 45670,
    status: 'pending',
    dueDate: '2024-01-25',
    transactions: ['TXN-2024-00123', 'TXN-2024-00125'],
    breakdown: {
      totalEarnings: 50000,
      platformCommission: 4330,
      gst: 450,
      tds: 500,
      netPayable: 45670
    }
  },
  {
    id: 'SET-2024-002',
    partner: 'Health Plus Pharmacy',
    type: 'pharmacy',
    period: 'Jan 15-21, 2024',
    amount: 123450,
    status: 'processed',
    processedDate: '2024-01-22',
    transactions: ['TXN-2024-00124'],
    breakdown: {
      totalEarnings: 135000,
      platformCommission: 11550,
      gst: 1200,
      netPayable: 123450
    }
  },
  {
    id: 'SET-2024-003',
    partner: 'Amit Kumar',
    type: 'rider',
    period: 'Jan 15-21, 2024',
    amount: 12340,
    status: 'pending',
    dueDate: '2024-01-25',
    transactions: ['TXN-2024-00123', 'TXN-2024-00124'],
    breakdown: {
      totalEarnings: 13000,
      platformCommission: 660,
      netPayable: 12340
    }
  }
];

const initialRefundRequests = [
  {
    id: 'REF-2024-001',
    orderId: 'ORD-2024-00119',
    user: 'Sneha Gupta',
    amount: 1560,
    reason: 'Delivery delayed by 4 hours',
    status: 'pending',
    submitted: '2024-01-24 13:45',
    evidence: ['invoice_001.jpg', 'chat_log.pdf'],
    transactionId: 'TXN-2024-00119'
  },
  {
    id: 'REF-2024-002',
    orderId: 'ORD-2024-00118',
    user: 'Vikram Singh',
    amount: 980,
    reason: 'Wrong medicine delivered',
    status: 'approved',
    submitted: '2024-01-24 12:30',
    evidence: ['photo1.jpg'],
    processedDate: '2024-01-24 14:00'
  }
];

const PaymentManagement = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [modalType, setModalType] = useState('details');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-01-24'
  });
  const [filterStatus, setFilterStatus] = useState('all');
  const [settlementType, setSettlementType] = useState('all');
  const [notification, setNotification] = useState(null);
  
  // Financial Configuration
  const [config, setConfig] = useState({
    commissionRate: 10,
    gstRate: 18,
    settlementCycle: 'weekly',
    autoSettlement: true,
    taxRules: {
      gstEnabled: true,
      tdsEnabled: true,
      tdsRate: 5
    }
  });

  // State for data
  const [transactions, setTransactions] = useState(initialTransactions);
  const [settlements, setSettlements] = useState(initialSettlements);
  const [refundRequests, setRefundRequests] = useState(initialRefundRequests);
  const [financialLogs, setFinancialLogs] = useState([]);

  // Format currency
  const formatCurrency = (amount) => {
    if (typeof amount === 'string') {
      return amount.startsWith('₹') ? amount : `₹${parseInt(amount).toLocaleString()}`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Filtered data based on search and filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = searchTerm ? 
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.orderId.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      
      const matchesStatus = filterStatus === 'all' ? true : t.status === filterStatus;
      
      const transactionDate = t.date.split(' ')[0];
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      const currentDate = new Date(transactionDate);
      
      const matchesDate = currentDate >= startDate && currentDate <= endDate;
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [transactions, searchTerm, filterStatus, dateRange]);

  const filteredSettlements = useMemo(() => {
    return settlements.filter(s => {
      const matchesSearch = searchTerm ? 
        s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.partner.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      
      const matchesStatus = filterStatus === 'all' ? true : s.status === filterStatus;
      
      const matchesType = settlementType === 'all' ? true : s.type === settlementType;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [settlements, searchTerm, filterStatus, settlementType]);

  const filteredRefunds = useMemo(() => {
    return refundRequests.filter(r => {
      const matchesSearch = searchTerm ? 
        r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.orderId.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      
      const matchesStatus = filterStatus === 'all' ? true : r.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [refundRequests, searchTerm, filterStatus]);

  // Financial Summary Calculation
  const financialSummary = useMemo(() => {
    const totalRevenue = transactions
      .filter(t => t.status === 'success')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const pendingSettlements = settlements
      .filter(s => s.status === 'pending')
      .reduce((sum, s) => sum + s.amount, 0);
    
    const platformCommission = transactions
      .filter(t => t.status === 'success')
      .reduce((sum, t) => sum + t.commission, 0);
    
    const refundsPending = refundRequests
      .filter(r => r.status === 'pending')
      .reduce((sum, r) => sum + r.amount, 0);
    
    return {
      totalRevenue: formatCurrency(totalRevenue),
      pendingSettlements: formatCurrency(pendingSettlements),
      platformCommission: formatCurrency(platformCommission),
      refundsPending: formatCurrency(refundsPending)
    };
  }, [transactions, settlements, refundRequests]);

  // Table Columns Configuration
  const columns = {
    transactions: [
      { key: 'id', label: 'Transaction ID' },
      { key: 'orderId', label: 'Order/Consult ID' },
      { key: 'user', label: 'Customer' },
      { 
        key: 'amount', 
        label: 'Amount',
        render: (amount) => formatCurrency(amount)
      },
      { key: 'type', label: 'Type' },
      { key: 'method', label: 'Payment Method' },
      { 
        key: 'status', 
        label: 'Status',
        render: (status) => (
          <span className={`status-badge status-${status}`}>
            {status === 'success' ? <HiCheckCircle /> : <HiClock />}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )
      },
      { key: 'date', label: 'Date & Time' },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, transaction) => (
          <div className="action-buttons">
            <button 
              className="btn-icon btn-sm"
              onClick={() => viewTransactionDetails(transaction)}
              title="View Details"
            >
              <HiOutlineEye />
            </button>
            <button 
              className="btn-icon btn-sm"
              onClick={() => downloadReceipt(transaction)}
              title="Download Receipt"
            >
              <HiOutlineDownload />
            </button>
          </div>
        )
      }
    ],
    settlements: [
      { key: 'id', label: 'Settlement ID' },
      { key: 'partner', label: 'Partner' },
      { key: 'type', label: 'Type' },
      { key: 'period', label: 'Period' },
      { 
        key: 'amount', 
        label: 'Amount',
        render: (amount) => formatCurrency(amount)
      },
      { 
        key: 'status', 
        label: 'Status',
        render: (status) => (
          <span className={`status-badge status-${status}`}>
            {status === 'processed' ? <HiCheckCircle /> : <HiClock />}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )
      },
      { key: 'dueDate', label: 'Due/Processed Date' },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, settlement) => (
          <div className="action-buttons">
            {settlement.status === 'pending' && (
              <button 
                className="btn btn-sm btn-success"
                onClick={() => processSettlement(settlement)}
                title="Process Settlement"
              >
                Process
              </button>
            )}
            <button 
              className="btn-icon btn-sm"
              onClick={() => viewSettlementDetails(settlement)}
              title="View Details"
            >
              <HiOutlineEye />
            </button>
            <button 
              className="btn-icon btn-sm"
              onClick={() => downloadSettlementInvoice(settlement)}
              title="Download Invoice"
            >
              <HiOutlineDownload />
            </button>
          </div>
        )
      }
    ],
    refunds: [
      { key: 'id', label: 'Refund ID' },
      { key: 'orderId', label: 'Order ID' },
      { key: 'user', label: 'Customer' },
      { 
        key: 'amount', 
        label: 'Amount',
        render: (amount) => formatCurrency(amount)
      },
      { key: 'reason', label: 'Reason' },
      { 
        key: 'status', 
        label: 'Status',
        render: (status) => (
          <span className={`status-badge status-${status}`}>
            {status === 'approved' ? <HiCheckCircle /> : 
             status === 'rejected' ? <HiXCircle /> : <HiClock />}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )
      },
      { key: 'submitted', label: 'Submitted' },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, refund) => (
          <div className="action-buttons">
            {refund.status === 'pending' && (
              <>
                <button 
                  className="btn btn-sm btn-success"
                  onClick={() => approveRefund(refund)}
                  title="Approve Refund"
                >
                  Approve
                </button>
                <button 
                  className="btn btn-sm btn-error"
                  onClick={() => rejectRefund(refund)}
                  title="Reject Refund"
                >
                  Reject
                </button>
              </>
            )}
            <button 
              className="btn-icon btn-sm"
              onClick={() => viewRefundDetails(refund)}
              title="View Details"
            >
              <HiOutlineEye />
            </button>
          </div>
        )
      }
    ]
  };

  // Functions
  const viewTransactionDetails = (transaction) => {
    setSelectedPayment(transaction);
    setModalType('transactionDetails');
    setShowModal(true);
  };

  const viewSettlementDetails = (settlement) => {
    setSelectedPayment(settlement);
    setModalType('settlementDetails');
    setShowModal(true);
  };

  const viewRefundDetails = (refund) => {
    setSelectedPayment(refund);
    setModalType('refundDetails');
    setShowModal(true);
  };

  const downloadReceipt = (transaction) => {
    const receiptData = {
      transactionId: transaction.id,
      date: transaction.date,
      amount: transaction.amount,
      customer: transaction.user,
      status: transaction.status
    };
    
    const blob = new Blob([JSON.stringify(receiptData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${transaction.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification(`Receipt for ${transaction.id} downloaded successfully`, 'success');
  };

  const downloadSettlementInvoice = (settlement) => {
    const invoiceData = {
      settlementId: settlement.id,
      partner: settlement.partner,
      amount: settlement.amount,
      period: settlement.period,
      status: settlement.status
    };
    
    const blob = new Blob([JSON.stringify(invoiceData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${settlement.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification(`Invoice for ${settlement.id} downloaded successfully`, 'success');
  };

  const processSettlement = (settlement) => {
    if (window.confirm(`Process settlement ${settlement.id} for ${settlement.partner}? This action will mark the settlement as processed and trigger the payout.`)) {
      setSettlements(prev => 
        prev.map(s => 
          s.id === settlement.id 
            ? { 
                ...s, 
                status: 'processed',
                processedDate: new Date().toLocaleDateString('en-IN')
              }
            : s
        )
      );
      
      // Log the action
      const newLog = {
        id: generateId('LOG'),
        action: 'settlement_processed',
        user: 'Admin',
        target: settlement.id,
        details: `Settlement processed for ${settlement.partner}`,
        timestamp: new Date().toLocaleString('en-IN')
      };
      
      setFinancialLogs(prev => [newLog, ...prev]);
      showNotification(`Settlement ${settlement.id} has been processed successfully`, 'success');
    }
  };

  const approveRefund = (refund) => {
    if (window.confirm(`Approve refund ${refund.id} for ${formatCurrency(refund.amount)}? This will initiate the refund process to the customer.`)) {
      setRefundRequests(prev => 
        prev.map(r => 
          r.id === refund.id 
            ? { 
                ...r, 
                status: 'approved',
                processedDate: new Date().toLocaleString('en-IN')
              }
            : r
        )
      );
      
      // Log the action
      const newLog = {
        id: generateId('LOG'),
        action: 'refund_approved',
        user: 'Admin',
        target: refund.id,
        details: `Refund approved for ${refund.user}`,
        timestamp: new Date().toLocaleString('en-IN')
      };
      
      setFinancialLogs(prev => [newLog, ...prev]);
      showNotification(`Refund ${refund.id} has been approved successfully`, 'success');
    }
  };

  const rejectRefund = (refund) => {
    if (window.confirm(`Reject refund request ${refund.id}? This action cannot be undone.`)) {
      setRefundRequests(prev => 
        prev.map(r => 
          r.id === refund.id 
            ? { ...r, status: 'rejected' }
            : r
        )
      );
      
      // Log the action
      const newLog = {
        id: generateId('LOG'),
        action: 'refund_rejected',
        user: 'Admin',
        target: refund.id,
        details: `Refund rejected for ${refund.user}`,
        timestamp: new Date().toLocaleString('en-IN')
      };
      
      setFinancialLogs(prev => [newLog, ...prev]);
      showNotification(`Refund request ${refund.id} has been rejected`, 'warning');
    }
  };

  const runSettlementCycle = () => {
    if (window.confirm(`Run ${config.settlementCycle} settlement cycle? This will calculate and generate settlements for all pending transactions.`)) {
      // Create new settlements for pending transactions
      const pendingTransactions = transactions.filter(t => t.status === 'success');
      
      if (pendingTransactions.length > 0) {
        const newSettlement = {
          id: generateId('SET'),
          partner: 'Auto Generated Settlement',
          type: 'auto',
          period: `${new Date().toLocaleDateString('en-IN')}`,
          amount: pendingTransactions.reduce((sum, t) => sum + t.amount, 0),
          status: 'pending',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
          transactions: pendingTransactions.map(t => t.id),
          breakdown: {
            totalEarnings: pendingTransactions.reduce((sum, t) => sum + t.amount, 0),
            platformCommission: pendingTransactions.reduce((sum, t) => sum + t.commission, 0),
            netPayable: pendingTransactions.reduce((sum, t) => sum + t.amount - t.commission, 0)
          }
        };
        
        setSettlements(prev => [newSettlement, ...prev]);
        showNotification(`${config.settlementCycle} settlement cycle initiated successfully. New settlement ${newSettlement.id} created.`, 'success');
      } else {
        showNotification('No pending transactions found for settlement', 'info');
      }
    }
  };

  const downloadFinancialReport = (reportType) => {
    const reports = {
      gst: {
        name: 'GST Report',
        filename: `gst-report-${new Date().toISOString().split('T')[0]}.json`,
        data: {
          reportType: 'GST',
          period: `${dateRange.start} to ${dateRange.end}`,
          totalTransactions: filteredTransactions.length,
          totalTax: filteredTransactions.reduce((sum, t) => sum + (t.tax || 0), 0),
          details: filteredTransactions.map(t => ({
            id: t.id,
            date: t.date,
            amount: t.amount,
            tax: t.tax || 0,
            gstRate: config.gstRate
          }))
        }
      },
      revenue: {
        name: 'Revenue Report',
        filename: `revenue-report-${new Date().toISOString().split('T')[0]}.json`,
        data: {
          reportType: 'Revenue',
          period: `${dateRange.start} to ${dateRange.end}`,
          totalRevenue: filteredTransactions.reduce((sum, t) => sum + t.amount, 0),
          successfulTransactions: filteredTransactions.filter(t => t.status === 'success').length,
          failedTransactions: filteredTransactions.filter(t => t.status === 'failed').length,
          pendingTransactions: filteredTransactions.filter(t => t.status === 'pending').length
        }
      },
      payout: {
        name: 'Payout Summary',
        filename: `payout-summary-${new Date().toISOString().split('T')[0]}.json`,
        data: {
          reportType: 'Payout',
          period: `${dateRange.start} to ${dateRange.end}`,
          totalSettlements: filteredSettlements.length,
          totalAmount: filteredSettlements.reduce((sum, s) => sum + s.amount, 0),
          pendingSettlements: filteredSettlements.filter(s => s.status === 'pending').length,
          processedSettlements: filteredSettlements.filter(s => s.status === 'processed').length,
          settlementBreakdown: filteredSettlements.map(s => ({
            id: s.id,
            partner: s.partner,
            type: s.type,
            amount: s.amount,
            status: s.status
          }))
        }
      },
      commission: {
        name: 'Commission Report',
        filename: `commission-report-${new Date().toISOString().split('T')[0]}.json`,
        data: {
          reportType: 'Commission',
          period: `${dateRange.start} to ${dateRange.end}`,
          totalCommission: filteredTransactions.reduce((sum, t) => sum + t.commission, 0),
          commissionRate: config.commissionRate,
          commissionBreakdown: filteredTransactions.map(t => ({
            id: t.id,
            amount: t.amount,
            commission: t.commission,
            commissionPercentage: ((t.commission / t.amount) * 100).toFixed(2)
          }))
        }
      }
    };

    const report = reports[reportType];
    if (!report) return;

    const blob = new Blob([JSON.stringify(report.data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = report.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification(`${report.name} downloaded successfully`, 'success');
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleDateRangeChange = (type, value) => {
    setDateRange(prev => ({ ...prev, [type]: value }));
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'transactions': return filteredTransactions;
      case 'settlements': return filteredSettlements;
      case 'refunds': return filteredRefunds;
      default: return [];
    }
  };

  const getSettlementSummary = () => {
    const doctorSettlements = settlements.filter(s => s.type === 'doctor' && s.status === 'pending');
    const vendorSettlements = settlements.filter(s => s.type === 'pharmacy' && s.status === 'pending');
    const riderSettlements = settlements.filter(s => s.type === 'rider' && s.status === 'pending');
    
    return {
      doctorCount: doctorSettlements.length,
      doctorAmount: doctorSettlements.reduce((sum, s) => sum + s.amount, 0),
      vendorCount: vendorSettlements.length,
      vendorAmount: vendorSettlements.reduce((sum, s) => sum + s.amount, 0),
      riderCount: riderSettlements.length,
      riderAmount: riderSettlements.reduce((sum, s) => sum + s.amount, 0)
    };
  };

  const settlementSummary = getSettlementSummary();

  // Calculate stats for display
  const stats = {
    totalTransactions: transactions.length,
    totalSettlements: settlements.length,
    totalRefunds: refundRequests.length,
    pendingRefunds: refundRequests.filter(r => r.status === 'pending').length,
    completedSettlements: settlements.filter(s => s.status === 'processed').length,
    pendingSettlements: settlements.filter(s => s.status === 'pending').length
  };

  return (
    <div className="payment-management">
      {/* Notification */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="page-header">
        <h1>Payments & Settlements Management</h1>
        <p>Financial visibility across users, doctors, pharmacies, and delivery partners</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <HiCurrencyRupee />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalTransactions}</div>
            <div className="stat-label">Total Transactions</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <HiCheckCircle />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.completedSettlements}</div>
            <div className="stat-label">Completed Settlements</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <HiClock />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.pendingSettlements}</div>
            <div className="stat-label">Pending Settlements</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <HiReceiptRefund />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.pendingRefunds}</div>
            <div className="stat-label">Pending Refunds</div>
          </div>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="financial-summary card">
        <div className="section-header">
          <h3>Financial Overview</h3>
          <span className="section-badge">Current Period</span>
        </div>
        <div className="summary-grid">
          <div className="summary-item revenue">
            <HiCurrencyRupee className="summary-icon" />
            <div className="summary-content">
              <div className="summary-value">{financialSummary.totalRevenue}</div>
              <div className="summary-label">Total Revenue</div>
            </div>
          </div>
          <div className="summary-item pending">
            <HiClock className="summary-icon" />
            <div className="summary-content">
              <div className="summary-value">{financialSummary.pendingSettlements}</div>
              <div className="summary-label">Pending Settlements</div>
            </div>
          </div>
          <div className="summary-item commission">
            <HiCalculator className="summary-icon" />
            <div className="summary-content">
              <div className="summary-value">{financialSummary.platformCommission}</div>
              <div className="summary-label">Platform Commission</div>
            </div>
          </div>
          <div className="summary-item refunds">
            <HiReceiptRefund className="summary-icon" />
            <div className="summary-content">
              <div className="summary-value">{financialSummary.refundsPending}</div>
              <div className="summary-label">Refunds Pending</div>
            </div>
          </div>
        </div>
      </div>

      {/* Settlement Type Tabs */}
      <div className="settlement-type-tabs card">
        <div className="section-header">
          <h3>Settlement Summary by Partner Type</h3>
          <div className="section-actions">
            <button 
              className="btn btn-sm btn-outline"
              onClick={() => {
                setSettlementType('all');
                setActiveTab('settlements');
              }}
            >
              View All
            </button>
          </div>
        </div>
        <div className="type-summary-grid">
          <div 
            className="type-item doctor" 
            onClick={() => { setSettlementType('doctor'); setActiveTab('settlements'); }}
          >
            <div className="type-icon">
              <HiUser />
            </div>
            <div className="type-content">
              <div className="type-value">{settlementSummary.doctorCount} Pending</div>
              <div className="type-label">Doctor Payouts</div>
              <div className="type-amount">{formatCurrency(settlementSummary.doctorAmount)}</div>
            </div>
          </div>
          <div 
            className="type-item vendor" 
            onClick={() => { setSettlementType('pharmacy'); setActiveTab('settlements'); }}
          >
            <div className="type-icon">
              <HiOfficeBuilding />
            </div>
            <div className="type-content">
              <div className="type-value">{settlementSummary.vendorCount} Pending</div>
              <div className="type-label">Vendor Settlements</div>
              <div className="type-amount">{formatCurrency(settlementSummary.vendorAmount)}</div>
            </div>
          </div>
          <div 
            className="type-item rider" 
            onClick={() => { setSettlementType('rider'); setActiveTab('settlements'); }}
          >
            <div className="type-icon">
              <HiTruck />
            </div>
            <div className="type-content">
              <div className="type-value">{settlementSummary.riderCount} Pending</div>
              <div className="type-label">Rider Settlements</div>
              <div className="type-amount">{formatCurrency(settlementSummary.riderAmount)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="tab-container">
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            <HiCurrencyRupee className="tab-icon" />
            <span className="tab-text">Transactions</span>
            <span className="tab-count">{filteredTransactions.length}</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'settlements' ? 'active' : ''}`}
            onClick={() => setActiveTab('settlements')}
          >
            <HiCheckCircle className="tab-icon" />
            <span className="tab-text">Settlements</span>
            <span className="tab-count">{filteredSettlements.length}</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'refunds' ? 'active' : ''}`}
            onClick={() => setActiveTab('refunds')}
          >
            <HiReceiptRefund className="tab-icon" />
            <span className="tab-text">Refund Requests</span>
            <span className="tab-count">{filteredRefunds.length}</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <HiDocumentReport className="tab-icon" />
            <span className="tab-text">Reports</span>
          </button>
        </div>

        {/* Toolbar */}
        <div className="management-toolbar">
          <div className="toolbar-left">
            <SearchBar
              placeholder={`Search ${activeTab}...`}
              onChange={(e) => handleSearch(e.target.value)}
              value={searchTerm}
            />
            <div className="date-range">
              <input 
                type="date" 
                className="form-input date-input"
                value={dateRange.start}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
              />
              <span className="date-separator">to</span>
              <input 
                type="date" 
                className="form-input date-input"
                value={dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
              />
            </div>
            {activeTab !== 'reports' && activeTab !== 'config' && (
              <div className="filter-dropdown">
                <select 
                  className="form-input"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                  <option value="processed">Processed</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            )}
            {activeTab === 'settlements' && (
              <div className="filter-dropdown">
                <select 
                  className="form-input"
                  value={settlementType}
                  onChange={(e) => setSettlementType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="doctor">Doctors</option>
                  <option value="pharmacy">Pharmacies</option>
                  <option value="rider">Riders</option>
                </select>
              </div>
            )}
          </div>
          <div className="toolbar-right">
            
            <button 
              className="btn btn-outline"
              onClick={() => downloadFinancialReport(activeTab === 'transactions' ? 'revenue' : 'payout')}
            >
              <HiDownload /> Export Data
            </button>
            {activeTab === 'settlements' && (
              <button 
                className="btn btn-primary"
                onClick={runSettlementCycle}
              >
                Run Settlement Cycle
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="content-card">
          {activeTab !== 'reports' ? (
            <>
              <div className="table-header">
                <h4>
                  {activeTab === 'transactions' && 'Transaction History'}
                  {activeTab === 'settlements' && 'Settlement Management'}
                  {activeTab === 'refunds' && 'Refund Requests'}
                </h4>
                <div className="table-info">
                  Showing {getCurrentData().length} of {getCurrentData().length} entries
                </div>
              </div>
              <Table
                columns={columns[activeTab]}
                data={getCurrentData()}
                emptyMessage={`No ${activeTab} found matching your criteria`}
              />
            </>
          ) : (
            <div className="reports-section">
              <div className="section-header">
                <h3>Financial Reports</h3>
                <div className="section-actions">
                  <button 
                    className="btn btn-outline"
                    onClick={() => {
                      downloadFinancialReport('gst');
                      downloadFinancialReport('revenue');
                      downloadFinancialReport('payout');
                      downloadFinancialReport('commission');
                    }}
                  >
                    <HiDownload /> Export All Reports
                  </button>
                </div>
              </div>
              <div className="reports-grid">
                <div className="report-category">
                  <h4>GST & Tax Reports</h4>
                  <div className="report-list">
                    <div className="report-item">
                      <div className="report-info">
                        <div className="report-name">Monthly GST Report</div>
                        <div className="report-desc">Complete GST compliance report with tax breakdown</div>
                        <div className="report-meta">PDF Format • 24 Jan 2024</div>
                      </div>
                      <button 
                        className="btn btn-sm btn-outline"
                        onClick={() => downloadFinancialReport('gst')}
                      >
                        <HiDownload /> Download
                      </button>
                    </div>
                    <div className="report-item">
                      <div className="report-info">
                        <div className="report-name">Quarterly GST Summary</div>
                        <div className="report-desc">Quarterly tax summary for compliance filing</div>
                        <div className="report-meta">PDF Format • Q4 2023</div>
                      </div>
                      <button 
                        className="btn btn-sm btn-outline"
                        onClick={() => downloadFinancialReport('gst')}
                      >
                        <HiDownload /> Download
                      </button>
                    </div>
                  </div>
                </div>

                <div className="report-category">
                  <h4>Financial Statements</h4>
                  <div className="report-list">
                    <div className="report-item">
                      <div className="report-info">
                        <div className="report-name">Revenue Report</div>
                        <div className="report-desc">Daily transaction and revenue summary</div>
                        <div className="report-meta">Excel Format • {dateRange.start} to {dateRange.end}</div>
                      </div>
                      <button 
                        className="btn btn-sm btn-outline"
                        onClick={() => downloadFinancialReport('revenue')}
                      >
                        <HiDownload /> Generate
                      </button>
                    </div>
                    <div className="report-item">
                      <div className="report-info">
                        <div className="report-name">Payout Summary</div>
                        <div className="report-desc">Detailed payout report for all partners</div>
                        <div className="report-meta">PDF Format • Updated Daily</div>
                      </div>
                      <button 
                        className="btn btn-sm btn-outline"
                        onClick={() => downloadFinancialReport('payout')}
                      >
                        <HiDownload /> Generate
                      </button>
                    </div>
                    <div className="report-item">
                      <div className="report-info">
                        <div className="report-name">Commission Report</div>
                        <div className="report-desc">Platform commission earnings report</div>
                        <div className="report-meta">Excel Format • Real-time</div>
                      </div>
                      <button 
                        className="btn btn-sm btn-outline"
                        onClick={() => downloadFinancialReport('commission')}
                      >
                        <HiDownload /> Generate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedPayment && (
        <Modal
          title={modalType === 'success' ? selectedPayment.title : `${selectedPayment.id} Details`}
          onClose={() => setShowModal(false)}
          size="large"
          preventScroll={true}  // This prevents background scrolling when modal is open
        >
          {modalType === 'transactionDetails' ? (
            <div className="payment-details-modal">
              <div className="modal-section">
                <h4>Transaction Information</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Transaction ID:</label>
                    <span>{selectedPayment.id}</span>
                  </div>
                  <div className="info-item">
                    <label>Order ID:</label>
                    <span>{selectedPayment.orderId}</span>
                  </div>
                  <div className="info-item">
                    <label>Customer:</label>
                    <span>{selectedPayment.user}</span>
                  </div>
                  <div className="info-item">
                    <label>Amount:</label>
                    <span className="amount">{formatCurrency(selectedPayment.amount)}</span>
                  </div>
                  <div className="info-item">
                    <label>Payment Method:</label>
                    <span className="method-badge">{selectedPayment.method}</span>
                  </div>
                  <div className="info-item">
                    <label>Status:</label>
                    <span className={`status-badge status-${selectedPayment.status}`}>
                      {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                    </span>
                  </div>
                  <div className="info-item">
                    <label>Date & Time:</label>
                    <span>{selectedPayment.date}</span>
                  </div>
                  <div className="info-item">
                    <label>Platform Commission:</label>
                    <span>{formatCurrency(selectedPayment.commission)}</span>
                  </div>
                  <div className="info-item">
                    <label>Tax Amount:</label>
                    <span>{formatCurrency(selectedPayment.tax || 0)}</span>
                  </div>
                  <div className="info-item">
                    <label>Net Amount:</label>
                    <span>{formatCurrency(selectedPayment.netAmount || selectedPayment.amount)}</span>
                  </div>
                </div>
              </div>
              
              <div className="modal-section">
                <h4>Amount Breakdown</h4>
                <div className="breakdown-section">
                  <div className="breakdown-item">
                    <span>Order Amount</span>
                    <span>{formatCurrency(selectedPayment.breakdown?.orderAmount || selectedPayment.amount * 0.9)}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Taxes ({config.gstRate}% GST)</span>
                    <span>{formatCurrency(selectedPayment.breakdown?.tax || selectedPayment.tax || 0)}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Platform Fee</span>
                    <span>{formatCurrency(selectedPayment.breakdown?.platformFee || selectedPayment.commission * 0.1)}</span>
                  </div>
                  <div className="breakdown-item total">
                    <span>Total Amount</span>
                    <span>{formatCurrency(selectedPayment.amount)}</span>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => downloadReceipt(selectedPayment)}
                >
                  <HiDownload /> Download Receipt
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          ) : modalType === 'settlementDetails' ? (
            <div className="payment-details-modal">
              <div className="modal-section">
                <h4>Settlement Information</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Settlement ID:</label>
                    <span>{selectedPayment.id}</span>
                  </div>
                  <div className="info-item">
                    <label>Partner:</label>
                    <span>{selectedPayment.partner}</span>
                  </div>
                  <div className="info-item">
                    <label>Type:</label>
                    <span className={`type-badge type-${selectedPayment.type}`}>
                      {selectedPayment.type}
                    </span>
                  </div>
                  <div className="info-item">
                    <label>Period:</label>
                    <span>{selectedPayment.period}</span>
                  </div>
                  <div className="info-item">
                    <label>Amount:</label>
                    <span className="amount">{formatCurrency(selectedPayment.amount)}</span>
                  </div>
                  <div className="info-item">
                    <label>Status:</label>
                    <span className={`status-badge status-${selectedPayment.status}`}>
                      {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                    </span>
                  </div>
                  <div className="info-item">
                    <label>{selectedPayment.status === 'processed' ? 'Processed Date:' : 'Due Date:'}</label>
                    <span>{selectedPayment.processedDate || selectedPayment.dueDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="modal-section">
                <h4>Settlement Breakdown</h4>
                <div className="breakdown-section">
                  <div className="breakdown-item">
                    <span>Total Earnings</span>
                    <span>{formatCurrency(selectedPayment.breakdown?.totalEarnings || selectedPayment.amount * 1.1)}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Platform Commission ({config.commissionRate}%)</span>
                    <span>{formatCurrency(selectedPayment.breakdown?.platformCommission || selectedPayment.amount * 0.1)}</span>
                  </div>
                  {config.taxRules.gstEnabled && (
                    <div className="breakdown-item">
                      <span>GST ({config.gstRate}%)</span>
                      <span>{formatCurrency(selectedPayment.breakdown?.gst || selectedPayment.amount * 0.01)}</span>
                    </div>
                  )}
                  {selectedPayment.type === 'doctor' && config.taxRules.tdsEnabled && (
                    <div className="breakdown-item">
                      <span>TDS ({config.taxRules.tdsRate}%)</span>
                      <span>{formatCurrency(selectedPayment.breakdown?.tds || selectedPayment.amount * 0.02)}</span>
                    </div>
                  )}
                  <div className="breakdown-item total">
                    <span>Net Payable</span>
                    <span>{formatCurrency(selectedPayment.amount)}</span>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                {selectedPayment.status === 'pending' && (
                  <button 
                    className="btn btn-success"
                    onClick={() => {
                      processSettlement(selectedPayment);
                      setShowModal(false);
                    }}
                  >
                    Process Payment
                  </button>
                )}
                <button 
                  className="btn btn-outline"
                  onClick={() => downloadSettlementInvoice(selectedPayment)}
                >
                  <HiDownload /> Download Invoice
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          ) : modalType === 'refundDetails' ? (
            <div className="payment-details-modal">
              <div className="modal-section">
                <h4>Refund Request Details</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Refund ID:</label>
                    <span>{selectedPayment.id}</span>
                  </div>
                  <div className="info-item">
                    <label>Order ID:</label>
                    <span>{selectedPayment.orderId}</span>
                  </div>
                  <div className="info-item">
                    <label>Customer:</label>
                    <span>{selectedPayment.user}</span>
                  </div>
                  <div className="info-item">
                    <label>Amount:</label>
                    <span className="amount">{formatCurrency(selectedPayment.amount)}</span>
                  </div>
                  <div className="info-item">
                    <label>Reason:</label>
                    <span className="refund-reason">{selectedPayment.reason}</span>
                  </div>
                  <div className="info-item">
                    <label>Status:</label>
                    <span className={`status-badge status-${selectedPayment.status}`}>
                      {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                    </span>
                  </div>
                  <div className="info-item">
                    <label>Submitted:</label>
                    <span>{selectedPayment.submitted}</span>
                  </div>
                  {selectedPayment.processedDate && (
                    <div className="info-item">
                      <label>Processed Date:</label>
                      <span>{selectedPayment.processedDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedPayment.evidence && selectedPayment.evidence.length > 0 && (
                <div className="modal-section">
                  <h4>Evidence Attached</h4>
                  <div className="evidence-section">
                    {selectedPayment.evidence.map((file, index) => (
                      <div key={index} className="evidence-item">
                        <HiDocument className="evidence-icon" />
                        <span className="evidence-name">{file}</span>
                        <button 
                          className="btn-link"
                          onClick={() => showNotification(`${file} is ready for viewing`, 'info')}
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="modal-actions">
                {selectedPayment.status === 'pending' && (
                  <>
                    <button 
                      className="btn btn-success"
                      onClick={() => {
                        approveRefund(selectedPayment);
                        setShowModal(false);
                      }}
                    >
                      Approve Refund
                    </button>
                    <button 
                      className="btn btn-error"
                      onClick={() => {
                        rejectRefund(selectedPayment);
                        setShowModal(false);
                      }}
                    >
                      Reject Refund
                    </button>
                  </>
                )}
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          ) : null}
        </Modal>
      )}
    </div>
  );
};

export default PaymentManagement;