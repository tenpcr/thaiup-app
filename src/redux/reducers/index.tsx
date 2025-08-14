import { combineReducers } from 'redux';
import language from './appReducers/language';
import authReducer from './authReducers';
import userReducer from './userReducers'

const rootReducer = combineReducers({
  language: language,
  isAuthenticated: authReducer,
  userProfile: userReducer
});

export default rootReducer;
