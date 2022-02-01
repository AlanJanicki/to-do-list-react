import { configureStore } from '@reduxjs/toolkit';

import modalReducer from './modalSlice';
import layoutReducer from './layoutSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    layout: layoutReducer,
  },
});
