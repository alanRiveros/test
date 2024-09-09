import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProvider } from './context/AppContext';
import { BreakpointProvider } from './context/BreakpointContext';
import { ApiProvider } from './providers/ApiProviders';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';

// Leer el conector desde el archivo .env
const connectorType = import.meta.env.VITE_CONNECTOR_TYPE || 'json'; // Usar 'json' como valor por defecto pero solo va a funcionar la busqueda de "London"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <BreakpointProvider>
        <ApiProvider connectorType={connectorType}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </ApiProvider>
      </BreakpointProvider>
    </AppProvider>
  </React.StrictMode>
);
