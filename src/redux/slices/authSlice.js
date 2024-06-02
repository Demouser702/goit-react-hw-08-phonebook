import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../components/common/service/authService';

const userToken = localStorage.getItem('token');

const initialState = {
  isAuthenticated: Boolean(userToken),
  status: 'idle',
  loading: false,
  email: null,
  userToken,
  user: null,
  error: null,
  success: false,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authService.login(payload);
      localStorage.setItem('token', data.accessToken);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authService.register(payload);
      localStorage.setItem('token', data.accessToken);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: state => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.status = 'idle';
      state.email = null;
      state.userToken = null;
      state.user = null; // Reset user object
      state.success = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.isAuthenticated = true;
        state.email = action.payload.user.email;
        state.userToken = action.payload.accessToken;
        state.user = action.payload.user; // Set user object
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(registerUser.pending, state => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.isAuthenticated = true;
        state.email = action.payload.user.email;
        state.userToken = action.payload.accessToken;
        state.user = action.payload.user; // Set user object
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
