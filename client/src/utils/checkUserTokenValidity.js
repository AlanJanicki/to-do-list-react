import jwt_decode from 'jwt-decode';

export const checkUserTokenValidity = () => {
  if (localStorage.getItem('jwt')) {
    const decodedToken = jwt_decode(localStorage.getItem('jwt'));
    if (decodedToken.exp * 1000 > Date.now()) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
