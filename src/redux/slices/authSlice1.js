import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../components/common/service/authService';

const userToken = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;

const initialState = {
  isAuthenticated: false,
  status: 'idle',
  loading: false,
  email: null,
  userToken,
  error: null,
  success: false,
};

export const loginUser = createAsyncThunk('auth/login', async payload => {
  const { data } = await authService.login(payload);

  localStorage.setItem('token', data.accessToken);

  return data;
});

export const registerUser = createAsyncThunk('auth/register', async payload => {
  const { data } = await authService.register(payload);

  localStorage.setItem('token', data.accessToken);

  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: {
      reducer: state => {
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.email = null;
        state.userToken = null;
        state.success = false;

        localStorage.removeItem('token');
      },
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        console.log('Login response:', action.payload);
        state.status = 'loading';
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('Login fulfilled:', action.payload);

        state.status = 'succeeded';
        state.loading = false;
        state.isAuthenticated = true;
        state.email = action.payload.user.email;
        state.userToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('Login rejected:', action.payload);

        state.status = 'failed';
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state, action) => {
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
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log('Register rejected:', action.payload);
        console.error('Register error:', action.error);

        state.status = 'failed';
        state.loading = false;
        state.isAuthenticated = false;
        console.dir(action);
        console.error(action.error.message);
        state.error = action.error.message;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
