
# Is Cloudy - Weather App

**Is Cloudy** es una aplicación de clima creada con **React** y **Material-UI** que utiliza **RapidAPI** para obtener datos meteorológicos. La aplicación permite a los usuarios buscar información climática sobre diferentes ciudades y guardar sus ubicaciones favoritas.

## Características

- **Búsqueda de clima por ciudad**: Puedes buscar información del clima de cualquier ciudad en el mundo.
- **Guardado de ubicaciones favoritas**: Los usuarios pueden guardar las ciudades como favoritas para acceder rápidamente a su clima.
- **Pronóstico extendido**: Ver detalles del pronóstico del clima y un pronóstico de varios días para la ciudad seleccionada.
- **Responsive**: Funciona en dispositivos de distintos tamaños de pantalla, incluyendo móviles, tablets y escritorios.

## Requisitos previos

Antes de instalar y ejecutar esta aplicación, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/en/download/) (v14 o superior)
- [npm](https://www.npmjs.com/get-npm) (versión 6 o superior)

## Instalación

Sigue los pasos a continuación para instalar la aplicación:

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/alanRiveros/is-cloudy.git
   cd is-cloudy
   ```

2. **Instalar dependencias**

   Asegúrate de estar en la carpeta raíz del proyecto y luego ejecuta el siguiente comando para instalar todas las dependencias necesarias:

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   La aplicación utiliza la API de **RapidAPI** para obtener datos climáticos. Necesitarás configurar tu propia clave API para que funcione correctamente. Sigue los siguientes pasos:

   - Crea una cuenta en [RapidAPI](https://rapidapi.com/).
   - Suscríbete a la API **WeatherAPI** en RapidAPI.
   - Copia tu clave de API de **WeatherAPI**.
   
   Después, crea un archivo `.env` en la raíz de tu proyecto con las siguientes variables de entorno:

   ```bash
   VITE_WEATHER_API_URL=https://weatherapi-com.p.rapidapi.com/forecast.json
   VITE_RAPIDAPI_KEY=TU_CLAVE_API_RAPIDAPI
   VITE_RAPIDAPI_HOST=weatherapi-com.p.rapidapi.com
   VITE_FORECAST_DAYS=5
   VITE_CONNECTOR_TYPE=api
   ```

   **Importante**: Sustituye `TU_CLAVE_API_RAPIDAPI` por tu clave API personal de RapidAPI.

## Configuración del proyecto

La configuración del proyecto se maneja a través de las variables de entorno mencionadas anteriormente. Estas variables son esenciales para que la aplicación pueda hacer consultas a la API de RapidAPI para obtener información del clima.

## Ejecución de la aplicación

Una vez configuradas las variables de entorno y las dependencias instaladas, puedes ejecutar la aplicación localmente con el siguiente comando:

```bash
npm run dev
```

Este comando iniciará un servidor local en `http://localhost:3000`. Abre esta dirección en tu navegador para ver la aplicación en funcionamiento.

## Scripts disponibles

- `npm run dev`: Inicia la aplicación en modo de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run test`: Ejecuta los tests con **Jest**.
- `npm run lint`: Ejecuta el linter para encontrar y corregir problemas de código.

## Estructura del proyecto

```
is-cloudy/
├── public/                 # Archivos públicos como el index.html
├── src/                    # Código fuente principal de la aplicación
│   ├── components/         # Componentes reutilizables de la UI
│   ├── context/            # Contextos para manejo de estado global
│   ├── pages/              # Vistas principales de la aplicación
│   ├── providers/          # Proveedores de APIs y datos
│   ├── strategies/         # Lógica para diferentes formas de obtener datos (API, JSON)
│   ├── adapters/           # Adaptadores para formatear datos de la API
│   ├── hooks/              # Hooks personalizados
│   ├── theme/              # Configuración del tema de Material-UI
│   └── App.jsx             # Componente principal de la aplicación
└── .env                    # Variables de entorno
```

## Ejecución de tests

La aplicación utiliza **Jest** y **React Testing Library** para las pruebas. Para ejecutar las pruebas, usa el siguiente comando:

```bash
npm run test
```

## Problemas comunes

### Error de clave API

Si ves un error relacionado con la clave API, asegúrate de haber configurado correctamente las variables de entorno en el archivo `.env`.

### Problemas de dependencias

Si encuentras problemas al instalar dependencias, intenta usar la opción `--legacy-peer-deps`:

```bash
npm install --legacy-peer-deps
```

## Contribuir

Si quieres contribuir al desarrollo de **Is Cloudy**, sigue los siguientes pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b nueva-rama`).
3. Haz tus cambios y comitea (`git commit -am 'Descripción de cambios'`).
4. Haz push a la rama (`git push origin nueva-rama`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Puedes ver más detalles en el archivo `LICENSE`.
