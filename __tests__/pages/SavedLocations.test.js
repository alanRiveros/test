// Test for SavedLocations 
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SavedLocations from '../../src/pages/SavedLocations';
import { BreakpointProvider } from '../../src/context/BreakpointContext';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

// Mock localStorage
const mockFavorites = [
  { id: 1, name: 'Nueva York', temp: 22, humidity: 60, windSpeed: 10 },
  { id: 2, name: 'Londres', temp: 18, humidity: 70, windSpeed: 15 },
  { id: 3, name: 'Tokio', temp: 28, humidity: 65, windSpeed: 8 }
];

beforeEach(() => {
  // Simular localStorage
  Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockFavorites));
  Storage.prototype.setItem = jest.fn();
});

describe('SavedLocations Component', () => {
  test('renders saved locations from localStorage', () => {
    render(
      <BreakpointProvider>
        <MemoryRouter>
          <SavedLocations />
        </MemoryRouter>
      </BreakpointProvider>
    );

    // Verificar que las ciudades favoritas se renderizan
    expect(screen.getByText('Nueva York')).toBeInTheDocument();
    expect(screen.getByText('Londres')).toBeInTheDocument();
    expect(screen.getByText('Tokio')).toBeInTheDocument();
  });

  test('removes a location from favorites when delete button is clicked', () => {
    render(
      <BreakpointProvider>
        <MemoryRouter>
          <SavedLocations />
        </MemoryRouter>
      </BreakpointProvider>
    );

    // Verificar que la ciudad 'Londres' existe antes de eliminarla
    expect(screen.getByText('Londres')).toBeInTheDocument();

    // Simular clic en el botón de eliminar para 'Londres'
    fireEvent.click(screen.getAllByLabelText('delete')[1]);

    // Verificar que 'Londres' ha sido eliminada
    expect(screen.queryByText('Londres')).not.toBeInTheDocument();
  });

  test('renders different layout based on breakpoints', () => {
    render(
      <BreakpointProvider>
        <MemoryRouter>
          <SavedLocations />
        </MemoryRouter>
      </BreakpointProvider>
    );

    // Verificar que la lista se renderiza correctamente
    const cities = screen.getAllByRole('listitem');
    expect(cities.length).toBe(mockFavorites.length); // Debe haber 3 ciudades

    // Simular diferentes breakpoints (esto es más complejo de verificar directamente)
    // Aquí puedes verificar que los elementos responden a `isSmallScreen`, `isMediumScreen`, etc.
  });

  test('links to the correct city details page', () => {
    render(
      <BreakpointProvider>
        <MemoryRouter>
          <SavedLocations />
        </MemoryRouter>
      </BreakpointProvider>
    );

    // Verificar que el enlace a 'Nueva York' es correcto
    const link = screen.getByText('Nueva York').closest('a');
    expect(link).toHaveAttribute('href', '/details/Nueva%20York');
  });
});
