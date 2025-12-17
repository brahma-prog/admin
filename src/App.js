import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import DoctorManagement from './pages/DoctorManagement';
import PharmacyManagement from './pages/PharmacyManagement';
import DeliveryPartnerManagement from './pages/DeliveryPartnerManagement';
import OrderManagement from './pages/OrderManagement';
import PaymentManagement from './pages/PaymentManagement';
import ComplianceManagement from './pages/ComplianceManagement';
import RoleManagement from './pages/RoleManagement';
import ContentManagement from './pages/ContentManagement';
import AuditLogs from './pages/AuditLogs';
import { useAuth } from './context/AuthContext';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="doctors" element={<DoctorManagement />} />
            <Route path="pharmacies" element={<PharmacyManagement />} />
            <Route path="delivery-partners" element={<DeliveryPartnerManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="payments" element={<PaymentManagement />} />
            <Route path="compliance" element={<ComplianceManagement />} />
            <Route path="roles" element={<RoleManagement />} />
            <Route path="content" element={<ContentManagement />} />
            <Route path="audit-logs" element={<AuditLogs />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;