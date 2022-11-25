import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export const UseAppThemeContext = () => {
    return useContext(ThemeContext);
};