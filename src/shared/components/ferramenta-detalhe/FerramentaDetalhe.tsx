import { Box, Paper, useTheme } from '@mui/material';
import { IFerramentaDetalheProps } from '../../interfaces';
import { getBreakPointsDown } from '../../utils/util';
import { BotaoApagar } from './BotaoApagar';
import { BotaoNovo } from './BotaoNovo';
import { BotaoSalvar } from './BotaoSalvar';
import { BotaoSalvarVoltar } from './BotaoSalvarVoltar';
import { BotaoVoltar } from './BotaoVoltar';
import { DividerBotao } from './DividerBotao';

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

            <BotaoSalvar
                mostrarBotao={mostrarBotaoSalvar}
                mostrarBotaoCarregando={mostrarBotaoSalvarCarregando}
                onClick={aoClicarEmSalvar}
            />

            <BotaoSalvarVoltar
                mostrarBotao={mostrarBotaoSalvarFechar}
                mostrarBotaoCarregando={mostrarBotaoSalvarFecharCarregando}
                onClick={aoClicarEmSalvarFechar}
                smDown={smDown}
                mdDown={mdDown}
            />

            <BotaoApagar
                mostrarBotao={mostrarBotaoApagar}
                mostrarBotaoCarregando={mostrarBotaoApagarCarregando}
                onClick={aoClicarEmApagar}
            />

            <BotaoNovo
                textoBotao={textoBotaoNovo}
                mostrarBotao={mostrarBotaoNovo}
                mostrarBotaoCarregando={mostrarBotaoNovoCarregando}
                onClick={aoClicarEmNovo}
                smDown={smDown}
            />

            <DividerBotao
                mostrarBotaoSalvar={mostrarBotaoSalvar}
                mostrarBotaoSalvarFechar={mostrarBotaoSalvarFechar}
                mostrarBotaoApagar={mostrarBotaoApagar}
                mostrarBotaoNovo={mostrarBotaoNovo}
                mostrarBotaoVoltar={mostrarBotaoVoltar}
            />

            <BotaoVoltar
                mostrarBotao={mostrarBotaoVoltar}
                mostrarBotaoCarregando={mostrarBotaoVoltarCarregando}
                onClick={aoClicarEmVoltar}
            />

        </Box>);
};