// Test for weatherAdapter 
import weatherAdapter from '../../src/adapters/weatherAdapter';

describe('weatherAdapter', () => {
  const mockWeatherData = {
    location: {
      name: 'London',
      region: 'City of London, Greater London',
      country: 'United Kingdom',
      localtime: '2024-09-08 14:30',
    },
    current: {
      temp_c: 18.5,
      condition: {
        text: 'Sunny',
        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
      },
      wind_kph: 12.3,
      humidity: 65,
      pressure_mb: 1012,
      uv: 5,
      vis_km: 10,
    },
    forecast: {
      forecastday: [
        {
          date: '2024-09-08',
          day: {
            maxtemp_c: 22.1,
            mintemp_c: 15.2,
            daily_chance_of_rain: 40,
            condition: {
              text: 'Partly cloudy',
              icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
            },
          },
        },
        {
          date: '2024-09-09',
          day: {
            maxtemp_c: 20.5,
            mintemp_c: 14.0,
            daily_chance_of_rain: 20,
            condition: {
              text: 'Sunny',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
            },
          },
        },
      ],
    },
  };

  test('should adapt weather data to expected format', () => {
    const adaptedData = weatherAdapter(mockWeatherData);

    // Verificar que los datos de la ubicación se adapten correctamente
    expect(adaptedData.location).toEqual({
      name: 'London',
      region: 'City of London, Greater London',
      country: 'United Kingdom',
      localtime: '2024-09-08 14:30',
    });

    // Verificar que los datos actuales se adapten correctamente
    expect(adaptedData.current).toEqual({
      temp_c: 18.5,
      condition: 'Sunny',
      icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
      wind_kph: 12.3,
      humidity: 65,
      pressure_mb: 1012,
      uv: 5,
      vis_km: 10,
    });

    // Verificar que los datos del pronóstico se adapten correctamente
    expect(adaptedData.forecast).toEqual([
      {
        date: '2024-09-08',
        maxtemp_c: 22.1,
        mintemp_c: 15.2,
        daily_chance_of_rain: 40,
        condition: 'Partly cloudy',
        conditionIcon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
      },
      {
        date: '2024-09-09',
        maxtemp_c: 20.5,
        mintemp_c: 14.0,
        daily_chance_of_rain: 20,
        condition: 'Sunny',
        conditionIcon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
      },
    ]);
  });
});
