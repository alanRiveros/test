import { createTheme } from '@mui/material/styles';
import theme from '../../src/theme/theme';

describe('Theme', () => {
  test('should have the correct primary and secondary colors', () => {
    // Verificar que los colores primarios y secundarios son los correctos
    expect(theme.palette.primary.main).toBe('#1976d2'); // Azul
    expect(theme.palette.secondary.main).toBe('#dc004e'); // Rosa
  });

  test('should use Roboto as the default font family', () => {
    // Verificar que la tipografía por defecto es Roboto
    expect(theme.typography.fontFamily).toBe('Roboto, sans-serif');
  });

  test('should have correct breakpoint values', () => {
    // Verificar que los breakpoints están configurados correctamente
    expect(theme.breakpoints.values.xs).toBe(0);
    expect(theme.breakpoints.values.sm).toBe(600);
    expect(theme.breakpoints.values.md).toBe(960);
    expect(theme.breakpoints.values.lg).toBe(1280);
    expect(theme.breakpoints.values.xl).toBe(1920);
  });
});
