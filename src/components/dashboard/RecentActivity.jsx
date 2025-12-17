import React from 'react';
import { HiCheckCircle, HiXCircle, HiClock, HiUserAdd, HiCash } from 'react-icons/hi';
import './RecentActivity.css';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      action: 'Doctor Approved',
      user: 'Dr. Arjun Mehta',
      time: '10 minutes ago',
      icon: <HiCheckCircle />,
      color: 'success'
    },
    {
      id: 2,
      action: 'Order Completed',
      user: 'ORD-2024-00123',
      time: '25 minutes ago',
      icon: <HiCash />,
      color: 'info'
    },
    {
      id: 3,
      action: 'New User Registered',
      user: 'Rajesh Kumar',
      time: '1 hour ago',
      icon: <HiUserAdd />,
      color: 'primary'
    },
    {
      id: 4,
      action: 'Pharmacy Suspended',
      user: 'MedPlus Pharmacy',
      time: '2 hours ago',
      icon: <HiXCircle />,
      color: 'error'
    },
    {
      id: 5,
      action: 'Settlement Processed',
      user: 'Health Plus Pharmacy',
      time: '3 hours ago',
      icon: <HiCash />,
      color: 'success'
    }
  ];

  return (
    <div className="recent-activity">
      <div className="activity-list">
        {activities.map(activity => (
          <div key={activity.id} className="activity-item">
            <div className="activity-icon" style={{ backgroundColor: `var(--${activity.color})` }}>
              {activity.icon}
            </div>
            <div className="activity-content">
              <div className="activity-action">{activity.action}</div>
              <div className="activity-user">{activity.user}</div>
            </div>
            <div className="activity-time">{activity.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;