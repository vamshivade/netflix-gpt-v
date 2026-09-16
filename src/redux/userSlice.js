import { createSlice } from "@reduxjs/toolkit";

// Stores the authenticated user so protected routes and shared UI stay in sync.
const initialState = {
  user: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    addUser: (state, action) => {
      // Firebase user data is kept here after authentication succeeds.
      state.user = action.payload;
      state.isLoading = false;
    },
    removeUser: (state) => {
      // Clearing the user signs the app out locally after Firebase signs out.
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
