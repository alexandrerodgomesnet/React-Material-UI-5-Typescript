import { Box, Icon, IconButton, useTheme } from '@mui/material';
import { useDrawerContext } from '../context';
import { IMenuLateralBaseProps } from '../interfaces/LayoutBase';
import { HeaderBase } from './HeaderBase';

export const MenuLateralBase: React.FC<IMenuLateralBaseProps> = ({titulo, smDown, mdDown}) => {

    const theme = useTheme();
    const { toggleDrawerOpen } = useDrawerContext();

    const getSpacingBox = (): number => {
        if(smDown)
            return 6;

        return mdDown ? 8 : 12;
    };

    return (
        <Box
            padding={1}
            display='flex'
            alignItems='center'
            height={theme.spacing(getSpacingBox())}
            gap={1}
        >
            {
                smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>menu</Icon>
                    </IconButton>)
            }

            <HeaderBase titulo={titulo} smDown={smDown} mdDown={mdDown} />
        </Box>
    );
};