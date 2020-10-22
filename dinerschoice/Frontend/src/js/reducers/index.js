/* eslint-disable linebreak-style */
/* eslint-disable import/named */
import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';
import edit from './edit';

export default combineReducers({
  auth,
  message,
  edit,
});
