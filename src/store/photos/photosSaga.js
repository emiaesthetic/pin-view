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
  // FIXME: photo update after authorization
  const token = yield select(state => state.token.token);
  const currentPage = yield select(state => state.photos.currentPage);

  try {
    const request = yield axios(`${API_URL}/photos`, {
      params: {
        page: currentPage,
        per_page: 30,
        orderBy: 'latest',
      },
      headers: {
        Authorization: token ? `Bearer ${token}` : `Client-ID ${ACCESS_KEY}`,
      },
    });

    const data = request.data.map(transformPhotoData);
    const totalPages = request.headers['x-total'];

    yield put(photosRequestSuccess({ data, totalPages }));
  } catch (error) {
    yield put(photoRequestError(error.message));
  }
}

export default function* watchPhotos() {
  yield takeLatest(photosRequest.type, fetchPhotos);
}
