/* eslint-disable linebreak-style */
import {
  RESTAURANT_PROFILE_EDIT, RESTAURANT_PROFILE_EDIT_ERROR, GET_RESTAURANT_PROFILE,
  GET_CUSTOMER_PROFILE, CUSTOMER_PROFILE_EDIT, CUSTOMER_PROFILE_EDIT_ERROR, LOOKUP_RESTAURANTS,
} from '../constants/action-types';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { isEdited: true, user } : { isEdited: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_RESTAURANT_PROFILE:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case RESTAURANT_PROFILE_EDIT:
      return {
        ...state,
        isLoggedIn: true,
        payload: user,
      };

    case RESTAURANT_PROFILE_EDIT_ERROR:
      return {
        ...state,
        isLoggedIn: false,
      };

    case GET_CUSTOMER_PROFILE:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case CUSTOMER_PROFILE_EDIT:
      return {
        ...state,
        isLoggedIn: true,
        payload: user,
      };

    case CUSTOMER_PROFILE_EDIT_ERROR:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOOKUP_RESTAURANTS:
      return {
        ...state,
        results: action.payload,
        isLoggedIn: false,
      }
    default:
      return state;
  }
}
