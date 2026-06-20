import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function AdminSidebar() {
  const location = useLocation();

  const links = [
    { path: '/admin/dashboard', label: '📊 Overview' },
    { path: '/admin/posts', label: '📝 Manage Posts' },
    { path: '/admin/affiliates', label: '🔗 Manage Affiliates' },
    { path: '/admin/comments', label: '💬 Manage Comments' },
  ];

  return (
    <div className='admin-sidebar'>
      <div className='admin-sidebar-brand'>
        <h2>Softprofit Hub</h2>
        <p>Admin Panel</p>
      </div>
      <nav className='admin-nav'>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`admin-nav-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className='admin-sidebar-footer'>
        <Link to='/' className='admin-nav-link'>
          🌐 View Site
        </Link>
        <Link to='/admin' className='admin-nav-link logout'>
          🚪 Logout
        </Link>
      </div>
    </div>
  );
}

export default AdminSidebar;
