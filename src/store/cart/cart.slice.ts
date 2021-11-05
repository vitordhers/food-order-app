import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CartItem from "./cartItem.interface";
import CartState from "./cartState.interface";

export const EMPTY_CART: CartState = {
  items: [],
  totalAmount: 0,
  totalPrice: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: EMPTY_CART,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.totalPrice =
        state.totalPrice +
        action.payload.input.currentPrice * action.payload.input.amount.value;
      state.items.push(action.payload);
      state.totalAmount = state.totalAmount++;
      state.changed = true;
    },
    increment: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      state.totalPrice =
        state.totalPrice + state.items[index].input.currentPrice;
      state.items[index].input.amount.value++;
      state.changed = true;
    },
    decrement: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      state.totalPrice =
        state.totalPrice - state.items[index].input.currentPrice;
      state.items[index].input.amount.value--;
      state.changed = true;
    },
    updateItem(state, action: PayloadAction<CartItem>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items.splice(index, 1, action.payload);
      state.totalPrice =
        state.totalPrice -
        state.items[index].input.currentPrice +
        state.items[index].input.currentPrice *
          state.items[index].input.amount.value;
      state.changed = true;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      state.totalPrice =
        state.totalPrice -
        state.items[index].input.currentPrice *
          state.items[index].input.amount.value;
      state.items.splice(index, 1);
      state.totalAmount--;
      state.changed = true;
    },
    replaceCart: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
      state.totalAmount = action.payload.totalAmount;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
