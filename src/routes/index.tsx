import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/context';

import { ListagemCidades, Dashboard } from '../pages';

export const AppRoutes = () => {
    const { setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                icon: 'home',
                path: '/pagina-inicial',
                label: 'Página Inicial',
            },
            {
                icon: 'location_city',
                path: '/cidades',
                label: 'Cidades',
            }
        ]);
    }, []);

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Dashboard/>} />

            <Route path='/cidades' element={<ListagemCidades/>} />
            {/* <Route path='/cidades/detalhe/:id' element={<ListagemCidades/>} /> */}

            <Route path='*' element={<Navigate to='/pagina-inicial' />} />
        </Routes>
    );
};