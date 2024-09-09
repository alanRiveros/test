import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import DetailsPage from '../../src/pages/DetailsPage';
import { useApi } from '../../src/providers/ApiProviders';
import { useSearch } from '../../src/context/SearchContext';
import '@testing-library/jest-dom/extend-expect';

// Mock para el conector API
jest.mock('../../src/providers/ApiProviders');
jest.mock('../../src/context/SearchContext');

// Mock para simular el API connector y el contexto de búsqueda
const mockWeatherData = {
  location: { name: 'London' },
  current: {
    wind_kph: 12,
    pressure_mb: 1013,
    uv: 4,
    humidity: 65,
  },
  forecast: [
    {
      daily_chance_of_rain: 30,
      daily_will_it_rain: 1,
    },
  ],
};

describe('DetailsPage Component', () => {
  beforeEach(() => {
    useApi.mockReturnValue(jest.fn(() => Promise.resolve(mockWeatherData)));
    useSearch.mockReturnValue({ searchTerm: 'London' });
  });

  test('renders loading state when fetching data', async () => {
    // Simular el comportamiento de un API con retardo para mostrar el loading state
    useApi.mockReturnValue(jest.fn(() => new Promise(() => {}))); // No resolvemos la promesa para que se quede cargando

    render(
      <MemoryRouter initialEntries={['/details/London']}>
        <Route path="/details/:city">
          <DetailsPage />
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByText('Cargando datos del clima...')).toBeInTheDocument();
  });

  test('renders weather data correctly', async () => {
    // Simular la carga exitosa de datos del clima
    useApi.mockReturnValue(jest.fn(() => Promise.resolve(mockWeatherData)));

    render(
      <MemoryRouter initialEntries={['/details/London']}>
        <Route path="/details/:city">
          <DetailsPage />
        </Route>
      </MemoryRouter>
    );

    // Esperar que los datos del clima se rendericen correctamente
    expect(await screen.findByText('Velocidad del viento')).toBeInTheDocument();
    expect(screen.getByText('Probabilidad de Lluvia')).toBeInTheDocument();
    expect(screen.getByText('Presión actual')).toBeInTheDocument();
    expect(screen.getByText('Índice UV')).toBeInTheDocument();
  });

  test('renders error message if data fetching fails', async () => {
    // Simular el fallo en la obtención de datos del clima
    useApi.mockReturnValue(jest.fn(() => Promise.reject('Error al obtener los datos')));

    render(
      <MemoryRouter initialEntries={['/details/London']}>
        <Route path="/details/:city">
          <DetailsPage />
        </Route>
      </MemoryRouter>
    );

    expect(await screen.findByText('No se pudo obtener el clima de la ciudad.')).toBeInTheDocument();
  });

  test('back button redirects to the homepage', async () => {
    render(
      <MemoryRouter initialEntries={['/details/London']}>
        <Route path="/details/:city">
          <DetailsPage />
        </Route>
      </MemoryRouter>
    );

    const backButton = screen.getByRole('button', { name: /arrowback/i });

    fireEvent.click(backButton);

    // Verificar que el enlace redirige a la página principal
    expect(backButton.closest('a')).toHaveAttribute('href', '/');
  });
});
