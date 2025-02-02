/* eslint-disable linebreak-style */
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    // for Node.js Express back-end
    return { 'x-access-token': user.accessToken};
  }
  return {};
}
