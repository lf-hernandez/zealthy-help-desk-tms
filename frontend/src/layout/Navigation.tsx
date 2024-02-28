import { useMediaQuery, useTheme } from '@mui/material';

import { MobileDropdownNav } from './MobileDropdownNav';
import { SideNav } from './SideNav';

export const Navigation = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return isMobile ? <MobileDropdownNav /> : <SideNav />;
};
