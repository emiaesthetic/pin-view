import { createSlice } from '@reduxjs/toolkit';

import { likeStateReducer } from '../reaction/reactionSlice';

import updatePin from '@/utils/updatePin';

const initialState = {
  data: [],
  error: null,
  loading: false,
  currentPage: 1,
  totalPages: null,
  search: '',
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    photosRequest: state => {
      state.error = null;
      state.loading = state.currentPage === 1;
    },
    photosRequestSuccess: (state, action) => {
      const { data, totalPages } = action.payload;

      state.data = state.currentPage === 1 ? data : [...state.data, ...data];
      state.loading = false;
      state.currentPage += 1;
      state.totalPages = totalPages;
    },
    photosRequestError: (state, action) => {
      state.data = [];
      state.error = action.payload;
      state.loading = false;
      state.currentPage = 1;
      state.totalPages = null;
    },
    resetGallery: state => {
      state.data = [];
      state.error = null;
      state.loading = false;
      state.currentPage = 1;
      state.totalPages = null;
      state.search = '';
    },
    searchRequest: (state, action) => {
      state.data = [];
      state.error = null;
      state.loading = true;
      state.currentPage = 1;
      state.totalPages = null;
      state.search = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(likeStateReducer, (state, action) => {
      state.data = state.data.map(photo => updatePin(photo, action.payload));
    });
  },
});

export const {
  photosRequest,
  photosRequestSuccess,
  photosRequestError,
  resetGallery,
  searchRequest,
} = gallerySlice.actions;

export default gallerySlice.reducer;
