/* eslint-disable class-methods-use-this */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { API_URL } from '../config/config';

class AuthService {
  login(category, email, password) {
    return axios
      .post(`${API_URL}user/login`, { category, email, password })
      .then((response) => {
        console.log('In service :', response.data);
        if (response) {
          localStorage.setItem('token', response.data);
          const decoded = jwtDecode(response.data.split(' ')[1]);
          console.log('split: ', response.data.split(' ')[1]);
          localStorage.setItem('category', decoded.category);
          localStorage.setItem('email', decoded.email);
        }
        return response;
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('category');
    localStorage.removeItem('email');
    localStorage.removeItem('user');
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
