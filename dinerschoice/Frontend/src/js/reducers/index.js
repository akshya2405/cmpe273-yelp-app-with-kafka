/* eslint-disable linebreak-style */
/* eslint-disable import/named */
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
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
    storage.removeItem('persist:root');
    state = initialState;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
