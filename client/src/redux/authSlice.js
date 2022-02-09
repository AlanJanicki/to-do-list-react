import jwt_decode from 'jwt-decode';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  autoLogoutCounter: 10,
  isUserAutoLoggedOut: false,
  isUserTokenExpired: false,
  user: null,
};

if (localStorage.getItem('jwt')) {
  const decodedToken = jwt_decode(localStorage.getItem('jwt'));
  if (decodedToken.exp * 1000 > Date.now()) {
    initialState.user = decodedToken;
  } else {
    initialState.user = null;
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkUserTokenValidity: (state) => {
      const decodedToken = jwt_decode(state.user.token);
      if (decodedToken.exp * 1000 > Date.now()) {
        state.isUserTokenExpired = false;
      } else {
        state.isUserTokenExpired = true;
      }
    },
    decrementAutoLogoutCounter: (state) => {
      state.autoLogoutCounter = state.autoLogoutCounter - 1;
    },
    removeUser: (state) => {
      state.user = null;
      localStorage.removeItem('jwt');
    },
    removeUserAutoLoggedOut: (state) => {
      state.isUserAutoLoggedOut = false;
    },
    resetAutoLogoutCounter: (state) => {
      state.autoLogoutCounter = 10;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('jwt', state.user.token);
      state.isUserTokenExpired = false;
    },
    setUserAutoLoggedOut: (state) => {
      state.isUserAutoLoggedOut = true;
    },
  },
});

export const {
  decrementAutoLogoutCounter,
  removeUser,
  removeUserAutoLoggedOut,
  resetAutoLogoutCounter,
  setUser,
  setUserAutoLoggedOut,
} = authSlice.actions;

export default authSlice.reducer;
