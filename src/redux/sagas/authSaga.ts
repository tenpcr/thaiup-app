import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import {
  LOGOUT_REQUEST,
  AUTH_SET_AUTHENTICATED,
  AUTH_GET_USER_PROFILE,
  AUTH_CHECK,
} from './../types/authTypes';
import { USER_PROFILE } from '../types/userTypes';
import * as tokenUtils from '../../utils/token.utils';
import * as authServer from '../../service/apis/auth.service';

function* logoutSaga() {
  try {
    yield put({ type: AUTH_SET_AUTHENTICATED, payload: { result: false } });
    yield put({ type: USER_PROFILE, payload: { result: {} } });
    yield call(tokenUtils.deleteToken, 'access-token');
    yield call(tokenUtils.deleteToken, 'refresh-token');
  } catch (error) {}
}

function* checkAuthSaga(): SagaIterator {
  try {
    const response = yield call(authServer.authCheckAuth);
    if (response?.status === 200) {
      yield put({ type: AUTH_SET_AUTHENTICATED, payload: { result: true } });
      yield put({
        type: USER_PROFILE,
        payload: { result: response?.data?.data },
      });
    }
  } catch (error: any) {
    console.log(error);
  }
}

function* getAuthUserProfileSaga(): SagaIterator {
  try {
    const response = yield call(authServer.authCheckAuth);
    if (response?.status === 200) {
      yield put({
        type: USER_PROFILE,
        payload: { result: response?.data?.data },
      });
    }
  } catch (error: any) {
    console.log(error);
  }
}

export function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
}

export function* watchCheckAuth() {
  yield takeLatest(AUTH_CHECK, checkAuthSaga);
}

export function* watchGetAuthUserProfile() {
  yield takeLatest(AUTH_GET_USER_PROFILE, getAuthUserProfileSaga);
}
