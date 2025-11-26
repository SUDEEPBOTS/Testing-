import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  localStorage.setItem('token', res.data.token);
  return res.data;
});

export const register = createAsyncThunk('auth/register', async (userData) => {
  const res = await axios.post(`${API_URL}/auth/register`, userData);
  localStorage.setItem('token', res.data.token);
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: localStorage.getItem('token') || null, loading: false },
  reducers: { logout: (state) => { state.user = null; state.token = null; localStorage.removeItem('token'); } },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => { state.user = action.payload.user; state.token = action.payload.token; });
    builder.addCase(register.fulfilled, (state, action) => { state.user = action.payload.user; state.token = action.payload.token; });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
