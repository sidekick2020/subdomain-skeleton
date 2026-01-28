/**
 * Theme Context
 *
 * Manages light/dark theme switching with localStorage persistence.
 *
 * Usage:
 *   import { ThemeProvider, useTheme } from './contexts/ThemeContext';
 *
 *   // In app root
 *   <ThemeProvider>
 *     <App />
 *   </ThemeProvider>
 *
 *   // In components
 *   const { theme, toggleTheme, isDark, isLight } = useTheme();
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext(null);

const THEME_KEY = 'theme';
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const ThemeProvider = ({ children, defaultTheme = THEMES.LIGHT }) => {
  // Initialize theme from localStorage or default to light mode
  // NOTE: We intentionally do NOT auto-detect system preference.
  // Light mode is the default for all Sober Sidekick apps.
  // Users can manually switch to dark mode via the sidebar toggle.
  const [theme, setThemeState] = useState(() => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored && Object.values(THEMES).includes(stored)) {
      return stored;
    }
    return defaultTheme;
  });

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Set data-theme attribute for CSS variables
    root.setAttribute('data-theme', theme);

    // Add theme class to body for additional styling hooks
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(`${theme}-theme`);

    // Persist to localStorage
    localStorage.setItem(THEME_KEY, theme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === THEMES.DARK ? '#1a1a1a' : '#f8fafc');
    }
  }, [theme]);

  // NOTE: We intentionally do NOT listen for system preference changes.
  // Theme switching is manual via the sidebar toggle.
  // This ensures consistent branding and user control.

  const setTheme = useCallback((newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setThemeState(newTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) =>
      current === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    );
  }, []);

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === THEMES.DARK,
    isLight: theme === THEMES.LIGHT,
    THEMES,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
