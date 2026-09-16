import apiHandler from "./apiHandler";
import endpoints from "./endpoints";

const getTrendingMovies = (signal) => {
  return apiHandler("GET", endpoints.GET_TRENDING_MOVIES, null, null, signal);
};

const getTrendingMovie = (id, signal) => {
  return apiHandler(
    "GET",
    endpoints.GET_TRENDING_MOVIE(id),
    null,
    null,
    signal,
  );
};

const getNowPlayingMovie = (signal) => {
  return apiHandler("GET", endpoints.GET_NOW_PLAYING_MOVIE, null, null, signal);
};

// GET_TOP_RATED_MOVIES
const getTopRatedMovies = (signal) => {
  return apiHandler("GET", endpoints.GET_TOP_RATED_MOVIES, null, null, signal);
};

// SEARCH_GPT_MOVIE
const getSearchMovie = (params, signal) => {
  return apiHandler("GET", endpoints.GET_SEARCH_MOVIE, null, params, signal);
};

export {
  getTrendingMovies,
  getTrendingMovie,
  getNowPlayingMovie,
  getTopRatedMovies,
  getSearchMovie,
};
