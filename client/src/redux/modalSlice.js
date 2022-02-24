import { createSlice } from '@reduxjs/toolkit';

import { lockBodyScroll, unlockBodyScroll } from '../utils/bodyScrollLock';

const initialState = {
  isLogoutTimeoutModalOpen: false,
  isModalOpen: false,
  windowScrollY: 0,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal: (state) => {
      if (!state.isModalOpen) {
        return;
      }
      unlockBodyScroll(state.windowScrollY);
      state.windowScrollY = 0;
      state.isModalOpen = false;
    },
    closeLogoutTimeoutModal: (state) => {
      if (!state.isLogoutTimeoutModalOpen) {
        return;
      }
      if (!state.isModalOpen) {
        unlockBodyScroll(state.windowScrollY);
        state.windowScrollY = 0;
      }
      state.isLogoutTimeoutModalOpen = false;
    },
    openLogoutTimeoutModal: (state, action) => {
      if (state.isLogoutTimeoutModalOpen) {
        return;
      }
      if (!state.isModalOpen) {
        if (action.payload !== 'resetWindowScrollY') {
          state.windowScrollY = window.scrollY;
        } else if (action.payload === 'resetWindowScrollY') {
          state.windowScrollY = 0;
        }
        lockBodyScroll(state.windowScrollY);
      }
      state.isLogoutTimeoutModalOpen = true;
    },
    openModal: (state) => {
      if (state.isModalOpen) {
        return;
      }
      state.windowScrollY = window.scrollY;
      lockBodyScroll(state.windowScrollY);
      state.isModalOpen = true;
    },
  },
});

export const { closeLogoutTimeoutModal, closeModal, openLogoutTimeoutModal, openModal } =
  modalSlice.actions;

export default modalSlice.reducer;
