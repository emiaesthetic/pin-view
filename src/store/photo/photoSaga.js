import axios from 'axios';
import { put, select, takeLatest } from 'redux-saga/effects';

import {
  photoRequest,
  photoRequestSuccess,
  photoRequestError,
} from './photoSlice';

import { API_URL, ACCESS_KEY } from '@/config/config';
import transformPhotoData from '@/utils/transformPhotoData';

function* fetchPhoto(action) {
  const photoID = action.payload;
  const token = yield select(state => state.token.token);

  try {
    const request = yield axios(`${API_URL}/photos/${photoID}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : `Client-ID ${ACCESS_KEY}`,
      },
    });
    const photo = transformPhotoData(request.data);

    yield put(photoRequestSuccess(photo));
  } catch (error) {
    yield put(photoRequestError(error.message));
  }
}

export default function* watchPhoto() {
  yield takeLatest(photoRequest.type, fetchPhoto);
}
