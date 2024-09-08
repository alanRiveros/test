import React from 'react';
import { Box, Typography, Button, Icon } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Ejemplo de icono de clima

const WeatherCard = ({ weatherData, onMoreDetailsClick }) => {
  const { temperature, description, humidity, windSpeed } = weatherData;

  return (
    <Box sx={{ padding: 2, backgroundColor: 'lightblue', borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        {temperature}°C
      </Typography>
      <Icon sx={{ fontSize: 60 }}>
        <WbSunnyIcon />
      </Icon>
      <Typography variant="subtitle1">{description}</Typography>
      <Typography variant="body1">Humedad: {humidity}%</Typography>
      <Typography variant="body1">Velocidad del Viento: {windSpeed} km/h</Typography>
      <Button variant="contained" color="primary" onClick={onMoreDetailsClick}>
        Ver más detalles
      </Button>
    </Box>
  );
};

export default WeatherCard;
