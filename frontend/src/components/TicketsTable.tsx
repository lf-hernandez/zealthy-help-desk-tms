import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import moment from 'moment';
import { useTickets } from '../hooks/tickets';
import { Ticket } from '../types';

type Props = {
    onClick: (ticket: Ticket) => void;
};

export const TicketsTable = ({ onClick }: Props) => {
    const { tickets } = useTickets();

    if (!tickets || tickets.length === 0) {
        return <p>No tickets available</p>;
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 750 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell align="left">Customer</TableCell>
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
                                onClick(ticket);
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <TableCell
                                sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '50px',
                                }}
                                component="th"
                                scope="row"
                            >
                                {ticket.description}
                            </TableCell>
                            <TableCell align="left">{ticket.customerName}</TableCell>
                            <TableCell align="left">{ticket.status}</TableCell>
                            <TableCell align="left" sx={{ minWidth: 80 }}>
                                {moment(ticket.dateCreated).format('MM-DD-YY')}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
