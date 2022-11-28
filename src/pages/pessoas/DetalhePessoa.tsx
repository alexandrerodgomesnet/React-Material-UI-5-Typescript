import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FerramentaDetalhe } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { PessoaService } from '../../shared/services/api/pessoa/PessoaService';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { VTextField } from '../../shared/forms';
import { IFormPessoa } from '../../shared/interfaces';

export const DetalhePessoa: React.FC = () => {
    const { id = 'inserir'} = useParams<'id'>();
    const navigate = useNavigate();
    const formRef = useRef<FormHandles>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    const inserirRegistro = id === 'inserir';
    const tituloHeader = inserirRegistro ? 'Inserir Pessoa' : `Editar ${nome}`;



    useEffect(() =>{
        if(!inserirRegistro){
            setIsLoading(true);
            PessoaService.ObterPorId(Number(id))
                .then((result) =>{
                    setIsLoading(false);
                    if(result instanceof Error){
                        alert(result.message);
                        navigate('/pessoas');
                    }
                    else{
                        setNome(result.nomeCompleto);
                        console.log(result);
                        formRef.current?.setData(result);
                    }
                });
        }
    }, [id]);

    const handleSalvar = (dados: IFormPessoa) => {
        console.log(dados);
        setIsLoading(true);

        if(inserirRegistro){
            PessoaService.Criar(dados)
                .then(result =>{
                    setIsLoading(false);
                    if(result instanceof Error){
                        alert(result.message);
                    }
                    else{
                        navigate(`/pessoas/detalhe/${result}`);
                    }
                });
        }
        else{
            PessoaService.Atualizar(Number(id), { id: Number(id), ...dados })
                .then(result =>{
                    setIsLoading(false);
                    if(result instanceof Error){
                        alert(result.message);
                    }
                });
        }


    };

    const handleApagar = (id: number) => {
        if(confirm(`Deseja realmente excluir o registro ${id} - ${nome}?`)){
            PessoaService.Excluir(id)
                .then(result =>{
                    if(result instanceof Error){
                        alert(result.message);
                    }
                    else{
                        alert(`Registro ${id} - ${nome} excluído com sucesso!`);
                        navigate('/pessoas');
                    }
                });
        }
    };

    return(
        <LayoutBase tituloHeader={tituloHeader}
            barraFerramentas={
                <FerramentaDetalhe
                    textoBotaoNovo='Nova'
                    mostrarBotaoSalvarFechar
                    mostrarBotaoNovo={id !== 'inserir'}
                    mostrarBotaoApagar={id !== 'inserir'}

                    aoClicarEmSalvar={() => formRef.current?.submitForm()}
                    aoClicarEmSalvarFechar={() => formRef.current?.submitForm()}
                    aoClicarEmApagar={() => handleApagar(Number(id))}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/inserir')}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                />
            }
        >

            <Form ref={formRef} onSubmit={handleSalvar}>
                <Box
                    margin={1}
                    display='flex'
                    flexDirection='column'
                    component={Paper}
                    variant='outlined'
                >
                    <Grid container direction='column' padding={2} spacing={2}>
                        <Grid item>
                            {
                                isLoading && (<LinearProgress variant='indeterminate' />)
                            }
                        </Grid>
                        <Grid item>
                            <Typography variant='h6'>
                                Geral
                            </Typography>
                        </Grid>
                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <VTextField
                                    fullWidth
                                    label='Nome Completo'
                                    name='nomeCompleto'
                                    disabled={isLoading}
                                    onChange={e => setNome(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <VTextField
                                    fullWidth
                                    label='Email'
                                    name='email'
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <VTextField
                                    fullWidth
                                    label='Cidade'
                                    name='cidadeId'
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Form>
        </LayoutBase>
    );
};