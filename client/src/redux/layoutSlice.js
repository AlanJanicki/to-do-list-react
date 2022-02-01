import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accountMenuHeight: null,
  controlPanelHeight: null,
  headerHeight: null,
  isAccountMenuOpen: false,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setAccountMenuHeight: (state, action) => {
      state.accountMenuHeight = action.payload;
    },
    setControlPanelHeight: (state, action) => {
      state.controlPanelHeight = action.payload;
    },
    setHeaderHeight: (state, action) => {
      state.headerHeight = action.payload;
    },
    closeAccountMenu: (state) => {
      state.isAccountMenuOpen = false;
    },
    openAccountMenu: (state) => {
      state.isAccountMenuOpen = true;
    },
    toggleAccountMenu: (state) => {
      state.isAccountMenuOpen = !state.isAccountMenuOpen;
    },
  },
});

export const {
  closeAccountMenu,
  openAccountMenu,
  setAccountMenuHeight,
  setControlPanelHeight,
  setHeaderHeight,
  toggleAccountMenu,
} = layoutSlice.actions;

export default layoutSlice.reducer;
