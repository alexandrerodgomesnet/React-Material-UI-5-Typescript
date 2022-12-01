
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FerramentaListagem } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { CidadeService } from '../../shared/services/api/cidade/CidadeService';
import { PessoaService } from '../../shared/services/api/pessoa/PessoaService';

export const Dashboard: React.FC  = () => {

    const [isLoadingPessoa, setIsLoadingPessoa] = useState(true);
    const [totalCountPessoa, setTotalCountPessoa] = useState(0);
    const [isLoadingCidade, setIsLoadingCidade] = useState(true);
    const [totalCountCidade, setTotalCountCidade] = useState(0);

    useEffect(() => {
        setIsLoadingCidade(true);
        setIsLoadingPessoa(true);

        CidadeService.Listar(1)
            .then((result) => {
                setIsLoadingCidade(false);

                if(result instanceof Error)
                    console.error(result.message);
                else{
                    setTotalCountCidade(result.totalCount);
                }

            });

        PessoaService.Listar(1)
            .then((result) => {
                setIsLoadingPessoa(false);

                if(result instanceof Error)
                    console.error(result.message);
                else{
                    setTotalCountPessoa(result.totalCount);
                }

            });

    }, []);
    return (
        <LayoutBase
            tituloHeader='Página Inicial'
            barraFerramentas= {
                <FerramentaListagem
                    mostrarNovoBotao={false}
                />
            }
        >
            <Box
                width='100%'
                justifyContent='center'
                alignItems='center'
                display='flex'
            >
                <Grid container margin={2}>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography
                                        variant='h5' align='center'>Total de Pessoas

                                    </Typography>
                                    <Box padding={6}
                                        display='flex'
                                        justifyContent='center'
                                        alignItems='center'
                                    >
                                        {
                                            !isLoadingPessoa && (
                                                <Typography
                                                    variant='h1'>{totalCountPessoa}
                                                </Typography>
                                            )
                                        }
                                        {
                                            isLoadingPessoa && (
                                                <Typography
                                                    variant='h6'>Carregando...
                                                </Typography>
                                            )
                                        }
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography
                                        variant='h5' align='center'
                                    >
                                        Total de Cidades
                                    </Typography>
                                    <Box padding={6}
                                        display='flex'
                                        justifyContent='center'
                                        alignItems='center'
                                    >
                                        {
                                            !isLoadingCidade && (
                                                <Typography
                                                    variant='h1'>{totalCountCidade}
                                                </Typography>
                                            )
                                        }
                                        {
                                            isLoadingCidade && (
                                                <Typography
                                                    variant='h6'>Carregando...
                                                </Typography>
                                            )
                                        }
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </LayoutBase>
    );
};