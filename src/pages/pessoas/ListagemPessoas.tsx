import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FerramentaListagem } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

export const ListagemPessoas: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    useEffect(() => {
        PessoasService.Listar()
            .then((result) => {
                if(result instanceof Error)
                    alert(result.message);

                console.log(result);
            });
    }, []);

    return (
        <LayoutBase
            tituloHeader='Listagem de Pessoas'
            barraFerramentas={
                <FerramentaListagem
                    mostrarInputBusca
                    textoBusca={busca}
                    textoNovoBotao='Nova'
                    aoMudarTextoBusca={texto => setSearchParams({busca: texto}, {replace: true})}

                />
            }
        >Pessoas</LayoutBase>
    );
};