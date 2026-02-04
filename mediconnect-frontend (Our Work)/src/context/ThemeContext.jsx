import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Sync with localStorage
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('app-theme');
        return savedTheme || 'light';
    });

    const [compactMode, setCompactMode] = useState(() => {
        return localStorage.getItem('compact-mode') === 'true';
    });

    const [fontSize, setFontSize] = useState(() => {
        return localStorage.getItem('font-size') || 'Medium';
    });

    // Apply classes to body/root on change
    useEffect(() => {
        localStorage.setItem('app-theme', theme);
        
        // Use documentElement for data-theme (modern) and body.classList for legacy support
        document.documentElement.setAttribute('data-theme', theme);
        
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('compact-mode', compactMode);
        if (compactMode) {
            document.body.classList.add('compact-mode');
        } else {
            document.body.classList.remove('compact-mode');
        }
    }, [compactMode]);

    useEffect(() => {
        localStorage.setItem('font-size', fontSize);
        document.documentElement.setAttribute('data-font-size', fontSize.toLowerCase());
    }, [fontSize]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ 
            theme, 
            setTheme, 
            toggleTheme, 
            compactMode, 
            setCompactMode, 
            fontSize, 
            setFontSize 
        }}>
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
