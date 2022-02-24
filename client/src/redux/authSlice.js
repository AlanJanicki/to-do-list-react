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
    decrementAutoLogoutCounter: (state) => {
      state.autoLogoutCounter = state.autoLogoutCounter - 1;
    },
    removeUser: (state) => {
      state.user = null;
      localStorage.removeItem('jwt');
    },
    resetAutoLogoutCounter: (state) => {
      state.autoLogoutCounter = 10;
    },
    setIsUserTokenExpired: (state, action) => {
      state.isUserTokenExpired = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('jwt', state.user.token);
      state.isUserTokenExpired = false;
    },
    setUserAutoLoggedOut: (state, action) => {
      state.isUserAutoLoggedOut = action.payload;
    },
  },
});

export const {
  decrementAutoLogoutCounter,
  removeUser,
  resetAutoLogoutCounter,
  setIsUserTokenExpired,
  setUser,
  setUserAutoLoggedOut,
} = authSlice.actions;

export default authSlice.reducer;
