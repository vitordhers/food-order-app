import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CartItem from "./cartItem.interface";
import CartState from "./cartState.interface";

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.totalAmount =
        state.totalAmount +
        action.payload.input.currentPrice * action.payload.input.amount.value;
      state.items.push(action.payload);
    },
    increment: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      state.totalAmount =
        state.totalAmount + state.items[index].input.currentPrice;
      state.items[index].input.amount.value++;
    },
    decrement: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      state.totalAmount =
        state.totalAmount - state.items[index].input.currentPrice;
      state.items[index].input.amount.value--;
    },
    updateItem(state, action: PayloadAction<CartItem>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items.splice(index, 1, action.payload);
      state.totalAmount =
        state.totalAmount -
        state.items[index].input.currentPrice +
        state.items[index].input.currentPrice *
          state.items[index].input.amount.value;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      state.totalAmount =
        state.totalAmount -
        state.items[index].input.currentPrice *
          state.items[index].input.amount.value;
      state.items.splice(index, 1);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
