import {
  SET_MESSAGE, GET_RESTAURANT_PROFILE, GET_RESTAURANT_PROFILE_ERROR,
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
    },
    (error) => {
      const message = error.response.statusText;
      dispatch({
        type: GET_RESTAURANT_PROFILE_ERROR,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject(error);
    });
