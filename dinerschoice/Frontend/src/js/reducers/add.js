/* eslint-disable linebreak-style */
import {
  ADD_DISH, ADD_DISH_ERROR,
  MENU_UPDATE, MENU_UPDATE_ERROR,
  EVENTS_UPDATE, EVENTS_UPDATE_ERROR,
  ADD_REVIEW, ADD_REVIEW_ERROR,
  REGISTER_FOR_EVENT, REGISTER_FOR_EVENT_ERROR,
  PLACE_ORDER, PLACE_ORDER_ERROR,
} from '../constants/action-types';

// const user = JSON.parse(localStorage.getItem('user'));
//
// const initialState = { isAdded: false, user };

export default function (state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_DISH:
      return {
        ...state,
        users: payload,
        isAdded: true,
        loading: true,
      };

    case ADD_DISH_ERROR:
      return {
        ...state,
        isAdded: false,
        payload: user,
      };

    case MENU_UPDATE:
      return {
        ...state,
        dishes: payload,
        isAdded: true,
        loading: true,
      };

    case MENU_UPDATE_ERROR:
      return {
        ...state,
        isAdded: false,
        payload: user,
      };

    case EVENTS_UPDATE:
      console.log(payload);
      return {
        ...state,
        events: payload.events,
        isAdded: true,
        loading: true,
      };

    case EVENTS_UPDATE_ERROR:
      return {
        ...state,
        isAdded: false,
        payload: user,
      };

    case REGISTER_FOR_EVENT:
      return {
        ...state,
        users: action.payload,
        isAdded: true,
        loading: true,
      };

    case REGISTER_FOR_EVENT_ERROR:
      return {
        ...state,
        isAdded: false,
        payload: user,
      };

    case ADD_REVIEW:
      return {
        ...state,
        users: action.payload,
        isAdded: true,
        loading: true,
      };

    case ADD_REVIEW_ERROR:
      return {
        ...state,
        isAdded: false,
        payload: user,
      };

    case PLACE_ORDER:
      return {
        ...state,
        orders: action.payload,
        isAdded: true,
        loading: true,
      };

    case PLACE_ORDER_ERROR:
      return {
        ...state,
        isAdded: false,
        payload: user,
      };

    default:
      return state;
  }
}
