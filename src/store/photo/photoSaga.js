import axios from 'axios';
import { put, select, takeLatest } from 'redux-saga/effects';

import { pinRequest, pinRequestSuccess, pinRequestError } from './photoSlice';

import { API_URL, ACCESS_KEY } from '@/config/config';
import transformPhotoData from '@/utils/transformPhotoData';

function* fetchPin(action) {
  const pinID = action.payload;
  const token = yield select(state => state.token.token);

  try {
    const request = yield axios(`${API_URL}/photos/${pinID}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : `Client-ID ${ACCESS_KEY}`,
      },
    });
    const photo = transformPhotoData(request.data);

    yield put(pinRequestSuccess(photo));
  } catch (error) {
    yield put(pinRequestError(error.message));
  }
}

export default function* watchPin() {
  yield takeLatest(pinRequest.type, fetchPin);
}
