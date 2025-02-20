import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  error: null,
  loading: false,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    tokenRequest: state => {
      state.error = null;
      state.loading = true;
    },
    tokenRequestSuccess: (state, action) => {
      state.token = action.payload;
      state.loading = false;
    },
    tokenRequestError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
      state.loading = false;
    },
    clearToken: state => {
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  tokenRequest,
  tokenRequestSuccess,
  tokenRequestError,
  updateToken,
  clearToken,
} = tokenSlice.actions;

export default tokenSlice.reducer;
