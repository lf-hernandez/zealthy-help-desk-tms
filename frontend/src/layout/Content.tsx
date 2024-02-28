import Container from '@mui/material/Container';
import { useContext } from 'react';

import { NavigationContext } from '../contexts/NavigationContext';
import { AdminPanel } from '../pages/AdminPanel';
import { SubmitTicket } from '../pages/SubmitTicket';
import { Pages } from '../types';

export const Content = () => {
    const { currentPage } = useContext(NavigationContext);

    return (
        <Container maxWidth="md" sx={{ width: '100%' }}>
            {currentPage === Pages.ADMIN_PANEL ? <AdminPanel /> : <SubmitTicket />}
        </Container>
    );
};
