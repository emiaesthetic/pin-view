import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import authReducer from './auth/authSlice';
import galleryReducer from './gallery/gallerySlice';
import tokenMiddleware from './middleware/tokenMiddleware';
import pinReducer from './pin/pinSlice';
import reactionReducer from './reaction/reactionSlice';
import rootSaga from './saga';
import tokenReducer from './token/tokenSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    pin: pinReducer,
    auth: authReducer,
    token: tokenReducer,
    gallery: galleryReducer,
    reaction: reactionReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(tokenMiddleware, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
