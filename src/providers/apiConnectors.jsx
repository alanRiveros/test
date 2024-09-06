const axiosConnector = {
    fetch: async (url) => {
      const response = await fetch(url);
      return response.json();
    },
  };
  
  const mockConnector = {
    fetch: async (url) => {
      return { message: `Mock data from ${url}` };
    },
  };
  
  export const connectors = {
    axios: axiosConnector,
    mock: mockConnector,
  };