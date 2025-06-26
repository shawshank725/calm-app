import {  createContext, useContext, useState } from "react";
import { CommonStyles, ThemeContextType, ThemeName, UserRole } from "./types";

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  role: 'student',
  styles: {},
  setTheme: () => {},
  setRole: () => {},
  toggleTheme: () => {}
});

export const useAppTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode })  => {
    const [theme, setTheme] = useState<ThemeName>('light');
    const [role, setRole] = useState<UserRole>("student");
    const [styles] = useState<Record<string, CommonStyles>>({});
    
    const toggleTheme = () => {
        if (theme === 'light'){
            setTheme('dark');
        }
        else {
            setTheme('light');
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, role,styles, setRole, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}