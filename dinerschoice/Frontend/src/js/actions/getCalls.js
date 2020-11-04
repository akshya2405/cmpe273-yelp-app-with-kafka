import {
    SET_MESSAGE, GET_RESTAURANT_PROFILE, GET_RESTAURANT_PROFILE_ERROR, GET_REST_ORDER, GET_REST_EVENTS,
} from '../constants/action-types';

import UserServices from '../services/user.service';

export const getRestaurantProfile = (user) => (dispatch) => UserServices.getRestaurantProfile(user)
  .then((response) => {
    console.log('axios response: ', response);
    dispatch({
      type: GET_RESTAURANT_PROFILE,
      payload: response.data,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });
    return Promise.resolve(response.data);
  });

export const getRestaurantOrders = () => (dispatch) => UserServices.getRestaurantOrders()
  .then((response) => {
    console.log('axios response: ', response);
    dispatch({
      type: GET_REST_ORDER,
      payload: response.data,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });
    return Promise.resolve(response.data);
  });

export const getRestaurantEvents = () => (dispatch) => UserServices.getEvents()
  .then((response) => {
    console.log('axios response: ', response);
    dispatch({
      type: GET_REST_EVENTS,
      payload: response.data,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });
    return Promise.resolve();
  });
