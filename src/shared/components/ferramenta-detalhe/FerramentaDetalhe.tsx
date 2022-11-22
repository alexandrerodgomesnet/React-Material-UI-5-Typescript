import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useTheme } from '@mui/material';
import { IFerramentaDetalheProps } from '../../interfaces';
import { getBreakPointsDown } from '../../utils/util';

export const FerramentaDetalhe: React.FC<IFerramentaDetalheProps> = ({
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true,
    mostrarBotaoVoltar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarFechar = false,
    mostrarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarFecharCarregando = false,
    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoClicarEmSalvar,
    aoClicarEmSalvarFechar
}) => {

    const smDown = getBreakPointsDown('sm');
    const mdDown = getBreakPointsDown('md');
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
            {
                (mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (<Button
                    color='primary'
                    disableElevation
                    variant='contained'
                    onClick={aoClicarEmSalvar}
                    endIcon={<Icon>save</Icon>}
                >
                    <Typography 
                        variant='button' 
                        whiteSpace='nowrap' 
                        textOverflow='ellipsis' 
                        overflow='hidden'>
                            Salvar
                    </Typography>
                </Button>)
            }
            {mostrarBotaoSalvarCarregando && (<Skeleton width={110} height={60}/>)}
            {
                (mostrarBotaoSalvarFechar && 
                    !mostrarBotaoSalvarFecharCarregando &&
                    !smDown && !mdDown) && 
                (<Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={aoClicarEmSalvarFechar}
                    endIcon={<Icon>save</Icon>}
                >
                    <Typography 
                        variant='button' 
                        whiteSpace='nowrap' 
                        textOverflow='ellipsis' 
                        overflow='hidden'>
                            Salvar e Voltar
                    </Typography>
                    
                </Button>)
            }
            {
                (mostrarBotaoSalvarFecharCarregando && !smDown && !mdDown) && 
                    (<Skeleton width={180} height={60}/>)}
            {
                (mostrarBotaoApagar && !mostrarBotaoApagarCarregando) &&(<Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={aoClicarEmApagar}
                    endIcon={<Icon>delete</Icon>}
                >
                    <Typography 
                        variant='button' 
                        whiteSpace='nowrap' 
                        textOverflow='ellipsis' 
                        overflow='hidden'>
                            Apagar
                    </Typography>                    
                </Button>)
            }
            {mostrarBotaoApagarCarregando && (<Skeleton width={110} height={60}/>)}
            {
                (mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown) && (<Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={aoClicarEmNovo}
                    endIcon={<Icon>add</Icon>}
                >
                    <Typography 
                        variant='button' 
                        whiteSpace='nowrap' 
                        textOverflow='ellipsis' 
                        overflow='hidden'>
                        {textoBotaoNovo}
                    </Typography>                      
                </Button>)
            }
            {
                (mostrarBotaoNovoCarregando && !smDown) && 
                (<Skeleton width={110} height={60}/>)
            }
            {(
                mostrarBotaoVoltar &&
                (
                    mostrarBotaoNovo || 
                    mostrarBotaoApagar || 
                    mostrarBotaoSalvar || 
                    mostrarBotaoSalvarFechar
                ) &&
                (<Divider variant='middle' orientation='vertical'/>)
            )}
            {
                (mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) &&(<Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={aoClicarEmVoltar}
                    endIcon={<Icon>arrow_back</Icon>}
                >
                    <Typography 
                        variant='button' 
                        whiteSpace='nowrap' 
                        textOverflow='ellipsis' 
                        overflow='hidden'>
                        Voltar
                    </Typography>                      
                </Button>)
            }
            {mostrarBotaoVoltarCarregando && (<Skeleton width={110} height={60}/>)}
        </Box>);
};