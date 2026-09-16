import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import searchGptReducer from "./searchGptSlice";

// The store combines each feature slice so components can read shared app state.
const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    searchGpt: searchGptReducer,
  },
});

export default appStore;
