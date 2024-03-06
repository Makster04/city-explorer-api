'use strict';

const express = require('express');
const cors = require('cors');
const weatherData = require('./weather.json');

const app = express();
app.use(cors());

class Weather {
  constructor(description, high_temp, low_temp, datetime) {
    this.description = description;
    this.high_temp = high_temp;
    this.low_temp = low_temp;
    this.datetime = datetime;
  }
}

app.get('/weather', (request, response) => {
  let weather = weatherData.records.map((values) => {
    return new Weather(values.description, values.high_temp, values.low_temp, values.datetime);
  });

  response.send(weather);
});

app.get('/weather/:name', (request, response) => {
  let weatherName = request.params.name;
  let result = weatherData.records.find(weather => weather.name === weatherName);

  if (result) {
    let weatherObject = new Weather(result.description, result.high_temp, result.low_temp, result.datetime);
    response.send(weatherObject);
  } else {
    response.status(404).send("Weather data not found.");
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

