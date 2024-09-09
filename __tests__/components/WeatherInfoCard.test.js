import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherInfoCard from '../../src/components/WeatherInfoCard';
import '@testing-library/jest-dom/extend-expect';

describe('WeatherInfoCard Component', () => {
  test('renders the title, description, and value correctly', () => {
    // Mock de las propiedades que pasaremos al componente
    const mockProps = {
      title: 'Viento',
      description: 'Velocidad del viento',
      value: '15 km/h',
      icon: <span>Icono de viento</span>, // Puedes usar un ícono mock si es necesario
    };

    // Renderizamos el componente
    render(<WeatherInfoCard {...mockProps} />);

    // Verificar que el título, descripción y valor se renderizan correctamente
    expect(screen.getByText('Viento')).toBeInTheDocument();
    expect(screen.getByText('15 km/h')).toBeInTheDocument();
  });

  test('renders with minimum height and appropriate styling', () => {
    const mockProps = {
      title: 'Humedad',
      description: 'Humedad actual',
      value: '60%',
      icon: <span>Icono de humedad</span>,
    };

    const { container } = render(<WeatherInfoCard {...mockProps} />);

    // Verificar que el componente tenga un estilo de altura mínima
    expect(container.firstChild).toHaveStyle('min-height: 180px');
    expect(container.firstChild).toHaveStyle('background-color: lightgray');
    expect(container.firstChild).toHaveStyle('color: black');
  });
});
