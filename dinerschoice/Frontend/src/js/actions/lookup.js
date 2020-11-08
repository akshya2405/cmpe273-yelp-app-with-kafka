/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import {
  LOOKUP_RESTAURANTS, SET_MESSAGE, LOOKUP_RESTAURANTS_ERROR,
} from '../constants/action-types';

import LookupService from '../services/lookup.service';

export const lookupRestaurants = (lookupParams) => (dispatch) => LookupService.dashboardLookup(lookupParams)
  .then(
    (response) => {
      dispatch({
        type: LOOKUP_RESTAURANTS,
        payload: response.data,
      });
      return Promise.resolve(response);
    // },
    // (error) => {
    //   const message = error.response.statusText;
    //   dispatch({
    //     type: LOOKUP_RESTAURANTS_ERROR,
    //   });
    //   return Promise.reject();
    // },
    },
  );
