import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainWeatherCard from '../../src/components/MainWeatherCard';
import { MemoryRouter } from 'react-router-dom';

// Mock de los datos de clima para las pruebas
const mockWeatherData = {
  location: {
    name: 'London',
    localtime: '2024-09-07 20:37',
  },
  current: {
    temp_c: 18.4,
    condition: {
      text: 'Moderate rain',
    },
    humidity: 83,
    wind_kph: 15,
    pressure_mb: 1013,
  },
};

// Limpiar el localStorage antes de cada test
beforeEach(() => {
  localStorage.clear();
});

describe('MainWeatherCard Component', () => {
  test('renders correctly with weather data', () => {
    render(<MainWeatherCard weatherData={mockWeatherData} />, { wrapper: MemoryRouter });

    // Verificar que el nombre de la ciudad y otros datos de clima se muestran
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('18.4°C')).toBeInTheDocument();
    expect(screen.getByText('Moderate rain')).toBeInTheDocument();
    expect(screen.getByText('Presión: 1013 hPa')).toBeInTheDocument();
    expect(screen.getByText('Humedad: 83%')).toBeInTheDocument();
    expect(screen.getByText('Viento: 15 km/h')).toBeInTheDocument();
  });

  test('adds the city to favorites when heart icon is clicked', () => {
    render(<MainWeatherCard weatherData={mockWeatherData} />, { wrapper: MemoryRouter });

    const favoriteIcon = screen.getByRole('button');
    
    // Verificar que el ícono de no favorito (corazón vacío) está presente
    expect(screen.getByTestId('FavoriteBorderIcon')).toBeInTheDocument();

    // Simular clic en el ícono de favorito
    fireEvent.click(favoriteIcon);

    // Verificar que el ícono de favorito (corazón lleno) aparece después del clic
    expect(screen.getByTestId('FavoriteIcon')).toBeInTheDocument();

    // Verificar que la ciudad fue guardada en localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    expect(favorites).toEqual([{ name: 'London', temp: 18.4, humidity: 83, windSpeed: 15 }]);
  });

  test('removes the city from favorites when heart icon is clicked again', () => {
    // Primero, agregar la ciudad a favoritos para simular el estado inicial
    localStorage.setItem(
      'favorites',
      JSON.stringify([{ name: 'London', temp: 18.4, humidity: 83, windSpeed: 15 }])
    );

    render(<MainWeatherCard weatherData={mockWeatherData} />, { wrapper: MemoryRouter });

    // Verificar que el ícono de favorito (corazón lleno) está presente
    expect(screen.getByTestId('FavoriteIcon')).toBeInTheDocument();

    const favoriteIcon = screen.getByRole('button');

    // Simular clic en el ícono de favorito para remover la ciudad
    fireEvent.click(favoriteIcon);

    // Verificar que el ícono de no favorito (corazón vacío) aparece después del clic
    expect(screen.getByTestId('FavoriteBorderIcon')).toBeInTheDocument();

    // Verificar que la ciudad fue removida de localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    expect(favorites).toEqual([]);
  });

  test('displays correct link to city details', () => {
    render(<MainWeatherCard weatherData={mockWeatherData} />, { wrapper: MemoryRouter });

    const moreDetailsLink = screen.getByText('Ver más detalle');

    // Verificar que el enlace tiene la URL correcta
    expect(moreDetailsLink.closest('a')).toHaveAttribute('href', '/details/London');
  });
});
