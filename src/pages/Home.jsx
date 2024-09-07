import { Container, Typography, Button, Box } from '@mui/material';
import { useBreakpoint } from '../context/BreakpointContext';

const Home = () => {
  const { isSmallScreen, isMediumScreen, isLargeScreen } = useBreakpoint();
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Home Page
        </Typography>
        <Typography variant="body1" gutterBottom>
          {isSmallScreen && 'Estás en una pantalla pequeña.'}
          {isMediumScreen && 'Estás en una pantalla mediana.'}
          {isLargeScreen && 'Estás en una pantalla grande.'}
        </Typography>
        <Button variant="contained" color="primary">
          Acción Primaria
        </Button>
      </Box>
    </Container>
  );
};
  
  export default Home;