import { all } from 'redux-saga/effects';

import watchAuth from './auth/authSaga';
import watchPhotos from './gallery/gallerySaga';
import watchPin from './pin/pinSaga';
import watchReaction from './reaction/reactionSaga';
import watchToken from './token/tokenSaga';

export default function* rootSaga() {
  yield all([
    watchPin(),
    watchAuth(),
    watchToken(),
    watchPhotos(),
    watchReaction(),
  ]);
}
