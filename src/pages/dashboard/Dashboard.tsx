
import { FerramentaDetalhe } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';

export const Dashboard = () =>{
    return (
        <LayoutBase
            tituloHeader='Página Inicial'
            barraFerramentas=
                {(
                    <FerramentaDetalhe mostrarBotaoSalvarFechar/>
                )}>
            Página Inicial
        </LayoutBase>
    );
};