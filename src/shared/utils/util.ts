import { Breakpoint, Theme, useMediaQuery } from '@mui/material';

export const getBreakPointsDown = (breakpoint: Breakpoint) =>{
    return useMediaQuery((theme: Theme) => theme.breakpoints.down(breakpoint));
};