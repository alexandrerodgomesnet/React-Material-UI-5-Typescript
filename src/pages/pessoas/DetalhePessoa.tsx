import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FerramentaDetalhe } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { PessoaService } from '../../shared/services/api/pessoa/PessoaService';
import { Form } from '@unform/web';
import { VTextField } from '../../shared/forms';

export const DetalhePessoa: React.FC = () => {
    const { id = 'inserir'} = useParams<'id'>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');
    const tituloHeader = id === 'inserir' ? 'Inserir Pessoa' : `Editar ${nome}`;

    const inserirRegistro = id === 'inserir';

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
                    }
                });
        }
    }, [id]);

    const handleSalvar = () => {
        console.log('salvar');
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

                    aoClicarEmSalvar={handleSalvar}
                    aoClicarEmSalvarFechar={handleSalvar}
                    aoClicarEmApagar={() => handleApagar(Number(id))}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/inserir')}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                />
            }
        >
            {
                isLoading && (<LinearProgress variant='indeterminate' />)
            }
            <Form onSubmit={(dados) => console.log(dados)}>
                <VTextField name='nomeCompleto'/>
                <button type='submit'>Enviar</button>
            </Form>
        </LayoutBase>
    );
};