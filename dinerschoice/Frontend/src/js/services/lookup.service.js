/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { API_URL } from '../config/config';

class LookupService {
  dashboardLookup(lookupParams) {
    return axios
      .post(`${API_URL}lookup`, { lookupParams: lookupParams })
      .then((response) => {
        return response;
      });
  }
}

export default new LookupService();
