import { createSlice } from '@reduxjs/toolkit';

import { likeStateReducer } from '../reaction/reactionSlice';

import { updateLike } from '@/utils/updatePin';

const initialState = {
  pin: {},
  error: null,
  loading: false,
};

const pinSlice = createSlice({
  name: 'pin',
  initialState,
  reducers: {
    pinRequest: state => {
      state.error = null;
      state.loading = true;
    },
    pinRequestSuccess: (state, action) => {
      state.pin = action.payload;
      state.loading = false;
    },
    pinRequestError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetPin: state => {
      state.pin = {};
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(likeStateReducer, (state, action) => {
      state.pin = updateLike(state.pin, action.payload);
    });
  },
});

export const { pinRequest, pinRequestSuccess, pinRequestError, resetPin } =
  pinSlice.actions;

export default pinSlice.reducer;
