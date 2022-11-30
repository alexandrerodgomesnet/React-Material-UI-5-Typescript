import { Environment } from '../../../enviroments';
import { IAuth } from '../../../interfaces';
import { Api } from '../axios-config';

const auth = async (email: string, pass: string): Promise<IAuth | Error> => {
    try{
        const {data} = await Api.get('/auth', { data: { email, pass } });
        if(data)
            return data;

        return new Error(Environment.ERRO_AUTH_LOGIN);
    }
    catch(error)
    {
        console.error(error);
        return new Error((error as {message: string}).message || Environment.ERRO_AUTH_LOGIN);
    }
};

export const AuthService = {
    auth
};