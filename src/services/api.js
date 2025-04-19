import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzQ0YTY0NzQzOTc1ZDY5N2M1OGFkMmYwZjA0MjM5MCIsIm5iZiI6MTc0MTc3NDc2MC4xNTUsInN1YiI6IjY3ZDE1ZmE4NDJjMGNjYzNjYTFlMjQ1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lGmNWNQQuVLVkFSu3N_rHsS-NCHuXTL98DwLpGetGNE'
  }
});

export const getTrendingMovies = async () => {
  try {
    console.log('Fetching trending movies...');
    const response = await api.get('/trending/movie/day');
    console.log('Trending movies response:', response.data);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error.response || error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    console.log('Searching movies with query:', query);
    const response = await api.get('/search/movie', {
      params: {
        query,
        include_adult: false,
        language: 'en-US',
        page: 1,
      },
    });
    console.log('Search movies response:', response.data);
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error.response || error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error.response || error);
    throw error;
  }
};

export const getMovieCredits = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error('Error fetching movie credits:', error.response || error);
    throw error;
  }
};

export const getMovieReviews = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/reviews`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie reviews:', error.response || error);
    throw error;
  }
};

export { IMG_BASE_URL };