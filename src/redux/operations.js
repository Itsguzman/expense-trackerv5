// import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';

// // axios.defaults.baseURL = 'https://66aa4189613eced4eba83479.mockapi.io/api';
// axios.defaults.baseURL = 'https://connections-api.goit.global';

// export const fetchContacts = createAsyncThunk(
//   'contacts/fetchContacts',
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get('/contacts');
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Set the base URL for API requests
axios.defaults.baseURL = 'https://expense-tracker.b.goit.study';

// Fetch current user's details (updated endpoint)
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken; // Access the accessToken from the user slice

    if (!token) {
      return thunkAPI.rejectWithValue('No token found');
    }

    // Set the Authorization header
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    try {
      const response = await axios.get('api/users/current'); // Updated endpoint
      console.log('wewew');
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', contactData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
