import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { MobileTicketList } from '../components/MobileTicketList';
import { TicketModal } from '../components/TicketModal';
import { TicketsTable } from '../components/TicketsTable';
import { useTickets } from '../hooks/tickets';
import { Ticket } from '../types';

export const AdminPanel = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [modalOpen, setModalOpen] = useState(false);
    const { setCurrentTicket } = useTickets();

    const handleRowClick = (ticket: Ticket) => {
        setCurrentTicket(ticket);
        setModalOpen(true);
    };

    return (
        <>
            <Typography variant="h2" gutterBottom>
                Admin Panel
            </Typography>
            <hr />
            <br />

            {isMobile ? (
                <MobileTicketList onPress={handleRowClick} />
            ) : (
                <TicketsTable onClick={handleRowClick} />
            )}

            {modalOpen && (
                <TicketModal modalOpen={modalOpen} closeModal={() => setModalOpen(false)} />
            )}
        </>
    );
};
