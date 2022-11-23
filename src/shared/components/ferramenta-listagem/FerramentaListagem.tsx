import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';
import { Environment } from '../../enviroments';
import { IFerramentaListagemProps } from '../../interfaces';

export const FerramentaListagem: React.FC<IFerramentaListagemProps> = ({
    textoBusca,
    mostrarInputBusca = false,
    aoMudarTextoBusca,
    textoNovoBotao = 'Novo',
    mostrarNovoBotao = true,
    aoCLicarEmNovo
}) => {
    const theme = useTheme();
    return (
        <Box
            gap={1}
            marginX={1}
            padding={1}
            paddingX={1}
            display='flex'
            alignItems='center'
            height={theme.spacing(5)}
            component={Paper}
        >
            {mostrarInputBusca && (
                <TextField
                    size='small'
                    value={textoBusca}
                    onChange={(e) => aoMudarTextoBusca?.(e.target.value)}
                    placeholder={Environment.INPUT_BUSCA}
                />
            )}

            <Box flex={1} display='flex' justifyContent='end'>
                {mostrarNovoBotao && (
                    <Button
                        color='primary'
                        disableElevation
                        variant='contained'
                        onClick={aoCLicarEmNovo}
                        endIcon={<Icon>add</Icon>}
                    >
                        {textoNovoBotao}
                    </Button>
                )}
            </Box>
        </Box>
    );
};