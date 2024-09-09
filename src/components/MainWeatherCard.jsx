import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Importamos el ícono de corazón
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Ícono de corazón vacío para no favoritos

const MainWeatherCard = ({ weatherData, onMoreDetailsClick }) => {
  const {
    location: { name, localtime },
    current: { temp_c, condition, humidity, wind_kph, pressure_mb },
  } = weatherData;

  const [isFavorite, setIsFavorite] = useState(false); // Estado para manejar si la ciudad es favorita

  // Estructura de los datos que vamos a guardar en favoritos
  const cityData = {
    name: weatherData.location.name,
    temp: weatherData.current.temp_c,
    humidity: weatherData.current.humidity,
    windSpeed: weatherData.current.wind_kph,
  };

  // Cargar la lista de favoritos desde localStorage al montar el componente
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // Verificar si la ciudad ya está guardada como favorita
    const cityIsFavorite = savedFavorites.some((city) => city.name === weatherData.location.name);
    setIsFavorite(cityIsFavorite);
  }, [weatherData.location.name]);

   // Función para manejar el clic en el ícono de corazón
  const handleFavoriteClick = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      // Si ya es favorito, remover de la lista
      const updatedFavorites = savedFavorites.filter((city) => city.name !== weatherData.location.name);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      // Si no es favorito, agregar el objeto con los datos de la ciudad
      savedFavorites.push(cityData);
      localStorage.setItem('favorites', JSON.stringify(savedFavorites));
    }

    setIsFavorite(!isFavorite); // Alternar el estado de favorito
  };


  return (
    <Box sx={{ padding: 3, backgroundColor: 'lightblue', borderRadius: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h4">{name}</Typography>
          <Typography variant="subtitle1">Hoy</Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Typography variant="h3">{temp_c}°C</Typography>
          <Typography variant="subtitle1">{condition.text}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={4}>
          <Typography variant="body1">Presión: {pressure_mb} hPa</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Humedad: {humidity}%</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">Viento: {wind_kph} km/h</Typography>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, textAlign: 'right' }}>
        {/* Ícono de corazón para marcar como favorito */}
        <IconButton onClick={handleFavoriteClick}>
            {isFavorite ? (
            <FavoriteIcon sx={{ color: 'pink' }} />
            ) : (
            <FavoriteBorderIcon sx={{ color: 'grey' }} />
            )}
        </IconButton>
        <Link
          to={`/details/${weatherData.location.name}`}
          style={{
            textDecoration: 'none', // Eliminamos el subrayado
            display: 'inline-block', // Para que mantenga el estilo de botón
          }}
        >
          Ver más detalle
        </Link>
      </Box>
    </Box>
  );
};

export default MainWeatherCard;
