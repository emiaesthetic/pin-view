import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import authReducer from './auth/authSlice';
import tokenMiddleware from './middleware/tokenMiddleware';
import pinReducer from './photo/photoSlice';
import photosReducer from './photos/photosSlice';
import reactionReducer from './reaction/reactionSlice';
import rootSaga from './saga';
import tokenReducer from './token/tokenSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
    pin: pinReducer,
    photos: photosReducer,
    reaction: reactionReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(tokenMiddleware, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
