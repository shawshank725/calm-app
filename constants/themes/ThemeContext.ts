// theme/ThemeContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeName, UserRole } from './types';

type ThemeContextType = {
  theme: ThemeName;
  role: UserRole;
  setTheme: (theme: ThemeName) => void;
  setRole: (role: UserRole) => void;
};

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
/*
// Provide the context
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeName>('light');
  const [role, setRole] = useState<UserRole>('student');

  return (
    <ThemeContext.Provider value={{ theme, role, setTheme, setRole }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to access the context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

*/
