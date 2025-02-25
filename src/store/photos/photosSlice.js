import { createSlice } from '@reduxjs/toolkit';

import { reactionRequestSuccess } from '../reaction/reactionSlice';

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
      const { data, totalPages } = action.payload;

      state.data = state.currentPage === 1 ? data : [...state.data, ...data];
      state.loading = false;
      state.currentPage += 1;
      state.totalPages = totalPages;
    },
    photoRequestError: (state, action) => {
      state.data = [];
      state.error = action.payload;
      state.loading = false;
      state.currentPage = 1;
      state.totalPages = null;
    },
    resetPhotos: state => {
      state.data = [];
      state.error = null;
      state.loading = false;
      state.currentPage = 1;
      state.totalPages = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(reactionRequestSuccess, (state, action) => {
      const { id, liked } = action.payload;

      const updatePhoto = photoData => {
        if (photoData.id === id) {
          return { ...photoData, photo: { ...photoData.photo, liked } };
        }
        return photoData;
      };

      state.data = state.data.map(updatePhoto);
    });
  },
});

export const {
  photoRequestError,
  photosRequest,
  photosRequestSuccess,
  resetPhotos,
} = photosSlice.actions;

export default photosSlice.reducer;
