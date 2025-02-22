import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  error: null,
  loading: false,
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    photosRequest: state => {
      state.error = null;
      state.loading = true;
    },
    photosRequestSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    photoRequestError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { photoRequestError, photosRequest, photosRequestSuccess } =
  photosSlice.actions;

export default photosSlice.reducer;
