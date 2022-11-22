export interface IBotaoFerramentaDetalheProps {
    children?: string | never[];
    textoBotao?: string;
    mostrarBotao: boolean;
    mostrarBotaoCarregando: boolean;
    smDown?: boolean;
    mdDown?: boolean;
    onClick?: () => void;
}