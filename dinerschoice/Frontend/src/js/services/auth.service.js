/* eslint-disable class-methods-use-this */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import storage from 'redux-persist/lib/storage';
import { API_URL } from '../config/config';

class AuthService {
  login(category, email, password) {
    return axios
      .post(`${API_URL}user/login`, { category, email, password })
      .then((response) => {
        console.log('In service :', response.data.data);
        if (response) {
          localStorage.setItem('token', response.data.data);
          const decoded = jwtDecode(response.data.data.split(' ')[1]);
          console.log('split: ', response.data.data.split(' ')[1]);
          console.log(decoded);
          localStorage.setItem('category', decoded.category);
          localStorage.setItem('email', decoded.email);
          localStorage.setItem('id', decoded.id);
        }
        return response;
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('category');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    storage.removeItem('persist:root');
    return Promise.resolve();
  }

  signup(user) {
    console.log('in service: ', user);
    return axios.post(`${API_URL}user/signup`, {
      user,
    });
  }
}

export default new AuthService();
