import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  liked: null,
  likes: null,
  error: null,
};

const reactionSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    reactionRequest: state => {
      state.error = null;
    },
    likeStateReducer: (state, action) => {
      state.id = action.payload.id;
      state.liked = action.payload.liked;
      state.likes = action.payload.likes;
    },
    reactionRequestError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { reactionRequest, likeStateReducer, reactionRequestError } =
  reactionSlice.actions;

export default reactionSlice.reducer;
