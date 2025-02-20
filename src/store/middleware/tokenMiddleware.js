import {
  tokenRequestSuccess,
  updateToken,
  clearToken,
} from '../token/tokenSlice';

import { saveToken, removeToken } from '@/services/tokenStorage';

const tokenMiddleware = store => next => action => {
  if (
    action.type === tokenRequestSuccess.type ||
    action.type === updateToken.type
  ) {
    if (action.payload) {
      saveToken(action.payload);
    }
  }

  if (action.type === clearToken.type) {
    removeToken();
  }

  return next(action);
};

export default tokenMiddleware;
