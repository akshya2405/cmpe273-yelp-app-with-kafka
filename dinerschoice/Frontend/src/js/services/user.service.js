/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:3001/';

class UserService {
  getPublicContent() {
    return axios.get(`${API_URL}all`);
  }

  getCustomerProfile(custID) {
    axios.defaults.headers.common.authorization = localStorage.getItem('token');
    return axios.get(`${API_URL}customerprofile`, { params: { custID: custID } }, { withCredentials: true });
  }

  getRestaurantProfile(restID) {
    axios.defaults.headers.common.authorization = localStorage.getItem('token');
    console.log(restID);
    return axios
      .get(`${API_URL}restaurantDashboard`, { params: { restID: restID } }, { withCredentials: true })
      .then((response) => response);
  }

  getEvents() {
    return axios.get(`${API_URL}events`, { headers: authHeader() }, { withCredentials: true });
  }

  getRegistrationList(eventid) {
    // console.log(eventid);
    return axios.get(`${API_URL}registrationList`, { params: { eventid: eventid }, headers: authHeader() }, { withCredentials: true });
  }

  getUpcomingEvents() {
    return axios.get(`${API_URL}allEvents`, { headers: authHeader() }, { withCredentials: true });
  }

  getRegisteredEvents() {
    return axios.get(`${API_URL}registeredEvents`, { headers: authHeader() }, { withCredentials: true });
  }

  getReviews(restID) {
    // console.log('in actions');
    return axios.get(`${API_URL}getReviews`, { params: { restID }, headers: authHeader() }, { withCredentials: true });
  }

  getCustomerReviews() {
    return axios.get(`${API_URL}getCustReviews`, { headers: authHeader() }, { withCredentials: true });
  }

  getCustomerOrders() {
    return axios.get(`${API_URL}getcustomerOrders`, { headers: authHeader() }, { withCredentials: true });
  }

  getRestaurantOrders() {
    return axios.get(`${API_URL}getrestaurantOrders`, { headers: authHeader() }, { withCredentials: true });
  }
}

export default new UserService();
