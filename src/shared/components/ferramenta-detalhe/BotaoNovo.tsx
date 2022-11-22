import { Button, Icon, Skeleton, Typography } from '@mui/material';
import { IBotaoFerramentaDetalheProps } from '../../interfaces/barra-ferramentas/ferramenta-detalhe';

export const BotaoNovo: React.FC<IBotaoFerramentaDetalheProps> = ({
    textoBotao,
    mostrarBotao,
    mostrarBotaoCarregando,
    smDown,
    onClick
}) => {
    return (
        <>
            {
                (mostrarBotao && !mostrarBotaoCarregando && !smDown) &&
                (<Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={onClick}
                    endIcon={<Icon>add</Icon>}
                >
                    <Typography
                        variant='button'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                        overflow='hidden'>
                        {textoBotao}
                    </Typography>
                </Button>)
            }
            {
                (mostrarBotaoCarregando && !smDown) && (<Skeleton width={110} height={60}/>)
            }
        </>
    );
};