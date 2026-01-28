import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts';

/**
 * Sidebar Component
 *
 * A fixed sidebar navigation with theme toggle control.
 *
 * Usage:
 *   <Sidebar
 *     logo={<MyLogo />}
 *     appName="My App"
 *     navItems={[
 *       { path: '/', label: 'Home', icon: '🏠' },
 *       { path: '/about', label: 'About', icon: 'ℹ️' },
 *     ]}
 *   />
 *
 * Props:
 *   - logo: React node for custom logo (optional)
 *   - appName: Application name displayed in header (default: "My App")
 *   - navItems: Array of navigation items with path, label, and optional icon
 *   - withHeader: If true, positions sidebar below a header (default: false)
 */
const Sidebar = ({
  logo = '🔷',
  appName = 'My App',
  navItems = [],
  withHeader = false,
  children
}) => {
  const { toggleTheme, isDark, theme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleNavClick = () => {
    // Close sidebar on mobile after navigation
    setIsOpen(false);
  };

  // Default navigation items if none provided
  const defaultNavItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
  ];

  const items = navItems.length > 0 ? navItems : defaultNavItems;

  return (
    <>
      {/* Mobile toggle button - only visible on mobile */}
      <button
        className="sidebar-mobile-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${withHeader ? 'sidebar-with-header' : ''} ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo" onClick={handleNavClick}>
            {typeof logo === 'string' ? (
              <span style={{ fontSize: '1.5rem' }}>{logo}</span>
            ) : (
              logo
            )}
            <span>{appName}</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section">
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                {item.icon && (
                  <span className="nav-item-icon">{item.icon}</span>
                )}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="nav-item-badge">{item.badge}</span>
                )}
              </Link>
            ))}
          </div>

          {/* Additional custom content */}
          {children}
        </nav>

        <div className="sidebar-footer">
          {/* Theme Toggle */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            <span className="theme-toggle-icon">
              {isDark ? '☀️' : '🌙'}
            </span>
            <span className="theme-toggle-label">
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          <div className="theme-indicator">
            Currently: <strong>{theme === 'light' ? 'Light' : 'Dark'}</strong>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
    </>
  );
};

export default Sidebar;
