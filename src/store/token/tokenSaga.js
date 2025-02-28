import axios from 'axios';
import { put, takeLatest, select } from 'redux-saga/effects';

import {
  tokenRequest,
  tokenRequestSuccess,
  tokenRequestError,
} from './tokenSlice';

import {
  TOKEN_URL,
  ACCESS_KEY,
  SECRET_KEY,
  REDIRECT_URI,
  GRANT_TYPE,
} from '@/config/config';

function* fetchToken() {
  const code = yield select(state => state.token.code);
  if (!code) return;

  try {
    const request = yield axios(TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        client_id: ACCESS_KEY,
        client_secret: SECRET_KEY,
        redirect_uri: REDIRECT_URI,
        grant_type: GRANT_TYPE,
        code,
      }),
    });
    const { access_token: token } = request.data;

    yield put(tokenRequestSuccess(token));
  } catch (error) {
    yield put(tokenRequestError(error.message));
  }
}

export default function* watchToken() {
  yield takeLatest(tokenRequest.type, fetchToken);
}
