import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./cart/cart.slice";
import CartState from "./cart/cartState.interface";
import uiSlice from "./ui/ui.slice";
import UiState from "./ui/uiState.interface";

const store = configureStore({
  reducer: {
    cart: CartSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export interface storeState {
  ui: UiState;
  cart: CartState;
}
export default store;
