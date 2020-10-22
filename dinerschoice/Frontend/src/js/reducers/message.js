/* eslint-disable linebreak-style */
import { SET_MESSAGE, CLEAR_MESSAGE } from '../constants/action-types';

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_MESSAGE:
      // console.log(payload);
      return { message: payload };
    case CLEAR_MESSAGE:
      return { message: '' };
    default:
      return state;
  }
}
