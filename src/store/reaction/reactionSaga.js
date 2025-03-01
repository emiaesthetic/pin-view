import axios from 'axios';
import { put, select, takeLatest } from 'redux-saga/effects';

import {
  reactionRequest,
  likeStateReducer,
  reactionRequestError,
} from './reactionSlice';

import { API_URL } from '@/config/config';

function* fetchReaction(action) {
  const token = yield select(state => state.token.token);
  if (!token) return;

  const { id, liked, likes } = action.payload;

  try {
    yield put(likeStateReducer({ id, liked, likes }));
    yield axios(`${API_URL}/photos/${id}/like`, {
      method: liked ? 'DELETE' : 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    yield put(reactionRequestError(error.message));
    yield put(likeStateReducer({ id, liked, likes }));
  }
}

export default function* watchReaction() {
  yield takeLatest(reactionRequest.type, fetchReaction);
}
