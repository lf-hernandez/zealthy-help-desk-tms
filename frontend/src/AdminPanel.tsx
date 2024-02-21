import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import * as React from 'react';

export const AdminPanel = () => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedTicket, setSelectedTicket] = React.useState<{
        ticketId: string;
        description: string;
        createdOn: string;
        lastModifiedOn: string;
        customerName: string;
        customerEmail: string;
        status: string;
        assignee: string;
        resolutionDescription: string;
    }>();
    const [status, setStatus] = React.useState('');
    const [resolutionDescription, setResolutionDescription] = React.useState('');
    const [assignee, setAssignee] = React.useState('');
    const [modalOpen, setModalOpen] = React.useState(false);
    function createData(
        ticketId: string,
        description: string,
        createdOn: string,
        lastModifiedOn: string,
        customerName: string,
        customerEmail: string,
        status: string,
        assignee: string,
        resolutionDescription: string
    ) {
        return {
            ticketId,
            description,
            createdOn,
            lastModifiedOn,
            customerName,
            customerEmail,
            status,
            assignee,
            resolutionDescription,
        };
    }

    const rows = [
        createData(
            '1',
            'printer not connecting',
            '2024-02-21T20:18:34.692284Z',
            '2024-02-21T20:18:34.692284Z',
            'John Smith',
            'jsmith@email.com',
            'new',
            '',
            ''
        ),
        createData(
            '2',
            'scanner restarting randomly',
            '2024-02-21T20:18:34.692284Z',
            '2024-02-21T20:18:34.692284Z',
            'John Smith',
            'jsmith@email.com',
            'in progress',
            'Tim',
            ''
        ),
        createData(
            '3',
            'phone transferring randomly',
            '2024-02-21T20:18:34.692284Z',
            '2024-02-21T20:18:34.692284Z',
            'John Smith',
            'jsmith@email.com',
            'resolved',
            'Larry',
            ''
        ),
        createData(
            '4',
            'monitor blanking',
            '2024-02-21T20:18:34.692284Z',
            '2024-02-21T20:18:34.692284Z',
            'John Smith',
            'jsmith@email.com',
            'in progress',
            'Jen',
            ''
        ),
        createData(
            '5',
            'keyboard key needs to be replaces',
            '2024-02-21T20:18:34.692284Z',
            '2024-02-21T20:18:34.692284Z',
            'John Smith',
            'jsmith@email.com',
            'new',
            '',
            ''
        ),
    ];
    const handleRowClick = (ticket: {
        ticketId: string;
        description: string;
        createdOn: string;
        lastModifiedOn: string;
        customerName: string;
        customerEmail: string;
        status: string;
        assignee: string;
        resolutionDescription: string;
    }) => {
        setSelectedTicket(ticket);
        setStatus(ticket.status);
        setResolutionDescription(ticket.resolutionDescription);
        setAssignee(ticket.assignee);
        setModalOpen(true);
    };
    const handleStatusChange = (event: SelectChangeEvent) =>
        setStatus(event.target.value as string);
    const handleClose = () => setModalOpen(false);
    const handleUpdate = () => {
        setAssignee('');
        setStatus('');
        setResolutionDescription('');
        setModalOpen(false);
    };
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
                                onClick={() => handleRowClick(row)}
                                style={{ cursor: 'pointer' }} // Add cursor style
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

            <Dialog open={modalOpen} onClose={handleClose} fullScreen={fullScreen}>
                <DialogTitle>{'Ticket Details'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography sx={{ mt: 2 }}>
                            {selectedTicket && `ID: ${selectedTicket.ticketId}`}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            {selectedTicket && `Created on: ${selectedTicket.createdOn}`}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            {selectedTicket && `Description: ${selectedTicket.description}`}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            {selectedTicket && `Customer Name: ${selectedTicket.customerName}`}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            {selectedTicket && `Customer Email: ${selectedTicket.customerEmail}`}
                        </Typography>
                        <TextField
                            fullWidth
                            label="Assignee"
                            value={assignee}
                            variant="outlined"
                            margin="normal"
                            onChange={(e) => setAssignee(e.target.value)}
                        />
                        <Typography sx={{ my: 2 }}>
                            {selectedTicket && `Last modified: ${selectedTicket.lastModifiedOn}`}
                        </Typography>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={status}
                                label="Status"
                                onChange={handleStatusChange}
                            >
                                <MenuItem value={'new'}>New</MenuItem>
                                <MenuItem value={'in progress'}>In Progress</MenuItem>
                                <MenuItem value={'resolved'}>Resolved</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Resolution comment"
                            multiline
                            rows={4}
                            variant="outlined"
                            margin="normal"
                            value={resolutionDescription}
                            onChange={(e) => setResolutionDescription(e.target.value)}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
