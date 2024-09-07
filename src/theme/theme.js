import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul
    },
    secondary: {
      main: '#dc004e', // Rosa
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,   // Pequeño
      md: 960,   // Mediano
      lg: 1280,  // Grande
      xl: 1920,  // Extra Grande
    },
  },
});

export default theme;
