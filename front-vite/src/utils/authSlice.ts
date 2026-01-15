import { createSlice } from '@reduxjs/toolkit';
import type {  PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, UserInfo } from './interface.ts';

const initialState: AuthState = {
  user: null,
  authenticated: false,
  loading: false,
  errorMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuthSuccess(state, action: PayloadAction<UserInfo>) {
      state.user = action.payload;
      state.authenticated = true;
      state.loading = false;
    },
    loginSuccess(state, action: PayloadAction<UserInfo>) {
      state.user = action.payload;
      state.authenticated = true;
      state.loading = false;
    },
    loginError(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.authenticated = false;
      state.loading = false;
      state.errorMessage = null;
    },
  },
});

export const { checkAuthSuccess, loginSuccess, loginError, logout } = authSlice.actions;
export default authSlice.reducer;