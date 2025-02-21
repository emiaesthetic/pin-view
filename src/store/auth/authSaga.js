import axios from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { authRequest, authRequestSuccess, authRequestError } from './authSlice';

import { API_URL } from '@/config/config';

function* fetchAuth() {
  const token = yield select(state => state.token.token);
  if (!token) return;

  try {
    const currentResponse = yield call(axios.get, `${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const {
      username,
      email,
      links: { html: link },
    } = currentResponse.data;

    const userResponse = yield call(axios.get, `${API_URL}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const {
      profile_image: { medium: img },
    } = userResponse.data;

    yield put(authRequestSuccess({ username, email, link, img }));
  } catch (error) {
    yield put(authRequestError(error.message));
  }
}

export default function* watchAuth() {
  yield takeLatest(authRequest.type, fetchAuth);
}
