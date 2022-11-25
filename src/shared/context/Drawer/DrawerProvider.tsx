import { useCallback, useState } from 'react';
import { IDrawerOptions, IDrawerProviderProps } from '../../interfaces/Drawer';
import { DrawerContext } from './DrawerContext';

export const DrawerProvider: React.FC<IDrawerProviderProps> = ({ children }) => {

    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);

    const toggleDrawerOpen = useCallback(() => {
        setDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
    }, []);

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
        setDrawerOptions(newDrawerOptions);
    }, []);

    return (
        <DrawerContext.Provider value={{
            isDrawerOpen,
            drawerOptions,
            toggleDrawerOpen,
            setDrawerOptions: handleSetDrawerOptions
        }}>
            {children}
        </DrawerContext.Provider>
    );
};