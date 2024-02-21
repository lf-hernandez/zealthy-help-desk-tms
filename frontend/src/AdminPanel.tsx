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

export const AdminPanel = () => {
    function createData(ticketId: string, description: string, assignee: string, status: string) {
        return { ticketId, description, assignee, status };
    }

    const rows = [
        createData('1', 'printer not connecting', '', 'new'),
        createData('2', 'scanner restarting randomly', 'Tim', 'in progress'),
        createData('3', 'phone transferring randomly', 'Larry', 'resolved'),
        createData('4', 'monitor blanking', 'Jen', 'in progress'),
        createData('5', 'keyboard key needs to be replaces', '', 'new'),
    ];
    return (
        <>
            <Typography variant="h2" gutterBottom>
                Admin Panel
            </Typography>
            <hr />
            <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ticket ID</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Assignee</TableCell>
                            <TableCell align="left">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.ticketId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.ticketId}
                                </TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="left">{row.assignee}</TableCell>
                                <TableCell align="left">{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
