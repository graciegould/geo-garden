import Api from './api';
import Geolocation from '../Geolocation';
function WeatherDataApi () {
    // const url =  process.env.OPEN_METEO_URL;
    const baseUrl = "https://api.open-meteo.com/v1/forecast"
    let loc = {};
    
    let currentWeatherQueryVars = {
        temp: "temperature_2m",
        humidity: "relative_humidity_2m",
        apparentTemp: "apparent_temperature",
        isDay: "is_day",
        precipitation: "precipitation",
        rain: "rain",
        showers: "showers",
        snowfall: "snowfall",
        weatherCode: "weather_code",
        cloudCover: "cloud_cover",
        pressure: "pressure_msl",
        surfacePressure: "surface_pressure",
        windSpeed: "wind_speed_10m",
        windDireciton: "wind_direction_10m",
        windGust: "wind_gusts_10m",
    };

    let weather = {}
    let units = {}
    async function fetchWeather() {
        const api = new Api(baseUrl);
        console.log("loading location..");
        loc = await Geolocation();
        console.log("location loaded..");
        api.addQuery("latitude", loc.latitude);
        api.addQuery("longitude", loc.longitude);
        api.addQuery('current', Object.values(currentWeatherQueryVars).join(","));
        let data = await api.fetchData();
        console.log(data)
        Object.keys(currentWeatherQueryVars).forEach((key, index) => {
            weather[key] = data.current[currentWeatherQueryVars[key]];
            units[key] = data['current_units'][currentWeatherQueryVars[key]];
        });
        return weather;
    }

    return {
        fetchWeather
    }
}

export default WeatherDataApi;