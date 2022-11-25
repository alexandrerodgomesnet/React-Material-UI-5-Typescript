import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FerramentaListagem } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutBase } from '../../shared/layouts';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';

export const ListagemCidades: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    useEffect(() => {

        debounce(() =>{

            CidadesService.Listar(1, busca)
                .then((result) => {
                    if(result instanceof Error)
                        console.error(result.message);

                    console.log(result);
                });
        });
    }, [busca]);

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