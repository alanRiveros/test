import axios from 'axios';
import weatherAdapter from '../adapters/weatherAdapter';
import { weatherURL, rapidApiHost, rapidApiKey, days } from '../../globalconfig'; // Importar las variables correctamente

const apiStrategy = async (city) => {
  try {
    // No es necesario redeclarar las variables de configuración, ya las importamos arriba
    const response = await axios.get(weatherURL, {
      params: {
        q: city,
        days: days || 5  // Si `days` no está definido, usa 5 por defecto
      },
      headers: {
        'x-rapidapi-host': rapidApiHost,
        'x-rapidapi-key': rapidApiKey
      }
    });

    // Adaptar los datos antes de devolverlos
    return weatherAdapter(response.data);
  } catch (error) {
    throw new Error('Error al obtener los datos del clima desde la API: ' + error.message);
  }
};

export default apiStrategy;
