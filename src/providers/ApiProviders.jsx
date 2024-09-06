import { createContext, useContext } from 'react';
import { connectors } from './apiConnectors';

const ApiContext = createContext();

export const ApiProvider = ({ children, connectorType }) => {
  const connector = connectors[connectorType] || connectors['axios'];

  return (
    <ApiContext.Provider value={connector}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
