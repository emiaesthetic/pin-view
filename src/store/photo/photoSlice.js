import { createSlice } from '@reduxjs/toolkit';

import {
  reactionRequestSuccess,
  optimisticLikeReducer,
  rollbackLikeReducer,
} from '../reaction/reactionSlice';

import updatePhoto from '@/utils/updatePhoto';

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
    builder
      .addCase(reactionRequestSuccess, (state, action) => {
        state.pin = updatePhoto(state.pin, action.payload);
      })
      .addCase(optimisticLikeReducer, (state, action) => {
        state.pin = updatePhoto(state.pin, {
          id: action.payload.photoID,
          liked: !action.payload.currentLikeState,
          likes:
            action.payload.count + (action.payload.currentLikeState ? -1 : 1),
        });
      })
      .addCase(rollbackLikeReducer, (state, action) => {
        state.pin = updatePhoto(state.pin, {
          id: action.payload.photoID,
          liked: action.payload.currentLikeState,
          likes: action.payload.count,
        });
      });
  },
});

export const { pinRequest, pinRequestSuccess, pinRequestError } =
  pinSlice.actions;

export default pinSlice.reducer;
