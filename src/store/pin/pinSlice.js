import { createSlice } from '@reduxjs/toolkit';

import { likeStateReducer } from '../reaction/reactionSlice';

import updatePin from '@/utils/updatePin';

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
  },
  extraReducers: builder => {
    builder.addCase(likeStateReducer, (state, action) => {
      state.pin = updatePin(state.pin, action.payload);
    });
  },
});

export const { pinRequest, pinRequestSuccess, pinRequestError } =
  pinSlice.actions;

export default pinSlice.reducer;
