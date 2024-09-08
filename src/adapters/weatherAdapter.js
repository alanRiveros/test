// Adapter para adaptar los datos del clima a un formato común
const weatherAdapter = (data) => {
    return {
      location: {
        name: data.location.name,
        region: data.location.region,
        country: data.location.country,
        localtime: data.location.localtime,
      },
      current: {
        temp_c: data.current.temp_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        wind_kph: data.current.wind_kph,
        humidity: data.current.humidity,
        pressure_mb: data.current.pressure_mb,
        uv: data.current.uv,
        vis_km: data.current.vis_km,
      },
      forecast: data.forecast.forecastday.map((day) => ({
        date: day.date,
        maxtemp_c: day.day.maxtemp_c,
        mintemp_c: day.day.mintemp_c,
        daily_chance_of_rain: day.day.daily_chance_of_rain,
        condition: day.day.condition.text,
        conditionIcon: day.day.condition.icon,
      })),
    };
  };
  
  export default weatherAdapter;
  