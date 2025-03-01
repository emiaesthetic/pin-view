import { all } from 'redux-saga/effects';

import watchAuth from './auth/authSaga';
import watchPin from './photo/photoSaga';
import watchPhotos from './photos/photosSaga';
import watchReaction from './reaction/reactionSaga';
import watchToken from './token/tokenSaga';

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchPin(),
    watchPhotos(),
    watchReaction(),
    watchToken(),
  ]);
}
