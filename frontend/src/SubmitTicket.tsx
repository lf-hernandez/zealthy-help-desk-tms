import { Box, Button, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { toast } from 'react-hot-toast';

const BASE_URL = `${import.meta.env.VITE_API_URL}/tickets/`;

export const SubmitTicket = () => {
    const [customerName, setCustomerName] = React.useState('');
    const [customerEmail, setCustomerEmail] = React.useState('');
    const [description, setDescription] = React.useState('');

    const clearFields = () => {
        setCustomerName('');
        setCustomerEmail('');
        setDescription('');
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customer_name: customerName,
                    customer_email: customerEmail,
                    description: description,
                }),
            });
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
                        fullWidth
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                    <TextField
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
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </form>
        </>
    );
};
