import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ListagemCidades, Dashboard } from '../pages';
import { UseDrawerContext } from '../shared/context';

const routes = [
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
];

export const AppRoutes = () => {
    const { setDrawerOptions } = UseDrawerContext();

    useEffect(() => {
        const routing = () =>{
            setDrawerOptions(routes);
        };

        routing();

    }, []);

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Dashboard/>} />
            <Route path='/cidades' element={<ListagemCidades/>} />
            {/* <Route path='/pessoas/detalhe/:id' element={<ListagemPessoas/>} /> */}

            <Route path='*' element={<Navigate to='/pagina-inicial' />} />
        </Routes>
    );
};