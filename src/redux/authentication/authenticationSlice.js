import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  logIn,
  logOut,
  refreshUser,
} from './authenticationOperation';

const initialState = {
  user: null,
  accessToken: null, // Renamed from token to be more specific
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken; // Store accessToken
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken; // Store accessToken
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = null;
        state.accessToken = null; // Clear accessToken on logout
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(refreshUser.rejected, state => {
        state.isLoggedIn = false;
        state.error = null;
      });
  },
});

export const authReducer = authSlice.reducer;
