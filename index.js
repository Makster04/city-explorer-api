const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000; // Use PORT environment variable if available

// Middleware to parse JSON bodies
app.use(express.json());

// Define the class for Forecast
class Forecast {
  constructor(date, description, high, low) {
    this.date = date;
    this.description = description;
    this.high = high;
    this.low = low;
  }
}

// Define the class for Movie
class Movie {
  constructor(title, releaseDate, overview) {
    this.title = title;
    this.releaseDate = releaseDate;
    this.overview = overview;
  }
}

// New route for weather data
app.get('/weather/:lat_lon', async (req, res) => {
  try {
    const lat = Number(parseFloat(req.params.lat_lon.split('_')[0]).toFixed(4));
    const lon = Number(parseFloat(req.params.lat_lon.split('_')[1]).toFixed(4));
    const weather_key = process.env.WEATHER_API_KEY; // Ensure you have this environment variable set
    const weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weather_key}&days=6&units=I`);
    const weatherDex = weatherData.data.data.map(values => new Forecast(values.datetime, values.weather.description, values.max_temp, values.min_temp));
    res.json(weatherDex);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// New route for movie data
app.get('/movies/:city', async (req, res) => {
  try {
    const movie_key = process.env.MOVIE_API_KEY; // Ensure you have this environment variable set
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${movie_key}`
      }
    };
    const movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${req.params.city}&include_adult=false&language=en-US&page=1`, options);
    const moviesDex = movieData.data.results.map(values => new Movie(values.title, values.release_date, values.overview));
    res.json(moviesDex);
  } catch (error) {
    console.error('Error fetching movie data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
