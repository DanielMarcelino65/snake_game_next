import {createContext, use, useContext, useEffect, useState} from 'react';
import { ThemeProvider } from 'styled-components'
import { ContextData } from './types';
import light, {dark} from '@/styles/theme/light';
import { json } from 'stream/consumers';

const themeContext = createContext<ContextData>({} as ContextData);

export function ContextProvider({children}: any) {
    const [themeState, setThemeState] = useState(true);
    const [themeLoaded, setThemeLoaded] = useState(false);

    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        localTheme && setThemeState(JSON.parse(localTheme));
        setThemeLoaded(true);
    }, []);

    function toggleTheme() {
        setThemeState(prevState => {
            const newState = !prevState;
            localStorage.setItem('theme', JSON.stringify(newState));
            return newState;
        });
    
    }

    const value: ContextData = {
        themeState: themeState,
        toggleTheme,
        themeLoaded: themeLoaded,
    }

    const currentTheme = themeState ? light : dark;


    return (
        <themeContext.Provider value={ value }>
            <ThemeProvider theme={currentTheme}>
                {children}
            </ThemeProvider>
        </themeContext.Provider>
    );
}

export function useThemeContext(): ContextData {
    const context = useContext(themeContext);
    if (!context) {
      throw new Error('ThemeContext must be used within a ThemeProvider');
    }
    return context;
  }