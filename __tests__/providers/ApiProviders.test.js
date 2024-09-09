// Test for ApiProviders 
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ApiProvider, useApi } from '../../src/providers/ApiProviders';
import { connectors } from '../../src/providers/apiConnectors';
import '@testing-library/jest-dom/extend-expect';

// Componente de prueba para usar el hook useApi
const TestComponent = () => {
  const apiConnector = useApi();
  return <div data-testid="api-connector">{apiConnector.name}</div>;
};

describe('ApiProvider', () => {
  test('should provide json connector by default', () => {
    render(
      <ApiProvider connectorType="json">
        <TestComponent />
      </ApiProvider>
    );

    // Verificar que el conector devuelto es el jsonStrategy
    expect(screen.getByTestId('api-connector')).toHaveTextContent(connectors.json.name);
  });

  test('should provide api connector when api is selected', () => {
    render(
      <ApiProvider connectorType="api">
        <TestComponent />
      </ApiProvider>
    );

    // Verificar que el conector devuelto es el apiStrategy
    expect(screen.getByTestId('api-connector')).toHaveTextContent(connectors.api.name);
  });

  test('should fallback to json connector when invalid connector type is provided', () => {
    render(
      <ApiProvider connectorType="invalid">
        <TestComponent />
      </ApiProvider>
    );

    // Verificar que el conector por defecto es jsonStrategy si se proporciona un conector inválido
    expect(screen.getByTestId('api-connector')).toHaveTextContent(connectors.json.name);
  });
});
