import { Box } from '@mui/material';
import { ILayoutBaseProps } from '../interfaces';
import { getBreakPointsDown } from '../utils/util';
import { MenuLateralBase } from './MenuLateralBase';

export const LayoutBase: React.FC<ILayoutBaseProps> = (
    {children, tituloHeader, barraFerramentas}) => 
{
    const smDown = getBreakPointsDown('sm');
    const mdDown = getBreakPointsDown('md');
    
    return (
        <Box height='100%' display='flex' flexDirection='column' gap={1}>
            <MenuLateralBase titulo={tituloHeader} smDown={smDown} mdDown={mdDown} />
            {
                barraFerramentas && (
                    <Box>
                        {barraFerramentas}
                    </Box>
                )
            }
            <Box flex={1} overflow='auto'>
                {children}
            </Box>
        </Box>
    );
};