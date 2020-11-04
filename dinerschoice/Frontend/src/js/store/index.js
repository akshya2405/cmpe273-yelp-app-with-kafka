/* eslint-disable linebreak-style */
import { createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default (initialState) => (
  createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  )
);
