/* eslint-disable linebreak-style */
/* eslint-disable import/named */
import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';
import edit from './edit';
import { LOGOUT } from "../constants/action-types";

const combinedReducer = combineReducers({
  auth,
  message,
  edit,
});

const initialState = {};

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    return { auth: { isLoggedIn: false }, edit: initialState, message: initialState };
  }
  return combinedReducer(state, action);
};

export default rootReducer;
