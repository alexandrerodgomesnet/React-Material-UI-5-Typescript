import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ListagemPessoas, Dashboard, DetalhePessoa } from '../pages';
import { UseDrawerContext } from '../shared/context';

const routes = [
    {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página Inicial',
    },
    {
        icon: 'people',
        path: '/pessoas',
        label: 'Pessoas',
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
            <Route path='/pessoas' element={<ListagemPessoas/>} />
            <Route path='/pessoas/detalhe/:id' element={<DetalhePessoa />} />

            <Route path='*' element={<Navigate to='/pagina-inicial' />} />
        </Routes>
    );
};