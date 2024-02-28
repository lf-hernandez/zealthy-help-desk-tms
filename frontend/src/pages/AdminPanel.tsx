import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { TicketModal } from '../components/TicketModal';
import { useTickets } from '../hooks/tickets';
import { Ticket } from '../types';

export const AdminPanel = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { setCurrentTicket } = useTickets();

    const handleRowClick = (ticket: Ticket) => {
        setCurrentTicket(ticket);
        setModalOpen(true);
    };
    const { tickets } = useTickets();

    if (tickets === null) {
        console.log('Tickets not initialized properly.');
        return <div>Loading...</div>;
    }

    return (
        <>
            <Typography variant="h2" gutterBottom>
                Admin Panel
            </Typography>
            <hr />
            <br />
            {tickets && tickets?.length > 0 ? (
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 750 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ticket ID</TableCell>
                                    <TableCell align="left">Description</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left" sx={{ minWidth: 80 }}>
                                        Created
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tickets.map((ticket) => (
                                    <TableRow
                                        key={ticket.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        onClick={() => {
                                            handleRowClick(ticket);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {ticket.id}
                                        </TableCell>
                                        <TableCell align="left">{ticket.description}</TableCell>
                                        <TableCell align="left">{ticket.status}</TableCell>
                                        <TableCell align="left" sx={{ minWidth: 80 }}>
                                            {moment(ticket.dateCreated).format('MM-DD-YY')}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {modalOpen ? (
                        <TicketModal modalOpen={modalOpen} closeModal={() => setModalOpen(false)} />
                    ) : null}
                </>
            ) : (
                'No tickets yet'
            )}
        </>
    );
};
