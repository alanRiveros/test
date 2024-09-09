import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Drawer, 
  TextField, 
  Grid, 
  AppBar, 
  Toolbar, 
  Container
} from '@mui/material';
import MainWeatherCard from '../components/MainWeatherCard';
import WeatherInfoCard from '../components/WeatherInfoCard';
import WeatherDetails from '../components/WeatherDetails';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useApi } from '../providers/ApiProviders';
import { useBreakpoint } from '../context/BreakpointContext';
import { Search as SearchIcon } from '@mui/icons-material';
import { useSearch } from '../context/SearchContext';

const Home = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isSmallScreen, isMediumScreen, isLargeScreen, isExtraLargeScreen, gridColumns } = useBreakpoint(); // Usar los gridColumns del contexto
  const { searchTerm, setSearchTerm } = useSearch();
  const connector = useApi();

  // Hook useEffect para cargar los datos de la API o archivo JSON
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setWeatherData(null);
        const data = await connector(searchTerm);
        console.log(data);
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los datos del clima:', error);
        setLoading(false);
      }
    };
    
    if (searchTerm.length > 4) {
      fetchWeatherData();
    } else {
      setLoading(false);
    }
  }, [searchTerm]);

  const handleMoreDetailsClick = () => {
    setShowDetails(!showDetails);
  };

  // Función para manejar el cambio en el input de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <div>Cargando datos del clima...</div>;
  }

  return (
    <Box sx={{ display: 'flex', height: '100%'}}>
      {/* Columna del Medio (Principal) */}
      <Box sx={{ 
        flexGrow: 1, 
        maxWidth: isSmallScreen ? '100%' : '1200px', 
        mt: 0
      }}>
        {/* Buscador */}
        <AppBar 
          position="fixed" 
          sx={{ 
            width: isSmallScreen ? '70%' : `calc(100% - 240px)`, 
            ml: isSmallScreen ? 0 : `240px`,
            backgroundColor: 'white'
          }}>
          <Toolbar>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Buscar ciudad"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
              sx={{ 
                flexGrow: 1, 
                mr: 2,
                backgroundColor: 'white',
                borderRadius: '4px',
              }}
            />
          </Toolbar>
        </AppBar>

        {weatherData &&
        <Container sx={{
          mt: isSmallScreen ? 1 : 10
        }}>
        {/* Tarjeta Principal del Clima */}
        <MainWeatherCard weatherData={weatherData} onMoreDetailsClick={handleMoreDetailsClick} />

        {/* Tarjetas Secundarias */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={gridColumns.xs} md={gridColumns.md} lg={gridColumns.lg}>
            <WeatherInfoCard
              title="Viento"
              description="Velocidad del viento"
              value={`${weatherData.current.wind_kph} km/h`}
              icon={<WbSunnyIcon />}
            />
          </Grid>
          <Grid item xs={gridColumns.xs} md={gridColumns.md} lg={gridColumns.lg}>
            <WeatherInfoCard
              title="Probabilidad de Lluvia"
              description="Hoy"
              value={`${weatherData.forecast[0].daily_chance_of_rain}%`}
              indicator={weatherData.forecast[0].daily_will_it_rain ? 'Lluvia esperada' : 'Sin lluvia'}
            />
          </Grid>
          <Grid item xs={gridColumns.xs} md={gridColumns.md} lg={gridColumns.lg}>
            <WeatherInfoCard
              title="Presión"
              description="Presión actual"
              value={`${weatherData.current.pressure_mb} hPa`}
            />
          </Grid>
          <Grid item xs={gridColumns.xs} md={gridColumns.md} lg={gridColumns.lg}>
            <WeatherInfoCard
              title="Índice UV"
              description="Hoy"
              value={weatherData.current.uv}
              indicator="Bajo"
            />
          </Grid>
        </Grid>
        </Container>
        }
      </Box>

      {/* Columna Derecha (Detalles Clima) */}
      {weatherData && !isSmallScreen &&
      <Drawer
        anchor="right"
        open={showDetails}
        onClose={() => setShowDetails(false)}
        sx={{ width: 300 }}
      >
        <Box sx={{ width: 300, padding: 2 }}>
          <WeatherDetails
            details={weatherData.current}
            forecast={weatherData.forecast}
          />
        </Box>
      </Drawer>
      }
    </Box>
  );
};

export default Home;
