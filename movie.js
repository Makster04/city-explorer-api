const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

class Movie {
  constructor(title, releaseDate, overview) {
    this.title = title;
    this.releaseDate = releaseDate;
    this.overview = overview;
  }
}

async function getMovies(city) {
  try {
    const movie_key = process.env.MOVIE_API_KEY;
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjRiMGE4ZWI5Yzg4YzU2ZjMwMzhkMWU2OTg5OWYyYSIsInN1YiI6IjY1ZTk2MjUxM2Q3NDU0MDE2NGI4YjY4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aR5SgToQPhk55h4UKSm_WUhKEPl8fALYoMwTXhZeLLg'

      }
    };
    const movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${city}&include_adult=false&language=en-US&page=1`, options);
    const moviesDex = movieData.data.results.map(values => new Movie(values.title, values.release_date, values.overview));
    return moviesDex;
  } catch (error) {
    throw new Error(`Error fetching movie data: ${error.message}`);
  }
}

module.exports = getMovies;