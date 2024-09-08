import React, { useEffect } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton, 
  Typography, 
  Paper, 
  Container,
  Grid,
  Box,
} from '@mui/material';
import { Delete as DeleteIcon, WbSunny as SunIcon, Opacity as HumidityIcon, Air as WindIcon } from '@mui/icons-material';
import { useBreakpoint } from '../context/BreakpointContext';
import { Link } from 'react-router-dom';

const SavedLocations = () => {
  const [favorites, setFavorites] = React.useState([]);
  const { isSmallScreen, isMediumScreen, isLargeScreen } = useBreakpoint();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log(savedFavorites); // Lista de ciudades favoritas
    setFavorites(savedFavorites);
  }, []);

  const handleDelete = (name) => {
    const updatedFavorites = favorites.filter(city => city.name !== name);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Calcular el ancho de la lista basado en el tamaño de la pantalla (por breakpoint)
  const getWidth = () => {
    if (isLargeScreen) return 'calc(100% - 240px)'; // Si es pantalla grande, restar el ancho del drawer
    if (isMediumScreen) return 'calc(100% - 200px)'; // Si es pantalla mediana
    if (isSmallScreen) return 'calc(100% - 160px)'; // Si es pantalla pequeña
    return '100%'; // Pantallas muy pequeñas
  };

  console.log(getWidth());
  return (
    <Box 
      sx={{ 
        width: '100%',
        height: '100vh', // Ocupar el 100% del alto disponible
        marginLeft: 'auto', // Evita solapamiento con el menú lateral 
        paddingTop: 0, 
        display: 'flex', 
        flexDirection: 'column', // Layout en columna
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ padding: '16px' }}>
        Ciudades Favoritas
      </Typography>
      <Paper 
        elevation={3}
        sx={{
          flexGrow: 1, // Permitir que el Paper crezca para ocupar el espacio restante
          overflowY: 'auto', // Habilitar scroll si el contenido es más grande que la pantalla
        }}
      >
        <List>
          {favorites.map((city) => (
            <ListItem key={city.id} divider>
              <ListItemText
                primary={
                  <Link to={`/details/${city.name}`} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                    {city.name}
                  </Link>
                }
                secondary={
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography component="span" variant="body2" color="text.primary">
                        <SunIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                        {city.temp}°C
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography component="span" variant="body2" color="text.primary">
                        <HumidityIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                        {city.humidity}%
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography component="span" variant="body2" color="text.primary">
                        <WindIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                        {city.windSpeed} km/h
                      </Typography>
                    </Grid>
                  </Grid>
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(city.name)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default SavedLocations;