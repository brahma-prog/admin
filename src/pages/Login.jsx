import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMail, HiShieldCheck } from 'react-icons/hi';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <HiShieldCheck />
            <h1>QuickMed Admin</h1>
          </div>
          <p>Secure Admin Portal - Management Console</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">
              <HiMail /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="admin@quickmed.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="/forgot-password" className="forgot-link">
              Forgot password?
            </a>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary login-btn"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In to Admin Portal'}
          </button>

          <div className="login-footer">
            <p className="security-note">
              <HiShieldCheck /> Secure access. All activities are logged and monitored.
            </p>
            <p className="support-info">
              For support, contact: <strong>support@quickmed.com</strong> | <strong>+91 9876543210</strong>
            </p>
          </div>
        </form>
      </div>

      <div className="login-background">
        <div className="background-pattern"></div>
        <div className="background-overlay"></div>
        <div className="background-content">
          <h2>QuickMed Admin Portal</h2>
          <p>Centralized management system for the complete QuickMed ecosystem</p>
          <div className="features-list">
            <div className="feature">
              <HiShieldCheck />
              <span>Role-Based Access Control</span>
            </div>
            <div className="feature">
              <HiShieldCheck />
              <span>Real-time Monitoring</span>
            </div>
            <div className="feature">
              <HiShieldCheck />
              <span>Compliance Management</span>
            </div>
            <div className="feature">
              <HiShieldCheck />
              <span>Financial Oversight</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;