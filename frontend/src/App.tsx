import { Box, Button, Container, TextField, Typography } from '@mui/material';
import * as React from 'react';
const BASE_URL = `${import.meta.env.VITE_API_URL}/tickets/`;

function App() {
    const [customerName, setCustomerName] = React.useState('');
    const [customerEmail, setCustomerEmail] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleSubmit = async () => {
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
        } catch (e) {
            alert('Failed to submit ticket');
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h2" gutterBottom>
                Submit Support Ticket
            </Typography>
            <hr />
            <form onSubmit={handleSubmit}>
                <Box my={4}>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        margin="normal"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Box>

                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </form>
        </Container>
    );
}

export default App;
