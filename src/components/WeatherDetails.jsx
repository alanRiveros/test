import React, {useEffect} from 'react';
import { Box, Typography } from '@mui/material';

const WeatherDetails = ({ details, forecast }) => {
  console.log(details);
  console.log(forecast);
  
  return (
    <Box sx={{ padding: 2, backgroundColor: 'lightgray', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Detalles del Clima
      </Typography>
      <Typography variant="body1">Presión: {details.pressure_in} hPa</Typography>
      <Typography variant="body1">Índice UV: {details.uv}</Typography>
      <Typography variant="body1">Visibilidad: {details.vis_km} km</Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Pronóstico Extendido
      </Typography>
      
      {forecast.map((day, index) => {
        console.log('dentro del componenteeeeee', day)
        return (
          <Typography key={index} variant="body2">
            {day.date}: {day.maxtemp_c}°C - {day.condition}
          </Typography>
        )
      })}
    </Box>
  );
};

export default WeatherDetails;
