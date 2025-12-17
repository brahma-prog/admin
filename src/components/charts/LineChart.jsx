import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', users: 4000, orders: 2400, revenue: 2400 },
  { name: 'Feb', users: 3000, orders: 1398, revenue: 2210 },
  { name: 'Mar', users: 2000, orders: 9800, revenue: 2290 },
  { name: 'Apr', users: 2780, orders: 3908, revenue: 2000 },
  { name: 'May', users: 1890, orders: 4800, revenue: 2181 },
  { name: 'Jun', users: 2390, orders: 3800, revenue: 2500 },
  { name: 'Jul', users: 3490, orders: 4300, revenue: 2100 },
];

const LineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E0F2F1" />
        <XAxis 
          dataKey="name" 
          stroke="#4F6F6B"
          fontSize={12}
        />
        <YAxis 
          stroke="#4F6F6B"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white',
            border: '1px solid #E0F2F1',
            borderRadius: '8px'
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="users" 
          stroke="#009688" 
          strokeWidth={2}
          dot={{ stroke: '#009688', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line 
          type="monotone" 
          dataKey="orders" 
          stroke="#4DB6AC" 
          strokeWidth={2}
          dot={{ stroke: '#4DB6AC', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="#124441" 
          strokeWidth={2}
          dot={{ stroke: '#124441', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;