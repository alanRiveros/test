import fetchMock from 'fetch-mock-jest';
import jsonStrategy from '../../src/strategies/jsonStrategy';
import weatherAdapter from '../../src/adapters/weatherAdapter';

jest.mock('../../src/adapters/weatherAdapter'); // Mock del adaptador

describe('jsonStrategy', () => {
  const city = 'london';
  const mockWeatherData = {
    location: { name: 'London', region: 'City of London', country: 'United Kingdom', localtime: '2024-09-08 14:30' },
    current: { temp_c: 18.5, condition: { text: 'Sunny', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png' } },
    forecast: { forecastday: [{ date: '2024-09-08', day: { maxtemp_c: 22.1, condition: { text: 'Partly cloudy', icon: '//cdn.weatherapi.com/weather/64x64/day/116.png' } } }] },
  };

  afterEach(() => {
    fetchMock.restore(); // Limpiar mocks después de cada test
  });

  test('should fetch weather data from JSON file and call weatherAdapter', async () => {
    // Simular una respuesta exitosa del archivo JSON
    fetchMock.get(`/weatherData-${city}.json`, {
      status: 200,
      body: mockWeatherData,
    });

    // Ejecutar jsonStrategy
    await jsonStrategy(city);

    // Verificar que weatherAdapter fue llamado con los datos correctos
    expect(weatherAdapter).toHaveBeenCalledWith(mockWeatherData);

    // Verificar que fetch fue llamado con la URL correcta
    expect(fetchMock).toHaveFetched(`/weatherData-${city}.json`);
  });

  test('should throw an error if the JSON file is not found', async () => {
    // Simular una respuesta de error 404
    fetchMock.get(`/weatherData-${city}.json`, 404);

    // Verificar que jsonStrategy arroje un error cuando el archivo no se encuentra
    await expect(jsonStrategy(city)).rejects.toThrow('Error al obtener los datos del clima desde el archivo JSON');
  });

  test('should throw an error if the fetch fails', async () => {
    // Simular una respuesta fallida de la red
    fetchMock.get(`/weatherData-${city}.json`, { throws: new Error('Network error') });

    // Verificar que jsonStrategy arroje un error en caso de fallo en la red
    await expect(jsonStrategy(city)).rejects.toThrow('Error al obtener los datos del clima desde el archivo JSON');
  });
});
