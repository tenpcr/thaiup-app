
import * as userTypes from '../types/userTypes';

export const setUserProfile = (value: any) => ({
  type: userTypes.USER_PROFILE,
  payload: { result: value },
});