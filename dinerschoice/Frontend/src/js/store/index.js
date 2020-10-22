/* eslint-disable linebreak-style */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default (initialState) => (
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  )
);
