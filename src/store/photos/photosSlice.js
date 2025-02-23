import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  error: null,
  loading: false,
  currentPage: 1,
  totalPages: null,
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
      state.data = [...state.data, ...action.payload.data];
      state.loading = false;
      state.currentPage += 1;
      state.totalPages = action.payload.totalPages;
    },
    photoRequestError: (state, action) => {
      state.data = [];
      state.error = action.payload;
      state.loading = false;
      state.currentPage = 1;
      state.totalPages = null;
    },
  },
});

export const { photoRequestError, photosRequest, photosRequestSuccess } =
  photosSlice.actions;

export default photosSlice.reducer;
