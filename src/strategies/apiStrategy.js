import axios from 'axios';
import weatherAdapter from '../adapters/weatherAdapter';


const apiStrategy = async (city) => {
  try {
    // Obtenemos las claves y parámetros desde el archivo .env
    const weatherURL = import.meta.env.VITE_WEATHER_API_URL;
    const rapidApiHost = import.meta.env.VITE_WEATHER_API_HOST;
    const rapidApiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const days = import.meta.env.VITE_WEATHERAPI_DAYS || 5; // Si no hay días definidos en .env, por defecto serán 5

    // Hacemos la solicitud usando axios
    const response = await axios.get(weatherURL, {
      params: {
        q: city,
        days: days
      },
      headers: {
        'x-rapidapi-host': rapidApiHost,
        'x-rapidapi-key': rapidApiKey
      }
    });

    // Adaptamos los datos antes de devolverlos
    return weatherAdapter(response.data);
  } catch (error) {
    throw new Error('Error al obtener los datos del clima desde la API: ' + error.message);
  }
};

export default apiStrategy;
