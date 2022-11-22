export interface IFerramentaListagemProps {
    children: string | never[];
    textoBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextoBusca?: (novoTexto: string) => void;
    textoNovoBotao?: string;
    mostrarNovoBotao?: boolean;
    aoCLicarEmNovo?: () => void;
}