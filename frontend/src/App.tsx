import { Box, Button, Container, TextField, Typography } from '@mui/material';
import * as React from 'react';

function App() {
    const [customerName, setCustomerName] = React.useState('');
    const [customerEmail, setCustomerEmail] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleNewTicket = () => {
        alert(`form data: ${customerName}, ${customerEmail}, ${description}`);
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h2" gutterBottom>
                Submit Support Ticket
            </Typography>
            <hr />

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
                <Button variant="contained" color="primary" onClick={handleNewTicket}>
                    Submit
                </Button>
            </Box>
        </Container>
    );
}

export default App;
