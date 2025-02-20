import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  img: null,
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
      state.username = action.payload.username;
      state.img = action.payload.img;
      state.loading = false;
    },
    authRequestError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    authLogout: state => {
      state.username = null;
      state.img = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { authRequest, authRequestSuccess, authRequestError, authLogout } =
  authSlice.actions;

export default authSlice.reducer;
