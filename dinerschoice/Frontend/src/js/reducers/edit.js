/* eslint-disable linebreak-style */
import {
  RESTAURANT_PROFILE_EDIT, RESTAURANT_PROFILE_EDIT_ERROR, GET_RESTAURANT_PROFILE,
  GET_CUSTOMER_PROFILE, CUSTOMER_PROFILE_EDIT, CUSTOMER_PROFILE_EDIT_ERROR, LOOKUP_RESTAURANTS, GET_RESTAURANT_PROFILE_ERROR,
} from '../constants/action-types';

const user = {
  token: localStorage.getItem('token'),
  category: localStorage.getItem('category'),
  email: localStorage.getItem('email'),
  id: localStorage.getItem('id'),
};

const initialState = user ? { isEdited: false, user } : { isEdited: false, user: null, profile: null };

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_RESTAURANT_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        isEdited: false,
      };

    case GET_RESTAURANT_PROFILE_ERROR:
      return {
        ...state,
        isLoggedIn: true,
      };

    case RESTAURANT_PROFILE_EDIT:
      console.log('in reducer', JSON.stringify(payload));
      return {
        ...state,
        isLoggedIn: true,
        isEdited: true,
        profile: payload,
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
