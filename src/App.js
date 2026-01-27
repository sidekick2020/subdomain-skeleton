import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useTheme, useAnalytics } from './contexts';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound';

/**
 * App Component
 *
 * This skeleton defaults to a sidebar layout with theme toggle in the sidebar.
 * Light mode is the default. Users can switch to dark mode via the sidebar.
 *
 * Layout Options:
 *   1. Sidebar Layout (default) - Sidebar with nav + theme toggle
 *   2. Header Layout - Use <Header /> instead of <Sidebar />
 *   3. Combined - Use both with sidebar-with-header class
 */
function App() {
  const { theme } = useTheme();
  const { trackPageView } = useAnalytics();
  const location = useLocation();

  // Track page views on route change
  useEffect(() => {
    trackPageView(location.pathname, {
      search: location.search,
    });
  }, [location, trackPageView]);

  // Define navigation items for the sidebar
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    // Add more navigation items as needed
  ];

  return (
    <div className="app" data-theme={theme}>
      <Sidebar
        logo="🔷"
        appName="My App"
        navItems={navItems}
      />

      <main className="app-main page-container-with-sidebar">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
