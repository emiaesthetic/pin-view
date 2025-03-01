import { createSlice } from '@reduxjs/toolkit';

import {
  reactionRequestSuccess,
  optimisticLikeReducer,
  rollbackLikeReducer,
} from '../reaction/reactionSlice';

import updatePhoto from '@/utils/updatePhoto';

const initialState = {
  data: [],
  error: null,
  loading: false,
  currentPage: 1,
  totalPages: null,
  search: '',
};

const photosSlice = createSlice({
  name: 'photos',
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
    builder
      .addCase(reactionRequestSuccess, (state, action) => {
        state.data = state.data.map(photo =>
          updatePhoto(photo, action.payload),
        );
      })
      .addCase(optimisticLikeReducer, (state, action) => {
        state.data = state.data.map(photo =>
          updatePhoto(photo, {
            id: action.payload.photoID,
            liked: !action.payload.currentLikeState,
            likes:
              action.payload.count + (action.payload.currentLikeState ? -1 : 1),
          }),
        );
      })
      .addCase(rollbackLikeReducer, (state, action) => {
        state.data = state.data.map(photo =>
          updatePhoto(photo, {
            id: action.payload.photoID,
            liked: action.payload.currentLikeState,
            likes: action.payload.count,
          }),
        );
      });
  },
});

export const {
  photoRequestError,
  photosRequest,
  photosRequestSuccess,
  resetPhotos,
  searchRequest,
} = photosSlice.actions;

export default photosSlice.reducer;
