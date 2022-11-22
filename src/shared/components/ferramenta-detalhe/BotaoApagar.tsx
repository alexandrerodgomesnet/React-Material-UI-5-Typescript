import { Button, Icon, Skeleton, Typography } from '@mui/material';
import { IBotaoFerramentaDetalheProps } from '../../interfaces/barra-ferramentas/ferramenta-detalhe';

export const BotaoApagar: React.FC<IBotaoFerramentaDetalheProps> = ({
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
            {
                mostrarBotaoCarregando && (<Skeleton width={110} height={60}/>)
            }
        </>
    );
};