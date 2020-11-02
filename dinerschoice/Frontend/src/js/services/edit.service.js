/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import authHeader from './authHeader';
import authHeaderMultipart from './authHeaderMultipart';

const API_URL = 'http://localhost:3001/';

const options = {
  headers: authHeader(),
  withCredentials: true,
};

class EditService {
  editRestaurantProfile(updateDetailsInput, uploadedImage) {
    const updateDetails = updateDetailsInput;
    alert(uploadedImage.image);
    if (uploadedImage) {
      alert('in if');
      const multipartOptions = {
        headers: authHeaderMultipart(),
        withCredentials: true,
      };
      const formData = new FormData();
      formData.append('myImage', uploadedImage.image);
      return axios
        .post(`${API_URL}upload`, formData, multipartOptions)
        // .then((response) => response);
        .then((response) => {
          alert(response.data);
          // {...obj, response.data}

          updateDetails.profileImage = [...updateDetails.profileImage, response.data.fileName];
          alert(JSON.stringify(updateDetails));
          return axios
            .post(`${API_URL}editProfile`, { updateDetails }, options)
            .then((response) => response);
        }, (error) => {
          // console.log(error);
        });
    }

    return axios
      .post(`${API_URL}editProfile`, { updateDetails }, options)
      .then((response) => response);
  }

  editCustomerProfile(updateDetailsInput) {
    updateDetailsInput.uploadedImageUrl = '';
    const updateDetails = updateDetailsInput;
    // console.log(updateDetailsInput.uploadedImage);
    if (updateDetailsInput.uploadedImage) {
      const multipartOptions = {
        headers: authHeaderMultipart(),
        withCredentials: true,
      };
      const formData = new FormData();
      formData.append('myImage', updateDetailsInput.uploadedImage);
      return axios
        .post(`${API_URL}upload`, formData, multipartOptions)
      // .then((response) => response);
        .then((response) => {
          // console.log(response.data);
          // {...obj, response.data}
          updateDetails.uploadedImageUrl = response.data.fileName;
          return axios
            .post(`${API_URL}editProfile`, { updateDetails }, options)
            .then((response) => response);
        }, (error) => {
          // console.log(error);
        });
    }
    return axios
      .post(`${API_URL}editProfile`, { updateDetails }, options)
      .then((response) => response);
  }
}

export default new EditService();
