import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FerramentaDetalhe } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { VTextField, VForm } from '../../shared/forms';
import { IFormPessoa, IVFormErrors } from '../../shared/interfaces';
import { useVForm } from '../../shared/hooks';
import * as yup from 'yup';
import { PessoaService } from '../../shared/services/api/pessoa/PessoaService';
import { AutoCompleteCidade } from './components/AutoCompleteCidade';

export const DetalhePessoa: React.FC = () => {
    const { id = 'inserir'} = useParams<'id'>();
    const navigate = useNavigate();
    const { formRef, salvar, salvarFechar, ehSalvarFechar } = useVForm();
    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    const inserirRegistro = id === 'inserir';
    const tituloHeader = inserirRegistro ? 'Inserir Pessoa' : `Editar ${nome}`;

    const formValidationSchema: yup.SchemaOf<IFormPessoa> = yup.object().shape({
        nomeCompleto: yup.string().required().min(3),
        email: yup.string().required().email(),
        cidadeId: yup.number().required()
    });

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
        else{
            formRef.current?.setData({
                nomeCompleto: '',
                email: '',
                cidadeId: undefined
            });
        }
    }, [id]);

    const handleSalvar = (dados: IFormPessoa) => {
        console.log(dados);
        setIsLoading(true);

        formValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidos) => {
                if(inserirRegistro){
                    PessoaService
                        .Criar(dadosValidos)
                        .then(result =>{
                            setIsLoading(false);
                            if(result instanceof Error){
                                alert(result.message);
                            }
                            else{
                                if(ehSalvarFechar())
                                    navigate('/pessoas');
                                else
                                    navigate(`/pessoas/detalhe/${result}`);
                            }
                        });
                }
                else{
                    PessoaService
                        .Atualizar(Number(id), { id: Number(id), ...dadosValidos })
                        .then(result =>{
                            setIsLoading(false);

                            if(result instanceof Error)
                                alert(result.message);
                            else{
                                if(ehSalvarFechar())
                                    navigate('/pessoas');
                            }
                        });
                }
            })
            .catch((errors: yup.ValidationError) => {
                setIsLoading(false);
                const validationErrors: IVFormErrors = {};

                errors.inner.forEach(error => {
                    if(!error.path) return;

                    validationErrors[error.path] = error.message;
                });
                formRef.current?.setErrors(validationErrors);
            });
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

                    aoClicarEmSalvar={salvar}
                    aoClicarEmSalvarFechar={salvarFechar}
                    aoClicarEmApagar={() => handleApagar(Number(id))}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/inserir')}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                />
            }
        >

            <VForm ref={formRef} onSubmit={handleSalvar}>
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
                                <AutoCompleteCidade isExternalLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </VForm>
        </LayoutBase>
    );
};