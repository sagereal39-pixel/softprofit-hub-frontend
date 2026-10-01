import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/blog', label: 'Blog' },
    { path: '/tools', label: 'Tools' },
    { path: '/about', label: 'About' },
  ];

  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>Softprofit Hub</h1>
          <p>Welcome to The Home of Digital Products</p>
        </Link>
      </div>

      {/* Desktop Links */}
      <ul className='navbar-links'>
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              style={{
                textDecoration: 'none',
                color: location.pathname === link.path ? '#000' : '#333',
                fontWeight: location.pathname === link.path ? 'bold' : 'normal',
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger */}
      <button
        className='navbar-hamburger'
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu — always rendered so closing can animate too;
          visibility/height is controlled purely by CSS classes. */}
      <div className={`navbar-mobile ${menuOpen ? 'open' : ''}`}>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className='navbar-mobile-link'
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;