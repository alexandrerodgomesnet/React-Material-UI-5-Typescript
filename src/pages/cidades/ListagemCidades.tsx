import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FerramentaListagem } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';

export const ListagemCidades: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    return (
        <LayoutBase
            tituloHeader='Listagem de Cidades'
            barraFerramentas={
                <FerramentaListagem
                    mostrarInputBusca
                    textoBusca={busca}
                    textoNovoBotao='Nova'
                    aoMudarTextoBusca={texto => setSearchParams({busca: texto}, {replace: true})}

                />
            }
        >Cidades</LayoutBase>
    );
};