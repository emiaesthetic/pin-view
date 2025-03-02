import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  error: null,
};

const reactionSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    reactionRequest: state => {
      state.error = null;
    },
    updateReactionState: (state, action) => {
      state.id = action.payload;
    },
    reactionRequestError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { reactionRequest, updateReactionState, reactionRequestError } =
  reactionSlice.actions;

export default reactionSlice.reducer;
