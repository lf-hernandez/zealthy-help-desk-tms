import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { useTickets } from '../hooks/tickets';
import { TicketStatus } from '../types';

type Props = { modalOpen: boolean; closeModal: () => void };

export const TicketModal = ({ modalOpen, closeModal }: Props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { currentTicket, updateCurrentTicket } = useTickets();

    const [status, setStatus] = useState<TicketStatus>(currentTicket?.status ?? TicketStatus.NEW);
    const [resolutionDescription, setResolutionDescription] = useState(
        currentTicket?.resolutionDescription ?? ''
    );

    const statusItems = [
        { key: TicketStatus['NEW'], value: TicketStatus.NEW },
        { key: TicketStatus['IN_PROGRESS'], value: TicketStatus.IN_PROGRESS },
        { key: TicketStatus['RESOLVED'], value: TicketStatus.RESOLVED },
    ];

    if (!currentTicket) {
        closeModal();
        return;
    }

    const handleStatusChange = (event: SelectChangeEvent) =>
        setStatus(event.target.value as TicketStatus);

    const onUpdate = () => {
        updateCurrentTicket({ status, resolutionDescription });
        closeModal();
    };
    return (
        <Dialog open={modalOpen} onClose={closeModal} fullScreen={fullScreen}>
            <DialogTitle>{'Ticket Details'}</DialogTitle>

            <DialogContent>
                <div>
                    <Typography sx={{ mt: 2 }}>
                        {currentTicket && `ID: ${currentTicket.id}`}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        {currentTicket &&
                            `Created on: ${moment(currentTicket.dateCreated).format(
                                'MMMM DD, YYYY @ h:mm a'
                            )}`}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        {currentTicket && `Description: ${currentTicket.description}`}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        {currentTicket && `Customer Name: ${currentTicket.customerName}`}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        {currentTicket && `Customer Email: ${currentTicket.customerEmail}`}
                    </Typography>

                    <Typography sx={{ my: 2 }}>
                        {currentTicket &&
                            `Last modified: ${moment(currentTicket.lastModified).format(
                                'MMMM DD, YYYY @ h:mm a'
                            )}`}
                    </Typography>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={status}
                            label="Status"
                            onChange={handleStatusChange}
                        >
                            {statusItems.map((item) => (
                                <MenuItem value={item.key}>{item.value}</MenuItem>
                            ))}
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
                <Button onClick={closeModal} color="secondary">
                    Cancel
                </Button>
                <Button onClick={onUpdate} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};
