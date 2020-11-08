/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './js/store/index';
import App from './App';
// import serviceWorker from './serviceWorker';

// const user = {
//   token: localStorage.getItem('token'),
//   category: localStorage.getItem('category'),
//   email: localStorage.getItem('email'),
// };
const initialState = {};
const store = configureStore(initialState);
const persistor = persistStore(store);
// render App component on the root element
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>, document.getElementById('root'),
);
// serviceWorker();

// TODO: Remove before production
window.getState = store.getState;
