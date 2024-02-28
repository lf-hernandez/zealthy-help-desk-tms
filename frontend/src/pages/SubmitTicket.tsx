import { Box, Button, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { toast } from 'react-hot-toast';
import { useTickets } from '../hooks/tickets';

export const SubmitTicket = () => {
    const [customerName, setCustomerName] = React.useState('');
    const [customerEmail, setCustomerEmail] = React.useState('');
    const [description, setDescription] = React.useState('');
    const {addTicket} = useTickets(); 

    const clearFields = () => {
        setCustomerName('');
        setCustomerEmail('');
        setDescription('');
    };

    const handleSubmit =  (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            addTicket({
                customerEmail,
                customerName,
                description
            })
            toast.success('Ticket submitted successfully');
        } catch (e) {
            toast.error('Failed to submit ticket');
            console.error(e);
        }

        clearFields();
    };

    return (
        <>
            <Typography variant="h2" gutterBottom>
                Submit Support Ticket
            </Typography>
            <hr />
            <form onSubmit={(event) => handleSubmit(event)}>
                <Box my={4}>
                    <TextField
                        required
                        fullWidth
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                    <TextField
                        required
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        type="email"
                    />
                    <TextField
                        required
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        margin="normal"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Box>

                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={customerName === '' || customerEmail === '' || description === ''}
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </>
    );
};
