import axios from 'axios';
import jsonStrategy from '../strategies/jsonStrategy';
import apiStrategy from '../strategies/apiStrategy';

export const connectors = {
  json: jsonStrategy,
  axios: async () => {
    const response = await axios.get('/weatherData.json'); // Ejemplo de conector con Axios
    return response.data;
  },
  api: apiStrategy,
};