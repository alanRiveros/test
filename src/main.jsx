import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProvider } from './context/AppContext';
import { BreakpointProvider } from './context/BreakpointContext';
import { ApiProvider } from './providers/ApiProviders';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <BreakpointProvider>
        <ApiProvider connectorType="axios">
          <App />
        </ApiProvider>
      </BreakpointProvider>
    </AppProvider>
  </React.StrictMode>
);
