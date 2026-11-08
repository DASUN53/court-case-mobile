import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    theme: ThemeMode;
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeMode>('light');

    useEffect(() => {
        SecureStore.getItemAsync('judicia_theme_mode').then((saved) => {
            if (saved === 'dark' || saved === 'light') {
                setTheme(saved);
            }
        });
    }, []);

    const toggleTheme = async () => {
        const nextTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        await SecureStore.setItemAsync('judicia_theme_mode', nextTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme }}>
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