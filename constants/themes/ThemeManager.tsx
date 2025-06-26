import {  createContext, useContext, useEffect, useState } from "react";
import { CommonStyles, ThemeContextType, ThemeName, UserRole } from "./types";
import { ThemeOverrides } from "./ThemeOverrides";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const [styles, setStyles] = useState<Record<string, CommonStyles>>({});
    
    useEffect(() => {
        const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('theme');
            if (savedTheme === 'light' || savedTheme === 'dark') {
            setTheme(savedTheme);
            }
        } catch (e) {
            console.log("Error loading theme from storage:", e);
        }
        };

        loadTheme();
    }, []);

    useEffect(() => {
        const roleThemes = ThemeOverrides[role];
        const selectedStyles = roleThemes?.[theme] ?? {};
        setStyles(selectedStyles);
    }, [theme, role]);


    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        AsyncStorage.setItem('theme', newTheme); // Persist toggle too
    };

    return (
        <ThemeContext.Provider value={{ theme, role,styles, setRole, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}