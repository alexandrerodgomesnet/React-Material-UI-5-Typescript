import { Button, Icon, Skeleton, Typography } from '@mui/material';
import { IBotaoFerramentaDetalheProps } from '../../interfaces/barra-ferramentas/ferramenta-detalhe';

export const BotaoVoltar: React.FC<IBotaoFerramentaDetalheProps> = ({
    mostrarBotao,
    mostrarBotaoCarregando,
    onClick
}) => {
    return (
        <>
            {
                (mostrarBotao && !mostrarBotaoCarregando) &&
                (<Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    onClick={onClick}
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
            {
                mostrarBotaoCarregando && (<Skeleton width={110} height={60}/>)
            }
        </>
    );
};