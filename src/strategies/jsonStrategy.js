import weatherAdapter from '../adapters/weatherAdapter';

const jsonStrategy = async (city) => {
  const response = await fetch(`/weatherData-${city}.json`);
  if (!response.ok) {
    throw new Error('Error al obtener los datos del clima desde el archivo JSON');
  }
  const data = await response.json();
  return weatherAdapter(data); // Adaptamos los datos antes de devolverlos
};

export default jsonStrategy;
