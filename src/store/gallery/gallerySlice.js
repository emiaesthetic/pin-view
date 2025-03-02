import { createSlice } from '@reduxjs/toolkit';

import { updateReactionState } from '../reaction/reactionSlice';

import toggleLike from '@/utils/toggleLike';

const initialState = {
  data: [],
  error: null,
  loading: false,
  currentPage: 1,
  totalPages: null,
  search: '',
  isCompleted: false,
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
      state.isCompleted = true;
    },
    photosRequestError: (state, action) => {
      state.data = [];
      state.error = action.payload;
      state.loading = false;
      state.currentPage = 1;
      state.totalPages = null;
      state.isCompleted = true;
    },
    searchRequest: (state, action) => {
      state.data = [];
      state.error = null;
      state.loading = true;
      state.currentPage = 1;
      state.totalPages = null;
      state.search = action.payload;
      state.isCompleted = false;
    },
    resetGallery: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(updateReactionState, (state, action) => {
      state.data = state.data.map(photo => toggleLike(photo, action.payload));
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
