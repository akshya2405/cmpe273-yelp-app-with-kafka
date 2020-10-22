/* eslint-disable linebreak-style */
export default function authHeaderMultiPart() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        // for Node.js Express back-end
        return { 'x-access-token': user.accessToken, 'content-type': 'multipart/form-data'};
    }
    return {'content-type': 'multipart/form-data'};
}