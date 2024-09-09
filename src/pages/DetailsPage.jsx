import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import WeatherInfoCard from '../components/WeatherInfoCard';
import WeatherDetails from '../components/WeatherDetails';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { useApi } from '../providers/ApiProviders';

const DetailsPage = () => {
  const { state } = useLocation(); // Datos pasados desde otra página
  const { city } = useParams(); // Capturamos la ciudad desde la URL
  const [weatherData, setWeatherData] = useState(); // Estado para almacenar los datos del clima
  const { searchTerm } = useSearch(); // Si necesitas el término de búsqueda
  const connector = useApi(); // Usar el conector para las búsquedas API
  const [loading, setLoading] = useState(false); // Manejar el estado de carga
  const [error, setError] = useState(null); // Manejar errores

  // Si hay una ciudad en los parámetros, hacemos la búsqueda
  useEffect(() => {
    if (!weatherData && city) {
      const fetchWeatherData = async () => {
        try {
          setLoading(true);
          const data = await connector(city); // Llamar al conector con el nombre de la ciudad
          setWeatherData(data);
          setLoading(false);
        } catch (error) {
          setError('No se pudo obtener el clima de la ciudad.');
          setLoading(false);
        }
      };

      fetchWeatherData();
    }
  }, [city, connector, weatherData]);

  if (loading) {
    return <Typography variant="h6">Cargando datos del clima...</Typography>;
  }

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  if (!weatherData) {
    return <Typography variant="h6">Error: No hay datos disponibles para esta ciudad.</Typography>;
  }

  const today = new Date();
  return (
    <Box sx={{ padding: 3 }}>
      <IconButton
        component={Link}
        to="/"
        sx={{ position: 'absolute', top: 20, left: 250 }} 
      >
        <ArrowBackIcon sx={{ fontSize: 30 }} />
      </IconButton>

      {/* Tarjetas Secundarias */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6} lg={3}>
          <WeatherInfoCard
            title="Viento"
            description="Velocidad del viento"
            value={`${weatherData.current.wind_kph} km/h`}
            icon={<WbSunnyIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <WeatherInfoCard
            title="Probabilidad de Lluvia"
            description="Hoy"
            value={`${weatherData.forecast[0].daily_chance_of_rain}%`}
            indicator={weatherData.forecast[0].daily_will_it_rain ? 'Lluvia esperada' : 'Sin lluvia'}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <WeatherInfoCard
            title="Presión"
            description="Presión actual"
            value={`${weatherData.current.pressure_mb} hPa`}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <WeatherInfoCard
            title="Índice UV"
            description="Hoy"
            value={weatherData.current.uv}
            indicator="Bajo"
          />
        </Grid>
      </Grid>

      {/* Detalles adicionales */}
      <Box sx={{ mt: 5 }}>
        <WeatherDetails details={weatherData.current} forecast={weatherData.forecast} today={today}/>
      </Box>
    </Box>
  );
};

export default DetailsPage;
