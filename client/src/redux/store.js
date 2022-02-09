import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import layoutReducer from './layoutSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    modal: modalReducer,
  },
});
