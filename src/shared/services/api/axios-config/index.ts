import axios from 'axios';
import { Environment } from '../../../enviroments';
import { errorInteceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
    baseURL: Environment.URL_BASE,
    headers:{
        Authorization: `Bearer ${JSON.stringify(Environment.LOCAL_STORAGE_KEY_ACCESS_TOKEN) || ''}`
    }
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInteceptor(error)
);

export { Api };