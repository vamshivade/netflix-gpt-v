import { createSlice } from "@reduxjs/toolkit";

// Owns search mode, request status, results, and errors for the search page.
const initialState = {
  isSearchGpt: false,
  isGptLoading: false,
  searchResults: [],
  errorMessage: null,
};

const searchGptSlice = createSlice({
  name: "searchgpt",
  initialState,

  reducers: {
    setIsSearchGpt: (state, action) => {
      // Controls whether the dashboard displays the search experience.
      state.isSearchGpt = action.payload ?? !state.isSearchGpt;
    },
    setIsGptLoading: (state, action) => {
      state.isGptLoading = action.payload;
    },
    searchStarted: (state) => {
      // A new request replaces old results so stale movies are not shown.
      state.isGptLoading = true;
      state.errorMessage = null;
      state.searchResults = [];
    },
    searchSucceeded: (state, action) => {
      // Stores normalized API results and clears any previous error.
      state.isGptLoading = false;
      state.searchResults = action.payload ?? [];
      state.errorMessage = null;
    },
    searchFailed: (state, action) => {
      // Clears invalid results so the error message describes the visible state.
      state.isGptLoading = false;
      state.searchResults = [];
      state.errorMessage = action.payload;
    },
    resetSearch: (state) => {
      // Used when leaving or resetting the search page.
      state.isGptLoading = false;
      state.searchResults = [];
      state.errorMessage = null;
    },
  },
});

export const {
  setIsSearchGpt,
  setIsGptLoading,
  searchStarted,
  searchSucceeded,
  searchFailed,
  resetSearch,
} = searchGptSlice.actions;

export default searchGptSlice.reducer;
