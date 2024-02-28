import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Toaster } from 'react-hot-toast';

import { NavigationProvider } from './contexts/NavigationContext';
import { TicketsProvider } from './contexts/TicketsContext';
import { Content } from './layout/Content';
import { Navigation } from './layout/Navigation';

function App() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <NavigationProvider>
            <TicketsProvider>
                <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
                    <Toaster />
                    <Navigation />
                    <Content />
                </Box>
            </TicketsProvider>
        </NavigationProvider>
    );
}

export default App;
