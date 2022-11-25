import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { useDrawerContext } from '../shared/context';

<<<<<<< HEAD
import { ListagemPessoas, Dashboard } from '../pages';

=======
>>>>>>> parent of a5ba968 (Ajustes, refatoração e listagem de cidades.)
export const AppRoutes = () => {
    const { setDrawerOptions } = useDrawerContext();

    useEffect(() => {
<<<<<<< HEAD
        setDrawerOptions([
            {
                icon: 'home',
                path: '/pagina-inicial',
                label: 'Página Inicial',
            },
            {
                icon: 'people',
                path: '/pessoas',
                label: 'Pessoas',
            },
            // {
            //     icon: 'location_city',
            //     path: '/cidades',
            //     label: 'Cidades',
            // }
        ]);
=======
        setDrawerOptions([{
            label: 'Página Inicial',
            icon: 'home',
            path: '/pagina-inicial'
        }]);
>>>>>>> parent of a5ba968 (Ajustes, refatoração e listagem de cidades.)
    }, []);

    return (
        <Routes>
            <Route path='/home' element={<Dashboard/>} />

<<<<<<< HEAD
            <Route path='/pessoas' element={<ListagemPessoas/>} />
            {/* <Route path='/pessoas/detalhe/:id' element={<ListagemPessoas/>} /> */}

            <Route path='*' element={<Navigate to='/pagina-inicial' />} />
=======
            <Route path='*' element={<Navigate to='/home' />} />
>>>>>>> parent of a5ba968 (Ajustes, refatoração e listagem de cidades.)
        </Routes>
    );
};