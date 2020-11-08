/* eslint-disable max-len */
import {
  ADD_DISH, ADD_DISH_ERROR, SET_MESSAGE,
  MENU_UPDATE, MENU_UPDATE_ERROR,
  EVENTS_UPDATE, EVENTS_UPDATE_ERROR,
  ADD_REVIEW, ADD_REVIEW_ERROR,
  REGISTER_FOR_EVENT, REGISTER_FOR_EVENT_ERROR,
  PLACE_ORDER, PLACE_ORDER_ERROR,
  ORDER_STATUS_UPDATE, ORDER_STATUS_UPDATE_ERROR,
} from '../constants/action-types';

import AddService from '../services/add.service';

export const addDish = (updateDetails) => (dispatch) => AddService.addDish(updateDetails)
  .then((response) => {
    // console.log('Adding Dish');
    dispatch({
      type: ADD_DISH,
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
      type: ADD_DISH_ERROR,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
    return Promise.reject();
  });

export const menuUpdate = (restID, updateList, deleteIds) => (dispatch) => AddService.menuUpdate(restID, updateList, deleteIds)
  .then((response) => {
    // console.log('Adding Dish to menu');
    dispatch({
      type: MENU_UPDATE,
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
      type: MENU_UPDATE_ERROR,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
    return Promise.reject();
  });

export const eventsUpdate = (restID, updateList, deleteIds) => (dispatch) => AddService.eventsUpdate(restID, updateList, deleteIds)
  .then((response) => {
    console.log('Adding event', response);
    dispatch({
      type: EVENTS_UPDATE,
      payload: response.data,
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
      type: EVENTS_UPDATE_ERROR,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
    return Promise.reject();
  });

export const registerfor = (eventID) => (dispatch) => AddService.registerfor(eventID)
  .then((response) => {
    // console.log('Adding event');
    dispatch({
      type: REGISTER_FOR_EVENT,
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
      type: REGISTER_FOR_EVENT_ERROR,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
    return Promise.reject();
  });

export const addReview = (review) => (dispatch) => AddService.addReview(review)
  .then((response) => {
    // console.log('Adding review');
    dispatch({
      type: ADD_REVIEW,
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
      type: ADD_REVIEW_ERROR,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
    return Promise.reject();
  });

export const placeOrder = (updateDetails) => (dispatch) => AddService.placeOrder(updateDetails)
  .then((response) => {
    dispatch({
      type: PLACE_ORDER,
      payload: response.data,
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
      type: PLACE_ORDER_ERROR,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
    return Promise.reject();
  });

export const updateOrderStatus = (updateOrder) => (dispatch) => AddService.updateOrderStatus(updateOrder)
  .then((response) => {
    dispatch({
      type: ORDER_STATUS_UPDATE,
      payload: response.data,
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
      type: ORDER_STATUS_UPDATE_ERROR,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
    return Promise.reject();
  });
