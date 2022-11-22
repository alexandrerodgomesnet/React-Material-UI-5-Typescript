import { Typography } from '@mui/material';
import { IHeaderBaseProps } from '../interfaces/LayoutBase';

export const HeaderBase : React.FC<IHeaderBaseProps> = ({ titulo, smDown, mdDown })=> {

    const getTypographyHeader = () => {
        if(smDown)
            return 'h5';

        return mdDown ? 'h4' : 'h3';
    };

    return (
        <Typography
            variant={(getTypographyHeader())}
            whiteSpace='nowrap'
            overflow='hidden'
            textOverflow='ellipsis'
        >
            {titulo}
        </Typography>
    );
};