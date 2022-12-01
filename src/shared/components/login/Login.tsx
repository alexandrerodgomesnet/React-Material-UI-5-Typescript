import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuthContext } from '../../context';
import { ILoginProps } from '../../interfaces';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    senha: yup.string().required().min(5)
});

export const Login: React.FC<ILoginProps> = ({children}) => {

    const { isAuthenticated, login } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [emailError, setEmailError] = useState('');
    const [senhaError, setSenhaError] = useState('');

    const handleSubmit = () => {
        setIsLoading(true);
        loginSchema
            .validate({ email, senha }, { abortEarly: false })
            .then(dados =>{ login(dados.email, dados.senha).then(() => setIsLoading(false)); })
            .catch((errors: yup.ValidationError) =>{
                setIsLoading(false);
                errors.inner.forEach(error =>{
                    if(error.path === 'email')
                        setEmailError(error.message);
                    else
                        setSenhaError(error.message);
                });
            });
    };

    if(isAuthenticated)
        return(<>{children}</>);
    return (
        <Box width='100vw' height='40vw' display='flex' alignItems='center' justifyContent='center'>
            <Card>
                <CardContent>
                    <Box display='flex' flexDirection='column' gap={2} width={250}>
                        <Typography variant='h6' align='center'>Indentifique-se</Typography>
                        <TextField
                            fullWidth
                            label='Email'
                            type='email'
                            value={email}
                            disabled={isLoading}
                            error={!!emailError}
                            helperText={emailError}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={ () => setEmailError('') }
                        >
                        </TextField>
                        <TextField
                            fullWidth
                            label='Senha'
                            type='password'
                            value={senha}
                            disabled={isLoading}
                            error={!!senhaError}
                            helperText={senhaError}
                            onChange={e => setSenha(e.target.value)}
                            onKeyDown={ () => setEmailError('') }
                        >
                        </TextField>
                    </Box>
                </CardContent>
                <CardActions>
                    <Box width='100%' display='flex' justifyContent='center'>
                        <Button
                            variant='contained'
                            onClick={ handleSubmit }
                            disabled={ isLoading }
                            endIcon={ isLoading ?
                                <CircularProgress size={20}
                                    variant='indeterminate'
                                    color='inherit'
                                />
                                : undefined }
                        >
                            Entrar
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
};