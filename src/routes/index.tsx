import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { useDrawerContext } from '../shared/context';

export const AppRoutes = () => {
    const { setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([{
            label: 'Página Inicial',
            icon: 'home',
            path: '/pagina-inicial'
        }]);
    }, []);

    return (
        <Routes>
            <Route path='/home' element={<Dashboard/>} />

            <Route path='*' element={<Navigate to='/home' />} />
        </Routes>
    );
};