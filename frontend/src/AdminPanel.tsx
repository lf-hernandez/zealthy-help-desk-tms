import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
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

const BASE_URL = `${import.meta.env.VITE_API_URL}/tickets/`;

type Ticket = {
    customer_email: string;
    customer_name: string;
    date_created: string;
    description: string;
    employee_name: string;
    id: string;
    last_modified: string;
    resolution_description: string;
    status: string;
};

export const AdminPanel = () => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [tickets, setTickets] = React.useState<Array<Ticket>>();
    const [selectedTicket, setSelectedTicket] = React.useState<Ticket>();

    const [status, setStatus] = React.useState('');
    const [resolutionDescription, setResolutionDescription] = React.useState('');
    const [assignee, setAssignee] = React.useState('');

    const [modalOpen, setModalOpen] = React.useState(false);

    const getAllTickets = async () => {
        try {
            const response = await fetch(BASE_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            setTickets(data);
        } catch (e) {
            alert('Failed to load tickets');
            console.error(e);
        }
    };

    const updateTicketStatus = async (id: string) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status,
                    employee_name: assignee,
                    resolution_description: resolutionDescription,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (e) {
            alert('Failed to update ticket');
            console.error(e);
        }
        await getAllTickets();
    };

    React.useEffect(() => {
        getAllTickets();
    }, []);

    const handleRowClick = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setStatus(ticket.status);
        setResolutionDescription(ticket.resolution_description);
        setAssignee(ticket.employee_name);
        setModalOpen(true);
    };
    const handleStatusChange = (event: SelectChangeEvent) =>
        setStatus(event.target.value as string);
    const handleClose = () => setModalOpen(false);
    const onUpdate = async () => {
        if (!selectedTicket) {
            setModalOpen(false);
            return;
        }
        await updateTicketStatus(selectedTicket.id);
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
            {tickets && tickets?.length > 0 ? (
                <>
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
                                {tickets.map((ticket) => (
                                    <TableRow
                                        key={ticket.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        onClick={() => handleRowClick(ticket)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {ticket.id}
                                        </TableCell>
                                        <TableCell align="left">{ticket.description}</TableCell>
                                        <TableCell align="left">{ticket.employee_name}</TableCell>
                                        <TableCell align="left">{ticket.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Dialog open={modalOpen} onClose={handleClose} fullScreen={fullScreen}>
                        <DialogTitle>{'Ticket Details'}</DialogTitle>

                        <DialogContent>
                            <div>
                                <Typography sx={{ mt: 2 }}>
                                    {selectedTicket && `ID: ${selectedTicket.id}`}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    {selectedTicket && `Created on: ${selectedTicket.date_created}`}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    {selectedTicket && `Description: ${selectedTicket.description}`}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    {selectedTicket &&
                                        `Customer Name: ${selectedTicket.customer_name}`}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                    {selectedTicket &&
                                        `Customer Email: ${selectedTicket.customer_email}`}
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
                                    {selectedTicket &&
                                        `Last modified: ${selectedTicket.last_modified}`}
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
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={onUpdate} color="primary">
                                Update
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            ) : (
                'No tickets yet'
            )}
        </>
    );
};
