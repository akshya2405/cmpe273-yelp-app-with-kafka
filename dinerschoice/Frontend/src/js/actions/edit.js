/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import {
  RESTAURANT_PROFILE_EDIT, RESTAURANT_PROFILE_EDIT_ERROR, CUSTOMER_PROFILE_EDIT, CUSTOMER_PROFILE_EDIT_ERROR, SET_MESSAGE,
} from '../constants/action-types';

import EditService from '../services/edit.service';

export const editRestaurantProfile = (updateDetails, uploadedImage) => (dispatch) => EditService.editRestaurantProfile(updateDetails, uploadedImage)
  .then(
    (response) => {
      console.log(response);
      dispatch({
        type: RESTAURANT_PROFILE_EDIT,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: response,
      });
      return Promise.resolve();
    },
    (error) => {
      const message = error.response.statusText;
      dispatch({
        type: RESTAURANT_PROFILE_EDIT_ERROR,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    },
  );

export const editCustomerProfile = (updateDetails) => (dispatch) => EditService.editCustomerProfile(updateDetails)
  .then(
    (response) => {
      dispatch({
        type: CUSTOMER_PROFILE_EDIT,
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
        type: CUSTOMER_PROFILE_EDIT_ERROR,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    },
  );
