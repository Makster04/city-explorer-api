const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

class Forecast {
  constructor(date, description, high, low) {
    this.date = date;
    this.description = description;
    this.high = high;
    this.low = low;
  }
}

async function getWeather(lat, lon) {
  try {
    const weather_key = process.env.WEATHER_API_KEY;
    const weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weather_key}&days=6&units=I`);
    const weatherDex = weatherData.data.data.map(values => new Forecast(values.datetime, values.weather.description, values.max_temp, values.min_temp));
    return weatherDex;
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error.message}`);
  }
}

module.exports = getWeather;
