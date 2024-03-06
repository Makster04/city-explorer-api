'use strict';

const express = require('express');
const cors = require('cors');
const weatherData = require('./weather.json');
const app = express();

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

app.use(cors());
app.use(express.json());



app.get('/weather', (request, response) => {
  const { lat, lon, searchQuery } = request.query;

  // Find the city based on lat, lon, or searchQuery
  let cityWeather;
  if (searchQuery) {
    cityWeather = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
  } else if (lat && lon) {
    cityWeather = weatherData.find(city => city.lat === lat && city.lon === lon);
  }

  // If city not found, return an error
  if (!cityWeather) {
    return response.status(404).json({ error: 'City not found' });
  }

  // Process weather data for the city
  const forecasts = cityWeather.data.map(day => new Forecast(day.datetime, day.weather.description));

  // Send the processed data back to the client
  response.json(forecasts);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});