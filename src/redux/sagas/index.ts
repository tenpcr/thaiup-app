import { all } from 'redux-saga/effects';
import {
  watchCheckAuth,
  watchLogout,
  watchGetAuthUserProfile,
} from './authSaga';

export default function* rootSaga() {
  yield all([watchCheckAuth(), watchLogout(), watchGetAuthUserProfile()]);
}
