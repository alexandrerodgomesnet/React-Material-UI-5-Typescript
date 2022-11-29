import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FerramentaDetalhe } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { VTextField, VForm } from '../../shared/forms';
import { IFormCidade, IVFormErrors } from '../../shared/interfaces';
import { useVForm } from '../../shared/hooks';
import * as yup from 'yup';
import { CidadeService } from '../../shared/services/api/cidade/CidadeService';

export const DetalheCidade: React.FC = () => {
    const { id = 'inserir'} = useParams<'id'>();
    const navigate = useNavigate();
    const { formRef, salvar, salvarFechar, ehSalvarFechar } = useVForm();
    const [isLoading, setIsLoading] = useState(false);
    const [descricao, setDescricao] = useState('');

    const inserirRegistro = id === 'inserir';
    const tituloHeader = inserirRegistro ? 'Inserir Cidade' : `Editar Cidade ${descricao}`;

    const formValidationSchema: yup.SchemaOf<IFormCidade> = yup.object().shape({
        descricao: yup.string().required().min(3)
    });

    useEffect(() =>{
        if(!inserirRegistro){
            setIsLoading(true);
            CidadeService.ObterPorId(Number(id))
                .then((result) =>{
                    setIsLoading(false);
                    if(result instanceof Error){
                        alert(result.message);
                        navigate('/cidades');
                    }
                    else{
                        setDescricao(result.descricao);
                        console.log('cidade', result);
                        formRef.current?.setData(result);
                    }
                });
        }
        else{
            formRef.current?.setData({
                nome: ''
            });
        }
    }, [id]);

    const handleSalvar = (dados: IFormCidade) => {
        console.log(dados);
        setIsLoading(true);

        formValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidos) => {
                if(inserirRegistro){
                    CidadeService
                        .Criar(dadosValidos)
                        .then(result =>{
                            setIsLoading(false);
                            if(result instanceof Error){
                                alert(result.message);
                            }
                            else{
                                if(ehSalvarFechar())
                                    navigate('/cidades');
                                else
                                    navigate(`/cidades/detalhe/${result}`);
                            }
                        });
                }
                else{
                    CidadeService
                        .Atualizar(Number(id), { id: Number(id), ...dadosValidos })
                        .then(result =>{
                            setIsLoading(false);

                            if(result instanceof Error)
                                alert(result.message);
                            else{
                                if(ehSalvarFechar())
                                    navigate('/cidades');
                            }
                        });
                }
            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: IVFormErrors = {};

                errors.inner.forEach(error => {
                    if(!error.path) return;

                    validationErrors[error.path] = error.message;
                });
                formRef.current?.setErrors(validationErrors);
            });
    };

    const handleApagar = (id: number) => {
        if(confirm(`Deseja realmente excluir o registro ${id} - ${descricao}?`)){
            CidadeService.Excluir(id)
                .then(result =>{
                    if(result instanceof Error){
                        alert(result.message);
                    }
                    else{
                        alert(`Registro ${id} - ${descricao} excluído com sucesso!`);
                        navigate('/cidades');
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
                    mostrarBotaoNovo={!inserirRegistro}
                    mostrarBotaoApagar={!inserirRegistro}

                    aoClicarEmSalvar={salvar}
                    aoClicarEmSalvarFechar={salvarFechar}
                    aoClicarEmApagar={() => handleApagar(Number(id))}
                    aoClicarEmNovo={() => navigate('/cidades/detalhe/inserir')}
                    aoClicarEmVoltar={() => navigate('/cidades')}
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
                                    label='Descrição'
                                    name='descricao'
                                    disabled={isLoading}
                                    onChange={e => setDescricao(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </VForm>
        </LayoutBase>
    );
};