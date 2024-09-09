// Test for apiConnectors 
import { connectors } from '../../src/providers/apiConnectors';
import jsonStrategy from '../../src/strategies/jsonStrategy';
import apiStrategy from '../../src/strategies/apiStrategy';

describe('apiConnectors', () => {
  test('should provide the jsonStrategy when "json" is selected', () => {
    // Verificar que el conector 'json' retorna la estrategia jsonStrategy
    expect(connectors.json).toBe(jsonStrategy);
  });

  test('should provide the apiStrategy when "api" is selected', () => {
    // Verificar que el conector 'api' retorna la estrategia apiStrategy
    expect(connectors.api).toBe(apiStrategy);
  });

  test('should return undefined if connector type is invalid', () => {
    // Probar un conector no definido
    expect(connectors.invalid).toBeUndefined();
  });
});
