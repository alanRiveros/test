import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const SearchContext = createContext();

// Proveedor del contexto
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

// Hook para usar el contexto
export const useSearch = () => {
  return useContext(SearchContext);
};
