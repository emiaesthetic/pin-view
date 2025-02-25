import { createSlice } from '@reduxjs/toolkit';

import { reactionRequestSuccess } from '../reaction/reactionSlice';

import updatePhoto from '@/utils/updatePhoto';

const initialState = {
  photo: {},
  error: null,
  loading: false,
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    photoRequest: state => {
      state.error = null;
      state.loading = true;
    },
    photoRequestSuccess: (state, action) => {
      state.photo = action.payload;
      state.loading = false;
    },
    photoRequestError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(reactionRequestSuccess, (state, action) => {
      state.photo = updatePhoto(state.photo, action.payload);
    });
  },
});

export const { photoRequest, photoRequestSuccess, photoRequestError } =
  photoSlice.actions;

export default photoSlice.reducer;
