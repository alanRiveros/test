import React, {useEffect} from 'react';
import { Box, Typography } from '@mui/material';

// Función para obtener el nombre del día de la semana
const getDayName = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'long' }; // Nombre completo del día (lunes, martes, etc.)
  return new Intl.DateTimeFormat('es-ES', options).format(date);
};

// Función para verificar si la fecha es hoy
const isToday = (dateString, today) => {
  const date = new Date(dateString);
  return today.toDateString() === date.toDateString();
};

// Función para verificar si la fecha es mañana
const isTomorrow = (dateString, today) => {
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1); // Sumar un día para obtener mañana
  const date = new Date(dateString);
  return tomorrow.toDateString() === date.toDateString();
};

// Función para verificar si la fecha es ayer
const isYesterday = (dateString, today) => {
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1);
  const date = new Date(dateString);
  return yesterday.toDateString() === date.toDateString();
};

const WeatherDetails = ({ details, forecast, today }) => {
  // Filtrar el array para eliminar el día actual y ajustar los días
  const filteredForecast = forecast
    .filter((day) => !isToday(day.date, today)) // Excluir el día actual
    .map((day, index) => {
      // Si la fecha es "Mañana", mostrar "Mañana", si es "Ayer", mostrar "Ayer", si no, el nombre del día
      let dayLabel = getDayName(day.date, today);
      if (isTomorrow(day.date, today)) {
        dayLabel = 'Mañana';
      } else if (isYesterday(day.date, today)) {
        dayLabel = 'Ayer';
      }
      return { ...day, dayLabel }; // Agregar el label que se va a mostrar
    });

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
      
      {filteredForecast.map((day, index) => {
        return (
          <Typography key={index} variant="body2">
            {`${day.dayLabel}: ${day.maxtemp_c}°C - ${day.condition}`}
          </Typography>
        )
      })}
    </Box>
  );
};

export default WeatherDetails;
