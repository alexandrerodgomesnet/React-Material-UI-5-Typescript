import { createContext } from 'react';
import { IAuthContextData } from '../../interfaces';

export const AuthContext = createContext({} as IAuthContextData);