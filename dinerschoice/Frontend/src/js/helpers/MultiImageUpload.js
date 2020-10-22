import React from 'react'
import authHeader from "../services/authHeader";
const axios = require("axios");
const API_URL = 'http://54.219.100.35:3001/';
const options = {
    headers: authHeader(),
    withCredentials: true,
};
class ReactUploadImageMultiple extends React.Component {

    render() {
        const { onImageUpload } = this.props;
        return (
                <input type="file" name="myImages" onChange={onImageUpload} />
        )
    }
}

export default ReactUploadImageMultiple