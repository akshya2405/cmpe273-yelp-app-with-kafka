/* eslint-disable linebreak-style */
/* eslint-disable max-len */

import {
  SIGN_UP, SIGN_UP_ERROR, LOGIN, LOGIN_ERROR, LOGOUT, SET_MESSAGE,
} from '../constants/action-types';

import AuthService from '../services/auth.service';

const jwt_decode = require('jwt-decode');

export const signup = (user) => (dispatch) => AuthService.signup(user)
  .then((response) => {
    // console.log('Dispatching login');
    dispatch({
      type: SIGN_UP,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });
    return Promise.resolve();
  },
  (error) => {
    const message = error.response.statusText;
    dispatch({
      type: SIGN_UP_ERROR,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
    return Promise.reject();
  });

export const login = (category, email, password) => (dispatch) => AuthService.login(category, email, password).then(
  (data) => {
    console.log('Dispatching login', data);
    dispatch({
      type: LOGIN,
      payload: { user: data.data },
    });
    console.log('Returning to actions', data.data);
    return Promise.resolve();
  },
  (error) => {
    // console.log(error.response);
    const message = error.response.statusText;
    // console.log(message);
    // console.log('Dispatching login error');
    dispatch({
      type: LOGIN_ERROR,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
    return Promise.reject();
  },
);

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};
