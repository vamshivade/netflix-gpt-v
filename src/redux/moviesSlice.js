import { createSlice } from "@reduxjs/toolkit";

// Holds dashboard movie collections and their shared loading/error state.
const initialState = {
  trendingMovies: null,
  nowPlayingMovies: null,
  topRatedMovies: null,
  movieVideo: null,
  isLoading: true,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,

  reducers: {
    addMovies: (state, action) => {
      // Trending movies are the main dashboard collection.
      state.trendingMovies = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setMoviesLoading: (state) => {
      // Used before a catalog request so the dashboard can show loading UI.
      state.isLoading = true;
      state.error = null;
    },
    setMoviesError: (state, action) => {
      // Keeps request failures available to the dashboard error state.
      state.isLoading = false;
      state.error = action.payload;
    },
    addMovieVideo: (state, action) => {
      // Stores the selected movie trailer data for playback components.
      state.movieVideo = action.payload;
    },
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
  },
});

export const {
  addMovies,
  addMovieVideo,
  setMoviesLoading,
  setMoviesError,
  addNowPlayingMovies,
  addTopRatedMovies,
} = moviesSlice.actions;

export default moviesSlice.reducer;
