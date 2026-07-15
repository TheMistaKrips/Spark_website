import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [lang, setLang] = useState('ru');
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleLang = () => setLang(prev => prev === 'ru' ? 'en' : 'ru');

    return (
        <AppContext.Provider value={{ lang, toggleLang, theme, setTheme }}>
            {children}
        </AppContext.Provider>
    );
};