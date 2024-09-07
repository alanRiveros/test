import { Container, Typography, Box } from '@mui/material';

const About = () => {
    return (
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            About Page
          </Typography>
          <Typography variant="body1" gutterBottom>
            Esta es la página "Acerca de" donde puedes proporcionar información sobre tu aplicación.
          </Typography>
        </Box>
      </Container>
    );
  };
  
  export default About;