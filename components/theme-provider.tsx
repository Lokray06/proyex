"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Define the shape of the context
interface ThemeContextType {
  theme: 'light' | 'dark' | null;
  toggleTheme: () => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Utility function to determine the initial theme based on localStorage or system preference.
 */
const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.localStorage.getItem('theme')) {
    const storedTheme = window.localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
  }
  
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
};

// Define the provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Use null initially to prevent hydration mismatch
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  // Function to toggle the theme
  const toggleTheme = useCallback(() => {
    if (!theme) return; // Only toggle if theme is initialized
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  }, [theme]);

  // Effect to load initial theme and handle all theme changes
  useEffect(() => {
    // 1. Initial Load: Load the true initial theme from client environment.
    if (theme === null) {
        setTheme(getInitialTheme());
        return;
    }
    
    // 2. Theme Change: Apply the class and persist it.
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to use the theme context
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}