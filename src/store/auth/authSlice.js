import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authRequest: state => {
      state.error = null;
      state.loading = true;
    },
    authRequestSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    authRequestError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    authLogout: () => initialState,
  },
});

export const { authRequest, authRequestSuccess, authRequestError, authLogout } =
  authSlice.actions;

export default authSlice.reducer;
