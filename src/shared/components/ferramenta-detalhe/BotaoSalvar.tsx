import { Button, Icon, Skeleton, Typography } from '@mui/material';
import { IBotaoFerramentaDetalheProps } from '../../interfaces/barra-ferramentas/ferramenta-detalhe';

export const BotaoSalvar: React.FC<IBotaoFerramentaDetalheProps> = ({
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
                    variant='contained'
                    onClick={onClick}
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
            {
                mostrarBotaoCarregando && (<Skeleton width={110} height={60}/>)
            }
        </>
    );
};