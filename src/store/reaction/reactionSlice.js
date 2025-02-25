import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  photo: {},
  error: null,
  loading: false,
};

const reactionSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    reactionRequest: state => {
      state.error = null;
      state.loading = true;
    },
    reactionRequestSuccess: (state, action) => {
      state.photo = action.payload;
      state.loading = false;
    },
    reactionRequestError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { reactionRequest, reactionRequestSuccess, reactionRequestError } =
  reactionSlice.actions;

export default reactionSlice.reducer;
