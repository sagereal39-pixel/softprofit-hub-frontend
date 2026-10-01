import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function AdminSidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: '/admin/dashboard', label: '📊 Overview' },
    { path: '/admin/posts', label: '📝 Manage Posts' },
    { path: '/admin/affiliates', label: '🔗 Manage Affiliates' },
    { path: '/admin/comments', label: '💬 Manage Comments' },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className='admin-sidebar'>
      <div className='admin-sidebar-header'>
        <div className='admin-sidebar-brand'>
          <h2>Softprofit Hub</h2>
          <p>Admin Panel</p>
        </div>
        <button
          className='admin-sidebar-toggle'
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Always rendered; open/closed state is controlled by CSS (max-height)
          so it can animate smoothly on both mobile open AND close. */}
      <div className={`admin-sidebar-menu ${menuOpen ? 'open' : ''}`}>
        <nav className='admin-nav'>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`admin-nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className='admin-sidebar-footer'>
          <Link to='/' className='admin-nav-link' onClick={closeMenu}>
            🌐 View Site
          </Link>
          <Link to='/admin' className='admin-nav-link logout' onClick={closeMenu}>
            🚪 Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;