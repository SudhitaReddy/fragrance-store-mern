import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DataService } from '../../config/dataService/dataService';

// Async thunks
export const loginUser = createAsyncThunk('auth/loginUser', async ({ values, callback }, { rejectWithValue }) => {
  try {
    const response = await DataService.post('/login', values);

    if (response.data.errors) {
      return rejectWithValue(response.data.errors);
    }

    // Store authentication state in localStorage
    localStorage.setItem('hexadash_login', 'true');
    if (response.data.token) {
      localStorage.setItem('access_token', response.data.token);
    }

    // Call the callback function on success
    if (callback) callback();

    return true;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const auth0Login = createAsyncThunk('auth/auth0Login', async ({ values, callback }, { rejectWithValue }) => {
  try {
    // Store authentication state in localStorage
    localStorage.setItem('hexadash_login', 'true');
    localStorage.setItem('access_token', values.accessToken);
    if (values.idToken) {
      localStorage.setItem('id_token', values.idToken);
    }

    if (callback) callback();

    return true;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (values, { rejectWithValue }) => {
  try {
    const response = await DataService.post('/register', values);

    if (response.data.errors) {
      return rejectWithValue('Registration failed!');
    }

    return false; // Registration successful but not logged in
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (callback, { rejectWithValue }) => {
  try {
    // Clear authentication state from localStorage
    localStorage.removeItem('hexadash_login');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');

    if (callback) callback();

    return false;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Initial state - check localStorage on app startup
const initialState = {
  login: localStorage.getItem('hexadash_login') === 'true',
  loading: false,
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.login = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Auth0 login
      .addCase(auth0Login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(auth0Login.fulfilled, (state, action) => {
        state.loading = false;
        state.login = action.payload;
        state.error = null;
      })
      .addCase(auth0Login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.login = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout user
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.login = action.payload;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setLogin } = authSlice.actions;

// Action to initialize auth state from localStorage
export const initializeAuth = () => (dispatch) => {
  const isLoggedIn = localStorage.getItem('hexadash_login') === 'true';
  dispatch(setLogin(isLoggedIn));
};
export default authSlice.reducer;
