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
        state.totalAmount + action.payload.price * action.payload.amount;
      state.items.push(action.payload);
    },
    increment: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      state.totalAmount = state.totalAmount + state.items[index].price;
      state.items[index].amount++;
    },
    decrement: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      state.totalAmount = state.totalAmount - state.items[index].price;
      state.items[index].amount--;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      state.totalAmount =
        state.totalAmount -
        state.items[index].price * state.items[index].amount;
      state.items.splice(index, 1);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
