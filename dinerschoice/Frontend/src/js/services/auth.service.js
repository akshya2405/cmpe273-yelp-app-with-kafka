/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import axios from 'axios';

const API_URL = 'http://54.219.100.35:3001/';

class AuthService {
  login(category, email, password) {
    return axios
      .post(`${API_URL}login`, { category, email, password })
      .then((response) => {
        // console.log('In service :', response.data);
        if (response) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  signup(user) {
    return axios.post(`${API_URL}signup`, {
      user,
    });
  }
}

export default new AuthService();
