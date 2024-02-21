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
    useMediaQuery,
    useTheme,
} from '@mui/material';
import * as React from 'react';

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

    const handleSelectChange = (event: { target: { value: string } }) => {
        setShowAdminPanel(event.target.value === 'adminPanel');
    };

    const drawerContent = (
        <List>
            <ListItem
                button
                onClick={() => setShowAdminPanel(false)}
                sx={!showAdminPanel ? activeItemBackground : null}
            >
                <ListItemText primary="Submit Ticket" />
            </ListItem>
            <ListItem
                button
                onClick={() => setShowAdminPanel(true)}
                sx={showAdminPanel ? activeItemBackground : null}
            >
                <ListItemText primary="Admin Panel" />
            </ListItem>
        </List>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
            {isMobile ? (
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <Select
                        value={showAdminPanel ? 'adminPanel' : 'submitTicket'}
                        onChange={handleSelectChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="submitTicket">Submit Ticket</MenuItem>
                        <MenuItem value="adminPanel">Admin Panel</MenuItem>
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
    );
}

export default App;
