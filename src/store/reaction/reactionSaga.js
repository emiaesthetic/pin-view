import axios from 'axios';
import { put, select, takeLatest } from 'redux-saga/effects';

import {
  reactionRequest,
  reactionRequestSuccess,
  reactionRequestError,
} from './reactionSlice';

import { API_URL } from '@/config/config';

function* fetchReaction(action) {
  const token = yield select(state => state.token.token);
  if (!token) return;

  const { photoID, currentLikeState } = action.payload;

  try {
    const request = yield axios(`${API_URL}/photos/${photoID}/like`, {
      method: currentLikeState ? 'DELETE' : 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const {
      photo: { id, likes, liked_by_user: liked },
    } = request.data;

    yield put(reactionRequestSuccess({ id, likes, liked }));
  } catch (error) {
    yield put(reactionRequestError(error.message));
  }
}

export default function* watchReaction() {
  yield takeLatest(reactionRequest.type, fetchReaction);
}
