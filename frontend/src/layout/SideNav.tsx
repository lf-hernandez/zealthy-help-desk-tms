import { List, ListItem, ListItemText } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useNavigation } from '../hooks/navigation';
import { Pages } from '../types';

export const SideNav = () => {
    const drawerWidth = 240;
    const drawerStyles = {
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
        },
    };
    const activeItemStyles = {
        backgroundColor: '#f4f4f4',
    };

    const { currentPage, setCurrentPage } = useNavigation();

    const drawerContent = (
        <List>
            <ListItem
                onClick={() => setCurrentPage(Pages.SUBMIT_FORM)}
                sx={currentPage === Pages.SUBMIT_FORM ? activeItemStyles : null}
            >
                <ListItemText primary="Submit Ticket" />
            </ListItem>
            <ListItem
                onClick={() => setCurrentPage(Pages.ADMIN_PANEL)}
                sx={currentPage === Pages.ADMIN_PANEL ? activeItemStyles : null}
            >
                <ListItemText primary="Admin Panel" />
            </ListItem>
        </List>
    );

    return (
        <Drawer variant="permanent" sx={drawerStyles}>
            {drawerContent}
        </Drawer>
    );
};
