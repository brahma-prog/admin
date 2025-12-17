import React, { useState } from 'react';
import { 
  HiSearch, 
  HiFilter, 
  HiDownload, 
  HiCheckCircle,
  HiClock,
  HiCurrencyRupee,
  HiReceiptRefund,
  HiDocumentReport
} from 'react-icons/hi';
import Table from '../components/common/Table'; // Fixed path
import Modal from '../components/common/Modal'; // Fixed path
import SearchBar from '../components/common/SearchBar'; // Fixed path
import './PaymentManagement.css';

const PaymentManagement = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const transactions = [
    {
      id: 'TXN-2024-00123',
      orderId: 'ORD-2024-00123',
      user: 'Rajesh Kumar',
      amount: '₹1,245',
      type: 'order_payment',
      method: 'UPI',
      status: 'success',
      date: '2024-01-24 14:30',
      commission: '₹124'
    },
    {
      id: 'TXN-2024-00124',
      orderId: 'ORD-2024-00124',
      user: 'Priya Sharma',
      amount: '₹890',
      type: 'order_payment',
      method: 'Card',
      status: 'pending',
      date: '2024-01-24 14:25',
      commission: '₹89'
    },
    {
      id: 'TXN-2024-00125',
      orderId: 'CON-2024-00125',
      user: 'Amit Patel',
      amount: '₹500',
      type: 'consultation',
      method: 'Wallet',
      status: 'success',
      date: '2024-01-24 14:15',
      commission: '₹75'
    }
  ];

  const settlements = [
    {
      id: 'SET-2024-001',
      partner: 'Dr. Arjun Mehta',
      type: 'doctor',
      period: 'Jan 15-21, 2024',
      amount: '₹45,670',
      status: 'pending',
      dueDate: '2024-01-25'
    },
    {
      id: 'SET-2024-002',
      partner: 'Health Plus Pharmacy',
      type: 'pharmacy',
      period: 'Jan 15-21, 2024',
      amount: '₹1,23,450',
      status: 'processed',
      processedDate: '2024-01-22'
    },
    {
      id: 'SET-2024-003',
      partner: 'Amit Kumar',
      type: 'rider',
      period: 'Jan 15-21, 2024',
      amount: '₹12,340',
      status: 'pending',
      dueDate: '2024-01-25'
    }
  ];

  const refundRequests = [
    {
      id: 'REF-2024-001',
      orderId: 'ORD-2024-00119',
      user: 'Sneha Gupta',
      amount: '₹1,560',
      reason: 'Delivery delayed by 4 hours',
      status: 'pending',
      submitted: '2024-01-24 13:45'
    },
    {
      id: 'REF-2024-002',
      orderId: 'ORD-2024-00118',
      user: 'Vikram Singh',
      amount: '₹980',
      reason: 'Wrong medicine delivered',
      status: 'approved',
      submitted: '2024-01-24 12:30'
    }
  ];

  const columns = {
    transactions: [
      { key: 'id', label: 'Transaction ID' },
      { key: 'orderId', label: 'Order/Consult ID' },
      { key: 'user', label: 'Customer' },
      { key: 'amount', label: 'Amount' },
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
            >
              View
            </button>
            <button 
              className="btn-icon btn-sm"
              onClick={() => downloadReceipt(transaction)}
            >
              <HiDownload />
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
      { key: 'amount', label: 'Amount' },
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
            <button 
              className="btn btn-sm btn-success"
              onClick={() => processSettlement(settlement)}
              disabled={settlement.status === 'processed'}
            >
              Process
            </button>
            <button 
              className="btn-icon btn-sm"
              onClick={() => viewSettlementDetails(settlement)}
            >
              Details
            </button>
          </div>
        )
      }
    ],
    refunds: [
      { key: 'id', label: 'Refund ID' },
      { key: 'orderId', label: 'Order ID' },
      { key: 'user', label: 'Customer' },
      { key: 'amount', label: 'Amount' },
      { key: 'reason', label: 'Reason' },
      { 
        key: 'status', 
        label: 'Status',
        render: (status) => (
          <span className={`status-badge status-${status}`}>
            {status === 'approved' ? <HiCheckCircle /> : <HiClock />}
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
            <button 
              className="btn btn-sm btn-success"
              onClick={() => approveRefund(refund)}
              disabled={refund.status === 'approved'}
            >
              Approve
            </button>
            <button 
              className="btn btn-sm btn-error"
              onClick={() => rejectRefund(refund)}
              disabled={refund.status === 'approved'}
            >
              Reject
            </button>
          </div>
        )
      }
    ]
  };

  const viewTransactionDetails = (transaction) => {
    setSelectedPayment(transaction);
    setShowModal(true);
  };

  const downloadReceipt = (transaction) => {
    console.log('Download receipt for:', transaction.id);
  };

  const processSettlement = (settlement) => {
    if (window.confirm(`Process settlement ${settlement.id} for ${settlement.partner}?`)) {
      console.log('Process settlement:', settlement.id);
    }
  };

  const viewSettlementDetails = (settlement) => {
    setSelectedPayment(settlement);
    setShowModal(true);
  };

  const approveRefund = (refund) => {
    if (window.confirm(`Approve refund ${refund.id} for ${refund.amount}?`)) {
      console.log('Approve refund:', refund.id);
    }
  };

  const rejectRefund = (refund) => {
    if (window.confirm(`Reject refund request ${refund.id}?`)) {
      console.log('Reject refund:', refund.id);
    }
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'transactions': return transactions;
      case 'settlements': return settlements;
      case 'refunds': return refundRequests;
      default: return [];
    }
  };

  const financialSummary = {
    totalRevenue: '₹5,67,890',
    pendingSettlements: '₹2,34,560',
    platformCommission: '₹56,789',
    refundsPending: '₹2,540'
  };

  return (
    <div className="payment-management">
      <div className="page-header">
        <h1>Payments & Settlements</h1>
        <p>Manage financial transactions, partner payouts, and refund processing</p>
      </div>

      <div className="financial-summary card">
        <h3>Financial Overview</h3>
        <div className="summary-grid">
          <div className="summary-item revenue">
            <HiCurrencyRupee />
            <div>
              <div className="summary-value">{financialSummary.totalRevenue}</div>
              <div className="summary-label">Total Revenue</div>
            </div>
          </div>
          <div className="summary-item pending">
            <HiClock />
            <div>
              <div className="summary-value">{financialSummary.pendingSettlements}</div>
              <div className="summary-label">Pending Settlements</div>
            </div>
          </div>
          <div className="summary-item commission">
            <HiCurrencyRupee />
            <div>
              <div className="summary-value">{financialSummary.platformCommission}</div>
              <div className="summary-label">Platform Commission</div>
            </div>
          </div>
          <div className="summary-item refunds">
            <HiReceiptRefund />
            <div>
              <div className="summary-value">{financialSummary.refundsPending}</div>
              <div className="summary-label">Refunds Pending</div>
            </div>
          </div>
        </div>
      </div>

      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          <HiCurrencyRupee /> Transactions ({transactions.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'settlements' ? 'active' : ''}`}
          onClick={() => setActiveTab('settlements')}
        >
          <HiCheckCircle /> Settlements ({settlements.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'refunds' ? 'active' : ''}`}
          onClick={() => setActiveTab('refunds')}
        >
          <HiReceiptRefund /> Refund Requests ({refundRequests.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          <HiDocumentReport /> Reports
        </button>
      </div>

      <div className="management-toolbar">
        <div className="toolbar-left">
          <SearchBar
            placeholder={`Search ${activeTab}...`}
            onChange={() => {}}
          />
          <div className="date-range">
            <input type="date" className="form-input" defaultValue="2024-01-01" />
            <span>to</span>
            <input type="date" className="form-input" defaultValue="2024-01-24" />
          </div>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-outline">
            <HiFilter /> Advanced Filter
          </button>
          <button className="btn btn-outline">
            <HiDownload /> Export Data
          </button>
          {activeTab === 'settlements' && (
            <button className="btn btn-primary">
              Run Settlement Cycle
            </button>
          )}
        </div>
      </div>

      <div className="card">
        <Table
          columns={columns[activeTab]}
          data={getCurrentData()}
          emptyMessage={`No ${activeTab} found`}
        />
      </div>

      {activeTab === 'reports' && (
        <div className="reports-section grid grid-cols-2">
          <div className="card">
            <h4>GST Reports</h4>
            <div className="report-list">
              <div className="report-item">
                <span>January 2024 GST Report</span>
                <button className="btn btn-sm btn-outline">
                  <HiDownload /> Download
                </button>
              </div>
              <div className="report-item">
                <span>December 2023 GST Report</span>
                <button className="btn btn-sm btn-outline">
                  <HiDownload /> Download
                </button>
              </div>
              <div className="report-item">
                <span>Quarterly GST Summary (Q4 2023)</span>
                <button className="btn btn-sm btn-outline">
                  <HiDownload /> Download
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <h4>Financial Statements</h4>
            <div className="report-list">
              <div className="report-item">
                <span>Daily Revenue Report</span>
                <button className="btn btn-sm btn-outline">
                  <HiDownload /> Generate
                </button>
              </div>
              <div className="report-item">
                <span>Partner Payout Summary</span>
                <button className="btn btn-sm btn-outline">
                  <HiDownload /> Generate
                </button>
              </div>
              <div className="report-item">
                <span>Commission Report</span>
                <button className="btn btn-sm btn-outline">
                  <HiDownload /> Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && selectedPayment && (
        <Modal
          title={`${selectedPayment.id} Details`}
          onClose={() => setShowModal(false)}
          size="medium"
        >
          <div className="payment-details-modal">
            {activeTab === 'transactions' && (
              <div className="transaction-details">
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
                    <span className="amount">{selectedPayment.amount}</span>
                  </div>
                  <div className="info-item">
                    <label>Payment Method:</label>
                    <span>{selectedPayment.method}</span>
                  </div>
                  <div className="info-item">
                    <label>Status:</label>
                    <span className={`status-badge status-${selectedPayment.status}`}>
                      {selectedPayment.status}
                    </span>
                  </div>
                  <div className="info-item">
                    <label>Date & Time:</label>
                    <span>{selectedPayment.date}</span>
                  </div>
                  <div className="info-item">
                    <label>Platform Commission:</label>
                    <span>{selectedPayment.commission}</span>
                  </div>
                </div>
                
                <div className="transaction-breakdown">
                  <h5>Amount Breakdown</h5>
                  <div className="breakdown-item">
                    <span>Order Amount</span>
                    <span>₹1,120</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Taxes (18% GST)</span>
                    <span>₹125</span>
                  </div>
                  <div className="breakdown-item total">
                    <span>Total Amount</span>
                    <span>{selectedPayment.amount}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settlements' && (
              <div className="settlement-details">
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
                    <span>{selectedPayment.type}</span>
                  </div>
                  <div className="info-item">
                    <label>Period:</label>
                    <span>{selectedPayment.period}</span>
                  </div>
                  <div className="info-item">
                    <label>Amount:</label>
                    <span className="amount">{selectedPayment.amount}</span>
                  </div>
                  <div className="info-item">
                    <label>Status:</label>
                    <span className={`status-badge status-${selectedPayment.status}`}>
                      {selectedPayment.status}
                    </span>
                  </div>
                </div>
                
                <div className="settlement-actions">
                  {selectedPayment.status === 'pending' && (
                    <>
                      <button className="btn btn-success" onClick={() => processSettlement(selectedPayment)}>
                        Process Payment
                      </button>
                      <button className="btn btn-outline">
                        Download Invoice
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PaymentManagement;