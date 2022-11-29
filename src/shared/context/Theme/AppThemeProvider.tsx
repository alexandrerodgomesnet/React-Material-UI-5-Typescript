import { Box, ThemeProvider } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { IAppThemeProviderProps } from '../../interfaces';
import { DarkTheme, LightTheme } from '../../themes';
import { ThemeContext } from './ThemeContext';

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {

    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

    const toggleTheme = useCallback(() => {
        setThemeName((oldTheme) => oldTheme === 'light' ? 'dark' : 'light');
    }, []);

    const theme = useMemo(() => {
        if(themeName === 'light')
            return LightTheme;

        return DarkTheme;
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme}}>
            <ThemeProvider theme={theme}>
                <Box width='auto' height='auto' bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};