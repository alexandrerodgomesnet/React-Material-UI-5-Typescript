export interface IBotaoFerramentaDetalheProps {
    textoBotao?: string;
    mostrarBotao: boolean;
    mostrarBotaoCarregando: boolean;
    smDown?: boolean;
    mdDown?: boolean;
    onClick?: () => void;
}