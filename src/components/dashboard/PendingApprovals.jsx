import React from 'react';
import { HiUserGroup, HiShoppingBag, HiTruck } from 'react-icons/hi';
import './PendingApprovals.css';

const PendingApprovals = () => {
  const approvals = [
    {
      id: 1,
      type: 'doctor',
      count: 3,
      icon: <HiUserGroup />,
      color: 'var(--info)'
    },
    {
      id: 2,
      type: 'pharmacy',
      count: 2,
      icon: <HiShoppingBag />,
      color: 'var(--success)'
    },
    {
      id: 3,
      type: 'delivery_partner',
      count: 5,
      icon: <HiTruck />,
      color: 'var(--warning)'
    }
  ];

  return (
    <div className="pending-approvals">
      <div className="approvals-grid">
        {approvals.map(item => (
          <div key={item.id} className="approval-item">
            <div className="approval-icon" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
              {item.icon}
            </div>
            <div className="approval-content">
              <div className="approval-count">{item.count}</div>
              <div className="approval-type">
                {item.type.replace('_', ' ').toUpperCase()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingApprovals;