/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import axios from 'axios';

const API_URL = 'http://localhost:3001/';

class LookupService {

    dashboardLookup(lookupParams) {

        return axios
            .post(`${API_URL}lookup`, {lookupParams: lookupParams})
            .then((response) => {
                return response
            });
    }

}

export default new LookupService();
