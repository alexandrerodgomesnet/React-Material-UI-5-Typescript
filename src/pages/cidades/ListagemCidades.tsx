import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TableContainer, Table, TableHead, TableBody,
    TableRow, TableCell, Paper, TableFooter, LinearProgress,
    Pagination,
    IconButton,
    Icon} from '@mui/material';

import { FerramentaListagem } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { IListagemCidade } from '../../shared/interfaces';
import { LayoutBase } from '../../shared/layouts';
import { CidadeService } from '../../shared/services/api/cidade/CidadeService';
import { Environment } from '../../shared/enviroments';


export const ListagemCidades: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();
    const [rows, setRows] = useState<IListagemCidade[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);
        debounce(() => {
            CidadeService.Listar(pagina, busca)
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
    }, [busca, pagina]);

    const handleDelete = (id: number, nome: string) => {
        if(confirm(`Deseja realmente excluir o registro ${id} - ${nome}?`)){
            CidadeService.Excluir(id)
                .then(result =>{
                    if(result instanceof Error){
                        alert(result.message);
                    }
                    else{
                        setRows(oldRows => [
                            ...oldRows.filter((oldRow) => oldRow.id !== id)
                        ]);
                        alert('Regidtro excluído com sucesso!');
                    }
                });
        }
    };

    return (
        <LayoutBase
            tituloHeader='Listagem de Cidades'
            barraFerramentas={
                <FerramentaListagem
                    mostrarInputBusca
                    textoBusca={busca}
                    textoNovoBotao='Nova'
                    aoCLicarEmNovo={() => navigate('/cidades/detalhe/inserir')}
                    aoMudarTextoBusca={texto => setSearchParams({busca: texto, pagina: '1'}, {replace: true})}
                />
            }
        >
            <TableContainer component={Paper} variant='outlined' sx={{ m:1, width:'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Descrição</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map(row =>(
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <IconButton
                                            size='small'
                                            onClick={() => handleDelete(row.id, row.descricao)}>
                                            <Icon>delete</Icon>
                                        </IconButton>
                                        <IconButton
                                            size='small'
                                            onClick={() => navigate(`/cidades/detalhe/${row.id}`)}>
                                            <Icon>edit</Icon>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{row.descricao}</TableCell>
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
                        {
                            (totalCount > 0 && totalCount > Environment.LIMITE_LINHAS) && (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <Pagination
                                            page={pagina}
                                            count={ Math.ceil(totalCount / Environment.LIMITE_LINHAS) }
                                            onChange={(_, newPage) => setSearchParams({busca, pagina: newPage.toString()}, {replace: true})}
                                        />
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