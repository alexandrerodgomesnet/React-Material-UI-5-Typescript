import { useCallback, useEffect, useMemo, useState } from 'react';
import { Environment } from '../../enviroments';
import { IAuthProviderProps } from '../../interfaces';
import { AuthService } from '../../services/api/auth/AuthService';
import { AuthContext } from './AuthContext';

export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {

    const [accessToken, setAccessToken] = useState<string>();

    useEffect(() => {
        const accessToken = localStorage.getItem(Environment.LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        if(accessToken)
            setAccessToken(JSON.parse(accessToken));
        else
            setAccessToken(undefined);
    }, []);

    const handleLogin = useCallback(async (email: string, pass: string) => {
        const result = await AuthService.auth(email, pass);
        if(result instanceof Error)
            return result.message;
        else{
            localStorage.setItem(Environment.LOCAL_STORAGE_KEY_ACCESS_TOKEN, JSON.stringify(result.accessToken));
            setAccessToken(result.accessToken);
        }
    }, []);

    const handleLogout = useCallback(() => {
        setAccessToken(undefined);
        localStorage.removeItem(Environment.LOCAL_STORAGE_KEY_ACCESS_TOKEN);
    }, []);

    const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};