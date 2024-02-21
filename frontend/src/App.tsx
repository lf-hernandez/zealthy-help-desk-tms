import { Box, Container, Drawer, List, ListItem, ListItemText } from '@mui/material';
import * as React from 'react';

import { AdminPanel } from './AdminPanel';
import { SubmitTicket } from './SubmitTicket';

function App() {
    const [showAdminPanel, setShowAdminPanel] = React.useState(false);
    const drawerWidth = 240;
    const activeItemBackground = {
        backgroundColor: '#f4f4f4',
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
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
            </Drawer>

            <Container maxWidth="md">
                {showAdminPanel ? <AdminPanel /> : <SubmitTicket />}
            </Container>
        </Box>
    );
}

export default App;
