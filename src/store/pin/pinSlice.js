import { createSlice } from '@reduxjs/toolkit';

import { updateReactionState } from '../reaction/reactionSlice';

import toggleLike from '@/utils/toggleLike';

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
    resetPin: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(updateReactionState, (state, action) => {
      state.pin = toggleLike(state.pin, action.payload);
    });
  },
});

export const { pinRequest, pinRequestSuccess, pinRequestError, resetPin } =
  pinSlice.actions;

export default pinSlice.reducer;
