import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  photo: {},
  error: null,
  loading: false,
};

const reactionSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    reactionRequest: state => {
      state.error = null;
      state.loading = true;
    },
    reactionRequestSuccess: (state, action) => {
      state.photo = action.payload;
      state.loading = false;
    },
    reactionRequestError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    optimisticLikeReducer: (state, action) => {
      const {
        photoID: id,
        currentLikeState: liked,
        count: likes,
      } = action.payload;
      state.photo = { id, liked: !liked, likes: likes + (liked ? -1 : 1) };
    },
    rollbackLikeReducer: (state, action) => {
      state.photo = action.payload;
    },
  },
});

export const {
  reactionRequest,
  reactionRequestSuccess,
  reactionRequestError,
  optimisticLikeReducer,
  rollbackLikeReducer,
} = reactionSlice.actions;

export default reactionSlice.reducer;
