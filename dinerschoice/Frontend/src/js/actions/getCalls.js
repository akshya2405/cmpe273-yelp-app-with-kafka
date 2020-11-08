import {
  SET_MESSAGE,
  GET_RESTAURANT_PROFILE, GET_RESTAURANT_PROFILE_ERROR,
  GET_REST_ORDER, GET_REST_EVENTS, GET_CUSTOMER_PROFILE,
  GET_CUST_EVENTS, GET_ALL_CUST, GET_USER_MESSAGES,
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

export const getOrders = () => (dispatch) => UserServices.getOrders()
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

export const getCustomerProfile = (custID) => (dispatch) => UserServices.getCustomerProfile(custID)
  .then((response) => {
    console.log('axios response: ', response);
    dispatch({
      type: GET_CUSTOMER_PROFILE,
      payload: response.data,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });
    return Promise.resolve();
  });

export const getCustomerEvents = (idList) => (dispatch) => UserServices.getEventsForCustomer(idList)
  .then((response) => {
    console.log('axios response: ', response);
    dispatch({
      type: GET_CUST_EVENTS,
      payload: response.data,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });
    return Promise.resolve();
  });

export const getUsersList = () => (dispatch) => UserServices.getUsersList()
  .then((response) => {
    console.log('axios response: ', response);
    dispatch({
      type: GET_ALL_CUST,
      payload: response.data,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });
    return Promise.resolve();
  });

export const getMessagesList = () => (dispatch) => UserServices.getMessagesList()
  .then((response) => {
    console.log('axios response: ', response);
    dispatch({
      type: GET_USER_MESSAGES,
      payload: response.data,
    });
    return Promise.resolve();
  });
