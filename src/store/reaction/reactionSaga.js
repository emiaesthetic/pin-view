import axios from 'axios';
import { put, select, takeLatest } from 'redux-saga/effects';

import {
  reactionRequest,
  updateReactionState,
  reactionRequestError,
} from './reactionSlice';

import { API_URL } from '@/config/config';

function* fetchReaction(action) {
  const token = yield select(state => state.token.token);
  if (!token) return;

  const { id, liked } = action.payload;

  try {
    yield put(updateReactionState(id));
    yield axios(`${API_URL}/photos/${id}/like`, {
      method: liked ? 'DELETE' : 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    yield put(reactionRequestError(error.message));
    yield put(updateReactionState(id));
  }
}

export default function* watchReaction() {
  yield takeLatest(reactionRequest.type, fetchReaction);
}
