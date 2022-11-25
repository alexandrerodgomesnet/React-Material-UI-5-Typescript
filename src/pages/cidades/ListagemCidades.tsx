import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TableFooter, LinearProgress } from '@mui/material';

import { FerramentaListagem } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { IListagemCidade } from '../../shared/interfaces';
import { LayoutBase } from '../../shared/layouts';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { Environment } from '../../shared/enviroments';


export const ListagemCidades: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();
    const [rows, setRows] = useState<IListagemCidade[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);
        debounce(() => {
            CidadesService.Listar(1, busca)
                .then((result) => {
                    setIsLoading(false);

                    if(result instanceof Error)
                        console.error(result.message);
                    else{
                        setRows(result.data);
                        setTotalCount(result.totalCount);
                        console.log(result);
                    }

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
        >
            <TableContainer component={Paper} variant='outlined' sx={{ m:1, width:'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome Completo</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map(row =>(
                                <TableRow key={row.id}>
                                    <TableCell>Ações</TableCell>
                                    <TableCell>{row.nomeCompleto}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    {
                        totalCount === 0 &&
                        !isLoading &&
                        (<caption>{Environment.LISTAGEM_VAZIA}</caption>)
                    }
                    <TableFooter>
                        {
                            isLoading &&(
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <LinearProgress variant='indeterminate' />
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableFooter>
                </Table>
            </TableContainer>
        </LayoutBase>
    );
};