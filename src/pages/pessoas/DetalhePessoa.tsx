import { LinearProgress } from '@mui/material';
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
            {
                isLoading && (<LinearProgress variant='indeterminate' />)
            }
            <Form ref={formRef} onSubmit={handleSalvar}>
                <VTextField placeholder='Nome COmpleto' name='nomeCompleto'/>
                <VTextField placeholder='Email' name='email'/>
                <VTextField placeholder='Cidade Id' name='cidadeId'/>
            </Form>
        </LayoutBase>
    );
};