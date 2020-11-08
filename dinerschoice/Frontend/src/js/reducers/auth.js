/* eslint-disable linebreak-style */
import {
  SIGN_UP, SIGN_UP_ERROR, LOGIN, LOGIN_ERROR,
} from '../constants/action-types';

const user = {
  token: localStorage.getItem('token'),
  category: localStorage.getItem('category'),
  email: localStorage.getItem('email'),
  id: localStorage.getItem('id'),
};

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SIGN_UP:
      return {
        ...state,
        isLoggedIn: false,
      };

    case SIGN_UP_ERROR:
      return {
        ...state,
        isLoggedIn: false,
      };

    case LOGIN:
      console.log('login reducer: ', user);
      return {
        ...state,
        isLoggedIn: true,
        user: {
          token: localStorage.getItem('token'),
          category: localStorage.getItem('category'),
          email: localStorage.getItem('email'),
          id: localStorage.getItem('id'),
        },
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    default:
      return state;
  }
}
