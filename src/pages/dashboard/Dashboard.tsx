
import { FerramentaDetalhe } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';

export const Dashboard = () =>{
    return (
        <LayoutBase 
            tituloHeader='Página Inicial'
            barraFerramentas=
                {(
                    <FerramentaDetalhe mostrarBotaoSalvarFechar/>
                    // <FerramentaListagem 
                    //     mostrarInputBusca 
                    //     textoNovoBotao='Adicionar'>                    
                    // </FerramentaListagem>
                )}>
            Testando
        </LayoutBase>
    );
};