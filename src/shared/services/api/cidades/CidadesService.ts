import { Environment } from '../../../enviroments';
import { IDetalheCidade, ICidadeComTotalCount } from '../../../interfaces';
import { Api } from '../axios-config';


const Listar = async(page = 1, filter = ''): Promise<ICidadeComTotalCount | Error> => {
    const limiteLinhas = Environment.LIMITE_LINHAS;
    const erroAoListar = Environment.ERRO_AO_LISTAR;

    try{
        const url = `/pessoas?_page=${page}&_limit=${limiteLinhas}&nomeCompleto_like=${filter}`;

        const { data, headers } = await Api.get(url);

        if(data){
            return {
                data,
                totalCount: Number(headers['x-total-count'] || limiteLinhas)
            };
        }

        return new Error(erroAoListar);
    }
    catch(error){
        console.error(error);
        return new Error((error as {message: string}).message || erroAoListar);
    }
};

const ObterPorId = async(id: number): Promise<IDetalheCidade | Error> => {
    const erroAoConsultar = Environment.ERRO_AO_LISTAR;

    try{
        const url = `/pessoas/${id}`;

        const { data } = await Api.get<IDetalheCidade>(url);

        if(data)
            return data;

        return new Error(erroAoConsultar);
    }
    catch(error){
        console.error(error);
        return new Error((error as {message: string}).message || erroAoConsultar);
    }
};

const Criar = async(dados: Omit<IDetalheCidade, 'id'>): Promise<number | Error> => {
    const erroAoCriar = Environment.ERRO_AO_CRIAR;

    try{
        const { data } = await Api.post<IDetalheCidade>('/pessoas', dados);

        if(data)
            return data.id;

        return new Error(erroAoCriar);
    }
    catch(error){
        console.error(error);
        return new Error((error as {message: string}).message || erroAoCriar);
    }
};

const Atualizar = async(id: number, dados: IDetalheCidade): Promise<void | Error> => {

    try{
        const url = `/pessoas/${id}`;
        await Api.put<IDetalheCidade>(url, dados);
    }
    catch(error){
        console.error(error);
        return new Error((error as {message: string}).message || Environment.ERRO_AO_ATUALIZAR);
    }
};

const Excluir = async(id: number): Promise<void | Error> => {
    try{
        const url = `/pessoas/${id}`;
        await Api.delete<IDetalheCidade>(url);
    }
    catch(error){
        console.error(error);
        return new Error((error as {message: string}).message || Environment.ERRO_AO_EXCLUIR);
    }
};

export const CidadesService = {
    Listar,
    ObterPorId,
    Criar,
    Atualizar,
    Excluir,
};