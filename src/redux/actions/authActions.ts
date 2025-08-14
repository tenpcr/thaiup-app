import * as authTypes from '../types/authTypes';

export const setAuthenticated = (value: boolean) => ({
  type: authTypes.AUTH_SET_AUTHENTICATED,
  payload: { result: value },
});

export const loginSuccess = (user: { username: string }) => ({
  type: authTypes.AUTH_LOGIN_SUCCESS,
  payload: { user },
});

export const logout = () => ({
  type: authTypes.LOGOUT_REQUEST,
  payload: null,
});

export const checkAuth = () => ({
  type: authTypes.AUTH_CHECK,
  payload: null,
});

export const getAuthUserProfile = () => ({
  type: authTypes.AUTH_GET_USER_PROFILE,
  payload: null,
});
