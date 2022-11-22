import { Divider } from '@mui/material';
import { IDividerBotaoProps } from '../../interfaces';

export const DividerBotao: React.FC<IDividerBotaoProps> = ({
    mostrarBotaoVoltar,
    mostrarBotaoNovo,
    mostrarBotaoApagar,
    mostrarBotaoSalvar,
    mostrarBotaoSalvarFechar
}) => {
    return(
        <>
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
        </>
    );
};