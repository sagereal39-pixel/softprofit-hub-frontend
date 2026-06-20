import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../api';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await loginAdmin(email, password);
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Could not connect to server. Is XAMPP running?');
    }
    setLoading(false);
  };

  return (
    <div className='admin-login-wrap'>
      <div className='admin-login-overlay' />
      <div className='admin-login-card'>
        <div className='admin-login-logo'>
          <h2>Softprofit Hub</h2>
          <p>Admin Portal</p>
        </div>
        {error && <div className='login-error'>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='admin@softprofithub.com'
            required
          />
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='••••••••'
            required
          />
          <button type='submit' disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
        <p className='admin-login-back'>
          <a href='/'>← Back to site</a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
