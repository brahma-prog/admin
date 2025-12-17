import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, change, trend, icon, color }) => {
  return (
    <div className="stats-card">
      <div className="stats-card-header">
        <div className="stats-icon" style={{ color }}>
          {icon}
        </div>
        <div className="stats-trend">
          <span className={`trend-indicator ${trend}`}>
            {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}
            {change}
          </span>
        </div>
      </div>
      <div className="stats-content">
        <h3 className="stats-value">{value}</h3>
        <p className="stats-title">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;