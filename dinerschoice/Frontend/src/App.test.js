import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import localStorageMock from 'jest-localstorage-mock';
import configureStore from 'redux-mock-store';
import App from './App';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('App', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      myState: {},
    });

    component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('Signup component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      auth: {},
      message: '',
      edit: {},
    });

    component = renderer.create(
      <Provider store={store}>
        <SignUp />
      </Provider>,
    );
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <SignUp />
      </Provider>, div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('Login component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      auth: {},
      message: '',
      edit: {},
    });

    component = renderer.create(
      <Provider store={store}>
        <Login />
      </Provider>,
    );
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Login />
      </Provider>, div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
