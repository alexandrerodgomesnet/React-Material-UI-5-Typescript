import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface IDrawerOptions {
    path: string;
    icon: string;
    label: string;
}
interface IDrawerContextData {
    isDrawerOpen: boolean;
    drawerOptions: IDrawerOptions[];
    toggleDrawerOpen: () => void;
    setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
    return useContext(DrawerContext);
};

interface IDrawerProviderProps {
    children: ReactNode
}

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