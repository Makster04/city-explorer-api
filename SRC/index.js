const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

// Read weather data from weather.json file
const weatherData = JSON.parse(fs.readFileSync('weather.json'));

// Create API endpoint to handle GET requests to /weather
app.get('/weather', (req, res) => {
  const { lat, lon, searchQuery } = req.query;

  // Find the city based on lat, lon, or searchQuery
  const city = weatherData.find(city => {
    return (
      city.lat === parseFloat(lat) ||
      city.lon === parseFloat(lon) ||
      city.searchQuery.toLowerCase() === searchQuery.toLowerCase()
    );
  });

  if (!city) {
    return res.status(404).json({ error: 'City not found' });
  }

  // Create Forecast objects for each day
  const forecasts = city.forecast.map(({ date, description }) => {
    return { date, description };
  });

  // Send the array of Forecast objects back to the client
  res.json(forecasts);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
