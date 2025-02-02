/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import authHeader from './authHeader';
import authHeaderMultipart from './authHeaderMultipart';
import { API_URL } from '../config/config';

const options = {
  headers: authHeader(),
  withCredentials: true,
};

class AddService {
  addDish(updateDetails) {
    return axios
      .post(`${API_URL}addDish`, { updateDetails }, options)
      .then((response) => response);
  }

  menuUpdate(restID, updateList, deleteIds) {
    // alert('in menu update: ' + JSON.stringify(updateList) + JSON.stringify(deleteIds));
    const promises = updateList.map((update) => {
      if (update.uploadedImage) {
        const multipartOptions = {
          headers: authHeaderMultipart(),
          withCredentials: true,
        };
        const formData = new FormData();
        formData.append('myImage', update.uploadedImage);
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        return axios
            .post(`${API_URL}upload`, formData, multipartOptions)
            // .then((response) => response);
            .then((response) => {
              // console.log(response.data);
              // {...obj, response.data}
              update.imageurl = response.data.fileName;
            });
      }
    });

    return Promise.all(promises).then((results) => {
      // alert('all promises resolved: ' + JSON.stringify(updateList) + JSON.stringify(deleteIds));
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      return axios
        .post(`${API_URL}menuUpdate`, { restID, updateList:updateList, deleteIds }, options)
        .then((response) => response);
    });
  }

  eventsUpdate(restID, updateList, deleteIds) {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    return axios
      .post(`${API_URL}eventsUpdate`, { restID, updateList, deleteIds }, options)
      .then((response) => response);
  }

  registerfor(event, regList) {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    return axios
      .post(`${API_URL}registerfor`, { event, regList }, options)
      .then((response) => response);
  }

  addReview(review) {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    return axios
      .post(`${API_URL}addReview`, { review }, options)
      .then((response) => response);
  }

  placeOrder(order) {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    return axios
      .post(`${API_URL}placeOrder`, { order }, options)
      .then((response) => response);
  }

  updateOrderStatus(order) {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    return axios
      .post(`${API_URL}updateOrderStatus`, { order }, options)
      .then((response) => response);
  }

  addMessage(message) {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    return axios
      .post(`${API_URL}addMessages`, { message }, options)
      .then((response) => response);
  }
}

export default new AddService();
