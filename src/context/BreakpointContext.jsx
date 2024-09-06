import { createContext, useContext } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

const BreakpointContext = createContext();

export const BreakpointProvider = ({ children }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <BreakpointContext.Provider value={{ isSmallScreen, isMediumScreen }}>
      {children}
    </BreakpointContext.Provider>
  );
};

export const useBreakpoint = () => useContext(BreakpointContext);
