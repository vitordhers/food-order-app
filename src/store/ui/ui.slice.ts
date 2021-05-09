import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UiState from "./uiState.interface";

const initialState: UiState = {
  cartModalIsShown: false,
  itemModalIsShown: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    presentCartModal(state) {
      state.cartModalIsShown = true;
    },
    dismissCartModal(state) {
      state.cartModalIsShown = false;
    },
    presentItemModal(state) {
      state.itemModalIsShown = true;
    },
    dismissItemModal(state) {
      state.itemModalIsShown = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
