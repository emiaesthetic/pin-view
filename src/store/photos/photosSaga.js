import axios from 'axios';
import { put, select, takeLatest } from 'redux-saga/effects';

import {
  photosRequest,
  photosRequestSuccess,
  photoRequestError,
} from './photosSlice';

import { API_URL, ACCESS_KEY } from '@/config/config';
import transformPhotoData from '@/utils/transformPhotoData';

function* fetchPhotos() {
  const token = yield select(state => state.token.token);

  try {
    const request = yield axios(`${API_URL}/photos`, {
      params: {
        page: 1,
        per_page: 30,
        orderBy: 'latest',
      },
      headers: {
        Authorization: token ? `Bearer ${token}` : `Client-ID ${ACCESS_KEY}`,
      },
    });

    const data = request.data.map(transformPhotoData);
    yield put(photosRequestSuccess(data));
  } catch (error) {
    yield put(photoRequestError(error.message));
  }
}

export default function* watchPhotos() {
  yield takeLatest(photosRequest.type, fetchPhotos);
}
