import { Box, Card, CardContent, Typography } from '@mui/material';
import moment from 'moment';
import { Ticket } from '../types';

type Props = {
    ticket: Ticket;
    onPress: (ticket: Ticket) => void;
};

export const MobileTicketListItem = ({ ticket, onPress }: Props) => {
    const statusColor = {
        new: 'green',
        'in progress': 'orange',
        resolved: 'purple',
    };

    return (
        <Card
            sx={{ marginBottom: 2, position: 'relative' }}
            onClick={() => onPress(ticket)}
            style={{ cursor: 'pointer' }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '5px',
                    backgroundColor: statusColor[ticket.status],
                }}
            />

            <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <Typography variant="body2" color="textSecondary">
                    {moment(ticket.dateCreated).fromNow()}
                </Typography>
            </Box>

            <CardContent sx={{ marginLeft: '10px' }}>
                {' '}
                <Typography variant="subtitle1" component="h2" sx={{ fontWeight: 'bold' }}>
                    {ticket.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Status: {ticket.status}
                </Typography>
            </CardContent>
        </Card>
    );
};
