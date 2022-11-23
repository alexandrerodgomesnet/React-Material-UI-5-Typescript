import { Button, Icon, Skeleton, Typography } from '@mui/material';
import { IBotaoFerramentaDetalheProps } from '../../interfaces/barra-ferramentas/ferramenta-detalhe';

export const BotaoSalvarFechar: React.FC<IBotaoFerramentaDetalheProps> = ({
    mostrarBotao,
    mostrarBotaoCarregando,
    smDown,
    mdDown,
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
                    endIcon={<Icon>save</Icon>}
                >
                    <Typography
                        variant='button'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                        overflow='hidden'>
                            Salvar e Fechar
                    </Typography>
                </Button>)
            }
            {
                (mostrarBotaoCarregando && !smDown && !mdDown) &&
                (<Skeleton width={180} height={60}/>)
            }
        </>
    );
};