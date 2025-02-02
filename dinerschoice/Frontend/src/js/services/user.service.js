/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import authHeader from './authHeader';
import { API_URL } from '../config/config';

class UserService {
  getPublicContent() {
    return axios.get(`${API_URL}all`);
  }

  getCustomerProfile(custID) {
    axios.defaults.headers.common.authorization = localStorage.getItem('token');
    return axios.get(`${API_URL}customerProfile`, { params: { custID: custID } }, { withCredentials: true });
  }

  getRestaurantProfile(restID) {
    axios.defaults.headers.common.authorization = localStorage.getItem('token');
    console.log(restID);
    return axios
      .get(`${API_URL}restaurantDashboard`, { params: { restID: restID } }, { withCredentials: true })
      .then((response) => response);
  }

  getEvents() {
    const category = localStorage.getItem('category');
    const id = localStorage.getItem('id');
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    return axios.get(`${API_URL}events`, { params: { category, id } }, { withCredentials: true });
  }

  getEventsForCustomer(idList) {
    const category = localStorage.getItem('category');
    const id = localStorage.getItem('id');
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    return axios.get(`${API_URL}events`, { params: { category, id, idList } }, { withCredentials: true });
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

  getOrders() {
    axios.defaults.headers.common.authorization = localStorage.getItem('token');
    // alert(`getorders: ${localStorage.getItem('id')}`);
    return axios.get(`${API_URL}getOrders`,
      { params: { id: localStorage.getItem('id'), category: localStorage.getItem('category') } }, { withCredentials: true });
  }

  getUsersList() {
    axios.defaults.headers.common.authorization = localStorage.getItem('token');
    return axios.get(`${API_URL}getAllCust`, { withCredentials: true });
  }

  getMessagesList() {
    axios.defaults.headers.common.authorization = localStorage.getItem('token');
    return axios.get(`${API_URL}getMessages`,
      { params: { id: localStorage.getItem('id'), category: localStorage.getItem('category') } }, { withCredentials: true });
  }
}

export default new UserService();
