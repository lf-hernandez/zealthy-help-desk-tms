import {
    Box,
    Container,
    Drawer,
    FormControl,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';

import { AdminPanel } from './AdminPanel';
import { SubmitTicket } from './SubmitTicket';

function App() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [showAdminPanel, setShowAdminPanel] = React.useState(false);
    
    const drawerWidth = 240;
    const activeItemBackground = {
        backgroundColor: '#f4f4f4',
    };
    const SELECT_OPTION_ADMIN_PANEL = 'adminPanel';
    const SELECT_OPTION_SUBMIT_TICKET = 'submitTicket';

    const handleSelectChange = (event: SelectChangeEvent) => {
        setShowAdminPanel((event.target.value as string) === SELECT_OPTION_ADMIN_PANEL);
    };

    const drawerContent = (
        <List>
            <ListItem
                onClick={() => setShowAdminPanel(false)}
                sx={!showAdminPanel ? activeItemBackground : null}
            >
                <ListItemText primary="Submit Ticket" />
            </ListItem>
            <ListItem
                onClick={() => setShowAdminPanel(true)}
                sx={showAdminPanel ? activeItemBackground : null}
            >
                <ListItemText primary="Admin Panel" />
            </ListItem>
        </List>
    );

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
                <Toaster />
                {isMobile ? (
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <Select
                            value={
                                showAdminPanel
                                    ? SELECT_OPTION_ADMIN_PANEL
                                    : SELECT_OPTION_SUBMIT_TICKET
                            }
                            onChange={handleSelectChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value={SELECT_OPTION_SUBMIT_TICKET}>Submit Ticket</MenuItem>
                            <MenuItem value={SELECT_OPTION_ADMIN_PANEL}>Admin Panel</MenuItem>
                        </Select>
                    </FormControl>
                ) : (
                    <Drawer
                        variant="permanent"
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                        }}
                    >
                        {drawerContent}
                    </Drawer>
                )}

                <Container maxWidth="md" sx={{ width: '100%' }}>
                    {showAdminPanel ? <AdminPanel /> : <SubmitTicket />}
                </Container>
            </Box>
        </>
    );
}

export default App;
