import { Button, Icon, Typography } from '@mui/material';
import { IBotaoSalvarFerramentaDetalheProps } from '../../interfaces/barra-ferramentas/ferramenta-detalhe';

export const BotaoSalvar: React.FC<IBotaoSalvarFerramentaDetalheProps> = ({
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
        </>
    );
};