import { Avatar, Box, Divider, Drawer, Icon, List, 
    ListItemButton, ListItemIcon, ListItemText, useMediaQuery, 
    useTheme } from '@mui/material';

import { useAppThemeContext, useDrawerContext } from '../../context';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { IAppDrawerProviderProps, IListItemLinkProps } from '../../interfaces';

const ListItemLink: React.FC<IListItemLinkProps> = ({ label, icon, to, onClick }) => {

    const navigate = useNavigate();

    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false });

    const handleClick = () => {
        navigate(to);
        onClick?.();        
    };

    return(
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label}></ListItemText>
        </ListItemButton>
    );
};


export const MenuLateral: React.FC<IAppDrawerProviderProps> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
    const { toggleTheme } = useAppThemeContext();
    return (
        <>
            <Drawer open={isDrawerOpen} variant={ smDown ?  'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>
                    <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
                        <Avatar sx={{height: theme.spacing(12), width: theme.spacing(12)}} 
                            src=''/>
                    </Box>
                    <Divider />
                    <Box flex={1}>
                        <List component='nav'>
                            {
                                drawerOptions.map(drawerOption => (
                                    <ListItemLink 
                                        key={drawerOption.path}
                                        label={drawerOption.label} 
                                        to='/pagina-inicial' 
                                        icon={drawerOption.icon} 
                                        onClick={ smDown ? toggleDrawerOpen : undefined }/> ))
                            }
                        </List>
                    </Box>

                    <Box>
                        <List component='nav'>
                            <ListItemButton onClick={toggleTheme}>
                                <ListItemIcon>
                                    <Icon>dark_mode</Icon>
                                </ListItemIcon>
                                <ListItemText primary='Alterar Tema'></ListItemText>
                            </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Drawer>
            <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>{children}</Box>
        </>
    );
};