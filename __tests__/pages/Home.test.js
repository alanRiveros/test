import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../../src/pages/Home';
import { BreakpointProvider } from '../../src/context/BreakpointContext';
import { SearchProvider } from '../../src/context/SearchContext';
import { ApiProvider } from '../../src/providers/ApiProviders';
import '@testing-library/jest-dom/extend-expect';

// Mock del conector para las llamadas API
const mockConnector = jest.fn(() => Promise.resolve({
  location: { name: 'Ciudad Test' },
  current: {
    wind_kph: 10,
    pressure_mb: 1010,
    uv: 5,
  },
  forecast: [
    { daily_chance_of_rain: 60, daily_will_it_rain: true },
  ]
}));

describe('Home Component', () => {
  test('renders search input and components', async () => {
    render(
      <SearchProvider>
        <ApiProvider connectorType='json'>
          <BreakpointProvider>
            <Home />
          </BreakpointProvider>
        </ApiProvider>
      </SearchProvider>
    );

    // Verificar que el buscador se renderiza correctamente
    expect(screen.getByPlaceholderText('Buscar ciudad')).toBeInTheDocument();

    // Simular búsqueda de una ciudad
    fireEvent.change(screen.getByPlaceholderText('Buscar ciudad'), { target: { value: 'Ciudad Test' } });

    // Esperar a que se muestren los datos del clima
    await waitFor(() => expect(screen.getByText('Ciudad Test')).toBeInTheDocument());

    // Verificar que los componentes de clima se renderizan
    expect(screen.getByText('Viento')).toBeInTheDocument();
    expect(screen.getByText('Presión')).toBeInTheDocument();
    expect(screen.getByText('Índice UV')).toBeInTheDocument();
  });

  test('shows loading state before data is fetched', () => {
    render(
      <SearchProvider>
        <ApiProvider connector={() => mockConnector}>
          <BreakpointProvider>
            <Home />
          </BreakpointProvider>
        </ApiProvider>
      </SearchProvider>
    );

    // Verificar que el mensaje de carga se muestra al principio
    expect(screen.getByText('Cargando datos del clima...')).toBeInTheDocument();
  });

  test('handles empty or short search queries correctly', () => {
    render(
      <SearchProvider>
        <ApiProvider connector={() => mockConnector}>
          <BreakpointProvider>
            <Home />
          </BreakpointProvider>
        </ApiProvider>
      </SearchProvider>
    );

    // Simular búsqueda vacía o corta
    fireEvent.change(screen.getByPlaceholderText('Buscar ciudad'), { target: { value: 'abc' } });

    // Verificar que no se muestra la tarjeta de clima (condición de menos de 4 caracteres)
    expect(screen.queryByText('Ciudad Test')).not.toBeInTheDocument();
  });

  test('renders WeatherDetails when details button is clicked', async () => {
    render(
      <SearchProvider>
        <ApiProvider connector={() => mockConnector}>
          <BreakpointProvider>
            <Home />
          </BreakpointProvider>
        </ApiProvider>
      </SearchProvider>
    );

    // Simular búsqueda de una ciudad
    fireEvent.change(screen.getByPlaceholderText('Buscar ciudad'), { target: { value: 'Ciudad Test' } });

    // Esperar a que se muestren los datos del clima
    await waitFor(() => expect(screen.getByText('Ciudad Test')).toBeInTheDocument());

    // Simular clic en el botón "Ver más detalles"
    fireEvent.click(screen.getByText('Ver más detalle'));

    // Verificar que se muestra el componente WeatherDetails
    await waitFor(() => expect(screen.getByText('Detalles del Clima')).toBeInTheDocument());
  });
});
