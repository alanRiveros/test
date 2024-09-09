import { createContext, useContext } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

const BreakpointContext = createContext();

export const BreakpointProvider = ({ children }) => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  // Definir el número de columnas basado en el tamaño de la pantalla
  const gridColumns = {
    xs: 12, // 1 columna en pantallas pequeñas
    md: 6, // 6 columnas en pantallas medianas
    lg: 3, // 3 columnas en pantallas grandes
    xl: 3, // 2 columnas en pantallas extra grandes
  };

  return (
    <BreakpointContext.Provider value={{ isSmallScreen, isMediumScreen, isLargeScreen, isExtraLargeScreen, gridColumns }}>
      {children}
    </BreakpointContext.Provider>
  );
};

export const useBreakpoint = () => useContext(BreakpointContext);
