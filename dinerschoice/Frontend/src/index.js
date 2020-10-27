/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
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
// render App component on the root element
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// serviceWorker();

// TODO: Remove before production
window.getState = store.getState;
