import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import authReducer from './auth/authSlice';
import tokenMiddleware from './middleware/tokenMiddleware';
import rootSaga from './saga';
import tokenReducer from './token/tokenSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(tokenMiddleware, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
