export interface IListItemLinkProps {
    label: string;
    icon: string;
    to: string;
    onClick: (() => void) | undefined;
}