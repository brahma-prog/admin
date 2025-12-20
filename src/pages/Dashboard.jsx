import React, { useState, useEffect, useRef } from 'react';
import { 
  HiUsers, 
  HiUserGroup, 
  HiShoppingBag, 
  HiTruck,
  HiShoppingCart,
  HiCurrencyDollar,
  HiExclamationCircle,
  HiArrowUp,
  HiArrowDown,
  HiRefresh,
  HiX,
  HiCheckCircle,
  HiClock,
  HiChartBar,
  HiChartPie,
  HiEye,
  HiDocumentText,
  HiShieldCheck,
  HiClipboardCheck,
  HiPaperAirplane
} from 'react-icons/hi';
import StatsCard from '../components/dashboard/StatsCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import PendingApprovals from '../components/dashboard/PendingApprovals';
import LineChart from '../components/charts/LineChart';
import PieChart from '../components/charts/PieChart';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    content: '',
    type: '',
    details: []
  });
  const [modalAction, setModalAction] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [actionCompleted, setActionCompleted] = useState(false);
  
  // Ref to track if component is mounted
  const isMounted = useRef(true);
  // Ref to track the refresh interval
  const refreshIntervalRef = useRef(null);
  // Ref to track last refresh time
  const lastRefreshTimeRef = useRef(Date.now());

  // Mock data for detailed views
  const mockData = {
    users: {
      title: 'Total Users Details',
      subtitle: 'User Statistics and Breakdown',
      content: 'Detailed breakdown of registered users across different categories',
      type: 'users',
      icon: <HiUsers />,
      details: [
        { label: 'Total Registered Users', value: '12,847', change: '+12%' },
        { label: 'Patients', value: '8,942', subValue: '69.6% of total' },
        { label: 'Doctors', value: '423', subValue: '3.3% of total' },
        { label: 'Pharmacists', value: '156', subValue: '1.2% of total' },
        { label: 'Delivery Partners', value: '289', subValue: '2.2% of total' },
        { label: 'Administrators', value: '37', subValue: '0.3% of total' },
        { label: 'Active (30 days)', value: '9,421', change: '+15%' },
        { label: 'New (This Month)', value: '1,542', change: '+8%' }
      ],
      insights: [
        'User base growing steadily month-over-month',
        'High engagement from patient users',
        'Delivery partner acquisition needs improvement'
      ]
    },
    doctors: {
      title: 'Active Doctors Details',
      subtitle: 'Medical Professionals Overview',
      content: 'Detailed analysis of doctor availability and specialties',
      type: 'doctors',
      icon: <HiUserGroup />,
      details: [
        { label: 'Active Doctors', value: '423', change: '+8%' },
        { label: 'General Physicians', value: '156', subValue: '36.9%' },
        { label: 'Gynecologists', value: '87', subValue: '20.6%' },
        { label: 'Pediatricians', value: '64', subValue: '15.1%' },
        { label: 'Cardiologists', value: '45', subValue: '10.6%' },
        { label: 'Other Specialties', value: '71', subValue: '16.8%' },
        { label: 'Online Now', value: '187', subValue: '44.2% online' },
        { label: 'On Leave', value: '23', subValue: '5.4% offline' }
      ],
      insights: [
        'Cardiologists showing highest demand',
        'Good distribution across specialties',
        'Online availability at optimal levels'
      ]
    },
    pharmacies: {
      title: 'Pharmacies Details',
      subtitle: 'Pharmacy Network Analysis',
      content: 'Complete overview of registered pharmacies and performance metrics',
      type: 'pharmacies',
      icon: <HiShoppingBag />,
      details: [
        { label: 'Registered Pharmacies', value: '156', change: '+5%' },
        { label: 'Active Pharmacies', value: '142', subValue: '91.0% active' },
        { label: '24x7 Service', value: '89', subValue: '63.0% of active' },
        { label: 'Specialized Pharmacies', value: '34', subValue: '23.9% of active' },
        { label: 'General Pharmacies', value: '33', subValue: '23.2% of active' },
        { label: 'Orders This Month', value: '4,567', change: '+18%' },
        { label: 'Avg. Order Value', value: '₹1,250', change: '+5%' },
        { label: 'Customer Rating', value: '4.7/5', subValue: '92% satisfaction' }
      ],
      insights: [
        'Strong growth in pharmacy network',
        'High customer satisfaction ratings',
        '24x7 availability meeting demand'
      ]
    },
    delivery: {
      title: 'Delivery Partners Details',
      subtitle: 'Logistics Performance Metrics',
      content: 'Delivery partner statistics and performance indicators',
      type: 'delivery',
      icon: <HiTruck />,
      details: [
        { label: 'Total Partners', value: '289', change: '-2%' },
        { label: 'Active Now', value: '187', subValue: '64.7% active' },
        { label: 'Avg. Rating', value: '4.7/5', subValue: '94% positive' },
        { label: 'On-time Delivery', value: '94%', change: '+2%' },
        { label: 'Current Deliveries', value: '47', subValue: '25.1% of active' },
        { label: 'Avg. Delivery Time', value: '32 min', subValue: 'Within SLA' },
        { label: 'Monthly Trips', value: '8,450', change: '+12%' },
        { label: 'Completion Rate', value: '98.5%', subValue: 'Excellent' }
      ],
      insights: [
        'On-time delivery performance excellent',
        'Slight decrease in partner count needs attention',
        'Customer satisfaction at all-time high'
      ]
    },
    orders: {
      title: 'Active Orders Details',
      subtitle: 'Real-time Order Tracking',
      content: 'Current order status and delivery performance',
      type: 'orders',
      icon: <HiShoppingCart />,
      details: [
        { label: 'Active Orders', value: '47', change: '+15%' },
        { label: 'Processing', value: '18', subValue: '38.3% of total' },
        { label: 'Out for Delivery', value: '23', subValue: '48.9% of total' },
        { label: 'Ready for Pickup', value: '6', subValue: '12.8% of total' },
        { label: 'Within 30 mins', value: '12', subValue: '25.5% on track' },
        { label: '30-60 mins ETA', value: '28', subValue: '59.6% on track' },
        { label: 'Today\'s Completed', value: '156', change: '+22%' },
        { label: 'Cancellation Rate', value: '2.3%', subValue: 'Low risk' }
      ],
      insights: [
        'Strong order growth continuing',
        'Most deliveries within acceptable timeframe',
        'Low cancellation rate indicates good service'
      ]
    },
    revenue: {
      title: 'Revenue Details',
      subtitle: 'Financial Performance Analysis',
      content: 'Daily revenue breakdown and comparative analysis',
      type: 'revenue',
      icon: <HiCurrencyDollar />,
      details: [
        { label: "Today's Revenue", value: '₹124,850', change: '+18%' },
        { label: 'Consultation Fees', value: '₹45,200', subValue: '36.2% of total' },
        { label: 'Medicine Orders', value: '₹68,450', subValue: '54.8% of total' },
        { label: 'Subscription', value: '₹11,200', subValue: '9.0% of total' },
        { label: 'Yesterday', value: '₹105,805', change: '+18%' },
        { label: 'Last Week (Same Day)', value: '₹98,340', change: '+27%' },
        { label: 'This Month', value: '₹2.45M', change: '+22%' },
        { label: 'Avg. Daily Revenue', value: '₹112,500', change: '+15%' }
      ],
      insights: [
        'Strong revenue growth continuing',
        'Medicine orders driving majority of revenue',
        'Subscription revenue showing steady growth'
      ]
    },
    platformGrowth: {
      title: 'Platform Growth Analysis',
      subtitle: 'Comprehensive Growth Metrics',
      content: 'Detailed analytics showing user growth, revenue trends, and platform engagement metrics',
      type: 'chart',
      icon: <HiChartBar />,
      details: [
        { label: 'Total User Growth (YoY)', value: '+42%', subValue: '8,942 → 12,847' },
        { label: 'Revenue Growth (YoY)', value: '+65%', subValue: '₹1.48M → ₹2.45M' },
        { label: 'Doctor Acquisition', value: '+28%', subValue: '330 → 423' },
        { label: 'Pharmacy Partners', value: '+32%', subValue: '118 → 156' },
        { label: 'Monthly Active Users', value: '9,421', change: '+15%' },
        { label: 'Avg. Session Duration', value: '8.5 min', change: '+12%' },
        { label: 'Customer Retention', value: '87%', subValue: 'Industry: 75%' },
        { label: 'NPS Score', value: '68', subValue: 'Excellent (Industry: 42)' }
      ],
      insights: [
        'Platform experiencing hyper-growth across all metrics',
        'User engagement exceeding industry standards',
        'Strong network effects driving organic growth'
      ]
    },
    orderDistribution: {
      title: 'Order Distribution Analysis',
      subtitle: 'Order Status and Performance Metrics',
      content: 'Complete breakdown of order distribution by status and category',
      type: 'chart',
      icon: <HiChartPie />,
      details: [
        { label: 'Total Orders (Month)', value: '12,456', change: '+25%' },
        { label: 'Completed Orders', value: '8,096', subValue: '65% of total' },
        { label: 'Processing Orders', value: '2,491', subValue: '20% of total' },
        { label: 'Pending Orders', value: '1,246', subValue: '10% of total' },
        { label: 'Cancelled Orders', value: '623', subValue: '5% of total' },
        { label: 'Avg. Processing Time', value: '18 min', change: '-15%' },
        { label: 'Same Day Delivery', value: '94%', subValue: 'Within SLA' },
        { label: 'Customer Satisfaction', value: '4.8/5', change: '+3%' }
      ],
      insights: [
        'Excellent order completion rate',
        'Processing times improving steadily',
        'Low cancellation rate indicates good operations'
      ]
    },
    criticalAlerts: {
      title: 'Critical Alerts Dashboard',
      subtitle: 'Active System Alerts and Notifications',
      content: 'Complete overview of all system alerts requiring immediate attention',
      type: 'alerts',
      icon: <HiExclamationCircle />,
      alerts: [
        { 
          type: 'high-risk', 
          title: 'High-Risk Pregnancy Consultation',
          status: 'Active',
          priority: 'high',
          time: '45 minutes',
          action: 'Monitor closely'
        },
        { 
          type: 'compliance', 
          title: 'Doctor License Expiry',
          status: 'Active',
          priority: 'medium',
          time: '3-6 days',
          action: 'Notify and renew'
        },
        { 
          type: 'order', 
          title: 'Order Delays Beyond SLA',
          status: 'Active',
          priority: 'high',
          time: '25-60 mins',
          action: 'Escalate to logistics'
        },
        { 
          type: 'payment', 
          title: 'Payment Gateway Issues',
          status: 'Active',
          priority: 'medium',
          time: '45 mins duration',
          action: 'Activate backup'
        },
        { 
          type: 'server', 
          title: 'High Server Load',
          status: 'Active',
          priority: 'medium',
          time: '30 mins',
          action: 'Scale resources'
        },
        { 
          type: 'security', 
          title: 'Multiple Failed Logins',
          status: 'Active',
          priority: 'high',
          time: 'Last 15 mins',
          action: 'Review and block'
        }
      ],
      summary: {
        high: 3,
        medium: 3,
        low: 0,
        total: 6
      }
    },
    pendingApprovals: {
      title: 'Pending Approvals Dashboard',
      subtitle: 'Items Awaiting Authorization',
      content: 'Complete list of all pending approvals across different categories',
      type: 'approvals',
      icon: <HiClock />,
      approvals: [
        { 
          id: 1,
          category: 'Doctor Registrations',
          count: 12,
          pendingSince: '1-3 days',
          action: 'Verify credentials',
          items: [
            { id: 101, name: 'Dr. Rajesh Kumar', specialization: 'Cardiology', status: 'pending', time: '3 days ago' },
            { id: 102, name: 'Dr. Priya Sharma', specialization: 'Gynecology', status: 'pending', time: '2 days ago' },
            { id: 103, name: 'Dr. Amit Patel', specialization: 'Pediatrics', status: 'pending', time: '1 day ago' }
          ]
        },
        { 
          id: 2,
          category: 'Pharmacy Applications',
          count: 8,
          pendingSince: '2-4 days',
          action: 'Validate documents',
          items: [
            { id: 201, name: 'QuickMed Pharmacy', location: 'Mumbai', status: 'pending', time: '4 days ago' },
            { id: 202, name: 'HealthPlus', location: 'Delhi', status: 'pending', time: '3 days ago' }
          ]
        },
        { 
          id: 3,
          category: 'Prescription Reviews',
          count: 15,
          pendingSince: '0-1 days',
          action: 'Medical review',
          items: [
            { id: 301, patient: 'Patient ID: PT-4521', doctor: 'Dr. Sharma', status: 'pending', time: 'Today' },
            { id: 302, patient: 'Patient ID: PT-6789', doctor: 'Dr. Gupta', status: 'pending', time: 'Today' }
          ]
        },
        { 
          id: 4,
          category: 'Refund Requests',
          count: 7,
          pendingSince: '1-2 days',
          action: 'Process refunds',
          items: [
            { id: 401, order: '#ORD-78451', amount: '₹2,500', status: 'pending', time: '2 days ago' },
            { id: 402, order: '#ORD-78452', amount: '₹1,800', status: 'pending', time: '1 day ago' }
          ]
        },
        { 
          id: 5,
          category: 'Content Moderation',
          count: 23,
          pendingSince: '0-2 days',
          action: 'Review content',
          items: [
            { id: 501, type: 'Product Review', user: 'User123', status: 'pending', time: '1 day ago' },
            { id: 502, type: 'Doctor Review', user: 'User456', status: 'pending', time: 'Today' }
          ]
        },
        { 
          id: 6,
          category: 'Partner Onboarding',
          count: 5,
          pendingSince: '3-5 days',
          action: 'Complete KYC',
          items: [
            { id: 601, name: 'Logistics Partner A', type: 'Delivery', status: 'pending', time: '5 days ago' },
            { id: 602, name: 'Pharmacy Chain B', type: 'Supply', status: 'pending', time: '3 days ago' }
          ]
        }
      ],
      summary: {
        total: 70,
        urgent: 22,
        routine: 48
      }
    },
    recentActivity: {
      title: 'Complete Activity Log',
      subtitle: 'Platform Activity (Last 24 Hours)',
      content: 'Detailed chronological record of all platform activities',
      type: 'activities',
      icon: <HiCheckCircle />,
      activities: [
        { time: '10:30 AM', action: 'New user registration: Amit Patel', type: 'user' },
        { time: '10:45 AM', action: 'Doctor consultation completed: Dr. Sharma', type: 'consultation' },
        { time: '11:15 AM', action: 'Order #ORD-78451 placed', type: 'order' },
        { time: '11:30 AM', action: 'Pharmacy registration: QuickMed', type: 'pharmacy' },
        { time: '12:00 PM', action: 'Payment received: ₹2,500', type: 'payment' },
        { time: '12:45 PM', action: 'Delivery partner onboarded: DP-789', type: 'delivery' },
        { time: '1:30 PM', action: 'Prescription uploaded: Patient ID PT-4521', type: 'prescription' },
        { time: '2:15 PM', action: 'Medicine order delivered', type: 'delivery' },
        { time: '3:00 PM', action: 'New doctor verification: Dr. Gupta', type: 'doctor' },
        { time: '3:45 PM', action: 'System backup completed', type: 'system' },
        { time: '4:30 PM', action: 'Customer support ticket resolved', type: 'support' },
        { time: '5:15 PM', action: 'Monthly report generated', type: 'report' }
      ],
      summary: {
        total: 156,
        today: 12,
        users: 42,
        orders: 67,
        other: 47
      }
    },
    refresh: {
      title: 'Data Refresh Complete',
      subtitle: 'Dashboard Updated Successfully',
      content: 'All dashboard metrics and charts have been refreshed with the latest data from the server.',
      type: 'refresh',
      icon: <HiRefresh />,
      details: [
        { label: 'Last Refresh Time', value: new Date().toLocaleTimeString() },
        { label: 'Data Source', value: 'Production Database' },
        { label: 'Update Duration', value: '15 minitus' },
        { label: 'Cache Status', value: 'Updated Successfully' }
      ],
      insights: [
        'Real-time data synchronization complete',
        'All metrics updated successfully',
        'Charts re-rendered with fresh data'
      ]
    }
  };

  const stats = [
    {
      title: 'Total Users',
      value: '12,847',
      change: '+12%',
      trend: 'up',
      icon: <HiUsers />,
      color: 'var(--primary)',
      onClick: () => openModal(mockData.users)
    },
    {
      title: 'Active Doctors',
      value: '423',
      change: '+8%',
      trend: 'up',
      icon: <HiUserGroup />,
      color: 'var(--info)',
      onClick: () => openModal(mockData.doctors)
    },
    {
      title: 'Pharmacies',
      value: '156',
      change: '+5%',
      trend: 'up',
      icon: <HiShoppingBag />,
      color: 'var(--success)',
      onClick: () => openModal(mockData.pharmacies)
    },
    {
      title: 'Delivery Partners',
      value: '289',
      change: '-2%',
      trend: 'down',
      icon: <HiTruck />,
      color: 'var(--warning)',
      onClick: () => openModal(mockData.delivery)
    },
    {
      title: 'Active Orders',
      value: '47',
      change: '+15%',
      trend: 'up',
      icon: <HiShoppingCart />,
      color: 'var(--mint)',
      onClick: () => openModal(mockData.orders)
    },
    {
      title: 'Revenue Today',
      value: '₹124,850',
      change: '+18%',
      trend: 'up',
      icon: <HiCurrencyDollar />,
      color: 'var(--success)',
      onClick: () => openModal(mockData.revenue)
    }
  ];

  // Renamed this variable from 'criticalAlerts' to avoid conflict with global alert function
  const dashboardAlerts = [
    { 
      id: 1, 
      type: 'high-risk', 
      message: 'High-risk pregnancy consultation in progress', 
      priority: 'high',
      details: mockData.alerts?.highRisk || {}
    },
    { 
      id: 2, 
      type: 'compliance', 
      message: '3 doctor licenses expiring this week', 
      priority: 'medium',
      details: mockData.alerts?.compliance || {}
    },
    { 
      id: 3, 
      type: 'order', 
      message: '5 orders delayed beyond SLA', 
      priority: 'high',
      details: mockData.alerts?.orderDelay || {}
    },
    { 
      id: 4, 
      type: 'payment', 
      message: 'Payment gateway experiencing issues', 
      priority: 'medium',
      details: mockData.alerts?.payment || {}
    },
  ];

  const refreshData = (isAutoRefresh = false) => {
    setLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setLoading(false);
      
      // Only show modal for manual refresh
      if (!isAutoRefresh) {
        openModal(mockData.refresh);
      }
      
      // Update last refresh time
      lastRefreshTimeRef.current = Date.now();
    }, 1200);
  };

  const openModal = (content, action = null) => {
    setModalContent(content);
    setShowModal(true);
    setModalAction(action);
    setSelectedItems([]);
    setActionCompleted(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalAction(null);
    setSelectedItems([]);
    setActionCompleted(false);
  };

  const handleTakeAction = (type) => {
    if (type === 'alerts') {
      openModal(mockData.criticalAlerts, 'takeAction');
    } else if (type === 'approvals') {
      openModal(mockData.pendingApprovals, 'processAll');
    }
  };

  const handleReview = (approvalId) => {
    const approval = mockData.pendingApprovals.approvals.find(a => a.id === approvalId);
    if (approval) {
      openModal({
        title: `Review ${approval.category}`,
        subtitle: 'Detailed review and action panel',
        content: `Review all pending items in ${approval.category.toLowerCase()}`,
        type: 'review',
        icon: <HiEye />,
        approval: approval,
        items: approval.items || []
      }, 'review');
    }
  };

  const handleSelectItem = (itemId, categoryId) => {
    setSelectedItems(prev => {
      const itemKey = `${categoryId}-${itemId}`;
      if (prev.includes(itemKey)) {
        return prev.filter(key => key !== itemKey);
      } else {
        return [...prev, itemKey];
      }
    });
  };

  const handleSelectAll = (categoryId) => {
    const approval = mockData.pendingApprovals.approvals.find(a => a.id === categoryId);
    if (approval && approval.items) {
      const allKeys = approval.items.map(item => `${categoryId}-${item.id}`);
      setSelectedItems(prev => {
        // If all are already selected, deselect all
        const allSelected = allKeys.every(key => prev.includes(key));
        if (allSelected) {
          return prev.filter(key => !allKeys.includes(key));
        } else {
          // Add missing ones
          const newKeys = allKeys.filter(key => !prev.includes(key));
          return [...prev, ...newKeys];
        }
      });
    }
  };

  const handleProcessSelected = () => {
    if (selectedItems.length === 0) {
      // Use window.alert to avoid conflict with the 'alert' variable
      window.alert('Please select at least one item to process');
      return;
    }

    setProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setProcessing(false);
      setActionCompleted(true);
      
      // Update mock data (in real app, this would be an API call)
      selectedItems.forEach(itemKey => {
        const [categoryId, itemId] = itemKey.split('-').map(Number);
        const category = mockData.pendingApprovals.approvals.find(c => c.id === categoryId);
        if (category && category.items) {
          const item = category.items.find(i => i.id === itemId);
          if (item) {
            item.status = 'approved';
            item.processedAt = new Date().toLocaleTimeString();
            category.count = Math.max(0, category.count - 1);
          }
        }
      });
    }, 2000);
  };

  const handleApproveAll = () => {
    if (!modalContent.approval) return;

    setProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setProcessing(false);
      setActionCompleted(true);
      
      // Update all items in this category
      modalContent.approval.items.forEach(item => {
        item.status = 'approved';
        item.processedAt = new Date().toLocaleTimeString();
      });
      
      // Update count
      modalContent.approval.count = 0;
    }, 2000);
  };

  const handleResolveAlert = (alertIndex) => {
    const updatedAlerts = [...mockData.criticalAlerts.alerts];
    updatedAlerts[alertIndex].status = 'Resolved';
    updatedAlerts[alertIndex].resolvedAt = new Date().toLocaleTimeString();
    
    // Update mock data
    mockData.criticalAlerts.alerts = updatedAlerts;
    
    // Show success message - use window.alert to avoid conflict
    setTimeout(() => {
      window.alert('Alert marked as resolved successfully!');
    }, 100);
    
    // Refresh modal
    setTimeout(() => {
      openModal({...mockData.criticalAlerts}, 'takeAction');
    }, 500);
  };

  const handleResolveAllAlerts = () => {
    mockData.criticalAlerts.alerts.forEach(alert => {
      alert.status = 'Resolved';
      alert.resolvedAt = new Date().toLocaleTimeString();
    });
    
    // Show success message - use window.alert to avoid conflict
    setTimeout(() => {
      window.alert('All alerts have been resolved successfully!');
    }, 100);
    
    // Refresh modal
    setTimeout(() => {
      openModal({...mockData.criticalAlerts}, 'takeAction');
    }, 500);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'var(--error)';
      case 'medium': return 'var(--warning)';
      case 'low': return 'var(--info)';
      default: return 'var(--text)';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'var(--success)';
      case 'pending': return 'var(--warning)';
      case 'rejected': return 'var(--error)';
      default: return 'var(--softtext)';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'user': return 'var(--primary)';
      case 'consultation': return 'var(--info)';
      case 'order': return 'var(--success)';
      case 'doctor': return 'var(--warning)';
      case 'delivery': return 'var(--mint)';
      default: return 'var(--softtext)';
    }
  };

  // Function to check if we need to refresh based on last refresh time
  const checkAndRefreshIfNeeded = () => {
    const currentTime = Date.now();
    const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
    
    // Check if 30 minutes have passed since last refresh
    if (currentTime - lastRefreshTimeRef.current >= thirtyMinutes) {
      console.log('Auto-refresh triggered after 30 minutes');
      refreshData(true);
    }
  };

  // Initialize data on mount (without auto-refresh)
  const initializeData = () => {
    setLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setLoading(false);
      lastRefreshTimeRef.current = Date.now();
    }, 500);
  };

  useEffect(() => {
    isMounted.current = true;
    
    // Initialize data without refresh
    initializeData();
    
    // Set up the interval for checking refresh (check every minute)
    refreshIntervalRef.current = setInterval(() => {
      if (isMounted.current) {
        checkAndRefreshIfNeeded();
      }
    }, 60000); // Check every minute
    
    // Also set up a direct 30-minute interval for auto-refresh
    const autoRefreshInterval = setInterval(() => {
      if (isMounted.current) {
        console.log('30-minute interval refresh triggered');
        refreshData(true);
      }
    }, 30 * 60 * 1000); // 30 minutes in milliseconds
    
    return () => {
      isMounted.current = false;
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
      clearInterval(autoRefreshInterval);
    };
  }, []);

  return (
    <div className="dashboard">
      <div className="page-header">
        <div className="header-row">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {user?.name}! Here's what's happening with your platform today.</p>
          </div>
          <div className="header-actions">
            <button 
              className="btn btn-outline" 
              onClick={() => refreshData(false)}
              disabled={loading}
            >
              <HiRefresh className={loading ? 'spin' : ''} /> 
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </button>
            <div className="last-updated">
              Last updated: {lastUpdated.toLocaleTimeString()}
              <div className="next-refresh-info">
                Auto-refresh in: {Math.max(0, Math.floor((30 * 60 * 1000 - (Date.now() - lastRefreshTimeRef.current)) / 60000))} minutes
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-warning">
        <HiExclamationCircle />
        <div>
          <strong>System Notification:</strong> Platform maintenance scheduled for Sunday, 2 AM - 4 AM.
          <div className="refresh-notice">
            Data auto-refreshes every 30 minutes. Last auto-refresh: {new Date(lastRefreshTimeRef.current).toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatsCard 
            key={index} 
            {...stat}
            onClick={stat.onClick}
          />
        ))}
      </div>

      <div className="dashboard-content grid grid-cols-2">
        <div className="chart-section card">
          <div className="section-header">
            <h3>Platform Growth Overview</h3>
            <button 
              className="btn btn-sm btn-outline"
              onClick={() => openModal(mockData.platformGrowth)}
            >
              View Details
            </button>
          </div>
          <LineChart />
        </div>
        
        <div className="chart-section card">
          <div className="section-header">
            <h3>Order Status Distribution</h3>
            <button 
              className="btn btn-sm btn-outline"
              onClick={() => openModal(mockData.orderDistribution)}
            >
              View Details
            </button>
          </div>
          <PieChart />
        </div>
      </div>

      <div className="dashboard-content grid grid-cols-2">
        <div className="card">
          <div className="section-header">
            <h3>Critical Alerts</h3>
            <button 
              className="btn btn-sm btn-outline"
              onClick={() => handleTakeAction('alerts')}
            >
              Take Action
            </button>
          </div>
          <div className="alerts-list">
            {dashboardAlerts.map(alert => (
              <div key={alert.id} className={`alert-item ${alert.priority}`}>
                <div className="alert-indicator"></div>
                <div className="alert-content">
                  <p className="alert-message">{alert.message}</p>
                  <div className="alert-meta">
                    <span className="alert-type">{alert.type}</span>
                    <span className="alert-time">Just now</span>
                  </div>
                </div>
                <button 
                  className="btn btn-sm btn-outline"
                  onClick={() => handleTakeAction('alerts')}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="section-header">
            <h3>Pending Approvals</h3>
            <button 
              className="btn btn-sm btn-outline"
              onClick={() => handleTakeAction('approvals')}
            >
              Process All
            </button>
          </div>
          <PendingApprovals 
            onReview={handleReview}
            approvals={mockData.pendingApprovals.approvals}
          />
        </div>
      </div>

      <div className="card">
        <div className="section-header">
          <h3>Recent Activity</h3>
          <button 
            className="btn btn-sm btn-outline"
            onClick={() => openModal(mockData.recentActivity)}
          >
            View All
          </button>
        </div>
        <RecentActivity />
      </div>

      {/* Enhanced Modal Popup */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <div className="modal-icon">
                  {modalContent.icon}
                </div>
                <div>
                  <h3>{modalContent.title}</h3>
                  <p className="modal-subtitle">{modalContent.subtitle}</p>
                </div>
              </div>
              <button className="btn btn-icon" onClick={closeModal}>
                <HiX />
              </button>
            </div>
            
            <div className="modal-body">
              <p className="modal-description">{modalContent.content}</p>
              
              {/* Details Grid for stats/charts */}
              {modalContent.details && !modalAction && (
                <div className="details-grid">
                  {modalContent.details.map((detail, index) => (
                    <div key={index} className="detail-card">
                      <div className="detail-label">{detail.label}</div>
                      <div className="detail-value">
                        {detail.value}
                        {detail.change && (
                          <span className={`change-badge ${detail.change.includes('+') ? 'positive' : 'negative'}`}>
                            {detail.change}
                          </span>
                        )}
                      </div>
                      {detail.subValue && (
                        <div className="detail-subvalue">{detail.subValue}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Action Panel for Approvals */}
              {modalAction === 'processAll' && modalContent.approvals && (
                <div className="action-panel">
                  <div className="action-header">
                    <h4>Pending Approvals Management</h4>
                    <div className="action-stats">
                      <span className="stat-item">
                        <span className="stat-label">Total Items:</span>
                        <span className="stat-value">{modalContent.summary?.total || 0}</span>
                      </span>
                      <span className="stat-item">
                        <span className="stat-label">Urgent:</span>
                        <span className="stat-value urgent">{modalContent.summary?.urgent || 0}</span>
                      </span>
                      <span className="stat-item">
                        <span className="stat-label">Selected:</span>
                        <span className="stat-value">{selectedItems.length}</span>
                      </span>
                    </div>
                  </div>
                  
                  {actionCompleted ? (
                    <div className="action-completed">
                      <HiCheckCircle className="success-icon-large" />
                      <h4>Action Completed Successfully!</h4>
                      <p>Selected items have been processed. Changes will reflect shortly.</p>
                      <button className="btn btn-primary" onClick={closeModal}>
                        Close
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="approvals-action-list">
                        {modalContent.approvals.map((approval) => (
                          <div key={approval.id} className="approval-action-card">
                            <div className="approval-action-header">
                              <div className="approval-action-title">
                                <input
                                  type="checkbox"
                                  checked={approval.items?.every(item => 
                                    selectedItems.includes(`${approval.id}-${item.id}`)
                                  )}
                                  onChange={() => handleSelectAll(approval.id)}
                                  className="action-checkbox"
                                />
                                <h5>{approval.category}</h5>
                                <span className="approval-count-badge">{approval.count} items</span>
                              </div>
                              <button 
                                className="btn btn-sm btn-outline"
                                onClick={() => handleReview(approval.id)}
                              >
                                <HiEye /> Review
                              </button>
                            </div>
                            
                            {approval.items && approval.items.length > 0 && (
                              <div className="approval-items-list">
                                {approval.items.map((item) => (
                                  <div key={item.id} className="approval-item-row">
                                    <input
                                      type="checkbox"
                                      checked={selectedItems.includes(`${approval.id}-${item.id}`)}
                                      onChange={() => handleSelectItem(item.id, approval.id)}
                                      className="item-checkbox"
                                    />
                                    <div className="item-details">
                                      <div className="item-name">
                                        {item.name || item.patient || item.order || item.type}
                                        {item.specialization && (
                                          <span className="item-specialization">{item.specialization}</span>
                                        )}
                                      </div>
                                      <div className="item-meta">
                                        {item.location && <span>{item.location}</span>}
                                        {item.doctor && <span>Doctor: {item.doctor}</span>}
                                        {item.amount && <span>Amount: {item.amount}</span>}
                                        {item.user && <span>User: {item.user}</span>}
                                        <span className="item-time">{item.time}</span>
                                      </div>
                                    </div>
                                    <span 
                                      className="item-status"
                                      style={{ color: getStatusColor(item.status) }}
                                    >
                                      {item.status}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="action-buttons">
                        <button 
                          className="btn btn-secondary"
                          onClick={() => setSelectedItems([])}
                          disabled={selectedItems.length === 0}
                        >
                          Clear Selection
                        </button>
                        <button 
                          className="btn btn-primary"
                          onClick={handleProcessSelected}
                          disabled={selectedItems.length === 0 || processing}
                        >
                          {processing ? (
                            <>
                              <HiRefresh className="spin" /> Processing...
                            </>
                          ) : (
                            <>
                              <HiCheckCircle /> Process Selected ({selectedItems.length})
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
              
              {/* Review Panel */}
              {modalAction === 'review' && modalContent.approval && (
                <div className="review-panel">
                  <div className="review-header">
                    <h4>Review: {modalContent.approval.category}</h4>
                    <div className="review-stats">
                      <span className="stat-item">
                        <span className="stat-label">Total Pending:</span>
                        <span className="stat-value">{modalContent.approval.count}</span>
                      </span>
                      <span className="stat-item">
                        <span className="stat-label">Pending Since:</span>
                        <span className="stat-value">{modalContent.approval.pendingSince}</span>
                      </span>
                    </div>
                  </div>
                  
                  {actionCompleted ? (
                    <div className="action-completed">
                      <HiCheckCircle className="success-icon-large" />
                      <h4>All Items Approved!</h4>
                      <p>All items in this category have been successfully approved.</p>
                      <button className="btn btn-primary" onClick={closeModal}>
                        Close
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="review-items">
                        {modalContent.items.map((item) => (
                          <div key={item.id} className="review-item-card">
                            <div className="review-item-header">
                              <h5>
                                {item.name || item.patient || item.order || item.type}
                                {item.status === 'approved' && (
                                  <span className="approved-badge">Approved</span>
                                )}
                              </h5>
                              <span className="review-item-time">{item.time}</span>
                            </div>
                            
                            <div className="review-item-details">
                              {item.specialization && (
                                <div className="detail-row">
                                  <span className="detail-label">Specialization:</span>
                                  <span className="detail-value">{item.specialization}</span>
                                </div>
                              )}
                              {item.location && (
                                <div className="detail-row">
                                  <span className="detail-label">Location:</span>
                                  <span className="detail-value">{item.location}</span>
                                </div>
                              )}
                              {item.doctor && (
                                <div className="detail-row">
                                  <span className="detail-label">Doctor:</span>
                                  <span className="detail-value">{item.doctor}</span>
                                </div>
                              )}
                              {item.amount && (
                                <div className="detail-row">
                                  <span className="detail-label">Amount:</span>
                                  <span className="detail-value">{item.amount}</span>
                                </div>
                              )}
                              {item.user && (
                                <div className="detail-row">
                                  <span className="detail-label">User:</span>
                                  <span className="detail-value">{item.user}</span>
                                </div>
                              )}
                            </div>
                            
                            {item.status === 'pending' && (
                              <div className="review-item-actions">
                                <button 
                                  className="btn btn-sm btn-outline btn-danger"
                                  onClick={() => {
                                    item.status = 'rejected';
                                    item.processedAt = new Date().toLocaleTimeString();
                                    modalContent.approval.count -= 1;
                                    setModalContent({...modalContent});
                                  }}
                                >
                                  Reject
                                </button>
                                <button 
                                  className="btn btn-sm btn-primary"
                                  onClick={() => {
                                    item.status = 'approved';
                                    item.processedAt = new Date().toLocaleTimeString();
                                    modalContent.approval.count -= 1;
                                    setModalContent({...modalContent});
                                  }}
                                >
                                  Approve
                                </button>
                              </div>
                            )}
                            
                            {item.processedAt && (
                              <div className="review-item-processed">
                                <HiClock /> Processed at: {item.processedAt}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="review-bulk-actions">
                        <button 
                          className="btn btn-primary"
                          onClick={handleApproveAll}
                          disabled={processing || modalContent.approval.count === 0}
                        >
                          {processing ? (
                            <>
                              <HiRefresh className="spin" /> Processing...
                            </>
                          ) : (
                            <>
                              <HiCheckCircle /> Approve All ({modalContent.approval.count})
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
              
              {/* Alerts Action Panel */}
              {modalAction === 'takeAction' && modalContent.alerts && (
                <div className="alerts-action-panel">
                  <div className="alerts-action-header">
                    <h4>Critical Alerts Management</h4>
                    <div className="alerts-summary-grid">
                      <div className="summary-card high">
                        <span className="summary-card-label">High Priority</span>
                        <span className="summary-card-value">{modalContent.summary?.high || 0}</span>
                      </div>
                      <div className="summary-card medium">
                        <span className="summary-card-label">Medium Priority</span>
                        <span className="summary-card-value">{modalContent.summary?.medium || 0}</span>
                      </div>
                      <div className="summary-card total">
                        <span className="summary-card-label">Total Alerts</span>
                        <span className="summary-card-value">{modalContent.summary?.total || 0}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="alerts-action-list">
                    {modalContent.alerts.map((alert, index) => (
                      <div key={index} className="alert-action-card">
                        <div 
                          className="alert-action-priority" 
                          style={{ backgroundColor: getPriorityColor(alert.priority) }}
                        ></div>
                        <div className="alert-action-content">
                          <div className="alert-action-header">
                            <h5>{alert.title}</h5>
                            <div className="alert-action-status">
                              <span className={`priority-badge ${alert.priority}`}>
                                {alert.priority}
                              </span>
                              <span className={`status-badge ${alert.status === 'Resolved' ? 'resolved' : 'active'}`}>
                                {alert.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="alert-action-details">
                            <div className="detail-group">
                              <span className="detail-label">Status:</span>
                              <span className="detail-value">{alert.status}</span>
                            </div>
                            <div className="detail-group">
                              <span className="detail-label">Time:</span>
                              <span className="detail-value">{alert.time}</span>
                            </div>
                            <div className="detail-group">
                              <span className="detail-label">Action Required:</span>
                              <span className="detail-value action-required">{alert.action}</span>
                            </div>
                          </div>
                          
                          {alert.resolvedAt && (
                            <div className="alert-resolved-info">
                              <HiCheckCircle className="resolved-icon" />
                              <span>Resolved at: {alert.resolvedAt}</span>
                            </div>
                          )}
                          
                          {alert.status !== 'Resolved' && (
                            <div className="alert-action-buttons">
                              <button 
                                className="btn btn-sm btn-outline"
                                onClick={() => {
                                  // Show more details - use window.alert to avoid conflict
                                  window.alert(`More details for ${alert.title}:\n\nPriority: ${alert.priority}\nStatus: ${alert.status}\nTime: ${alert.time}\nAction: ${alert.action}`);
                                }}
                              >
                                <HiEye /> View Details
                              </button>
                              <button 
                                className="btn btn-sm btn-primary"
                                onClick={() => handleResolveAlert(index)}
                              >
                                <HiCheckCircle /> Mark as Resolved
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="alerts-bulk-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={handleResolveAllAlerts}
                    >
                      <HiCheckCircle /> Resolve All Alerts
                    </button>
                  </div>
                </div>
              )}
              
              {/* Insights Section */}
              {modalContent.insights && !modalAction && (
                <div className="insights-section">
                  <h4 className="insights-title">Key Insights</h4>
                  <div className="insights-list">
                    {modalContent.insights.map((insight, index) => (
                      <div key={index} className="insight-item">
                        <HiCheckCircle className="insight-icon" />
                        <span className="insight-text">{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Activities List */}
              {modalContent.activities && !modalAction && (
                <div className="activities-container">
                  <div className="activities-summary">
                    <div className="summary-item">
                      <span className="summary-label">Today's Activities</span>
                      <span className="summary-value">{modalContent.summary?.today || 0}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">User Activities</span>
                      <span className="summary-value">{modalContent.summary?.users || 0}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Order Activities</span>
                      <span className="summary-value">{modalContent.summary?.orders || 0}</span>
                    </div>
                  </div>
                  
                  <div className="activities-timeline">
                    {modalContent.activities.map((activity, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-time" style={{ color: getTypeColor(activity.type) }}>
                          {activity.time}
                        </div>
                        <div className="timeline-content">
                          <div className="timeline-dot" style={{ backgroundColor: getTypeColor(activity.type) }}></div>
                          <div className="timeline-action">
                            <span className="action-text">{activity.action}</span>
                            <span className="action-type" style={{ color: getTypeColor(activity.type) }}>
                              {activity.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Refresh Status */}
              {modalContent.type === 'refresh' && !modalAction && (
                <div className="refresh-status">
                  <div className="refresh-success">
                    <HiCheckCircle className="success-icon" />
                    <span className="success-text">Data refresh completed successfully!</span>
                  </div>
                  <div className="refresh-metrics">
                    <div className="refresh-metric">
                      <span className="metric-label">Refresh Time:</span>
                      <span className="metric-value">{lastUpdated.toLocaleTimeString()}</span>
                    </div>
                    <div className="refresh-metric">
                      <span className="metric-label">Data Freshness:</span>
                      <span className="metric-value">Real-time (0 seconds ago)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-actions">
              {!modalAction && (
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              )}
              
              {modalAction === 'takeAction' && (
                <>
                  <button className="btn btn-secondary" onClick={closeModal}>
                    Close
                  </button>
                  <button className="btn btn-primary" onClick={() => handleResolveAllAlerts()}>
                    <HiCheckCircle /> Resolve All
                  </button>
                </>
              )}
              
              {modalAction === 'processAll' && !actionCompleted && (
                <>
                  <button className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={handleProcessSelected}
                    disabled={selectedItems.length === 0 || processing}
                  >
                    {processing ? (
                      <>
                        <HiRefresh className="spin" /> Processing...
                      </>
                    ) : (
                      <>
                        <HiCheckCircle /> Process Selected
                      </>
                    )}
                  </button>
                </>
              )}
              
              {modalAction === 'review' && !actionCompleted && (
                <>
                  <button className="btn btn-secondary" onClick={closeModal}>
                    Close
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={handleApproveAll}
                    disabled={processing || modalContent.approval.count === 0}
                  >
                    {processing ? (
                      <>
                        <HiRefresh className="spin" /> Processing...
                      </>
                    ) : (
                      <>
                        <HiCheckCircle /> Approve All
                      </>
                    )}
                  </button>
                </>
              )}
              
              {modalAction && actionCompleted && (
                <button className="btn btn-primary" onClick={closeModal}>
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;