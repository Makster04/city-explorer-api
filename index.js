const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const getMovies = require('./movie');
const getWeather = require('./weather');

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use(cors());

app.get('/weather/:lat_lon', async (req, res) => {
  try {
    const lat = Number(parseFloat(req.params.lat_lon.split('_')[0]).toFixed(4));
    const lon = Number(parseFloat(req.params.lat_lon.split('_')[1]).toFixed(4));
    const weatherData = await getWeather(lat, lon);
    res.json(weatherData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.get('/movies/:city', async (req, res) => {
  try {
    const moviesData = await getMovies(req.params.city);
    res.json(moviesData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
