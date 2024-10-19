import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Update the base URL according to the API documentation
axios.defaults.baseURL = 'https://expense-tracker.b.goit.study';

// Set the Authorization header
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Clear the Authorization header
const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

// Register a new user
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      // Validate input
      if (!name || !email || !password) {
        throw new Error('Username, email, and password are required');
      }

      if (password.length < 7) {
        throw new Error('Password must be at least 7 characters long');
      }

      // Ensure the URL is correct (check API documentation for correct URL)
      const response = await axios.post('api/auth/register', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        setAuthHeader(response.data.token);
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(
          `Registration failed with status ${response.status}`
        );
      }
    } catch (error) {
      console.error(
        'Registration Error:',
        error.response?.data || error.message
      );
      const errorMessage =
        error.response?.data?.message || 'Registration failed';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Log in an existing user
export const logIn = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post('api/auth/login', { email, password });

      // Log the entire response data to understand its structure
      console.log('Full Response Data:', response.data);

      // Extract and log the accessToken
      const accessToken = response.data.accessToken;
      console.log('Access Token:', accessToken);

      // Set the Authorization header with the accessToken
      setAuthHeader(accessToken);

      return response.data;
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

// Log out the current user
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/auth/logout');
    if (response.status === 204) {
      clearAuthHeader();
    } else {
      return thunkAPI.rejectWithValue(
        `Unexpected server response during logout: ${response.status}`
      );
    }
  } catch (error) {
    console.error('Logout Error:', error.response?.data || error.message);
    const errorMessage = error.response?.data?.message || 'Logout failed';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

// Refresh the current user's session
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user. No token found.');
    }

    setAuthHeader(persistedToken);

    try {
      const res = await axios.get('/users/me');

      if (res.status === 200) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(
          `Unexpected server response during user refresh: ${res.status}`
        );
      }
    } catch (error) {
      console.error(
        'User Refresh Error:',
        error.response?.data || error.message
      );
      const errorMessage =
        error.response?.data?.message || 'Unable to refresh user';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
