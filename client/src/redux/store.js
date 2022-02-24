import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import layoutReducer from './layoutSlice';
import modalReducer from './modalSlice';
import tasksListReducer from './tasksListSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    modal: modalReducer,
    tasksList: tasksListReducer,
  },
});
