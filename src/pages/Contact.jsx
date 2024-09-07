import { Container, Typography, Box, TextField, Button } from '@mui/material';

const Contact = () => {
    return (
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Contact Page
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Correo Electrónico"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
            />
            <TextField
              label="Mensaje"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Enviar
            </Button>
          </Box>
        </Box>
      </Container>
    );
  };
  
  export default Contact;