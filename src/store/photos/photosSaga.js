import axios from 'axios';
import { call, put, select, take, takeLatest } from 'redux-saga/effects';

import { tokenRequestSuccess, tokenRequestError } from '../token/tokenSlice';

import {
  photosRequest,
  photosRequestSuccess,
  photoRequestError,
  searchRequest,
} from './photosSlice';

import { API_URL, ACCESS_KEY } from '@/config/config';
import transformPhotoData from '@/utils/transformPhotoData';

function* fetchPhotos() {
  const { token, code } = yield select(state => state.token);

  if (code && !token) {
    yield take(
      action =>
        action.type === tokenRequestSuccess.type ||
        action.type === tokenRequestError.type,
    );
  }

  const { search, currentPage, totalPages } = yield select(
    state => state.photos,
  );

  if (currentPage === totalPages) return;

  if (search) {
    yield call(fetchSearchPhotos);
  } else {
    yield call(fetchRegularPhotos);
  }
}
function* fetchRegularPhotos() {
  const token = yield select(state => state.token.token);
  const currentPage = yield select(state => state.photos.currentPage);

  try {
    const request = yield axios(`${API_URL}/photos`, {
      params: {
        page: currentPage,
        per_page: 30,
        order_by: 'latest',
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

function* fetchSearchPhotos() {
  const token = yield select(state => state.token.token);
  const { search, currentPage } = yield select(state => state.photos);

  try {
    const request = yield axios(`${API_URL}/search/photos`, {
      params: {
        query: search,
        page: currentPage,
        per_page: 30,
        order_by: 'latest',
      },
      headers: {
        Authorization: token ? `Bearer ${token}` : `Client-ID ${ACCESS_KEY}`,
      },
    });

    const data = request.data.results.map(transformPhotoData);
    const totalPages = request.headers['x-total'];

    yield put(photosRequestSuccess({ data, totalPages }));
  } catch (error) {
    yield put(photoRequestError(error.message));
  }
}

export default function* watchPhotos() {
  yield takeLatest(photosRequest.type, fetchPhotos);
  yield takeLatest(searchRequest.type, fetchPhotos);
}
