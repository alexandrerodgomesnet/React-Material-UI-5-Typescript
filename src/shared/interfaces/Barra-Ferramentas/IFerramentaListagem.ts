export interface IFerramentaListagemProps {
    textoBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextoBusca?: (novoTexto: string) => void;
    textoNovoBotao?: string;
    mostrarNovoBotao?: boolean;
    aoCLicarEmNovo?: () => void;
}