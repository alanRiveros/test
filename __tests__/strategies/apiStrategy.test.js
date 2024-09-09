// Test for apiStrategy 
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import apiStrategy from '../../src/strategies/apiStrategy';
import weatherAdapter from '../../src/adapters/weatherAdapter'; // Importamos el adaptador
import { weatherURL, rapidApiHost, rapidApiKey, days } from '../../globalconfig'; // Importar las variables correctamente

// Mock de axios y las variables de entorno
const mock = new MockAdapter(axios);

jest.mock('../../src/adapters/weatherAdapter', () => jest.fn());

describe('apiStrategy', () => {
  const city = 'London';
  const mockResponse = {
    location: { name: 'London' },
    current: { temp_c: 15, wind_kph: 10 },
    forecast: { forecastday: [{ day: { maxtemp_c: 20 } }] },
  };

  beforeEach(() => {
    process.env = {
      VITE_WEATHER_API_URL: weatherURL,
      VITE_RAPIDAPI_HOST: rapidApiHost,
      VITE_RAPIDAPI_KEY: rapidApiKey,
      VITE_DAYS: days,
    };
  });

  afterEach(() => {
    mock.reset(); // Resetea el mock de axios después de cada test
  });

  test('should fetch weather data and call weatherAdapter with correct data', async () => {
    // Configurar el mock de axios para la URL
    mock.onGet(process.env.VITE_WEATHER_API_URL, { params: { q: city, days: 5 } }).reply(200, mockResponse);

    // Ejecutar la estrategia
    const result = await apiStrategy(city);

    // Verificar que weatherAdapter fue llamado con los datos correctos
    expect(weatherAdapter).toHaveBeenCalledWith(mockResponse);

    // Verificar que el resultado es el adaptado por weatherAdapter
    expect(result).toEqual(weatherAdapter.mock.results[0].value);
  });

  test('should throw an error if the API call fails', async () => {
    // Configurar el mock de axios para simular un error
    mock.onGet(process.env.VITE_WEATHER_API_URL, { params: { q: city, days: 5 } }).reply(500);

    // Esperar que apiStrategy arroje un error
    await expect(apiStrategy(city)).rejects.toThrow('Error al obtener los datos del clima desde la API');
  });
});
