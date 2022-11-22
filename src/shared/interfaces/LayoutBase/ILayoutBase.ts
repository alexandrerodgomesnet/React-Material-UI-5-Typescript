import { ReactNode } from 'react';

export interface ILayoutBaseProps {
    tituloHeader: string;
    barraFerramentas?: ReactNode
    children: string;
}