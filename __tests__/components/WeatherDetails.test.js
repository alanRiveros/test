import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherDetails from '../../src/components/WeatherDetails';
import '@testing-library/jest-dom/extend-expect';

// Mock de los datos del clima y el pronóstico
const mockDetails = {
  pressure_in: 29.92,
  uv: 5,
  vis_km: 10,
};

// Asegúrate de que el formato del mockForecast sea correcto
const mockForecast = [
  { date: '2024-09-07', maxtemp_c: 24, condition: 'Soleado' },
  { date: '2024-09-08', maxtemp_c: 23, condition: 'Parcialmente nublado' },
  { date: '2024-09-09', maxtemp_c: 21, condition: 'Lluvia ligera' },
  { date: '2024-09-10', maxtemp_c: 21, condition: 'Lluvia fuerte' },
  { date: '2024-09-11', maxtemp_c: 21, condition: 'Lluvia ligera' },
  { date: '2024-09-12', maxtemp_c: 21, condition: 'Lluvia ligera' },
];

describe('WeatherDetails Component', () => {
  test('renders weather details correctly', () => {
    const today = new Date('2024-09-08');
    render(<WeatherDetails details={mockDetails} forecast={mockForecast} today={today} />);

    // Verificar que los detalles del clima se muestran correctamente
    expect(screen.getByText('Detalles del Clima')).toBeInTheDocument();
    expect(screen.getByText('Presión: 29.92 hPa')).toBeInTheDocument();
    expect(screen.getByText('Índice UV: 5')).toBeInTheDocument();
    expect(screen.getByText('Visibilidad: 10 km')).toBeInTheDocument();
  });

  test('renders forecast for upcoming days correctly', () => {
    const today = new Date('2024-09-08');
    render(<WeatherDetails details={mockDetails} forecast={mockForecast} today={today} />);

    // Verificar que el pronóstico extendido se muestra correctamente
    expect(screen.getByText('Pronóstico Extendido')).toBeInTheDocument();

    // Verificar que los días están formateados correctamente
    expect(screen.getByText('martes: 21°C - Lluvia ligera')).toBeInTheDocument();
    expect(screen.getByText('miércoles: 21°C - Lluvia ligera')).toBeInTheDocument();
  });
});
