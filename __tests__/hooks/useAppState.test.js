// Test for useAppState 
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { AppProvider } from '../../src/context/AppContext';
import { useAppState } from '../../src/hooks/useAppState';

// Mock inicial del estado
const initialState = {
  user: null,
  theme: 'light',
};

describe('useAppState', () => {
  test('should return initial state from AppContext', () => {
    const { result } = renderHook(() => useAppState(), {
      wrapper: ({ children }) => <AppProvider>{children}</AppProvider>,
    });

    // Verificar que el estado inicial coincide con el contexto
    expect(result.current.state).toEqual(initialState);
  });

  test('should update state when updateState is called', () => {
    const { result } = renderHook(() => useAppState(), {
      wrapper: ({ children }) => <AppProvider>{children}</AppProvider>,
    });

    // Actualizar el estado usando updateState
    act(() => {
      result.current.updateState('theme', 'dark');
    });

    // Verificar que el estado fue actualizado correctamente
    expect(result.current.state.theme).toBe('dark');
  });

  test('should update user state when updateState is called', () => {
    const { result } = renderHook(() => useAppState(), {
      wrapper: ({ children }) => <AppProvider>{children}</AppProvider>,
    });

    // Actualizar el estado del usuario usando updateState
    act(() => {
      result.current.updateState('user', { name: 'John Doe', age: 30 });
    });

    // Verificar que el estado del usuario fue actualizado correctamente
    expect(result.current.state.user).toEqual({ name: 'John Doe', age: 30 });
  });
});
