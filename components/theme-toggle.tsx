"use client";

import React from 'react';
import { Sun, Moon } from 'lucide-react';
// Import the custom hook from your new provider file
import { useTheme } from '@/components/theme-provider'; 

/**
 * A theme toggler component that switches between light and dark modes 
 * using the global ThemeContext.
 */
export const ThemeToggle = () => {
  // Get the theme state and the toggle function from the context
  const { theme, toggleTheme } = useTheme();

  // Wait until the client-side theme state is determined (theme !== null)
  if (!theme) {
    // Render a static button to prevent Cumulative Layout Shift (CLS)
    return (
      <button
        disabled
        className="
          inline-flex items-center justify-center rounded-xl text-lg h-10 w-10 p-0 shadow-lg relative
          bg-secondary text-secondary-foreground ring-2 ring-primary/20
        "
      >
        <span className="sr-only">Toggle theme loading...</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      // Use the theme from context for dynamic accessibility text
      aria-label={`Toggle to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="
        inline-flex items-center justify-center 
        rounded-xl text-lg transition-colors 
        h-10 w-10 p-0 shadow-lg relative
        bg-secondary text-secondary-foreground hover:bg-secondary/80
        ring-2 ring-primary/20
        transform hover:scale-105 active:scale-95
      "
    >
      {/* Sun icon for light mode (visible by default) */}
      <Sun className="h-5 w-5 transition-all duration-500 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      {/* Moon icon for dark mode (hidden by default, appears only in 'dark' context) */}
      <Moon className="absolute h-5 w-5 transition-all duration-500 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};